import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Search, 
  MapPin, 
  Bell, 
  User as UserIcon, 
  Zap, 
  Droplets, 
  Hammer, 
  Palette, 
  Sparkles, 
  Leaf, 
  Snowflake, 
  Truck, 
  Star, 
  ChevronRight,
  TrendingUp,
  Gift,
  X,
  Trash2,
  CheckCircle,
  ShieldAlert,
  MessageCircle,
  Loader2,
  Flame,
  Key,
  Scissors,
  ShieldCheck,
  Clock,
  Navigation,
  Banknote,
  Repeat,
  Crown,
  Copy,
  Upload,
  FileText
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  useMap, 
  useMapEvents 
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { analyzeProblemImage, analyzeProblemText } from '../services/geminiService';
import { useAuth } from '../services/authService';
import { useTheme } from '../services/themeService';
import { useConfig } from '../services/configService';
import { useFormState } from '../services/formService';
import { db, handleFirestoreError } from '../lib/firebase';
import { compressImage } from '../lib/imageCompressor';
import { collection, addDoc, Timestamp, query, where, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, getDocs, deleteDoc } from 'firebase/firestore';
import SupportChat from './SupportChat';

const CATEGORIES = [
  { id: 'electricity', name: 'Electricista', icon: Zap, color: 'bg-yellow-100/70 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400', shadow: 'shadow-yellow-100' },
  { id: 'plumbing', name: 'Plomero', icon: Droplets, color: 'bg-blue-100/70 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400', shadow: 'shadow-blue-100' },
  { id: 'gas', name: 'Gasista', icon: Flame, color: 'bg-red-100/70 text-red-700 dark:bg-red-500/15 dark:text-red-400', shadow: 'shadow-red-100' },
  { id: 'masonry', name: 'Albañil', icon: Hammer, color: 'bg-orange-100/70 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400', shadow: 'shadow-orange-100' },
  { id: 'painting', name: 'Pintor', icon: Palette, color: 'bg-purple-100/70 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400', shadow: 'shadow-purple-100' },
  { id: 'locksmith', name: 'Cerrajero', icon: Key, color: 'bg-gray-200 text-gray-800 dark:bg-gray-500/15 dark:text-gray-400', shadow: 'shadow-gray-100' },
  { id: 'carpentry', name: 'Carpintero', icon: Scissors, color: 'bg-amber-100/70 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400', shadow: 'shadow-amber-100' },
  { id: 'ac', name: 'Técnico de Aire Acondicionado / Climatización', icon: Snowflake, color: 'bg-indigo-100/70 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400', shadow: 'shadow-indigo-100' },
  { id: 'herrero', name: 'Herrero', icon: Hammer, color: 'bg-emerald-100/70 text-emerald-705 dark:bg-emerald-500/15 dark:text-emerald-400', shadow: 'shadow-emerald-100' },
  { id: 'durlero', name: 'Durlero / Yesero', icon: Hammer, color: 'bg-teal-100/70 text-teal-705 dark:bg-teal-500/15 dark:text-teal-400', shadow: 'shadow-teal-100' },
  { id: 'techista', name: 'Techista / Impermeabilizaciones', icon: ShieldCheck, color: 'bg-indigo-100/70 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400', shadow: 'shadow-indigo-100' },
  { id: 'jardinero', name: 'Jardinero', icon: Leaf, color: 'bg-green-100/70 text-green-700 dark:bg-green-500/15 dark:text-green-400', shadow: 'shadow-green-100' },
  { id: 'vidriero', name: 'Vidriero', icon: Sparkles, color: 'bg-cyan-100/70 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400', shadow: 'shadow-cyan-100' },
  { id: 'limpieza', name: 'Limpieza de Consorcios y Edificios', icon: Droplets, color: 'bg-slate-200 text-slate-800 dark:bg-slate-500/15 dark:text-slate-400', shadow: 'shadow-slate-100' },
  { id: 'pocero', name: 'Pocero / Desagotes', icon: Flame, color: 'bg-rose-100/70 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400', shadow: 'shadow-rose-100' },
];

const RECOMMENDED_PROS = [
  { 
    id: 1, 
    name: 'Carlos López', 
    rating: 4.8, 
    jobs: 124, 
    distance: '1.2 km', 
    price: '$15.000', 
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=60&w=100&h=100',
    specialties: ['Instalaciones eléctricas', 'Reparación de tableros', 'Iluminación LED'],
    references: [
      { user: 'Juan P.', comment: 'Excelente trabajo, muy puntual y profesional.', rating: 5 },
      { user: 'María G.', comment: 'Reparó un cortocircuito rápidamente. Recomendado.', rating: 4 }
    ],
    bio: 'Más de 10 años de experiencia en el rubro eléctrico. Especialista en instalaciones residenciales y comerciales.'
  },
  { 
    id: 2, 
    name: 'Ana Martínez', 
    rating: 4.9, 
    jobs: 89, 
    distance: '2.5 km', 
    price: '$12.000', 
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=100&h=100',
    specialties: ['Limpieza profunda', 'Mantenimiento de oficinas', 'Limpieza post-obra'],
    references: [
      { user: 'Pedro S.', comment: 'Muy detallista, dejó todo impecable.', rating: 5 }
    ],
    bio: 'Especialista en limpieza profesional con productos eco-friendly.'
  },
  { 
    id: 3, 
    name: 'Roberto Díaz', 
    rating: 4.7, 
    jobs: 210, 
    distance: '3.1 km', 
    price: '$18.000', 
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=60&w=100&h=100',
    specialties: ['Pintura interior', 'Revestimientos', 'Impermeabilización'],
    references: [
      { user: 'Laura M.', comment: 'Pintó toda mi casa en 3 días. Muy conforme.', rating: 5 }
    ],
    bio: 'Pintor profesional con amplia trayectoria en edificios y casas particulares.'
  },
];

const MOCK_NOTIFICATIONS: any[] = [];

// Custom marker icon
const customIcon = L.divIcon({
  html: `<div class="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-premium flex items-center justify-center">
          <div class="w-2 h-2 bg-white rounded-full"></div>
         </div>`,
  className: 'custom-map-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function MapPickerEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const map = useMapEvents({
    click(e) {
      map.flyTo(e.latlng, map.getZoom());
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
    moveend() {
      const center = map.getCenter();
      onLocationSelect(center.lat, center.lng);
    }
  });
  return null;
}

const DEFAULT_CENTER: [number, number] = [-31.4167, -64.1833];

function RecenterMap({ location }: { location: { lat: number, lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      const currentCenter = map.getCenter();
      const diffLat = Math.abs(currentCenter.lat - location.lat);
      const diffLng = Math.abs(currentCenter.lng - location.lng);
      // Only set the map view if the coordinate difference is significant (e.g. from search/GPS)
      // to completely prevent the recursive moveend state rendering loop.
      if (diffLat > 0.00005 || diffLng > 0.00005) {
        map.setView([location.lat, location.lng], map.getZoom());
      }
    }
  }, [location, map]);
  return null;
}

export default function ReportProblem({ onProfileClick, onSuccess }: { onProfileClick?: () => void, onSuccess?: () => void }) {
  const { user, garantias_disponibles } = useAuth();
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { formState, updateFormState, resetForm } = useFormState();
  
  const [selectedTaxFilter, setSelectedTaxFilter] = useState<'sin_iva' | 'con_iva'>('sin_iva');
  const [selectedTierFilter, setSelectedTierFilter] = useState<'basic' | 'premium'>(
    user?.role === 'premium' || user?.is_premium ? 'premium' : 'basic'
  );

  useEffect(() => {
    if (user) {
      setSelectedTierFilter(user.role === 'premium' || user.is_premium ? 'premium' : 'basic');
    }
  }, [user]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancingDescription, setIsEnhancingDescription] = useState(false);

  const handleAnalyzeText = async () => {
    if (!details.trim()) return;
    setIsEnhancingDescription(true);
    try {
      const currentCatName = CATEGORIES.find(c => c.id === selectedCategory)?.name || 'General';
      const result = await analyzeProblemText(details, currentCatName);
      
      const categoryMapping: Record<string, string> = {
        'Electricista': 'electricity',
        'Plomero': 'plumbing',
        'Gasista': 'gas',
        'Albañil': 'masonry',
        'Pintor': 'painting',
        'Cerrajero': 'locksmith',
      };
      const matchedId = result.category ? categoryMapping[result.category] : null;

      setAnalysisResult({
        category: matchedId,
        urgency: result.urgency || "Media",
        slangDescription: result.slangDescription || "",
        description: result.description,
        estimatedPrice: result.estimatedPrice,
        numericBasePrice: result.numericBasePrice,
        breakdowns: result.breakdowns
      });
      
      if (matchedId) {
        setSelectedCategory(matchedId);
      }
      
    } catch (err) {
      console.error("Error analyzing text with Gemini:", err);
    } finally {
      setIsEnhancingDescription(false);
    }
  };

  const [isScanning, setIsScanning] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  const lastGeocodeRef = useRef<number>(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotificationsList, setShowNotificationsList] = useState(false);
  const [deletedNotifIds, setDeletedNotifIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('deletedNotifIds_client') || '[]');
    } catch {
      return [];
    }
  });

  const handleDeleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = [...deletedNotifIds, id];
    setDeletedNotifIds(updated);
    localStorage.setItem('deletedNotifIds_client', JSON.stringify(updated));

    if (!id.startsWith('notif-p')) {
      try {
        await deleteDoc(doc(db, 'notifications', id));
      } catch (err) {
        console.error("Error deleting notification:", err);
      }
    }
  };

  const handleClearAllNotifications = async () => {
    const allIds = notifications.map(n => n.id);
    const updated = Array.from(new Set([...deletedNotifIds, ...allIds]));
    setDeletedNotifIds(updated);
    localStorage.setItem('deletedNotifIds_client', JSON.stringify(updated));

    const realIds = allIds.filter(id => !id.startsWith('notif-p'));
    if (realIds.length > 0) {
      try {
        for (const rId of realIds) {
          await deleteDoc(doc(db, 'notifications', rId));
        }
      } catch (err) {
        console.error("Error clearing notifications:", err);
      }
    }
  };
  const [selectedPro, setSelectedPro] = useState<any | null>(null);
  const [selectedProReviews, setSelectedProReviews] = useState<any[]>([]);
  const [activeCertPreview, setActiveCertPreview] = useState<{ title: string, image: string } | null>(null);
  const [showPremiumSuccess, setShowPremiumSuccess] = useState(false);
  const [showPremiumActivationModal, setShowPremiumActivationModal] = useState(false);
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHireSuccess, setShowHireSuccess] = useState(false);
  const [isHiring, setIsHiring] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapSearch, setMapSearch] = useState("");
  const [buscandoJobId, setBuscandoJobId] = useState<string | null>(null);
  const [buscandoJobAccepted, setBuscandoJobAccepted] = useState(false);
  const [hiredPros, setHiredPros] = useState<string[]>([]);
  const [recommendedPros, setRecommendedPros] = useState<any[]>([]);
  const [recentServices, setRecentServices] = useState<any[]>([]);
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedPro) {
      setSelectedProReviews([]);
      return;
    }
    const fetchReviews = async () => {
      try {
        const qReviews = query(
          collection(db, 'reviews'),
          where('professionalId', '==', selectedPro.id)
        );
        const qsReviews = await getDocs(qReviews);
        const reviews = qsReviews.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        reviews.sort((a: any, b: any) => {
          const t1 = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt || 0);
          const t2 = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt || 0);
          return t2 - t1;
        });
        setSelectedProReviews(reviews);
      } catch (err) {
        console.error('Error fetching reviews for pro:', err);
      }
    };
    fetchReviews();
  }, [selectedPro]);

  const combinedReviews = React.useMemo(() => {
    const dbReviews = selectedProReviews || [];
    const staticReviews = selectedPro?.references || [];
    
    const combined = [...dbReviews];
    const seenJobs = new Set(dbReviews.map((r: any) => r.jobId).filter(Boolean));
    
    for (const sr of staticReviews) {
      if (!sr.jobId || !seenJobs.has(sr.jobId)) {
        combined.push(sr);
      }
    }
    return combined;
  }, [selectedProReviews, selectedPro]);

  const averageRating = React.useMemo(() => {
    if (!combinedReviews || combinedReviews.length === 0) return null;
    const sum = combinedReviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
    return Number((sum / combinedReviews.length).toFixed(1));
  }, [combinedReviews]);

  const totalJobsCount = React.useMemo(() => {
    if (!selectedPro) return 0;
    return Math.max(selectedPro.jobs || 0, combinedReviews.length);
  }, [selectedPro, combinedReviews]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        if (!user) return;
        const qJobs = query(collection(db, 'jobs'), where('clientId', '==', user.uid), where('status', '==', 'completed'));
        const qsJobs = await getDocs(qJobs);
        const fetchedJobs = qsJobs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentServices(fetchedJobs);
      } catch(e) {}
    };
    fetchRecent();
  }, [user]);

  useEffect(() => {
    const fetchPros = async () => {
      try {
        const q = query(collection(db, 'users'), where('role', '==', 'professional'));
        const qs = await getDocs(q);
        const dbPros = qs.docs
          .map(d => ({ id: d.id, ...(d.data() as any) }))
          .filter((d: any) => !d.is_blocked) // Filter out blocked professionals
          .map((data: any) => {
            return {
              id: data.id,
              name: data.displayName,
            rating: (data.reviewCount && data.reviewCount > 0) ? (data.rating || 5.0) : (data.references && data.references.length > 0 ? (data.rating || 5.0) : null),
            jobs: data.reviewCount || 0,
            distance: '1.0 km', // Mock distance
            price: data.price || 'Precio a convenir',
            photo: data.photoURL || 'https://picsum.photos/seed/user/200/200',
            specialties: data.professions || ['Profesional'],
            references: data.references || [],
            bio: data.bio || 'Profesional de Servicios Pro',
            is_premium: data.is_premium,
            ...data
          };
        });

        const combinedWithStatic = [...dbPros];
        
        RECOMMENDED_PROS.forEach(staticPro => {
          if (!combinedWithStatic.some((p: any) => p.name === staticPro.name)) {
            combinedWithStatic.push({
              ...staticPro,
              is_premium: staticPro.id === 1 // Mark Carlos as premium as a visual reference
            });
          }
        });

        combinedWithStatic.sort((a: any, b: any) => {
          const aPremium = a.is_premium || a.premium_status === 'active';
          const bPremium = b.is_premium || b.premium_status === 'active';
          if (aPremium && !bPremium) return -1;
          if (!aPremium && bPremium) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });

        setRecommendedPros(combinedWithStatic);
      } catch (err) {
        console.error('Error fetching pros', err);
      }
    };
    fetchPros();
  }, []);

  // Listen for job accepted status
  useEffect(() => {
    if (!buscandoJobId) return;
    const unsub = onSnapshot(doc(db, 'jobs', buscandoJobId), (docSnap) => {
      if (docSnap.exists() && docSnap.data().status === 'accepted') {
        setBuscandoJobAccepted(true);
      }
    });
    return () => unsub();
  }, [buscandoJobId]);

  // Listen for notifications
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
            id: 'notif-p1',
            title: '🚚 Especialista en camino',
            description: 'Marcelo G. (Plomero) inició su recorrido hacia tu dirección.',
            time: 'Hace 5 min',
            type: 'success'
          },
          {
            id: 'notif-p2',
            title: '🧾 Factura #FC-1903 generada',
            description: 'Servicio de Electricidad finalizado. Descarga el comprobante en tu Historial.',
            time: 'Hace 2 h',
            type: 'invoice'
          },
          {
            id: 'notif-p3',
            title: '🛡️ Identidad validada',
            description: 'Tu perfil personal ha sido validado correctamente bajo normas de seguridad Pro.',
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

  // Map state to local variables for convenience from formState
  const { 
    selectedCategory, 
    photoPreview, 
    photoMimeType, 
    details, 
    address, 
    location, 
    priority, 
    paymentMethods,
    timeframe,
    analysisResult 
  } = formState;

  const setSelectedCategory = (val: string | null) => updateFormState({ selectedCategory: val });
  const setPhotoPreview = (val: string | null) => updateFormState({ photoPreview: val });
  const setPhotoMimeType = (val: string) => updateFormState({ photoMimeType: val });
  const setDetails = (val: string) => updateFormState({ details: val });
  const setAddress = (val: string) => updateFormState({ address: val });
  const setLocation = (val: {lat: number, lng: number} | null) => updateFormState({ location: val });
  const setPriority = (val: 'normal' | 'urgent' | null) => updateFormState({ priority: val });
  const setPaymentMethods = (val: string[]) => updateFormState({ paymentMethods: val });
  const setTimeframe = (val: string) => updateFormState({ timeframe: val });
  const setAnalysisResult = (val: any) => updateFormState({ analysisResult: val });

  const [customBudgetDisplayValue, setCustomBudgetDisplayValue] = useState<string>('');

  // Synchronize custom budget input when analysisResult changes (e.g. from AI scan)
  useEffect(() => {
    if (analysisResult?.numericBasePrice) {
      setCustomBudgetDisplayValue(new Intl.NumberFormat('es-AR').format(analysisResult.numericBasePrice));
    } else {
      setCustomBudgetDisplayValue('');
    }
  }, [analysisResult?.numericBasePrice]);

  const handleBasePriceChange = (price: number) => {
    if (price <= 0) {
      setAnalysisResult(null);
      return;
    }
    const currentCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Servicio';
    
    if (analysisResult) {
      setAnalysisResult({
        ...analysisResult,
        numericBasePrice: price,
        estimatedPrice: `$${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(price)} ARS`
      });
    } else {
      setAnalysisResult({
        category: currentCategoryName,
        matchedId: selectedCategory,
        urgency: priority === 'urgent' ? 'Alta - Urgente' : 'Media',
        slangDescription: details || '',
        description: 'Presupuesto ingresado manualmente por el cliente.',
        estimatedPrice: `$${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(price)} ARS`,
        numericBasePrice: price,
        breakdowns: {} // Fallback structured values filled reactively
      });
    }
  };

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      if (data && data.display_name) {
        return data.display_name;
      }
      return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
    } catch (error) {
      console.error("Geocoding error:", error);
      return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
    }
  };

  const startWatchingLocation = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    setIsWatching(true);
    setIsGettingLocation(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Update marker immediately
        setLocation({ lat, lng });
        setIsGettingLocation(false);

        // Throttle geocoding to once every 10 seconds to avoid API spam
        const now = Date.now();
        if (now - lastGeocodeRef.current > 10000) {
          lastGeocodeRef.current = now;
          const addr = await fetchAddress(lat, lng);
          setAddress(addr);
        }
      },
      (error) => {
        console.error("Location watch error:", error);
        setIsWatching(false);
        setIsGettingLocation(false);
        // Only alert if it's a permission or position error, not a timeout
        if (error.code !== error.TIMEOUT) {
          alert("Error al rastrear ubicación. Asegúrate de dar permisos de geolocalización.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const stopWatchingLocation = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsWatching(false);
  };

  const getCurrentLocation = () => {
    // If already watching, this button stops it
    if (isWatching) {
      stopWatchingLocation();
      return;
    }

    setIsGettingLocation(true);
    
    const fallbackLocation = { lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] };

    const successHandler = async (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      setLocation({ lat, lng });
      setIsGettingLocation(false);
      
      const addr = await fetchAddress(lat, lng);
      if (addr) {
        setAddress(addr);
      }
    };

    const errorHandler = async (error: GeolocationPositionError) => {
      console.warn("Geolocation tracking failed. Falling back to default center.", error);
      setIsGettingLocation(false);
      setLocation(fallbackLocation);
      const addr = await fetchAddress(fallbackLocation.lat, fallbackLocation.lng);
      if (addr) {
        setAddress(addr);
      }
      alert("No se pudo obtener la ubicación GPS en tiempo real. Se utilizará la ubicación por defecto (Córdoba). Asegúrate de otorgar permisos de geolocalización.");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successHandler,
        (err) => {
          console.warn("High accuracy geolocation timed out/failed, trying with low accuracy fallback:", err);
          navigator.geolocation.getCurrentPosition(
            successHandler,
            errorHandler,
            { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
          );
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setIsGettingLocation(false);
      alert("La geolocalización no está soportada por tu navegador.");
    }
  };

  // Cleanup on unmount and reset on mount/returning to Inicio
  useEffect(() => {
    // Reset form and search states on component mount so returning to Inicio always allows starting a new request
    resetForm();
    setBuscandoJobId(null);
    setBuscandoJobAccepted(false);

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Handle visibility changes (putting the app in the background and returning)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && buscandoJobId) {
        setBuscandoJobId(null);
        resetForm();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [buscandoJobId]);

  const handleMapSearch = async () => {
    if (!mapSearch) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapSearch)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const first = data[0];
        const lat = parseFloat(first.lat);
        const lng = parseFloat(first.lon);
        setLocation({ lat, lng });
        setAddress(first.display_name);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handlePublishRequest = async () => {
    if (!user) {
      alert("Por favor iniciá sesión para publicar una solicitud.");
      return;
    }

    if (!selectedCategory || !details) {
      alert("Por favor selecciona una categoría y describe el problema.");
      return;
    }

    if (!location || !location.lat || !location.lng || !address || address.length < 5 || address === "Ubicación no especificada") {
      alert("Por favor, ingresá una dirección válida y asegurate de que la ubicación esté marcada en el mapa (usá el botón de GPS para mayor precisión).");
      return;
    }

    setIsHiring(true);
    try {
      const jobData: any = {
        clientId: user.uid,
        clientName: user.displayName || 'Cliente',
        clientAvatar: user.photoURL || '',
        category: CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Servicio',
        description: details,
        status: 'pending',
        urgent: priority === 'urgent',
        paymentMethods: paymentMethods || ['Efectivo'],
        timeframe: timeframe || 'En el día',
        location: {
          address: address || 'Ubicación no especificada',
          lat: location?.lat || -31.4167, // Córdoba fallback
          lng: location?.lng || -64.1833
        },
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      };
      if (photoPreview) {
        jobData.image = photoPreview;
      }
      
      if (analysisResult?.numericBasePrice) {
        jobData.price = `$${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(analysisResult.numericBasePrice)} ARS`;
        jobData.clientIsPremium = selectedTierFilter === 'premium';
        jobData.proTaxStatus = selectedTaxFilter;
        jobData.numericBasePrice = analysisResult.numericBasePrice;
      }

      const jobRef = await addDoc(collection(db, 'jobs'), jobData);
      
      setBuscandoJobId(jobRef.id);
      setBuscandoJobAccepted(false);
      
      // Reset form (conditionally, or maybe wait until accepted)
      // resetForm();
    } catch (error) {
      handleFirestoreError(error, 'create', 'jobs');
      alert("Hubo un error al publicar tu solicitud.");
    } finally {
      setIsHiring(false);
    }
  };

  const handleHire = async (pro: any) => {
    if (!user) {
      alert("Por favor iniciá sesión para contratar un profesional.");
      return;
    }
    const proId = pro.id?.toString() || 'anonymous-pro';

    if (hiredPros.includes(proId)) {
      alert("Ya solicitaste a este profesional. Puedes verlo en tu historial.");
      return;
    }

    setIsHiring(true);
    try {
      const jobRef = await addDoc(collection(db, 'jobs'), {
        clientId: user.uid,
        clientName: user.displayName || 'Cliente',
        clientAvatar: user.photoURL || '',
        professionalId: proId,
        professionalName: pro.name,
        professionalAvatar: pro.photo,
        category: CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Servicio Express',
        description: details || 'Solicitud de servicio analizada por IA',
        price: pro.price,
        image: photoPreview || '',
        paymentMethods: paymentMethods || ['Efectivo'],
        status: 'pending',
        location: {
          address: 'Ubicación actual del cliente'
        },
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      });

      // Also create a notification for the professional
      await addDoc(collection(db, 'notifications'), {
        recipientId: proId,
        title: '¡Nueva solicitud de contratación!',
        description: `${user.displayName || 'Un cliente'} te quiere contratar para ${CATEGORIES.find(c => c.id === selectedCategory)?.name || 'un servicio'}.`,
        type: 'hire_request',
        jobId: jobRef.id,
        senderId: user.uid,
        read: false,
        createdAt: serverTimestamp()
      });
      
      setHiredPros(prev => [...prev, proId]);
      setShowHireSuccess(true);
    } catch (error) {
      handleFirestoreError(error, 'create', 'jobs');
      alert("Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.");
    } finally {
      setIsHiring(false);
    }
  };

  const handleSearch = () => {
    // Scroll to specialists section when searching
    const specialistsSection = document.getElementById('specialists-section');
    specialistsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePhotoClick = () => {
    if (photoPreview && !isAnalyzing && !analysisResult && !isScanning) {
      startScanningFlow();
    } else {
      fileInputRef.current?.click();
    }
  };

  const startScanningFlow = async () => {
    setIsScanning(true);
    // Visual scanning effect duration
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsScanning(false);
    setShowPriorityModal(true);
  };

  const selectPriority = (type: 'normal' | 'urgent') => {
    setPriority(type);
    if (type === 'normal') {
      // Simulate demand logic
      const isHighDemand = Math.random() > 0.5;
      setEstimatedTime(isHighDemand ? "10 min" : "1 min");
      setShowPriorityModal(false);
      triggerAnalysis();
    } else {
      // Check subscription
      const isSubscribed = user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active';
      if (isSubscribed) {
        setEstimatedTime("Inmediato");
        setShowPriorityModal(false);
        triggerAnalysis();
      } else {
        setShowSubscriptionPrompt(true);
      }
    }
  };

  const triggerAnalysis = async () => {
    if (!photoPreview) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const base64Data = photoPreview.split(',')[1];
      const mimeType = photoMimeType; 

      const result = await analyzeProblemImage(base64Data, mimeType);
      const catMap: Record<string, string> = {
        'Electricista': 'electricity',
        'Plomero': 'plumbing',
        'Gasista': 'gas',
        'Albañil': 'masonry',
        'Albañilería': 'masonry',
        'Pintor': 'painting',
        'Pintura': 'painting',
        'Cerrajero': 'locksmith',
        'Carpintero': 'carpentry',
        'Climatización': 'ac',
        'Aire Acondicionado': 'ac',
        'Técnico de Aire Acondicionado / Climatización': 'ac',
        'Herrero': 'herrero',
        'Durlero / Yesero': 'durlero',
        'Techista / Impermeabilizaciones': 'techista',
        'Jardinero': 'jardinero',
        'Vidriero': 'vidriero',
        'Limpieza de Consorcios y Edificios': 'limpieza',
        'Pocero / Desagotes': 'pocero'
      };
      const matchedId = catMap[result.category] || null;
      
      setAnalysisResult({
        category: result.category,
        matchedId,
        urgency: result.urgency || "Media",
        slangDescription: result.slangDescription || "",
        description: result.description,
        estimatedPrice: result.estimatedPrice,
        numericBasePrice: result.numericBasePrice,
        breakdowns: result.breakdowns
      });
      
      if (matchedId) {
        setSelectedCategory(matchedId);
      }
      
      setDetails(result.slangDescription ? `${result.slangDescription} (${result.description})` : result.description);
    } catch (error) {
      console.error("Gemini analysis error:", error);
      alert("No se pudo analizar la foto automáticamente. Podés describir el problema de forma manual.");
    } finally {
      setIsAnalyzing(false);
    }
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
        
        // Scale down if larger than 800px on any side
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
        
        // Compress with WebP for smaller size
        const compressedBase64 = canvas.toDataURL('image/webp', 0.8);
        setPhotoPreview(compressedBase64);
        setPhotoMimeType('image/webp');
        setAnalysisResult(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };  
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] dark:bg-bg-secondary pb-32 font-sans selection:bg-primary selection:text-white relative overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl -ml-24"></div>

      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-bg-secondary/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/10 shadow-sm">
        {/* Left aligned logo as dominant element with section title underneath */}
        <div className="flex items-center gap-2 select-none filter drop-shadow-[0_1.5px_3.5px_rgba(0,82,255,0.18)]">
          <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <defs>
              <linearGradient id="qGradientHead_ReportProblem_Exact" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0052FF" />
                <stop offset="100%" stopColor="#00D8FF" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="32" stroke="url(#qGradientHead_ReportProblem_Exact)" strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M 68 68 L 84 84" stroke="url(#qGradientHead_ReportProblem_Exact)" strokeWidth="18" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight font-manrope text-slate-900 dark:text-white leading-none">
              Quick<span className="text-[#0052FF] dark:text-[#00D8FF]">Fix</span>
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#0052FF] dark:text-[#00D8FF] shrink-0">
                Perfil Cliente
              </span>
              <span className="text-[8px] text-slate-300 dark:text-slate-700 font-bold">•</span>
              <div className="flex items-center gap-1">
                <span className="block w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                <span className="text-[8px] font-black uppercase tracking-wider text-text-muted">
                  Córdoba Capital
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowNotificationsList(!showNotificationsList)}
            className={`relative w-12 h-12 rounded-[20px] flex items-center justify-center transition-all active:scale-95 group shadow-soft border ${
              showNotificationsList 
                ? 'bg-primary text-white border-primary shadow-md' 
                : 'bg-white dark:bg-bg-primary text-text-muted border-gray-100 dark:border-gray-800 hover:text-primary'
            }`}
          >
            <Bell size={22} className={showNotificationsList ? "fill-white/20" : "group-hover:rotate-12 transition-transform"} />
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-alert rounded-full border-2 border-white dark:border-bg-primary shadow-sm"></span>
          </button>
          <button 
            onClick={onProfileClick}
            className="w-12 h-12 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-primary to-secondary shadow-premium active:scale-95 transition-transform"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-bg-secondary border-2 border-white dark:border-bg-primary">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {user?.displayName?.charAt(0) || 'C'}
                </div>
              )}
            </div>
          </button>
        </div>

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
                  <h3 className="font-bold text-[#111111] dark:text-white">Notificaciones</h3>
                  {notifications.filter(n => !deletedNotifIds.includes(n.id)).length > 0 && (
                    <button 
                      onClick={handleClearAllNotifications}
                      className="text-[10.5px] text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-extrabold uppercase tracking-wider ml-1 px-1.5 py-0.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
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
                      <div className="flex gap-3 pr-7">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                          notif.type === 'invoice' ? 'bg-sky-500/10 text-sky-500' :
                          notif.type === 'security' ? 'bg-indigo-500/10 text-indigo-500' :
                          notif.type === 'hire_request' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                        }`}>
                          <Bell size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#111111] dark:text-white leading-tight break-words">{notif.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-words leading-snug">{notif.description}</p>
                          <p className="text-[10px] font-bold text-text-muted dark:text-gray-500 mt-1 uppercase tracking-wider">{notif.time}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={(e) => handleDeleteNotification(notif.id, e)}
                        className="absolute right-3 top-3.5 p-1 text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-all cursor-pointer opacity-80 hover:opacity-100"
                        title="Eliminar"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                      <Bell size={24} />
                    </div>
                    <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Sin notificaciones</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 px-5 pt-4 max-w-lg mx-auto w-full flex flex-col gap-5 sm:gap-6">
        {/* Personalized Greeting */}
        <section className="mb-1">
          <motion.h2 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="text-[26px] sm:text-4xl font-extrabold text-text-main tracking-tight font-manrope mb-0.5"
          >
            Hola, {user?.displayName?.split(' ')[0] || 'Catalina'}
          </motion.h2>
          <p className="text-[13px] font-medium text-text-muted">
            ¿Cómo podemos ayudarte hoy?
          </p>
        </section>

        {/* Map Picker Modal */}
        <AnimatePresence>
          {showMapPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-6"
            >
              <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#1C1C1E] w-full h-full sm:h-auto sm:max-w-2xl sm:rounded-[40px] flex flex-col overflow-hidden shadow-2xl"
              >
                <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-bold font-manrope">Seleccionar Ubicación</h3>
                  <button 
                    onClick={() => setShowMapPicker(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted hover:text-alert transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input 
                      type="text" 
                      value={mapSearch}
                      onChange={(e) => setMapSearch(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleMapSearch()}
                      placeholder="Buscar dirección (ej: Av. Colón 1000)"
                      className="w-full bg-bg-secondary rounded-2xl h-12 pl-12 pr-4 outline-none border border-transparent focus:border-primary/30 transition-all font-bold text-sm"
                    />
                  </div>
                  <button 
                    onClick={handleMapSearch}
                    className="bg-primary text-white px-6 rounded-2xl font-bold text-sm h-12 shadow-soft active:scale-95 transition-transform"
                  >
                    Buscar
                  </button>
                </div>

                <div className="relative flex-1 min-h-[400px]">
                  <MapContainer 
                    center={location ? [location.lat, location.lng] : DEFAULT_CENTER} 
                    zoom={15} 
                    className="w-full h-full"
                    zoomControl={false}
                    attributionControl={false}
                  >
                    <TileLayer
                      url={isDarkMode 
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      }
                    />
                    <RecenterMap location={location} />
                    <MapPickerEvents onLocationSelect={async (lat, lng) => {
                      // Note: We don't always need to fetch the address on every tiny movement, 
                      // but it'll be fine for now, we'll let it happen (the fetchAddress is cached or rate limited).
                      setLocation({ lat, lng });
                    }} />
                  </MapContainer>
                  
                  {/* Fixed Center Marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] z-[1000] pointer-events-none drop-shadow-2xl">
                    <div className="w-12 h-12 relative flex items-center justify-center">
                      {/* Inner Pin */}
                      <div className="w-8 h-8 bg-primary rounded-full border-[3px] border-white shadow-premium flex items-center justify-center relative z-10">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>
                      {/* Triangle Pointer */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45 border-r border-b border-white z-0"></div>
                      
                      {/* Pulse Effect */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/20 rounded-full animate-ping z-[-1]"></div>
                    </div>
                  </div>

                  {/* Floating Action Button inside Map */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1001] w-full px-6">
                    <button 
                      onClick={async () => {
                        if (location) {
                          const addr = await fetchAddress(location.lat, location.lng);
                          if (addr && addr !== 'Ubicación no especificada') {
                            setAddress(addr);
                          }
                        }
                        setShowMapPicker(false);
                      }}
                      className="w-full bg-primary text-white h-16 rounded-3xl font-bold shadow-premium active:scale-95 transition-transform flex items-center justify-center gap-3 border-2 border-white/20"
                    >
                      <CheckCircle size={22} />
                      Confirmar Ubicación
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar - Redesigned as Premium Component */}
        <section className="relative group z-10">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-text-muted">
            <Search size={22} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar plomero, electricista..."
            className="w-full h-14 pl-14 pr-16 bg-white dark:bg-bg-primary rounded-full shadow-sm hover:shadow-md focus:shadow-lg focus:shadow-primary/5 border border-gray-100 dark:border-gray-800 focus:border-primary/50 outline-none transition-all placeholder:text-text-muted/60 focus:placeholder-transparent text-text-main font-semibold text-[15px]"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 bg-primary text-white rounded-full font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
              >
                Buscar
              </motion.button>
            )}
          </AnimatePresence>
        </section>

        {/* Promotions Banner - Premium Flip Design */}
        <motion.section 
          whileHover={{ y: -4 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 shadow-md group cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="relative z-10 flex flex-col items-start h-full justify-between">
            <div>
              <div className="bg-white/20 backdrop-blur-md w-fit px-2.5 py-0.5 rounded-full text-white text-[9px] font-bold uppercase tracking-[0.2em] mb-2 border border-white/20">
                Puntos Pro x2
              </div>
              <h3 className="text-lg sm:text-[28px] font-bold text-white leading-tight font-manrope tracking-tight">Postulá tu primer<br />problema hoy</h3>
            </div>
            <button 
              onClick={() => setShowLearnMore(true)}
              className="mt-3 bg-white text-primary px-5 h-8 rounded-full text-xs font-bold shadow-sm active:scale-95 transition-all hover:bg-opacity-95"
            >
              Saber más
            </button>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-700">
             <Gift size={110} className="text-white" />
          </div>
        </motion.section>

        {/* Nuestros Servicios Populares - Horizontal Carousel */}
        <section>
          <div className="flex justify-between items-center mb-1 px-1">
            <h3 className="font-bold text-base text-text-main font-manrope font-extrabold">Nuestros Servicios Populares</h3>
            <button 
              onClick={() => setShowAllCategories(true)}
              className="text-primary text-[10px] font-bold uppercase tracking-widest hover:opacity-85 transition-all"
            >
              Explorar Todas
            </button>
          </div>
          <div className="profesiones-container hide-scrollbar -mx-6">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const reportSection = document.getElementById('report-section');
                  reportSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="profesion-card group"
              >
                <div className={`w-14 h-14 rounded-[20px] ${cat.color} flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-90 shadow-sm mx-auto`}>
                  <cat.icon size={24} className="shrink-0" />
                </div>
                <span className="text-[9px] font-extrabold text-text-muted uppercase tracking-wider block mt-1.5 truncate text-center w-full px-0.5">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Últimos Servicios Solicitados */}
        {recentServices.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-bold text-lg text-text-main font-manrope">Solicitar Nuevamente</h3>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar -mx-6 px-6">
              {recentServices.map((service, i) => (
                 <div key={i} className="min-w-[280px] bg-white dark:bg-bg-primary border border-gray-100 dark:border-gray-800 rounded-[20px] p-4 flex items-center gap-4 snap-start shadow-sm flex-shrink-0 cursor-pointer active:scale-[0.98] transition-transform">
                   <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {service.category?.charAt(0) || <UserIcon size={20} />}
                   </div>
                   <div className="flex-1 min-w-0">
                     <h4 className="font-bold text-text-main text-[15px] truncate leading-tight">{service.category || 'Servicio'}</h4>
                     <p className="text-[11px] text-text-muted mt-0.5 truncate">Profesional a asignar</p>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center shrink-0 text-primary">
                     <Repeat size={14} />
                   </div>
                 </div>
              ))}
            </div>
          </section>
        )}

        {/* Report Problem Redesign */}
        <section id="report-section">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-base text-text-main flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                <Camera size={16} />
              </div>
              {selectedCategory 
                ? `Reportar problema de ${CATEGORIES.find(c => c.id === selectedCategory)?.name}` 
                : 'Asistencia con IA'}
            </h3>
          </div>
          <div className={`bg-bg-primary rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 shadow-premium border border-gray-100 dark:border-gray-800 transition-all duration-300 relative overflow-hidden`}>
            {!selectedCategory ? (
              <div className="flex flex-col items-center justify-center py-4 px-1 text-center animate-in fade-in duration-300">
                 <div className="w-12 h-12 rounded-[16px] bg-primary/10 flex items-center justify-center mb-3">
                    <CheckCircle className="text-primary" size={24} />
                 </div>
                 <h4 className="font-extrabold text-base text-text-main mb-1 font-manrope">Seleccioná una categoría</h4>
                 <p className="text-xs font-semibold text-text-muted max-w-[240px] leading-relaxed">Elegí el rubro que necesitás de la lista superior para comenzar con tu reporte.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                <div className="relative">
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Describí tu problema aquí... Ej: 'Tengo una canilla que pierde en la cocina'"
                    className="w-full min-h-[90px] bg-bg-secondary rounded-[16px] border border-transparent p-4 focus:bg-white dark:focus:bg-bg-primary focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-gray-650 dark:placeholder:text-gray-400 text-text-main font-semibold text-sm shadow-inner resize-none pb-12"
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAnalyzeText}
                      disabled={isEnhancingDescription || !details.trim()}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black tracking-wide transition-all ${
                        isEnhancingDescription 
                          ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 animate-pulse'
                          : !details.trim()
                            ? 'bg-gray-100/50 dark:bg-white/5 text-gray-400 cursor-not-allowed opacity-50'
                            : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-soft cursor-pointer hover:scale-[1.03] active:scale-[0.98]'
                      }`}
                      title="Analizar y cotizar con Inteligencia Artificial"
                    >
                      {isEnhancingDescription ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Analizando...
                        </>
                      ) : (
                        <>
                          <Sparkles size={11} className="text-purple-500 shrink-0" />
                          Cotizar con IA
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 dark:text-gray-300 ml-3">Dirección y Ubicación</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1 group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-muted/45 group-focus-within:text-primary">
                        <MapPin size={16} />
                      </div>
                      <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Calle, Número, Ciudad..."
                        className="w-full bg-bg-secondary rounded-[16px] border border-transparent h-11 pl-11 pr-10 focus:bg-white dark:focus:bg-bg-primary focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-gray-650 dark:placeholder:text-gray-400 text-text-main font-bold text-sm shadow-inner"
                      />
                      <button 
                        onClick={() => {
                          if (!location) {
                            setLocation({ lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] });
                          }
                          setShowMapPicker(true);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/70 transition-colors"
                        title="Seleccionar en mapa"
                      >
                        <Search size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={getCurrentLocation}
                      className={`w-11 h-11 rounded-[16px] border flex items-center justify-center transition-all active:scale-95 ${
                        isWatching 
                          ? 'bg-primary text-white border-primary shadow-premium' 
                          : 'bg-bg-secondary text-primary border-gray-100 dark:border-gray-800 hover:bg-gray-100'
                      }`}
                      title={isWatching ? "Detener rastreo" : "Rastrear ubicación"}
                    >
                      {isGettingLocation && !isWatching ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : isWatching ? (
                        <div className="relative">
                           <Navigation size={18} className="fill-white" />
                           <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-success rounded-full border border-white animate-pulse"></span>
                        </div>
                      ) : (
                        <Navigation size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {photoPreview && (
                  <div className="relative rounded-[20px] overflow-hidden aspect-video shadow-premium group/preview mb-1">
                    <img src={photoPreview} alt="Problem preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/preview:opacity-100 transition-opacity"></div>
                    
                    {/* Visual Scanning Effect */}
                    {isScanning && (
                      <motion.div 
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-primary/85 shadow-[0_0_15px_rgba(var(--primary),0.8)] z-20"
                      />
                    )}

                    {isScanning && (
                      <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px] flex items-center justify-center z-10">
                        <div className="bg-bg-primary/95 px-4 py-2 rounded-xl shadow-premium flex items-center gap-2 border border-primary/20">
                          <Loader2 className="animate-spin text-primary" size={16} />
                          <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Pre-clasificando...</span>
                        </div>
                      </div>
                    )}

                    {!isAnalyzing && !isScanning && (
                      <button 
                        onClick={() => {
                          setPhotoPreview(null);
                          setAnalysisResult(null);
                        }}
                        className="absolute top-3 right-3 bg-bg-primary/95 backdrop-blur-xl w-9 h-9 rounded-xl flex items-center justify-center text-alert shadow-premium hover:bg-alert hover:text-white transition-all scale-100"
                      >
                        <X size={16} />
                      </button>
                    )}
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-primary/40 backdrop-blur-md flex flex-col items-center justify-center z-30">
                        <motion.div 
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                          }} 
                          transition={{ 
                            repeat: Infinity, 
                            duration: 3,
                            ease: "linear"
                          }} 
                          className="text-white"
                        >
                          <Sparkles size={36} className="fill-white" />
                        </motion.div>
                        <span className="text-white font-bold text-sm mt-3 tracking-widest uppercase animate-pulse">
                          {estimatedTime ? `Match en progreso (${estimatedTime})...` : 'Analizando con IA...'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <AnimatePresence>
                  {analysisResult && (() => {
                    const breakdownKey = `${selectedTaxFilter}_${selectedTierFilter}`;
                    const rawPrice = analysisResult.numericBasePrice || 25000;
                    const defaultBreakdown = {
                      totalFacturado: rawPrice,
                      totalNeto: selectedTaxFilter === 'con_iva' ? Math.round(rawPrice / 1.21) : rawPrice,
                      costoGestion: Math.round((selectedTaxFilter === 'con_iva' ? rawPrice / 1.21 : rawPrice) * (selectedTierFilter === 'premium' ? 0.10 : 0.17)),
                      manoObra: Math.round((selectedTaxFilter === 'con_iva' ? rawPrice / 1.21 : rawPrice) * (1 - (selectedTierFilter === 'premium' ? 0.10 : 0.17))),
                      ivaAmt: selectedTaxFilter === 'con_iva' ? Math.round(rawPrice - (rawPrice / 1.21)) : 0
                    };

                    const selectedBreakdown = (analysisResult.breakdowns && analysisResult.breakdowns[breakdownKey]) || defaultBreakdown;
                    const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });

                    return (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-bg-secondary border border-primary/25 rounded-3xl p-5 mb-5 relative overflow-hidden shadow-soft"
                      >
                        {/* Decorative top accent */}
                        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />

                        {/* Diagnostic Report Section */}
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                            <Sparkles size={15} className="fill-white" />
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-primary uppercase tracking-[0.25em]">DIAGNÓSTICO CON IA</p>
                            <h4 className="text-base font-bold text-text-main leading-tight flex items-center gap-2">
                              {analysisResult.category}
                              {analysisResult.matchedId && (
                                <span className="bg-success/10 text-success px-1.5 py-0.5 rounded-md text-[8px] font-extrabold uppercase tracking-wide border border-success/15 shrink-0">
                                  Match Perfecto
                                </span>
                              )}
                            </h4>
                          </div>

                          {/* Urgency Badge */}
                          <div className="ml-auto shrink-0">
                            {analysisResult.urgency === 'Alta - Urgente' ? (
                              <span className="bg-alert/15 text-alert border border-alert/20 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-alert rounded-full animate-pulse" /> ALTA / URGENTE
                              </span>
                            ) : analysisResult.urgency === 'Media' ? (
                              <span className="bg-amber-500/15 text-amber-600 border border-amber-500/20 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> URGENCIA MEDIA
                              </span>
                            ) : (
                              <span className="bg-success/15 text-success border border-success/20 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-success rounded-full" /> URGENCIA BAJA
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Colloquial Slang Section */}
                        {analysisResult.slangDescription && (
                          <div className="bg-primary/5 rounded-2xl p-3 mb-3 border border-primary/10">
                            <p className="text-[8px] font-bold text-primary uppercase tracking-widest opacity-80 mb-0.5">Asunto Reportado (Slang Argentino)</p>
                            <p className="text-xs font-semibold italic text-text-main leading-snug">
                              "{analysisResult.slangDescription}"
                            </p>
                          </div>
                        )}

                        <div className="text-xs text-text-muted font-medium mb-4 leading-relaxed whitespace-pre-wrap">
                          {analysisResult.description}
                        </div>

                        {/* Interactive Filter Toggles */}
                        <div className="border-t border-gray-150 dark:border-gray-800 pt-3.5 mb-4 flex flex-col gap-3">
                          
                          {/* Tax Filter Toggle */}
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-extrabold text-text-muted uppercase tracking-[0.15em] ml-1">Condición impositiva profesional</span>
                            <div className="grid grid-cols-2 gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-xl">
                              <button
                                type="button"
                                onClick={() => setSelectedTaxFilter('sin_iva')}
                                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  selectedTaxFilter === 'sin_iva'
                                    ? 'bg-primary text-white shadow-soft font-extrabold'
                                    : 'text-text-muted hover:text-text-main'
                                }`}
                              >
                                Sin IVA (Factura C)
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedTaxFilter('con_iva')}
                                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  selectedTaxFilter === 'con_iva'
                                    ? 'bg-primary text-white shadow-soft font-extrabold'
                                    : 'text-text-muted hover:text-text-main'
                                }`}
                              >
                                Con IVA (Factura A/B)
                              </button>
                            </div>
                          </div>

                          {/* Client Tier Toggle */}
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-extrabold text-text-muted uppercase tracking-[0.15em] ml-1">Tu perfil de cliente</span>
                            {(user?.role as any) === 'premium' || user?.is_premium ? (
                              <div className="bg-black/5 dark:bg-white/5 p-1 rounded-xl">
                                <div className="w-full py-1.5 bg-primary text-white shadow-gradient font-extrabold rounded-lg text-[10px] flex items-center justify-center gap-1.5">
                                  <Crown size={10} className="fill-amber-400 text-amber-400" /> Plan Premium Activo (10% Gestión)
                                </div>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-xl">
                                <button
                                  type="button"
                                  onClick={() => setSelectedTierFilter('basic')}
                                  className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                    selectedTierFilter === 'basic'
                                      ? 'bg-primary text-white shadow-soft font-extrabold'
                                      : 'text-text-muted hover:text-text-main'
                                  }`}
                                >
                                  Plan Básico (17% Gestión)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                      // Se omite la confirmación temporalmente ya que puede estar bloqueada
                                      localStorage.setItem('triggerPremiumModal', 'true');
                                      if (onProfileClick) {
                                        onProfileClick();
                                      }
                                  }}
                                  className={`py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                                    selectedTierFilter === 'premium'
                                      ? 'bg-primary text-white shadow-gradient font-extrabold'
                                      : 'text-text-muted hover:text-text-main'
                                  }`}
                                >
                                  <Crown size={10} className="fill-amber-400 text-amber-400" /> Plan Premium (10% Gestión)
                                </button>
                              </div>
                            )}
                          </div>

                        </div>

                        {/* Invoice & Financial Breakdown Layout */}
                        <div className="bg-white/50 dark:bg-black/25 border border-dashed border-gray-250 dark:border-gray-800 rounded-2xl p-3.5 flex flex-col gap-2">
                          <p className="text-[9px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-[0.15em] border-b border-gray-150 dark:border-gray-800 pb-1.5 flex items-center gap-1">
                            <FileText size={12} className="text-primary" /> DESGLOSE FINANCIERO ESTIMADO
                          </p>
                          
                          <div className="flex justify-between items-center text-xs text-gray-750 dark:text-gray-300 font-semibold">
                            <span>TOTAL FACTURADO (Bruto):</span>
                            <span className="text-text-main font-bold">
                              {formatter.format(selectedBreakdown.totalFacturado)}
                            </span>
                          </div>

                          {selectedTaxFilter === 'con_iva' && (
                            <div className="flex justify-between items-center text-xs text-gray-750 dark:text-gray-300 font-semibold">
                              <span>TOTAL NETO (Base Imponible):</span>
                              <span className="text-text-main font-semibold">
                                {formatter.format(selectedBreakdown.totalNeto)}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between items-center text-xs text-gray-750 dark:text-gray-300 font-semibold">
                            <span>Costo de Gestión ({selectedTierFilter === 'premium' ? '10%' : '17%'}):</span>
                            <span className="text-text-main font-semibold">
                              {formatter.format(selectedBreakdown.costoGestion)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-xs text-gray-750 dark:text-gray-300 font-semibold">
                            <span>Mano de Obra Base (Neto):</span>
                            <span className="text-text-main font-semibold">
                              {formatter.format(selectedBreakdown.manoObra)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-xs text-gray-750 dark:text-gray-300 font-semibold">
                            <span>I.V.A (21%):</span>
                            <span className="text-text-main font-semibold">
                              {selectedTaxFilter === 'con_iva' ? formatter.format(selectedBreakdown.ivaAmt) : 'Exento'}
                            </span>
                          </div>

                          {selectedTierFilter === 'premium' && (
                            <div className="mt-1.5 p-2 bg-emerald-500/10 border border-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl flex items-center gap-1 text-[9px] uppercase tracking-wider">
                              <ShieldCheck size={13} className="fill-emerald-500/10 shrink-0 text-emerald-500" />
                              <span>Garantía Plus Aplicada (Quedan {garantias_disponibles} de 2 en tu cuenta)</span>
                            </div>
                          )}
                        </div>

                      </motion.div>
                    );
                  })()}
                </AnimatePresence>

                {/* Ingreso de Presupuesto Manual */}
                <div className="flex flex-col gap-1.5 mb-4">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-750 dark:text-gray-300 ml-3">Presupuesto Propuesto (Opcional)</label>
                    <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Ingresá el monto deseado</span>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none select-none">
                      <Banknote size={15} className="text-gray-700 dark:text-gray-300" />
                      <span className="font-extrabold text-sm text-gray-700 dark:text-gray-300">$</span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={customBudgetDisplayValue}
                      onChange={(e) => {
                        const sanitized = e.target.value.replace(/\D/g, '');
                        const numeric = sanitized ? parseInt(sanitized, 10) : 0;
                        setCustomBudgetDisplayValue(sanitized ? new Intl.NumberFormat('es-AR').format(numeric) : '');
                        handleBasePriceChange(numeric);
                      }}
                      placeholder="Ej: 50.000 (Monto en números)"
                      className="w-full h-11 pl-12 pr-4 bg-bg-secondary dark:bg-black/10 rounded-[16px] border border-gray-150 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-bold text-xs transition-all text-text-main placeholder:text-gray-650 dark:placeholder:text-gray-400"
                    />
                  </div>

                  {/* Preset Values Quick Tags */}
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1">
                    {[15000, 30000, 50000, 80000, 120000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setCustomBudgetDisplayValue(new Intl.NumberFormat('es-AR').format(preset));
                          handleBasePriceChange(preset);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all border active:scale-95 shrink-0 ${
                          analysisResult?.numericBasePrice === preset
                            ? 'bg-primary border-primary text-white shadow-soft font-black'
                            : 'bg-bg-secondary dark:bg-black/15 border-transparent text-gray-700 dark:text-gray-300 hover:border-gray-250 dark:hover:border-gray-700'
                        }`}
                      >
                        ${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(preset)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plazo de Realización Selection */}
                <div className="flex flex-col gap-1.5 mb-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-750 dark:text-gray-300 ml-3">Plazo de Realización Esperado</label>
                    <span className="text-[9px] bg-indigo-150 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">¿Cuándo necesitás el trabajo?</span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1">
                    {[
                      { id: 'En el día', label: 'En el día' },
                      { id: '2 días', label: '2 días' },
                      { id: '3 días', label: '3 días' },
                      { id: '1 semana', label: '1 semana' },
                      { id: 'A convenir', label: 'A convenir' }
                    ].map((timeOpt) => (
                      <button
                        key={timeOpt.id}
                        type="button"
                        onClick={() => setTimeframe(timeOpt.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border active:scale-95 shrink-0 flex items-center gap-1.5 ${
                          timeframe === timeOpt.id
                            ? 'bg-primary border-primary text-white shadow-soft font-black'
                            : 'bg-bg-secondary dark:bg-black/15 border-transparent text-gray-700 dark:text-gray-300 hover:border-gray-250 dark:hover:border-gray-700'
                        }`}
                      >
                        <Clock size={12} className={timeframe === timeOpt.id ? "text-white" : "text-gray-600 dark:text-gray-400"} />
                        {timeOpt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Methods Selection */}
                <div className="flex flex-col gap-1.5 mb-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-750 dark:text-gray-300 ml-3">Formas de Pago Aceptadas</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'Efectivo', icon: Banknote, label: 'Efectivo' },
                      { id: 'Transferencia', icon: Repeat, label: 'Transferencia' }
                    ].map((pm: any) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => {
                          const newMethods = paymentMethods.includes(pm.id)
                            ? paymentMethods.filter(m => m !== pm.id)
                            : [...paymentMethods, pm.id];
                          if (newMethods.length > 0) setPaymentMethods(newMethods);
                        }}
                        className={`flex-1 h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-xs transition-all border-2 active:scale-95 ${
                          paymentMethods.includes(pm.id)
                            ? 'bg-primary/5 border-primary text-primary shadow-soft'
                            : 'bg-bg-secondary border-transparent text-gray-700 dark:text-gray-300 hover:border-gray-200 dark:hover:border-gray-700'
                        }`}
                      >
                        <pm.icon size={16} className={paymentMethods.includes(pm.id) ? "text-primary" : "text-gray-600 dark:text-gray-400"} />
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-800 w-full my-1"></div>

                <div className="flex gap-2.5 mt-1">
                  <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                  <button 
                    onClick={handlePhotoClick}
                    disabled={isAnalyzing}
                    className={`flex-1 h-11 rounded-[16px] font-bold flex items-center justify-center gap-2 shadow-soft hover:shadow-md active:scale-[0.98] transition-all relative overflow-hidden group/btn ${
                      isAnalyzing ? 'bg-primary/50 cursor-not-allowed' : 'bg-bg-secondary border border-gray-100 dark:border-gray-800 text-primary'
                    }`}
                  >
                    <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover/btn:translate-y-0 transition-transform"></div>
                    {isAnalyzing ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : isScanning ? (
                      <div className="flex items-center gap-1.5">
                        <Loader2 className="animate-spin" size={16} />
                        <span className="text-xs">Escaneando...</span>
                      </div>
                    ) : (
                      <Camera size={18} className="group-hover/btn:rotate-12 transition-transform" />
                    )}
                    <span className="text-xs">
                      {photoPreview && !analysisResult && !isScanning ? 'Analizar' : 'Subir Foto'}
                    </span>
                  </button>
                  <button 
                    type="button"
                    onClick={handlePublishRequest}
                    disabled={isHiring || !details}
                    className="flex-[1.5] bg-primary text-white h-11 rounded-[16px] font-bold shadow-soft hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isHiring ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} className="fill-white" />}
                    <span className="text-xs">{isHiring ? 'Publicando...' : 'Publicar Solicitud'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Recommended Pros Highlights - High End Profile Cards */}
        <section id="specialists-section" className="mb-0 mt-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-lg text-text-main font-manrope">
              {selectedCategory 
                ? `Expertos en ${CATEGORIES.find(c => c.id === selectedCategory)?.name}` 
                : 'Profesionales Destacados'}
            </h3>
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
              >
                Ver todos
              </button>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
            {(() => {
              const filteredPros = recommendedPros
              .filter(pro => {
                const query = searchQuery.toLowerCase();
                const matchesSearch = query === '' || 
                  pro.name.toLowerCase().includes(query) || 
                  pro.specialties.some((s: string) => s.toLowerCase().includes(query));

                if (!selectedCategory) return matchesSearch;
                
                // Simple keyword matching for demo purposes
                const categoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name.toLowerCase() || '';
                const matchesCategory = pro.specialties.some((s: string) => s.toLowerCase().includes(categoryName)) || 
                       (selectedCategory === 'electricity' && pro.specialties.some((s: string) => s.toLowerCase().includes('eléctrica'))) ||
                       (selectedCategory === 'plumbing' && pro.specialties.some((s: string) => s.toLowerCase().includes('grifería')));
                
                return matchesSearch && matchesCategory;
              });

              if (filteredPros.length === 0) {
                 return (
                    <div className="w-full text-center py-6 px-4 bg-white/50 dark:bg-bg-primary/50 rounded-3xl mb-4">
                      <p className="text-sm font-bold text-text-muted">Aún no hay profesionales disponibles.</p>
                      <p className="text-xs text-text-muted mt-1 opacity-70">Sé el primero en solicitar un servicio en esta categoría.</p>
                    </div>
                 );
              }

              return filteredPros.map((pro) => (
              <motion.div 
                key={pro.id} 
                whileHover={{ scale: 1.02 }}
                className="snap-start min-w-[280px] max-w-[280px] bg-white dark:bg-bg-primary rounded-[24px] p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4 shrink-0 active:scale-[0.98] relative overflow-hidden group hover:shadow-md transition-shadow"
              >
                {pro.is_premium && (
                  <div className="absolute top-0 right-0 bg-yellow-500 py-1 px-4 rounded-bl-[20px] shadow-sm z-10 flex items-center gap-1">
                    <Crown size={12} className="text-white fill-white" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Premium</span>
                  </div>
                )}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                   <Zap size={60} className="text-primary" />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="relative shrink-0">
                    <img 
                      src={pro.photo || undefined} 
                      alt={pro.name} 
                      className="w-16 h-16 rounded-[20px] object-cover shadow-sm group-hover:scale-105 transition-transform" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pro.name)}&background=3e9ab3&color=fff&size=150`;
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-white dark:border-bg-primary flex items-center justify-center text-white shadow-sm">
                       <CheckCircle size={12} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pr-1">
                    <h4 className="font-bold text-text-main text-base truncate font-manrope">{pro.name}</h4>
                    <div className="flex items-center gap-2 mt-1 -ml-0.5">
                      <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded-md border border-yellow-105 dark:border-yellow-900/30">
                        <Star size={10} className={pro.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300 dark:text-gray-700"} />
                        <span className="text-[10px] font-bold">{pro.rating ? pro.rating : 'Sin calif.'}</span>
                      </div>
                      <span className="text-[10px] text-text-muted font-bold capitalize">{pro.distance}</span>
                    </div>
                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className="text-[8px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-md border border-blue-500/10 flex items-center gap-0.5" title="Identidad Verificada">
                        <ShieldCheck size={8} /> Identidad OK
                      </span>
                      <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md border flex items-center gap-0.5 ${pro.antecedentes_ok || pro.antecedentes_url ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/10' : 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/10'}`} title={pro.antecedentes_ok || pro.antecedentes_url ? "Antecedentes Revisados" : "Antecedentes No Cargados"}>
                        {pro.antecedentes_ok || pro.antecedentes_url ? <CheckCircle size={8} /> : <ShieldAlert size={8} />}
                        {pro.antecedentes_ok || pro.antecedentes_url ? "Antecedentes OK" : "Sin Antecedentes"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col mt-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Tarifa base</p>
                      <p className="text-lg font-bold text-primary font-manrope leading-none">{pro.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex">
                       <span className="text-[10px] font-bold text-text-muted bg-gray-50 dark:bg-bg-secondary px-2.5 py-1 rounded-lg border border-gray-100 dark:border-gray-800 truncate max-w-full">
                         Especialista: {pro.specialties && pro.specialties.length > 0 ? pro.specialties[0] : 'General'}
                       </span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedPro(pro)}
                        className="flex-1 h-10 bg-white dark:bg-bg-secondary text-text-main border border-gray-200 dark:border-gray-700 rounded-[16px] font-bold text-[11px] hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                      >
                         Ver Perfil
                      </button>
                      <button 
                        onClick={() => handleHire(pro)}
                        disabled={isHiring || hiredPros.includes(pro.id.toString())}
                        className="flex-[1.2] h-10 bg-primary text-white rounded-[16px] font-bold text-[11px] hover:opacity-90 transition-all shadow-sm shadow-primary/20 active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                         {(isHiring && !hiredPros.includes(pro.id.toString())) ? <Loader2 className="animate-spin" size={14} /> : (hiredPros.includes(pro.id.toString()) ? <CheckCircle size={14} className="fill-white" /> : <Zap size={14} className="fill-white" />)}
                         {(isHiring && !hiredPros.includes(pro.id.toString())) ? 'Procesando...' : (hiredPros.includes(pro.id.toString()) ? 'Solicitado' : 'Contratar')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
              ));
            })()}
          </div>
        </section>

        {/* Ayuda y Soporte Rápido */}
        <section className="mb-2">
          <div className="flex justify-between items-center mb-2 px-1">
            <h3 className="font-bold text-base text-text-main font-manrope">¿Necesitás Ayuda?</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <button 
                onClick={() => setShowSupportChat(true)}
                className="bg-white dark:bg-bg-primary border border-gray-100 dark:border-gray-800 rounded-[16px] p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-all active:scale-[0.98] w-full"
             >
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                   <MessageCircle size={16} />
                </div>
                <span className="text-xs font-bold text-text-main text-left leading-tight">Soporte 24/7</span>
             </button>
             <button 
                onClick={() => setShowFaq(true)}
                className="bg-white dark:bg-bg-primary border border-gray-100 dark:border-gray-800 rounded-[16px] p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-all active:scale-[0.98] w-full"
             >
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                   <ShieldAlert size={16} />
                </div>
                <span className="text-xs font-bold text-text-main text-left leading-tight">Preguntas FAQ</span>
             </button>
          </div>
        </section>

        {/* Premium Benefits - Enhanced Section at the bottom */}
        {user?.role !== 'premium' && user?.premium_status !== 'active' && (
          <section className="bg-gradient-to-br from-[#1A1C1E] via-[#2C2E33] to-[#1A1C1E] rounded-[28px] p-5 sm:p-6 shadow-premium border border-white/10 relative overflow-hidden group mb-6">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-[80px] -ml-24 -mb-24"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                   <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center text-primary border border-white/10 group-hover:scale-105 transition-transform duration-500">
                      <Sparkles size={20} className="fill-primary/20" />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-white font-manrope tracking-tight leading-none">Beneficios Premium</h3>
                      <p className="text-white/40 text-[8px] font-bold uppercase tracking-[0.2em] mt-1 shrink-0">Exclusivo para miembros</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2.5">
                   {[
                     { label: 'Prioridad Pro', icon: Zap, desc: 'Atención inmediata' },
                     { label: 'Garantía', icon: ShieldAlert, desc: 'Seguro incluido' },
                     { label: 'Soporte 24/7', icon: MessageCircle, desc: 'WhatsApp directo' },
                     { label: 'Cashback 5%', icon: Gift, desc: 'En cada trabajo' }
                   ].map((item, i) => (
                     <motion.div 
                       key={i} 
                       whileHover={{ y: -1, backgroundColor: 'rgba(255,255,255,0.08)' }}
                       className="bg-white/5 backdrop-blur-md p-2.5 rounded-[16px] border border-white/10 flex items-center gap-2 h-[56px] transition-all cursor-pointer min-w-0"
                     >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                           <item.icon size={14} />
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <span className="text-white text-[11px] font-bold tracking-tight block leading-tight truncate">{item.label}</span>
                          <span className="text-white/40 text-[8px] font-semibold uppercase tracking-wider block mt-0.5 truncate">{item.desc}</span>
                        </div>
                     </motion.div>
                   ))}
                </div>

                <button 
                  onClick={() => {
                    if (user?.role === 'premium') {
                      setShowPremiumSuccess(true);
                    } else {
                      setShowPremiumActivationModal(true);
                    }
                  }}
                  className="w-full mt-4 h-11 bg-white text-[#111111] rounded-[16px] font-bold text-xs shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn3"
                >
                   <span>
                     {(user?.role as any) === 'premium' 
                       ? (user?.premium_status === 'cancelling' ? 'Membresía (Cancelación Pendiente)' : 'Membresía Activa') 
                       : (user?.premium_status === 'pending' ? 'Ver Estado de Membresía' : 'Activar Membresía Premium')}
                   </span>
                   <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                     <ChevronRight size={14} className="text-primary" />
                   </motion.div>
                </button>
             </div>
          </section>
        )}

        {/* Learn More Modal */}
        <AnimatePresence>
          {showLearnMore && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-bg-primary rounded-[28px] sm:rounded-[40px] p-5 sm:p-7 max-w-sm w-full shadow-premium relative overflow-y-auto max-h-[90vh] no-scrollbar flex flex-col"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                   <Zap size={100} className="text-primary" />
                </div>
                
                <div className="flex justify-between items-start mb-4 shrink-0">
                   <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <Sparkles size={22} />
                   </div>
                   <button onClick={() => setShowLearnMore(false)} className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:opacity-85 transition-opacity">
                      <X size={16} />
                   </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text-main mb-3 font-manrope tracking-tight shrink-0">Cómo funciona</h3>
                
                <div className="space-y-4 overflow-y-auto no-scrollbar pr-1 py-1">
                   {[
                     { 
                       title: 'IA de Diagnóstico', 
                       desc: 'Nuestra inteligencia artificial analiza tus fotos para entender exactamente qué necesitas.' 
                     },
                     { 
                       title: 'Match con Expertos', 
                       desc: 'Te conectamos con los profesionales más recomendados y cercanos a tu ubicación.' 
                     },
                     { 
                       title: 'Puntos Pro x2', 
                       desc: 'Por cada problema que reportes hoy, acumulás el doble de puntos para canjear por descuentos.' 
                     }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                         <div className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle size={12} />
                        </div>
                        <div>
                           <p className="text-xs sm:text-sm font-bold text-text-main leading-snug">{item.title}</p>
                           <p className="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-relaxed opacity-70">
                             {item.desc}
                           </p>
                        </div>
                      </div>
                    ))}
                </div>

                <button 
                  onClick={() => setShowLearnMore(false)}
                  className="w-full mt-5 h-11 bg-primary text-white rounded-xl text-sm font-bold shadow-soft hover:opacity-95 transition-all active:scale-95 shrink-0"
                >
                  Entendido
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Professional Profile Modal */}
        <AnimatePresence>
          {showAllCategories && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-bg-primary rounded-[32px] p-6 max-w-md w-full shadow-premium relative overflow-hidden flex flex-col max-h-[85vh]"
              >
                <div className="flex justify-between items-center mb-6 shrink-0">
                   <h3 className="text-xl font-bold text-text-main font-manrope">Todas las Categorías</h3>
                   <button onClick={() => setShowAllCategories(false)} className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:opacity-85 transition-opacity animate-none">
                      <X size={16} />
                   </button>
                </div>
                
                <div className="grid grid-cols-3 gap-x-2 gap-y-4 overflow-y-auto no-scrollbar pb-4 pr-1">
                   {CATEGORIES.map((cat, idx) => {
                     const Icon = cat.icon;
                     return (
                      <button 
                        key={cat.id || idx} 
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setShowAllCategories(false);
                          setTimeout(() => {
                            const reportSection = document.getElementById('report-section');
                            reportSection?.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }}
                        className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-bg-secondary active:scale-[0.97] transition-all group"
                      >
                        <div className={`${cat.color} dark:bg-opacity-10 w-12 h-12 rounded-[16px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-300`}>
                          <Icon size={20} className="shrink-0" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-text-muted text-center leading-tight truncate w-full px-0.5">
                          {cat.name}
                        </span>
                      </button>
                     );
                   })}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 shrink-0">
                  <p className="text-center text-text-muted text-[9px] font-bold uppercase tracking-widest opacity-40">
                    Estamos sumando mas categorías pronto
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPriorityModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-bg-primary rounded-[40px] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldCheck size={120} className="text-primary" />
                </div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-premium">
                    <Sparkles size={32} className="fill-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-text-main font-manrope uppercase tracking-tight">Nivel de Servicio</h3>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest">Optimizado por IA</p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {!(user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active') && (
                    <button 
                      onClick={() => selectPriority('normal')}
                      className="w-full p-6 rounded-3xl bg-bg-secondary border-2 border-transparent hover:border-primary/20 transition-all text-left flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-text-main">Prioridad Rápida</span>
                          <div className="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                            Baja Demanda
                          </div>
                        </div>
                        <p className="text-xs text-text-muted opacity-80 mt-1">Estimado: 1-10 min</p>
                      </div>
                    </button>
                  )}

                  <button 
                    onClick={() => selectPriority('urgent')}
                    className="w-full p-6 rounded-3xl bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all text-left flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap size={24} className="fill-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-text-main">Prioridad Urgente</span>
                        <div className="px-2 py-1 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                          Inmediato
                        </div>
                      </div>
                      <p className="text-xs text-text-muted opacity-80 mt-1">Exclusivo Premium</p>
                    </div>
                  </button>
                </div>

                <button 
                  onClick={() => setShowPriorityModal(false)}
                  className="w-full mt-6 h-14 bg-bg-secondary text-text-muted rounded-2xl font-bold active:scale-95 transition-all text-xs uppercase tracking-widest"
                >
                  Cancelar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSubscriptionPrompt && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[130] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, rotateX: 20 }}
                animate={{ scale: 1, rotateX: 0 }}
                className="bg-bg-primary rounded-[50px] p-10 max-w-sm w-full text-center shadow-premium relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8 shadow-inner">
                  <Zap size={48} className="fill-primary/20" />
                </div>
                <h3 className="text-3xl font-black text-text-main mb-3 font-manrope tracking-tight italic">ÚNETE A PREMIUM</h3>
                <p className="text-text-muted text-sm font-medium leading-relaxed opacity-80 mb-10 px-4">
                  Suscribite para obtener <span className="text-primary font-bold">Atención inmediata</span> y acceso ilimitado a especialistas certificados 24/7.
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={async () => {
                      setShowSubscriptionPrompt(false);
                      setShowPremiumActivationModal(true);
                    }}
                    className="h-16 bg-primary text-white rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Suscribirse Ahora
                  </button>
                  <button 
                    onClick={() => setShowSubscriptionPrompt(false)}
                    className="h-14 bg-bg-secondary text-text-muted rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                  >
                    Quizás más tarde
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {buscandoJobId && !buscandoJobAccepted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-bg-primary rounded-[40px] p-8 max-w-sm w-full text-center shadow-premium relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 relative">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2 font-manrope">Buscando Profesional...</h3>
                <p className="text-text-muted text-sm font-medium leading-relaxed opacity-70 mb-8">
                  Estamos buscando al profesional ideal para tu trabajo. Podés cerrar esta ventana y te notificaremos cuando alguien acepte.
                </p>
                <button 
                  onClick={() => {
                    setBuscandoJobId(null);
                    resetForm();
                    if (onSuccess) onSuccess();
                  }}
                  className="w-full h-14 bg-gray-100 dark:bg-gray-800 text-text-main rounded-2xl font-bold transition-all active:scale-95"
                >
                  Continuar en segundo plano
                </button>
              </motion.div>
            </motion.div>
          )}

          {buscandoJobId && buscandoJobAccepted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-bg-primary rounded-[40px] p-8 max-w-sm w-full text-center shadow-premium relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-success to-primary"></div>
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center text-success mx-auto mb-6 relative">
                  <CheckCircle size={40} className="fill-success/20" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2 font-manrope">¡Profesional Encontrado!</h3>
                <p className="text-text-muted text-sm font-medium leading-relaxed opacity-70 mb-8">
                  Un profesional ha aceptado tu solicitud. Ingresá a la sección de mensajes o a tu historial para ver los detalles y chatear.
                </p>
                <button 
                  onClick={() => {
                    setBuscandoJobId(null);
                    setBuscandoJobAccepted(false);
                    resetForm();
                    if (onSuccess) onSuccess();
                  }}
                  className="w-full h-14 bg-success text-white rounded-2xl font-bold transition-all active:scale-95 shadow-premium"
                >
                  Ver Detalles
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showHireSuccess && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-bg-primary rounded-[40px] p-8 max-w-sm w-full text-center shadow-premium relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-success to-primary"></div>
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center text-success mx-auto mb-6">
                  <CheckCircle size={40} className="fill-success/20" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2 font-manrope">Solicitud Enviada</h3>
                <p className="text-text-muted text-sm font-medium leading-relaxed opacity-70 mb-8">
                  El profesional ha sido notificado. Se pondrá en contacto con vos en los próximos minutos para coordinar los detalles.
                </p>
                <button 
                  onClick={() => {
                    setShowHireSuccess(false);
                    if (onSuccess) onSuccess();
                  }}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-bold shadow-premium hover:shadow-2xl transition-all active:scale-95"
                >
                  Continuar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPremiumActivationModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPremiumActivationModal(false)}
              className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-bg-primary rounded-[40px] p-8 max-w-sm w-full shadow-premium relative overflow-y-auto max-h-[90vh] no-scrollbar flex flex-col"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                   <Crown size={120} className="text-primary" />
                </div>
                
                <div className="absolute top-6 right-6 z-20">
                   <button 
                     onClick={() => setShowPremiumActivationModal(false)} 
                     className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
                   >
                      <X size={24} />
                   </button>
                </div>

                <div className="flex items-center mb-6">
                   <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Crown size={28} />
                   </div>
                </div>

                <h3 className="text-2xl font-bold text-text-main mb-4 font-manrope">Activar Premium</h3>
                
                {(!user?.premium_status || user.premium_status === 'none') ? (
                  <div className="flex flex-col gap-6">
                    <p className="text-sm font-medium text-text-muted leading-relaxed">
                      Para activar el servicio Premium (Atención Inmediata y Garantía), por favor realiza una transferencia y adjunta el comprobante.
                    </p>

                    <div className="p-5 bg-primary/5 rounded-3xl border border-primary/20 space-y-3">
                       <div>
                         <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Alias MP</p>
                         <p className="font-mono font-bold text-lg text-text-main">Diego.reartes.lemon</p>
                       </div>
                       <button 
                         onClick={() => {
                           navigator.clipboard.writeText('Diego.reartes.lemon');
                           alert('Alias copiado');
                         }}
                         className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest hover:underline"
                       >
                         <Copy size={14} />
                         Copiar Alias
                       </button>
                    </div>

                    <div className="mt-2 w-full flex justify-center">
                       <label className="w-full h-14 border border-dashed border-primary/40 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold cursor-pointer hover:bg-primary/5 transition-colors mx-auto text-center px-4">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file || !user) return;
                              setIsUploadingReceipt(true);
                              try {
                                const compressedBase64 = await compressImage(file);
                                await updateDoc(doc(db, 'users', user.uid), { 
                                  premium_status: 'pending', 
                                  payment_proof_url: compressedBase64,
                                  updatedAt: serverTimestamp()
                                });
                                alert('Comprobante enviado. Pendiente de aprobación.');
                                setShowPremiumActivationModal(false);
                              } catch (err) {
                                handleFirestoreError(err, 'update', `users/${user.uid}`);
                                alert('Error al enviar el comprobante.');
                              } finally {
                                setIsUploadingReceipt(false);
                              }
                            }}
                          />
                          {isUploadingReceipt ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                          <span className="text-center font-bold text-sm">
                            {isUploadingReceipt ? 'Subiendo...' : 'Adjuntar Comprobante'}
                          </span>
                       </label>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                      <Clock size={32} />
                    </div>
                    <div>
                      <p className="font-bold text-text-main">Solicitud en revisión</p>
                      <p className="text-sm text-text-muted mt-2">Estamos verificando tu pago. Te notificaremos en cuanto tu cuenta sea activada.</p>
                    </div>
                    <button 
                      onClick={() => setShowPremiumActivationModal(false)}
                      className="w-full mt-4 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl font-bold text-text-main"
                    >
                      Entendido
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {showPremiumSuccess && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPremiumSuccess(false)}
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-bg-primary rounded-[40px] p-8 max-w-sm w-full text-center shadow-premium relative overflow-hidden"
              >
                <div className="absolute top-6 right-6 z-20">
                   <button 
                     onClick={() => setShowPremiumSuccess(false)} 
                     className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
                   >
                      <X size={20} />
                   </button>
                </div>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                  <Sparkles size={40} className="fill-primary/20" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2 font-manrope">
                  {user?.premium_status === 'cancelling' ? 'Cancelación Programada' : '¡Ya sos Premium!'}
                </h3>
                <p className="text-text-muted text-sm font-medium leading-relaxed opacity-70 mb-8">
                  {user?.premium_status === 'cancelling' 
                    ? `Tu suscripción finalizará el ${user.cancel_at?.toDate ? user.cancel_at.toDate().toLocaleDateString() : 'final del mes'}. Disfrutá tus beneficios hasta entonces.`
                    : 'Bienvenido a la experiencia Pro. Ahora tenés prioridad en todos tus pedidos y cashback asegurado.'}
                </p>
                <button 
                  onClick={() => setShowPremiumSuccess(false)}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-bold shadow-premium hover:shadow-2xl transition-all active:scale-95"
                >
                  Excelente
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPro && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[1050] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
            >
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="w-full max-w-lg h-full sm:h-auto bg-bg-primary rounded-none sm:rounded-[40px] shadow-premium overflow-hidden max-h-full sm:max-h-[90vh] flex flex-col relative"
              >
                {/* Floating Close Button */}
                <button 
                  onClick={() => setSelectedPro(null)}
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
                        src={selectedPro.photo || undefined} 
                        className="w-full h-full object-contain rounded-xl bg-white" 
                        alt={selectedPro.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedPro.name)}&size=200&background=3e9ab3&color=fff`;
                        }}
                      />
                      <div className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white shadow-soft">
                         <CheckCircle size={12} />
                      </div>
                    </div>
                  </div>

                  {/* Profile Body Content */}
                  <div className="px-8 pb-8 bg-bg-primary">
                    <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-text-main font-manrope">{selectedPro.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-yellow-500 font-bold">
                           <Star size={16} className={averageRating ? "fill-yellow-500 text-yellow-500" : "text-gray-300 dark:text-gray-700"} />
                           <span>{averageRating !== null ? averageRating.toFixed(1) : "Sin calificación"}</span>
                        </div>
                        <span className="text-text-muted font-bold opacity-30">|</span>
                        <span className="text-text-muted font-bold text-sm tracking-wide uppercase">{totalJobsCount} Trabajos</span>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Presupuesto</p>
                       <p className="text-2xl font-bold text-primary">{selectedPro.price}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-8">
                     {/* Verification Badges */}
                     <div className="flex flex-wrap gap-2.5 bg-gray-50 dark:bg-[#151515] p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-inner">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                          <ShieldCheck size={16} />
                          <span>Identidad Verificada</span>
                        </div>
                        <span className="text-gray-300 dark:text-gray-800">|</span>
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle size={16} />
                          <span>{selectedPro.antecedentes_ok || selectedPro.antecedentes_url ? "Antecedentes OK" : "Sin Antecedentes"}</span>
                        </div>
                        {selectedPro.is_premium && (
                          <>
                            <span className="text-gray-300 dark:text-gray-800">|</span>
                            <div className="flex items-center gap-2 text-xs font-bold text-yellow-600 dark:text-yellow-500">
                              <Crown size={14} className="fill-yellow-500" />
                              <span>Especialista Elite</span>
                            </div>
                          </>
                        )}
                     </div>

                     {/* Bio */}
                     <div>
                        <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3">Biografía</h4>
                        <p className="text-text-main opacity-80 leading-relaxed font-medium">
                          {selectedPro.bio}
                        </p>
                     </div>

                     {/* Specialties */}
                     <div>
                        <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Especialidades</h4>
                        <div className="flex flex-col gap-3">
                           {selectedPro.specialties.map((s: string, i: number) => {
                             const cred = selectedPro.professionCredentials?.[s];
                             const hasCred = cred && cred.type && cred.type !== 'Ninguno';
                             const isPremium = true; // Always display validated credentials clearly
                             
                             const specialtyReviews = combinedReviews.filter((r: any) => {
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

                             const isClientPremium = user?.role === 'premium' || user?.premium_status === 'active';
                             
                             return (
                               <div key={i} className="p-4 bg-bg-secondary border border-gray-100 dark:border-gray-800 rounded-2xl flex flex-col gap-2.5">
                                 <div className="flex justify-between items-center">
                                   <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-black border border-primary/10">
                                     {s}
                                   </span>
                                   {hasCred && (
                                     <span className="text-[10px] font-black text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/10 uppercase tracking-wide flex items-center gap-1 animate-pulse">
                                       <CheckCircle size={10} /> Validado
                                     </span>
                                   )}
                                 </div>

                                 {hasCred && (
                                   <div className="mt-1 pb-1 border-t border-dashed border-gray-100 dark:border-gray-800 pt-2.5">
                                     {isPremium ? (
                                       <div className="flex flex-col gap-2">
                                         <div className="flex justify-between items-center text-xs">
                                           <span className="font-bold text-text-main">
                                             <span className="text-emerald-500 mr-1.5 font-extrabold">✓</span> {cred.type}: <span className="font-semibold text-text-muted">{cred.number || 'Matrícula Verificada'}</span>
                                           </span>
                                           {cred.image && (
                                             <button 
                                               onClick={() => setActiveCertPreview({ title: `${s} - ${cred.type}`, image: cred.image })}
                                               className="text-primary hover:underline font-black text-[11px] uppercase tracking-wider"
                                             >
                                               Ver Certificado</button>
                                           )}
                                         </div>
                                       </div>
                                     ) : (
                                       <div className="flex items-center gap-2 text-xs bg-yellow-500/5 p-2 rounded-xl border border-yellow-500/10 text-yellow-600 font-semibold leading-relaxed">
                                         <span>🔒 Credencial de {s} disponible con Perfil Premium</span>
                                       </div>
                                     )}
                                   </div>
                                 )}

                                 {/* Puntuación y Comentarios por Oficio (Premium Only) */}
                                 <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/80">
                                   {isClientPremium ? (
                                     <div className="flex flex-col gap-2">
                                       <div className="flex items-center justify-between">
                                         <span className="text-[10px] font-black uppercase text-text-muted tracking-wider">Puntuación de {s}</span>
                                         <div className="flex items-center gap-1">
                                           <Star size={12} className={specialtyRating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"} />
                                           <span className="text-xs font-black text-text-main">
                                             {specialtyRating !== null ? `${specialtyRating.toFixed(1)} (${specialtyReviews.length} trabajos)` : 'Sin calificación (0 trabajos)'}
                                           </span>
                                         </div>
                                       </div>
                                       
                                       {specialtyReviews.length > 0 ? (
                                         <div className="bg-bg-primary/40 dark:bg-[#111112]/40 rounded-xl p-3 border border-gray-100/30 dark:border-gray-800/20 max-h-[120px] overflow-y-auto no-scrollbar flex flex-col gap-2.5">
                                           {specialtyReviews.slice(0, 2).map((sr: any, idx: number) => (
                                             <div key={idx} className="flex flex-col gap-0.5 text-left">
                                               <div className="flex justify-between items-center">
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
                                            <p className="text-[10px] text-text-muted font-bold">No hay comentarios previos para el oficio {s}.</p>
                                         </div>
                                       )}
                                     </div>
                                   ) : (
                                     <div className="p-3.5 bg-[#4F46E5]/5 dark:bg-[#4F46E5]/10 rounded-[18px] border border-[#4F46E5]/10 flex flex-col gap-2 text-left">
                                       <div className="flex items-start gap-2">
                                         <Crown size={14} className="text-primary shrink-0 mt-0.5 fill-primary" />
                                         <div>
                                           <h5 className="text-[10px] font-black text-primary uppercase tracking-wider mb-0.5">Membresía Premium Requerida</h5>
                                           <p className="text-[10px] text-text-muted leading-relaxed font-semibold">
                                              Ver calificaciones específicas para {s}, histórico de trabajos y comentarios detallados de clientes.
                                           </p>
                                         </div>
                                       </div>
                                       <button 
                                         type="button"
                                         onClick={() => {
                                           setShowPremiumActivationModal(true);
                                         }}
                                         className="w-full h-8 bg-primary hover:opacity-90 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center gap-1 mt-1"
                                       >
                                         <Crown size={10} className="fill-white" /> Activar Premium
                                       </button>
                                     </div>
                                   )}
                                 </div>
                               </div>
                             );
                           })}
                        </div>
                     </div>

                     {/* References */}
                     <div>
                        <div className="flex items-center justify-between mb-4">
                           <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">Referencias ({selectedPro.references?.length || 0})</h4>
                           {(selectedPro.references?.length || 0) > 0 && (
                             <button onClick={() => alert('Todas las referencias cargadas')} className="text-primary text-[11px] font-bold hover:underline">Ver todas</button>
                           )}
                        </div>
                        <div className="flex flex-col gap-4">
                           {(!selectedPro.references || selectedPro.references.length === 0) ? (
                              <p className="text-xs text-text-muted opacity-60">Aún no hay referencias para este profesional.</p>
                           ) : selectedPro.references.map((r: any, i: number) => (
                              <div key={i} className="p-4 bg-bg-secondary rounded-2xl border border-gray-100 dark:border-gray-800">
                                 <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-text-main text-sm">{r.user || r.clientName}</span>
                                    <div className="flex gap-0.5 text-yellow-500">
                                       {[...Array(5)].map((_, idx) => (
                                         <Star key={idx} size={10} className={idx < r.rating ? "fill-yellow-500" : "text-gray-200"} />
                                       ))}
                                    </div>
                                 </div>
                                 <p className="text-xs text-text-muted italic">"{r.comment}"</p>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Garantía de Servicio en UI */}
                   <div className="w-full mt-8 p-4 rounded-[24px] bg-sky-50 dark:bg-sky-950/25 border border-sky-100 dark:border-sky-900/30 flex items-start gap-3 text-left">
                      <ShieldCheck className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" size={18} />
                      <div>
                         <h4 className="font-black text-sky-800 dark:text-sky-300 text-[11px] uppercase tracking-wider mb-1">Garantía Protegida de Servicios Pro</h4>
                         <p className="text-[10px] text-sky-700/85 dark:text-sky-400/85 font-semibold leading-relaxed">
                            🔒 <strong>Pago Seguro:</strong> Tu dinero está protegido. Retenemos los fondos de manera segura y solo se liberan cuando des tu conformidad final del servicio.<br/>
                            ⭐ <strong>Satisfacción Garantizada:</strong> Si el resultado no es el esperado, nuestro soporte cubre la corrección del trabajo.<br/>
                            📞 <strong>Soporte 24/7:</strong> Operadores humanos disponibles de forma permanente para mediar y asistirte.
                         </p>
                      </div>
                   </div>
                </div>
              </div>

                {/* Sticky Footer */}
                <div className="p-6 border-t border-black/5 dark:border-white/10 bg-bg-primary flex flex-col items-center gap-3 shrink-0">
                   <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] bg-bg-secondary px-4 py-1.5 rounded-full border border-gray-100 dark:border-gray-800 shadow-soft">
                     Especialista: {selectedPro.specialties?.[0] || 'General'}
                   </span>
                   <div className="flex gap-4 w-full">
                      <button className="flex-[0.5] h-14 bg-bg-secondary text-text-main rounded-[24px] font-bold border border-transparent shadow-soft transition-all active:scale-[0.98]">
                         Contactar
                      </button>
                      <button 
                         onClick={() => {
                           handleHire(selectedPro);
                           // Don't close immediately if we want to show it's disabled now, or wait until job is created
                           setSelectedPro(null);
                         }}
                         disabled={isHiring || hiredPros.includes(selectedPro.id.toString())}
                         className="flex-1 h-14 bg-primary text-white rounded-[24px] font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex flex-col items-center justify-center leading-none gap-0.5"
                       >
                          {(isHiring && !hiredPros.includes(selectedPro.id.toString())) ? <Loader2 className="animate-spin mb-1" size={16} /> : null}
                          <span>{(isHiring && !hiredPros.includes(selectedPro.id.toString())) ? 'Procesando...' : (hiredPros.includes(selectedPro.id.toString()) ? 'Solicitado' : 'Contratar')}</span>
                       </button>
                   </div>
                </div></motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showSupportChat && (
          <SupportChat onClose={() => setShowSupportChat(false)} predefinedTopic="Ayuda general" />
        )}

        <AnimatePresence>
          {showFaq && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setShowFaq(false)}
                className="fixed inset-0 z-[1050] bg-black/70 backdrop-blur-md"
              />
              <motion.div 
                initial={{ y: '100%', opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.6 }}
                onDragEnd={(event, info) => {
                  if (info.offset.y > 100 || info.velocity.y > 500) {
                    setShowFaq(false);
                  }
                }}
                className="fixed bottom-0 left-0 right-0 z-[1060] max-w-md mx-auto bg-white dark:bg-bg-secondary rounded-t-[32px] sm:rounded-t-[48px] shadow-premium px-6 sm:px-8 pb-24 flex flex-col h-[calc(100vh-32px)] border-t border-gray-100 dark:border-white/5 overflow-y-auto no-scrollbar"
              >
                  {/* Drag Handle Container with large touch target */}
                  <div 
                    className="w-full pt-1 pb-4 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
                  >
                    <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-5 shrink-0">
                    <h2 className="text-xl font-extrabold font-manrope text-text-main flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-primary rounded-full block"></span>
                      Preguntas Frecuentes
                    </h2>
                    <button onClick={() => setShowFaq(false)} className="w-9 h-9 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full hover:opacity-85 transition-opacity">
                       <X size={16} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3.5 overflow-y-auto pr-1 py-1 no-scrollbar flex-1">
                     <div className="p-4 bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-white/5 rounded-2xl">
                        <h4 className="font-extrabold text-xs text-text-main mb-1.5">¿Cómo pago al profesional?</h4>
                        <p className="text-[11px] leading-relaxed text-text-muted font-medium">El pago se realiza una vez finalizado y aprobado el trabajo a través de tu Billetera en la app.</p>
                     </div>
                     <div className="p-4 bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-white/5 rounded-2xl">
                        <h4 className="font-extrabold text-xs text-text-main mb-1.5">El profesional no se presentó</h4>
                        <p className="text-[11px] leading-relaxed text-text-muted font-medium">Puedes contactar a soporte técnico o reasignar tu solicitud desde tu pantalla de Historial.</p>
                     </div>
                     <div className="p-4 bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-white/5 rounded-2xl">
                        <h4 className="font-extrabold text-xs text-text-main mb-1.5">¿Cómo activo mi premium?</h4>
                        <p className="text-[11px] leading-relaxed text-text-muted font-medium">Ve a "Mi Perfil" &gt; "Membresía Premium" y sigue los pasos detallados para adjuntar tu comprobante de suscripción.</p>
                     </div>
                     <div className="p-4 bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-white/5 rounded-2xl">
                        <h4 className="font-extrabold text-xs text-text-main mb-1.5">¿Qué es el "Match Perfecto"?</h4>
                        <p className="text-[11px] leading-relaxed text-text-muted font-medium">Nuestra IA pre-clasifica tu problema para emparejarte exactamente con el especialista idóneo de tu zona técnica.</p>
                     </div>
                     <div className="p-4 bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-white/5 rounded-2xl">
                        <h4 className="font-extrabold text-xs text-text-main mb-1.5">¿Tengo garantías sobre las reparaciones?</h4>
                        <p className="text-[11px] leading-relaxed text-text-muted font-medium">Sí, todos los servicios concretados a través de la plataforma cuentan con una garantía de protección de 30 días.</p>
                     </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowFaq(false)}
                    className="w-full mt-5 h-12 bg-primary text-white rounded-2xl text-xs font-bold shadow-soft hover:opacity-95 transition-all active:scale-95 shrink-0"
                  >
                    Entendido
                  </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeCertPreview && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-md"
            >
              <div className="absolute top-6 right-6 flex gap-4">
                <button 
                  onClick={() => setActiveCertPreview(null)}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="w-full max-w-lg flex flex-col gap-4">
                <h3 className="text-xl font-bold font-manrope text-white text-center">{activeCertPreview.title}</h3>
                <div className="bg-bg-primary rounded-[32px] p-2 border border-white/10 shadow-premium overflow-hidden">
                  <img 
                    src={activeCertPreview.image} 
                    alt={activeCertPreview.title} 
                    className="w-full rounded-[24px] max-h-[70vh] object-contain"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

