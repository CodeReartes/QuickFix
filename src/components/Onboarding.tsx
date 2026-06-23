import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, HardHat, ArrowRight, Check, Camera, Image as ImageIcon, X, FileBadge, AlertCircle, ArrowLeft, UserPlus, LogIn } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { compressImage } from '../lib/imageCompressor';

interface OnboardingProps {
  onContinue: (role: 'client' | 'professional') => void;
}

const PROFESSIONS = [
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

export default function Onboarding({ onContinue }: OnboardingProps) {
  const [role, setRole] = useState<'client' | 'professional'>('client');
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Role, 2: Auth Selection (Both client and professional), 3: Expert Profile (Pro Sign up)
  
  // Professional details
  const [profession, setProfession] = useState('');
  const [isMatriculado, setIsMatriculado] = useState(false);
  const [workPhotos, setWorkPhotos] = useState<string[]>([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    setError('');
    if (step === 1) {
      setStep(2);
    } else if (step === 3) {
      if (!profession) {
        setError('Por favor, selecciona tu profesión principal.');
        return;
      }
      onContinue(role);
    } else {
      onContinue(role);
    }
  };

  const handleAuthChoice = (choice: 'login' | 'signup') => {
    if (choice === 'login') {
      onContinue(role);
    } else {
      if (role === 'professional') {
        setStep(3);
      } else {
        onContinue('client');
      }
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedBase64 = await compressImage(file);
      setWorkPhotos(prev => [...prev, compressedBase64]);
    } catch (err) {
      console.error("Error compressing onboarding image:", err);
      alert("Error al procesar la imagen de muestra de trabajo.");
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = (index: number) => {
    setWorkPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-screen h-[100dvh] bg-[#F8FAFC] px-4 pt-5 pb-5 sm:px-6 sm:pt-8 sm:pb-6 font-sans overflow-hidden relative selection:bg-primary selection:text-white justify-between">
      {/* Background purely aesthetic circles */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="absolute top-4 right-4 z-20 sm:top-6 sm:right-8">
              <button 
                onClick={() => onContinue('admin' as any)}
                className="text-text-muted hover:text-primary font-bold text-[9px] sm:text-[10px] uppercase tracking-wide px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-gray-100/50 hover:bg-white transition-all shadow-sm"
              >
                LOGIN DE ADMIN
              </button>
            </div>
            <header className="mb-3 sm:mb-6 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-2 select-none filter drop-shadow-[0_2px_5px_rgba(0,82,255,0.12)]">
                <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:w-[34px] sm:h-[34px]">
                  <defs>
                    <linearGradient id="qGradientHead_Onboarding_Exact" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0052FF" />
                      <stop offset="100%" stopColor="#00D8FF" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="32" stroke="url(#qGradientHead_Onboarding_Exact)" strokeWidth="18" strokeLinecap="round" fill="none" />
                  <path d="M 68 68 L 84 84" stroke="url(#qGradientHead_Onboarding_Exact)" strokeWidth="18" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight font-manrope text-slate-900 leading-none">
                    Servicios<span className="text-[#0052FF]">Pro</span>
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-secondary mt-0.5">
                    Calidad Certificada
                  </span>
                </div>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2 leading-[1.1] tracking-tight">
                  Bienvenido a <br/><span className="text-secondary font-extrabold">Servicios Pro</span>
                </h1>
                <p className="text-text-muted font-medium text-xs sm:text-sm leading-relaxed">
                  Únete a la red más exclusiva de profesionales y servicios de calidad.
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-2.5 sm:gap-3 flex-1 justify-center min-h-0">
              <label 
                className={`relative cursor-pointer transition-all duration-500 p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] border-2 flex flex-col gap-2 sm:gap-3 group ${
                  role === 'client' 
                  ? 'bg-white border-primary shadow-premium' 
                  : 'bg-white/50 border-gray-100 hover:border-primary/30 shadow-soft'
                }`}
                onClick={() => setRole('client')}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-[12px] sm:rounded-[14px] shadow-soft transition-all duration-500 ${
                  role === 'client' ? 'bg-primary text-white' : 'bg-white text-primary'
                }`}>
                  <Briefcase size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-text-main group-hover:text-primary transition-colors">
                    Necesito un Especialista
                  </h3>
                  <p className="text-[11px] sm:text-xs text-text-muted mt-0.5 sm:mt-1 font-medium leading-relaxed opacity-80">
                    Busco expertos certificados para solucionar problemas en mi hogar u oficina.
                  </p>
                </div>
                <div className={`absolute top-4 right-4 sm:top-5 sm:right-5 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-500 ${
                  role === 'client' ? 'bg-primary border-primary rotate-0' : 'border-gray-100 rotate-90'
                }`}>
                  {role === 'client' && <Check size={12} className="text-white" />}
                </div>
              </label>

              <label 
                className={`relative cursor-pointer transition-all duration-500 p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] border-2 flex flex-col gap-2 sm:gap-3 group ${
                  role === 'professional' 
                  ? 'bg-white border-secondary shadow-premium' 
                  : 'bg-white/50 border-gray-100 hover:border-secondary/30 shadow-soft'
                }`}
                onClick={() => setRole('professional')}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-[12px] sm:rounded-[14px] shadow-soft transition-all duration-500 ${
                  role === 'professional' ? 'bg-secondary text-white' : 'bg-white text-secondary'
                }`}>
                  <HardHat size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-text-main group-hover:text-secondary transition-colors">
                    Ofrecer mis Servicios
                  </h3>
                  <p className="text-[11px] sm:text-xs text-text-muted mt-0.5 sm:mt-1 font-medium leading-relaxed opacity-80">
                    Soy un profesional independiente buscando escalar mis ingresos y visibilidad.
                  </p>
                </div>
                <div className={`absolute top-4 right-4 sm:top-5 sm:right-5 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-500 ${
                  role === 'professional' ? 'bg-secondary border-secondary rotate-0' : 'border-gray-100 -rotate-90'
                }`}>
                  {role === 'professional' && <Check size={12} className="text-white" />}
                </div>
              </label>
            </div>
          </motion.div>
        ) : step === 2 ? (
          <motion.div 
            key="stepAuth"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col flex-1 min-h-0"
          >
            <header className="mb-2 sm:mb-8">
              <button 
                onClick={() => setStep(1)}
                className="mb-2 sm:mb-6 w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-soft text-text-muted hover:text-primary transition-all"
              >
                 <ArrowLeft size={16} className="sm:scale-115" />
              </button>
              <h1 className="text-xl sm:text-3xl font-bold text-primary mb-1 sm:mb-3 leading-[1.1] tracking-tight">
                {role === 'professional' ? (
                  <>Empecemos <br/><span className="text-secondary font-extrabold">tu carrera</span></>
                ) : (
                  <>Busquemos <br/><span className="text-[#0052FF] font-extrabold">al especialista</span></>
                )}
              </h1>
              <p className="text-text-muted font-medium text-[11px] sm:text-sm">
                ¿Ya tienes una cuenta o eres nuevo en la plataforma?
              </p>
            </header>

            <div className="flex flex-col gap-2.5 sm:gap-4 flex-1 justify-center min-h-0">
              <button 
                onClick={() => handleAuthChoice('login')}
                className={`group relative bg-white p-4 sm:p-6 rounded-[20px] sm:rounded-[32px] border-2 border-gray-100 shadow-soft hover:shadow-premium transition-all text-left flex flex-col gap-2 sm:gap-3.5 overflow-hidden ${
                  role === 'professional' ? 'hover:border-secondary/30' : 'hover:border-primary/30'
                }`}
              >
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                  role === 'professional' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                }`}>
                  <LogIn size={18} className="sm:scale-110" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm sm:text-lg text-text-main transition-colors ${
                    role === 'professional' ? 'group-hover:text-secondary' : 'group-hover:text-primary'
                  }`}>Iniciar Sesión</h3>
                  <p className="text-[10px] sm:text-xs text-text-muted mt-0.5 sm:mt-1 font-medium opacity-70">Ya tengo una cuenta registrada.</p>
                </div>
              </button>

              <button 
                onClick={() => handleAuthChoice('signup')}
                className={`group relative bg-white p-4 sm:p-6 rounded-[20px] sm:rounded-[32px] border-2 border-gray-100 shadow-soft hover:shadow-premium transition-all text-left flex flex-col gap-2 sm:gap-3.5 overflow-hidden ${
                  role === 'professional' ? 'hover:border-secondary/30' : 'hover:border-primary/30'
                }`}
              >
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                  role === 'professional' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                }`}>
                  <UserPlus size={18} className="sm:scale-110" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm sm:text-lg text-text-main transition-colors ${
                    role === 'professional' ? 'group-hover:text-secondary' : 'group-hover:text-primary'
                  }`}>Crear Cuenta Nueva</h3>
                  <p className="text-[10px] sm:text-xs text-text-muted mt-0.5 sm:mt-1 font-medium opacity-70">
                    {role === 'professional' ? 'Quiero registrarme y configurar mi perfil.' : 'Quiero registrarme para pedir presupuestos.'}
                  </p>
                </div>
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6">
                  <div className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[7px] sm:text-[9px] font-bold uppercase tracking-widest ${
                    role === 'professional' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                  }`}>Recomendado</div>
                </div>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="stepProfile"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col flex-1 overflow-y-auto no-scrollbar"
          >
            <header className="mb-4 sm:mb-8">
              <button 
                onClick={() => setStep(2)}
                className="mb-4 sm:mb-8 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-soft text-text-muted hover:text-primary transition-all"
              >
                 <ArrowLeft size={18} className="sm:scale-115" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 sm:mb-3 font-manrope tracking-tight">
                Perfil de Experto
              </h1>
              <p className="text-text-muted font-medium text-sm sm:text-base">
                Te ayudaremos a destacar entre los mejores.
              </p>
            </header>

            <div className="flex flex-col gap-6 flex-1 pb-10">
              {/* Profession Selection */}
              <div className="bg-white p-7 rounded-[40px] shadow-soft border border-black/5">
                <h3 className="font-bold text-text-main text-lg mb-4">¿Cuál es tu especialidad?</h3>
                <div className="flex flex-wrap gap-2.5">
                  {PROFESSIONS.map(prof => (
                    <button
                      key={prof}
                      onClick={() => setProfession(prof)}
                      className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                        profession === prof 
                        ? 'bg-primary text-white shadow-premium scale-105' 
                        : 'bg-gray-50 text-text-muted hover:bg-gray-100 border border-transparent'
                      }`}
                    >
                      {prof}
                    </button>
                  ))}
                </div>
                {error && (
                  <div className="mt-4 flex items-center gap-2 p-3 bg-alert/5 border border-alert/10 rounded-2xl">
                    <AlertCircle size={16} className="text-alert" />
                    <p className="text-alert font-bold text-xs">{error}</p>
                  </div>
                )}
              </div>

              {/* Matricula Toggle */}
              <div className="bg-white p-7 rounded-[40px] shadow-soft border border-black/5 flex items-center justify-between group cursor-pointer" onClick={() => setIsMatriculado(!isMatriculado)}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isMatriculado ? 'bg-primary/10 text-primary shadow-premium' : 'bg-gray-50 text-text-muted'}`}>
                    <FileBadge size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main text-lg group-hover:text-primary transition-colors">Soy Matriculado</h3>
                    <p className="text-[11px] text-text-muted font-bold uppercase tracking-widest mt-1">Gana mayor confianza</p>
                  </div>
                </div>
                <div className={`w-16 h-9 rounded-full p-1.5 transition-all duration-500 shadow-inner ${isMatriculado ? 'bg-primary' : 'bg-gray-200'}`}>
                  <div className={`w-6 h-6 rounded-full bg-white shadow-soft transition-all duration-500 ${isMatriculado ? 'translate-x-7' : 'translate-x-0'}`} />
                </div>
              </div>

              {/* Work Photos */}
              <div className="bg-white p-7 rounded-[40px] shadow-soft border border-black/5 flex flex-col gap-5">
                <div>
                  <h3 className="font-bold text-text-main text-lg">Tu Portafolio Visual</h3>
                  <p className="text-sm text-text-muted mt-2 font-medium opacity-70">Fotos reales de tus servicios realizados.</p>
                </div>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handlePhotoUpload} 
                />

                <div className="grid grid-cols-3 gap-3">
                  {workPhotos.map((photo, idx) => (
                    <div key={idx} className="aspect-square rounded-2xl relative overflow-hidden group shadow-soft border border-gray-100">
                      <img src={photo} alt="Work" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1.5 right-1.5 w-7 h-7 bg-alert/80 backdrop-blur-sm text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {workPhotos.length < 6 && (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-text-muted hover:text-primary hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <Camera size={26} className="mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-widest">Subir<br/>Foto</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-3 sm:pt-4 px-1 shrink-0">
        {step !== 2 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className={`w-full h-11 sm:h-12 rounded-[14px] sm:rounded-[16px] font-bold text-sm flex items-center justify-center gap-2 shadow-premium transition-all relative overflow-hidden group ${
              role === 'client' || (role === 'professional' && step === 3) 
              ? 'bg-primary text-white' 
              : 'bg-secondary text-white'
            }`}
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10">{step === 3 ? 'Finalizar Perfil' : 'Comenzar Ahora'}</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        )}
        <p className="text-center text-[9px] sm:text-[10px] text-text-muted font-bold uppercase tracking-widest mt-3 sm:mt-4 opacity-40">
           Al continuar aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
}
