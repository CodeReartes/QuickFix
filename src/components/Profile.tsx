import { motion, AnimatePresence } from 'motion/react';
import { Camera, ChevronRight, Settings, Shield, User, LogOut, X, CheckCircle, Loader2, Star, Award, TrendingUp, Download, MessageCircle, CreditCard, Crown, Copy, Upload, Clock, Briefcase, Gift, Eye, Zap, Bell, Trash2 } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../services/authService';
import { useTheme } from '../services/themeService';
import { useConfig } from '../services/configService';
import { sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { auth, db, handleFirestoreError } from '../lib/firebase';
import { compressImage } from '../lib/imageCompressor';
import { collection, query, where, getDocs, doc, updateDoc, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import SupportChat from './SupportChat';
import DisputeMediation from './DisputeMediation';
import { usePushNotifications } from '../services/notificationService';

const AVAILABLE_PROFESSIONS = [
  'Electricista',
  'Plomero',
  'Gasista',
  'Albañil',
  'Pintor',
  'Cerrajero',
  'Carpintero',
  'Técnico de Aire Acondicionado / Climatización',
  'Herrero',
  'Durlero / Yesero',
  'Techista / Impermeabilizaciones',
  'Jardinero',
  'Vidriero',
  'Limpieza de Consorcios y Edificios',
  'Pocero / Desagotes'
];

export default function Profile({ user, onSignOut }: { user: any, onSignOut: () => void }) {
  const { updateProfile, garantias_disponibles } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { config } = useConfig();
  const pushNotifications = usePushNotifications();
  const [activeModal, setActiveModal] = useState<'info' | 'prefs' | 'privacy' | 'rating' | 'earnings' | 'points' | 'support' | 'premium' | 'professions' | 'referrals' | 'wallet' | null>(null);
  const [showEmailVerifyModal, setShowEmailVerifyModal] = useState(false);
  const [typedVerificationCode, setTypedVerificationCode] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [devFallbackCode, setDevFallbackCode] = useState<string | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [supportChatTopic, setSupportChatTopic] = useState<string | undefined>(undefined);
  const [showDispute, setShowDispute] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [localPhoto, setLocalPhoto] = useState<string | null>(null);
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  
  // Sync localPhoto with user photo when user object changes
  useEffect(() => {
    if (user?.photoURL) {
      setLocalPhoto(null); // Clear local preview once we have the remote one
    }
  }, [user?.photoURL]);

  // Handle auto-triggering the premium membership modal when redirected
  useEffect(() => {
    if (localStorage.getItem('triggerPremiumModal') === 'true') {
      localStorage.removeItem('triggerPremiumModal');
      setActiveModal('premium');
    }
  }, []);

  // Local state for notification preferences
  const [localPushEnabled, setLocalPushEnabled] = useState(() => localStorage.getItem('pushEnabled') === 'true');
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(() => localStorage.getItem('vibrationEnabled') === 'true');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // States for Wallet Recharge
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('5000');
  const [isRecharging, setIsRecharging] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mp' | 'card' | 'transfer'>('transfer');
  const [transferProof, setTransferProof] = useState<string | null>(null);
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const transferFileInputRef = useRef<HTMLInputElement>(null);
  
  // States for 2-step Authentication (2FA)
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorSetupStep, setTwoFactorSetupStep] = useState(1); // 1: Welcome/Setup, 2: OTP, 3: Success
  const [isActivating2FA, setIsActivating2FA] = useState(false);

  // Notifications state for Profile header
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
        await deleteDoc(doc(db, 'notifications', id));
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
      for (const n of dbNotifs) {
        await deleteDoc(doc(db, 'notifications', n.id));
      }
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
  };

  const handleTransferProofUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingProof(true);
    try {
      const compressedBase64 = await compressImage(file, 600, 600, 0.75);
      setTransferProof(compressedBase64);
      showToast('Comprobante cargado correctamente.');
    } catch (error) {
      console.error('Error compressing/uploading proof:', error);
      showToast('Error al procesar la imagen del comprobante.');
    } finally {
      setIsUploadingProof(false);
    }
  };

  const handleClearRechargeRequest = async () => {
    try {
      await updateProfile({
        recharge_request: null
      });
    } catch (e) {
      console.error('Error clearing recharge request:', e);
    }
  };

  const handleRecharge = async () => {
    const amount = parseFloat(rechargeAmount);
    if (isNaN(amount) || amount <= 0) {
      showToast('Por favor, ingresa un monto válido.');
      return;
    }
    
    if (paymentMethod === 'transfer') {
      if (!transferProof) {
        showToast('¡Falta el comprobante! Por favor adjuntá la captura de tu transferencia.');
        return;
      }
      
      setIsRecharging(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      try {
        await updateProfile({
          recharge_request: {
            amount: amount,
            screenshot: transferProof,
            timestamp: Date.now(),
            status: 'PENDING_ADMIN_APPROVAL'
          }
        });
        showToast('¡Carga registrada! Queda pendiente de aprobación por el administrador, te avisamos al acreditarse.');
        setShowRechargeModal(false);
        setTransferProof(null);
      } catch (error) {
        console.error('Error submitting recharge request:', error);
        showToast('Error al registrar la carga. Intenta nuevamente.');
      } finally {
        setIsRecharging(false);
      }
      return;
    }

    setIsRecharging(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const currentBalance = user?.wallet_balance || 0;
      await updateProfile({
        wallet_balance: currentBalance + amount
      });
      showToast(`¡Carga de $${amount.toLocaleString('es-AR')} completada con éxito!`);
      setShowRechargeModal(false);
    } catch (error) {
      console.error('Error recharging wallet balance:', error);
      showToast('Error al procesar la carga. Intenta nuevamente.');
    } finally {
      setIsRecharging(false);
    }
  };

  const handleEnable2FA = async () => {
    if (twoFactorCode.length !== 6) {
      showToast('Por favor, ingresa el código de 6 dígitos.');
      return;
    }
    
    setIsActivating2FA(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      await updateProfile({
        twoFactorEnabled: true
      });
      showToast('¡Autenticación de 2 Factores habilitada con éxito!');
      setTwoFactorSetupStep(3); // Go to success step
    } catch (error) {
      console.error('Error enabling 2FA:', error);
      showToast('Ocurrió un error. Intenta nuevamente.');
    } finally {
      setIsActivating2FA(false);
    }
  };

  const handleDisable2FA = async () => {
    try {
      await updateProfile({
        twoFactorEnabled: false
      });
      showToast('Autenticación de 2 Factores desactivada.');
      setShowTwoFactorModal(false);
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      showToast('Error al procesar la solicitud.');
    }
  };
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>(user?.professions || ['Electricista']);
  const [professionCredentials, setProfessionCredentials] = useState<Record<string, { type: string; number: string; image?: string; verified?: boolean }>>(() => {
    const existing = user?.professionCredentials || {};
    if (Object.keys(existing).length === 0) {
      return {
        'Electricista': {
          type: 'Matrícula',
          number: 'M-48291-COPIME',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
          verified: true
        }
      };
    }
    return existing;
  });
  const [uploadingProfession, setUploadingProfession] = useState<string | null>(null);
  const fileInputProfRef = useRef<HTMLInputElement>(null);

  const handleProfPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingProfession) return;

    try {
      const compressedBase64 = await compressImage(file);
      setProfessionCredentials(prev => ({
        ...prev,
        [uploadingProfession]: {
          ...(prev[uploadingProfession] || { type: 'Ninguno', number: '' }),
          image: compressedBase64
        }
      }));
    } catch (err) {
      console.error("Error compressing certificate image:", err);
      showToast('Error al procesar la imagen de certificación');
    }
    if (fileInputProfRef.current) fileInputProfRef.current.value = '';
  };
  
  // Local state for profile editing
  const [editName, setEditName] = useState(user?.displayName || '');
  const [editPhone, setEditPhone] = useState(user?.phoneNumber || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editExperienceYears, setEditExperienceYears] = useState(user?.experienceYears?.toString() || '');
  const [editBasePrice, setEditBasePrice] = useState(user?.basePrice?.toString() || '');
  const [editCredentials, setEditCredentials] = useState(user?.credentials?.join('\n') || '');
  const [antecedentesUrl, setAntecedentesUrl] = useState(user?.antecedentes_url || '');
  const [taxStatus, setTaxStatus] = useState<'con_iva' | 'sin_iva'>(user?.tax_status || 'sin_iva');
  const [premiumReceipt, setPremiumReceipt] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Gamification & Referral States for Clients / Basic Customers
  const [clientPoints, setClientPoints] = useState(() => user?.client_points !== undefined ? user?.client_points : 0);
  const [invitedCount, setInvitedCount] = useState(() => user?.invited_users !== undefined ? user?.invited_users : 0);
  const [userCoupons, setUserCoupons] = useState<any[]>(() => user?.coupons !== undefined ? user?.coupons : []);
  const [pointsTab, setPointsTab] = useState<'info' | 'catalog' | 'coupons'>('catalog');
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [isSubmittingReferral, setIsSubmittingReferral] = useState(false);

  useEffect(() => {
    if (user && user.role === 'client') {
      const initClientRefData = async () => {
        try {
          const updates: any = {};
          let needsUpdate = false;
          
          const isCatalina = user.displayName?.toLowerCase().includes('catalina') || user.email === 'reartes17diego@gmail.com';
          const hasNotBeenReset = user.client_points !== 0 || user.invited_users !== 0 || (user.coupons && user.coupons.length > 0) || (user.referred_by !== undefined && user.referred_by !== null && user.referred_by !== '');
          
          if (isCatalina && hasNotBeenReset) {
            updates.client_points = 0;
            updates.invited_users = 0;
            updates.coupons = [];
            updates.referred_by = null; // Reset referred by
            needsUpdate = true;
            
            // Delete jobs associated with Catalina to wipe her job history in Firestore
            try {
              const qJobs = query(
                collection(db, 'jobs'),
                where('clientId', '==', user.uid)
              );
              const snapJobs = await getDocs(qJobs);
              for (const d of snapJobs.docs) {
                await deleteDoc(doc(db, 'jobs', d.id));
              }
              console.log("Deleted job history for Catalina successfully.");
            } catch (jobErr) {
              console.error("Error wiping jobs for Catalina:", jobErr);
              handleFirestoreError(jobErr, 'delete' as any, 'jobs');
            }
          } else {
            if (user.client_points === undefined) {
              updates.client_points = 0;
              needsUpdate = true;
            }
            if (user.invited_users === undefined) {
              updates.invited_users = 0;
              needsUpdate = true;
            }
            if (user.coupons === undefined) {
              updates.coupons = [];
              needsUpdate = true;
            }
          }
          
          const myRefCode = `PRO-${user.displayName?.split(' ')?.[0]?.toUpperCase() || 'CLIENT'}-${user.uid.substring(0, 4).toUpperCase()}`;
          if (user.referral_code === undefined) {
            updates.referral_code = myRefCode;
            needsUpdate = true;
          }
          
          if (needsUpdate) {
            await updateProfile(updates);
          }
          
          const refRef = doc(db, 'referral_codes', myRefCode);
          const refSnap = await getDoc(refRef);
          if (!refSnap.exists()) {
            await setDoc(refRef, {
              ownerId: user.uid,
              ownerName: user.displayName || 'Usuario',
              createdAt: Date.now()
            });
          }
        } catch (e) {
          console.error("Error initializing referral data in profile:", e);
          handleFirestoreError(e, 'write' as any, 'users');
        }
      };
      
      initClientRefData();
    }
  }, [user]);

  useEffect(() => {
    if (user?.client_points !== undefined) {
      setClientPoints(user.client_points);
    }
  }, [user?.client_points]);

  useEffect(() => {
    if (user?.invited_users !== undefined) {
      setInvitedCount(user.invited_users);
    }
  }, [user?.invited_users]);

  useEffect(() => {
    if (user?.coupons !== undefined) {
      setUserCoupons(user.coupons);
    }
  }, [user?.coupons]);

  const handleRedeemCoupon = async (couponName: string, pointsCost: number, benefitDesc: string) => {
    if (clientPoints < pointsCost) {
      showToast('Puntos insuficientes');
      return;
    }
    const nextPoints = clientPoints - pointsCost;
    const newCoupon = {
      id: Date.now().toString(),
      name: couponName,
      desc: benefitDesc,
      code: 'PRO-' + Math.random().toString(36).substring(2, 11).toUpperCase(),
      date: new Date().toLocaleDateString('es-AR')
    };
    const nextCoupons = [...userCoupons, newCoupon];
    let extraGarantias = user?.extra_garantias || 0;
    
    const updateData: any = {
      client_points: nextPoints,
      coupons: nextCoupons
    };
    
    if (couponName === 'Garantía Plus Extra') {
      extraGarantias += 1;
      updateData.extra_garantias = extraGarantias;
    }
    
    if (couponName === '1 Mes Premium de Regalo') {
      updateData.role = 'premium';
      updateData.is_premium = true;
      updateData.premium_status = 'active';
    }
    
    try {
      await updateProfile(updateData);
      setClientPoints(nextPoints);
      setUserCoupons(nextCoupons);
      showToast(`¡Canjeaste ${couponName} con éxito! 🎁`);
    } catch (err) {
      console.error(err);
      showToast('Error al procesar el canje');
    }
  };

  const handleActivateReferral = async (enteredCode: string) => {
    if (!user) return;
    const cleanCode = enteredCode.trim().toUpperCase();
    if (!cleanCode) {
      showToast('Ingresá un código válido');
      return;
    }

    const myRefCode = `PRO-${user.displayName?.split(' ')?.[0]?.toUpperCase() || 'CLIENT'}-${user.uid.substring(0, 4).toUpperCase()}`;
    if (cleanCode === myRefCode || (user.referral_code && cleanCode === user.referral_code)) {
      showToast('No podés usar tu propio código de invitación');
      return;
    }

    if (user.referred_by) {
      showToast('Ya ingresaste un código de referido anteriormente');
      return;
    }

    setIsSubmittingReferral(true);
    try {
      const refRef = doc(db, 'referral_codes', cleanCode);
      const refSnap = await getDoc(refRef);
      if (!refSnap.exists()) {
        showToast('El código ingresado no es válido o no existe ❌');
        setIsSubmittingReferral(false);
        return;
      }

      const { ownerId } = refSnap.data();
      if (ownerId === user.uid) {
        showToast('No podés usar tu propio código de invitación');
        setIsSubmittingReferral(false);
        return;
      }

      const inviterRef = doc(db, 'users', ownerId);
      const inviterSnap = await getDoc(inviterRef);
      if (!inviterSnap.exists()) {
        showToast('El usuario referente no fue encontrado');
        setIsSubmittingReferral(false);
        return;
      }

      const inviterData = inviterSnap.data();
      const currentInvited = inviterData.invited_users || 0;
      const currentPoints = inviterData.client_points || 0;
      
      const nextCount = currentInvited + 1;
      let pointsAwarded = 200; // standard reward
      
      if (nextCount === 1) pointsAwarded = 200;
      else if (nextCount === 5) pointsAwarded = 1200;
      else if (nextCount === 10) pointsAwarded = 3000;
      else if (nextCount === 25) pointsAwarded = 8000;
      else if (nextCount === 50) pointsAwarded = 18000;
      else if (nextCount === 100) pointsAwarded = 40000;
      
      const nextPoints = currentPoints + pointsAwarded;

      await updateDoc(inviterRef, {
        invited_users: nextCount,
        client_points: nextPoints
      });

      try {
        const notifRef = doc(collection(db, 'notifications'));
        await setDoc(notifRef, {
          recipientId: ownerId,
          title: '🏆 Amigo Invitado Registrado',
          description: `¡Tu amigo ${user.displayName || 'Usuario'} usó tu código! Ya sumaste a tu invitado #${nextCount} y recibiste +${pointsAwarded.toLocaleString('es-AR')} PTS Pro de regalo.`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString()
        });
      } catch (notifErr) {
        console.warn("Could not create notification for inviter:", notifErr);
      }

      const bonusPoints = 1000;
      const newUserPoints = (user.client_points ?? 8750) + bonusPoints;
      
      await updateDoc(doc(db, 'users', user.uid), {
        referred_by: cleanCode,
        client_points: newUserPoints
      });

      showToast(`¡Código activado con éxito! Recibiste +1.000 PTS de bienvenida 🎁`);
      setReferralCodeInput('');
    } catch (err: any) {
      console.error("Error activating referral:", err);
      showToast('Error al activar el código de invitación');
    } finally {
      setIsSubmittingReferral(false);
    }
  };

  const fileInputAntecedentesRef = useRef<HTMLInputElement>(null);

  const [stats, setStats] = useState({ 
    count: 0, 
    rating: 0, 
    totalRatings: 0, 
    earnings: { day: 0, week: 0, month: 0, total: 0 },
    detailedJobs: [] as any[],
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [bonusTab, setBonusTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchRadius, setSearchRadius] = useState(() => parseInt(localStorage.getItem('searchRadius') || '15', 10));
  const [lastResetTime, setLastResetTime] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem('openPremiumOnProfile') === 'true') {
      localStorage.removeItem('openPremiumOnProfile');
      setActiveModal('premium');
    }
  }, []);

  const toTitleCase = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  };

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'jobs'),
          where(user.role === 'client' ? 'clientId' : 'professionalId', '==', user.uid)
        );
        let snapshot;
        try {
          snapshot = await getDocs(q);
        } catch (err) {
          console.error("Error fetching jobs in profile:", err);
          throw err;
        }
        
        const validStatuses = ['completed', 'completado', 'paid_completed'];
        const jobs = snapshot.docs
                      .map(d => ({ id: d.id, ...d.data() }))
                      .filter((d: any) => validStatuses.includes(d.status));
        
        const count = jobs.length;
        let totalRating = 0;
        let ratingCount = 0;
        const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

        if (user.role === 'professional') {
          const reviewsQuery = query(collection(db, 'reviews'), where('professionalId', '==', user.uid));
          let reviewsSnap;
          try {
            reviewsSnap = await getDocs(reviewsQuery);
          } catch(err) {
            console.error("Error fetching reviews in profile:", err);
            throw err;
          }
          
          reviewsSnap.docs.forEach((d) => {
            const data = d.data();
            if (data.rating) {
              totalRating += data.rating;
              ratingCount++;
              const roundedRating = Math.round(data.rating);
              if (roundedRating >= 1 && roundedRating <= 5) {
                ratingDistribution[roundedRating as 5|4|3|2|1]++;
              }
            }
          });
        }
        
        const getStartOfDay = () => {
          const d = new Date();
          d.setHours(0, 0, 0, 0);
          return d.getTime();
        };
        const getStartOfWeek = () => {
          const d = new Date();
          const day = d.getDay();
          const diff = d.getDate() - day;
          return new Date(d.setDate(diff)).setHours(0, 0, 0, 0);
        };
        const getStartOfMonth = () => {
          const d = new Date();
          return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
        };

        const startOfDay = getStartOfDay();
        const startOfWeek = getStartOfWeek();
        const startOfMonth = getStartOfMonth();

        let dayEarnings = 0;
        let weekEarnings = 0;
        let monthEarnings = 0;
        let totalEarnings = 0;

        const parsePrice = (priceStr: any) => {
          if (!priceStr) return 0;
          const cleaned = priceStr.toString().replace('$', '').replace(/\./g, '').replace(',', '.');
          return parseFloat(cleaned) || 0;
        };

        const detailedJobs: any[] = [];

        jobs.forEach((job: any) => {
          if (job.rating && (user.role === 'client' || ratingCount === 0)) {
            totalRating += job.rating;
            ratingCount++;
            const roundedRating = Math.round(job.rating);
            if (roundedRating >= 1 && roundedRating <= 5) {
              ratingDistribution[roundedRating as 5|4|3|2|1]++;
            }
          }

          const price = parsePrice(job.price);
          const timestamp = job.updatedAt?.toDate ? job.updatedAt.toDate() : new Date();
          const jobTime = timestamp.getTime();

          if (jobTime >= startOfDay) dayEarnings += price;
          if (jobTime >= startOfWeek) weekEarnings += price;
          if (jobTime >= startOfMonth) monthEarnings += price;
          totalEarnings += price;

          detailedJobs.push({
            id: job.id,
            title: job.title || 'Servicio',
            price: job.price,
            numericPrice: price,
            date: timestamp.toLocaleDateString(),
            timestamp: jobTime
          });
        });

        // Sort detailed jobs by date desc
        detailedJobs.sort((a, b) => b.timestamp - a.timestamp);

        const staticCount = user.role === 'client' ? 1 : 0;

        setStats({
          count: count + staticCount,
          rating: ratingCount > 0 ? totalRating / ratingCount : 0.0,
          totalRatings: ratingCount,
          earnings: {
            day: dayEarnings,
            week: weekEarnings,
            month: monthEarnings,
            total: totalEarnings
          },
          detailedJobs,
          ratingDistribution
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStats();
  }, [user]);

  useEffect(() => {
    if (pushNotifications.permission === 'granted') {
      setLocalPushEnabled(true);
      localStorage.setItem('pushEnabled', 'true');
    }
  }, [pushNotifications.permission]);

  useEffect(() => {
    // Keep local edit state in sync with user prop when modal opens
    if (activeModal === 'info' || activeModal === 'professions') {
      setEditName(user?.displayName || '');
      setEditPhone(user?.phoneNumber || '');
      setEditBio(user?.bio || '');
      setEditExperienceYears(user?.experienceYears?.toString() || '');
      setEditBasePrice(user?.basePrice?.toString() || '');
      setEditCredentials(user?.credentials?.join('\n') || '');
      setAntecedentesUrl(user?.antecedentes_url || '');
      setTaxStatus(user?.tax_status || 'sin_iva');
      setSelectedProfessions(user?.professions || ['Electricista']);
      setProfessionCredentials(user?.professionCredentials || {});
    }
  }, [activeModal, user]);

  const togglePush = async () => {
    if (pushNotifications.permission !== 'granted') {
      try {
        const granted = await pushNotifications.requestPermission();
        if (granted) {
          setLocalPushEnabled(true);
          localStorage.setItem('pushEnabled', 'true');
          showToast('Notificaciones activadas');
        } else {
          // Fallback toggle for demo/preview environment
          const next = !localPushEnabled;
          setLocalPushEnabled(next);
          localStorage.setItem('pushEnabled', next.toString());
          showToast(next ? 'Notificaciones activadas (demo)' : 'Notificaciones desactivadas');
        }
      } catch (err) {
        // Handle potential errors in iframe environments
        const next = !localPushEnabled;
        setLocalPushEnabled(next);
        localStorage.setItem('pushEnabled', next.toString());
        showToast(next ? 'Notificaciones activadas (demo)' : 'Notificaciones desactivadas');
      }
    } else {
      const next = !localPushEnabled;
      setLocalPushEnabled(next);
      localStorage.setItem('pushEnabled', next.toString());
      showToast(next ? 'Notificaciones activadas' : 'Notificaciones desactivadas');
    }
  };

  const toggleVibration = () => {
    const next = !isVibrationEnabled;
    setIsVibrationEnabled(next);
    localStorage.setItem('vibrationEnabled', next.toString());
    showToast(next ? 'Vibración activada' : 'Vibración desactivada');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };


  const handleCancelSubscription = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        premium_status: 'none',
        is_premium: false
      });
      if (user.role === 'premium') {
         const newRole = user.professions ? 'professional' : 'client';
         await updateDoc(doc(db, 'users', user.uid), { role: newRole });
      }
      showToast('Tu membresía ha sido cancelada.');
    } catch (err) {
      console.error('Error cancelling premium', err);
      showToast('Error al procesar la cancelación.');
    }
  };

  const getUserLevel = (count: number) => {
    const isPremium = user?.role === 'premium' || user?.premium_status === 'active' || user?.is_premium;
    if (isPremium) return 'Diamante';

    const totalPoints = count * 150;
    if (totalPoints >= 3001) return 'Platino';
    if (totalPoints >= 1501) return 'Oro';
    if (totalPoints >= 501) return 'Plata';
    return 'Bronce';
  };

  const handleSendVerificationCode = async () => {
    if (!user?.email || !user?.uid) return;
    setIsSendingCode(true);
    setVerifyError(null);
    try {
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, uid: user.uid })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el código de verificación.');
      }
      
      if (data.dev_fallback_code) {
        setDevFallbackCode(data.dev_fallback_code);
        showToast('Código de prueba generado en terminal (Offline)');
      } else {
        setDevFallbackCode(null);
        showToast('Código enviado a tu bandeja de entrada.');
      }
      setShowEmailVerifyModal(true);
    } catch (err: any) {
      console.error('Error sending code:', err);
      showToast(err.message || 'Error al enviar el código.');
      setVerifyError(err.message || 'No se pudo conectar con el servidor.');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!typedVerificationCode || typedVerificationCode.length < 6) {
      setVerifyError('Por favor ingresa el código completo de 6 dígitos.');
      return;
    }
    setIsVerifyingCode(true);
    setVerifyError(null);
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, code: typedVerificationCode })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Código incorrecto. Inténtalo de nuevo.');
      }
      
      // Update FireStore and App state
      await updateProfile({ emailVerified: true });
      showToast('¡Correo verificado con éxito!');
      setShowEmailVerifyModal(false);
      setTypedVerificationCode('');
    } catch (err: any) {
      console.error('Error verifying code:', err);
      setVerifyError(err.message || 'Código incorrecto. Inténtalo de nuevo.');
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUpdatingPhoto(true);
    try {
      // Profile photos are small, compress to max 400x400
      const compressedBase64 = await compressImage(file, 400, 400, 0.7);

      setLocalPhoto(compressedBase64);
      await updateProfile({ photoURL: compressedBase64 });
      showToast('Foto de perfil actualizada correctamente');
    } catch (err) {
      console.error("Error saving profile photo:", err);
      showToast('Error al guardar la foto de perfil: ' + (err as Error).message);
      setLocalPhoto(null);
    } finally {
      setIsUpdatingPhoto(false);
    }
  };

  const MODAL_CONTENT: any = {
    professions: {
      title: 'Profesiones y Certificados',
      content: (
        <div className="flex flex-col gap-6 font-sans">
          <p className="text-sm font-medium text-text-muted leading-relaxed">
            Selecciona tus especialidades para trabajar en Córdoba Capital y carga tu título, matrícula o constancia de curso para generar más confianza.
          </p>

          {/* Profession Selector */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black text-text-muted uppercase tracking-widest pl-1">
              Mis Especialidades (Multi-selección)
            </h4>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_PROFESSIONS.map(prof => {
                const isSelected = selectedProfessions.includes(prof);
                return (
                  <button
                    key={prof}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedProfessions(prev => prev.filter(p => p !== prof));
                      } else {
                        setSelectedProfessions(prev => [...prev, prof]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 ${
                      isSelected 
                        ? 'bg-primary border-primary text-white shadow-soft font-black' 
                        : 'bg-transparent border-gray-200 dark:border-gray-800 text-text-main hover:border-gray-400'
                    }`}
                  >
                    {prof}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

          {/* Details for each selected profession */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-black text-text-muted uppercase tracking-widest pl-1">
              Especialidades Seleccionadas y Títulos
            </h4>
            
            {selectedProfessions.length === 0 ? (
              <div className="text-center py-8 px-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl text-sm font-semibold text-text-muted">
                Por favor, selecciona al menos una profesión arriba.
              </div>
            ) : (
              selectedProfessions.map(prof => {
                const cred = professionCredentials[prof] || { type: 'Ninguno', number: '', image: '' };
                return (
                  <div 
                    key={prof} 
                    className="p-5 border border-gray-100 dark:border-gray-800 bg-white dark:bg-bg-primary rounded-[28px] shadow-soft flex flex-col gap-4 animate-in fade-in duration-300"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="font-extrabold text-text-main text-base font-manrope">{prof}</span>
                      {cred.type !== 'Ninguno' && cred.number ? (
                        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full shadow-soft animate-in zoom-in-95 duration-200">
                          <CheckCircle size={12} className="stroke-[3]" />
                          <span className="text-[9px] font-black tracking-wider uppercase">Matrícula Verificada ✓</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-black tracking-wider uppercase text-teal-600 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/10">
                          Configurar Título
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Document/Credential Type */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                          Habilitación / Nivel
                        </label>
                        <select
                          value={cred.type}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProfessionCredentials(prev => ({
                              ...prev,
                              [prof]: {
                                ...(prev[prof] || { type: 'Ninguno', number: '', image: '' }),
                                type: val
                              }
                            }));
                          }}
                          className="w-full h-11 px-3 bg-white dark:bg-bg-secondary rounded-xl border border-gray-200 dark:border-gray-800 outline-none focus:border-primary/20 text-text-main dark:text-white text-xs font-bold transition-all"
                          style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
                        >
                          <option value="Ninguno" className="bg-white dark:bg-bg-secondary text-text-main dark:text-white font-semibold">Ninguno (No certificado)</option>
                          <option value="Título" className="bg-white dark:bg-bg-secondary text-text-main dark:text-white font-semibold">Tiene Título o Diplomatura</option>
                          <option value="Matrícula" className="bg-white dark:bg-bg-secondary text-text-main dark:text-white font-semibold">Profesional Matriculado</option>
                          <option value="Certificado" className="bg-white dark:bg-bg-secondary text-text-main dark:text-white font-semibold">Técnico Certificado</option>
                          <option value="Curso Realizado" className="bg-white dark:bg-bg-secondary text-text-main dark:text-white font-semibold">Curso de Operador / Oficio</option>
                        </select>
                      </div>

                      {/* Number or Registry Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                          Número o Institución
                        </label>
                        <input
                          type="text"
                          value={cred.number}
                          placeholder="Ej: N° 2542 o Universidad..."
                          disabled={cred.type === 'Ninguno'}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProfessionCredentials(prev => ({
                              ...prev,
                              [prof]: {
                                ...(prev[prof] || { type: 'Ninguno', number: '', image: '' }),
                                number: val
                              }
                            }));
                          }}
                          className="w-full h-11 px-3 bg-gray-50 dark:bg-bg-secondary rounded-xl border border-transparent outline-none focus:border-primary/20 text-text-main text-xs font-bold disabled:opacity-40 transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    {/* Image / Certificate preview & upload */}
                    {cred.type !== 'Ninguno' && (
                      <div className="flex flex-col gap-2 mt-1">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                          Foto del Título / Matrícula
                        </label>
                        
                        {cred.image ? (
                          <div className="relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 max-h-48 group">
                            <img 
                              src={cred.image} 
                              alt="Título / Credencial" 
                              className="w-full h-40 object-cover" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                              <button
                                onClick={() => {
                                  setProfessionCredentials(prev => ({
                                    ...prev,
                                    [prof]: {
                                      ...(prev[prof] || { type: 'Ninguno', number: '', image: '' }),
                                      image: ''
                                    }
                                  }));
                                }}
                                className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors animate-in zoom-in-50"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={() => {
                                setUploadingProfession(prof);
                                setTimeout(() => fileInputProfRef.current?.click(), 100);
                              }}
                              className="w-full h-14 border border-dashed border-teal-500/50 rounded-2xl flex items-center justify-center gap-2 text-teal-700 dark:text-teal-500 font-bold cursor-pointer hover:bg-teal-500/10 transition-colors text-xs"
                            >
                              <Upload size={16} />
                              Hacer foto o Subir Certificado
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {cred.type !== 'Ninguno' && cred.number && (
                      <div className="mt-1 p-3.5 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] rounded-2xl border border-emerald-500/10 dark:border-emerald-500/5 flex items-start gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                        <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-bold leading-normal">
                          Esta habilitación ha sido auditada con éxito por nuestro equipo técnico y figura como <span className="underline decoration-wavy decoration-emerald-500">Verificada</span> para el ejercicio profesional en Córdoba Capital.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Hidden File Input for uploading specialty certificate images */}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputProfRef}
            onChange={handleProfPhotoUpload}
          />
        </div>
      )
    },
    wallet: {
      title: 'Mi Billetera',
      content: (
        <div className="flex flex-col gap-6 py-4">
          {/* Status of manual bank transfer loading */}
          {user?.recharge_request && (
            <div className="flex flex-col gap-3">
              {user.recharge_request.status === 'PENDING_ADMIN_APPROVAL' && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-start gap-2.5">
                    <Clock size={16} className="text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-xs text-amber-800">Carga pendiente de aprobación</p>
                      <p className="text-[11px] text-amber-700 leading-snug mt-0.5 text-orange-900">
                        Tu transferencia de <strong>${user.recharge_request.amount.toLocaleString('es-AR')}</strong> está siendo revisada por el administrador.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {user.recharge_request.status === 'SUCCESSFUL' && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-xs text-emerald-800">¡Saldo acreditado!</p>
                      <p className="text-[11px] text-emerald-700 leading-snug mt-0.5 text-emerald-950">
                        ¡Saldo acreditado! El administrador aprobó tu comprobante. Ya tenés disponibles ${user.recharge_request.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })} en tu billetera.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleClearRechargeRequest}
                    className="self-end px-3 py-1 bg-emerald-550 bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg transition-transform active:scale-95"
                  >
                    Entendido
                  </button>
                </div>
              )}
              {user.recharge_request.status === 'REJECTED' && (
                <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-start gap-2.5">
                    <X size={16} className="text-red-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-xs text-red-800">Carga rechazada</p>
                      <p className="text-[11px] text-red-700 leading-snug mt-0.5 text-red-950">
                        Tu carga de saldo fue rechazada por el administrador ({user.recharge_request.rejection_reason || 'comprobante inválido'}). Por favor, revisá tu transferencia e intentalo de nuevo.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleClearRechargeRequest}
                    className="self-end px-3 py-1 bg-red-550 bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg transition-transform active:scale-95"
                  >
                    Entendido
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <CreditCard size={80} className="text-indigo-500" />
             </div>
             <p className="text-sm font-bold text-indigo-700 dark:text-indigo-400 mb-1 relative z-10">Saldo Disponible</p>
             <h2 className="text-3xl font-black text-indigo-800 dark:text-indigo-300 relative z-10 font-manrope">
               ${(user?.wallet_balance || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
             </h2>
             
             <div className="mt-6 flex gap-3 relative z-10">
                <button 
                  onClick={() => {
                     setShowRechargeModal(true);
                  }}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-2xl text-sm font-bold shadow-sm transition-all active:scale-95 text-center cursor-pointer"
                >
                  Cargar Saldo
                </button>
             </div>
          </div>

          <div className="flex flex-col gap-3">
             <h4 className="text-xs font-black text-text-muted uppercase tracking-widest px-2">Métodos de Pago</h4>
             <div className="p-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl flex flex-col items-center justify-center gap-3 text-center opacity-70">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-text-muted">
                    <CreditCard size={20} />
                </div>
                <div>
                  <p className="font-bold text-text-main text-sm">Sin tarjetas vinculadas</p>
                  <p className="text-xs text-text-muted mt-1">Agregá una tarjeta para pagar más rápido.</p>
                </div>
                <button onClick={() => showToast('Próximamente: Vinculación de tarjetas')} className="text-indigo-500 font-bold text-xs uppercase cursor-pointer hover:underline mt-2">
                   Vincular Nueva Tarjeta
                </button>
             </div>
          </div>

          <div className="mt-4 flex flex-col items-center pb-2">
             <button 
               onClick={() => showToast('Próximamente: Historial de transacciones')} 
               className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider hover:underline cursor-pointer flex items-center gap-1.5 py-2 px-4 rounded-xl hover:bg-indigo-500/5 transition-all"
             >
               Ver historial de transacciones
             </button>
          </div>
        </div>
      )
    },
    premium: {
      title: 'Membresía Premium',
      content: (() => {
        const isPremium = user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active';
        const isPending = user?.premium_status === 'pending';

        if (isPremium) {
          // STATE 2: USER IS ALREADY PREMIUM
          const expiryDateStr = new Date(2026, 5, 30).toLocaleDateString(); // June 30, 2026 as per base date of June 2, 2026
          return (
            <div className="flex flex-col gap-6 py-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Crown size={40} className="fill-amber-400" />
                  <span className="absolute bottom-1 right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-main mb-1">
                  Suscripción Activa
                </h3>
                <p className="text-sm font-semibold text-primary">
                  ${config.premiumMonthlyFee.toLocaleString('es-AR')} ARS / mes
                </p>
                <p className="text-[11px] text-text-muted mt-2 font-medium">
                  Próximo vencimiento: {expiryDateStr}
                </p>
              </div>

              {/* Benefit Live Counters */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] px-2">Estatus y Beneficios</h4>
                <div className="grid grid-cols-1 gap-3">
                  
                {(user?.role === 'professional' || (user?.professions && user?.professions.length > 0)) ? (
                  <>
                    {/* Professional Counter 1: Visibilidad Premium */}
                    <div className="flex gap-4 p-4 bg-white dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft">
                       <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                          <Eye size={20} className="text-purple-500" />
                       </div>
                       <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Visibilidad Destacada</p>
                          <p className="text-xs text-purple-600 dark:text-purple-400 font-bold mt-0.5">Perfil #1 en búsquedas locales activo</p>
                       </div>
                    </div>

                    {/* Professional Counter 2: Propuestas Ilimitadas */}
                    <div className="flex gap-4 p-4 bg-white dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft">
                       <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-emerald-500/10 text-emerald-500">
                          <Zap size={20} className="text-emerald-500" />
                       </div>
                       <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Presupuestos Ilimitados</p>
                          <p className="text-xs text-text-muted font-bold mt-0.5">Contactos ilimitados disponibles</p>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-500 w-full"></div>
                          </div>
                       </div>
                    </div>

                    {/* Professional Counter 3: Comisión */}
                    <div className="flex gap-4 p-4 bg-white dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft">
                       <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                          <TrendingUp size={20} className="text-blue-500" />
                       </div>
                       <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Costo de Plataforma Reducido</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5">Comisión reducida al 5% activa</p>
                       </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Client Counter 1: Garantías Plus */}
                    <div className="flex gap-4 p-4 bg-white dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${garantias_disponibles > 0 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-gray-500/10 text-gray-400'}`}>
                          <Shield size={20} className={garantias_disponibles > 0 ? 'text-yellow-500' : 'text-gray-400'} />
                       </div>
                       <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Garantías Plus Disponibles</p>
                          <p className="text-xs text-text-muted font-bold mt-0.5">{garantias_disponibles} de 2 este mes</p>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-500 ${garantias_disponibles > 0 ? 'bg-yellow-500' : 'bg-gray-400'}`} style={{ width: `${(garantias_disponibles / 2) * 100}%` }}></div>
                          </div>
                       </div>
                    </div>

                    {/* Client Counter 2: Comisión de Plataforma */}
                    <div className="flex gap-4 p-4 bg-white dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft">
                       <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                          <TrendingUp size={20} className="text-emerald-500" />
                       </div>
                       <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Costo de Plataforma Reducido</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">Comisión reducida al 10% activa</p>
                       </div>
                    </div>
                  </>
                )}

                </div>
              </div>

              {/* Premium Features Access (Actions) */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] px-2">Acceso VIP</h4>
                <div className="flex flex-col gap-3">
                  
                  {/* Feature 1: Garantía Extendida */}
                  <div className="flex flex-col p-4 bg-white dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft">
                     <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                          <CheckCircle size={20} className="text-indigo-500" />
                       </div>
                       <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Garantía Extendida Activa</p>
                          <p className="text-xs text-text-muted mt-1 leading-snug">Protección total en tus solicitudes de reparación.</p>
                       </div>
                     </div>
                  </div>

                  {/* Feature 2: Iniciar Chat con Coordinador VIP */}
                  <div className="flex flex-col p-4 bg-white dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft">
                     <div className="flex gap-4 mb-3">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <MessageCircle size={20} className="text-primary" />
                       </div>
                       <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Soporte 24/7 VIP</p>
                          <p className="text-xs text-text-muted mt-1 leading-snug">Contacto prioritario para asistencias o reclamos.</p>
                       </div>
                     </div>
                     <button
                       onClick={() => {
                         setSupportChatTopic("Membresía Premium VIP");
                         setShowSupportChat(true);
                         setActiveModal(null);
                       }}
                       className="w-full py-2.5 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 text-primary text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                     >
                       <MessageCircle size={14} className="fill-primary/20" /> Iniciar Chat con Coordinador VIP
                     </button>
                  </div>

                </div>
              </div>
            </div>
          );
        }

        if (isPending) {
          // Solicitud pendiente
          return (
            <div className="flex flex-col gap-6 py-8 text-center max-w-sm mx-auto">
              <div className="w-20 h-20 bg-blue-500/10 text-blue-505 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                <CheckCircle size={40} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-text-main">Comprobante Recibido</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Estamos verificando tu pago. Te notificaremos en cuanto tu cuenta sea activada. Esto puede demorar hasta 24 horas hábiles.
              </p>
            </div>
          );
        }

        // STATE 1: USER IS NOT PREMIUM (Basic customer upgrade flow)
        return (
          <div className="flex flex-col gap-6 py-4">
            
            {/* Clear Pricing Display */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-transparent p-6 rounded-3xl border border-yellow-500/30 text-center">
              <div className="w-14 h-14 bg-yellow-500/15 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm shadow-yellow-500/10">
                <Crown size={28} className="fill-yellow-600/10" />
              </div>
              <p className="text-xs font-black text-yellow-700 dark:text-yellow-400 uppercase tracking-widest">MEMBRESÍA PREMIUM</p>
              <h3 className="text-3xl font-black text-text-main mt-1 font-manrope">${config.premiumMonthlyFee.toLocaleString('es-AR')} ARS <span className="text-sm font-medium text-text-muted">/ mes</span></h3>
              <p className="text-[11px] text-text-muted mt-2">
                Destaca tu perfil y accede a beneficios VIP cargando tu abono mensual.
              </p>
            </div>

            {/* Value Proposition List */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] px-2">Incluye Beneficios Premium:</h4>
              <div className="flex flex-col gap-3">
                {(user?.role === 'professional' || (user?.professions && user?.professions.length > 0)) ? (
                  [
                    { icon: <Crown size={16} />, title: 'Sello de Verificación Destacada', desc: 'Sello dorado premium en tu perfil y cotizaciones que genera cobros seguros y un 80% más de confianza.' },
                    { icon: <Eye size={16} />, title: 'Posicionamiento y Tráfico Prioritario', desc: 'Aparecé en los primeros puestos de búsquedas de tu zona. Recibí hasta un 300% más de propuestas directas.' },
                    { icon: <Zap size={16} />, title: 'Postulaciones y Presupuestos Ilimitados', desc: 'Postulate y enviá presupuestos a solicitudes sin límites diarios ni cobros extra.' },
                    { icon: <TrendingUp size={16} />, title: 'Comisión Reducida al 5%', desc: 'Tu porcentaje de tarifa de plataforma baja del 15% tradicional a tan solo un 5% neto por servicio finalizado.' },
                    { icon: <Shield size={16} />, title: 'Garantía de Cobro y Mediación Legal VIP', desc: 'Fondo de respaldo ante incidentes o impagos de clientes, con soporte de mediación legal優先.' }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft">
                       <div className="w-8 h-8 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0">
                          {benefit.icon}
                       </div>
                       <div>
                          <p className="font-bold text-sm text-text-main">{benefit.title}</p>
                          <p className="text-xs text-text-muted mt-0.5">{benefit.desc}</p>
                       </div>
                    </div>
                  ))
                ) : (
                  [
                    { icon: <Shield size={16} />, title: 'Cobertura de Garantías Plus', desc: 'Hasta 2 reclamos respaldados gratis al mes si el profesional genera fallas o el trabajo no queda conforme.' },
                    { icon: <TrendingUp size={16} />, title: 'Reducción de Tarifas', desc: 'Baja del 17% tradicional de cargos de plataforma a solo un 10% por cotización de servicio.' },
                    { icon: <MessageCircle size={16} />, title: 'Soporte y Asistencia 24/7 VIP', desc: 'Respuesta telefónica y humana de emergencia al instante para cualquier conflicto o urgencia.' }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-white/5 shadow-soft">
                       <div className="w-8 h-8 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0">
                          {benefit.icon}
                       </div>
                       <div>
                          <p className="font-bold text-sm text-text-main">{benefit.title}</p>
                          <p className="text-xs text-text-muted mt-0.5">{benefit.desc}</p>
                       </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Instruction / Payment Section */}
            <div className="mt-4 p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-3xl flex flex-col gap-4">
              <p className="text-sm font-bold text-yellow-700 dark:text-yellow-500">Datos para Transferencia</p>
              
              <div className="bg-white dark:bg-white/10 p-4 rounded-2xl border border-yellow-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-muted">Alias de Recepción:</p>
                  <p className="font-mono font-bold text-base text-text-main mt-1 select-all">Diego.reartes.lemon</p>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('Diego.reartes.lemon');
                    showToast('Alias copiado con éxito');
                  }}
                  className="w-10 h-10 bg-yellow-500/10 text-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-500/20 active:scale-90 transition-all cursor-pointer"
                >
                  <Copy size={16} />
                </button>
              </div>

              {/* Upload section */}
              <div className="mt-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="receipt-upload"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const compressedBase64 = await compressImage(file);
                      setPremiumReceipt(compressedBase64);
                      showToast('Comprobante adjuntado con éxito.');
                    } catch (err) {
                      console.error('Error compressing receipt image:', err);
                      showToast('Error al adjuntar comprobante.');
                    }
                  }}
                />
                
                {premiumReceipt ? (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-emerald-500" />
                      <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Comprobante Adjuntado</span>
                    </div>
                    <button 
                      onClick={() => setPremiumReceipt(null)} 
                      className="text-xs text-alert hover:underline font-bold"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <label 
                    htmlFor="receipt-upload" 
                    className="w-full h-14 border border-dashed border-yellow-500/50 rounded-2xl flex items-center justify-center gap-2 text-yellow-700 dark:text-yellow-500 font-bold cursor-pointer hover:bg-yellow-500/10 transition-colors mx-auto text-center px-4"
                  >
                    <Upload size={18} />
                    <span className="text-center font-bold text-sm">Adjuntar Comprobante</span>
                  </label>
                )}
              </div>
            </div>

          </div>
        );
      })()
    },
    support: {
      title: 'Soporte Técnico',
      content: (() => {
        const isProfessional = user?.role === 'professional';
        const isPremium = user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active';
        
        const faqItems = isProfessional ? [
          {
            id: 'pago-pro-1',
            category: 'PAGOS Y COMISIONES',
            q: '¿Cómo cobro por mis servicios?',
            a: (
              <span>
                Los pagos se retienen de forma segura en la plataforma al ser contratado. Cuando finalizas tu servicio y el cliente presiona "Trabajo Terminado" para dar su conformidad, los fondos se liberan de inmediato a tu saldo disponible, el cual podés transferir a tu cuenta bancaria o Mercado Pago.
              </span>
            )
          },
          {
            id: 'pago-pro-2',
            category: 'PAGOS Y COMISIONES',
            q: '¿Cuánto cobra la plataforma por comisión?',
            a: isPremium ? (
              <span>
                Como sos miembro <strong>Premium</strong>, tu comisión por transacciones es del <strong>0%</strong> (totalmente bonificada). El 100% de lo presupuestado va para vos. Solo se abona tu suscripción mensual fija de ${config.premiumMonthlyFee.toLocaleString('es-AR')}.
              </span>
            ) : (
              <span>
                Para profesionales estándar, la comisión por intermediación y uso de la plataforma es del <strong>15%</strong> sobre el servicio concretado. Podés bonificar esta comisión al 0% activando tu Membresía Premium.
              </span>
            )
          },
          {
            id: 'garantia-pro-1',
            category: 'GARANTÍA Y MEDIACIÓN',
            q: '¿Qué pasa si un cliente reporta un problema con mi trabajo?',
            a: (
              <span>
                Ante un reporte de disconformidad, el equipo de mediación abrirá un chat tripartito para revisar los detalles, mensajes y evidencia fotográfica que subas a la app. Si eres miembro Premium, contas con soporte prioritario y acceso al fondo de garantía para resolver diferencias de manera justa sin perjudicar tu reputación.
              </span>
            )
          },
          {
            id: 'garantia-pro-2',
            category: 'GARANTÍA Y MEDIACIÓN',
            q: '¿Qué es el fondo de garantía para profesionales?',
            a: (
              <span>
                Es un respaldo que asiste a los profesionales Premium cubriendo costos de segundas visitas de ajuste o imprevistos técnicos, asegurando que tu calificación no se vea afectada y manteniendo la confianza en el ecosistema.
              </span>
            )
          },
          {
            id: 'facturas-pro-1',
            category: 'FACTURACIÓN E IVA',
            q: '¿Es obligatorio emitir factura al cliente?',
            a: (
              <span>
                Los clientes pueden indicar si necesitan factura con IVA (A/B) o sin IVA al momento de crear la solicitud. Puedes definir tu condición fiscal (Monotributista o Responsable Inscripto) desde tu menú de datos para que la app te asigne los trabajos requeridos según tu perfil comercial.
              </span>
            )
          },
          {
            id: 'membresia-pro-1',
            category: 'MEMBRESÍA Y REPUTACIÓN',
            q: '¿Qué beneficios obtengo con el Perfil Premium?',
            a: (
              <span>
                La suscripción Premium ($1{'$' + config.premiumMonthlyFee.toLocaleString('es-AR')}/mes) te otorga: comisión del <strong>0%</strong> en todos tus trabajos, prioridad absoluta para figurar en los primeros puestos del buscador, insignia dorada de "Profesional Verificado", botón de enlace directo a tu WhatsApp y soporte técnico 24/7 preferencial.
              </span>
            )
          },
          {
            id: 'membresia-pro-2',
            category: 'MEMBRESÍA Y REPUTACIÓN',
            q: '¿Cómo puedo mejorar mi reputación técnica?',
            a: (
              <span>
                Tu prestigio se calcula en base a tus servicios finalizados, la velocidad de respuesta, tus valoraciones de 5 estrellas y la puntualidad registrada. Con un promedio alto de satisfacción escalarás a niveles Bronce, Plata, Oro y Diamante con beneficios exclusivos.
              </span>
            )
          }
        ] : [
          {
            id: 'pago-1',
            category: 'PAGOS Y TARIFAS',
            q: '¿Cómo pago el servicio?',
            a: (
              <span>
                Todos los pagos se realizan de forma segura dentro de la app a través de <strong>Mercado Pago</strong> o <strong>Transferencia bancaria</strong>. El dinero queda resguardado por la plataforma y recién se le libera al profesional cuando confirmás que el trabajo está terminado y das tu conformidad técnica.
              </span>
            )
          },
          {
            id: 'pago-2',
            category: 'PAGOS Y TARIFAS',
            q: '¿Por qué hay un "Costo de Gestión" en mi desglose?',
            a: isPremium ? (
              <span>
                Como sos miembro <strong>Premium</strong>, tu costo de gestión está reducido al <strong>10%</strong> por transacción. El resto de la cobertura operativa y tu seguro plus ya están cubiertos por tu suscripción mensual de $1{'$' + config.premiumMonthlyFee.toLocaleString('es-AR')}.
              </span>
            ) : (
              <span>
                Este costo (<strong>17%</strong>) cubre el procesamiento seguro de tu pago, el soporte de mediación y, lo más importante, financia nuestro fondo de garantía por si un profesional realiza mal su tarea.
              </span>
            )
          },
          {
            id: 'garantia-1',
            category: 'GARANTÍA Y MALOS ARREGLOS',
            q: '¿Qué pasa si el profesional hace mal su trabajo o deja algo roto?',
            a: isPremium ? (
              <span>
                ¡Estás totalmente cubierto por tu <strong>Garantía Plus</strong>! Tenés 2 asistencias de cobertura total al mes. Si el profesional trabaja mal, reportalo inmediatamente. La plataforma enviará a otro profesional calificado para que solucione el problema sin que tengas que poner un solo peso extra, usando el fondo de tu suscripción.
              </span>
            ) : (
              <span>
                No te preocupes, tu dinero está protegido. Si el arreglo quedó mal, no cierres la solicitud. Tocá el botón <strong>"Reportar Problema Grave"</strong> antes de las 48hs. Nuestro equipo de mediación analizará la evidencia y, si corresponde, retendremos el pago para ayudarte a solucionar el problema o reembolsarte.
              </span>
            )
          },
          {
            id: 'garantia-2',
            category: 'GARANTÍA Y MALOS ARREGLOS',
            q: '¿Qué son las "Garantías Plus"?',
            a: isPremium ? (
              <span>
                Es tu pase de tranquilidad. Tenés 2 cartuchos al mes para usar en caso de que un profesional falle. Si ocurre, <strong>Servicios Pro</strong> cubre el gasto de mandar un segundo experto a corregir el error. Recuerda que te quedan <strong>2 de 2 disponibles</strong> este mes.
              </span>
            ) : (
              <span>
                Es un beneficio exclusivo para miembros <strong>Premium</strong>. Si querés tener 2 arreglos fallidos cubiertos al 100% de forma gratuita por la app, podés sumarte al plan <strong>Premium</strong> desde tu perfil por $1{'$' + config.premiumMonthlyFee.toLocaleString('es-AR')} al mes.
              </span>
            )
          },
          {
            id: 'facturas-1',
            category: 'FACTURACIÓN E IVA',
            q: '¿Los precios incluyen IVA? ¿Me dan factura?',
            a: (
              <span>
                Al usar los filtros de búsqueda, podés elegir si necesitás profesionales que emitan factura <strong>"Con IVA"</strong> (Responsable Inscripto) o <strong>"Sin IVA"</strong> (Monotributista). El precio estimado que te da la IA en la solicitud siempre es el <strong>TOTAL final</strong> que vas a pagar, para que no tengas sorpresas. Al terminar, el profesional te emitirá el comprobante correspondiente según la opción que elegiste.
              </span>
            )
          },
          {
            id: 'seguridad-1',
            category: 'SEGURIDAD Y CONFIANZA',
            q: '¿Los profesionales son de confianza?',
            a: (
              <span>
                Sí, totalmente. Todos los electricistas, plomeros, gasistas y técnicos pasan por una <strong>verificación estricta de identidad</strong> (DNI/CUIT), antecedentes y certificación de oficio antes de ser aprobados en la plataforma. Además, podés ver las calificaciones y opiniones reales de otros vecinos antes de contratarlos.
              </span>
            )
          }
        ];

        const categories = isProfessional 
          ? ['PAGOS Y COMISIONES', 'GARANTÍA Y MEDIACIÓN', 'FACTURACIÓN E IVA', 'MEMBRESÍA Y REPUTACIÓN']
          : ['PAGOS Y TARIFAS', 'GARANTÍA Y MALOS ARREGLOS', 'FACTURACIÓN E IVA', 'SEGURIDAD Y CONFIANZA'];

        return (
          <div className="flex flex-col gap-6 py-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-text-main mb-1">¿Cómo te podemos ayudar?</h3>
              <p className="text-sm font-medium text-text-muted mb-2">
                Seleccioná una opción para comenzar.
              </p>
            </div>
            
            <button 
              onClick={() => { setActiveModal(null); setSupportChatTopic(undefined); setShowSupportChat(true); }}
              className="flex flex-col gap-3 p-5 bg-white dark:bg-bg-primary rounded-[24px] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              <div className="flex items-center justify-between w-full">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center relative">
                      <MessageCircle size={20} />
                    </div>
                    <div className="text-left py-1">
                      <h4 className="font-bold text-text-main text-base leading-none mb-1.5">Chat en Vivo</h4>
                      <p className="text-[10px] font-bold text-success uppercase tracking-widest leading-none">Tiempo de respuesta: 2 min</p>
                    </div>
                 </div>
                 <ChevronRight size={18} className="text-text-muted" />
              </div>
            </button>

            <button 
              onClick={() => { setActiveModal(null); setShowDispute(true); }}
              className="flex flex-col gap-3 p-5 bg-white dark:bg-bg-primary rounded-[24px] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              <div className="flex items-center justify-between w-full">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                       <Shield size={20} />
                    </div>
                    <div className="text-left py-1">
                      <h4 className="font-bold text-text-main text-base leading-none mb-1.5">Reportar Problema Grave</h4>
                      <p className="text-[10px] font-bold text-text-muted opacity-80 uppercase tracking-widest leading-none">Soporte y mediación</p>
                    </div>
                 </div>
                 <ChevronRight size={18} className="text-text-muted" />
              </div>
            </button>
            
            <div className="mt-4 border border-gray-200 dark:border-gray-800 rounded-[24px] overflow-hidden bg-bg-primary flex flex-col">
              {/* Header con Estatus / Tier */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/[0.02] border-b border-gray-150 dark:border-gray-800">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Base de Conocimiento</span>
                <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${isPremium ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border border-yellow-500/20' : 'bg-gray-100 dark:bg-gray-800 text-text-muted'}`}>
                  {isProfessional 
                    ? (isPremium ? '★ PROFESIONAL PREMIUM' : '👤 PROFESIONAL ESTÁNDAR')
                    : (isPremium ? '★ CLIENTE PREMIUM' : '👤 CLIENTE BÁSICO')}
                </span>
              </div>

              {/* Collapsible FAQ sections */}
              <div className="flex flex-col">
                {categories.map((cat) => {
                  const itemsInCat = faqItems.filter(item => item.category === cat);
                  return (
                    <div key={cat} className="flex flex-col border-b border-gray-100 last:border-b-0 dark:border-gray-805">
                      <div className="px-4 py-2.5 bg-gray-50/30 dark:bg-white/[0.01] text-[9px] font-black text-text-muted tracking-wide uppercase border-b border-gray-100/50 dark:border-white/[0.02]">
                        {cat}
                      </div>
                      <div className="flex flex-col">
                        {itemsInCat.map(item => {
                          const isOpen = expandedFaqId === item.id;
                          return (
                            <div key={item.id} className="border-b border-gray-100 last:border-b-0 dark:border-gray-805">
                              <button
                                type="button"
                                onClick={() => setExpandedFaqId(isOpen ? null : item.id)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors"
                              >
                                <span className="font-bold text-xs text-text-main pr-4 leading-tight">{item.q}</span>
                                <span className="shrink-0 text-text-muted transition-transform duration-200" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                                  <ChevronRight size={16} />
                                </span>
                              </button>
                              {isOpen && (
                                <div className="p-4 bg-gray-50/20 dark:bg-white/[0.005] border-t border-gray-100 dark:border-gray-800 text-xs text-text-muted leading-relaxed font-semibold">
                                  {item.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()
    },
    info: {
      title: 'Editar Información',
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 items-center mb-4">
            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 mb-2">Avatar</label>
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary mb-2">
              <img src={localPhoto || user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid || 'default'}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handlePhotoClick}
                className="px-4 py-2 bg-bg-primary text-xs font-bold text-primary rounded-xl border border-primary/20 hover:bg-primary/10 transition-colors"
              >
                Subir Foto
              </button>
              <button 
                onClick={() => setLocalPhoto(`https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random().toString(36).substring(7)}`)}
                className="px-4 py-2 bg-primary text-xs font-bold text-white rounded-xl shadow-soft transition-colors hover:bg-primary/90"
              >
                Generar Avatar
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1 px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Nombre Completo</label>
            <input 
              type="text" 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-primary outline-none text-text-main text-base transition-colors" 
            />
          </div>
          <div className="flex flex-col gap-1 px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Teléfono</label>
            <input 
              type="tel" 
              value={editPhone} 
              onChange={(e) => setEditPhone(e.target.value)}
              placeholder="+34 600 000 000"
              className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-primary outline-none text-text-main text-base transition-colors placeholder:text-gray-300" 
            />
          </div>
          <div className="flex flex-col gap-1 px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Biografía Corta</label>
            <textarea 
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Contanos un poco sobre vos..." 
              className="w-full h-20 bg-gray-50 dark:bg-bg-primary/50 border border-transparent rounded-xl p-3 resize-none focus:bg-white dark:focus:bg-bg-primary focus:border-primary/30 outline-none text-text-main text-sm transition-colors mt-1 placeholder:text-gray-400" 
            />
          </div>
          {user?.role === 'professional' && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1 mt-2 px-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Años de Experiencia</label>
                <input 
                  type="number" 
                  value={editExperienceYears} 
                  onChange={(e) => setEditExperienceYears(e.target.value)}
                  placeholder="Ej: 8"
                  className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-primary outline-none text-text-main text-base transition-colors" 
                />
              </div>

              <div className="flex flex-col gap-1 mt-2 px-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">TARIFA BASE DEL SERVICIO</label>
                <div className="relative flex items-center border-b border-gray-200 dark:border-gray-800 focus-within:border-primary transition-colors">
                  <span className="text-text-main font-bold text-base mr-1 select-none">$</span>
                  <input 
                    type="text" 
                    value={editBasePrice} 
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val) {
                        const parsed = parseInt(val, 10);
                        if (!isNaN(parsed)) {
                          val = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(parsed);
                        }
                      }
                      setEditBasePrice(val);
                    }}
                    placeholder="Ej: 15.000"
                    className="w-full bg-transparent py-2 outline-none text-text-main text-base transition-colors placeholder:text-gray-400" 
                  />
                </div>
                <p className="text-[9px] text-gray-400 mt-1.5 leading-snug">
                  Este monto se mostrará de manera pública a los clientes como tu tarifa mínima de visita o contratación inicial.
                </p>
              </div>

              <div className="flex flex-col gap-1 mt-2 px-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Datos Profesionales (Uno por línea)</label>
                <textarea 
                  value={editCredentials}
                  onChange={(e) => setEditCredentials(e.target.value)}
                  placeholder="Ej: Técnico Electricista Matriculado&#10;Seguro de Accidentes Personales" 
                  className="w-full h-24 bg-gray-50 dark:bg-bg-primary/50 border border-transparent rounded-xl p-3 resize-none focus:bg-white dark:focus:bg-bg-primary focus:border-primary/30 outline-none text-text-main text-sm transition-colors mt-1 placeholder:text-gray-400 whitespace-pre" 
                />
              </div>
              <div className="flex flex-col gap-2 mt-3 px-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  Condición de Facturación (Monotributo / I.V.A.)
                </label>
                
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {/* Monotributo Option */}
                  <button
                    type="button"
                    onClick={() => setTaxStatus('sin_iva')}
                    className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all relative overflow-hidden ${
                      taxStatus === 'sin_iva'
                        ? 'border-primary bg-primary/5 shadow-soft ring-1 ring-primary'
                        : 'border-gray-200 dark:border-gray-800 bg-transparent hover:bg-gray-50/50 dark:hover:bg-gray-800/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        taxStatus === 'sin_iva' ? 'bg-primary/20 text-primary' : 'bg-gray-100 dark:bg-gray-800 text-text-muted'
                      }`}>
                        Monotributista
                      </span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        taxStatus === 'sin_iva' ? 'border-primary' : 'border-gray-300 dark:border-gray-700'
                      }`}>
                        {taxStatus === 'sin_iva' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-text-main mt-2">Exento (Sin IVA)</span>
                    <span className="text-[9px] text-text-muted leading-tight font-medium">
                      Facturación a Consumidores Finales mediante Factura C (Monotributo).
                    </span>
                  </button>

                  {/* Responsable Inscripto Option */}
                  <button
                    type="button"
                    onClick={() => setTaxStatus('con_iva')}
                    className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all relative overflow-hidden ${
                      taxStatus === 'con_iva'
                        ? 'border-indigo-500 bg-indigo-500/5 shadow-soft ring-1 ring-indigo-500'
                        : 'border-gray-200 dark:border-gray-800 bg-transparent hover:bg-gray-50/50 dark:dark:hover:bg-gray-800/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        taxStatus === 'con_iva' ? 'bg-indigo-500/20 text-indigo-500 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-800 text-text-muted'
                      }`}>
                        Inscripto
                      </span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        taxStatus === 'con_iva' ? 'border-indigo-500' : 'border-gray-300 dark:border-gray-700'
                      }`}>
                        {taxStatus === 'con_iva' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        )}
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-text-main mt-2">Gravado (Con IVA)</span>
                    <span className="text-[9px] text-text-muted leading-tight font-medium">
                      Desglose legal de I.V.A (21%) para facturas tipo A/B de Responsable Inscripto.
                    </span>
                  </button>
                </div>

                <p className="text-[9px] text-text-muted leading-relaxed font-medium my-4">
                  * Al elegir <strong className="text-indigo-600 dark:text-indigo-400">Gravado (Con IVA)</strong>, el sistema calculará en forma automática el 21% de IVA restándolo desde el costo final facturado al cliente en cada servicio terminado.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-dashed border-gray-100 dark:border-gray-800 px-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Certificado de Antecedentes Penales
                </label>
                <p className="text-[10px] text-text-muted leading-relaxed font-semibold mb-1">
                   Sube tu certificado emitido por la policía o entidad nacional para obtener el distintivo <strong className="text-emerald-600 dark:text-emerald-400">"Antecedentes OK"</strong> y generar total seguridad en tus clientes.
                </p>

                {antecedentesUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 max-h-48 group">
                    <img 
                      src={antecedentesUrl} 
                      alt="Certificado de Antecedentes" 
                      className="w-full h-40 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setAntecedentesUrl('');
                        }}
                        className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        fileInputAntecedentesRef.current?.click();
                      }}
                      className="w-full h-14 border border-dashed border-emerald-500/50 rounded-2xl flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer transition-colors text-xs"
                    >
                      <Upload size={16} />
                      Hacer foto o Subir Certificado de Antecedentes No Penales
                    </button>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputAntecedentesRef}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const compressedBase64 = await compressImage(file, 600, 600, 0.75);
                      setAntecedentesUrl(compressedBase64);
                      showToast('Certificado de Antecedentes cargado provisionalmente. No te olvides de guardar los cambios.');
                    } catch (err: any) {
                      console.error("Error compressing background check image:", err);
                      showToast('Error al procesar la imagen de antecedentes');
                    }
                    if (e.target) e.target.value = '';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )
    },
    prefs: {
      title: 'Preferencias',
      content: (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-text-main">Modo Oscuro</p>
              <p className="text-xs text-text-muted">Cambia la apariencia de la app a colores oscuros.</p>
            </div>
            <div 
              onClick={toggleDarkMode}
              className={`w-12 h-6 ${isDarkMode ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} rounded-full relative cursor-pointer transition-colors`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-text-main">Notificaciones Push</p>
              <p className="text-xs text-text-muted">Recibe alertas de nuevos trabajos o mensajes.</p>
            </div>
            <div 
              onClick={togglePush}
              className={`w-12 h-6 ${localPushEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} rounded-full relative cursor-pointer transition-colors`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${localPushEnabled ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-text-main">Vibración</p>
              <p className="text-xs text-text-muted">Vibración al recibir nuevas alertas.</p>
            </div>
            <div 
              onClick={toggleVibration}
              className={`w-12 h-6 ${isVibrationEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} rounded-full relative cursor-pointer transition-colors`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isVibrationEnabled ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>
          {user?.role === 'professional' && (
            <div className="flex flex-col gap-2 mt-4">
              <p className="font-bold text-text-main">Radio de búsqueda (km)</p>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={searchRadius}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSearchRadius(val);
                  localStorage.setItem('searchRadius', val.toString());
                  window.dispatchEvent(new Event('searchRadiusChanged'));
                }}
                className="w-full accent-primary" 
              />
              <div className="flex justify-between text-xs text-text-muted font-bold">
                <span>1 km</span>
                <span className="text-primary">{searchRadius} km</span>
                <span>50 km</span>
              </div>
            </div>
          )}
        </div>
      )
    },
    privacy: {
      title: 'Privacidad y Seguridad',
      content: (
        <div className="flex flex-col gap-4">
          <button 
            onClick={async () => {
              if (user?.email) {
                if (!user.emailVerified) {
                  showToast('Debes verificar tu correo para cambiar la contraseña.');
                  return;
                }

                const now = Date.now();
                if (now - lastResetTime < 60000) {
                  const remainingSeconds = Math.ceil((60000 - (now - lastResetTime)) / 1000);
                  showToast(`Espera ${remainingSeconds}s para volver a intentar.`);
                  return;
                }

                try {
                  const actionCodeSettings = {
                    url: window.location.origin,
                    handleCodeInApp: false,
                  };
                  await sendPasswordResetEmail(auth, user.email, actionCodeSettings);
                  setLastResetTime(now);
                  showToast('Correo enviado. Si el link falla, intenta copiarlo y pegarlo directamente en tu navegador.');
                } catch (error) {
                  console.error("Error sending password reset:", error);
                  showToast('Error al enviar el correo. Reintenta luego.');
                }
              } else {
                showToast('No se encontró un correo asociado.');
              }
            }} 
            className="w-full text-left bg-white dark:bg-bg-primary border border-gray-100 dark:border-gray-800 rounded-[20px] p-5 font-bold text-text-main flex items-center justify-between group shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span>Cambiar Contraseña</span>
                {!user?.emailVerified ? (
                  <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Recomendado</span>
                ) : (
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Protegido</span>
                )}
              </div>
              <span className="text-[11px] font-medium text-text-muted">Recibe un link en {user?.email}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-primary" />
          </button>
          
          <button 
            onClick={() => {
              setTwoFactorSetupStep(user?.twoFactorEnabled ? 3 : 1);
              setTwoFactorCode('');
              setShowTwoFactorModal(true);
            }} 
            className="w-full text-left bg-white dark:bg-bg-primary border border-gray-100 dark:border-gray-800 rounded-[20px] p-5 font-bold text-text-main flex items-center justify-between group shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span>Autenticación de 2 Factores</span>
                {user?.twoFactorEnabled ? (
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Activo</span>
                ) : (
                  <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Recomendado</span>
                )}
              </div>
              <span className="text-[11px] font-medium text-text-muted">Agregá una capa extra de seguridad</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-primary" />
          </button>
          
          <button 
            onClick={() => showToast('Sesión actual iniciada desde este dispositivo. No se detectan otros accesos.')} 
            className="w-full text-left bg-white dark:bg-bg-primary border border-gray-100 dark:border-gray-800 rounded-[20px] p-5 font-bold text-text-main flex items-center justify-between group shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <span>Dispositivos Conectados</span>
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Estado actual: Seguro</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-primary" />
          </button>

          <div className="w-full border-t border-gray-100 dark:border-gray-800 mt-6 pt-6 flex justify-center">
            {!showDeleteConfirm ? (
              <button 
                onClick={() => setShowDeleteConfirm(true)} 
                className="w-full h-14 flex justify-center items-center gap-2 font-bold text-alert hover:bg-alert/5 rounded-2xl transition-all border border-alert/10 mx-auto text-center"
              >
                <span className="text-center font-bold text-sm">Eliminar mi cuenta</span>
              </button>
            ) : (
              <div className="flex flex-col gap-5 p-6 bg-alert/5 rounded-3xl border border-alert/20">
                <p className="text-sm text-center text-alert font-bold leading-relaxed">
                  ¿Estás completamente seguro? <br/>
                  <span className="font-normal opacity-80 text-xs">Esta acción es irreversible y eliminará todo tu historial de servicios.</span>
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 h-12 bg-bg-primary text-text-main rounded-xl font-bold text-sm border border-gray-100 dark:border-gray-800">Cancelar</button>
                  <button onClick={() => { setActiveModal(null); setShowDeleteConfirm(false); onSignOut(); }} className="flex-1 h-12 bg-alert text-white rounded-xl font-bold text-sm shadow-premium text-white">Confirmar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    },
    rating: {
      title: 'Puntuación y Reseñas',
      content: (
        <div className="flex flex-col gap-5 py-2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 bg-primary/5 px-6 py-3 rounded-2xl mb-3 border border-primary/10 shadow-soft">
              <span className="text-5xl font-black text-primary font-manrope leading-none">{stats.rating.toFixed(1)}</span>
              <div className="flex flex-col items-start gap-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      size={18} 
                      className={s <= Math.round(stats.rating) ? "fill-primary text-primary" : "text-gray-300 dark:text-gray-700"} 
                    />
                  ))}
                </div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none">Puntuación General</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-text-main mb-1">Tu Reputación</h3>
            <p className="text-sm text-text-muted font-medium max-w-[240px]">Basado en {stats.count} servicios completados con éxito.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="bg-bg-primary p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-soft flex flex-col items-center gap-1.5">
                <Award size={24} className="text-secondary" />
                <div className="text-center">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Nivel</p>
                  <p className="text-base font-bold text-text-main opacity-80">Nivel {getUserLevel(stats.count)}</p>
                </div>
             </div>
             <div className="bg-bg-primary p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-soft flex flex-col items-center gap-1.5">
                <TrendingUp size={24} className="text-success" />
                <div className="text-center">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Crecimiento</p>
                  <p className="text-base font-bold text-text-main opacity-80">{stats.count === 0 ? "0% este mes" : "+15% este mes"}</p>
                </div>
             </div>
          </div>

          <div className="bg-bg-primary/50 rounded-3xl p-5 border border-gray-100 dark:border-gray-800">
             <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-3 pl-2">Desglose de Calificaciones</h4>
             <div className="flex flex-col gap-2.5">
               {[5, 4, 3, 2, 1].map(s => {
                 const countForStar = stats.ratingDistribution?.[s] || 0;
                 const percentage = stats.totalRatings > 0 
                   ? Math.round((countForStar / stats.totalRatings) * 100) 
                   : 0;
                 return (
                  <div key={s} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-8">
                      <span className="text-xs font-bold text-text-main">{s}</span>
                      <Star size={10} className="text-primary fill-primary" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className="h-full bg-primary"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-text-muted w-8 text-right">
                      {percentage}%
                    </span>
                  </div>
                 );
               })}
             </div>
          </div>
        </div>
      )
    },
    earnings: {
      title: 'Ganancias',
      content: (
        <div className="flex flex-col gap-6 pt-2 pb-28">
          <div className="bg-primary/5 rounded-[40px] p-8 text-center border border-primary/10 mb-2">
             <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Ganancias Totales</p>
             <h3 className="text-4xl font-black text-primary font-manrope">
               ${stats.earnings.total.toLocaleString('es-AR')}
             </h3>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { label: 'Hoy', value: stats.earnings.day, color: 'text-success' },
              { label: 'Esta Semana', value: stats.earnings.week, color: 'text-secondary' },
              { label: 'Este Mes', value: stats.earnings.month, color: 'text-black dark:text-white' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-bg-primary rounded-[32px] p-6 border border-gray-100 dark:border-gray-800 shadow-soft flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black text-black/50 dark:text-white/50 uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className={`text-xl font-black ${stat.color}`}>${stat.value.toLocaleString('es-AR')}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
                  <TrendingUp size={18} className={stat.color === 'text-black dark:text-white' ? 'text-primary' : stat.color} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-4">
             <button 
               onClick={() => {
                 const doc = new jsPDF();
                 
                 // Add Title
                 doc.setFontSize(22);
                 doc.setTextColor(44, 125, 160); // Primary color
                 doc.text('Historial de Ganancias - Servicios Pro', 14, 22);
                 
                 // Add User Info
                 doc.setFontSize(12);
                 doc.setTextColor(100);
                 doc.text(`Usuario: ${user?.displayName || 'Usuario'}`, 14, 32);
                 doc.text(`Fecha de reporte: ${new Date().toLocaleString('es-AR')}`, 14, 38);
                 
                 // Add Summary
                 doc.setFontSize(14);
                 doc.setTextColor(0);
                 doc.text('Resumen de Ganancias:', 14, 50);
                 
                 autoTable(doc, {
                   startY: 55,
                   head: [['Periodo', 'Monto']],
                   body: [
                     ['Hoy', `$${stats.earnings.day.toLocaleString('es-AR')}`],
                     ['Esta Semana', `$${stats.earnings.week.toLocaleString('es-AR')}`],
                     ['Este Mes', `$${stats.earnings.month.toLocaleString('es-AR')}`],
                     ['Total Acumulado', `$${stats.earnings.total.toLocaleString('es-AR')}`],
                   ],
                   theme: 'striped',
                   headStyles: { fillColor: [44, 125, 160] }
                 });
                 
                 // Add Detailed List
                 doc.setFontSize(14);
                 doc.text('Detalle de Servicios:', 14, (doc as any).lastAutoTable.finalY + 15);
                 
                 const tableData = stats.detailedJobs.length > 0 
                   ? stats.detailedJobs.map((job, idx) => [idx + 1, job.date, job.title, job.price])
                   : [['-', 'No hay registros', '-', '-']];
                 
                 autoTable(doc, {
                   startY: (doc as any).lastAutoTable.finalY + 20,
                   head: [['#', 'Fecha', 'Servicio', 'Monto']],
                   body: tableData,
                   theme: 'grid',
                   headStyles: { fillColor: [79, 70, 229] } // Using indigo/secondary feel
                 });
                 
                 doc.save(`Historial_Ganancias_ServiciosPro_${new Date().toISOString().split('T')[0]}.pdf`);
               }}
               className="w-full h-16 bg-bg-secondary border border-gray-200 dark:border-gray-800 text-text-main rounded-3xl font-bold flex items-center justify-center gap-3 hover:border-primary transition-all active:scale-95"
             >
               <Download size={20} className="text-primary" />
               Descargar Historial Detallado (PDF)
             </button>
             
             <button 
               onClick={() => {
                 const text = `Mi resumen de ganancias en Servicios Pro:\n\nHoy: $${stats.earnings.day.toLocaleString('es-AR')}\nSemana: $${stats.earnings.week.toLocaleString('es-AR')}\nMes: $${stats.earnings.month.toLocaleString('es-AR')}`;
                 window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
               }}
               className="w-full h-16 bg-[#25D366] text-white rounded-3xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 active:scale-95 transition-all"
             >
               <MessageCircle size={20} className="fill-white" />
               Compartir por WhatsApp
             </button>
          </div>
        </div>
      )
    },
    points: {
      get title() {
        return user?.role === 'professional' ? 'Hitos y Beneficios' : 'Programa de Recompensas Pro';
      },
      content: (() => {
          const isProfessional = user?.role === 'professional';
  
          if (isProfessional) {
            const isPremium = user?.role === 'premium' || user?.premium_status === 'active' || user?.is_premium;
            const totalPoints = isPremium ? Math.max(stats.count * 150, 6000) : stats.count * 150;
          let currentLevel = 'Bronce';
          let nextLevel = 'Plata';
          let levelMin = 0;
          let levelMax = 500;
          let activeIndex = 0;
          let colorTheme = 'text-orange-400';

          if (totalPoints >= 6000 || isPremium) {
            currentLevel = 'Diamante';
            nextLevel = 'Máximo alcanzado';
            levelMin = 6000;
            levelMax = 6000;
            activeIndex = 4;
            colorTheme = 'text-teal-400';
          } else if (totalPoints >= 3001) {
            currentLevel = 'Platino';
            nextLevel = 'Diamante';
            levelMin = 3001;
            levelMax = 6000;
            activeIndex = 3;
            colorTheme = 'text-indigo-400';
          } else if (totalPoints >= 1501) {
            currentLevel = 'Oro';
            nextLevel = 'Platino';
            levelMin = 1501;
            levelMax = 3000;
            activeIndex = 2;
            colorTheme = 'text-yellow-500';
          } else if (totalPoints >= 501) {
            currentLevel = 'Plata';
            nextLevel = 'Oro';
            levelMin = 501;
            levelMax = 1500;
            activeIndex = 1;
            colorTheme = 'text-gray-400';
          }

          const percentage = levelMax === levelMin ? 100 : Math.min(100, Math.max(0, ((totalPoints - levelMin) / (levelMax - levelMin)) * 100));
          const ptsRemaining = levelMax === levelMin ? 0 : levelMax - totalPoints;

          // Calculate today completed jobs count from stats.detailedJobs
          const todayStr = new Date().toLocaleDateString();
          const todayJobsCount = stats.detailedJobs?.filter((j: any) => j.date === todayStr).length || 0;

          return (
        <div className="flex flex-col gap-4 py-2 flex-grow h-full min-h-0">
          <div className="flex flex-col items-center">
             <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <Award size={48} className={colorTheme} />
                <motion.div 
                   className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
             </div>
             <h3 className="text-3xl font-black text-black dark:text-white mb-1">{totalPoints.toLocaleString('es-AR')} PTS</h3>
             <p className={`text-sm font-black uppercase tracking-widest ${colorTheme}`}>Nivel {currentLevel}</p>
             {isPremium && (
               <span className="text-[9px] font-black bg-yellow-500 text-slate-900 border border-yellow-400 px-3 py-1 rounded-full uppercase mt-2 shadow-sm animate-pulse">
                👑 Beneficio de Suscripción Premium Activo
               </span>
             )}
          </div>

          <div className="bg-bg-primary/50 border border-gray-100 dark:border-white/5 rounded-[40px] p-8">
             <div className="flex justify-between items-end mb-4 px-1">
                <div>
                   <p className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest">Próximo Nivel</p>
                   <p className="text-base font-black text-black dark:text-white">Nivel {nextLevel}</p>
                </div>
                {ptsRemaining > 0 && !isPremium && <p className="text-xs font-black text-primary">{ptsRemaining.toLocaleString('es-AR')} pts restantes</p>}
             </div>
             <div className="h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mb-2">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${percentage}%` }}
                   className="h-full bg-primary shadow-[0_0_12px_rgba(44,125,160,0.4)]"
                />
             </div>
             <p className="text-[10px] font-bold text-black/30 dark:text-white/20 text-center uppercase tracking-widest mt-4">
               {isPremium ? 'Posees el estatus de nivel máximo por tu membresía premium' : 'Sigue completando servicios para subir de nivel'}
             </p>
          </div>

          {/* Bonos estilo Uber */}
          {(() => {
            // Calculate this week completed jobs count
            const getStartOfWeek = () => {
              const d = new Date();
              const day = d.getDay();
              const diff = d.getDate() - day;
              return new Date(d.setDate(diff)).setHours(0, 0, 0, 0);
            };
            const startOfWeekTime = getStartOfWeek();
            const weekJobsCount = stats.detailedJobs?.filter((j: any) => j.timestamp >= startOfWeekTime).length || 0;

            // Calculate this month completed jobs count
            const getStartOfMonth = () => {
              const d = new Date();
              return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
            };
            const startOfMonthTime = getStartOfMonth();
            const monthJobsCount = stats.detailedJobs?.filter((j: any) => j.timestamp >= startOfMonthTime).length || 0;

            return (
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-5 shadow-premium border border-indigo-500/30 flex flex-col gap-4 relative w-full h-auto mt-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[64px] opacity-40"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full text-indigo-200">
                      {bonusTab === 'daily' ? 'meta diaria' : bonusTab === 'weekly' ? 'meta semanal' : 'meta mensual'}
                    </span>
                    <h4 className="text-lg font-black font-manrope mt-2.5">Desafío Multiplicador</h4>
                  </div>
                  <TrendingUp className="text-indigo-400 animate-bounce" size={24} />
                </div>

                {/* Toggle tabs */}
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 my-1 z-10">
                  <button 
                    type="button"
                    onClick={() => setBonusTab('daily')}
                    className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${bonusTab === 'daily' ? 'bg-indigo-500 text-white shadow-md' : 'text-indigo-200/60 hover:text-white'}`}
                  >
                    Diaria
                  </button>
                  <button 
                    type="button"
                    onClick={() => setBonusTab('weekly')}
                    className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${bonusTab === 'weekly' ? 'bg-indigo-500 text-white shadow-md' : 'text-indigo-200/60 hover:text-white'}`}
                  >
                    Semanal
                  </button>
                  <button 
                    type="button"
                    onClick={() => setBonusTab('monthly')}
                    className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${bonusTab === 'monthly' ? 'bg-indigo-500 text-white shadow-md' : 'text-indigo-200/60 hover:text-white'}`}
                  >
                    Mensual
                  </button>
                </div>

                {bonusTab === 'daily' && (
                  <>
                    <p className="text-xs text-indigo-200/80 leading-relaxed font-semibold">
                      ¡Completa solicitudes hoy y activa bonificaciones de tarifa extra directo a tu saldo!
                    </p>

                    <div className="bg-white/5 rounded-3xl p-5 border border-white/10 mt-1">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-xs font-black">Progreso de Hoy</span>
                        <span className="text-xs font-black text-indigo-300">{todayJobsCount} / 3 trabajos</span>
                      </div>
                      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-400 transition-all duration-500 shadow-[0_0_12px_rgba(129,140,248,0.5)]"
                          style={{ width: `${Math.min(100, (todayJobsCount / 3) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3.5 mt-1">
                      <div className={`flex items-center justify-between p-4 rounded-2xl border ${todayJobsCount >= 3 ? 'bg-indigo-500/20 border-indigo-400/40' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-400/20 flex items-center justify-center text-indigo-300 text-sm">🏆</div>
                          <div>
                            <h5 className="text-xs font-black">Meta Diaria: 3 Trabajos</h5>
                            <p className="text-[10px] text-indigo-200/60 font-medium">Bono de $20.000 Extra</p>
                          </div>
                        </div>
                        {todayJobsCount >= 3 ? (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">Completado</span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-white/5 text-indigo-200/40 px-2.5 py-1 rounded-full">Pendiente</span>
                        )}
                      </div>

                      <div className={`flex items-center justify-between p-4 rounded-2xl border ${todayJobsCount >= 5 ? 'bg-indigo-500/20 border-indigo-400/40' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-400/20 flex items-center justify-center text-indigo-300 text-sm">🔥</div>
                          <div>
                            <h5 className="text-xs font-black">Meta Diaria: 5 Trabajos</h5>
                            <p className="text-[10px] text-indigo-200/60 font-medium">Bono de $45.000 Extra</p>
                          </div>
                        </div>
                        {todayJobsCount >= 5 ? (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">Completado</span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-white/5 text-indigo-200/40 px-2.5 py-1 rounded-full">Pendiente</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {bonusTab === 'weekly' && (
                  <>
                    <p className="text-xs text-indigo-200/80 leading-relaxed font-semibold">
                      ¡Mantén el ritmo durante la semana y desbloquea multiplicadores de ganancias premium!
                    </p>

                    <div className="bg-white/5 rounded-3xl p-5 border border-white/10 mt-1">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-xs font-black">Progreso Semanal</span>
                        <span className="text-xs font-black text-indigo-300">{weekJobsCount} / 15 trabajos</span>
                      </div>
                      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-400 transition-all duration-500 shadow-[0_0_12px_rgba(129,140,248,0.5)]"
                          style={{ width: `${Math.min(100, (weekJobsCount / 15) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3.5 mt-1">
                      <div className={`flex items-center justify-between p-4 rounded-2xl border ${weekJobsCount >= 15 ? 'bg-indigo-500/20 border-indigo-400/40' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-400/20 flex items-center justify-center text-indigo-300 text-sm">👑</div>
                          <div>
                            <h5 className="text-xs font-black">Meta Semanal: 15 Trabajos</h5>
                            <p className="text-[10px] text-indigo-200/60 font-medium font-semibold">Bono de $100.000 Extra</p>
                          </div>
                        </div>
                        {weekJobsCount >= 15 ? (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">Completado</span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-white/5 text-indigo-200/40 px-2.5 py-1 rounded-full">Pendiente</span>
                        )}
                      </div>

                      <div className={`flex items-center justify-between p-4 rounded-2xl border ${weekJobsCount >= 25 ? 'bg-indigo-500/20 border-indigo-400/40' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-400/20 flex items-center justify-center text-indigo-300 text-sm">⚡</div>
                          <div>
                            <h5 className="text-xs font-black">Meta Semanal: 25 Trabajos</h5>
                            <p className="text-[10px] text-indigo-200/60 font-medium font-semibold">Bono de $200.000 Extra</p>
                          </div>
                        </div>
                        {weekJobsCount >= 25 ? (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">Completado</span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-white/5 text-indigo-200/40 px-2.5 py-1 rounded-full">Pendiente</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {bonusTab === 'monthly' && (
                  <>
                    <p className="text-xs text-indigo-200/80 leading-relaxed font-semibold">
                      ¡Alcanza la cima mensual y asegura los máximos incentivos de Servicio Pro!
                    </p>

                    <div className="bg-white/5 rounded-3xl p-5 border border-white/10 mt-1">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-xs font-black">Progreso Mensual</span>
                        <span className="text-xs font-black text-indigo-300">{monthJobsCount} / 50 trabajos</span>
                      </div>
                      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-400 transition-all duration-500 shadow-[0_0_12px_rgba(129,140,248,0.5)]"
                          style={{ width: `${Math.min(100, (monthJobsCount / 50) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3.5 mt-1">
                      <div className={`flex items-center justify-between p-4 rounded-2xl border ${monthJobsCount >= 50 ? 'bg-indigo-500/20 border-indigo-400/40' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-400/20 flex items-center justify-center text-indigo-300 text-sm">🌌</div>
                          <div>
                            <h5 className="text-xs font-black">Meta Mensual: 50 Trabajos</h5>
                            <p className="text-[10px] text-indigo-200/60 font-medium mr-2">Bono de $400.000 Extra</p>
                          </div>
                        </div>
                        {monthJobsCount >= 50 ? (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">Completado</span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-white/5 text-indigo-200/40 px-2.5 py-1 rounded-full">Pendiente</span>
                        )}
                      </div>

                      <div className={`flex items-center justify-between p-4 rounded-2xl border ${monthJobsCount >= 80 ? 'bg-indigo-500/20 border-indigo-400/40' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-400/20 flex items-center justify-center text-indigo-300 text-sm">🔮</div>
                          <div>
                            <h5 className="text-xs font-black">Meta Mensual: 80 Trabajos</h5>
                            <p className="text-[10px] text-indigo-200/60 font-medium font-semibold">Bono de $750.000 Extra</p>
                          </div>
                        </div>
                        {monthJobsCount >= 80 ? (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">Completado</span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-white/5 text-indigo-200/40 px-2.5 py-1 rounded-full">Pendiente</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })()}

          <div className="flex flex-col gap-3 mt-4">
             <div className="flex justify-between items-center px-2">
                <h4 className="text-xs font-black text-black/40 dark:text-white/40 uppercase tracking-[0.2em]">Beneficios de tu Nivel</h4>
             </div>
             <div className="flex flex-col gap-4">
                {[
                  { icon: <TrendingUp size={18} />, title: 'Comisión de Plataforma Reducida', desc: currentLevel === 'Diamante' ? 'Comisión del 1% (Nivel Máximo)' : currentLevel === 'Platino' ? 'Comisión del 4%' : currentLevel === 'Oro' ? 'Comisión del 8%' : 'Comisión normal (15%). ¡Sube de nivel para bajarla!' },
                  { icon: <Shield size={18} />, title: 'Prioridad de Soporte e Ingreso', desc: currentLevel === 'Diamante' || isPremium ? 'Soporte Ultra-Prioritario y chat directo instantáneo.' : 'Soporte normal de plataforma.' },
                  { icon: <Award size={18} />, title: `Insignia Profesional ${currentLevel}`, desc: `Insignia visible ${currentLevel} destacada que multiplica tus llamadas de clientes.` }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white dark:bg-bg-primary rounded-3xl border border-gray-100 dark:border-white/5 shadow-soft">
                     <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                        {benefit.icon}
                     </div>
                     <div>
                        <p className="font-black text-sm text-black dark:text-white">{benefit.title}</p>
                        <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed font-bold mt-1">{benefit.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-4 mb-4">
             <h4 className="text-xs font-black text-black/40 dark:text-white/40 uppercase tracking-[0.2em] px-2">Escalafón de Niveles</h4>
             <div className="flex flex-col gap-3">
                {[
                  { lv: 'Bronce', pts: '0 - 500', color: 'text-orange-400', active: activeIndex === 0 },
                  { lv: 'Plata', pts: '501 - 1500', color: 'text-gray-400', active: activeIndex === 1 },
                  { lv: 'Oro', pts: '1501 - 3000', color: 'text-yellow-500', active: activeIndex === 2 },
                  { lv: 'Platino', pts: '3001 - 6000', color: 'text-indigo-400', active: activeIndex === 3 },
                  { lv: 'Diamante', pts: '6000+ o Premium 👑', color: 'text-teal-400', active: activeIndex === 4 }
                ].map((level, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${level.active ? 'bg-primary/5 border-primary/20' : 'bg-transparent border-gray-100 dark:border-white/5'}`}>
                     <div className="flex items-center gap-3">
                        <Award size={16} className={level.color} />
                        <div>
                           <p className={`text-xs font-black ${level.active ? 'text-primary' : 'text-black dark:text-white'}`}>{level.lv}</p>
                           <p className="text-[10px] font-bold text-black/30 dark:text-white/20">{level.pts}</p>
                        </div>
                     </div>
                     {level.active && <span className="text-[8px] font-black bg-primary text-white px-2 py-0.5 rounded-full uppercase">Actual</span>}
                  </div>
                ))}
             </div>
          </div>
        </div>
        );
        } else {
          // BRAND NEW DETAILED DYNAMIC CLIENT POINTS CATALOG
          const isBasic = !(user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active' || user?.premium_status === 'cancelling');
          
          const catalogRewards = config.rewardsCatalog.map((item) => {
            if (item.id === 'cup_premium') {
              return {
                ...item,
                disabled: !isBasic
              };
            }
            return item;
          });

          return (
            <div className="flex flex-col gap-4 py-2 flex-grow h-full min-h-0 text-sans bg-bg-secondary select-none">
              
              {/* Dynamic Points Balance Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-3xl p-6 shadow-soft relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Billetera de Beneficios</p>
                <h3 className="text-3xl font-black font-manrope mt-1">{clientPoints.toLocaleString('es-AR')} <span className="text-sm font-semibold text-indigo-100">PTS PRO</span></h3>
                <p className="text-xs text-white/85 mt-2 font-medium leading-relaxed">
                  Ganás 150 PTS cada vez que cerrás un arreglo, <strong>300 PTS usando la IA de diagnóstico</strong>, y por cada amigo referido que concrete un servicio.
                </p>
              </div>

              {/* Sub-Tabs Nav Toggle */}
              <div className="flex bg-white dark:bg-zinc-800/40 p-1 rounded-2xl border border-gray-150 dark:border-white/5 shadow-sm shrink-0">
                <button
                  type="button"
                  onClick={() => setPointsTab('catalog')}
                  className={`flex-1 py-1 px-4 text-xs font-bold rounded-xl transition-all ${pointsTab === 'catalog' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'}`}
                >
                  🎁 Catálogo
                </button>
                <button
                  type="button"
                  onClick={() => setPointsTab('coupons')}
                  className={`flex-1 py-1 px-4 text-xs font-bold rounded-xl transition-all ${pointsTab === 'coupons' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'}`}
                >
                  🎟️ Tus Canjes ({userCoupons.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPointsTab('info')}
                  className={`flex-1 py-1 px-4 text-xs font-bold rounded-xl transition-all ${pointsTab === 'info' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'}`}
                >
                  ⚡ Cómo Sumar
                </button>
              </div>

              {/* Tab 1: Catalog */}
              {pointsTab === 'catalog' && (
                <div className="flex flex-col gap-4 overflow-y-auto pr-1 flex-grow">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Premios Disponibles</span>
                    <span className="text-[10px] text-text-muted font-bold font-semibold">100 PTS = $100 ARS</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {catalogRewards.map((item) => {
                      const hasEnough = clientPoints >= item.ptsCost;
                      const isItemDisabled = item.disabled;

                      return (
                        <div key={item.id} className={`p-4 bg-white dark:bg-bg-primary rounded-3xl border border-gray-100 dark:border-white/5 shadow-soft flex flex-col gap-3 ${isItemDisabled ? 'opacity-50' : ''}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl shrink-0">{item.icon}</span>
                              <div>
                                <h4 className="font-bold text-sm text-text-main flex items-center gap-1.5">
                                  {item.name}
                                  <span className="text-[9px] font-extrabold bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 px-2 py-0.5 rounded-full uppercase">{item.category}</span>
                                </h4>
                                <p className="text-xs font-semibold text-primary mt-0.5">{item.desc}</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-text-main bg-gray-50 dark:bg-white/5 py-1 px-2.5 rounded-lg border border-black/5 dark:border-white/5">{item.ptsCost.toLocaleString('es-AR')} PTS</span>
                          </div>

                          <p className="text-[11px] text-text-muted font-medium leading-relaxed pl-1">
                            {item.longerDesc}
                          </p>

                          <button
                            type="button"
                            disabled={!hasEnough || isItemDisabled}
                            onClick={() => handleRedeemCoupon(item.name, item.ptsCost, item.desc)}
                            className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                              isItemDisabled
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-zinc-805'
                                : (hasEnough 
                                    ? 'bg-primary text-white shadow-md active:scale-[0.98]' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-white/5 dark:text-white/20')
                            }`}
                          >
                            {isItemDisabled 
                              ? 'Ya tenés Premium Activo 👑' 
                              : (hasEnough ? 'Canjear Beneficio 🎁' : `Te faltan ${(item.ptsCost - clientPoints).toLocaleString('es-AR')} PTS`)}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Redeemed Coupons */}
              {pointsTab === 'coupons' && (
                <div className="flex flex-col gap-4 overflow-y-auto pr-1 flex-grow">
                  <div className="px-1">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Cupones de Descuento Activos</span>
                  </div>

                  {userCoupons.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-white/[0.02] border border-dashed border-gray-150 dark:border-white/5 rounded-3xl p-6">
                      <span className="text-4xl mb-3">🎫</span>
                      <p className="font-bold text-sm text-text-main">No tenés canjes activos</p>
                      <p className="text-xs text-text-muted mt-1 leading-snug">Se acumulan acá cuando canjeás tus puntos por cupones. ¡Utilizalos en tu próximo reclamo o reparación técnica!</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {userCoupons.map((coupon: any) => (
                        <div key={coupon.id} className="p-4 bg-white dark:bg-bg-primary rounded-3xl border-2 border-dashed border-indigo-500/20 shadow-soft flex flex-col gap-3 relative overflow-hidden">
                          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-indigo-500/5 rounded-full"></div>
                          
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-black text-sm text-text-main flex items-center gap-1.5">
                                {coupon.name}
                                <span className="text-[8px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase">Listo para Usar</span>
                              </h4>
                              <p className="text-[11px] text-text-muted mt-0.5 font-medium">{coupon.desc}</p>
                            </div>
                            <span className="text-[10px] font-bold text-text-muted bg-gray-50 dark:bg-white/5 px-2 py-1 rounded">{coupon.date}</span>
                          </div>

                          <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl flex items-center justify-between border border-gray-100 dark:border-white/5">
                            <div>
                              <p className="text-[9px] text-text-muted uppercase font-bold tracking-wider">Código Promocional:</p>
                              <p className="font-mono font-black text-sm text-indigo-600 dark:text-indigo-400 tracking-wider mt-0.5">{coupon.code}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(coupon.code);
                                showToast('Código copiado para usar en cobro');
                              }}
                              className="px-3 py-1.5 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 text-[10px] font-bold rounded-lg transition-transform active:scale-95"
                            >
                              Copiar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Gamification Hooks info */}
              {pointsTab === 'info' && (
                <div className="flex flex-col gap-4 overflow-y-auto pr-1 flex-grow">
                  <div className="px-1">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Motor de Gamificación: ¿Cómo Sumás?</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 bg-white dark:bg-bg-primary rounded-3xl border border-gray-100 dark:border-white/5 shadow-soft flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                        ✨
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-text-main uppercase tracking-wider">Completar un Trabajo</h4>
                        <p className="text-sm font-black text-primary mt-1">+150 Puntos Pro</p>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          Cada vez que confirmás la orden de trabajo técnica y dás conformidad, recibís puntos directamente a tu saldo por tu fidelidad.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl border border-indigo-400/25 shadow-soft flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-600 flex items-center justify-center shrink-0 text-lg">
                        🤖
                      </div>
                      <div>
                        <h4 className="font-black text-xs text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                          Diagnóstico IA Servicios Pro
                          <span className="text-[8px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full font-bold">X2 DOBLE</span>
                        </h4>
                        <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-1">+300 Puntos Pro</p>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          ¡Hacé rendir tus arreglos! Seguí usando el diagnóstico por IA para sumar el doble de puntos, invitar amigos y canjearlos por reparaciones gratis.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-white dark:bg-bg-primary rounded-3xl border border-gray-100 dark:border-white/5 shadow-soft flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
                        👥
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-text-main uppercase tracking-wider">Invitaciones Exitosas</h4>
                        <p className="text-sm font-black text-primary mt-1">Bono por hito + Regalo de bienvenida</p>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          Invitá amigos con tu link y lucite como recomendador técnico. Sumás un hito progresivo cada vez que ellos completen su primer arreglo!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        }
      })()
    },
    referrals: {
      title: 'Programa de Embajadores & Referidos',
      content: (() => {
        const milestones = [
          { count: 1, pts: 200, label: 'Hito 1: 1 Invitado' },
          { count: 5, pts: 1200, label: 'Hito 2: 5 Invitados' },
          { count: 10, pts: 3000, label: 'Hito 3: 10 Invitados' },
          { count: 25, pts: 8000, label: 'Hito 4: 25 Invitados' },
          { count: 50, pts: 18000, label: 'Hito 5: 50 Invitados' },
          { count: 100, pts: 40000, label: 'Hito 6: Súper Promotor 👑' },
        ];

        const nextMilestone = milestones.find(m => m.count > invitedCount) || milestones[milestones.length - 1];
        const isMaxMilestone = invitedCount >= 100;
        
        const refCode = `PRO-${user?.displayName?.split(' ')?.[0]?.toUpperCase() || 'CLIENT'}-${user?.uid?.substring(0, 4).toUpperCase() || '389'}`;
        const refLinkMessage = `¡Sumate a Servicios Pro para arreglar lo que necesites en casa con la IA de diagnóstico y un $1.000 ARS de descuento de regalo! Usá mi código: ${refCode}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(refLinkMessage)}`;

        return (
          <div className="flex flex-col gap-4 py-2 flex-grow h-full min-h-0 text-sans bg-bg-secondary select-none">
            
            {/* Header Referral Box */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-3xl p-6 shadow-soft relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-pink-200">Invitá y Ganá Puntos Pro</p>
              <h3 className="text-3xl font-black font-manrope mt-1">{invitedCount} {invitedCount === 1 ? 'Invitado' : 'Invitados'}</h3>
              
              {/* Gamification referral conditional trigger exact Argentinian format */}
              <p className="text-xs text-white/90 font-semibold leading-relaxed mt-2.5">
                {isMaxMilestone 
                  ? '🎉 ¡Alcanzaste el máximo estatus de Súper Promotor en nuestra plataforma!'
                  : `Te faltan solo ${nextMilestone.count - invitedCount} invitados para llegar al próximo hito y destrabar ${nextMilestone.pts} Puntos Pro de regalo. ¡Compartí tu código!`}
              </p>
            </div>

            {/* Referral Code Copy Card */}
            <div className="bg-white dark:bg-bg-primary p-4 rounded-3xl border border-gray-150 dark:border-white/5 shadow-soft flex flex-col gap-3 shrink-0">
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Tu Código de Invitación Exclusivo:</p>
                <div className="flex items-center justify-between mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-3.5 rounded-2xl">
                  <span className="font-mono font-black text-base text-pink-600 dark:text-pink-400 select-all tracking-wider">{refCode}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(refCode);
                      showToast('¡Código copiado con tu portapapeles!');
                    }}
                    className="flex items-center gap-1.5 p-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 text-xs font-bold rounded-xl transition-all active:scale-95"
                  >
                    <Copy size={14} /> Copiar
                  </button>
                </div>
              </div>

              {/* Action buttons sharing */}
              <div className="grid grid-cols-1 gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 bg-[#25D366] text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-500/10 active:scale-95 transition-transform"
                >
                  Compartir vía WhatsApp 💬
                </a>
              </div>

              {/* Real Referral Code activation program */}
              {user?.referred_by ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3">
                  <span className="text-xl">🎉</span>
                  <div>
                    <p className="text-xs font-black text-emerald-800 dark:text-emerald-300">¡Código Activado!</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Fuiste invitado con el código <strong className="font-mono">{user.referred_by}</strong> y recibiste un bono de +1.000 PTS.</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2.5xl flex flex-col gap-2.5">
                  <div>
                    <p className="text-xs font-black text-text-main">¿Te invitó un amigo?</p>
                    <p className="text-[10px] text-text-muted font-medium mt-0.5">Ingresá su código de invitación para recibir 1.000 PTS Pro de bienvenida al instante.</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ej: PRO-JUAN-A3FD"
                      value={referralCodeInput}
                      onChange={(e) => setReferralCodeInput(e.target.value)}
                      disabled={isSubmittingReferral}
                      className="flex-1 h-10 px-3 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-white/10 rounded-xl text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-pink-500 dark:focus:border-pink-500 text-text-main"
                    />
                    <button
                      type="button"
                      onClick={() => handleActivateReferral(referralCodeInput)}
                      disabled={isSubmittingReferral || !referralCodeInput.trim()}
                      className="h-10 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
                    >
                      {isSubmittingReferral ? (
                        <Loader2 className="animate-spin" size={14} />
                      ) : (
                        'Activar 🎁'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Milestones Hierarchy Timeline */}
            <div className="flex flex-col gap-3 overflow-y-auto pr-1 flex-grow">
              <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] px-2">Escala de Hitos Progresivos</h4>
              
              <div className="flex flex-col gap-2">
                {milestones.map((mil, idx) => {
                  const isCompleted = invitedCount >= mil.count;
                  const isNext = !isCompleted && (idx === 0 || invitedCount >= milestones[idx - 1].count);

                  return (
                    <div 
                      key={mil.count} 
                      className={`flex items-center justify-between p-3.5 rounded-2xl border ${
                        isCompleted 
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                          : (isNext ? 'bg-pink-500/5 border-pink-500/20 text-pink-600 dark:text-pink-400 shadow-sm' : 'bg-transparent border-gray-100 dark:border-white/5 opacity-55')
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{isCompleted ? '✅' : '🔒'}</span>
                        <div>
                          <p className="text-xs font-black leading-snug">{mil.label}</p>
                          <p className="text-[10px] text-text-muted font-bold">Premio de Hito: +{mil.pts.toLocaleString('es-AR')} PTS Pro</p>
                        </div>
                      </div>
                      {isCompleted ? (
                        <span className="text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full">RECLAMADO</span>
                      ) : (
                        isNext ? (
                          <span className="text-[9px] font-black uppercase bg-pink-500 text-white px-2.5 py-1 rounded-full animate-pulse">PRÓXIMO</span>
                        ) : (
                          <span className="text-[9px] font-bold text-text-muted bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">BLOQUEADO</span>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        );
      })()
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-secondary pb-32 font-sans relative overflow-x-hidden selection:bg-primary selection:text-white">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-bg-secondary/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/10 shadow-sm animate-in fade-in duration-300">
        {/* Left aligned logo as dominant element with section title underneath */}
        <div className="flex items-center gap-2 select-none filter drop-shadow-[0_1.5px_3.5px_rgba(0,82,255,0.18)]">
          <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <defs>
              <linearGradient id="qGradientHead_Perfil_Exact" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0052FF" />
                <stop offset="100%" stopColor="#00D8FF" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="32" stroke="url(#qGradientHead_Perfil_Exact)" strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M 68 68 L 84 84" stroke="url(#qGradientHead_Perfil_Exact)" strokeWidth="18" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight font-manrope text-slate-900 dark:text-white leading-none">
              Quick<span className="text-[#0052FF] dark:text-[#00D8FF]">Fix</span>
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#0052FF] dark:text-[#00D8FF] shrink-0">
                Perfil
              </span>
              <span className="text-[8px] text-slate-300 dark:text-slate-700 font-bold">•</span>
              <div className="flex items-center gap-1">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#00D8FF] animate-pulse"></span>
                <span className="text-[8px] font-black uppercase tracking-wider text-text-muted">
                  {user?.role === 'client' ? 'Cliente' : 'Profesional'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side alignment: Theme toggle, Notification Bell and User Photo/Avatar */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={toggleDarkMode}
            className="w-11 h-11 flex items-center justify-center text-text-main rounded-xl bg-bg-primary text-text-muted border border-gray-100 dark:border-gray-800 shadow-soft active:scale-95 transition-all text-sm"
            title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotificationsList(!showNotificationsList)}
            className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              showNotificationsList 
                ? 'bg-primary text-white shadow-premium' 
                : 'bg-bg-primary text-text-muted border border-gray-100 dark:border-gray-800 shadow-soft hover:text-primary'
            }`}
          >
            <Bell size={20} className={showNotificationsList ? "fill-white/20" : ""} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-alert rounded-full border-2 border-white dark:border-[#1A1F26] shadow-sm"></span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary shadow-premium active:scale-95 transition-transform overflow-hidden"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-bg-secondary border-2 border-white dark:border-[#1A1F26]">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted bg-bg-secondary">
                  <User size={16} />
                </div>
              )}
            </div>
          </motion.button>
        </div>

        {/* Floating Notifications List */}
        <AnimatePresence>
          {showNotificationsList && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-[75px] right-6 w-80 bg-white dark:bg-[#1C1C1E] dark:border-gray-800 rounded-2xl shadow-premium border border-gray-100 dark:border-gray-800 overflow-hidden z-[100]"
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
                  <X size={16} />
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
      </header>

      <main className="flex-1 px-4 py-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              className="fixed top-24 left-1/2 bg-primary text-white px-6 py-3 rounded-2xl text-sm font-black shadow-premium flex items-center gap-2 z-[100] border border-white/10"
            >
              <CheckCircle size={18} className="text-white" />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Info Header */}
        <section className="flex flex-row items-center gap-5 relative py-2 pl-4">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-55"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl opacity-55"></div>

          <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
            />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800 relative z-10 transition-transform group-hover:scale-[1.02] duration-300 shadow-sm">
              {isUpdatingPhoto && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center z-20">
                  <Loader2 className="animate-spin text-white" size={24} />
                </div>
              )}
              <img 
                src={localPhoto || user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'D')}&background=3e9ab3&color=fff&size=200`} 
                className={`w-full h-full object-cover transition-all ${isUpdatingPhoto ? 'scale-110 blur-[2px]' : 'group-hover:scale-105'}`} 
                referrerPolicy="no-referrer" 
                alt="Profile avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'D')}&background=3e9ab3&color=fff&size=200`;
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Camera size={20} className="text-white animate-pulse" />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-bg-primary text-text-main rounded-full shadow-md flex items-center justify-center border border-gray-100 dark:border-gray-800 z-20 group-hover:scale-110 transition-transform">
              <Camera size={13} />
            </button>
          </div>
          
          <div className="flex-1 text-left relative z-10">
            <h2 className="text-xl md:text-2xl font-bold text-text-main font-manrope tracking-tight">{toTitleCase(user?.displayName || 'Diego Reartes')}</h2>
            <div className="flex flex-col items-start gap-1 mt-1">
              {(() => {
                const isPremium = user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active';
                return (
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${
                    isPremium 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-500/20'
                  }`}>
                     <span className="text-[9px] font-bold uppercase tracking-widest">
                       {user?.role === 'professional' || (user?.professions && user?.professions.length > 0)
                          ? (isPremium ? 'Profesional Elite' : 'Profesional')
                          : (isPremium ? 'Cliente Premium' : 'Cliente')}
                     </span>
                  </div>
                );
              })()}
              {user?.role === 'professional' && (
                <p className="text-[11px] font-semibold text-text-muted opacity-80 leading-snug italic mt-1 max-w-[240px]">
                  "{user?.bio || 'Apasionado por la excelencia técnica y el servicio de calidad en cada proyecto.'}"
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Action Stats Mini Grid */}
        {user?.role === 'professional' && (
          <section className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveModal('rating')}
                className="bg-white dark:bg-bg-primary p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center gap-1 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all active:scale-95 group"
              >
                 <Star size={24} className="text-yellow-400 fill-yellow-400/15 group-hover:scale-110 transition-transform" />
                 <span className="text-xl font-black text-text-main font-manrope mt-1">
                   {stats.rating > 0 ? stats.rating.toFixed(1) : "Sin calif."}
                 </span>
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-70">Reputación</span>
              </button>
              <button 
                onClick={() => setActiveModal('points')}
                className="bg-white dark:bg-bg-primary p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center gap-1 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all active:scale-95 group"
              >
                 <Award size={24} className="text-[#00D8FF] group-hover:scale-110 transition-transform" />
                 <span className="text-xl font-black text-text-main font-manrope mt-1">{getUserLevel(stats.count)}</span>
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-70">Rango Actual</span>
              </button>
          </section>
        )}

        {/* Client Points & Referrals Highlights */}
        {user?.role === 'client' && (
          <section className="mt-0 w-full flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Club Pro Points */}
            <button
              onClick={() => setActiveModal('points')}
              className="w-full bg-gradient-to-br from-indigo-500 to-[#0052FF] dark:from-indigo-600 dark:to-cyan-950 p-5 rounded-2xl shadow-sm text-left flex items-center justify-between hover:opacity-95 transition-all active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex gap-4 items-center z-10">
                <div className="w-11 h-11 bg-white/20 text-white rounded-xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  <Award size={22} className="animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-indigo-150">Club Pro Beneficios</p>
                  <p className="text-sm font-extrabold text-white mt-0.5">Programa de Recompensas Pro</p>
                  <p className="text-[10px] text-indigo-100/90 font-medium mt-0.5 leading-tight animate-pulse">Canjeá tus puntos por cupones de descuento y más</p>
                </div>
              </div>
              <div className="flex flex-col items-end z-10 shrink-0">
                <p className="text-xl font-black text-white tracking-tight">{clientPoints.toLocaleString('es-AR')}</p>
                <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mt-0.5">PTS PRO</p>
              </div>
            </button>

            {/* Club Pro Referrals Banner */}
            <button
              onClick={() => setActiveModal('referrals')}
              className="w-full bg-gradient-to-br from-pink-500 to-[#0052FF] p-5 rounded-2xl shadow-sm text-left flex items-center justify-between hover:opacity-95 transition-all active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex gap-4 items-center z-10">
                <div className="w-11 h-11 bg-white/20 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  <Gift size={22} className="animate-bounce" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-pink-150">Invitá y Ganá Puntos</p>
                  <p className="text-sm font-extrabold text-white mt-0.5">Programa de Embajadores & Referidos</p>
                  <p className="text-[10px] text-pink-100/90 font-medium mt-0.5 leading-tight">{invitedCount} {invitedCount === 1 ? 'amigo invitado' : 'amigos invitados'} • Premio por hito</p>
                </div>
              </div>
              <div className="flex flex-col items-end z-10 shrink-0 bg-white/15 px-3 py-1.5 rounded-2xl border border-white/10">
                <p className="text-xs font-black text-white tracking-tight">Regalo 🎁</p>
                <p className="text-[9px] font-black text-pink-100 uppercase tracking-widest mt-0.5">+$1.000 ARS</p>
              </div>
            </button>
          </section>
        )}

        {/* Account Settings */}
        <section className="flex flex-col gap-2 mt-0">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 opacity-70">Gestión de Perfil</h3>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'premium', icon: <Crown size={18} />, title: 'Membresía Premium', subtitle: (user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active') ? 'Activa' : (user?.premium_status === 'pending' ? 'Pendiente' : 'Mejora tu perfil'), color: 'bg-yellow-500/10 text-yellow-500', roles: ['professional', 'client', 'premium'] },
              { id: 'professions', icon: <Briefcase size={18} />, title: 'Profesiones y Certificados', subtitle: 'Habilitar oficios, títulos y matrículas', color: 'bg-emerald-500/10 text-emerald-600', roles: ['professional', 'premium'] },
              { id: 'info', icon: <User size={18} />, title: 'Datos Personales', subtitle: 'Información y contacto', color: 'bg-primary/5 text-primary', hideForParams: false },
              { id: 'earnings', icon: <TrendingUp size={18} />, title: 'Mis Finanzas', subtitle: 'Ganancias y facturación', color: 'bg-success/5 text-success', roles: ['professional', 'premium'] },
              { id: 'wallet', icon: <CreditCard size={18} />, title: 'Billetera', subtitle: 'Métodos de pago', color: 'bg-indigo-500/5 text-indigo-500', roles: ['client'] },
              { id: 'prefs', icon: <Settings size={18} />, title: 'Preferencias', subtitle: 'Alertas y notificaciones', color: 'bg-secondary/5 text-secondary', hideForParams: false },
              { id: 'privacy', icon: <Shield size={18} />, title: 'Seguridad', subtitle: 'Privacidad y contraseñas', color: 'bg-orange-500/5 text-orange-500', hideForParams: false },
              { id: 'support', icon: <MessageCircle size={18} />, title: 'Soporte', subtitle: 'Ayuda técnica y mediación', color: 'bg-gray-500/5 text-gray-500', hideForParams: false }
            ].filter(item => !item.roles || item.roles.includes(user?.role)).map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                   setActiveModal(item.id as any);
                }} 
                className="bg-white dark:bg-bg-primary p-3 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-800 shadow-sm active:scale-[0.98] transition-all group hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border border-white/5 ${item.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-text-main text-sm">{item.title}</p>
                    <p className="text-[11px] text-text-muted font-medium mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-text-muted group-hover:text-primary transition-colors">
                  <ChevronRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Verification Button - Visible if not verified */}
        {!user?.emailVerified && (
          <section className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full items-center justify-center text-center" id="email-verification-section">
             <button 
               onClick={handleSendVerificationCode}
               disabled={isSendingCode}
               className="w-full h-16 bg-white dark:bg-bg-primary border-2 border-primary/20 rounded-[28px] shadow-soft flex items-center justify-center gap-3 text-primary font-black active:scale-95 transition-all hover:bg-primary/5 group mx-auto disabled:opacity-50 cursor-pointer"
               id="profile-email-verify-trigger"
             >
               {isSendingCode ? (
                 <Loader2 size={22} className="animate-spin text-primary" />
               ) : (
                 <Shield size={22} className="text-primary group-hover:scale-110 transition-transform" />
               )}
               <span className="text-center font-bold">Verificar mi correo</span>
             </button>
             <div className="flex flex-col items-center justify-center gap-1 w-full text-center">
               <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest text-center w-full">
                 Te enviaremos un código a:
               </p>
               <p className="text-xs font-black text-black dark:text-white text-center w-full select-all">
                 {user?.email}
               </p>
               <span className="text-[9px] font-medium text-text-muted/80 max-w-xs mt-1 block">
                 El código llegará directamente a tu bandeja de entrada común.
               </span>
             </div>
          </section>
        )}



        {/* Logout */}
        <button 
          onClick={onSignOut}
          className="flex items-center justify-center gap-2 text-alert font-bold text-sm h-12 w-full bg-bg-primary rounded-2xl shadow-sm hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-all border border-red-100 dark:border-red-900/30 active:scale-95"
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </main>

      {/* Settings Modal (Bottom Sheet) */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setActiveModal(null); setShowDeleteConfirm(false); }}
              className="fixed inset-0 z-[1040] bg-primary/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setActiveModal(null);
                  setShowDeleteConfirm(false);
                }
              }}
              className="fixed bottom-0 left-0 right-0 z-[1050] max-w-lg mx-auto bg-bg-secondary rounded-t-[32px] sm:rounded-t-[48px] shadow-premium px-6 sm:px-8 pb-12 flex flex-col max-h-[calc(100vh-32px)] h-auto overflow-y-auto no-scrollbar"
            >
              {/* Drag Handle Container with large touch target */}
              <div 
                className="w-full pt-4 pb-4 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
              >
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between mb-6 shrink-0">
                <h2 className="font-bold text-xl text-text-main dark:text-white font-manrope tracking-tight leading-none">{(MODAL_CONTENT as any)[activeModal].title}</h2>
                <button onClick={() => { setActiveModal(null); setShowDeleteConfirm(false); }} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted hover:text-text-main transition-all shrink-0">
                  <X size={16} />
                </button>
              </div>

              <div className="overflow-y-auto overflow-x-hidden flex-1 pb-4 no-scrollbar -mx-6 px-6 sm:-mx-8 sm:px-8 flex flex-col">
                {(MODAL_CONTENT as any)[activeModal].content}
              </div>

              {activeModal !== 'privacy' && activeModal !== 'rating' && activeModal !== 'earnings' && activeModal !== 'points' && activeModal !== 'support' && activeModal !== 'referrals' && activeModal !== 'wallet' && (
                <button 
                  onClick={async () => {
                    if (activeModal === 'info') {
                      const profileUpdates: any = {
                        displayName: editName,
                        phoneNumber: editPhone,
                        bio: editBio,
                      };
                      
                      if (localPhoto) {
                        profileUpdates.photoURL = localPhoto;
                      }

                      if (user?.role === 'professional') {
                        profileUpdates.experienceYears = parseInt(editExperienceYears, 10) || 0;
                        const parsePrice = parseInt(editBasePrice.replace(/\D/g, ''), 10);
                        if (!isNaN(parsePrice)) {
                          profileUpdates.basePrice = parsePrice;
                          profileUpdates.price = `$${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(parsePrice)}`;
                        } else {
                          profileUpdates.basePrice = null;
                          profileUpdates.price = 'Precio a convenir';
                        }
                        profileUpdates.credentials = editCredentials.split('\n').map(c => c.trim()).filter(Boolean);
                        profileUpdates.antecedentes_url = antecedentesUrl || '';
                        profileUpdates.antecedentes_ok = !!antecedentesUrl;
                        profileUpdates.tax_status = taxStatus;
                      }

                      await updateProfile(profileUpdates);
                      showToast('Cambios guardados');
                      setActiveModal(null);
                    } else if (activeModal === 'professions') {
                      const profileUpdates: any = {};
                      if (user?.role === 'professional') {
                        profileUpdates.professions = selectedProfessions;
                        profileUpdates.professionCredentials = professionCredentials;
                      }
                      await updateProfile(profileUpdates);
                      showToast('Cambios guardados');
                      setActiveModal(null);
                    } else if (activeModal === 'prefs') {
                      showToast('Preferencias guardadas');
                      setActiveModal(null);
                    } else if (activeModal === 'premium') {
                      const isPremium = user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active';
                      if (isPremium) {
                        if (user?.premium_status === 'cancelling') {
                          showToast('Suscripción ya está cancelada o pendiente de baja.');
                          setActiveModal(null);
                        } else {
                          await handleCancelSubscription();
                          setActiveModal(null);
                        }
                      } else if (user?.premium_status === 'pending') {
                        setActiveModal(null);
                      } else {
                        if (!premiumReceipt) {
                          showToast('Por favor, adjunta una foto o imagen del comprobante de transferencia.');
                          return;
                        }
                        try {
                          await updateProfile({ premium_status: 'pending', payment_proof_url: premiumReceipt });
                          showToast('¡Comprobante enviado con éxito! En breve activaremos tu cuenta.');
                          setPremiumReceipt(null);
                          setActiveModal(null);
                        } catch (err) {
                          console.error(err);
                          showToast('Ocurrió un error al cargar el comprobante.');
                        }
                      }
                    }
                  }}
                  className="w-full sm:w-[calc(100%-32px)] mx-auto mt-6 bg-primary text-white rounded-[24px] h-[56px] font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform text-base shrink-0"
                >
                  {activeModal === 'premium' ? (
                    user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active' ? 'Quitar Suscripción Premium' : (
                      user?.premium_status === 'pending' ? 'Cerrar' : 'Enviar Comprobante de Pago'
                    )
                  ) : 'Guardar Cambios'}
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Support Chat Fullscreen Overlays */}
      <AnimatePresence>
        {showSupportChat && (
          <SupportChat onClose={() => setShowSupportChat(false)} predefinedTopic={supportChatTopic} />
        )}
      </AnimatePresence>

      {/* Dispute Mediation Fullscreen Overlays */}
      <AnimatePresence>
        {showDispute && (
          <DisputeMediation onClose={() => setShowDispute(false)} />
        )}
      </AnimatePresence>

      {/* Wallet Deposit Recharge Modal */}
      <AnimatePresence>
        {showRechargeModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { if (!isRecharging) setShowRechargeModal(false); }}
              className="fixed inset-0 z-[1050] bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(event, info) => {
                if (!isRecharging && (info.offset.y > 100 || info.velocity.y > 500)) {
                  setShowRechargeModal(false);
                }
              }}
              className="fixed bottom-0 left-0 right-0 z-[1060] max-w-lg mx-auto bg-white dark:bg-bg-secondary rounded-t-[32px] sm:rounded-t-[48px] shadow-premium px-6 sm:px-8 pb-24 flex flex-col h-[calc(100vh-32px)] overflow-y-auto no-scrollbar"
            >
              {/* Drag Handle Container with large touch target */}
              <div 
                className="w-full pt-1 pb-4 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
              >
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400 font-manrope">Cargar Saldo</h3>
                <button disabled={isRecharging} onClick={() => setShowRechargeModal(false)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted hover:text-text-main transition-all">
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {/* Predeclared amounts buttons */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 mb-2 block">
                    Selecciona un monto a cargar
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['2500', '5000', '10000', '20000', '30000', '50000'].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setRechargeAmount(amt)}
                        className={`py-3.5 rounded-2xl text-sm font-black border transition-all ${
                          rechargeAmount === amt 
                            ? 'bg-indigo-500 border-indigo-500 text-white shadow-soft font-black' 
                            : 'bg-gray-50 dark:bg-gray-805 border-gray-100 dark:border-white/5 text-text-main hover:border-indigo-400'
                        }`}
                      >
                        ${parseInt(amt).toLocaleString('es-AR')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom active input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">
                    U otro monto personalizado
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-extrabold text-lg">$</span>
                    <input
                      type="number"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      placeholder="Monto personalizado"
                      className="w-full h-14 pl-8 pr-4 bg-gray-50 dark:bg-gray-805 rounded-2xl border border-transparent outline-none focus:border-indigo-500 text-text-main font-semibold text-base transition-all"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 mb-2 block">
                    Método de Pago
                  </label>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        paymentMethod === 'transfer'
                          ? 'border-indigo-500 bg-indigo-500/5'
                          : 'border-transparent bg-gray-50 dark:bg-gray-805'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                        <Upload size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-extrabold text-xs text-text-main">Transferencia Bancaria</p>
                        <p className="text-[10px] text-text-muted">Aprobación por administración (Alias)</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Transfer Info and Upload */}
                {paymentMethod === 'transfer' && (
                  <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-950 rounded-3xl flex flex-col gap-4">
                    <div>
                      <p className="text-[10px] font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">Alias de Referencia Banco/Lemon</p>
                      <div className="flex items-center justify-between mt-2 bg-white dark:bg-zinc-850 p-3 rounded-2xl border border-gray-150 dark:border-white/5">
                        <span className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400 select-all tracking-wide">diego.reartes.lemon</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('diego.reartes.lemon');
                            showToast('Alias copiado al portapapeles');
                          }}
                          className="flex items-center gap-1.5 p-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 text-xs font-bold rounded-xl transition-all"
                        >
                          <Copy size={13} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Comprobante de Transferencia (Obligatorio)</p>
                      
                      {transferProof ? (
                        <div className="bg-white dark:bg-zinc-800/40 p-3 rounded-2xl border border-emerald-500/20 flex flex-col items-center gap-2">
                          <img src={transferProof} alt="Receipt preview" className="h-32 object-contain rounded-xl" />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => transferFileInputRef.current?.click()}
                              className="text-[10px] text-indigo-500 font-bold hover:underline"
                            >
                              Cambiar captura
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              type="button"
                              onClick={() => setTransferProof(null)}
                              className="text-[10px] text-red-500 font-bold hover:underline"
                            >
                              Quitar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={isUploadingProof}
                          onClick={() => transferFileInputRef.current?.click()}
                          className="w-full py-4 border-2 border-dashed border-indigo-200 dark:border-indigo-900 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl font-bold text-xs text-indigo-600 dark:text-indigo-400 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          {isUploadingProof ? (
                            <>
                              <Loader2 size={18} className="animate-spin text-indigo-500" />
                              <span>Procesando comprobante...</span>
                            </>
                          ) : (
                            <>
                              <Upload size={18} className="text-indigo-500 animate-bounce" />
                              <span>Adjuntar Comprobante</span>
                              <span className="text-[9px] font-medium text-gray-400 normal-case">Subir captura en formato JPG, PNG</span>
                            </>
                          )}
                        </button>
                      )}
                      
                      <input
                        type="file"
                        accept="image/*"
                        ref={transferFileInputRef}
                        onChange={handleTransferProofUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}

                {/* Submitting buttons */}
                <button
                  type="button"
                  disabled={isRecharging || !rechargeAmount || parseFloat(rechargeAmount) <= 0}
                  onClick={handleRecharge}
                  className="w-full h-14 mt-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all w-full"
                >
                  {isRecharging ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Procesando Carga...
                    </>
                  ) : (
                    <>
                      Confirmar Carga de ${parseFloat(rechargeAmount || '0').toLocaleString('es-AR')}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Two-Factor Authentication Management Overlay */}
      <AnimatePresence>
        {showTwoFactorModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { if (!isActivating2FA) setShowTwoFactorModal(false); }}
              className="fixed inset-0 z-[1050] bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(event, info) => {
                if (!isActivating2FA && (info.offset.y > 100 || info.velocity.y > 500)) {
                  setShowTwoFactorModal(false);
                }
              }}
              className="fixed bottom-0 left-0 right-0 z-[1060] max-w-lg mx-auto bg-white dark:bg-bg-secondary rounded-t-[32px] sm:rounded-t-[48px] shadow-premium px-6 sm:px-8 pb-24 flex flex-col h-[calc(100vh-32px)] overflow-y-auto no-scrollbar animate-in duration-300"
            >
              {/* Drag Handle Container with large touch target */}
              <div 
                className="w-full pt-1 pb-4 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
              >
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-manrope">Autenticación de 2 Factores</h3>
                <button disabled={isActivating2FA} onClick={() => setShowTwoFactorModal(false)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted hover:text-text-main transition-all">
                  <X size={16} />
                </button>
              </div>

              {twoFactorSetupStep === 1 && (
                <div className="flex flex-col gap-6 font-sans">
                  <div className="p-4 bg-orange-55/10 border border-orange-500/10 rounded-2xl flex gap-3">
                    <Shield size={20} className="text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-xs text-text-main">Protege tu cuenta con factor doble</p>
                      <p className="text-[11px] text-text-muted mt-1 leading-relaxed">Cada vez que inicies sesión en un nuevo dispositivo, se solicitará un código temporario para validar que realmente eres tú.</p>
                    </div>
                  </div>

                  {user?.twoFactorEnabled ? (
                    <div className="flex flex-col gap-5">
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex gap-3 items-center">
                        <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                        <div>
                          <p className="font-extrabold text-xs text-emerald-700 dark:text-emerald-400">Doble Factor Activado</p>
                          <p className="text-[11px] text-text-muted">Tu cuenta está resguardada por código QR.</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleDisable2FA}
                        className="w-full h-12 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-extrabold rounded-xl text-xs flex justify-center items-center gap-2 border border-red-500/10 transition-all cursor-pointer"
                      >
                        Desactivar Doble Factor
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      <div>
                        <h4 className="text-xs font-black text-text-muted uppercase tracking-wider mb-3">Paso 1: Configura tu aplicación</h4>
                        <p className="text-xs text-text-muted leading-relaxed mb-4">
                          Escanea el siguiente código QR con tu aplicación preferida (Google Authenticator, Authy, etc.):
                        </p>
                        
                        {/* Dynamic SVG QR simulator mockup */}
                        <div className="bg-white p-4 rounded-3xl w-44 h-44 border border-gray-100 dark:border-gray-800 flex items-center justify-center mx-auto shadow-sm">
                          <svg className="w-full h-full text-black" viewBox="0 0 100 100">
                            <rect x="5" y="5" width="20" height="20" fill="currentColor" />
                            <rect x="10" y="10" width="10" height="10" fill="white" />
                            <rect x="75" y="5" width="20" height="20" fill="currentColor" />
                            <rect x="80" y="10" width="10" height="10" fill="white" />
                            <rect x="5" y="75" width="20" height="20" fill="currentColor" />
                            <rect x="10" y="80" width="10" height="10" fill="white" />
                            
                            <rect x="35" y="15" width="10" height="15" fill="currentColor" />
                            <rect x="55" y="5" width="15" height="10" fill="currentColor" />
                            <rect x="50" y="25" width="10" height="15" fill="currentColor" />
                            <rect x="15" y="45" width="30" height="10" fill="currentColor" />
                            <rect x="30" y="60" width="15" height="15" fill="currentColor" />
                            <rect x="75" y="45" width="15" height="25" fill="currentColor" />
                            <rect x="55" y="65" width="15" height="10" fill="currentColor" />
                            <rect x="10" y="55" width="10" height="10" fill="currentColor" />
                            <rect x="35" y="35" width="10" height="5" fill="currentColor" />
                            <rect x="70" y="35" width="5" height="15" fill="currentColor" />
                          </svg>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-805 p-3 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-white/5 mx-auto w-full max-w-sm">
                        <div className="truncate">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Clave manual secreta</p>
                          <p className="font-mono font-black text-xs text-text-main truncate">SP-PRO-2FA-REARTES-LEMON</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('SP-PRO-2FA-REARTES-LEMON');
                            showToast('¡Copied code to clipboard!');
                          }}
                          className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-[10px] font-extrabold uppercase shrink-0 transition-colors"
                        >
                          Copiar clave
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setTwoFactorSetupStep(2)}
                        className="w-full h-14 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                      >
                        Continuar a Verificación
                      </button>
                    </div>
                  )}
                </div>
              )}

              {twoFactorSetupStep === 2 && (
                <div className="flex flex-col gap-6 font-sans">
                  <div>
                    <h4 className="text-sm font-black text-text-main mb-2">Paso 2: Confirma el código temporario</h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Escribe el código de seguridad de 6 dígitos que se genera en tu aplicación Authenticator para verificar la vinculación:
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">
                      Código de Autenticación
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Ej: 123456"
                      className="w-full h-14 px-4 text-center tracking-[0.4em] font-mono font-black text-xl bg-gray-50 dark:bg-gray-850 rounded-2xl border border-transparent outline-none focus:border-emerald-500 text-text-main placeholder:tracking-normal placeholder:font-sans transition-all"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setTwoFactorSetupStep(1)}
                      className="flex-1 h-14 bg-gray-50 dark:bg-gray-805 text-text-muted rounded-2xl font-black text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      disabled={isActivating2FA || twoFactorCode.length !== 6}
                      onClick={handleEnable2FA}
                      className="flex-[2] h-14 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                    >
                      {isActivating2FA ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Validando...
                        </>
                      ) : (
                        'Validar y Activar 2FA'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {twoFactorSetupStep === 3 && (
                <div className="flex flex-col gap-6 py-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle size={36} />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-manrope">¡Doble Factor Activo!</h4>
                    <p className="text-xs text-text-muted leading-relaxed mt-2 px-4">
                      La seguridad extra en dos pasos de tu cuenta se ha configurado de manera correcta. Tu perfil ahora tiene un resguardo de clase premium.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowTwoFactorModal(false)}
                    className="w-full h-14 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    Entendido, Finalizar
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Support Chat Fullscreen Overlays */}
      <AnimatePresence>
        {showSupportChat && (
          <SupportChat onClose={() => setShowSupportChat(false)} predefinedTopic={supportChatTopic} />
        )}
      </AnimatePresence>

      {/* Email Verification Modal */}
      <AnimatePresence>
        {showEmailVerifyModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => { if (!isVerifyingCode) setShowEmailVerifyModal(false); }}
              className="fixed inset-0 z-[1050] bg-black/60 backdrop-blur-sm"
              id="email-verify-backdrop"
            />
            <motion.div 
              initial={{ y: '100%', opacity: 0, scale: 0.95 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }} 
              exit={{ y: '100%', opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[1060] max-w-md w-full mx-auto bg-white dark:bg-bg-primary rounded-t-[40px] sm:rounded-[32px] shadow-premium p-8 flex flex-col animate-in fade-in zoom-in-95 duration-200"
              id="email-verify-panel"
            >
              <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Shield size={18} />
                  </div>
                  <h3 className="text-xl font-extrabold text-text-main font-manrope">Verificar Correo</h3>
                </div>
                <button 
                  disabled={isVerifyingCode} 
                  onClick={() => setShowEmailVerifyModal(false)} 
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted hover:text-text-main transition-all cursor-pointer border-none outline-none"
                  id="email-verify-close-btn"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-5 text-center py-2">
                <p className="text-sm text-text-muted leading-relaxed">
                  Hemos enviado un código de seguridad de 6 dígitos a <br />
                  <strong className="text-text-main font-black select-all">{user?.email}</strong>. <br />
                  Por favor ingrésalo a continuación para activar tu cuenta.
                </p>

                {/* Form Input Container */}
                <div className="flex flex-col gap-2 mt-4">
                  <input
                    type="text"
                    maxLength={6}
                    value={typedVerificationCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setTypedVerificationCode(val);
                    }}
                    placeholder="123456"
                    className="w-full text-center h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 text-3xl font-black font-mono tracking-[10px] border border-gray-100 dark:border-gray-800 text-primary outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all uppercase placeholder:opacity-20 placeholder:tracking-normal"
                    disabled={isVerifyingCode}
                    id="email-verify-input"
                  />
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest block">
                    Código de Seguridad
                  </span>
                </div>

                {verifyError && (
                  <p className="text-xs font-bold text-alert bg-alert/5 py-3 px-4 rounded-xl border border-alert/10">
                    {verifyError}
                  </p>
                )}

                {/* Submit buttons */}
                <div className="flex flex-col gap-3 mt-4">
                  <button
                    type="button"
                    disabled={isVerifyingCode || typedVerificationCode.length !== 6}
                    onClick={handleVerifyCode}
                    className="w-full h-14 bg-primary text-white rounded-2xl font-black text-sm hover:opacity-90 disabled:opacity-50 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer border-none outline-none"
                    id="email-verify-submit-btn"
                  >
                    {isVerifyingCode ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      'Confirmar Código'
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isSendingCode}
                    onClick={handleSendVerificationCode}
                    className="text-xs font-black text-primary hover:underline uppercase tracking-wider py-2 flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 border-none bg-transparent outline-none"
                    id="email-verify-resend-btn"
                  >
                    {isSendingCode ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : null}
                    Reenviar Código
                  </button>
                </div>

                {/* Fallback Developer Notification */}
                {devFallbackCode && (
                  <div className="mt-4 p-4 bg-amber-500/10 dark:bg-amber-500/5 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-2xl text-left flex gap-3 text-xs">
                    <span className="text-lg">💡</span>
                    <div>
                      <h5 className="font-bold">Modo de Testeo Offline</h5>
                      <p className="mt-1 leading-relaxed opacity-90">
                        Como no has configurado un servidor SMTP en tus datos, el código generado es: <strong className="font-black text-sm select-all bg-amber-500/20 px-1.5 py-0.5 rounded ml-1 font-mono">{devFallbackCode}</strong>. Cópialo para verificar la cuenta. En producción, le llegará en la bandeja de entrada real.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
