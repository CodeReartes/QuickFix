import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface RewardCoupon {
  id: string;
  name: string;
  ptsCost: number;
  desc: string;
  longerDesc: string;
  category: string;
  icon: string;
  disabled?: boolean;
}

interface AppConfig {
  premiumMonthlyFee: number;
  ptsConversionRateText: string;
  rewardsCatalog: RewardCoupon[];
}

interface ConfigContextType {
  config: AppConfig;
  loading: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  premiumMonthlyFee: 10000,
  ptsConversionRateText: "100 PTS = $100 ARS",
  rewardsCatalog: [
    { 
      id: 'cup_bronce', 
      name: 'Cupón Bronce', 
      ptsCost: 1000, 
      desc: '$1.000 ARS de descuento directo', 
      longerDesc: 'Canjeá este cupón para aplicar una rebaja de $1.000 ARS en la mano de obra del próximo arreglo técnico que solicites.',
      category: 'Descuento',
      icon: '🥉'
    },
    { 
      id: 'cup_plata', 
      name: 'Cupón Plata', 
      ptsCost: 3000, 
      desc: '$3.500 ARS de descuento directo', 
      longerDesc: 'Ahorrá 500 PTS con el Cupón Plata. Te bonifica $3.500 ARS completos del presupuesto final en reparaciones del hogar.',
      category: 'Descuento',
      icon: '🥈'
    },
    { 
      id: 'cup_oro', 
      name: 'Cupón Oro', 
      ptsCost: 5000, 
      desc: '$6.000 ARS de descuento directo', 
      longerDesc: '¡El mejor canje de ahorro! Sumás un beneficio de súper descuento de $6.000 ARS enteros, ahorrándote un bono neto de 1.000 PTS.',
      category: 'Descuento',
      icon: '🥇'
    },
    { 
      id: 'cup_premium', 
      name: '1 Mes Premium de Regalo', 
      ptsCost: 8000, 
      desc: 'Bonifica 1 mes de Suscripción Premium ($10.000 ARS)', 
      longerDesc: 'Exclusivo para clientes Básicos. Canjeá 8.000 PTS para obtener todos los privilegios Premium gratis (Garantías Plus de protección y comisión operativa VIP reducida) durante 30 días.',
      category: 'Membresía',
      icon: '👑'
    }
  ]
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const configDocRef = doc(db, 'system_config', 'quickfix_constants');

    // Attempt to seed if it doesn't exist
    getDoc(configDocRef).then((snap) => {
      if (!snap.exists()) {
        setDoc(configDocRef, DEFAULT_CONFIG).catch((err) => {
          console.warn('Could not seed default config:', err);
        });
      }
    }).catch((err) => {
      console.warn('Error fetching system config reference:', err);
    });

    // Real-time subscription to Firebase constants/Remote Config simulation
    const unsubscribe = onSnapshot(configDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<AppConfig>;
        setConfig({
          premiumMonthlyFee: data.premiumMonthlyFee ?? DEFAULT_CONFIG.premiumMonthlyFee,
          ptsConversionRateText: data.ptsConversionRateText ?? DEFAULT_CONFIG.ptsConversionRateText,
          rewardsCatalog: data.rewardsCatalog ?? DEFAULT_CONFIG.rewardsCatalog
        });
      }
      setLoading(false);
    }, (error) => {
      console.warn('Using fallback configuration due to Firebase access error (expected in restricted rules):', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
