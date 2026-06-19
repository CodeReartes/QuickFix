import { motion } from 'motion/react';
import { Star, X, CheckCircle2, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function RatingModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(4);
  const [punctuality, setPunctuality] = useState(4);
  const [quality, setQuality] = useState(4);
  const [professionalism, setProfessionalism] = useState(4);

  const renderStars = (value: number, setter: (val: number) => void, size = 32) => (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setter(star)}
          className="focus:outline-none transition-transform active:scale-90"
        >
          <Star 
            size={size} 
            fill={star <= value ? "#FAB005" : "none"} 
            className={star <= value ? "text-[#FAB005]" : "text-[#c5c5d3]"} 
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/20 backdrop-blur-xl transition-all duration-500 overflow-y-auto no-scrollbar">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-bg-secondary w-full max-w-md rounded-[48px] shadow-premium flex flex-col p-8 sm:p-10 relative overflow-hidden my-auto border border-white/50"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-text-muted hover:text-alert transition-all shadow-soft active:scale-95"
        >
          <X size={22} />
        </button>

        {/* Header Decor */}
        <div className="flex justify-center mb-8">
          <div className="relative w-28 h-28 rounded-3xl bg-white shadow-premium border border-gray-50 flex items-center justify-center group overflow-hidden">
             {/* Decorative Background for Icon */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 group-hover:scale-150 transition-transform duration-1000"></div>
            <CheckCircle2 size={56} className="text-primary relative z-10 group-hover:scale-110 transition-transform duration-500" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -top-4 -right-4 text-secondary opacity-30"
            >
              <Sparkles size={32} />
            </motion.div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-main mb-3 font-manrope tracking-tight">Experiencia Finalizada</h1>
          <p className="text-base text-text-muted font-medium">¿Cómo fue el desempeño del experto hoy?</p>
        </div>

        {/* Overall Rating Stars */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-4 bg-white px-6 py-4 rounded-[32px] shadow-soft border border-gray-50">
            {renderStars(rating, setRating, 44)}
          </div>
          <span className="font-bold text-primary text-sm uppercase tracking-widest bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
            {rating === 5 ? '¡Servicio Excepcional!' : rating >= 4 ? 'Muy satisfecho' : 'Experiencia aceptable'}
          </span>
        </div>

        {/* Specific Criteria */}
        <div className="flex flex-col gap-5 mb-8 bg-white p-7 rounded-[40px] shadow-soft border border-gray-100/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-text-main tracking-tight">Puntualidad</span>
            {renderStars(punctuality, setPunctuality, 22)}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-text-main tracking-tight">Calidad Técnica</span>
            {renderStars(quality, setQuality, 22)}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-text-main tracking-tight">Profesionalismo</span>
            {renderStars(professionalism, setProfessionalism, 22)}
          </div>
        </div>

        {/* Comment Field */}
        <div className="mb-10">
          <label className="block font-bold text-[10px] text-text-muted uppercase tracking-[0.2em] mb-3 px-2">
            Detalles adicionales (opcional)
          </label>
          <textarea 
            placeholder="Comparte tu experiencia con otros usuarios..."
            className="w-full bg-white border border-gray-200 rounded-[32px] p-6 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none h-28 text-sm font-medium transition-all text-text-main placeholder:text-text-muted/50 shadow-soft resize-none"
          />
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-[72px] bg-primary text-white font-bold rounded-[32px] shadow-premium text-lg relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10">Confirmar Calificación</span>
          </motion.button>
          <button 
            onClick={onClose}
            className="w-full h-14 text-text-muted font-bold rounded-[28px] hover:bg-white hover:text-primary transition-all active:scale-95 text-sm uppercase tracking-widest"
          >
            Saltar paso
          </button>
        </div>
      </motion.div>
    </div>

  );
}
