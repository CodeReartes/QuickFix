import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDocFromServer, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID and enable robust offline caching
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Test connection on boot as required by instructions
async function testConnection() {
  try {
    console.log('Testing Firestore connection to database:', firebaseConfig.firestoreDatabaseId);
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firestore connected successfully');
  } catch (error) {
    console.warn('Firestore initial connection check failed (expected if offline or first boot):', error);
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or network. Ensure firestoreDatabaseId is correct.");
    }
  }
}
testConnection();



export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
  };
}

export function handleFirestoreError(error: any, operation: FirestoreErrorInfo['operationType'], path: string | null = null) {
  if (error?.code === 'resource-exhausted' || error?.message?.includes('Quota limit exceeded')) {
    const msg = 'Se ha alcanzado el límite de cuota gratuita en la base de datos de Firebase. Por favor, inténtelo de nuevo mañana.';
    alert(msg);
    throw new Error(msg);
  }

  const info: FirestoreErrorInfo = {
    error: error?.message || String(error),
    operationType: operation,
    path: path,
    authInfo: {
      userId: auth.currentUser?.uid || 'anonymous',
      email: auth.currentUser?.email || 'none',
      emailVerified: auth.currentUser?.emailVerified || false,
      isAnonymous: auth.currentUser?.isAnonymous || true,
    }
  };
  throw new Error(JSON.stringify(info));
}
