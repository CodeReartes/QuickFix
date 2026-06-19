import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  getDoc,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Message } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const chatService = {
  /**
   * Subscribe to messages for a specific job
   */
  subscribeToMessages: (jobId: string, callback: (messages: Message[]) => void) => {
    const messagesPath = `jobs/${jobId}/messages`;
    const q = query(
      collection(db, messagesPath),
      orderBy('createdAt', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convert Firestore Timestamp to number (ms) for our type
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now()
        } as Message;
      });
      callback(messages);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, messagesPath);
    });
  },

  /**
   * Send a message for a specific job
   */
  sendMessage: async (jobId: string, text?: string, imageUrl?: string) => {
    if (!auth.currentUser) throw new Error('User not authenticated');
    if (!text && !imageUrl) return;
    
    const messagesPath = `jobs/${jobId}/messages`;
    try {
      const messageData: any = {
        jobId,
        senderId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      };
      
      if (text) messageData.text = text;
      if (imageUrl) messageData.imageUrl = imageUrl;
      
      await addDoc(collection(db, messagesPath), messageData);

      // Update parent job document so local listeners can track it in real-time
      try {
        const { doc: firestoreDoc, updateDoc, getDoc, collection: fsCollection, addDoc: fsAddDoc } = await import('firebase/firestore');
        const jobRef = firestoreDoc(db, 'jobs', jobId);
        
        const jobSnap = await getDoc(jobRef);
        if (jobSnap.exists()) {
          const jobData = jobSnap.data();
          const recipientId = auth.currentUser.uid === jobData.clientId ? jobData.professionalId : jobData.clientId;
          
          await updateDoc(jobRef, {
            lastMessage: text || 'Imagen 📷',
            lastMessageSenderId: auth.currentUser.uid,
            hasUnreadMessage: true,
            updatedAt: serverTimestamp()
          });

          if (recipientId) {
             const senderName = auth.currentUser?.displayName || 'Alguien';
             await fsAddDoc(fsCollection(db, 'notifications'), {
               recipientId,
               title: 'Nuevo mensaje',
               description: `${senderName} te ha enviado un mensaje.`,
               type: 'message',
               read: false,
               createdAt: serverTimestamp()
             });
          }
        }
      } catch (e) {
        console.warn("Failed to update parent job with last message info:", e);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, messagesPath);
    }
  },

  /**
   * Mark a chat as read
   */
  markChatAsRead: async (jobId: string) => {
    if (!auth.currentUser) return;
    try {
      const { doc: firestoreDoc, updateDoc } = await import('firebase/firestore');
      const jobRef = firestoreDoc(db, 'jobs', jobId);
      await updateDoc(jobRef, {
        hasUnreadMessage: false
      });
    } catch (e) {
      console.warn("Failed to mark chat as read:", e);
    }
  }
};
