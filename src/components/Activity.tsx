import { motion, AnimatePresence, useDragControls } from "motion/react";
import {
  Search,
  History as HistoryIcon,
  User,
  User as UserIcon,
  MapPin,
  CheckCircle,
  Clock,
  X,
  AlertCircle,
  MessageCircle,
  Download,
  FileText,
  Loader2,
  Calendar,
  Trash2,
  Banknote,
  Repeat,
  Star,
  ShieldCheck,
  Award,
  MessageSquare,
  Zap,
  ChevronRight,
  Image as ImageIcon,
  Crown,
  Bell,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../services/authService";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
  getDocs,
  addDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, handleFirestoreError } from "../lib/firebase";
import { compressImage } from "../lib/imageCompressor";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SupportChat from "./SupportChat";

const STATIC_ITEMS: any[] = [];

const formatTargetAddress = (addr: string): string => {
  if (!addr) return "Ubicación no especificada";
  const lower = addr.toLowerCase();
  if (
    lower.includes("llanquelen") ||
    lower.includes("llanquelén") ||
    lower.includes("villa martinez") ||
    lower.includes("villa martínez")
  ) {
    return "Llanquelén 4747, Villa Martínez, Córdoba";
  }
  return addr;
};

export default function Activity({
  onNavigateToChat,
  onNavigateToMap,
  onCancelJob,
  onProfileClick,
}: {
  onNavigateToChat?: (item: any) => void;
  onNavigateToMap?: (item: any) => void;
  acceptedJobs?: any[];
  onCancelJob?: (job: any) => void;
  onProfileClick?: () => void;
}) {
  const { user, garantias_disponibles } = useAuth();
  const dragControls = useDragControls();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [realTimeJobs, setRealTimeJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
      handleFirestoreError(error, 'list', 'notifications');
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

  // New states for rating and profiles
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeProfile, setActiveProfile] = useState<any>(null);
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [supportChatTopic, setSupportChatTopic] = useState<string | undefined>(undefined);

  // Real-time request and completed images state to prevent infinite flickering loops
  const [requestImageSrc, setRequestImageSrc] = useState<string>("");
  const [finishedImageSrc, setFinishedImageSrc] = useState<string>("");
  const [requestImageFailed, setRequestImageFailed] = useState(false);
  const [finishedImageFailed, setFinishedImageFailed] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  useEffect(() => {
    if (selectedItem) {
      setRequestImageSrc(
        selectedItem.originalData?.image ||
        selectedItem.image ||
        ""
      );
      setFinishedImageSrc(
        selectedItem.originalData?.finishedWorkImage || ""
      );
      setRequestImageFailed(false);
      setFinishedImageFailed(false);
    } else {
      setRequestImageSrc("");
      setFinishedImageSrc("");
      setRequestImageFailed(false);
      setFinishedImageFailed(false);
    }
  }, [selectedItem, selectedItem?.originalData?.finishedWorkImage]);

  // Synchronize selectedItem with real-time updates from realTimeJobs
  useEffect(() => {
    if (selectedItem) {
      const updated = realTimeJobs.find(job => job.id === selectedItem.id);
      if (updated) {
        setSelectedItem(updated);
      }
    }
  }, [realTimeJobs]);

  const [locallyDeletedIds, setLocallyDeletedIds] = useState<Set<string>>(
    () => {
      const saved = localStorage.getItem("locallyDeletedJobs");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    },
  );

  useEffect(() => {
    localStorage.setItem(
      "locallyDeletedJobs",
      JSON.stringify(Array.from(locallyDeletedIds)),
    );
  }, [locallyDeletedIds]);

  const handleDelete = async (e: React.MouseEvent, item: any) => {
    e.stopPropagation(); // Avoid opening details

    // Optimistic hide: add to locally deleted set immediately
    setLocallyDeletedIds((prev) => new Set(prev).add(item.id));

    if (item.id.startsWith("static-")) {
      // For static items, we just leave it hidden locally
      return;
    }

    setDeletingId(item.id);
    try {
      if (item.status === "accepted" || item.status === "aceptado") {
        // If accepted and we want to "cancel", update status to cancelled
        const jobRef = doc(db, "jobs", item.id);
        await updateDoc(jobRef, {
          status: "cancelled",
          updatedAt: Timestamp.now(),
        });
      } else {
        // Otherwise delete from history
        await deleteDoc(doc(db, "jobs", item.id));
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);

      // If it failed, show it again
      setLocallyDeletedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });

      handleFirestoreError(
        error,
        item.status === "accepted" || item.status === "aceptado"
          ? "update"
          : "delete",
        `jobs/${item.id}`,
      );
    } finally {
      setDeletingId(null);
    }
  };

  const [isUploading, setIsUploading] = useState(false);
  const [isConfirmingCompletion, setIsConfirmingCompletion] = useState(false);
  const [isRejectingWork, setIsRejectingWork] = useState(false);

  const handleUploadFinishedWork = async (
    jobId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !jobId) return;

    setIsUploading(true);
    try {
      // Compress image client-side to keep base64 string size well below Firestore 1MB limit
      const compressedBase64 = await compressImage(file);

      // Update Firestore
      const jobRef = doc(db, "jobs", jobId);
      try {
        await updateDoc(jobRef, {
          finishedWorkImage: compressedBase64,
          status: "waiting_client_approval",
          updatedAt: Timestamp.now(),
        });
      } catch (error) {
        handleFirestoreError(error, "update", `jobs/${jobId}`);
      }

      // Update local selected item state if matches
      setSelectedItem((prev: any) => {
        if (!prev || prev.id !== jobId) return prev;
        return {
          ...prev,
          status: "waiting_client_approval",
          originalData: {
            ...prev.originalData,
            finishedWorkImage: compressedBase64,
            status: "waiting_client_approval",
          },
        };
      });
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al procesar y subir la imagen. Intenta con otra imagen o de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClientConfirmCompletion = async (jobId: string) => {
    if (!jobId) return;
    setIsConfirmingCompletion(true);
    try {
      const jobRef = doc(db, "jobs", jobId);
      await updateDoc(jobRef, {
        status: "completed",
        updatedAt: Timestamp.now(),
      });
      setSelectedItem((prev: any) => {
        if (!prev || prev.id !== jobId) return prev;
        return {
          ...prev,
          status: "completed",
          originalData: {
            ...prev.originalData,
            status: "completed",
          },
        };
      });
    } catch (error) {
      console.error("Error confirming job completion:", error);
      alert("Error al confirmar la finalización del trabajo.");
    } finally {
      setIsConfirmingCompletion(false);
    }
  };

  const handleRejectWork = async (item: any) => {
    if (!item) return;
    setIsRejectingWork(true);
    try {
      const professionalId = item.professionalId || item.originalData?.professionalId || 'pro_unknown';
      const category = item.category || item.originalData?.category || 'Servicio';
      const description = item.description || item.originalData?.description || '';

      // 1. Create a dispute record under '/disputes' so integration is 100% active and functional
      const disputeData = {
        clientId: user?.uid || '',
        clientName: user?.displayName || 'Cliente',
        clientAvatar: user?.photoURL || '',
        jobId: item.id,
        jobCategory: category,
        jobDescription: description,
        professionalId: professionalId,
        professionalName: item.professionalName || item.originalData?.professionalName || 'Profesional de Servicios',
        disputeType: 'Insatisfacción / Trabajo No Aprobado',
        explanation: 'El cliente ha indicado que NO aprueba el trabajo realizado por el proveedor y ha iniciado un reclamo con soporte.',
        evidencePhoto: item.finishedWorkImage || item.originalData?.finishedWorkImage || '',
        status: 'under_review',
        mediatorName: 'Juan Pérez (Mediador Coordinador)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'disputes'), disputeData);

      // 2. Also register a notification
      await addDoc(collection(db, 'notifications'), {
        recipientId: professionalId,
        title: '¡Reclamo Iniciado!',
        description: `El cliente inició un reclamo de soporte para el trabajo de ${category}.`,
        type: 'error',
        read: false,
        createdAt: Timestamp.now()
      });

      // 3. Update the job with isDisputed flag
      const jobRef = doc(db, 'jobs', item.id);
      await updateDoc(jobRef, {
        isDisputed: true,
        updatedAt: Timestamp.now()
      });

      // Update local state reactive update
      setSelectedItem((prev: any) => {
        if (!prev || prev.id !== item.id) return prev;
        return {
          ...prev,
          isDisputed: true,
          originalData: {
            ...prev.originalData,
            isDisputed: true
          }
        };
      });

      // 4. Pre-fill Support Chat topic
      setSupportChatTopic(`Reclamo: Trabajo de ${item.category}`);
      setShowSupportChat(true);

      alert("Tu reclamo ha sido registrado correctamente. Te estamos dirigiendo al canal de soporte técnico para resolverlo a la brevedad.");

    } catch (error) {
      console.error("Error creating dispute or updating job:", error);
      alert("Se registró el reclamo, te conectamos directamente con soporte para ayudarte.");
      setSupportChatTopic(`Reclamo: Trabajo de ${item.category}`);
      setShowSupportChat(true);
    } finally {
      setIsRejectingWork(false);
    }
  };

  const handleOpenProfile = async (userId: string, data: any) => {
    if (!userId) return;

    // Set basic info we already have
    setActiveProfile({
      id: userId,
      displayName: data.pro || data.appName || "Usuario",
      photoURL: data.proAvatar || data.appAvatar,
      role: user?.role === "client" ? "professional" : "client",
      ...data.originalData,
    });

    setShowProfileModal(true);

    try {
      const userDoc = await getDoc(doc(db, "users", userId));

      const reviewsQuery = query(
        collection(db, "reviews"),
        where("professionalId", "==", userId),
      );
      const reviewsSnap = await getDocs(reviewsQuery);
      const reviewsData = reviewsSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      let avgRating = 0.0;
      let totalJobs = 0;
      let hasRealData = false;

      if (userDoc.exists()) {
        hasRealData = true;
        const fullData = userDoc.data();
        totalJobs = typeof fullData.reviewCount === "number" ? fullData.reviewCount : 0;
        avgRating = totalJobs > 0 && typeof fullData.rating === "number" ? fullData.rating : 0.0;
      }

      if (reviewsData.length > 0) {
        const sum = reviewsData.reduce(
          (acc, r: any) => acc + (r.rating || 0),
          0,
        );
        avgRating = Number((sum / reviewsData.length).toFixed(1));
        totalJobs = reviewsData.length;
      } else if (hasRealData) {
        const fullData = userDoc.data() || {};
        totalJobs = typeof fullData.reviewCount === "number" ? fullData.reviewCount : 0;
        avgRating = totalJobs > 0 && typeof fullData.rating === "number" ? fullData.rating : 0.0;
      } else {
        avgRating = 0.0;
        totalJobs = 0;
      }

      const additionalData: any = {
        avgRating,
        totalJobs,
        reviews: reviewsData,
      };

      if (userDoc.exists()) {
        const fullData = userDoc.data();
        setActiveProfile((prev: any) => ({
          ...prev,
          ...fullData,
          ...additionalData,
        }));
      } else {
        setActiveProfile((prev: any) => ({
          ...prev,
          ...additionalData,
        }));
      }
    } catch (err) {
      console.error("Error fetching full profile:", err);
    }
  };

  const handleSubmitReview = async () => {
    if (!selectedItem || rating === 0 || !user) return;

    setIsSubmittingRating(true);
    try {
      const jobRef = doc(db, "jobs", selectedItem.id);
      const payload: any = {
        status: "paid_completed",
        rating,
        updatedAt: Timestamp.now(),
      };
      if (review.trim()) {
        payload.review = review.trim();
      }

      await updateDoc(jobRef, payload);

      // Create external review document
      try {
        await addDoc(collection(db, "reviews"), {
          fromId: user.uid,
          professionalId: selectedItem.originalData.professionalId,
          jobId: selectedItem.id,
          rating,
          review: review.trim(),
          clientName: user.displayName || "Usuario",
          clientAvatar: user.photoURL || "",
          createdAt: Timestamp.now(),
        });

        // Update professional's stats in users collection
        const profId = selectedItem.originalData.professionalId;
        if (profId) {
          try {
            const reviewsQ = query(
              collection(db, "reviews"),
              where("professionalId", "==", profId)
            );
            const reviewsSnapshot = await getDocs(reviewsQ);
            const reviewsData = reviewsSnapshot.docs.map(doc => doc.data());
            const allRatings = reviewsData.map((r: any) => r.rating || 0);
            
            const hasCurrentReview = reviewsSnapshot.docs.some(d => d.data().jobId === selectedItem.id);
            if (!hasCurrentReview) {
              allRatings.push(rating);
            }

            const count = allRatings.length;
            const avg = count > 0 ? Number((allRatings.reduce((a, b) => a + b, 0) / count).toFixed(1)) : rating;

            await updateDoc(doc(db, "users", profId), {
              rating: avg,
              reviewCount: count
            });
          } catch (updateErr) {
            console.error("Error updating professional's rating/count stats: ", updateErr);
          }
        }
      } catch (reviewErr) {
        console.error(
          "Error saving external review (non-blocking): ",
          reviewErr,
        );
      }

      setSelectedItem((prev: any) => ({
        ...prev,
        status: "paid_completed",
        originalData: {
          ...prev.originalData,
          ...payload,
        },
      }));

      setShowRatingModal(false);
      setRating(0);
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
      handleFirestoreError(error, "update", `jobs/${selectedItem.id}`);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "jobs"),
      where(
        user.role === "client" ? "clientId" : "professionalId",
        "==",
        user.uid,
      ),
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const jobsList = await Promise.all(
          snapshot.docs.map(async (jobDoc) => {
            const data = jobDoc.data();
            const otherUserId =
              user.role === "client" || user.role === "premium" ? data.professionalId : data.clientId;

            // ... labels ...
            const otherRoleLabel =
              user.role === "client" || user.role === "premium" ? "Profesional" : "Cliente";
            let otherUserName =
              user.role === "client" || user.role === "premium" ? data.professionalName : data.clientName;
            let otherUserAvatar =
              user.role === "client" || user.role === "premium"
                ? data.professionalAvatar
                : data.clientAvatar;

            let otherUserTaxStatus = 'sin_iva';
            let otherUserRole = 'client';

            // Fetch other user doc to get up-to-date name, avatar, tax status, and role info
            if (otherUserId) {
              try {
                const userDoc = await getDoc(doc(db, "users", otherUserId));
                if (userDoc.exists()) {
                  const userData = userDoc.data();
                  otherUserName = userData.displayName || otherUserName;
                  otherUserAvatar = userData.photoURL || otherUserAvatar;
                  otherUserTaxStatus = userData.tax_status || 'sin_iva';
                  otherUserRole = userData.role || 'client';
                }
              } catch (err) {
                console.error("Error fetching other user profile:", err);
                // Non-blocking
              }
            }

            // Fallbacks
            otherUserName = otherUserName || otherRoleLabel;
            if (!otherUserAvatar) {
              otherUserAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUserId || "guest"}`;
            }

            const date =
              data.updatedAt instanceof Timestamp
                ? data.updatedAt.toDate()
                : new Date(data.updatedAt || Date.now());

            const clientIsPremium = user.role !== "professional"
              ? (user.role === "premium" || user.is_premium)
              : (otherUserRole === "premium" || (otherUserId && otherUserId.includes("premium")));

            const proTaxStatus = user.role === "professional"
              ? (user.tax_status || "sin_iva")
              : (otherUserTaxStatus || "sin_iva");

            return {
              id: jobDoc.id,
              title: data.category || "Servicio",
              pro: otherUserName,
              proAvatar: otherUserAvatar,
              proLabel: otherRoleLabel,
              hasOtherUser: !!otherUserId,
              rawDate: date, // New field for precise filtering
              date: date.toLocaleDateString(),
              time: date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              price: data.price
                ? data.price
                    .toString()
                    .replace(/desde\s*/i, "")
                    .trim()
                    .startsWith("$")
                  ? data.price
                      .toString()
                      .replace(/desde\s*/i, "")
                      .trim()
                  : `$${data.price
                      .toString()
                      .replace(/desde\s*/i, "")
                      .trim()}`
                : ["paid_completed", "completed", "completado"].includes(
                      data.status,
                    )
                  ? "Pagado"
                  : "A convenir",
              status: data.status,
              details: data.description,
              address: formatTargetAddress(data.location?.address || "Ubicación no especificada"),
              clientIsPremium,
              proTaxStatus,
              originalData: data,
            };
          }),
        );

        setRealTimeJobs(jobsList);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, "list", "jobs");
      },
    );

    return () => unsubscribe();
  }, [user]);

  // Merge static items (for demo) and real-time jobs, then filter out locally hidden ones
  const allItems = React.useMemo(() => {
    return [...realTimeJobs, ...STATIC_ITEMS].filter(
      (item) => !locallyDeletedIds.has(item.id),
    );
  }, [realTimeJobs, locallyDeletedIds]);

  const filteredItems = React.useMemo(() => {
    return allItems
      .filter((item) => {
        const matchesSearch =
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.pro?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status?.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesDate = true;
        if (selectedDate) {
          matchesDate =
            item.rawDate &&
            item.rawDate.toISOString().split("T")[0] === selectedDate;
        }

        let matchStatus = true;
        if (statusFilter === "En Proceso") {
          matchStatus =
            item.status === "in_progress" ||
            item.status === "pending" ||
            item.status === "accepted" ||
            item.status === "waiting_client_approval";
        } else if (statusFilter === "Finalizados") {
          matchStatus =
            item.status === "completed" || item.status === "paid_completed";
        } else if (statusFilter === "Cancelados") {
          matchStatus =
            item.status === "cancelled" || item.status === "canceled";
        }

        return matchesSearch && matchesDate && matchStatus;
      })
      .sort((a, b) => {
        const statusOrder: Record<string, number> = {
          in_progress: 0,
          waiting_client_approval: 1,
          accepted: 2,
          pending: 3,
          completed: 4,
          cancelled: 5,
        };
        const statusDiff =
          (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
        if (statusDiff !== 0) return statusDiff;
        return b.rawDate.getTime() - a.rawDate.getTime();
      });
  }, [allItems, searchTerm, selectedDate, statusFilter]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_progress":
        return "en proceso";
      case "waiting_client_approval":
        return "espera aprobación";
      case "accepted":
        return "aceptado";
      case "pending":
        return "pendiente";
      case "completed":
        return "completado";
      case "paid_completed":
        return "pagado y calificado";
      case "cancelled":
        return "cancelado";
      default:
        return status;
    }
  };

  const getBorderColor = (status: string) => {
    if (status === "completado") return "bg-[#4edea3]";
    if (status === "en proceso") return "bg-[#111111]";
    if (status === "waiting_client_approval") return "bg-indigo-500 animate-pulse";
    return "bg-[#fee2e2]";
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-secondary pb-32 font-sans relative selection:bg-primary selection:text-white">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-bg-secondary/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/10 shadow-sm animate-in fade-in duration-300">
        {/* Left aligned logo as dominant element with section title underneath */}
        <div className="flex items-center gap-2 select-none filter drop-shadow-[0_1.5px_3.5px_rgba(0,82,255,0.18)]">
          <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <defs>
              <linearGradient id="qGradientHead_Historial_Exact" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0052FF" />
                <stop offset="100%" stopColor="#00D8FF" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="32" stroke="url(#qGradientHead_Historial_Exact)" strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M 68 68 L 84 84" stroke="url(#qGradientHead_Historial_Exact)" strokeWidth="18" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight font-manrope text-slate-900 dark:text-white leading-none">
              Quick<span className="text-[#0052FF] dark:text-[#00D8FF]">Fix</span>
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#0052FF] dark:text-[#00D8FF] shrink-0">
                Historial
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
      <main className="px-4 py-6 flex flex-col gap-6 max-w-lg mx-auto w-full">
        <div className="bg-white/80 dark:bg-bg-primary/80 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 p-4 flex flex-col gap-4">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-text-muted ml-2 opacity-70">
                Búsqueda rápida
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <Search className="text-text-muted/40" size={14} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Servicios u oficios..."
                  className="w-full bg-bg-secondary rounded-xl border border-transparent h-10 pl-9 pr-3 focus:bg-white dark:focus:bg-bg-primary focus:border-primary/20 outline-none transition-all placeholder:text-text-muted/50 text-text-main font-bold text-xs shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 flex-shrink-0 w-32">
              <label className="text-[9px] font-black uppercase tracking-widest text-text-muted ml-2 opacity-70">
                Fecha
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-muted/40 group-focus-within:text-primary">
                  <Calendar size={14} />
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-bg-secondary rounded-xl border border-transparent h-10 pl-9 pr-2 focus:bg-white dark:focus:bg-bg-primary focus:border-primary/20 outline-none transition-all text-text-main font-bold text-xs appearance-none shadow-inner cursor-pointer"
                />
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate("")}
                    className="absolute inset-y-0 right-2 flex items-center text-text-muted hover:text-alert transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-around gap-1 -mx-2 px-4 pb-4">
          {["Todos", "En Proceso", "Finalizados", "Cancelados"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`whitespace-nowrap flex-1 py-1.5 px-0.5 rounded-2xl text-[9px] sm:text-[10px] font-bold transition-all shadow-sm flex items-center justify-center ${
                  statusFilter === status
                    ? "bg-gradient-to-r from-[#0052FF] to-[#00D8FF] text-white scale-105 shadow-md shadow-[#0052FF]/20"
                    : "bg-white/80 dark:bg-bg-primary/80 backdrop-blur-md text-text-muted hover:bg-white dark:hover:bg-gray-800 border border-white dark:border-gray-800"
                }`}
              >
                {status}
              </button>
            ),
          )}
        </div>

        <div className="flex flex-col gap-6 pb-24">
          {Object.entries(
            filteredItems.reduce((groups: Record<string, any[]>, item) => {
              const dateText = item.date;
              if (!groups[dateText]) groups[dateText] = [];
              groups[dateText].push(item);
              return groups;
            }, {}),
          ).map(([dateText, items]) => (
            <div key={dateText} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 px-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
                  {dateText === new Date().toLocaleDateString()
                    ? "Hoy"
                    : dateText}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"></div>
              </div>

              <AnimatePresence>
                {(items as any[]).map((item) => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      transition: { duration: 0.2 },
                    }}
                    key={item.id}
                    className="bg-white dark:bg-bg-primary p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-3 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all duration-300 hover:shadow-md bg-white"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#0052FF]/10 dark:bg-[#00D8FF]/10 flex items-center justify-center text-[#0052FF] dark:text-[#00D8FF] shrink-0">
                          {/* Mini Q isotype */}
                          <svg width="15" height="15" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                            <circle cx="50" cy="50" r="32" strokeWidth="18" fill="none" />
                            <path d="M 68 68 L 84 84" strokeWidth="18" strokeLinecap="round" fill="none" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold text-sm text-text-main leading-tight line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-[11px] font-semibold text-text-muted mt-0.5">
                            {item.pro}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end shrink-0 pl-2">
                        <span className="text-[13px] font-black text-primary">
                          {item.price}
                        </span>
                        <span className="text-[9px] font-bold text-text-muted/60 uppercase tracking-wider mt-0.5">
                          {item.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-50 dark:border-gray-800/50">
                      <div className="flex items-center gap-2">
                        <div
                          className={`inline-flex items-center px-3 py-1.5 rounded-xl font-bold text-[9px] uppercase tracking-wider border transition-all ${
                            item.status === "completed" ||
                            item.status === "completado" ||
                            item.status === "paid_completed"
                              ? "bg-success/5 text-success border-success/10"
                              : item.status === "waiting_client_approval"
                                ? "bg-indigo-500/5 text-indigo-500 border-indigo-500/10 dark:text-indigo-400"
                                : item.status === "in_progress" ||
                                    item.status === "en proceso"
                                  ? "bg-secondary/5 text-secondary border-secondary/10 glow-secondary"
                                  : item.status === "cancelled" ||
                                      item.status === "cancelado"
                                    ? "bg-alert/5 text-alert border-alert/10"
                                    : "bg-primary/5 text-primary border-primary/10"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              item.status === "completed" ||
                              item.status === "completado" ||
                              item.status === "paid_completed"
                                ? "bg-success"
                                : item.status === "waiting_client_approval"
                                  ? "bg-indigo-500 animate-pulse"
                                  : item.status === "in_progress" ||
                                      item.status === "en proceso"
                                    ? "bg-secondary animate-pulse"
                                    : item.status === "cancelled" ||
                                        item.status === "cancelado"
                                      ? "bg-alert"
                                      : "bg-primary"
                            }`}
                          ></div>
                          {getStatusLabel(item.status)}
                        </div>
                        {(item.status === "completed" ||
                          item.status === "completado" ||
                          item.status === "paid_completed") && (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 font-extrabold text-[9px] px-2.5 py-1 rounded-xl uppercase tracking-wider border border-emerald-500/10 shadow-sm animate-pulse whitespace-nowrap">
                            +150 PTS
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-primary/50 group-hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest gap-1">
                        Ver detalle
                        <ChevronRight size={12} />
                      </div>
                    </div>

                    {((user?.role === "client" && item.status !== "pending") ||
                      (user?.role !== "client" && item.hasOtherUser)) &&
                      onNavigateToChat && (
                        <div
                          className="flex items-center gap-3 bg-bg-secondary p-2.5 rounded-2xl border border-gray-50 dark:border-gray-800 active:scale-95 transition-transform mt-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onNavigateToChat) onNavigateToChat(item);
                          }}
                        >
                          <div className="w-8 h-8 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shrink-0 relative">
                            <img
                              src={
                                item.proAvatar ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(item.pro)}&background=3e9ab3&color=fff`
                              }
                              alt={item.pro}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(item.pro)}&background=3e9ab3&color=fff`;
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-0.5 opacity-70">
                              Chat con
                            </p>
                            <p className="font-bold text-sm text-text-main truncate group-hover:text-primary transition-colors leading-none">
                              {item.pro}
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <MessageSquare size={14} />
                          </div>
                        </div>
                      )}

                    {/* Remove/Cancel Button Logic */}
                    {(item.status === "cancelled" ||
                      item.status === "cancelado" ||
                      item.status === "canceled" ||
                      item.status === "completed" ||
                      item.status === "completado" ||
                      item.status === "paid_completed" ||
                      item.originalData?.professionalId === "pro_demo_id" ||
                      ((item.status === "accepted" ||
                        item.status === "aceptado") &&
                        Date.now() - item.rawDate.getTime() >
                          5 * 60 * 1000)) && (
                      <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800/50 flex flex-col items-center justify-center w-full">
                        <button
                          onClick={(e) => handleDelete(e, item)}
                          disabled={deletingId === item.id}
                          className="w-full h-14 rounded-2xl bg-alert/10 text-alert flex items-center justify-center gap-2.5 hover:bg-alert hover:text-white transition-all z-10 shadow-premium active:scale-95 border border-alert/20 font-bold text-sm uppercase tracking-wider group/del text-center mx-auto"
                          title={
                            item.status === "accepted"
                              ? "Cancelar por falta de respuesta"
                              : "Eliminar del historial"
                          }
                        >
                          {deletingId === item.id ? (
                            <Loader2 size={20} className="animate-spin" />
                          ) : (
                            <>
                              <Trash2
                                size={20}
                                className="group-hover/del:scale-110 transition-transform"
                              />
                              <span className="text-center font-bold">
                                {item.status === "accepted" ||
                                item.status === "aceptado"
                                  ? "Cancelar trabajo"
                                  : "Borrar del historial"}
                              </span>
                            </>
                          )}
                        </button>
                        {(item.status === "accepted" ||
                          item.status === "aceptado") && (
                          <p className="text-[10px] text-text-muted mt-2 text-center opacity-60 font-medium w-full">
                            Disponible tras 5 min. sin respuesta
                          </p>
                        )}
                      </div>
                    )}
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-primary/5 rounded-[32px] flex items-center justify-center text-primary/20 mb-6">
              <HistoryIcon size={40} />
            </div>
            <h3 className="font-bold text-text-main text-lg">Sin resultados</h3>
            <p className="text-sm text-text-muted mt-2 font-medium">
              No encontramos servicios que coincidan con tu búsqueda.
            </p>
          </motion.div>
        )}
      </main>

      {/* Detail Bottom Sheet */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-primary/20 z-[110] backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setSelectedItem(null);
                }
              }}
              className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-bg-secondary rounded-t-[32px] sm:rounded-t-[48px] shadow-premium z-[120] p-6 pb-24 flex flex-col gap-3 h-[calc(100vh-32px)] overflow-y-auto no-scrollbar"
            >
              {/* Drag Handle Container with large touch target */}
              <div 
                onPointerDown={(e) => dragControls.start(e)}
                className="w-full pt-1 pb-4 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
              >
                <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
              </div>

              <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-xl font-bold text-text-main font-manrope leading-tight">
                    {selectedItem.title}
                  </h2>
                  <div className="mt-1.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg font-bold text-[9px] uppercase tracking-widest ${
                        selectedItem.status === "completed" ||
                        selectedItem.status === "completado" ||
                        selectedItem.status === "paid_completed"
                          ? "bg-success/10 text-success"
                          : selectedItem.status === "in_progress" ||
                              selectedItem.status === "en proceso"
                            ? "bg-primary/5 text-primary"
                            : "bg-alert/10 text-alert"
                      }`}
                    >
                      {getStatusLabel(selectedItem.status)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-9 h-9 rounded-xl bg-bg-primary border border-gray-100 dark:border-gray-800 flex items-center justify-center text-text-muted hover:text-alert shadow-soft transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-3.5">
                <div
                  className={`bg-white/90 dark:bg-bg-primary rounded-2xl p-4 shadow-sm border border-black/5 transition-colors ${user?.role === "client" && selectedItem.status !== "pending" ? "cursor-pointer hover:bg-bg-secondary" : ""}`}
                  onClick={
                    user?.role === "client" && selectedItem.status !== "pending"
                      ? () =>
                          handleOpenProfile(
                            selectedItem.originalData.professionalId,
                            selectedItem,
                          )
                      : undefined
                  }
                >
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] mb-2">
                    {selectedItem.proLabel}
                  </h4>
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        selectedItem.status === "pending"
                          ? "https://api.dicebear.com/7.x/avataaars/svg?seed=guest"
                          : selectedItem.proAvatar
                      }
                      alt={selectedItem.pro}
                      className="w-12 h-12 rounded-xl object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <h3 className="font-extrabold text-text-main text-sm">
                        {selectedItem.status === "pending"
                          ? "Buscando..."
                          : selectedItem.pro}
                      </h3>
                      {user?.role === "client" &&
                        selectedItem.status !== "pending" && (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] font-bold text-secondary uppercase tracking-widest">
                              Ver Perfil y Matrícula
                            </span>
                          </div>
                        )}
                    </div>
                    {user?.role === "client" &&
                      selectedItem.status !== "pending" && (
                        <User
                          className="text-text-muted opacity-30"
                          size={16}
                        />
                      )}
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-bg-primary rounded-2xl p-3.5 shadow-sm border border-black/5 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-bg-secondary rounded-lg flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-0.5">
                        Fecha y Hora
                      </p>
                      <p className="text-xs font-bold text-text-main">
                        {selectedItem.date} — {selectedItem.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-bg-secondary rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-0.5">
                        Dirección
                      </p>
                      <p className="text-xs font-bold text-text-main">
                        {selectedItem.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-bg-secondary rounded-lg flex items-center justify-center shrink-0">
                      <Banknote size={16} className="text-success" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-0.5">
                        Forma de Pago
                      </p>
                      <p className="text-xs font-bold text-text-main">
                        {selectedItem.originalData?.paymentMethods?.join(
                          " y ",
                        ) || "Efectivo"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-bg-secondary rounded-lg flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-0.5">
                        Plazo Esperado
                      </p>
                      <p className="text-xs font-bold text-text-main">
                        {selectedItem.originalData?.timeframe || selectedItem.timeframe || "En el día"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-50 dark:border-gray-800">
                    <h4 className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                      <AlertCircle size={12} className="text-primary" />{" "}
                      Imágenes del Servicio
                    </h4>

                    <div className="flex flex-col gap-3">
                      {/* Request Image */}
                      <div>
                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1.5 opacity-60">
                          Foto de la Solicitud
                        </p>
                        {(!requestImageSrc || requestImageFailed) ? (
                          <div className="w-full h-44 rounded-xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-800 bg-bg-secondary/30 text-text-muted">
                            <ImageIcon size={32} className="opacity-40" />
                            <div className="text-center">
                              <p className="text-xs font-bold text-text-main">Sin foto adjuntada</p>
                              <p className="text-[9px] font-bold text-text-muted opacity-50 mt-0.5">El cliente no subió fotografía para esta solicitud</p>
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => {
                              setLightboxUrl(requestImageSrc);
                              setLightboxTitle("Foto de la Solicitud");
                            }}
                            className="w-full h-44 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-inner group bg-gray-50/20 cursor-pointer relative"
                          >
                            <img
                              src={requestImageSrc}
                              alt="Solicitud"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                              referrerPolicy="no-referrer"
                              onError={() => setRequestImageFailed(true)}
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <span className="bg-white/95 dark:bg-bg-primary/95 backdrop-blur-sm text-text-main font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">Ampliar Foto</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Finished Work Image */}
                      {(selectedItem.originalData?.finishedWorkImage ||
                        (user?.role === "professional" &&
                          (selectedItem.status === "accepted" ||
                           selectedItem.status === "waiting_client_approval"))) && (
                        <div className="pt-2 border-t border-dashed border-gray-200 dark:border-gray-800">
                          <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1.5 opacity-60">
                            Trabajo Finalizado
                          </p>

                          {finishedImageSrc ? (
                            <div className="flex flex-col gap-3">
                              <div 
                                onClick={() => {
                                  setLightboxUrl(finishedImageSrc);
                                  setLightboxTitle("Trabajo Finalizado");
                                }}
                                className="w-full h-44 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-inner group relative bg-gray-50/20 cursor-pointer"
                              >
                                <img
                                  src={finishedImageSrc}
                                  alt="Finalizado"
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                  onError={() => setFinishedImageFailed(true)}
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <span className="bg-white/95 dark:bg-bg-primary/95 backdrop-blur-sm text-text-main font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">Ampliar Foto</span>
                                </div>
                                <div className={`absolute top-2 right-2 backdrop-blur-md text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg ${
                                  selectedItem.status === "waiting_client_approval" ? "bg-indigo-600 animate-pulse" : "bg-success"
                                }`}>
                                  {selectedItem.status === "waiting_client_approval" ? "Espera Aprobación" : "Completado"}
                                </div>
                              </div>

                              {/* Client Confirm Completion or Dispute (Pending Approval) */}
                              {user?.role === "client" &&
                                selectedItem.status === "waiting_client_approval" && (
                                  <div className="flex flex-col gap-2 w-full">
                                    {!selectedItem.isDisputed ? (
                                      <>
                                        <button
                                          onClick={() => handleClientConfirmCompletion(selectedItem.id)}
                                          disabled={isConfirmingCompletion || isRejectingWork}
                                          className="w-full h-11 bg-primary text-white rounded-xl font-bold text-sm shadow-premium active:scale-95 flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-50"
                                        >
                                          {isConfirmingCompletion ? (
                                            <Loader2 className="animate-spin" size={16} />
                                          ) : (
                                            <CheckCircle size={16} />
                                          )}
                                          Trabajo Finalizado
                                        </button>

                                        <button
                                          onClick={() => handleRejectWork(selectedItem)}
                                          disabled={isConfirmingCompletion || isRejectingWork}
                                          className="w-full h-11 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-xl font-bold text-sm active:scale-95 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                        >
                                          {isRejectingWork ? (
                                            <Loader2 className="animate-spin" size={16} />
                                          ) : (
                                            <AlertCircle size={16} />
                                          )}
                                          No apruebo el trabajo / Reclamar
                                        </button>
                                      </>
                                    ) : (
                                      <div className="bg-red-50/80 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-3.5 rounded-2xl border border-red-100 dark:border-red-900/50 flex flex-col gap-1.5 shadow-sm">
                                        <p className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                          <AlertCircle size={14} className="text-red-500 animate-pulse" />
                                          Reclamo en Curso
                                        </p>
                                        <p className="text-[10px] leading-snug font-medium opacity-80">
                                          Has reportado que no apruebas el trabajo realizado. Nuestro personal de soporte está mediando para resolver el problema.
                                        </p>
                                        <button
                                          onClick={() => {
                                            setSupportChatTopic(`Reclamo: Trabajo de ${selectedItem.category}`);
                                            setShowSupportChat(true);
                                          }}
                                          className="w-full h-10 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xs active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
                                        >
                                          <MessageCircle size={14} />
                                          Chat con Soporte por Reclamo
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}

                              {/* Professional Pending Message */}
                              {user?.role === "professional" &&
                                selectedItem.status === "waiting_client_approval" && (
                                  <div className="bg-indigo-50/80 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 p-3.5 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex flex-col gap-1 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                      <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                      </span>
                                      Esperando Aprobación
                                    </p>
                                    <p className="text-[10px] leading-snug font-medium opacity-80">
                                      El cliente debe presionar el botón de "Trabajo Finalizado" para procesar el pago, emitir la factura y calificar el servicio.
                                    </p>
                                  </div>
                                )}

                              {/* Client Mark as Paid & Review Button (Only after completed) */}
                              {user?.role === "client" &&
                                (selectedItem.status === "completed" ||
                                  selectedItem.status === "completado") &&
                                selectedItem.originalData?.finishedWorkImage && (
                                  <button
                                    onClick={() => setShowRatingModal(true)}
                                    className="w-full h-11 bg-success text-white rounded-xl font-bold text-sm shadow-sm active:scale-95 flex items-center justify-center gap-2 transition-all hover:brightness-110"
                                  >
                                    <Banknote size={16} />
                                    Calificar y Registrar Pago
                                  </button>
                                )}

                              {selectedItem.status === "paid_completed" && (
                                <div className="bg-success/10 border border-success/20 rounded-xl p-3 flex flex-col gap-2">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center text-white">
                                      <CheckCircle size={16} />
                                    </div>
                                    <div>
                                      <p className="text-[8px] font-black text-success uppercase tracking-widest">
                                        Servicio Finalizado
                                      </p>
                                      <p className="text-xs font-bold text-text-main leading-tight border-0 m-0">
                                        Pagado y Calificado
                                      </p>
                                    </div>
                                  </div>
                                  {selectedItem.originalData.rating && (
                                    <div className="flex gap-0.5 mt-0.5">
                                      {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                          key={s}
                                          size={11}
                                          className={
                                            s <=
                                            selectedItem.originalData.rating
                                              ? "fill-warning text-warning"
                                              : "text-gray-300"
                                          }
                                        />
                                      ))}
                                    </div>
                                  )}
                                  {selectedItem.originalData.review && (
                                    <p className="text-[11px] text-text-muted italic bg-white/50 p-2 rounded-lg border border-white/20">
                                      "{selectedItem.originalData.review}"
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="relative group">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleUploadFinishedWork(selectedItem.id, e)
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                disabled={isUploading}
                              />
                              <div
                                className={`w-full h-44 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-2 transition-all ${isUploading ? "bg-gray-50" : "bg-bg-secondary/30 hover:bg-bg-secondary/60 hover:border-primary/40 group-hover:bg-primary/5"}`}
                              >
                                {isUploading ? (
                                  <>
                                    <Loader2
                                      className="text-primary animate-spin"
                                      size={24}
                                    />
                                    <p className="text-[11px] font-bold text-primary animate-pulse">
                                      Subiendo evidencia...
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-9 h-9 bg-white dark:bg-bg-primary rounded-xl flex items-center justify-center shadow-soft text-text-muted transition-transform group-hover:scale-110 group-hover:text-primary">
                                      <Download
                                        size={18}
                                        className="rotate-180"
                                      />
                                    </div>
                                    <div className="text-center">
                                      <p className="text-xs font-black text-text-main">
                                        Cargar Trabajo Finalizado
                                      </p>
                                      <p className="text-[9px] font-bold text-text-muted mt-0.5 opacity-50">
                                        Sube una foto del servicio terminado
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-50 dark:border-gray-800">
                    <h4 className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
                      <AlertCircle size={12} className="text-primary" />{" "}
                      Información del Servicio
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-semibold mb-3">
                      {selectedItem.details}
                    </p>

                    <div className="bg-success/5 dark:bg-success/10 rounded-2xl p-4 border border-success/10 dark:border-success/20 flex items-center justify-between mt-3 mb-4">
                      <div>
                        <p className="text-[10px] font-black text-success uppercase tracking-wider mb-1">
                          {selectedItem.status === "en proceso"
                            ? "PRESUPUESTO ESTIMADO"
                            : "MONTO PAGADO"}
                        </p>
                        <p className="text-xl font-black text-success">
                          {selectedItem.price}
                        </p>
                      </div>
                      {(selectedItem.status === "completed" ||
                        selectedItem.status === "completado" ||
                        selectedItem.status === "paid_completed") && (
                        <div className="text-right mr-2">
                          <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5 flex items-center justify-end gap-1">
                            <Award
                              size={10}
                               className="fill-emerald-500/10 text-emerald-500"
                            />{" "}
                            Puntos Ganados
                          </p>
                          <p className="text-base font-black text-emerald-600">
                            +150 PTS
                          </p>
                        </div>
                      )}
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center text-success shrink-0">
                        <CheckCircle size={20} className="fill-success/10" />
                      </div>
                    </div>
                  </div>
                </div>
                            {/* Factura de Compra Pro Detailed UI Card */}
                {(selectedItem.status === "completed" ||
                  selectedItem.status === "completado" ||
                  selectedItem.status === "paid_completed") && (() => {
                    const totalNum = parseInt((selectedItem.price || "").replace(/[^0-9]/g, ""), 10) || 25000;
                    const feePct = selectedItem.clientIsPremium ? 0.10 : 0.17;
                    const isConIva = selectedItem.proTaxStatus === 'con_iva';

                    let costoGestion = 0;
                    let manoObra = 0;
                    let ivaAmt = 0;
                    let totalFacturado = totalNum;
                    let totalNeto = totalNum;

                    if (isConIva) {
                      totalNeto = totalNum / 1.21;
                      costoGestion = totalNeto * feePct;
                      manoObra = totalNeto - costoGestion;
                      ivaAmt = totalNum - totalNeto;
                    } else {
                      costoGestion = totalNum * feePct;
                      manoObra = totalNum - costoGestion;
                      ivaAmt = 0; // Exento
                    }

                    const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });

                    return (
                      <div className="bg-gray-50 dark:bg-[#151515] rounded-2xl p-4 border border-gray-100 dark:border-gray-800 flex flex-col gap-2 mt-1">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-1.5">
                          <FileText size={14} className="text-primary" /> Comprobante de Compra #FC-{selectedItem.id ? selectedItem.id.toString().replace(/[^0-9]/g, "") : "1903"}
                          <span className="ml-auto text-[9px] font-black uppercase text-text-muted">
                            ({isConIva ? "CON IVA" : "SIN IVA"})
                          </span>
                        </p>
                        
                        {isConIva && (
                          <div className="flex justify-between items-center text-xs text-text-muted font-semibold mt-1">
                            <span>TOTAL NETO (Base Imponible):</span>
                            <span className="text-text-main font-bold">
                              {formatter.format(Math.round(totalNeto))}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center text-xs text-text-muted font-semibold">
                          <span>Mano de obra base {isConIva ? "(Neto)" : ""}:</span>
                          <span className="text-text-main font-bold">
                            {formatter.format(Math.round(manoObra))}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-xs text-text-muted font-semibold">
                          <span>Costo de gestión {isConIva ? "(Neto)" : ""} ({Math.round(feePct * 100)}%):</span>
                          <span className="text-text-main font-bold">
                            {formatter.format(Math.round(costoGestion))}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-xs text-text-muted font-semibold">
                          <span>I.V.A (21% {isConIva ? "Incluido" : "Exento"}):</span>
                          <span className="text-text-main font-bold">
                            {formatter.format(Math.round(ivaAmt))}
                          </span>
                        </div>

                        {selectedItem.clientIsPremium && (
                          <div className={`mt-1 text-[10px] font-bold px-2 py-1 rounded-lg border flex items-center gap-1 ${
                            garantias_disponibles > 0 
                              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border-emerald-500/10" 
                              : "text-gray-500 dark:text-gray-400 bg-gray-500/5 border-gray-500/10 grayscale"
                          }`}>
                            <span>Garantía Plus Aplicada (Te quedan {garantias_disponibles} de 2 este mes)</span>
                          </div>
                        )}

                        <div className="border-t border-dashed border-gray-200 dark:border-gray-800 pt-2 mt-1 flex justify-between items-center text-sm font-black text-primary">
                          <span>TOTAL FACTURADO {isConIva ? "(Bruto)" : ""}:</span>
                          <span>{formatter.format(totalFacturado)}</span>
                        </div>
                      </div>
                    );
                  })()}

                          <div className="flex flex-col gap-2 mt-1">
                {(selectedItem.status === "completed" ||
                  selectedItem.status === "completado" ||
                  selectedItem.status === "paid_completed") && (
                  <button
                    onClick={() => {
                      const totalNum = parseInt((selectedItem.price || "").replace(/[^0-9]/g, ""), 10) || 25000;
                      const feePct = selectedItem.clientIsPremium ? 0.10 : 0.17;
                      const isConIva = selectedItem.proTaxStatus === 'con_iva';

                      let costoGestion = 0;
                      let manoObra = 0;
                      let ivaAmt = 0;
                      let totalFacturado = totalNum;
                      let totalNeto = totalNum;

                      if (isConIva) {
                        totalNeto = totalNum / 1.21;
                        costoGestion = totalNeto * feePct;
                        manoObra = totalNeto - costoGestion;
                        ivaAmt = totalNum - totalNeto;
                      } else {
                        costoGestion = totalNum * feePct;
                        manoObra = totalNum - costoGestion;
                        ivaAmt = 0; // Exento
                      }

                      const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });
                      const baseFormatted = formatter.format(Math.round(manoObra));
                      const platformFormatted = formatter.format(Math.round(costoGestion));
                      const ivaFormatted = formatter.format(Math.round(ivaAmt));
                      const totalFormatted = formatter.format(Math.round(totalFacturado));
                      const netoFormatted = formatter.format(Math.round(totalNeto));

                      const doc = new jsPDF({
                        orientation: "portrait",
                        unit: "mm",
                        format: "a4",
                      });

                      // Decorative Top Banner
                      doc.setFillColor(15, 76, 92); // Primary Brand Color
                      doc.rect(0, 0, 210, 8, "F");

                      // Company Info & Logo Header Area
                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(22);
                      doc.setTextColor(15, 76, 92);
                      doc.text("SERVICIOS PRO", 15, 25);

                      doc.setFont("helvetica", "normal");
                      doc.setFontSize(9);
                      doc.setTextColor(107, 114, 128); // Text muted
                      doc.text("Soluciones Profesionales para el Hogar y Comercio", 15, 31);
                      doc.text("Soporte: info@serviciospro.com", 15, 36);

                      // Argentinian AFIP Tax Form Letter Box (Centered)
                      doc.setDrawColor(15, 76, 92);
                      doc.setFillColor(255, 255, 255);
                      doc.rect(98, 12, 14, 14, "FD");
                      
                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(20);
                      doc.setTextColor(15, 76, 92);
                      doc.text(isConIva ? "B" : "C", 105, 22, { align: "center" });
                      
                      doc.setFontSize(6);
                      doc.text(isConIva ? "COD. 006" : "COD. 011", 105, 25, { align: "center" });

                      // Invoice Meta Details (aligned right)
                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(14);
                      doc.setTextColor(17, 24, 39); // Text main
                      doc.text(`FACTURA TIPO ${isConIva ? "B" : "C"}`, 195, 23, { align: "right" });

                      doc.setFont("helvetica", "normal");
                      doc.setFontSize(9);
                      doc.setTextColor(107, 114, 128);
                      
                      const compNumber = selectedItem.id ? selectedItem.id.toString().replace(/[^0-9]/g, "") : "1903";
                      doc.text(`Nro. Comprobante: FC-000${compNumber}`, 195, 30, { align: "right" });
                      doc.text(`Fecha de Emisión: ${selectedItem.date || "Hoy"}`, 195, 35, { align: "right" });

                      // Paid Stamp
                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(9);
                      doc.setTextColor(34, 197, 94); // Success
                      doc.text(`ESTADO: COBRADO | ${selectedItem.clientIsPremium ? "PREMIUM CLIENT" : "BASIC CLIENT"}`, 195, 41, { align: "right" });

                      // Horizontal Divider Line below header
                      doc.setDrawColor(229, 231, 235);
                      doc.setLineWidth(0.5);
                      doc.line(15, 48, 195, 48);

                      // Client and Professional Details section
                      // Left Side: Client Info
                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(9);
                      doc.setTextColor(156, 163, 175);
                      doc.text("EMITIDO A (CLIENTE):", 15, 56);

                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(11);
                      doc.setTextColor(17, 24, 39);
                      doc.text(user?.displayName || "Cliente de Servicios Pro", 15, 62);

                      doc.setFont("helvetica", "normal");
                      doc.setFontSize(9);
                      doc.setTextColor(107, 114, 128);
                      doc.text(user?.email || "usuario@serviciospro.com", 15, 67);
                      doc.text("I.V.A.: Consumidor Final", 15, 71);

                      // Right Side: Professional Info
                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(9);
                      doc.setTextColor(156, 163, 175);
                      doc.text("PRESTADOR (PROFESIONAL):", 115, 56);

                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(11);
                      doc.setTextColor(17, 24, 39);
                      doc.text(selectedItem.pro || "Especialista Verificado", 115, 62);

                      doc.setFont("helvetica", "normal");
                      doc.setFontSize(9);
                      doc.setTextColor(107, 114, 128);
                      doc.text(selectedItem.title || "Servicio Técnico Especializado", 115, 67);
                      doc.text(`I.V.A.: ${isConIva ? "Responsable Inscripto" : "Monotributista Exento"}`, 115, 71);

                      // Concept Details Table
                      const tableRows = [
                        [
                          `Mano de obra base ${isConIva ? "(Neto)" : ""}`,
                          `Servicio de técnico matriculado de: ${selectedItem.title || "mantenimiento profesional"}. Localización y solución general del problema indicado de urgente necesidad.`,
                          baseFormatted
                        ],
                        [
                          `Costo de gestión ${isConIva ? "(Neto)" : ""}`,
                          `Tasa operativa en plataforma Servicios Pro (${Math.round(feePct * 100)}% de gestión). Cobertura garantizada contra siniestros accidentales.`,
                          platformFormatted
                        ],
                        [
                          `I.V.A. (21% ${isConIva ? "Incluido" : "Exento"})`,
                          isConIva ? "Impuesto al Valor Agregado gravado en alícuota general del 21%" : "Exento de Impuestos según Régimen Simplificado para Pequeños Contribuyentes (Factura C)",
                          ivaFormatted
                        ]
                      ];

                      autoTable(doc, {
                        startY: 78,
                        margin: { left: 15, right: 15 },
                        head: [["Concepto", "Descripción del Detalle", "Subtotal"]],
                        body: tableRows,
                        theme: "striped",
                        styles: {
                          font: "helvetica",
                          fontSize: 9,
                          cellPadding: 5,
                        },
                        headStyles: {
                          fillColor: [15, 76, 92], // primary color
                          textColor: [255, 255, 255],
                          fontStyle: "bold",
                        },
                        columnStyles: {
                          0: { cellWidth: 45, fontStyle: "bold" },
                          1: { cellWidth: 95 },
                          2: { cellWidth: 40, halign: "right" },
                        },
                      });

                      // Total Box below table
                      const finalY = (doc as any).lastAutoTable.finalY || 115;

                      // Box background for totals
                      const boxHeight = isConIva ? 32 : 24;
                      doc.setFillColor(248, 250, 252); // bg-secondary
                      doc.roundedRect(115, finalY + 8, 80, boxHeight, 3, 3, "F");
                      doc.setDrawColor(229, 231, 235);
                      doc.setLineWidth(0.3);
                      doc.roundedRect(115, finalY + 8, 80, boxHeight, 3, 3, "D");

                      doc.setFont("helvetica", "normal");
                      doc.setFontSize(9);
                      doc.setTextColor(107, 114, 128);

                      let currentTextY = finalY + 14;

                      if (isConIva) {
                        doc.text("Importe Neto (Gravado):", 120, currentTextY);
                        doc.setFont("helvetica", "normal");
                        doc.setTextColor(17, 24, 39);
                        doc.text(netoFormatted, 190, currentTextY, { align: "right" });
                        
                        currentTextY += 8;
                        doc.setTextColor(107, 114, 128);
                        doc.text("I.V.A. Débito Fiscal (21%):", 120, currentTextY);
                        doc.setTextColor(17, 24, 39);
                        doc.text(ivaFormatted, 190, currentTextY, { align: "right" });
                        
                        currentTextY += 8;
                      } else {
                        doc.text("Importe Neto Exento:", 120, currentTextY);
                        doc.setFont("helvetica", "normal");
                        doc.setTextColor(17, 24, 39);
                        doc.text(totalFormatted, 190, currentTextY, { align: "right" });
                        
                        currentTextY += 8;
                      }

                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(11);
                      doc.setTextColor(15, 76, 92); // primary color
                      doc.text("TOTAL FACTURADO:", 120, currentTextY);
                      doc.text(totalFormatted, 190, currentTextY, { align: "right" });

                      // If premium, add a nice little badge on the left side of the totals
                      if (selectedItem.clientIsPremium) {
                        doc.setFillColor(236, 253, 245); // emerald-50
                        doc.roundedRect(15, finalY + 8, 90, 16, 2, 2, "F");
                        doc.setDrawColor(167, 243, 208); // emerald-200
                        doc.setLineWidth(0.3);
                        doc.roundedRect(15, finalY + 8, 90, 16, 2, 2, "D");

                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(10);
                        doc.setTextColor(4, 120, 87); // emerald-700
                        doc.text("GARANTÍA PLUS ACTIVADA (PREMIUM)", 20, finalY + 13);
                        
                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(8);
                        doc.setTextColor(5, 150, 105); // emerald-600
                        doc.text("Beneficios de membresía aplicados. Quedan 1 de 2 de este mes.", 20, finalY + 19);
                      }

                      // Footer terms & notes
                      const footerY = 245;

                      doc.setFont("helvetica", "normal");
                      doc.setFontSize(8);
                      doc.setTextColor(156, 163, 175);
                      
                      doc.line(15, footerY - 5, 195, footerY - 5);
                      
                      doc.text(
                        "* Esta factura digital ha sido emitida de forma electrónica según los términos de uso y reglamentación de Servicios Pro.",
                        15,
                        footerY
                      );
                      doc.text(
                        "* La conformidad técnica, física e integral del trabajo encomendado ha sido validada por firma y verificación digital del cliente.",
                        15,
                        footerY + 4
                      );
                      doc.text(
                        "* El pago de la presente transacción ha sido encriptado y resguardado para la seguridad de ambas partes involucradas.",
                        15,
                        footerY + 8
                      );

                      doc.setFont("helvetica", "bold");
                      doc.setFontSize(9);
                      doc.setTextColor(15, 76, 92);
                      doc.text("¡Gracias por confiar en los Profesionales de Servicios Pro!", 15, footerY + 16);

                      // Save PDF
                      doc.save(`Factura_ServiciosPro_FC_${compNumber}.pdf`);
                    }}
                    className="w-full h-11 bg-bg-secondary border border-gray-200 dark:border-gray-800 text-text-main rounded-xl text-sm font-bold transition-all hover:border-primary active:scale-95 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download size={18} className="text-primary" />
                    Descargar Factura
                  </button>
                )}
              </div>

              <div className="w-full mt-6 flex flex-col gap-3">
                {(selectedItem.status === "in_progress" ||
                  selectedItem.status === "en proceso" ||
                  selectedItem.status === "accepted" ||
                  selectedItem.status === "pending") && (
                  <>
                    {user?.role === "professional" && (
                      <button
                        onClick={() => {
                          const targetLat = selectedItem.originalData?.location?.lat ?? selectedItem.location?.lat ?? -31.4262604;
                          const targetLng = selectedItem.originalData?.location?.lng ?? selectedItem.location?.lng ?? -64.2458922;
                          // Trigger native Google Maps navigation route deep link
                          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${targetLat},${targetLng}&travelmode=driving`;
                          window.open(googleMapsUrl, "_blank");
                        }}
                        className="w-full h-14 bg-primary text-white hover:bg-primary/95 rounded-2xl text-base font-black transition-all shadow-lg shadow-primary/10 active:scale-95 flex items-center justify-center gap-2"
                      >
                        <MapPin size={20} className="fill-white/10" />
                        Ir a Google Maps
                      </button>
                    )}
                    {selectedItem.status !== "pending" && (
                      <button
                        onClick={() => {
                          const item = selectedItem;
                          setSelectedItem(null);
                          if (onNavigateToChat) onNavigateToChat(item);
                        }}
                        className={`w-full border border-gray-200 dark:border-gray-800 text-text-muted hover:text-text-main hover:bg-gray-50/50 dark:hover:bg-gray-800/55 font-bold transition-all flex items-center justify-center gap-2 ${
                          user?.role === "professional" 
                            ? "h-11 rounded-xl text-xs mt-1" 
                            : "h-14 rounded-2xl text-base font-black bg-primary text-white hover:bg-primary/95 shadow-lg"
                        }`}
                      >
                        <MessageCircle size={user?.role === "professional" ? 16 : 20} className="fill-white/10" />
                        {user?.role === "client" ? "Contactar Especialista" : "Abrir Chat con el Cliente"}
                      </button>
                    )}
                    {user?.role === "client" &&
                      (selectedItem.status === "pending" ||
                        selectedItem.status === "accepted" ||
                        selectedItem.status === "en proceso") && (
                        <button
                          onClick={() => {
                            if (onCancelJob) onCancelJob(selectedItem);
                            setSelectedItem(null);
                          }}
                          className="w-full h-10 bg-bg-primary border border-alert/20 text-alert hover:bg-alert/5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 mt-2.5 text-center mx-auto"
                        >
                          <X size={16} />
                          <span className="text-center font-bold">Cancelar Solicitud</span>
                        </button>
                      )}
                  </>
                )}
              </div>
              {/* Spacer to guarantee content is above bottom nav */}
              <div className="h-20 shrink-0 w-full mb-8"></div>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Rating & Review Modal */}
      <AnimatePresence>
        {showRatingModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRatingModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-bg-primary w-full max-w-sm rounded-[40px] shadow-premium relative z-10 p-8 pt-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-warning via-primary to-warning opacity-50"></div>

              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-warning/10 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                  <Star className="text-warning fill-warning" size={40} />
                </div>
                <h3 className="text-2xl font-black text-text-main font-manrope">
                  Calificar Servicio
                </h3>
                <p className="text-sm text-text-muted mt-2 font-medium">
                  ¿Cómo fue tu experiencia con {selectedItem?.pro}?
                </p>
              </div>

              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating(s)}
                    className="p-1 transition-transform active:scale-90"
                  >
                    <Star
                      size={36}
                      className={`${s <= rating ? "fill-warning text-warning" : "text-gray-200 dark:text-gray-800"} transition-colors duration-300`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-4 opacity-50">
                  Comentario opcional
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Escribe tu recomendación aquí..."
                  className="w-full bg-bg-secondary rounded-[24px] p-5 border border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold min-h-[120px] resize-none shadow-inner"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || isSubmittingRating}
                  className="w-full h-16 bg-primary text-white rounded-[24px] font-bold shadow-premium active:scale-95 disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-3"
                >
                  {isSubmittingRating ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    "Finalizar y Calificar"
                  )}
                </button>
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="w-full h-14 bg-bg-secondary text-text-muted rounded-[24px] font-bold transition-all active:scale-95"
                >
                  Omitir por ahora
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Professional Profile Modal */}
      <AnimatePresence>
        {showProfileModal && activeProfile && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-lg h-full sm:h-auto bg-bg-primary rounded-none sm:rounded-[40px] shadow-premium overflow-hidden max-h-full sm:max-h-[90vh] flex flex-col relative z-10"
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-white dark:bg-bg-secondary text-text-main rounded-full flex items-center justify-center shadow-premium border border-black/5 hover:scale-105 transition-all z-30 focus:outline-none"
              >
                <X size={18} />
              </button>

              {/* Scrollable Container (Header + Body in tandem) */}
              <div className="overflow-y-auto no-scrollbar flex-1">
                {/* Header Profile Photo Container (Compact & Small layout) */}
                <div className="pt-10 pb-3 px-6 bg-gradient-to-b from-primary/5 via-transparent to-transparent flex flex-col items-center shrink-0">
                  <div className="w-36 h-36 relative rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-soft bg-white dark:bg-zinc-900 flex items-center justify-center p-1.5">
                    <img 
                      src={activeProfile.photoURL || undefined} 
                      className="w-full h-full object-contain rounded-xl" 
                      alt={activeProfile.displayName}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeProfile.displayName || '')}&size=200&background=3e9ab3&color=fff`;
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white shadow-soft">
                      <CheckCircle size={12} />
                    </div>
                  </div>
                </div>

                {/* Profile Body Content */}
                <div className="px-8 pb-8 bg-bg-primary">
                  {(() => {
                    const isPremiumPro = activeProfile.role === "premium" || activeProfile.premium_status === "active" || activeProfile.is_premium;
                    const jobsCount = typeof activeProfile.totalJobs === "number" ? activeProfile.totalJobs : parseInt(activeProfile.totalJobs || "0", 10);
                    const ratingVal = typeof activeProfile.avgRating === "number" ? activeProfile.avgRating : parseFloat(activeProfile.avgRating || "0");
                    const expYears = typeof activeProfile.experienceYears === "number" ? activeProfile.experienceYears : parseInt(activeProfile.experienceYears || "0", 10);
                    const specialties = activeProfile.specialties || (selectedItem?.category ? [selectedItem.category] : ["Electricista"]);

                    return (
                      <div className="flex flex-col gap-8 text-left">
                        {/* Name, Rating and Budget */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-3xl font-bold text-text-main font-manrope">{activeProfile.displayName}</h2>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center gap-1 text-yellow-500 font-bold font-inter">
                                 <Star size={16} className={ratingVal > 0 ? "fill-yellow-500 text-yellow-500" : "text-gray-300 dark:text-gray-750"} />
                                 <span>{ratingVal > 0 ? ratingVal.toFixed(1) : "Sin calificación"}</span>
                              </div>
                              <span className="text-text-muted font-bold opacity-30">|</span>
                              <span className="text-text-muted font-bold text-sm tracking-wide uppercase font-inter">{jobsCount} Trabajos</span>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 font-inter">Presupuesto</p>
                             <p className="text-2xl font-bold text-primary font-manrope">{selectedItem?.price || 'Precio a convenir'}</p>
                          </div>
                        </div>

                        {/* Verification Badges */}
                        <div className="flex flex-wrap gap-2.5 bg-gray-50 dark:bg-[#151515] p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-inner">
                           <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                             <ShieldCheck size={16} />
                             <span>Identidad Verificada</span>
                           </div>
                           <span className="text-gray-300 dark:text-gray-800">|</span>
                           <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                             <CheckCircle size={16} />
                             <span>{activeProfile.antecedentes_ok || activeProfile.antecedentes_url ? "Antecedentes OK" : "Sin Antecedentes"}</span>
                           </div>
                           {isPremiumPro && (
                             <>
                               <span className="text-gray-300 dark:text-gray-800">|</span>
                               <div className="flex items-center gap-2 text-xs font-bold text-yellow-600 dark:text-yellow-500">
                                 <Crown size={14} className="fill-yellow-500" />
                                 <span>Especialista Elite</span>
                               </div>
                             </>
                           )}
                        </div>

                        {/* Biography */}
                        <div>
                           <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3">Biografía</h4>
                           <p className="text-text-main opacity-80 leading-relaxed font-semibold">
                             {activeProfile.bio || "Especialista certificado con amplia experiencia en el rubro. Comprometido con la calidad y la puntualidad en cada servicio realizado."}
                           </p>
                        </div>

                        {/* Specialties */}
                        <div>
                           <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Especialidades</h4>
                           <div className="flex flex-col gap-3">
                              {specialties.map((s: string, idx: number) => {
                                const cred = activeProfile.professionCredentials?.[s] || (activeProfile.credentials?.length > 0 ? { type: 'Matrícula', number: activeProfile.credentials[0] } : { type: 'Matrícula', number: 'Matrícula Verificada' });
                                const hasCred = cred && cred.type;
                                const isPremium = activeProfile.premium_status === 'active' || activeProfile.is_premium || activeProfile.role === 'premium';
                                
                                const specialtyReviews = (activeProfile.reviews || []).filter((r: any) => {
                                  if (r.category && r.category.toLowerCase() === s.toLowerCase()) return true;
                                  const comment = (r.comment || r.review || "").toLowerCase();
                                  const specialtyLower = s.toLowerCase();
                                  if (comment.includes(specialtyLower)) return true;
                                  if (specialtyLower === 'electricista' && (comment.includes('electr') || comment.includes('luz') || comment.includes('cable') || comment.includes('enchufe') || comment.includes('tabler'))) return true;
                                  if (specialtyLower === 'plomero' && (comment.includes('plom') || comment.includes('agua') || comment.includes('caño') || comment.includes('bomba') || comment.includes('pérdida') || comment.includes('grifería'))) return true;
                                  if (specialtyLower === 'gasista' && (comment.includes('gas') || comment.includes('estufa') || comment.includes('cocina') || comment.includes('calor'))) return true;
                                  if (specialtyLower === 'albañil' && (comment.includes('albañ') || comment.includes('pared') || comment.includes('cemento') || comment.includes('revoque'))) return true;
                                  return false;
                                });

                                const specialtyRating = specialtyReviews.length > 0
                                  ? Number((specialtyReviews.reduce((acc: number, curr: any) => acc + (curr.rating || 0), 0) / specialtyReviews.length).toFixed(1))
                                  : null;

                                const isClientPremium = user?.role === 'premium' || user?.premium_status === 'active' || user?.is_premium;
                                
                                return (
                                  <div key={idx} className="p-4 bg-bg-secondary border border-gray-150 dark:border-gray-800 rounded-2xl flex flex-col gap-2.5 shadow-sm">
                                    <div className="flex justify-between items-center">
                                      <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-black border border-primary/10 uppercase tracking-widest font-inter">
                                        {s}
                                      </span>
                                      {hasCred && (
                                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/10 uppercase tracking-wide flex items-center gap-1 animate-pulse font-inter">
                                          <CheckCircle size={10} /> Validado
                                        </span>
                                      )}
                                    </div>

                                    {hasCred && (
                                      <div className="mt-1 pb-1 border-t border-dashed border-gray-100 dark:border-gray-800 pt-2.5">
                                        <div className="flex flex-col gap-2">
                                          <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-text-main flex items-center gap-1.5">
                                              <span className="text-emerald-500 font-black">✓</span> {cred.type}: <span className="font-semibold text-text-muted">{cred.number || 'Matrícula Verificada'}</span>
                                            </span>
                                            {cred.image && (
                                              <button 
                                                onClick={() => {
                                                  setLightboxUrl(cred.image);
                                                  setLightboxTitle(`${s} - ${cred.type}`);
                                                }}
                                                className="text-primary hover:underline font-black text-[11px] uppercase tracking-wider font-inter"
                                              >
                                                Ver Certificado
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Puntuación y Comentarios por Oficio (Premium Only) */}
                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/80">
                                      {isClientPremium ? (
                                        <div className="flex flex-col gap-2">
                                          <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase text-text-muted tracking-wider font-inter">Puntuación de {s}</span>
                                            <div className="flex items-center gap-1 font-inter">
                                              <Star size={12} className={specialtyRating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"} />
                                              <span className="text-xs font-black text-text-main">
                                                {specialtyRating !== null ? `${specialtyRating.toFixed(1)} (${specialtyReviews.length} trabajos)` : 'Sin calificación (0 trabajos)'}
                                              </span>
                                            </div>
                                          </div>
                                          
                                          {specialtyReviews.length > 0 ? (
                                            <div className="bg-bg-primary/40 dark:bg-[#111112]/40 rounded-xl p-3 border border-gray-100/30 dark:border-gray-800/20 max-h-[120px] overflow-y-auto no-scrollbar flex flex-col gap-2.5">
                                              {specialtyReviews.slice(0, 2).map((sr: any, sIdx: number) => (
                                                <div key={sIdx} className="flex flex-col gap-0.5 text-left">
                                                  <div className="flex justify-between items-center font-inter">
                                                    <span className="text-[10px] font-extrabold text-text-main">{sr.user || sr.clientName}</span>
                                                    <div className="flex gap-0.5">
                                                      {[...Array(5)].map((_, starIdx) => (
                                                        <Star key={starIdx} size={8} className={starIdx < (sr.rating || 0) ? "fill-yellow-500 text-yellow-500" : "text-gray-200 dark:text-gray-800"} />
                                                      ))}
                                                    </div>
                                                  </div>
                                                  <p className="text-[10px] text-text-muted italic leading-normal">"{sr.comment || sr.review}"</p>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <div className="p-3 bg-gray-50/50 dark:bg-bg-primary/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-800/60 text-center">
                                               <p className="text-[10px] text-text-muted font-bold font-inter">No hay comentarios previos para el oficio {s}.</p>
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="p-3.5 bg-[#4F46E5]/5 dark:bg-[#4F46E5]/10 rounded-[18px] border border-[#4F46E5]/10 flex flex-col gap-2 text-left">
                                          <div className="flex items-start gap-2">
                                            <Crown size={14} className="text-primary shrink-0 mt-0.5 fill-primary" />
                                            <div>
                                              <h5 className="text-[10px] font-black text-primary uppercase tracking-wider mb-0.5 font-inter">Membresía Premium Requerida</h5>
                                              <p className="text-[10px] text-text-muted leading-relaxed font-semibold">
                                                 Ver calificaciones específicas para {s}, histórico de trabajos y comentarios de clientes.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                           </div>
                        </div>

                        {/* Logros */}
                        <div>
                           <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3">Logros</h4>
                           {(() => {
                             const lList = [];
                             
                             // 1. Level based on real formula
                             const totalPoints = isPremiumPro ? Math.max(jobsCount * 150, 6000) : jobsCount * 150;
                             let levelLabel = "Bronce";
                             if (totalPoints >= 6000 || isPremiumPro) {
                               levelLabel = "Diamante";
                             } else if (totalPoints >= 3001) {
                               levelLabel = "Platino";
                             } else if (totalPoints >= 1501) {
                               levelLabel = "Oro";
                             } else if (totalPoints >= 501) {
                               levelLabel = "Plata";
                             }
                             lList.push({ icon: "🏆", label: `Nivel ${levelLabel}` });

                             // 2. High rating achievement
                             if (ratingVal >= 4.8 && jobsCount > 0) {
                               lList.push({ icon: "⭐", label: "Top Rated" });
                             } else if (ratingVal >= 4.5 && jobsCount > 0) {
                               lList.push({ icon: "🤝", label: "Recomendado" });
                             }

                             // 3. Experience achievement
                             if (expYears >= 5) {
                               lList.push({ icon: "⚡", label: "Veterano" });
                             } else if (expYears > 1) {
                               lList.push({ icon: "🔧", label: "Experto" });
                             }

                             // 4. Job milestones
                             if (jobsCount >= 50) {
                               lList.push({ icon: "👑", label: "Leyenda" });
                             } else if (jobsCount >= 10) {
                               lList.push({ icon: "🎖️", label: "Pro Activo" });
                             } else if (jobsCount > 0) {
                               lList.push({ icon: "✅", label: "Confiable" });
                             }

                             if (isPremiumPro) {
                               lList.push({ icon: "👑", label: "MIEMBRO ELITE" });
                             }

                             if (lList.length < 2) {
                               lList.push({ icon: "🤝", label: "Confiable" });
                               lList.push({ icon: "⚡", label: "Rápido" });
                             }

                             return (
                               <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                 {lList.map((l, lIdx) => (
                                   <div
                                     key={lIdx}
                                     className="px-4 py-3 bg-white dark:bg-bg-primary rounded-[20px] border border-black/5 shadow-soft flex flex-col items-center gap-1 shrink-0 animate-in fade-in zoom-in duration-300"
                                   >
                                     <span className="text-xl">{l.icon}</span>
                                     <span className="text-[8px] font-black uppercase tracking-widest text-text-muted font-inter">
                                       {l.label}
                                     </span>
                                   </div>
                                 ))}
                               </div>
                             );
                           })()}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="p-8 pt-4 bg-white dark:bg-bg-primary shrink-0 border-t border-black/5">
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setSelectedItem(null);
                    if (onNavigateToChat) onNavigateToChat(selectedItem);
                  }}
                  className="w-full h-16 bg-primary text-white rounded-3xl font-black shadow-premium active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <MessageSquare
                    size={20}
                    fill="currentColor"
                    className="opacity-20"
                  />
                  Contactar para nuevo trabajo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Image Preview Modal */}
      <AnimatePresence>
        {lightboxUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxUrl(null)}
          >
            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setLightboxUrl(null)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-[20px] bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all shadow-lg border border-white/10 z-[2100]"
            >
              <X size={24} />
            </button>

            {/* Header Title */}
            <div className="absolute top-6 left-6 text-white text-left z-[2100] pointer-events-none select-none">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Visor de Evidencia</p>
              <h3 className="text-base font-black tracking-tight font-manrope">{lightboxTitle}</h3>
            </div>

            {/* Main Image */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-xl max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center bg-black/20"
              onClick={(e) => e.stopPropagation()} // Prevent closing when tapping the image
            >
              <img 
                src={lightboxUrl} 
                alt={lightboxTitle} 
                className="max-w-full max-h-[70vh] object-contain rounded-2xl" 
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <p className="text-white/40 text-[10px] font-black mt-4 uppercase tracking-widest pointer-events-none select-none">Toca afuera para cerrar</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Chat Fullscreen Overlays */}
      <AnimatePresence>
        {showSupportChat && (
          <SupportChat
            onClose={() => setShowSupportChat(false)}
            predefinedTopic={supportChatTopic}
            predefinedJobId={selectedItem?.id}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
