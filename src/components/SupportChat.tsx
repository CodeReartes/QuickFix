import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../services/authService';
import { ArrowLeft, MessageCircle, Send, ImageIcon, FileText, ChevronRight, CheckCircle, Upload } from 'lucide-react';
import { collection, query, where, getDocs, addDoc, serverTimestamp, onSnapshot, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { Message } from '../types';

export default function SupportChat({ onClose, predefinedTopic, predefinedJobId }: { onClose: () => void, predefinedTopic?: string, predefinedJobId?: string }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [topic, setTopic] = useState<string | null>(predefinedTopic || (predefinedJobId ? 'Problema con un trabajo' : null));
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [supportId, setSupportId] = useState<string | null>(null); // The unique support chat doc

  // Init support sequence
  useEffect(() => {
    if (!user) return;
    const initChat = async () => {
      // Find or create support request
      try {
        const supportRef = collection(db, 'support_requests');
        const q = query(supportRef, where('userId', '==', user.uid), where('status', '==', 'open'));
        const snapshot = await getDocs(q);
        
        let targetSupportId;
        if (!snapshot.empty) {
          targetSupportId = snapshot.docs[0].id;
        } else {
          // Create new
          const newDoc = await addDoc(supportRef, {
            userId: user.uid,
            status: 'open',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          targetSupportId = newDoc.id;
        }
        setSupportId(targetSupportId);

        // Fetch user jobs for selection
        const jobsQ = query(collection(db, 'jobs'), where(user.role === 'client' ? 'clientId' : 'professionalId', '==', user.uid));
        const jobsSnap = await getDocs(jobsQ);
        const userJobs = jobsSnap.docs.map(d => ({id: d.id, ...d.data()}));
        setJobs(userJobs);

        if (predefinedJobId) {
          const found = userJobs.find(j => j.id === predefinedJobId);
          if (found) {
            setSelectedJob(found);
          }
        }
      } catch (e) {
        handleFirestoreError(e, 'get' as any, 'support_requests');
      }
    };
    initChat();
  }, [user]);

  // Listen to messages
  useEffect(() => {
    if (!supportId) return;
    const q = query(
      collection(db, 'support_requests', supportId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        time: doc.data().createdAt ? new Date(doc.data().createdAt.toMillis()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }));
      setMessages(msgs);
      setTimeout(() => {
         scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
    return () => unsub();
  }, [supportId]);

  const sendMessage = async (text: string, photo: string | null = null, relatedJobId: string | null = null) => {
    if (!supportId || !user) return;
    
    setIsSending(true);
    try {
      await addDoc(collection(db, 'support_requests', supportId, 'messages'), {
        text,
        senderId: user.uid,
        photoUrl: photo,
        relatedJobId: relatedJobId,
        createdAt: serverTimestamp()
      });
      setNewMessage('');
      setPhotoPreview(null);
    } catch (e) {
      handleFirestoreError(e, 'create', 'support_requests/messages');
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = () => {
    if (newMessage.trim() === '' && !photoPreview && !selectedJob) return;
    sendMessage(newMessage, photoPreview, selectedJob?.id);
    setSelectedJob(null); // Clear selected job form after sending it attached
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen es muy grande. Intentá con una menor a 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 800;
        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        setPhotoPreview(canvas.toDataURL('image/webp', 0.8));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-white dark:bg-bg-primary flex flex-col h-full overflow-hidden"
    >
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-white/80 dark:bg-bg-primary/80 backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:bg-gray-200 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary relative">
               <MessageCircle size={20} />
               <div className="w-2.5 h-2.5 bg-success rounded-full absolute bottom-0 right-0 border-2 border-white dark:border-bg-primary"></div>
             </div>
             <div>
                <h2 className="text-xl font-bold text-text-main font-manrope">Soporte Técnico</h2>
                <p className="text-xs text-text-muted">En línea</p>
             </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-4 no-scrollbar">
        <div className="flex flex-col gap-6">
           <div className="flex justify-start">
             <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl rounded-tl-sm p-4 max-w-[85%]">
               <p className="text-text-main text-sm">¡Hola! ¿En qué te podemos ayudar? Seleccioná una opción o escribí tu mensaje.</p>
               <span className="text-[10px] text-text-muted block mt-2">Personal de Soporte</span>
             </div>
           </div>

           {!topic && (
             <div className="flex flex-col gap-3 ml-12">
               {['Problema con un trabajo', 'Pagos y Suscripción', 'Otro motivo'].map(t => (
                 <button 
                   key={t}
                   onClick={() => setTopic(t)}
                   className="bg-primary/10 text-primary border border-primary/20 px-5 py-3 rounded-2xl text-sm font-bold w-full text-left flex items-center justify-between"
                 >
                   {t}
                   <ChevronRight size={18} />
                 </button>
               ))}
             </div>
           )}

           {topic === 'Problema con un trabajo' && !selectedJob && (
              <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4">
                 <p className="text-sm font-bold text-text-muted text-center mb-2">Seleccioná un trabajo de tu historial:</p>
                 {jobs.length === 0 ? (
                    <p className="text-sm text-center text-text-muted">No tenés trabajos recientes.</p>
                 ) : (
                    <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                      {jobs.map(job => (
                        <button 
                          key={job.id} 
                          onClick={() => setSelectedJob(job)}
                          className="flex items-center gap-3 p-3 bg-white dark:bg-bg-primary border border-gray-100 dark:border-white/5 rounded-2xl shadow-soft text-left hover:border-primary/30 transition-all"
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                             <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-main line-clamp-1">{job.description || job.category}</p>
                            <p className="text-xs text-text-muted">{job.professionalName || job.clientName || 'Usuario'}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                 )}
              </div>
           )}

           {messages.map((msg, i) => {
             const isMe = msg.senderId === user?.uid;
             return (
               <div key={msg.id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                 <div className={`p-4 rounded-3xl max-w-[85%] ${isMe ? 'bg-primary text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-800 text-text-main rounded-tl-sm'}`}>
                    {msg.relatedJobId && (
                       <div className="mb-2 p-2 bg-white/20 dark:bg-black/20 rounded-xl flex items-center gap-2">
                         <FileText size={14} className={isMe ? 'text-white' : 'text-primary'} />
                         <span className="text-xs font-bold truncate">Referencia ID: {msg.relatedJobId.substring(0, 8)}...</span>
                       </div>
                    )}
                    {msg.photoUrl && (
                      <img src={msg.photoUrl} alt="Adjunto" className="w-full max-w-sm rounded-2xl mb-2 object-cover border border-white/20" />
                    )}
                    <p className="text-sm break-words">{msg.text}</p>
                    <span className={`text-[10px] block mt-1 ${isMe ? 'text-white/70 text-right' : 'text-text-muted mt-2'}`}>{msg.time}</span>
                 </div>
               </div>
             )
           })}

           {photoPreview && (
             <div className="flex justify-end animate-in zoom-in fade-in">
               <div className="relative group">
                 <img src={photoPreview} alt="Preview" className="w-48 h-48 object-cover rounded-3xl border-4 border-white shadow-soft" />
                 <button 
                  onClick={() => setPhotoPreview(null)} 
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                 >
                   <ArrowLeft size={16} className="rotate-45" /> {/* Close icon visual hack :) */}
                 </button>
               </div>
             </div>
           )}

           {selectedJob && !photoPreview && (
             <div className="flex justify-end animate-in zoom-in fade-in">
                <div className="bg-primary/10 border border-primary text-primary p-3 rounded-2xl max-w-[80%] flex items-center gap-3">
                   <FileText size={20} />
                   <div>
                     <p className="text-xs font-bold line-clamp-1">{selectedJob.description || selectedJob.category}</p>
                     <p className="text-[10px] italic">Adjunto seleccionado</p>
                   </div>
                   <button onClick={() => setSelectedJob(null)} className="ml-2 text-alert"><ArrowLeft size={16} className="rotate-45" /></button>
                </div>
             </div>
           )}
           <div ref={scrollRef} />
        </div>
      </div>

      <div className="bg-white dark:bg-bg-primary border-t border-gray-100 dark:border-white/5 p-4 z-[1001] shrink-0 pb-safe">
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          <button 
            disabled={isSending}
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-muted rounded-full flex items-center justify-center shrink-0 transition-colors"
          >
            <ImageIcon size={24} />
          </button>
          
          <div className="flex-grow flex-1 min-w-0 relative flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribí un mensaje..."
              className="w-full h-11 md:h-14 bg-gray-100 dark:bg-gray-800 text-text-main placeholder:text-text-muted/50 rounded-3xl px-4 md:px-6 outline-none border border-transparent focus:border-primary/20 transition-all font-bold text-sm"
              disabled={isSending}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>

          <button 
            disabled={(!newMessage.trim() && !photoPreview && !selectedJob) || isSending}
            onClick={handleSend}
            className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none hover:shadow-premium transition-all active:scale-95"
          >
            <Send size={20} className="ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
