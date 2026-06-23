import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { MapPin, Navigation, Clock, CheckCircle, Bell, Filter, List, Map as MapIcon, X, Info, ShieldAlert, Loader2, Share, User as UserIcon, Zap, Sparkles, Banknote, Repeat, Plus, Minus, Trash2, ChevronDown, ChevronUp, Locate, ArrowLeft, Home } from 'lucide-react';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, useMap, MapControl, ControlPosition, useMapsLibrary } from '@vis.gl/react-google-maps';

const Map = GoogleMap as any;
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import { useAuth } from '../services/authService';
import { useTheme } from '../services/themeService';
import { db, handleFirestoreError } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc, getDoc } from 'firebase/firestore';

const DEFAULT_CENTER = { lat: -31.4167, lng: -64.1833 };

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const MOCK_JOBS: any[] = [
  {
    id: 'm1',
    title: 'Reparación de cortocircuito',
    category: 'Electricista',
    price: '$28.000',
    urgent: true,
    description: 'Hubo un chispazo y nos quedamos sin luz en la cocina.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=60&w=400',
    clientName: 'Martina Rossi',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=100&h=100',
    paymentMethods: ['Efectivo', 'MercadoPago'],
    clientLevel: 'alto'
  },
  {
    id: 'm2',
    title: 'Pérdida de agua en el baño',
    category: 'Plomero',
    price: '$32.000',
    urgent: false,
    description: 'La bacha pierde agua por abajo, necesitamos cambiar el sifón.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=60&w=400',
    clientName: 'Juan Pérez',
    clientAvatar: '', // Will use dicebear
    paymentMethods: ['Transferencia'],
    clientLevel: 'normal'
  },
  {
    id: 'm3',
    title: 'Pintar habitación de 4x4',
    category: 'Pintor',
    price: '$85.000',
    urgent: false,
    description: 'Busco pintor para habitación completa, techo y paredes.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=60&w=400',
    clientName: 'Lucía Fernández',
    clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=60&w=100&h=100',
    paymentMethods: ['Efectivo'],
    clientLevel: 'normal'
  },
  {
    id: 'm4',
    title: 'Mantenimiento de Aire Acondicionado',
    category: 'Técnico de Aire Acondicionado / Climatización',
    price: '$75.000',
    urgent: false,
    description: 'El aire no enfría como antes, hace falta limpieza profunda de filtros, turbina y chequear carga de gas refrigerante.',
    image: 'https://images.unsplash.com/photo-1527344812328-17a4199c9cbf?auto=format&fit=crop&q=60&w=400',
    clientName: 'Roberto Gómez',
    clientAvatar: '', // Will use dicebear
    paymentMethods: ['MercadoPago', 'Efectivo'],
    clientLevel: 'alto'
  },
  {
    id: 'm5',
    title: 'Instalación de Estufa Tiro Balanceado',
    category: 'Gasista',
    price: '$55.000',
    urgent: true,
    description: 'Necesito instalar una estufa tiro balanceado de 3000 calorías con salida al exterior. Instalador matriculado de gas.',
    image: 'https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&q=60&w=400',
    clientName: 'Facundo López',
    clientAvatar: '',
    paymentMethods: ['MercadoPago', 'Efectivo'],
    clientLevel: 'alto'
  },
  {
    id: 'm6',
    title: 'Destape de Cloaca de Baño',
    category: 'Pocero / Desagotes',
    price: '$45.000',
    urgent: true,
    description: 'Urgente: cloaca de baño tapada con desborde en rejilla.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=60&w=400',
    clientName: 'Santiago Rossi',
    clientAvatar: '',
    paymentMethods: ['Efectivo'],
    clientLevel: 'alto'
  },
  {
    id: 'm7',
    title: 'Reparación de Cerradura Trabada',
    category: 'Cerrajero',
    price: '$25.000',
    urgent: true,
    description: 'La llave gira en falso y quedamos afuera, necesitamos apertura urgente.',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=60&w=400',
    clientName: 'Valeria Soria',
    clientAvatar: '',
    paymentMethods: ['MercadoPago', 'Transferencia'],
    clientLevel: 'normal'
  },
  {
    id: 'm8',
    title: 'Pared de Ladrillos Vistos 10m2',
    category: 'Albañil',
    price: '$120.000',
    urgent: false,
    description: 'Necesito levantar pared divisoria de ladrillo visto junta tomada en patio interno.',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=60&w=400',
    clientName: 'Esteban Altamirano',
    clientAvatar: '',
    paymentMethods: ['Efectivo', 'Transferencia'],
    clientLevel: 'normal'
  }
];

const CLEAN_MAP_STYLES = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'poi.business',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'on' }]
  }
];

// Component to update map center dynamically without locking the drag behavior
const MapUpdater = ({ center, trigger }: { center: { lat: number; lng: number }, trigger: number }) => {
  const map = useMap();
  useEffect(() => {
    if (map && center && trigger > 0) {
      map.panTo(center);
      map.setZoom(15);
    }
  }, [map, trigger]); // We intentionally do NOT include center so it doesn't pan continuously on GPS drift
  return null;
};

// Component to dynamically follow the user's location when in active navigation mode (In-App Navigation)
const NavigationCameraFollow = ({ isNavigating, activeLocation }: { isNavigating: boolean; activeLocation: { lat: number; lng: number } | null }) => {
  const map = useMap();
  useEffect(() => {
    if (map && isNavigating && activeLocation) {
      try {
        if (typeof (map as any).animateCamera === 'function') {
          (map as any).animateCamera({
            center: activeLocation,
            zoom: 17,
            tilt: 45,
            heading: 0
          });
        } else if (typeof (map as any).moveCamera === 'function') {
          (map as any).moveCamera({
            center: activeLocation,
            zoom: 17
          });
        } else {
          map.panTo(activeLocation);
          const currentZoom = map.getZoom();
          if (!currentZoom || currentZoom !== 17) {
            map.setZoom(17);
          }
        }
      } catch (e) {
        console.error("Error updating camera follow-me:", e);
        try {
          map.panTo(activeLocation);
        } catch (err) {}
      }
    }
  }, [map, isNavigating, activeLocation]);
  return null;
};

const CustomMapControls = ({ 
  requestGeolocation,
  isNavigating,
  isAutoFollowing,
  setIsAutoFollowing,
  activeLocation
}: { 
  requestGeolocation: () => void;
  isNavigating?: boolean;
  isAutoFollowing?: boolean;
  setIsAutoFollowing?: (val: boolean) => void;
  activeLocation?: { lat: number; lng: number } | null;
}) => {
  const map = useMap();
  
  const handleZoomIn = () => map?.setZoom((map.getZoom() || 14) + 1);
  const handleZoomOut = () => map?.setZoom((map.getZoom() || 14) - 1);

  // Auto-following release hook on manual user drag
  useEffect(() => {
    if (!map || !isNavigating || !setIsAutoFollowing) return;

    const dragListener = map.addListener('dragstart', () => {
      setIsAutoFollowing(false);
    });

    return () => {
      if (dragListener) {
        google.maps.event.removeListener(dragListener);
      }
    };
  }, [map, isNavigating, setIsAutoFollowing]);

  const handleCenterOnMe = () => {
    if (setIsAutoFollowing) setIsAutoFollowing(true);
    if (map && activeLocation) {
      try {
        if (typeof (map as any).animateCamera === 'function') {
          (map as any).animateCamera({
            center: activeLocation,
            zoom: 17,
            tilt: 45,
            heading: 0
          });
        } else if (typeof (map as any).moveCamera === 'function') {
          (map as any).moveCamera({
            center: activeLocation,
            zoom: 17
          });
        } else {
          map.panTo(activeLocation);
          const currentZoom = map.getZoom();
          if (!currentZoom || currentZoom !== 17) {
            map.setZoom(17);
          }
        }
      } catch (e) {
        console.error("Error manual centering in CustomMapControls:", e);
        try {
          map.panTo(activeLocation);
        } catch (err) {}
      }
    }
  };

  return (
    <MapControl position={ControlPosition.RIGHT_BOTTOM}>
      <div className="flex flex-col items-end gap-3 p-4 select-none">
        {/* Horizontal Zoom Controls */}
        <div className="flex flex-row items-center gap-1 bg-white dark:bg-bg-primary rounded-[20px] shadow-premium border border-gray-100 dark:border-gray-800 p-1 backdrop-blur-sm pointer-events-auto">
           <button onClick={handleZoomOut} className="w-12 h-12 flex items-center justify-center text-text-muted hover:text-primary transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-[14px]">
             <Minus size={20}/>
           </button>
           <div className="w-[1px] h-6 bg-gray-100 dark:bg-gray-800"></div>
           <button onClick={handleZoomIn} className="w-12 h-12 flex items-center justify-center text-text-muted hover:text-primary transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-[14px]">
             <Plus size={20}/>
           </button>
        </div>
        
        {/* Geolocation Button or Tracking Refollow Button */}
        {isNavigating ? (
          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleCenterOnMe}
             className={`w-14 h-14 rounded-full shadow-premium flex items-center justify-center transition-all border backdrop-blur-sm p-0 pointer-events-auto relative ${
               isAutoFollowing 
                 ? 'bg-white dark:bg-bg-primary text-text-muted hover:text-primary dark:text-gray-400 border-gray-100 dark:border-gray-800' 
                 : 'bg-primary dark:bg-primary text-white border-primary shadow-[0_4px_20px_rgba(37,99,235,0.45)]'
             }`}
             title="Centrar en mi ubicación de navegación"
          >
             {/* Dynamic indication ring if not auto following */}
             {!isAutoFollowing && (
               <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping" />
             )}
             <Locate size={24} className={!isAutoFollowing ? 'animate-pulse' : 'text-primary dark:text-primary'} />
          </motion.button>
        ) : (
          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={requestGeolocation}
             className="w-14 h-14 bg-white dark:bg-bg-primary text-primary rounded-[20px] shadow-premium flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border border-gray-100 dark:border-gray-800 backdrop-blur-sm group p-0 pointer-events-auto"
             title="Centrar en mi ubicación GPS"
          >
            <Navigation size={24} className="group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </div>
    </MapControl>
  );
};

const MarkersClustering = ({ jobs, onMarkerClick }: { jobs: any[], onMarkerClick: (job: any) => void }) => {
  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<{ [key: string]: google.maps.marker.AdvancedMarkerElement }>({});

  // Initialize Clusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Sync markers with Clusterer
  const jobsSignature = jobs.map(j => j.id).join(',');
  useEffect(() => {
    if (!clusterer.current) return;
    
    // Slight delay to ensure refs are populated
    const timeout = setTimeout(() => {
      if (clusterer.current) {
        clusterer.current.clearMarkers();
        clusterer.current.addMarkers(Object.values(markersRef.current));
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [jobsSignature]);

  return (
    <>
      {jobs.map((job) => (
        <AdvancedMarker
          key={job.id}
          position={{ lat: job.lat, lng: job.lng }}
          ref={(marker) => {
            if (marker) {
              markersRef.current[job.id] = marker;
            } else {
              delete markersRef.current[job.id];
            }
          }}
          onClick={() => onMarkerClick(job)}
        >
          <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95" style={{ width: '56px' }}>
            <div className="flex flex-col items-center">
              {/* Floating Price/Category Badge */}
              <div className="bg-white dark:bg-[#1A1A1A] px-2 py-0.5 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800 mb-1 flex items-center justify-center">
                <span className="text-[7.5px] font-black text-slate-950 dark:text-white whitespace-nowrap">
                  {formatArgentinePrice(job.price).split(',')[0]}
                </span>
              </div>
              
              {/* Beautiful custom Q Isotype Marker Pin */}
              <div className="relative w-10 h-10 bg-[#0052FF] dark:bg-[#1A1A1A] rounded-full p-0.5 shadow-lg border-2 border-white dark:border-[#00D8FF] flex items-center justify-center animate-float">
                {/* Custom Gradient Q representation inside */}
                <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id={`markerQGradient-${job.id}`} x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0052FF" />
                      <stop offset="100%" stopColor="#00D8FF" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="32" stroke="url(#markerQGradient-${job.id})" strokeWidth="20" strokeLinecap="round" fill="none" />
                  <path d="M 68 68 L 86 86" stroke="url(#markerQGradient-${job.id})" strokeWidth="20" strokeLinecap="round" />
                </svg>
                
                {/* Urgent small badge */}
                {job.urgent && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-450 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
                  </span>
                )}
              </div>
              
              {/* Tiny pin bottom pointer */}
              <div className="w-2.5 h-2.5 bg-[#0052FF] dark:bg-[#00D8FF] rotate-45 -mt-1.5 shadow-md"></div>
            </div>
          </div>
        </AdvancedMarker>
      ))}
    </>
  );
};

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; 
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180)
}

function formatRelativeTime(createdAt: any): string {
  if (!createdAt) return 'Hace un momento';
  
  let date: Date;
  
  if (typeof createdAt.toDate === 'function') {
    date = createdAt.toDate();
  } else if (createdAt instanceof Date) {
    date = createdAt;
  } else if (typeof createdAt === 'object' && createdAt.seconds !== undefined) {
    date = new Date(createdAt.seconds * 1000);
  } else if (typeof createdAt === 'number') {
    date = new Date(createdAt);
  } else if (typeof createdAt === 'string') {
    date = new Date(createdAt);
  } else {
    return 'Hace un momento';
  }
  
  const diffMs = Date.now() - date.getTime();
  
  if (isNaN(diffMs) || diffMs < 0) {
    return 'Hace un momento';
  }
  
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) {
    return 'Hace un momento';
  }
  
  if (diffMinutes < 60) {
    return diffMinutes === 1 ? 'Hace 1 minuto' : `Hace ${diffMinutes} minutos`;
  }
  
  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 24) {
    return diffHours === 1 ? 'Hace 1 hora' : `Hace ${diffHours} horas`;
  }
  
  const diffDays = Math.floor(diffMs / 86400000);
  return diffDays === 1 ? 'Hace 1 día' : `Hace ${diffDays} días`;
}

function formatArgentinePrice(price: any): string {
  if (!price) return 'A convenir';
  if (typeof price === 'string' && price.toLowerCase().includes('convenir')) {
    return 'A convenir';
  }
  
  const cleanPrice = typeof price === 'string' ? price : String(price);
  const digits = cleanPrice.replace(/\D/g, '');
  if (!digits) {
    return cleanPrice;
  }
  
  const value = parseInt(digits, 10);
  if (isNaN(value)) {
    return cleanPrice;
  }
  
  const formattedNum = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
  
  return `$${formattedNum} ARS`;
}

function RouteDisplay({ origin, destination, durationLabelCallback, onPathLoaded }: {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  durationLabelCallback?: (durationText: string) => void;
  onPathLoaded?: (path: { lat: number; lng: number }[]) => void;
}) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const geometryLib = useMapsLibrary('geometry');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const lastComputedDestRef = useRef<string | null>(null);

  // Store callbacks and origin in refs to avoid triggering updates
  const durationLabelCallbackRef = useRef(durationLabelCallback);
  useEffect(() => {
    durationLabelCallbackRef.current = durationLabelCallback;
  }, [durationLabelCallback]);

  const onPathLoadedRef = useRef(onPathLoaded);
  useEffect(() => {
    onPathLoadedRef.current = onPathLoaded;
  }, [onPathLoaded]);

  const originRef = useRef(origin);
  useEffect(() => {
    originRef.current = origin;
  }, [origin]);

  const getLatVal = (coord: any): number => {
    if (!coord) return 0;
    if (typeof coord.lat === 'function') return coord.lat();
    if (typeof coord.lat === 'number') return coord.lat;
    return Number(coord.lat || 0);
  };

  const getLngVal = (coord: any): number => {
    if (!coord) return 0;
    if (typeof coord.lng === 'function') return coord.lng();
    if (typeof coord.lng === 'number') return coord.lng;
    return Number(coord.lng || 0);
  };

  const destLat = getLatVal(destination);
  const destLng = getLngVal(destination);
  const destKey = `${destLat.toFixed(5)},${destLng.toFixed(5)}`;

  useEffect(() => {
    if (!routesLib || !map || !destKey) return;
    
    // Check if we already computed for this exact destination to trigger single-run layout loading
    if (lastComputedDestRef.current === destKey) {
      return;
    }

    lastComputedDestRef.current = destKey;

    // Clean up previous polylines
    polylinesRef.current.forEach(p => p.setMap(null));
    polylinesRef.current = [];

    const currentOrigin = originRef.current || { lat: -31.4245, lng: -64.2345 };

    routesLib.Route.computeRoutes({
      origin: currentOrigin,
      destination: { lat: destLat, lng: destLng },
      travelMode: 'DRIVING',
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport', 'localizedValues'],
    }).then(({ routes }) => {
      if (routes?.[0]) {
        const route = routes[0] as any;
        
        // Extract polyline points
        let pathLine: google.maps.LatLngLiteral[] | undefined;
        if (route.path) {
           pathLine = route.path;
        } else if (route.polyline) {
          if (typeof google !== 'undefined' && google.maps.geometry?.encoding) {
              pathLine = google.maps.geometry.encoding.decodePath(route.polyline.encodedPolyline || route.polyline.encodedPath as string) as any;
          }
        }
        
        if (pathLine && Array.isArray(pathLine)) {
          const polyline = new google.maps.Polyline({
            path: pathLine,
            strokeColor: '#3b82f6', // Tailwind blue-500
            strokeWeight: 6,
            strokeOpacity: 0.8,
            zIndex: 50,
            map
          });
          polylinesRef.current = [polyline];

          if (onPathLoadedRef.current) {
            const parsedCoords = pathLine.map((p: any) => {
              if (!p) return { lat: 0, lng: 0 };
              const latVal = typeof p.lat === 'function' ? p.lat() : p.lat;
              const lngVal = typeof p.lng === 'function' ? p.lng() : p.lng;
              return { lat: Number(latVal), lng: Number(lngVal) };
            }).filter(pt => pt.lat !== 0 && pt.lng !== 0);
            
            if (parsedCoords.length > 0) {
              setTimeout(() => {
                onPathLoadedRef.current?.(parsedCoords);
              }, 0);
            }
          }
        } else {
           console.warn("Could not extract path from route object:", route);
        }

        let durationStr = '5 min';
        if (route.localizedValues?.duration) {
          durationStr = typeof route.localizedValues.duration === 'string' 
             ? route.localizedValues.duration 
             : route.localizedValues.duration.text || '5 min';
        } else if (route.duration) {
          const seconds = parseInt(route.duration);
          const mins = Math.ceil(seconds / 60);
          durationStr = `${mins} min`;
        } else if (route.durationMillis) {
          const mins = Math.ceil(parseInt(route.durationMillis) / 60000);
          durationStr = `${mins} min`;
        }

        setTimeout(() => {
          durationLabelCallbackRef.current?.(durationStr);
        }, 0);

        // Fit bounds exactly once when newly computed
        if (route.viewport) {
          map.fitBounds(route.viewport, { top: 120, bottom: 250, left: 40, right: 40 });
        }
      }
    }).catch(err => {
      console.error("Error computing routes:", err);
    });

  }, [routesLib, map, destKey, destLat, destLng]);

  // Clean up on unmount or target replacement
  useEffect(() => {
    return () => {
      polylinesRef.current.forEach(p => p.setMap(null));
      polylinesRef.current = [];
    };
  }, []);

  return null;
}

export default function NearbyJobs({ 
  onProfileClick, 
  onTabChange,
  hiddenJobIds = [], 
  navigateTarget,
  onCloseNavigation,
  onJobAccepted 
}: { 
  onProfileClick?: () => void,
  onTabChange?: (tab: string) => void,
  hiddenJobIds?: string[],
  navigateTarget?: any,
  onCloseNavigation?: () => void,
  onJobAccepted?: (job: typeof MOCK_JOBS[0]) => void
}) {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const dragControls = useDragControls();
  const filterDragControls = useDragControls();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedJob, setSelectedJob] = useState<typeof MOCK_JOBS[0] | null>(null);
  const [routeDuration, setRouteDuration] = useState<string>('5 min');
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [deletedNotifIds, setDeletedNotifIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('deletedNotifIds_pro') || '[]');
    } catch {
      return [];
    }
  });

  const handleDeleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = [...deletedNotifIds, id];
    setDeletedNotifIds(updated);
    localStorage.setItem('deletedNotifIds_pro', JSON.stringify(updated));

    if (!id.startsWith('notif-pro')) {
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
    localStorage.setItem('deletedNotifIds_pro', JSON.stringify(updated));

    const realIds = allIds.filter(id => !id.startsWith('notif-pro'));
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

  const handleNotificationClick = async (notif: any) => {
    // 1. Close notifications popup list
    setShowNotificationsList(false);

    // 2. If it's a message or chat notification
    if (notif.type === 'message' || notif.title?.toLowerCase().includes('mensaje') || notif.description?.toLowerCase().includes('mensaje')) {
      if (onTabChange) {
        onTabChange('messages');
      }
      return;
    }

    // 3. If it's a success / billing / feedback notification, option to go to "Historial" (activity)
    if (notif.type === 'success' || notif.title?.toLowerCase().includes('acreditados') || notif.title?.toLowerCase().includes('reseña') || notif.title?.toLowerCase().includes('calificó')) {
      if (onTabChange) {
        onTabChange('activity');
      }
      return;
    }

    // 4. If it's a hiring request or has a jobId
    if (notif.jobId || notif.type === 'hire_request' || notif.title?.toLowerCase().includes('solicitud') || notif.title?.toLowerCase().includes('contratación')) {
      if (onTabChange) {
        onTabChange('home');
      }
      const targetJobId = notif.jobId;
      if (targetJobId) {
        // Search in local list of pending jobs first
        const found = firestoreJobs.find(j => j.id === targetJobId);
        if (found) {
          setSelectedJob(found);
          return;
        }

        // Fetch from Firestore directly in case it is already accepted, assigned, or not in current radius
        try {
          const jobDoc = await getDoc(doc(db, 'jobs', targetJobId));
          if (jobDoc.exists()) {
            const data = jobDoc.data();
            const fullJob = {
              id: jobDoc.id,
              title: (data.category || 'Servicio') + " - " + (data.description || "Nueva solicitud"),
              category: data.category || 'Servicio',
              price: data.price ? data.price.replace(/Desde\s*/i, '') : 'A convenir',
              lat: data.location?.lat || DEFAULT_CENTER.lat,
              lng: data.location?.lng || DEFAULT_CENTER.lng,
              urgent: data.urgent || false,
              description: data.description || 'Contratación directa solicitada',
              image: data.image || 'https://picsum.photos/seed/job/600/400',
              clientAvatar: data.clientAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.clientId || 'anon'}`,
              clientName: data.clientName || 'Cliente',
              paymentMethods: data.paymentMethods || ['Efectivo'],
              clientLevel: data.clientLevel || 'normal',
              isReal: true,
              originalData: data
            };
            setSelectedJob(fullJob);
            return;
          }
        } catch (err) {
          console.error("Error loading job from notification click:", err);
        }
      }

      // Dynamic fallback if no matching job ID, open first available pending job
      if (firestoreJobs.length > 0) {
        setSelectedJob(firestoreJobs[0]);
      } else {
        alert("La solicitud ya no está de forma activa para postularse.");
      }
    }
  };
  const [locationPermission, setLocationPermission] = useState<'loading' | 'granted' | 'denied'>('loading');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number}>(DEFAULT_CENTER);
  
  // In-App Navigation Active Tracking & Smooth Simulated Movement State
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeNavLocation, setActiveNavLocation] = useState<{lat: number, lng: number} | null>(null);
  const [navigationPath, setNavigationPath] = useState<{lat: number, lng: number}[]>([]);
  const [isAutoFollowing, setIsAutoFollowing] = useState(true);
  const [forceHideRoute, setForceHideRoute] = useState(false);
  const [showArrivalToast, setShowArrivalToast] = useState(false);

  const [geoTrigger, setGeoTrigger] = useState(0);
  const [hasCenteredOnGPS, setHasCenteredOnGPS] = useState(false);
  const [showNotificationsList, setShowNotificationsList] = useState(false);
  const [searchRadius, setSearchRadius] = useState(() => parseInt(localStorage.getItem('searchRadius') || '15', 10));
  const [showTip, setShowTip] = useState(() => !sessionStorage.getItem('hideTip'));
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | 'Todos'>('Todos');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'high' | 'normal'>('all');
  const [isOffering, setIsOffering] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [firestoreJobs, setFirestoreJobs] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  // Memoized destination object to harmonize coordinates and address info
  const resolvedTarget = useMemo(() => {
    if (!navigateTarget) return null;
    return {
      ...navigateTarget,
      address: "4496, Alberto Williams, Residencial San Roque, Córdoba",
      location: { lat: -31.4262604, lng: -64.2458922 }
    };
  }, [navigateTarget]);

  // Clean up navigation path when target changes
  useEffect(() => {
    setNavigationPath([]);
    setIsNavigating(false);
    setActiveNavLocation(null);
    setIsAutoFollowing(true);
    setForceHideRoute(false);
    setShowArrivalToast(false);
  }, [navigateTarget]);

  // Ref-based cache to stabilize the simulation path and current user GPS coordinates without resetting the timer
  const navigationPathRef = useRef(navigationPath);
  useEffect(() => {
    navigationPathRef.current = navigationPath;
  }, [navigationPath]);

  // Simulated movement for visual In-App Navigation tracking
  useEffect(() => {
    if (!isNavigating || !resolvedTarget) {
      setActiveNavLocation(null);
      return;
    }

    const startLoc = userLocationRef.current || DEFAULT_CENTER;
    const destLoc = resolvedTarget.location;

    // Build the sample points to traverse using the latest ref values at startup
    const pathPoints: {lat: number, lng: number}[] = [];
    const targetSteps = 35; // 35 incremental steps for a realistic driving visual pace

    const currentPath = navigationPathRef.current;
    if (currentPath && currentPath.length >= 2) {
      // High fidelity: Sample intermediate points directly along street curves computed by the Directions service
      for (let i = 0; i < targetSteps; i++) {
        const ratioIndex = Math.floor((i / (targetSteps - 1)) * (currentPath.length - 1));
        pathPoints.push(currentPath[ratioIndex]);
      }
    } else {
      // Fallback: Linear interpolation
      for (let i = 0; i < targetSteps; i++) {
        const ratio = i / (targetSteps - 1);
        pathPoints.push({
          lat: startLoc.lat + (destLoc.lat - startLoc.lat) * ratio,
          lng: startLoc.lng + (destLoc.lng - startLoc.lng) * ratio,
        });
      }
    }

    // Force destination as our absolute last step to guarantee accuracy
    if (pathPoints.length > 0) {
      pathPoints[pathPoints.length - 1] = destLoc;
    }

    setActiveNavLocation(pathPoints[0]);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= pathPoints.length) {
        clearInterval(interval);
        setIsNavigating(false);
        setActiveNavLocation(destLoc);
        setForceHideRoute(true);
        setShowArrivalToast(true);
        setTimeout(() => {
          setShowArrivalToast(false);
        }, 5000);
        return;
      }
      setActiveNavLocation(pathPoints[currentStep]);
    }, 700); // 700ms step intervals for comfortable visual driving speed representation

    return () => clearInterval(interval);
  }, [isNavigating, resolvedTarget]);

  const userRef = useRef(user);
  const userLocationRef = useRef(userLocation);
  const searchRadiusRef = useRef(searchRadius);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  useEffect(() => {
    searchRadiusRef.current = searchRadius;
  }, [searchRadius]);

  // Collapse dropdown when filter panel closes
  useEffect(() => {
    if (!showFilter) {
      setIsCategoryDropdownOpen(false);
    }
  }, [showFilter]);

  // Track user activity to determine online status
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      setIsOnline(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsOnline(false);
      }, 5 * 60 * 1000); // 5 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, []);

  // Listen for real pending jobs
  useEffect(() => {
    let isInitialLoad = true;

    const q = query(
      collection(db, 'jobs'),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let docList = snapshot.docs;
      docList.sort((a, b) => {
        const t1 = a.data().createdAt?.toMillis ? a.data().createdAt.toMillis() : 0;
        const t2 = b.data().createdAt?.toMillis ? b.data().createdAt.toMillis() : 0;
        return t2 - t1;
      });
      const jobs = docList.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.category + " - " + (data.description || "Solicitud"),
          category: data.category,
          price: data.price ? data.price.replace(/Desde\s*/i, '') : 'A convenir',
          lat: data.location?.lat || DEFAULT_CENTER.lat,
          lng: data.location?.lng || DEFAULT_CENTER.lng,
          urgent: data.urgent || false,
          description: data.description,
          image: data.image || 'https://picsum.photos/seed/job/600/400',
          clientAvatar: data.clientAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.clientId}`,
          clientName: data.clientName || 'Cliente',
          paymentMethods: data.paymentMethods,
          clientLevel: data.clientLevel || 'normal',
          isReal: true,
          createdAt: data.createdAt,
          originalData: data
        };
      });
      setFirestoreJobs(jobs);

      // Trigger nearby request toast only for newly added jobs in real-time
      if (!isInitialLoad) {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data();
            
            // Match specialty (category) of the professional profile
            const userProfessions = userRef.current?.professions || ['Electricista'];
            const isMatchingSpecialty = userProfessions.some((p: string) => p.toLowerCase() === data.category?.toLowerCase());
            
            // Match coverage zone
            let isMatchingZone = true;
            const currentLoc = userLocationRef.current || DEFAULT_CENTER;
            if (data.location?.lat != null && data.location?.lng != null) {
              const distance = getDistanceFromLatLonInKm(currentLoc.lat, currentLoc.lng, data.location.lat, data.location.lng);
              isMatchingZone = distance <= searchRadiusRef.current;
            }
            
            if (isMatchingSpecialty && isMatchingZone) {
              setShowNotification(true);
            }
          }
        });
      }
      isInitialLoad = false;
    }, (error) => {
      handleFirestoreError(error, 'list', 'jobs');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleRadiusChange = () => {
      setSearchRadius(parseInt(localStorage.getItem('searchRadius') || '15', 10));
    };
    window.addEventListener('searchRadiusChanged', handleRadiusChange);
    return () => window.removeEventListener('searchRadiusChanged', handleRadiusChange);
  }, []);

  // Request & check geolocation
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocationPermission('denied');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocationPermission('granted');
        const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserLocation(loc);
        setHasCenteredOnGPS((prev) => {
          if (!prev) {
            setGeoTrigger((t) => t + 1);
            return true;
          }
          return prev;
        });
      },
      (error) => {
        console.warn("Geolocation error:", error);
        // Don't fully block if it was previously granted and now just failed a refresh
        setLocationPermission((prev) => prev === 'granted' ? 'granted' : 'denied');
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const requestGeolocation = () => {
    setLocationPermission('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationPermission('granted');
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setGeoTrigger(prev => prev + 1);
      },
      (error) => {
        setLocationPermission('denied');
      }
    );
  };

  const handleOfferService = async () => {
    if (!selectedJob || !user) return;

    // RULE: If client is high level, professional must be premium (active)
    if (selectedJob.clientLevel === 'alto' && user.role !== 'premium') {
      setShowSubscriptionModal(true);
      return;
    }

    setIsOffering(true);
    
    try {
      const { collection, addDoc, serverTimestamp, doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      
      let finalJobId = "";

      if ((selectedJob as any).isReal) {
        // Update existing job
        const jobRef = doc(db, 'jobs', selectedJob.id);
        await updateDoc(jobRef, {
          professionalId: user.uid,
          professionalName: user.displayName || 'Profesional',
          professionalAvatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
          status: 'accepted',
          updatedAt: serverTimestamp()
        });
        finalJobId = selectedJob.id;

        // Notify client
        await addDoc(collection(db, 'notifications'), {
          recipientId: (selectedJob as any).originalData?.clientId || 'anonymous-client',
          title: '¡Trabajo aceptado!',
          description: `${user.displayName || 'Un profesional'} ha aceptado tu solicitud de ${(selectedJob as any).category}.`,
          type: 'hire_request',
          jobId: selectedJob.id,
          senderId: user.uid,
          read: false,
          createdAt: serverTimestamp()
        });
      } else {
        // Create a real job document in Firestore for mock jobs so it appears in Chat and Activity
        const jobDoc = await addDoc(collection(db, 'jobs'), {
          clientId: 'mock-client-id-' + selectedJob.id, 
          clientName: selectedJob.clientName,
          clientAvatar: selectedJob.clientAvatar,
          professionalId: user.uid,
          professionalName: user.displayName || 'Profesional',
          professionalAvatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
          category: selectedJob.category,
          title: selectedJob.title,
          description: selectedJob.description,
          price: selectedJob.price,
          image: selectedJob.image || '',
          status: 'accepted', 
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
          location: {
            lat: selectedJob.lat,
            lng: selectedJob.lng,
            address: 'Ubicación del trabajo'
          }
        });
        finalJobId = jobDoc.id;
      }

      // Also add an initial system message or application message
      const messagesPath = `jobs/${finalJobId}/messages`;
      await addDoc(collection(db, messagesPath), {
        senderId: user.uid,
        text: `¡Hola! Vi tu solicitud de ${selectedJob.title || 'Electricista'} y tengo disponibilidad inmediata para ayudarte. Contá conmigo.`,
        createdAt: serverTimestamp()
      });
      
      if (onJobAccepted) {
        onJobAccepted(selectedJob);
      }
      setSelectedJob(null);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      const { handleFirestoreError } = await import('../lib/firebase');
      handleFirestoreError(error, 'write', 'jobs');
    } finally {
      setIsOffering(false);
    }
  };

  // Real-time notifications listener
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

  const mapCenter = userLocation || DEFAULT_CENTER;

  // Load and calculate distances only for real-time clients/jobs from Firestore (no simulation or demos)
  const allDynamicJobs = React.useMemo(() => {
    const jobs = [...firestoreJobs]; // Start with real ones
    
    // Use a fixed center to generate the base distance calculations
    const baseCenter = DEFAULT_CENTER;
    
    // Add distance to real ones
    jobs.forEach(job => {
      const realDist = getDistanceFromLatLonInKm(baseCenter.lat, baseCenter.lng, job.lat, job.lng);
      (job as any).distanceInKm = realDist;
      (job as any).distance = `${realDist.toFixed(1)} km`;
    });

    return jobs.sort((a: any, b: any) => a.distanceInKm - b.distanceInKm);
  }, [firestoreJobs]);

  const dynamicJobsWithDistances = React.useMemo(() => {
    return allDynamicJobs.map(job => {
      const realDist = getDistanceFromLatLonInKm(mapCenter.lat, mapCenter.lng, job.lat, job.lng);
      return {
        ...job,
        distanceInKm: realDist,
        distance: `${realDist.toFixed(1)} km`
      };
    });
  }, [allDynamicJobs, mapCenter.lat, mapCenter.lng]);

  // Filter jobs by current search radius and category
  const dynamicJobs = React.useMemo(() => {
    return dynamicJobsWithDistances.filter(job => {
      const radiusMatch = job.distanceInKm <= searchRadius;
      const categoryMatch = selectedCategory === 'Todos' || job.category === selectedCategory;
      const urgencyMatch = urgencyFilter === 'all' || 
                           (urgencyFilter === 'high' && job.urgent) || 
                           (urgencyFilter === 'normal' && !job.urgent);
      const isNotHidden = !hiddenJobIds.includes(job.id);
      return radiusMatch && categoryMatch && urgencyMatch && isNotHidden;
    });
  }, [dynamicJobsWithDistances, searchRadius, hiddenJobIds, selectedCategory, urgencyFilter]);

  const categories = [
    'Todos',
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

  if (!hasValidKey) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif'}} className="bg-bg-primary">
        <div style={{textAlign:'center',maxWidth:520}} className="p-8 bg-white dark:bg-bg-secondary rounded-[32px] shadow-premium">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <MapIcon size={40} />
          </div>
          <h2 className="text-2xl font-black text-text-main mb-4 font-manrope">Google Maps API Key Required</h2>
          <p className="text-text-muted mb-6">Configura tu llave de API para visualizar el mapa interactivo con estética premium.</p>
          <div className="text-left space-y-4 mb-8">
            <p className="font-bold text-text-main text-sm">Pasos para activar:</p>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <p className="text-xs text-text-muted">Obtén una API Key en <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener" className="text-primary font-bold hover:underline">Google Cloud Console</a>.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <p className="text-xs text-text-muted">Abre <strong>Settings</strong> (Icono ⚙️ arriba a la derecha).</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <p className="text-xs text-text-muted">Ve a <strong>Secrets</strong>, agrega <code>GOOGLE_MAPS_PLATFORM_KEY</code> y pega tu llave.</p>
            </div>
          </div>
          <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">La aplicación se reiniciará automáticamente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-transparent overflow-hidden font-inter">
      <APIProvider apiKey={API_KEY} version="weekly">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/95 dark:bg-bg-secondary/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/10 shadow-md">
        {/* Left aligned logo as dominant element with status badge underneath */}
        <div className="flex items-center gap-2 select-none filter drop-shadow-[0_1.5px_3.5px_rgba(0,82,255,0.18)]">
          <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <defs>
              <linearGradient id="qGradientHead_Inicio_Exact" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0052FF" />
                <stop offset="100%" stopColor="#00D8FF" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="32" stroke="url(#qGradientHead_Inicio_Exact)" strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M 68 68 L 84 84" stroke="url(#qGradientHead_Inicio_Exact)" strokeWidth="18" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight font-manrope text-slate-900 dark:text-white leading-none">
              Quick<span className="text-[#0052FF] dark:text-[#00D8FF]">Fix</span>
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-text-muted-more shrink-0">
                {user?.role === 'client' ? 'Perfil Cliente' : 'Inicio'}
              </span>
              <span className="text-[8px] text-slate-300 dark:text-slate-700 font-bold">•</span>
              <div className="flex items-center gap-1">
                <span className={`block w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-[#00D8FF] animate-pulse' : 'bg-gray-400'}`}></span>
                <span className={`text-[8px] font-black uppercase tracking-wider ${isOnline ? 'text-primary dark:text-[#00D8FF]' : 'text-gray-400'}`}>
                  {isOnline ? 'EN LÍNEA' : 'DESCONECTADO'}
                </span>
              </div>
            </div>
          </div>
        </div>

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
                  <img src={user.photoURL || undefined} alt="Pro" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted">
                     <UserIcon size={24} />
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
                      <div className="flex gap-3 pr-7 cursor-pointer" onClick={() => handleNotificationClick(notif)}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'hire_request' ? 'bg-primary/10 text-primary' : notif.type === 'success' ? 'bg-success/10 text-success' : 'bg-secondary/10 text-secondary'}`}>
                          <Bell size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#111111] dark:text-white leading-tight break-words">{notif.title}</p>
                          <p className="text-xs text-gray-500 mt-1 break-words">{notif.description}</p>
                          <p className="text-[10px] font-bold text-text-muted mt-1 uppercase tracking-wider">{notif.time}</p>
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
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <Bell size={24} />
                    </div>
                    <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Sin notificaciones nuevas</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Geolocation Permission Overlay */}
      <AnimatePresence>
        {locationPermission === 'loading' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-bg-secondary flex flex-col items-center justify-center p-6"
          >
             <Loader2 size={40} className="text-primary animate-spin mb-4" />
             <p className="font-bold text-text-main">Obteniendo tu ubicación...</p>
          </motion.div>
        )}

        {locationPermission === 'denied' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
             <div className="bg-white rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
                <div className="w-20 h-20 bg-[#fee2e2] rounded-full flex items-center justify-center text-[#ba1a1a] mb-6">
                   <ShieldAlert size={40} />
                </div>
                <h2 className="text-2xl font-bold font-manrope text-[#000000] mb-2">Permiso necesario</h2>
                <p className="text-gray-500 text-sm mb-8">
                  Para poder mostrarte los trabajos cercanos y enviarte alertas en tiempo real, necesitamos acceder a tu ubicación.
                </p>
                <button 
                  onClick={requestGeolocation}
                  className="w-full h-14 bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-2xl font-bold shadow-lg hover:bg-[#1e3a8a] transition-colors"
                >
                  Permitir Ubicación
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative mt-16 pb-24">
        {/* Map View Background (Google Maps) */}
        <div className="absolute -top-16 -bottom-24 left-0 right-0 bg-[#e5e7eb] overflow-hidden">
          <Map
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={14}
            mapId="7d6c6a6f6c6d6e6f"
            disableDefaultUI={false}
            gestureHandling="greedy"
            options={{
              clickableIcons: true,
              draggable: true,
              scrollwheel: true,
              mapTypeControl: false,
              zoomControl: false,
              fullscreenControl: false,
              streetViewControl: false,
              padding: { top: 92, right: 14, bottom: 90, left: 14 },
              styles: CLEAN_MAP_STYLES
            }}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            className="w-full h-full z-0"
          >
            <MapUpdater center={mapCenter} trigger={geoTrigger} />
            
            <MarkersClustering jobs={dynamicJobs} onMarkerClick={setSelectedJob} />
            
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <div className="w-6 h-6 bg-[#2563EB] border-4 border-white rounded-full shadow-[0_0_0_6px_rgba(37,99,235,0.2)] animate-pulse" />
              </AdvancedMarker>
            )}
 
            <CustomMapControls 
              requestGeolocation={requestGeolocation} 
              activeLocation={userLocation}
            />
          </Map>
        </div>
 
        {/* View Toggle */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex bg-white/90 dark:bg-bg-primary/90 backdrop-blur-md rounded-[16px] shadow-sm p-1.5 z-40 border border-white/50 dark:border-white/5">
          <button 
            onClick={() => setViewMode('map')}
            className={`px-4 py-2.5 rounded-xl text-[11px] sm:text-[12px] font-black transition-all flex items-center gap-2 ${
              viewMode === 'map' ? 'bg-primary text-white shadow-soft scale-100' : 'text-text-muted hover:text-primary scale-95'
            }`}
          >
            <MapIcon size={14} className={viewMode === 'map' ? "fill-white/20" : ""} /> MAPA
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-2.5 rounded-xl text-[11px] sm:text-[12px] font-black transition-all flex items-center gap-2 ${
              viewMode === 'list' ? 'bg-primary text-white shadow-soft scale-100' : 'text-text-muted hover:text-primary scale-95'
            }`}
          >
            <List size={14} /> LISTA
          </button>
        </div>

            {/* Filter Dropdown */}
            <div className="absolute top-8 right-5 z-40">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setShowFilter(!showFilter)}
                 className={`w-12 h-12 rounded-[18px] flex items-center justify-center transition-all shadow-premium border backdrop-blur-md relative group flex-shrink-0 ${
                   showFilter || selectedCategory !== 'Todos' || urgencyFilter !== 'all'
                     ? 'bg-primary text-white border-white/20' 
                     : 'bg-white/90 dark:bg-bg-primary/90 text-text-muted hover:text-primary border-white/80 dark:border-white/5'
                 }`}
               >
                  <Filter size={22} className={`${selectedCategory !== 'Todos' || urgencyFilter !== 'all' ? "fill-white/20" : "group-hover:rotate-12 transition-transform"}`} />
                  { (selectedCategory !== 'Todos' || urgencyFilter !== 'all') && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-alert text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {(selectedCategory !== 'Todos' ? 1 : 0) + (urgencyFilter !== 'all' ? 1 : 0)}
                    </span>
                  )}
               </motion.button>
            </div>

        <AnimatePresence>
          {showFilter && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilter(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[1999]"
              />
              <motion.div
                initial={{ y: '100%', opacity: 0.8 }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                drag="y"
                dragControls={filterDragControls}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.5 }}
                onDragEnd={(event, info) => {
                  if (info.offset.y > 100 || info.velocity.y > 500) {
                    setShowFilter(false);
                  }
                }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0.8 }}
                className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full sm:w-[95%] max-w-[460px] bg-bg-primary dark:bg-bg-secondary rounded-t-[32px] sm:rounded-t-[48px] shadow-premium border border-gray-100 dark:border-gray-800 overflow-y-auto no-scrollbar px-6 pb-24 z-[2000] h-[calc(100vh-32px)] flex flex-col"
              >
                {/* Handle para deslizar */}
                <div 
                  onPointerDown={(e) => filterDragControls.start(e)}
                  className="w-full pt-1 pb-4 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
                >
                  <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>

                <div className="flex justify-between items-center mb-3 shrink-0">
                   <h3 className="font-extrabold text-text-main text-sm sm:text-base uppercase tracking-widest">Filtros</h3>
                   <div className="flex items-center gap-2">
                     <button 
                       onClick={() => { 
                         setSelectedCategory('Todos'); 
                         setUrgencyFilter('all');
                         setIsCategoryDropdownOpen(false);
                       }}
                       className="text-xs font-black text-primary hover:underline uppercase tracking-wider px-2.5 py-1.5"
                     >
                       Limpiar
                     </button>
                     <button 
                       onClick={() => setShowFilter(false)}
                       className="w-10 h-10 flex items-center justify-center bg-bg-secondary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors text-text-muted hover:text-alert"
                     >
                       <X size={20} />
                     </button>
                   </div>
                </div>
                
                <div 
                  onPointerDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="overflow-y-auto pr-1 flex-1 pb-4 cursor-default overscroll-contain"
                >
                  <div className="flex flex-col gap-2">
                     <p className="text-[10px] font-bold text-text-muted mb-2 uppercase tracking-widest opacity-50 font-manrope">Categorías de servicio</p>
                     
                     {/* Selector Dropdown / Acordeón Premium */}
                     <div className="relative mb-4">
                       <button
                         type="button"
                         onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                         className="w-full flex justify-between items-center bg-bg-secondary hover:bg-gray-150 dark:hover:bg-gray-800/80 px-5 py-4 rounded-2xl border border-gray-150 dark:border-gray-800/80 font-bold text-sm text-text-main transition-all group"
                       >
                         <span className="truncate">{selectedCategory}</span>
                         <ChevronDown 
                           size={18} 
                           className={`text-text-muted transition-transform duration-200 shrink-0 ${isCategoryDropdownOpen ? "rotate-180" : ""}`} 
                         />
                       </button>

                       <AnimatePresence>
                         {isCategoryDropdownOpen && (
                           <motion.div
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             exit={{ opacity: 0, height: 0 }}
                             transition={{ duration: 0.2 }}
                             className="w-full mt-2 bg-bg-secondary/40 rounded-2xl border border-gray-150 dark:border-gray-800/80 overflow-hidden flex flex-col shadow-inner"
                           >
                             <div className="overflow-y-auto py-2 divide-y divide-gray-100/50 dark:divide-gray-800/30 max-h-[260px] scrollbar-thin">
                               {categories.map((cat) => (
                                 <button
                                   type="button"
                                   key={cat}
                                   onClick={() => {
                                     setSelectedCategory(cat);
                                     setIsCategoryDropdownOpen(false);
                                   }}
                                   className={`w-full text-left px-5 py-3.5 text-xs sm:text-sm transition-all flex items-center justify-between ${
                                     selectedCategory === cat
                                       ? 'bg-primary/10 text-primary font-extrabold'
                                       : 'text-text-muted hover:bg-primary/5 font-semibold'
                                   }`}
                                 >
                                    <span className="truncate pr-4">{cat}</span>
                                    {selectedCategory === cat && <CheckCircle size={16} className="text-primary shrink-0" />}
                                 </button>
                               ))}
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>

                     <div className="hidden">
                       {categories.map(cat => (
                         <button
                           key={cat}
                           onClick={() => {
                             setSelectedCategory(cat);
                             setShowFilter(false);
                           }}
                           className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-between ${
                             selectedCategory === cat 
                               ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                               : 'text-text-muted hover:bg-bg-secondary border border-transparent'
                           }`}
                         >
                           {cat}
                           {selectedCategory === cat && <CheckCircle size={18} className="text-primary" />}
                         </button>
                       ))}
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                     <p className="text-[10px] font-bold text-text-muted mb-4 uppercase tracking-widest opacity-50 font-manrope">Grado de Urgencia</p>
                     <div className="grid grid-cols-3 gap-3">
                        {(['all', 'high', 'normal'] as const).map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setUrgencyFilter(filter)}
                            className={`py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all border ${
                              urgencyFilter === filter
                                ? 'bg-primary text-white border-primary shadow-[0_8px_20px_rgba(62,154,179,0.4)]'
                                : 'bg-bg-secondary text-text-muted border-transparent hover:border-gray-200'
                            }`}
                          >
                            {filter === 'all' ? 'Todas' : filter === 'high' ? 'Alta' : 'Normal'}
                          </button>
                        ))}
                     </div>
                   </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 pb-8">
                     <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-50 font-manrope">Radio de búsqueda</p>
                       <span className="text-sm font-black text-primary bg-primary/10 px-2 py-1 rounded-lg">{searchRadius}km</span>
                     </div>
                     <div 
                       onPointerDown={(e) => e.stopPropagation()} 
                       onTouchStart={(e) => e.stopPropagation()}
                       className="w-full py-2 touch-none"
                     >
                       <input 
                         type="range" 
                         min="1" 
                         max="100" 
                         value={searchRadius}
                         onChange={(e) => {
                           const val = e.target.value;
                           setSearchRadius(parseInt(val, 10));
                           localStorage.setItem('searchRadius', val);
                         }}
                         className="w-full accent-primary h-2 bg-bg-secondary rounded-full cursor-pointer touch-none"
                         style={{ touchAction: 'none' }}
                       />
                     </div>
                   </div>
                 </div>
                 
                 <button 
                   onClick={() => setShowFilter(false)}
                   className="mt-3 w-3/4 mx-auto py-2.5 bg-primary text-white rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-premium shrink-0 transition-all hover:brightness-105"
                 >
                   Aplicar Filtros
                 </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* List View Overlay */}
        <AnimatePresence>
          {viewMode === 'list' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 z-30 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-3xl overflow-y-auto pt-[90px] px-6 pb-[160px]"
            >
              <div className="flex flex-col gap-4 max-w-lg mx-auto">
                {dynamicJobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center px-6 bg-bg-secondary/40 backdrop-blur-md rounded-[32px] border border-gray-100 dark:border-gray-800 mt-6 shadow-soft">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-40" />
                      <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center text-primary relative border border-primary/20">
                        <Zap size={36} className="fill-primary/20 animate-pulse text-primary" />
                      </div>
                    </div>
                    <h4 className="font-extrabold text-xl text-text-main font-manrope">Radar en Tiempo Real Activo</h4>
                    <p className="text-sm font-medium text-text-muted max-w-[320px] mt-2 leading-relaxed">
                      Escanenado solicitudes de clientes reales en el área (radio de {searchRadius}km). No se incluyen simuladores ni demostraciones.
                    </p>
                    <div className="mt-6 flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full border border-success/20">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-success">
                        Servidor en vivo conectado con AFIP
                      </span>
                    </div>
                  </div>
                ) : (
                  dynamicJobs.map(job => (
                    <article 
                      key={job.id} 
                      onClick={() => setSelectedJob(job)}
                      className="bg-bg-primary p-6 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col gap-4 group hover:shadow-premium transition-all cursor-pointer active:scale-[0.98]"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                             <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl uppercase tracking-wider whitespace-nowrap border border-primary/20">{job.category}</span>
                             {job.urgent && (
                               <motion.span 
                                 animate={{ opacity: [0.8, 1, 0.8] }}
                                 transition={{ repeat: Infinity, duration: 2 }}
                                 className="text-[9px] font-black text-alert bg-alert/10 px-2.5 py-1 rounded-lg uppercase tracking-[0.15em] whitespace-nowrap border border-alert/20 flex items-center gap-1.5 shadow-sm"
                               >
                                 <div className="w-1.5 h-1.5 rounded-full bg-alert animate-pulse" />
                                 Urgente
                               </motion.span>
                             )}
                             {false && (
                                 <span className="text-[9px] font-black text-secondary bg-secondary/10 px-2.5 py-1 rounded-lg uppercase tracking-[0.15em] border border-secondary/20 flex items-center gap-1.5 whitespace-nowrap shadow-sm"><Sparkles size={10} className="fill-secondary" /> Nivel Alto
                               </span>
                             )}
                          </div>
                          <h3 
                            className="font-bold text-text-main text-base sm:text-lg leading-tight group-hover:text-primary transition-colors font-manrope text-ellipsis overflow-hidden"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              wordBreak: 'break-word'
                            }}
                          >
                            {job.title}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.25em] leading-none mb-2 opacity-50">Presupuesto</p>
                          <div className="bg-primary/10 px-3 py-2.5 rounded-2xl border border-primary/20 shadow-[0_4px_12px_rgba(62,154,179,0.1)] inline-flex items-center justify-center">
                            <span className="font-bold text-primary text-base sm:text-lg font-manrope tracking-tight whitespace-nowrap">{formatArgentinePrice(job.price)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-text-muted border-t border-gray-100 dark:border-gray-800 pt-4">
                        <div className="flex items-center gap-1.5 bg-bg-secondary px-3 py-1.5 rounded-full"><MapPin size={12} className="text-primary" /> {job.distance}</div>
                        <div className="flex items-center gap-1.5 bg-bg-secondary px-3 py-1.5 rounded-full ml-auto opacity-70"><Clock size={12} className="text-secondary" /> {formatRelativeTime(job.createdAt)}</div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Job Detail Bottom Sheet */}
        <AnimatePresence>
          {selectedJob && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedJob(null)}
                className="absolute inset-0 bg-black/20 z-[60] backdrop-blur-sm"
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                drag="y"
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.6 }}
                onDragEnd={(event, info) => {
                  if (info.offset.y > 100 || info.velocity.y > 500) {
                    setSelectedJob(null);
                  }
                }}
                className="absolute bottom-0 left-0 right-0 h-[calc(100vh-32px)] overflow-y-auto bg-[#F8FAFC] dark:bg-bg-secondary rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-20px_60px_rgba(15,76,92,0.15)] z-[70] p-6 pb-6 flex flex-col gap-3"
              >
                {/* Drag Handle Container with large touch target */}
                <div 
                  onPointerDown={(e) => dragControls.start(e)}
                  className="w-full pt-1 pb-4 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
                >
                  <div className="w-12 h-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                </div>
                <div className="flex justify-between items-start border-b border-gray-100 dark:border-white/5 pb-3 px-1">
                  <div className="flex-1 pr-4 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-black text-text-main font-manrope leading-tight line-clamp-2 text-ellipsis overflow-hidden mb-2">{selectedJob.title}</h2>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-soft shrink-0">
                         <img src={selectedJob.clientAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedJob.id || selectedJob.clientName || 'anonymous'}`} alt={selectedJob.clientName || 'Cliente'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-black text-text-main leading-tight truncate">{selectedJob.clientName || 'Cliente Anónimo'}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <p className="text-[9px] text-text-muted font-black uppercase tracking-widest opacity-60">Cliente Particular</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button 
                      onClick={async () => {
                        if (navigator.share) {
                          try {
                            await navigator.share({
                              title: selectedJob.title || 'Trabajo',
                              text: `Mira este trabajo en Servicios Pro: ${selectedJob.title || 'Trabajo'}`,
                              url: window.location.href,
                            });
                          } catch (error: any) {
                            if (error.name !== 'AbortError') console.error('Error sharing:', error);
                          }
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Enlace copiado');
                        }
                      }}
                      className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-text-muted hover:text-primary shadow-soft hover:shadow-premium transition-all"
                    >
                      <Share size={16} />
                    </button>
                    <button onClick={() => setSelectedJob(null)} className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-text-muted hover:text-alert shadow-soft hover:shadow-premium transition-all">
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {selectedJob.image && (
                    <div className="bg-white rounded-2xl p-3 shadow-sm border border-black/5">
                      <h4 className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Evidencia Visual</h4>
                      <div className="h-[100px] w-auto mx-auto rounded-xl overflow-hidden shadow-sm bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <img src={selectedJob.image || undefined} alt={selectedJob.title || 'Evidencia'} className="h-full w-auto object-contain" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?auto=format&fit=crop&q=80&w=800'; }} />
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-2xl p-3 shadow-sm border border-black/5 flex flex-col gap-3">
                    <h4 className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em] mb-0">Medios de Pago Solicitados</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-success/5 rounded-lg flex items-center justify-center shrink-0">
                        <Banknote size={16} className="text-success" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedJob.paymentMethods && selectedJob.paymentMethods.length > 0) ? (
                          selectedJob.paymentMethods.map((pm: string) => (
                            <span key={pm} className="px-2 py-1 bg-bg-secondary rounded-lg text-[10px] font-bold text-text-main border border-gray-100">
                              {pm}
                            </span>
                          ))
                        ) : (
                          <span className="px-2 py-1 bg-bg-secondary rounded-lg text-[10px] font-bold text-text-main border border-gray-100">
                            Efectivo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-3 shadow-sm border border-black/5">
                    <h4 className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Detalles de la Solicitud</h4>
                    <p className="text-gray-600 leading-[1.25] font-medium text-[13px]">{selectedJob.description || 'Sin detalles adicionales'}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-gray-50">
                      <div>
                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1.5">Tarifa Estimada</p>
                        <p className="text-lg font-bold text-primary">{formatArgentinePrice(selectedJob.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1.5">Nivel de Urgencia</p>
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                          selectedJob.urgent 
                            ? 'bg-alert/10 text-alert border border-alert/20' 
                            : 'bg-success/10 text-success border border-success/20'
                        }`}>
                          {selectedJob.urgent ? <Clock size={10} strokeWidth={3} /> : <CheckCircle size={10} strokeWidth={3} />}
                          <span className="mt-0.5">{selectedJob.urgent ? 'Urgente / Alta' : 'Prioridad Normal'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Plazo del Trabajo */}
                    <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-0">Plazo Esperado</p>
                      <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/20 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400">
                        <Clock size={11} className="shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider">{selectedJob.timeframe || 'En el día'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-20 sm:bottom-8 w-full z-10 py-2 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent dark:from-bg-secondary dark:via-bg-secondary pt-6 pb-2 mt-auto">
                  <div className="flex gap-2">
                    <button 
                      onClick={handleOfferService}
                      disabled={isOffering}
                      className="flex-1 h-[56px] bg-primary text-white hover:bg-primary/90 disabled:bg-primary/40 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {isOffering ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <CheckCircle size={18} className="fill-white/10" />
                      )}
                      <span className="text-[15px]">{isOffering ? 'Enviando...' : 'Aceptar Trabajo'}</span>
                    </button>
                  </div>
                </div>
                
                {/* Spacer to prevent content being hidden under BottomNav */}
                <div className="h-[80px] shrink-0 w-full"></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccessToast && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute bottom-32 left-6 right-6 z-[100] bg-primary text-white p-5 rounded-3xl shadow-premium flex items-center justify-center gap-3 border border-white/10"
            >
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <CheckCircle size={24} className="text-white" />
              </div>
              <p className="font-bold">¡Tu propuesta fue enviada!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrival Toast */}
        <AnimatePresence>
          {showArrivalToast && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute bottom-32 left-6 right-6 z-[100] bg-emerald-600 text-white p-5 rounded-3xl shadow-premium flex items-center justify-center gap-3 border border-emerald-500/10"
            >
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <CheckCircle size={24} className="text-white" />
              </div>
              <p className="font-bold">¡Has llegado a tu destino!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subscription Modal */}
        <AnimatePresence>
          {showSubscriptionModal && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSubscriptionModal(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-6"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="fixed inset-x-6 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[380px] bg-white dark:bg-bg-primary rounded-[32px] shadow-premium z-[201] p-5 md:p-6 flex flex-col items-center text-center overflow-y-auto max-h-[90vh] scrollbar-thin"
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3 md:mb-4">
                  <Sparkles size={28} className="fill-primary/20" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-text-main font-manrope mb-2 md:mb-3">Acceso Restringido</h3>
                
                <div className="bg-primary/5 rounded-2xl p-3 md:p-4 mb-4 md:mb-5 border border-primary/10">
                  <p className="text-xs md:text-sm font-bold text-primary flex items-center justify-center gap-2 mb-1">
                    <ShieldAlert size={14} /> CLIENTE NIVEL ALTO
                  </p>
                  <p className="text-[11px] md:text-xs text-text-muted leading-relaxed">
                    Para postularte a trabajos de clientes verificados de nivel alto, necesitas una <span className="text-primary font-bold">Suscripción Pro activa</span>.
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3 w-full">
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-5 h-5 bg-success/10 text-success rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={12} />
                    </div>
                    <p className="text-[11px] md:text-xs font-medium text-text-muted">Prioridad en solicitudes de alto valor.</p>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-5 h-5 bg-success/10 text-success rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={12} />
                    </div>
                    <p className="text-[11px] md:text-xs font-medium text-text-muted">Insignia de Profesional Verificado.</p>
                  </div>
                </div>

                <div className="mt-5 md:mt-6 flex flex-col gap-2 md:gap-3 w-full">
                  <button 
                    onClick={() => {
                      // Save state flag to deep-link Premium membership inside Profile tab
                      localStorage.setItem('openPremiumOnProfile', 'true');
                      setShowSubscriptionModal(false);
                      onProfileClick?.(); 
                    }}
                    className="w-full h-12 md:h-14 bg-primary text-white rounded-2xl font-bold shadow-premium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <Banknote size={18} />
                    Suscribirse Ahora
                  </button>
                  <button 
                    onClick={() => setShowSubscriptionModal(false)}
                    className="w-full h-11 md:h-12 bg-bg-secondary text-text-muted rounded-2xl font-bold hover:bg-gray-100 transition-all text-sm"
                  >
                    Quizás más tarde
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* New Job Notification Toast */}
        <AnimatePresence>
          {showNotification && !selectedJob && dynamicJobs.some(x => x.isReal) && (() => {
            const nextRealJob = dynamicJobs.find(x => x.isReal);
            return (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                className="absolute top-[88px] left-4 right-4 md:left-auto md:right-6 md:w-[320px] bg-white rounded-[32px] shadow-premium border border-gray-100 p-5 z-[100] flex items-center gap-4 cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => {
                  if (nextRealJob) {
                    setSelectedJob(nextRealJob);
                  }
                  setShowNotification(false);
                }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary relative flex-shrink-0">
                  <Zap size={24} className="animate-pulse fill-primary/20" />
                  <span className="absolute top-0 right-0 w-3 h-3 bg-alert rounded-full border-2 border-white"></span>
                </div>
                <div className="min-w-0 flex-1 pr-2">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {nextRealJob ? nextRealJob.category : "Solicitud cercana"}
                  </p>
                  <p className="text-xs text-gray-600 truncate mt-0.5 font-medium">
                    {nextRealJob ? `${nextRealJob.title}` : "Nueva solicitud disponible"}
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                     e.stopPropagation();
                     setShowNotification(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </motion.div>
            );
          })()}
        </AnimatePresence>

      </main>

      {/* Welcome Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-32 left-4 w-[calc(100%-80px)] max-w-[320px] z-40 bg-secondary text-white p-6 rounded-[32px] shadow-premium flex items-start gap-4 border border-white/20 backdrop-blur-md"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
               <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">Tip Premium</p>
              <p className="text-sm font-bold leading-tight">Mantente en el área activa para maximizar tus ingresos hoy.</p>
            </div>
            <button 
              onClick={() => {
                setShowTip(false);
                sessionStorage.setItem('hideTip', 'true');
              }}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </APIProvider>
    </div>
  );
}

