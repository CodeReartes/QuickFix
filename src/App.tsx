/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './services/authService';
import { ThemeProvider } from './services/themeService';
import { ConfigProvider } from './services/configService';
import { usePushNotifications } from './services/notificationService';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, MessageSquare, X, ShieldAlert, Sparkles, MapPin, AlertCircle, ExternalLink, Copy, Check, RefreshCw } from 'lucide-react';
import BottomNav from './components/BottomNav';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { FormProvider } from './services/formService';

function safeLazy(importFn: () => Promise<any>) {
  return lazy(() => 
    importFn().catch((err) => {
      console.warn("Failed to dynamically load chunk, reloading page...", err);
      const lastReload = sessionStorage.getItem('last_chunk_reload');
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('last_chunk_reload', now.toString());
        window.location.reload();
      }
      return { default: () => <div className="p-8 text-center text-text-muted">Error al cargar el componente. Por favor recarga la página.</div> };
    })
  );
}

const Onboarding = safeLazy(() => import('./components/Onboarding'));
const ReportProblem = safeLazy(() => import('./components/ReportProblem'));
const NearbyJobs = safeLazy(() => import('./components/NearbyJobs'));
const JobInProgress = safeLazy(() => import('./components/JobInProgress'));
const RatingModal = safeLazy(() => import('./components/RatingModal'));
const Messages = safeLazy(() => import('./components/Messages'));

const Activity = safeLazy(() => import('./components/Activity'));
const Profile = safeLazy(() => import('./components/Profile'));
const AdminDashboard = safeLazy(() => import('./components/AdminDashboard'));

type AppTab = 'home' | 'activity' | 'messages' | 'profile';

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; 
  return d;
}

interface AuthErrorModalProps {
  error: any;
  onClose: () => void;
}

function AuthErrorModal({ error, onClose }: AuthErrorModalProps) {
  const [copiedDev, setCopiedDev] = useState(false);

  const currentHost = window.location.hostname;
  const currentOrigin = window.location.origin;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedDev(true);
      setTimeout(() => setCopiedDev(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-white dark:bg-[#0D161B] rounded-[32px] border border-gray-100 dark:border-white/5 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-left flex flex-col gap-5 max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-full text-text-muted hover:text-text-main transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-alert/10 text-alert flex items-center justify-center shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-alert uppercase tracking-widest font-mono">Error de Autenticación de Firebase</span>
            <h2 className="text-xl font-bold text-text-main mt-0.5 leading-snug">Conexión Bloqueada o Fallida</h2>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-white/5 w-full"></div>

        {/* Error Detail */}
        <div className="p-3 bg-red-50/50 dark:bg-alert/5 border border-alert/15 rounded-2xl text-xs flex flex-col gap-1.5 font-sans">
          <p className="font-bold text-alert">Detalles del Error:</p>
          <code className="font-mono text-[11px] bg-white/60 dark:bg-black/20 p-2 rounded-xl text-text-main break-all whitespace-pre-wrap leading-relaxed shadow-sm">
            {error?.message || String(error)}
          </code>
        </div>

        {/* Solutions Helper */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1 text-sm text-text-muted font-medium leading-relaxed max-h-[40vh] no-scrollbar">
          <p className="text-text-main font-semibold">Este error suele ocurrir porque el navegador o la consola de Firebase bloquea la autenticación. Sigue estos pasos para solucionarlo:</p>
          
          {/* Solución 1 */}
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
            <div className="flex-1">
              <p className="font-bold text-text-main flex items-center gap-1.5">
                Opción Recomendada: Abrir en pestaña nueva
              </p>
              <p className="text-xs mt-1 text-text-muted">
                Los navegadores suelen bloquear las popups y cookies dentro de iframes. Abrir la app directamente en su propia pestaña soluciona el problema de inmediato:
              </p>
              <a 
                href={currentOrigin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-primary text-white hover:bg-primary/90 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Abrir en pestaña nueva <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Solución 2 */}
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
            <div className="flex-1">
              <p className="font-bold text-text-main">Autorizar el dominio en la Consola de Firebase</p>
              <p className="text-xs mt-1 text-text-muted">
                Asegúrate de agregar este dominio en tu Consola de Firebase &gt; Authentication &gt; pestaña **Settings** (Configuración) &gt; **Authorized domains** (Dominios autorizados):
              </p>

              {/* Dominio Copiable */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold font-mono">Dominio actual</span>
                    <span className="font-mono text-xs text-text-main truncate max-w-[200px] sm:max-w-xs">{currentHost}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentHost)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-text-muted hover:text-text-main transition-all shrink-0"
                    title="Copiar Dominio"
                  >
                    {copiedDev ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Solución 3 */}
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
            <div className="flex-1">
              <p className="font-bold text-text-main">Desactivar Shields o Permitir Cookies</p>
              <p className="text-xs mt-1 text-text-muted">
                Si estás usando Brave o bloqueadores potentes (adblockers), desactiva la protección de rastreo temporalmente, ya que bloquea el flujo de Google Login.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-white/5 w-full"></div>

        {/* Actions Button */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 text-text-main font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm"
          >
            Entendido
          </button>
          
          <button
            onClick={() => {
              onClose();
            }}
            className="flex-1 h-12 rounded-2xl bg-primary text-white font-bold hover:scale-[1.02] active:scale-[0.98] shadow-premium transition-all text-sm flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} /> Reintentar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AppContent() {
  const { user, effectiveUser, loading, signIn, signOut, adminViewRole, setAdminViewRole } = useAuth();
  const pushNotifications = usePushNotifications();
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [specialScreen, setSpecialScreen] = useState<'onboarding' | 'job_in_progress' | null>(null);
  const [showRating, setShowRating] = useState(false);
  const [pendingChatData, setPendingChatData] = useState<{ id: string, name: string, lastMsg: string, time: string, unread: boolean, photo?: string } | undefined>(undefined);
  const [whatsappNotification, setWhatsappNotification] = useState<{
    id: string;
    title: string;
    body: string;
    avatar: string;
    type: 'message' | 'proposal';
    category?: string;
  } | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  
  const [hiddenJobIds, setHiddenJobIds] = useState<string[]>([]);
  const [authError, setAuthError] = useState<any>(null);
  const [pendingNavigationData, setPendingNavigationData] = useState<any>(null);
  
  // Admin View Logic
  const isAdminUser = user?.email === 'reartes17diego@gmail.com';

  // Validate admin access
  useEffect(() => {
    if (user && adminViewRole === 'admin' as any && !isAdminUser) {
      // If a standard client or professional tries to access admin, clear the admin mode view to let them enter their respective accounts automatically
      setAdminViewRole(null);
    }
  }, [user, isAdminUser, adminViewRole, setAdminViewRole]);

  // Use effective user for all operations
  const currentUser = effectiveUser;
  const effectiveRole = currentUser?.role;

  // Prevent automatic presence updates as they consume significant free-tier write quotas quickly
  // In a real app with paid tier you would track user presence here
  useEffect(() => {
    /* 
    if (!currentUser?.uid) return;
    const updatePresence = async (isOnlineVal: boolean) => {
      //... 
    };
    */
  }, [currentUser?.uid]);
  
  const initialLoadTracker = useRef(true);

  // Global listener for new jobs, status changes, and new messages
  useEffect(() => {
    if (!currentUser || (isAdminUser && !adminViewRole)) return;

    const q = query(
      collection(db, 'jobs'),
      where(effectiveRole === 'client' ? 'clientId' : 'professionalId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Update overall unread messages badge
      let totalUnread = 0;
      snapshot.docs.forEach(docSnap => {
        const d = docSnap.data();
        if (d.hasUnreadMessage === true && d.lastMessageSenderId && d.lastMessageSenderId !== currentUser.uid) {
           totalUnread += 1;
        }
      });
      setUnreadMessages(totalUnread);

      if (initialLoadTracker.current) {
        initialLoadTracker.current = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        if (change.type === 'modified') {
          // Check for a new message update
          // We only want to trigger notification if it is marked as unread.
          // (When the chat is opened, hasUnreadMessage is set to false, so it will trigger another modified change but we ignore it here)
          if (data.hasUnreadMessage === true && data.lastMessageSenderId && data.lastMessageSenderId !== currentUser.uid) {
            const otherUserName = effectiveRole === 'client' ? (data.professionalName || 'Profesional') : (data.clientName || 'Cliente');
            const otherUserAvatar = effectiveRole === 'client' ? (data.professionalAvatar || '') : (data.clientAvatar || '');
            
            // Avoid duplicate notifications in quick succession for same chat
            if (!sessionStorage.getItem(`notified_${change.doc.id}_${data.lastMessage}`)) {
              sessionStorage.setItem(`notified_${change.doc.id}_${data.lastMessage}`, '1');
              
              setWhatsappNotification({
                id: change.doc.id,
                title: otherUserName,
                body: data.lastMessage || '¡Nuevo mensaje recibido!',
                avatar: otherUserAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.lastMessageSenderId}`,
                type: 'message'
              });

              if (pushNotifications.permission === 'granted') {
                pushNotifications.showNotification(`Mensaje de ${otherUserName}`, {
                  body: data.lastMessage || '¡Nuevo mensaje!',
                  icon: '/vite.svg',
                });
              }
            }
          } else {
            // Service status modifications
            if (pushNotifications.permission === 'granted') {
              if (data.status === 'in_progress') {
                pushNotifications.showNotification('¡Servicio en Progreso!', {
                  body: 'El profesional está en camino o trabajando.',
                  icon: '/vite.svg',
                });
              } else if (data.status === 'completed' || data.status === 'completado') {
                pushNotifications.showNotification('¡Servicio Finalizado!', {
                  body: 'Por favor, califica al profesional en la app.',
                  icon: '/vite.svg',
                });
              }
            }
          }
        }
      });
    });

    return () => unsubscribe();
  }, [currentUser, pushNotifications.permission, adminViewRole, effectiveRole]);

  // Listener for premium professionals to receive real-time notifications about new matching jobs in their area
  useEffect(() => {
    if (!currentUser || (effectiveRole !== 'premium' && effectiveRole !== 'professional')) return;

    const qPending = query(
      collection(db, 'jobs'),
      where('status', '==', 'pending')
    );

    let setupTime = Date.now();

    const unsubscribe = onSnapshot(qPending, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          const createdAtMs = data.createdAt?.toMillis ? data.createdAt.toMillis() : (data.createdAt ? new Date(data.createdAt).getTime() : Date.now());
          
          if (createdAtMs < setupTime - 10000) return; // avoid historic ones

          // Match specialty
          const userProfessions = currentUser.professions || ['Electricista'];
          const isMatchingSpecialty = userProfessions.some((p: string) => p.toLowerCase() === data.category?.toLowerCase());
          if (!isMatchingSpecialty && effectiveRole !== 'professional') return;

          // Match radius
          const searchRadiusLimit = parseInt(localStorage.getItem('searchRadius') || '5', 10);
          
          const notifyAboutProposal = (userLat: number, userLng: number) => {
            const jobLat = data.location?.lat;
            const jobLng = data.location?.lng;
            
            if (jobLat != null && jobLng != null) {
              const distance = getDistanceFromLatLonInKm(userLat, userLng, jobLat, jobLng);
              
              if (distance <= searchRadiusLimit) {
                const clientName = data.clientName || 'Cliente';
                const clientAvatar = data.clientAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.clientId}`;
                
                setWhatsappNotification({
                  id: change.doc.id,
                  title: `Propuesta de ${data.category}`,
                  body: `${clientName} solicita tu servicio a menos de ${distance.toFixed(1)} km: "${data.description || ''}"`,
                  avatar: clientAvatar,
                  type: 'proposal',
                  category: data.category
                });

                if (pushNotifications.permission === 'granted') {
                  pushNotifications.showNotification(`Nueva solicitud en tu zona`, {
                    body: `${data.category}: ${data.description || ''}`,
                    icon: '/vite.svg',
                  });
                }
              }
            }
          };

          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (pos) => notifyAboutProposal(pos.coords.latitude, pos.coords.longitude),
              () => notifyAboutProposal(-31.4167, -64.1833), // Cordoba center fallback
              { enableHighAccuracy: true, timeout: 5000 }
            );
          } else {
            notifyAboutProposal(-31.4167, -64.1833);
          }
        }
      });
    }, (error) => {
      console.error("Error watching pending jobs for premium:", error);
    });

    return () => unsubscribe();
  }, [currentUser, pushNotifications.permission, adminViewRole, effectiveRole]);

  // Auto Dismiss WhatsApp notifications after 12 seconds
  useEffect(() => {
    if (whatsappNotification) {
      const timer = setTimeout(() => {
        setWhatsappNotification(null);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [whatsappNotification]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setSpecialScreen('onboarding');
      } else {
        setSpecialScreen(null);
      }
    }
  }, [user, loading]);

  const handleRoleSelect = async (selectedRole: any) => {
    try {
      setAuthError(null);
      if (selectedRole === 'admin') {
         setAdminViewRole('admin' as any); 
         await signIn(); 
      } else {
         await signIn(selectedRole);
      }
    } catch (error: any) {
      if (error?.code === 'auth/cancelled-popup-request' || error?.code === 'auth/popup-closed-by-user') {
        console.log('Login cancelled by user.');
        return;
      }
      console.error("Error signing in:", error);
      setAuthError(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setSpecialScreen('onboarding');
      setActiveTab('home');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-premium"></div>
      </div>
    );
  }

  // Handle special full-screen states like onboarding
  if (specialScreen === 'onboarding') {
    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-bg-dark">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-premium"></div>
        </div>
      }>
        <Onboarding onContinue={handleRoleSelect} />
        <AnimatePresence>
          {authError && <AuthErrorModal error={authError} onClose={() => setAuthError(null)} />}
        </AnimatePresence>
      </Suspense>
    );
  }

  if (isAdminUser && (!adminViewRole || adminViewRole === 'admin' as any)) {
    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-bg-dark">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-premium"></div>
        </div>
      }>
        <AdminDashboard onSignOut={handleSignOut} onSwitchMode={(mode) => setAdminViewRole(mode)} />
      </Suspense>
    );
  }

  // Show dynamic custom screen for blocked/suspended users
  if (currentUser?.is_blocked && !isAdminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-bg-dark p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#0D161B] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 max-w-md w-full shadow-premium text-center flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-[22px] bg-alert/10 text-alert flex items-center justify-center">
            <ShieldAlert size={32} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-alert uppercase tracking-widest font-mono">Acceso Restringido</span>
            <h2 className="text-2xl font-bold text-text-main mt-1">Cuenta Suspendida</h2>
            <p className="text-sm text-text-muted mt-3 leading-relaxed">
              Tu cuenta ha sido temporalmente suspendida por la administración de Servicios Pro. 
              Si deseas resolver esta situación, ponte en contacto con nuestro equipo de soporte técnico.
            </p>
          </div>
          <div className="h-px bg-gray-100 dark:bg-white/5 w-full"></div>
          <button
            onClick={handleSignOut}
            className="w-full h-12 rounded-2xl bg-gray-100 dark:bg-white/5 text-text-main font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm"
          >
            Cerrar Sesión
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-text-main scroll-smooth transition-colors duration-300">
      {/* Floating Return to Admin Button */}
      {isAdminUser && adminViewRole && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setAdminViewRole(null)}
          className="fixed top-20 right-4 z-[100] bg-primary text-white px-4 py-2 rounded-full font-bold text-xs shadow-premium flex items-center gap-2 border border-white/20"
        >
          <ShieldAlert size={14} /> Panel Admin
        </motion.button>
      )}

      <Suspense fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-premium"></div>
        </div>
      }>
        {activeTab === 'home' && specialScreen === 'job_in_progress' && (
          <JobInProgress 
            onBack={() => setSpecialScreen(null)} 
            onFinalize={() => {
              setSpecialScreen(null);
              setShowRating(true);
            }}
          />
        )}

        {activeTab === 'home' && specialScreen !== 'job_in_progress' && (
          effectiveRole === 'client' 
            ? <ReportProblem 
                onProfileClick={() => setActiveTab('profile')} 
                onSuccess={() => setActiveTab('activity')}
              /> 
            : <NearbyJobs 
                onProfileClick={() => setActiveTab('profile')} 
                onTabChange={(tab: any) => setActiveTab(tab)}
                hiddenJobIds={hiddenJobIds}
                navigateTarget={pendingNavigationData}
                onCloseNavigation={() => {
                  setPendingNavigationData(null);
                  setActiveTab('activity');
                }}
                onJobAccepted={(job) => {
                  setHiddenJobIds(prev => [...prev, job.id]);
                }}
              />
        )}

        {activeTab === 'activity' && (
          <Activity 
            onProfileClick={() => setActiveTab('profile')}
            onNavigateToMap={(item) => {
              setPendingNavigationData(item);
              setActiveTab('home');
            }}
            onCancelJob={async (job) => {
              if (job.originalData) {
                // Real-time job cancellation
                try {
                  const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  await updateDoc(doc(db, 'jobs', job.id), {
                    status: 'cancelled',
                    updatedAt: serverTimestamp()
                  });
                } catch (e) {
                  console.error("Failed to cancel job in Firestore:", e);
                }
              }
            }}
            onNavigateToChat={(item) => {
              if (item) {
                const otherUid = currentUser?.role === 'client' 
                  ? item.originalData?.professionalId 
                  : item.originalData?.clientId;

                setPendingChatData({
                  id: item.originalJobId || String(item.id),
                  name: item.pro,
                  lastMsg: 'Hola, vi tu solicitud.',
                  time: 'Ahora',
                  unread: false,
                  photo: item.proAvatar,
                  otherUserId: otherUid
                } as any);
              }
              setActiveTab('messages');
            }} 
          />
        )}

        {activeTab === 'messages' && (
          <Messages 
            onProfileClick={() => setActiveTab('profile')}
            onBack={() => {
              setActiveTab('home');
              setPendingChatData(undefined);
            }} 
            initialChatData={pendingChatData} 
          />
        )}

        {activeTab === 'profile' && (
          <Profile user={currentUser} onSignOut={handleSignOut} />
        )}
      </Suspense>

      {!pendingNavigationData && (
        <BottomNav 
          activeTab={activeTab} 
          unreadMessages={unreadMessages}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab !== 'messages') {
              setPendingChatData(undefined);
            }
          }} 
        />
      )}

      <Suspense fallback={null}>
        {showRating && <RatingModal onClose={() => setShowRating(false)} />}
      </Suspense>

      {/* WhatsApp Notification Style Toast */}
      <AnimatePresence>
        {whatsappNotification && (
          <motion.div
            initial={{ opacity: 0, y: -80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -80, scale: 0.95 }}
            className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-[380px] z-[999] bg-white dark:bg-bg-primary rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-gray-800 p-4 shrink-0 flex flex-col gap-3 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95"
          >
            <div className="flex items-start gap-3">
              {/* Green active dot representing a live social call/msg notification */}
              <div className="relative shrink-0">
                <img 
                  src={whatsappNotification.avatar} 
                  alt="Notification face" 
                  className="w-12 h-12 rounded-full object-cover border border-gray-100 dark:border-gray-700" 
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${whatsappNotification.title}`;
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-white dark:border-bg-primary rounded-full flex items-center justify-center">
                  {whatsappNotification.type === 'message' ? (
                    <MessageSquare size={8} className="text-white fill-white" />
                  ) : (
                    <Sparkles size={8} className="text-white fill-white" />
                  )}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-text-main truncate pr-2">
                    {whatsappNotification.title}
                  </h4>
                  <span className="text-[10px] font-bold text-[#25D366] uppercase bg-[#25D366]/10 px-2 py-0.5 rounded-full">
                    {whatsappNotification.type === 'message' ? 'WhatsApp' : 'Zona Premium'}
                  </span>
                </div>
                <p className="text-xs font-medium text-text-muted mt-1 leading-relaxed line-clamp-2">
                  {whatsappNotification.body}
                </p>
              </div>
              <button 
                onClick={() => setWhatsappNotification(null)}
                className="text-text-muted/40 hover:text-text-main p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shrink-0"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="flex gap-2 font-manrope">
              {whatsappNotification.type === 'message' ? (
                <>
                  <button
                    onClick={() => {
                      setPendingChatData({
                        id: whatsappNotification.id,
                        name: whatsappNotification.title,
                        lastMsg: whatsappNotification.body,
                        time: 'Ahora',
                        unread: false,
                        photo: whatsappNotification.avatar
                      });
                      setActiveTab('messages');
                      setWhatsappNotification(null);
                    }}
                    className="flex-1 h-9 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1"
                  >
                    <MessageSquare size={12} className="fill-current" />
                    Responder
                  </button>
                  <button
                    onClick={() => setWhatsappNotification(null)}
                    className="flex-1 h-9 bg-bg-secondary hover:bg-gray-100 dark:hover:bg-gray-800 text-text-muted rounded-xl text-xs font-bold transition-all"
                  >
                    Ignorar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      setWhatsappNotification(null);
                    }}
                    className="flex-1 h-9 bg-primary text-white hover:bg-primary/90 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <MapPin size={12} />
                    Ver Mapa / Aceptar
                  </button>
                  <button
                    onClick={() => setWhatsappNotification(null)}
                    className="flex-1 h-9 bg-bg-secondary hover:bg-gray-100 dark:hover:bg-gray-800 text-text-muted rounded-xl text-xs font-bold transition-all"
                  >
                    Quizás más tarde
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {authError && <AuthErrorModal error={authError} onClose={() => setAuthError(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfigProvider>
          <FormProvider>
            <AppContent />
          </FormProvider>
        </ConfigProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
