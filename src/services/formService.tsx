import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormState {
  selectedCategory: string | null;
  photoPreview: string | null;
  photoMimeType: string;
  details: string;
  address: string;
  location: { lat: number; lng: number } | null;
  priority: 'normal' | 'urgent' | null;
  paymentMethods: string[];
  timeframe?: string;
  analysisResult: { 
    category: string; 
    matchedId: string | null; 
    description: string;
    estimatedPrice?: string;
    urgency?: string;
    slangDescription?: string;
    numericBasePrice?: number;
    breakdowns?: Record<string, {
      totalFacturado: number;
      totalNeto: number;
      costoGestion: number;
      manoObra: number;
      ivaAmt: number;
    }>;
  } | null;
}

interface FormContextType {
  formState: FormState;
  updateFormState: (updates: Partial<FormState>) => void;
  resetForm: () => void;
}

const initialFormState: FormState = {
  selectedCategory: null,
  photoPreview: null,
  photoMimeType: 'image/jpeg',
  details: '',
  address: '',
  location: null,
  priority: null,
  paymentMethods: ['Efectivo'], // Default to cash
  timeframe: 'En el día',
  analysisResult: null,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const updateFormState = (updates: Partial<FormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
  };

  return (
    <FormContext.Provider value={{ formState, updateFormState, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormState must be used within a FormProvider');
  }
  return context;
}
