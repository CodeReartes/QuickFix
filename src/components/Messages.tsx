import { motion, AnimatePresence, useAnimation, PanInfo } from 'motion/react';
import { MessageSquare, User as UserIcon, Send, ArrowLeft, RotateCcw, Loader2, CheckCircle, Image as ImageIcon, X as CloseIcon, X, Search, CheckCheck, Trash2, Archive, Sparkles, Bell } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../services/authService';
import { chatService } from '../services/chatService';
import { collection, query, where, onSnapshot, orderBy, doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Message } from '../types';
import { compressImage } from '../lib/imageCompressor';

export default function Messages({ 
  initialChatData,
  onBack,
  onProfileClick,
}: { 
  initialChatData?: { id: string, name: string, lastMsg: string, time: string, unread: boolean, photo?: string, otherUserId?: string },
  onBack?: () => void,
  onProfileClick?: () => void,
}) {
  const { user, effectiveUser } = useAuth();
  const currentUser = effectiveUser || user;
  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todos');
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [otherUserOnline, setOtherUserOnline] = useState<boolean | null>(null);

  // Notifications state
  const [showNotificationsList, setShowNotificationsList] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [deletedNotifIds, setDeletedNotifIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('deletedNotifIds_pro') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'notifications'),
      where('recipientId', '==', user.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let docList = snapshot.docs;
      docList.sort((a, b) => {
        const t1 = a.data().createdAt?.toMillis ? a.data().createdAt.toMillis() : 0;
        const t2 = b.data().createdAt?.toMillis ? b.data().createdAt.toMillis() : 0;
        return t2 - t1;
      });
      const notifs = docList.map(doc => ({
        id: doc.id,
        ...doc.data(),
        time: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Ahora'
      })) as any[];
      const finalNotifs = [...notifs];
      if (finalNotifs.length === 0) {
        finalNotifs.push(
          {
            id: 'notif-pro1',
            title: '💰 Fondos acreditados',
            description: 'El cliente liberó el pago de Plomería #SP-1092. Se acreditó el saldo en tu Billetera.',
            time: 'Hace 10 min',
            type: 'success'
          },
          {
            id: 'notif-pro2',
            title: '⭐ Nueva Reseña Recibida',
            description: 'Catalina R. te calificó con 5 estrellas: "Excelente y muy puntual. ¡Muy recomendado!"',
            time: 'Hace 3 h',
            type: 'invoice'
          },
          {
            id: 'notif-pro3',
            title: '🛡️ Perfil Verificado Aprobado',
            description: 'Tu matrícula habilitante y antecedentes de seguridad Pro fueron validados con éxito.',
            time: 'Ayer',
            type: 'security'
          }
        );
      }
      setNotifications(finalNotifs);
    }, (error) => {
      // Avoid raw crash or logs
    });

    return () => unsubscribe();
  }, [user]);

  const handleDeleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (id.startsWith('notif-pro')) {
        const updated = [...deletedNotifIds, id];
        setDeletedNotifIds(updated);
        localStorage.setItem('deletedNotifIds_pro', JSON.stringify(updated));
      } else {
        const { deleteDoc: firestoreDelete, doc: firestoreDoc } = await import('firebase/firestore');
        await firestoreDelete(firestoreDoc(db, 'notifications', id));
      }
    } catch (err) {
      console.error("Error removing notification:", err);
    }
  };

  const handleClearAllNotifications = async () => {
    try {
      const demoNotifs = notifications.filter(n => n.id.startsWith('notif-pro')).map(n => n.id);
      const updated = [...deletedNotifIds, ...demoNotifs];
      setDeletedNotifIds(updated);
      localStorage.setItem('deletedNotifIds_pro', JSON.stringify(updated));
      
      const dbNotifs = notifications.filter(n => !n.id.startsWith('notif-pro'));
      const { deleteDoc: firestoreDelete, doc: firestoreDoc } = await import('firebase/firestore');
      for (const n of dbNotifs) {
        await firestoreDelete(firestoreDoc(db, 'notifications', n.id));
      }
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
  };

  const toTitleCase = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  };

  // Fetch all jobs (chats) for the current user
  useEffect(() => {
    if (!currentUser) return;

    const jobsPath = 'jobs';
    const q = query(
      collection(db, jobsPath),
      where(currentUser.role === 'client' ? 'clientId' : 'professionalId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      let docList = snapshot.docs;
      
      const locallyDeletedSaved = localStorage.getItem('locallyDeletedJobs');
      const locallyDeletedSet = locallyDeletedSaved ? new Set(JSON.parse(locallyDeletedSaved)) : new Set();

      // Filter out pending, cancelled or locally deleted jobs so they do not show in active messages
      docList = docList.filter(doc => {
        const data = doc.data();
        return data.status !== 'pending' && 
               data.status !== 'cancelled' && 
               data.status !== 'cancelado' && 
               data.status !== 'canceled' &&
               !locallyDeletedSet.has(doc.id);
      });

      // Sort docs by updatedAt descending on client side
      docList.sort((a, b) => {
        const t1 = a.data().updatedAt?.toMillis ? a.data().updatedAt.toMillis() : 0;
        const t2 = b.data().updatedAt?.toMillis ? b.data().updatedAt.toMillis() : 0;
        return t2 - t1;
      });

      const chatList = await Promise.all(docList.map(async (jobDoc) => {
        const jobData = jobDoc.data();
        const otherUserId = currentUser.role === 'client' ? jobData.professionalId : jobData.clientId;
        
        // Dynamic labels and name retrieval matching Activity.tsx logic
        const otherRoleLabel = currentUser.role === 'client' ? 'Profesional' : 'Cliente';
        
        let otherUserName = currentUser.role === 'client' 
          ? (jobData.professionalName || otherRoleLabel) 
          : (jobData.clientName || otherRoleLabel);
          
        let otherUserPhoto = currentUser.role === 'client' ? (jobData.professionalAvatar || '') : (jobData.clientAvatar || '');

        // Fetch name from user profile if it's missing or just a generic label
        if (otherUserId && (otherUserName === otherRoleLabel || !otherUserName)) {
          const userDoc = await getDoc(doc(db, 'users', otherUserId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            otherUserName = userData.displayName || otherUserName;
            otherUserPhoto = userData.photoURL || otherUserPhoto;
          }
        }

        const date = jobData.updatedAt instanceof Timestamp 
          ? jobData.updatedAt.toDate() 
          : (jobData.updatedAt ? new Date(jobData.updatedAt) : new Date());

        const isUnread = jobData.hasUnreadMessage === true && jobData.lastMessageSenderId !== currentUser.uid;

        return {
          id: jobDoc.id,
          name: toTitleCase(otherUserName),
          photo: otherUserPhoto,
          lastMsg: jobData.lastMessage || (jobData.description ? jobData.description.substring(0, 35) + '...' : 'Sin descripción'),
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unread: isUnread,
          unreadCount: isUnread ? 1 : 0,
          status: jobData.status,
          otherUserId: otherUserId
        };
      }));

      // If we have initialChatData and it's not in the list, add it as a temporary entry
      if (initialChatData && !chatList.find(c => c.id === initialChatData.id)) {
        chatList.push({
          photo: '',
          ...initialChatData,
          name: toTitleCase(initialChatData.name),
          unread: false,
          unreadCount: 0,
          status: 'active',
          otherUserId: initialChatData.otherUserId || ''
        } as any);
      }

      setChats(chatList);
      setLoadingChats(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Handle initial chat data if passed from another component
  useEffect(() => {
    if (initialChatData && !activeChatId) {
      setActiveChatId(initialChatData.id);
    }
  }, [initialChatData]);

  // Mark as read when active chat changes or chat updates
  useEffect(() => {
    if (activeChatId) {
      const currChat = chats.find(c => c.id === activeChatId);
      if (currChat?.unread) {
        chatService.markChatAsRead(activeChatId);
      }
    }
  }, [activeChatId, chats]);

  // Subscribe to messages when a chat is active
  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      return;
    }

    const unsubscribe = chatService.subscribeToMessages(activeChatId, (newMessages) => {
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [activeChatId]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeChatId]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!newMessage.trim() && !selectedImage) || !activeChatId || isSending) return;
    
    const text = newMessage;
    const image = selectedImage;
    setNewMessage('');
    setSelectedImage(null);
    setIsSending(true);

    try {
      await chatService.sendMessage(activeChatId, text || undefined, image || undefined);
    } catch (error) {
      console.error("Failed to send message:", error);
      setNewMessage(text);
      setSelectedImage(image);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Auto-compress image to stay safely under Firestore's 1MB limit & send smoothly
      const compressedBase64 = await compressImage(file);
      setSelectedImage(compressedBase64);
    } catch (error) {
      console.error("Error compressing message attachment:", error);
      alert("Error al procesar la imagen. Intentá con otra.");
    }
  };

  const activeChat = chats.find(c => c.id === activeChatId);

  // Subscribe to other user's online state in real-time
  useEffect(() => {
    if (!activeChatId || !activeChat?.otherUserId) {
      setOtherUserOnline(null);
      return;
    }

    const otherUid = activeChat.otherUserId;
    const userDocRef = doc(db, 'users', otherUid);
    
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const isUserOnline = data.online === true;
        setOtherUserOnline(isUserOnline);
      } else {
        setOtherUserOnline(false);
      }
    }, (err) => {
      console.warn("Failed to subscribe to user presence:", err);
      setOtherUserOnline(null);
    });

    return () => unsubscribe();
  }, [activeChatId, activeChat?.otherUserId]);

  const filteredChats = chats.filter(chat => {
    if (filter === 'No leídos' && !chat.unread) return false;
    if (filter === 'Servicios Activos' && chat.status !== 'in_progress') return false;
    if (searchTerm && !chat.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg-secondary pb-32 font-sans relative selection:bg-primary selection:text-white">
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-bg-secondary/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 border-b border-black/5 dark:border-white/10 shadow-sm animate-in fade-in duration-300">
        <div className="flex items-center justify-between select-none relative">
          {/* Left aligned logo as dominant element with section title underneath */}
          <div className="flex items-center gap-2 select-none filter drop-shadow-[0_1.5px_3.5px_rgba(0,82,255,0.18)]">
            <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <defs>
                <linearGradient id="qGradientHead_Mensajes_Exact" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0052FF" />
                  <stop offset="100%" stopColor="#00D8FF" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="32" stroke="url(#qGradientHead_Mensajes_Exact)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <path d="M 68 68 L 84 84" stroke="url(#qGradientHead_Mensajes_Exact)" strokeWidth="18" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight font-manrope text-slate-900 dark:text-white leading-none">
                Quick<span className="text-[#0052FF] dark:text-[#00D8FF]">Fix</span>
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#0052FF] dark:text-[#00D8FF] shrink-0">
                  Mensajes
                </span>
                <span className="text-[8px] text-slate-300 dark:text-slate-700 font-bold">•</span>
                <div className="flex items-center gap-1">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#00D8FF] animate-pulse"></span>
                  <span className="text-[8px] font-black uppercase tracking-wider text-text-muted">
                    {currentUser?.role === 'client' ? 'Cliente' : 'Profesional'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side alignment: Notification Bell and User Photo/Avatar */}
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotificationsList(!showNotificationsList)}
              className={`relative w-12 h-12 rounded-[20px] flex items-center justify-center transition-all ${
                showNotificationsList 
                  ? 'bg-primary text-white shadow-premium' 
                  : 'bg-bg-primary text-text-muted border border-gray-100 dark:border-gray-800 shadow-soft hover:text-primary'
              }`}
            >
              <Bell size={22} className={showNotificationsList ? "fill-white/20" : ""} />
              <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-alert rounded-full border-2 border-white dark:border-bg-primary shadow-sm"></span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProfileClick}
              className="w-12 h-12 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary shadow-premium active:scale-95 transition-transform overflow-hidden"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-bg-secondary border-2 border-white dark:border-bg-primary">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted bg-bg-secondary">
                    <UserIcon size={18} />
                  </div>
                )}
              </div>
            </motion.button>
          </div>

          {/* Floating Notifications List within absolute space */}
          <AnimatePresence>
            {showNotificationsList && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-[60px] right-0 w-80 bg-white dark:bg-[#1C1C1E] dark:border-gray-800 rounded-2xl shadow-premium border border-gray-100 dark:border-gray-800 overflow-hidden z-[100]"
              >
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-[#1C1C1E]">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#111111] dark:text-white text-sm">Notificaciones</h4>
                    {notifications.filter(n => !deletedNotifIds.includes(n.id)).length > 0 && (
                      <button 
                        onClick={handleClearAllNotifications}
                        className="text-[9.5px] text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-extrabold uppercase tracking-wider ml-1 px-1.5 py-0.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>
                  <button onClick={() => setShowNotificationsList(false)} className="text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1 cursor-pointer">
                    <CloseIcon size={16} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.filter(n => !deletedNotifIds.includes(n.id)).length > 0 ? (
                    notifications.filter(n => !deletedNotifIds.includes(n.id)).map((notif) => (
                      <div 
                        key={notif.id} 
                        className="p-4 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 relative group transition-all"
                      >
                        <div className="flex gap-3 pr-7 cursor-pointer">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'hire_request' ? 'bg-primary/10 text-primary' : notif.type === 'success' ? 'bg-success/10 text-success' : 'bg-secondary/10 text-secondary'}`}>
                            <Bell size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#111111] dark:text-white leading-tight break-words">{notif.title}</p>
                            <p className="text-[11px] text-gray-500 mt-1 break-words">{notif.description}</p>
                            <p className="text-[9px] font-bold text-text-muted mt-1 uppercase tracking-wider">{notif.time}</p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={(e) => handleDeleteNotification(notif.id, e)}
                          className="absolute right-2 top-2 p-1 text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-all cursor-pointer opacity-80 hover:opacity-100"
                          title="Eliminar"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                        <Bell size={24} />
                      </div>
                      <p className="text-xs text-text-muted font-bold">No tienes notificaciones pendientes</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-muted/40 group-focus-within:text-primary transition-colors">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar contactos o mensajes..."
            className="w-full bg-bg-secondary rounded-[20px] h-12 pl-12 pr-4 outline-none border border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-bg-primary transition-all text-sm font-bold placeholder:font-semibold placeholder:text-text-muted/50 shadow-inner"
          />
        </div>

        <div className="flex justify-around gap-1.5 -mx-2 px-2 py-1">
          {['Todos', 'No leídos', 'Servicios Activos'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap flex-1 py-1.5 px-1 rounded-2xl text-[9px] sm:text-[10px] font-bold transition-all flex items-center justify-center ${
                filter === f 
                  ? 'bg-gradient-to-r from-[#0052FF] to-[#00D8FF] text-white scale-105 shadow-md shadow-[#0052FF]/20' 
                  : 'bg-bg-secondary text-text-muted hover:bg-white dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <main className="px-6 py-6 flex flex-col gap-4 max-w-lg mx-auto w-full">
        {loadingChats ? (
          <div className="flex flex-col gap-4">
             {[1, 2, 3, 4].map((i) => (
                <div key={i} className="px-4 py-4 rounded-[28px] bg-white dark:bg-bg-primary border border-gray-100 dark:border-gray-800 flex items-center gap-4 animate-pulse shadow-sm">
                   <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex-shrink-0"></div>
                   <div className="flex-1 min-w-0 pr-2 flex flex-col gap-2.5">
                      <div className="flex justify-between items-center">
                         <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-1/3"></div>
                         <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-md w-10"></div>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-md w-2/3"></div>
                   </div>
                </div>
             ))}
          </div>
        ) : chats.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredChats.map((chat) => (
              <div 
                key={chat.id}
                className="relative overflow-hidden rounded-[24px]"
              >
                {/* Swipe background actions simulation */}
                <div className="absolute inset-0 flex">
                   <div className="w-1/2 h-full bg-blue-500/10 flex items-center pl-6">
                      <Archive className="text-blue-500" size={20} />
                   </div>
                   <div className="w-1/2 h-full bg-red-500/10 flex items-center justify-end pr-6">
                      <Trash2 className="text-red-500" size={20} />
                   </div>
                </div>

                {/* Actual chat card inside a draggable motion div (simulated swipe) */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.02, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`px-4 py-3.5 rounded-2xl flex items-center gap-4 border active:scale-[0.98] transition-all cursor-pointer relative z-10 shadow-sm hover:shadow-md ${chat.unread ? 'mensaje-no-leido bg-[#0052FF]/5 dark:bg-[#00D8FF]/5 border-[#0052FF]/15 dark:border-[#00D8FF]/15' : 'bg-white dark:bg-bg-primary border-slate-100 dark:border-slate-800'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-bg-secondary flex flex-shrink-0 items-center justify-center text-primary relative shadow-sm border border-gray-50 dark:border-gray-800">
                    {chat.photo ? (
                      <img src={chat.photo || undefined} alt={chat.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <UserIcon size={20} />
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-white dark:border-bg-primary shadow-sm"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className="font-bold text-text-main text-[15px] truncate max-w-[150px] font-manrope">{chat.name}</h3>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap">{chat.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {!chat.unread && Math.random() > 0.5 && ( // simulate read receipts for some
                        <CheckCheck size={14} className="text-primary opacity-80 shrink-0" />
                      )}
                      <p className={`text-[13px] truncate ${chat.unread ? 'text-text-main font-bold' : 'text-gray-500 font-medium'}`}>
                        {chat.lastMsg}
                      </p>
                    </div>
                  </div>
                  
                  {chat.unread && (
                    <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full shadow-sm ml-auto"></div>
                  )}
                </motion.div>
              </div>
            ))}
            {filteredChats.length === 0 && (
              <div className="text-center pt-10 text-sm font-bold text-text-muted">
                No se encontraron chats con ese filtro.
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center pt-16 text-center px-4 w-full">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-blue-50 dark:bg-blue-950/20 rounded-[44px] flex items-center justify-center text-blue-500 shadow-soft border border-blue-100 dark:border-blue-900/30">
                <MessageSquare size={44} className="stroke-[1.5]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-bg-primary">
                <Sparkles size={14} />
              </div>
            </div>
            
            <h3 className="text-lg font-extrabold text-text-main font-manrope">Bandeja Vacía</h3>
            <p className="text-xs text-text-muted mt-2.5 max-w-[280px] font-semibold leading-relaxed">
              {currentUser?.role === 'client' 
                ? 'Aún no tienes mensajes. ¡Busca un especialista cerca de ti para presupuestar tu trabajo!'
                : 'Aún no tienes mensajes. ¡Espera el contacto de nuevos clientes o revisa los trabajos disponibles!'}
            </p>

            <button 
              onClick={onBack}
              className="mt-6 h-11 bg-primary hover:bg-primary/95 text-white font-black text-[11px] uppercase tracking-wider px-6 rounded-2xl shadow-md shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Search size={14} /> {currentUser?.role === 'client' ? 'Buscar un especialista' : 'Ver solicitudes de trabajo'}
            </button>
          </div>
        )}
      </main>

      {/* Real Chat Interface Overlay */}
      <AnimatePresence>
        {activeChatId && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1050] bg-bg-secondary flex flex-col"
          >
            {/* Header */}
            <header className="h-24 glass border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 shrink-0 z-50">
              <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setActiveChatId(null); }}
                  className="w-12 h-12 flex items-center justify-center text-text-main rounded-[20px] bg-bg-primary hover:bg-white dark:hover:bg-gray-800 active:scale-95 transition-all shadow-soft border border-black/5 dark:border-white/5"
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-[20px] overflow-hidden shadow-premium border-2 border-white dark:border-gray-800 relative">
                       {activeChat?.photo ? (
                         <img src={activeChat.photo || undefined} alt={activeChat.name} className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full bg-bg-secondary flex items-center justify-center text-primary">
                           <UserIcon size={24} />
                         </div>
                       )}
                       <div className={`absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900 shadow-sm ${otherUserOnline === false ? 'bg-gray-400' : 'bg-success'}`}></div>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-black text-text-main text-[17px] leading-tight font-manrope tracking-tight">
                        {activeChat?.name || 'Canal de Chat'}
                      </h2>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${otherUserOnline === false ? 'text-text-muted opacity-50' : 'text-success'}`}>
                          {otherUserOnline === false ? 'Desconectado' : 'En línea'}
                        </span>
                        <span className="text-[9px] text-text-muted font-bold opacity-30 tracking-tight">• Encriptación Activa</span>
                      </div>
                    </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:bg-bg-primary transition-colors">
                  <RotateCcw size={18} />
                </button>
              </div>
            </header>

            {/* Chat History */}
            <div ref={scrollRef} className="chat-container flex-1 overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed opacity-95">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full opacity-20 select-none">
                   <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
                     <MessageSquare size={44} className="text-primary" />
                   </div>
                   <h4 className="text-sm font-black uppercase tracking-[0.4em] text-text-main mb-2">Canal Seguro</h4>
                   <p className="text-[10px] font-bold text-text-muted max-w-[200px] text-center leading-relaxed">
                     Tu privacidad es nuestra prioridad. Todos los mensajes están protegidos.
                   </p>
                </div>
              )}
              
              <AnimatePresence mode="popLayout">
                {messages.map((msg, index) => {
                  const isMe = msg.senderId === user?.uid;
                  const showAvatar = !isMe && (index === 0 || messages[index - 1].senderId !== msg.senderId);
                  const timeStr = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  
                  return (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, x: isMe ? 20 : -20, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.8 }}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${isMe ? 'self-end' : 'self-start'}`}
                    >
                      <div className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                        {!isMe && (
                          <div className={`w-9 h-9 rounded-[14px] overflow-hidden shrink-0 shadow-soft border-2 border-white dark:border-gray-800 transition-all duration-300 ${showAvatar ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`}>
                            {activeChat?.photo ? (
                              <img src={activeChat.photo || undefined} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-bg-secondary flex items-center justify-center text-primary">
                                <UserIcon size={16} />
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div 
                          className={`px-5 py-4 shadow-premium transition-all relative group ${
                            isMe 
                              ? 'bg-primary text-white rounded-[26px] rounded-tr-[6px] shadow-[0_12px_24px_rgba(62,154,179,0.15)]' 
                              : 'bg-white dark:bg-bg-primary text-text-main border border-gray-100 dark:border-white/5 rounded-[26px] rounded-tl-[6px]'
                          }`}
                        >
                          {msg.imageUrl && (
                            <img 
                              src={msg.imageUrl} 
                              alt="Archivo adjunto" 
                              className="max-w-full rounded-xl mb-2 cursor-pointer hover:opacity-90 transition-opacity" 
                              onClick={() => window.open(msg.imageUrl, '_blank')}
                            />
                          )}
                          {msg.text && <p className="text-[15px] font-bold leading-relaxed tracking-tight">{msg.text}</p>}
                          
                          <div className={`flex items-center gap-2 mt-2.5 opacity-30 transition-opacity group-hover:opacity-100 ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-[9px] font-black uppercase tracking-[0.1em]">{timeStr}</span>
                            {isMe && (
                              <div className="flex gap-0.5">
                                <CheckCircle size={10} className="text-white/80" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Message Input Container */}
            <div className="input-area p-4 md:p-6 bg-white dark:bg-bg-primary border-t border-gray-100/50 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
              {['paid_completed', 'completado', 'completed'].includes(activeChat?.status || '') ? (
                <div className="max-w-xl mx-auto flex items-center justify-center p-4 bg-bg-secondary rounded-[22px] border border-gray-100 dark:border-gray-800 text-center w-full">
                  <p className="text-sm font-bold text-text-muted">Chat bloqueado: el trabajo ha finalizado. Puedes contactar a soporte desde tu perfil.</p>
                </div>
              ) : (
                <>
                  {selectedImage && (
                    <div className="max-w-xl mx-auto mb-4 relative inline-block">
                      <img src={selectedImage} alt="Preview" className="h-20 w-20 object-cover rounded-xl border-2 border-primary shadow-soft" />
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-2 -right-2 bg-alert text-white rounded-full p-1 shadow-premium"
                      >
                        <CloseIcon size={12} />
                      </button>
                    </div>
                  )}
                  
                  {/* Quick Chat Replies Bar */}
                  <div className="max-w-xl mx-auto flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    {(currentUser?.role === 'professional' 
                      ? ["¡Hola! Ya voy.", "Hola, ¿me pasas la dirección?", "¿Te sirve si paso hoy?", "Presupuesto enviado.", "Trabajo terminado, ¿calificas? 😊"]
                      : ["¡Hola! Entendido.", "Sí, te espero.", "Estoy en casa.", "Dale, te confirmo.", "¡Muchas gracias!"]
                    ).map((reply, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setNewMessage(reply)}
                        className="px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-full text-xs font-bold text-text-muted hover:text-text-main transition-all shrink-0 border border-gray-100/50 dark:border-white/5 shadow-soft cursor-pointer active:scale-95"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="max-w-xl mx-auto flex items-center gap-2 md:gap-3 w-full">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-bg-secondary text-text-muted rounded-[18px] hover:bg-gray-100 transition-colors border border-gray-100 dark:border-gray-800 shrink-0"
                    >
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="text-lg md:text-xl font-bold leading-none">+</span>
                      </div>
                    </button>
                    <div className="flex-grow flex-1 min-w-0 relative flex items-center">
                      <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Tu mensaje..."
                        className="w-full h-11 md:h-14 bg-bg-secondary shadow-inner border border-gray-100 dark:border-gray-800 rounded-[22px] px-4 md:pl-6 md:pr-14 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all text-text-main placeholder:text-text-muted/40"
                      />
                      <div className="hidden md:flex absolute right-4 text-text-muted/30">
                        <MessageSquare size={18} />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={(!newMessage.trim() && !selectedImage) || isSending}
                      className="w-11 h-11 md:w-14 md:h-14 flex items-center justify-center text-white rounded-[22px] shadow-premium disabled:grayscale disabled:opacity-30 transition-all bg-primary hover:scale-105 active:scale-95 group shrink-0"
                    >
                      {isSending ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Send size={18} className={`transition-transform duration-300 ${newMessage.trim() || selectedImage ? "translate-x-0.5 -translate-y-0.5" : ""}`} />
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
