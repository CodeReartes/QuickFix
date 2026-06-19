/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Camera, CheckCircle, MapPin, MessageSquare, Phone, X, Send, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function JobInProgress({ onBack, onFinalize }: { onBack?: () => void, onFinalize?: () => void }) {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { id: 1, sender: 'client', text: 'Hola, ¿cómo va el trabajo?', time: '10:45 AM' },
    { id: 2, sender: 'pro', text: 'Todo bien, estoy instalando la nueva tubería ahora mismo.', time: '10:50 AM' },
  ]);

  const [jobState, setJobState] = useState<'in_progress' | 'pro_pricing' | 'client_approval' | 'ready'>('in_progress');
  const [finalPrice, setFinalPrice] = useState('35000');
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: chatLog.length + 1,
      sender: 'pro',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatLog([...chatLog, newMessage]);
    setMessage('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-secondary pb-32 font-sans relative selection:bg-primary selection:text-white">
      <header className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="w-11 h-11 flex items-center justify-center text-text-main rounded-2xl hover:bg-bg-primary active:scale-95 transition-all shadow-soft border border-black/5 dark:border-white/5"
            >
              <ArrowLeft size={22} />
            </button>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-xl border border-primary/10">
            <MapPin size={16} className="text-primary" />
            <span className="font-bold text-sm text-primary tracking-tight">En Servicio</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-bg-primary border border-gray-100 dark:border-gray-800 overflow-hidden shadow-soft">
          <img src="https://picsum.photos/seed/pro/100/100" alt="Pro" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </header>

      <main className="px-6 py-8 flex flex-col gap-6 max-w-lg mx-auto w-full">
        {/* Status Header */}
        <section className="bg-bg-primary rounded-[40px] p-8 shadow-premium border border-gray-100 dark:border-gray-800 flex flex-col gap-5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer"></div>
          
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Servicio Activo #892</span>
              </div>
              <h2 className="text-2xl font-bold text-text-main font-manrope leading-tight group-hover:text-primary transition-colors">Instalación de Grifería</h2>
              <div className="flex items-center gap-2 mt-3 text-sm font-medium text-text-muted">
                 <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                 <span>Iniciado hace 45 minutos</span>
              </div>
            </div>
            <div className="bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10 flex items-center justify-center">
               <span className="text-xs font-bold text-primary uppercase tracking-widest">En curso</span>
            </div>
          </div>
        </section>

        {/* Client Info */}
        <section className="bg-bg-primary rounded-[40px] p-6 shadow-soft border border-gray-100/50 dark:border-white/5 flex items-center justify-between gap-4 group">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/client/100/100" 
                alt="Client" 
                className="w-16 h-16 rounded-[24px] object-cover shadow-soft border border-gray-50 dark:border-gray-800 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-4 border-white dark:border-bg-primary shadow-sm"></span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-text-main text-lg truncate">María Rodríguez</h3>
              <p className="text-xs text-text-muted font-medium flex items-center gap-1.5 mt-1">
                <MapPin size={14} className="text-secondary" />
                Calle Los Pinos 45, 3B
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowChat(true)}
            className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-premium active:scale-95 transition-all hover:bg-primary/95"
          >
            <MessageSquare size={24} className="fill-white/10" />
          </button>
        </section>

        {/* Photos Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Evidencia visual</h3>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 rounded-full">
              <div className="w-1 h-1 bg-primary rounded-full"></div>
              <span className="text-[8px] font-bold text-primary uppercase tracking-widest leading-none">Control Dual</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {/* Before Photo */}
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-premium border border-gray-100 dark:border-gray-800 group">
              <img 
                src="https://picsum.photos/seed/leak/300/300" 
                alt="Antes" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 dark:bg-bg-primary/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Antes</span>
              </div>
            </div>

            {/* After Photo Upload */}
            {!afterPhoto ? (
              <button 
                onClick={() => {
                  setAfterPhoto('https://picsum.photos/seed/fixed/300/300');
                  setJobState('pro_pricing');
                }}
                className="aspect-[4/5] rounded-[32px] border-2 border-dashed border-gray-200 dark:border-gray-800 bg-bg-primary flex flex-col items-center justify-center gap-4 group transition-all hover:border-primary hover:bg-primary/5 cursor-pointer active:scale-95"
              >
                <div className="w-16 h-16 rounded-3xl bg-bg-secondary text-text-muted group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all shadow-soft group-hover:scale-110">
                  <Camera size={32} />
                </div>
                <div className="text-center px-4">
                  <p className="font-bold text-base text-text-main group-hover:text-primary transition-colors">Evidencia final</p>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1.5">Toca para capturar</p>
                </div>
              </button>
            ) : (
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-premium border border-gray-100 dark:border-gray-800 group">
                <img 
                  src={afterPhoto} 
                  alt="Después" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-success/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                   <div className="w-6 h-6 bg-white/20 dark:bg-bg-primary/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Después</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Botón de Pánico o Soporte Rápido */}
        <section className="bg-red-500/5 dark:bg-red-500/10 rounded-[32px] p-5 border border-red-500/20 flex flex-col gap-3">
          <div className="flex items-start gap-3">
             <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <ShieldAlert size={20} className="animate-pulse" />
             </div>
             <div className="text-left">
                <h4 className="font-extrabold text-red-600 dark:text-red-400 text-sm leading-tight">Botón de Pánico / Asistencia Rápida</h4>
                <p className="text-[11px] text-red-800/70 dark:text-red-450/70 font-semibold leading-relaxed mt-0.5">
                  ¿Tuviste algún inconveniente crítico con el servicio? Abrí un reporte inmediato con asistencia telefónica y mediación de urgencia.
                </p>
             </div>
          </div>
          <button 
            type="button"
            onClick={() => {
              const reason = window.prompt("Ingresá el motivo o urgencia (ej: conflicto, rotura accidental, demora excesiva):");
              if (reason) {
                alert(`🚨 Reporte Recibido:\nIniciando canal de soporte prioritario para: "${reason}". Un auditor de Servicios Pro ingresará al chat y te llamará de inmediato.`);
                setShowChat(true);
                setChatLog(prev => [
                  ...prev,
                  { id: prev.length + 1, sender: 'client', text: `⚠️ ALERTA DE PÁNICO ENVIADA: Por motivo de "${reason}". Solicitando mediador de urgencia.`, time: 'Ahora' },
                  { id: prev.length + 2, sender: 'pro', text: `🤖 [Soporte Técnico Services-Pro] Hola, se ha abierto el protocolo prioritario. Un operador humano está revisando este reporte y se comunicará en un plazo de 2 minutos.`, time: 'Ahora' }
                ]);
              }
            }}
            className="w-full h-11 bg-red-600 hover:bg-red-700 text-white rounded-[16px] font-black text-xs uppercase tracking-wider transition-colors shadow-md shadow-red-500/20 active:scale-95"
          >
             Contactar a Soporte de Servicios Pro
          </button>
        </section>

        {/* Finalize Button */}
        <motion.button
          whileHover={jobState === 'ready' ? { scale: 1.02 } : {}}
          whileTap={jobState === 'ready' ? { scale: 0.98 } : {}}
          onClick={() => {
            if (jobState === 'ready' && onFinalize) onFinalize();
          }}
          disabled={jobState !== 'ready'}
          className={`mt-6 w-full h-[72px] rounded-[32px] font-bold text-lg flex items-center justify-center gap-3 shadow-premium transition-all relative overflow-hidden group ${
            jobState === 'ready' 
            ? 'bg-primary text-white' 
            : 'bg-gray-100 text-text-muted cursor-not-allowed opacity-60'
          }`}
        >
          {jobState === 'ready' && <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>}
          <CheckCircle size={24} className="relative z-10" />
          <span className="relative z-10">
            {jobState === 'ready' ? 'Finalizar y Cobrar' : 'Esperando Aprobación'}
          </span>
        </motion.button>
      </main>

      {/* Floating Chat Button (Contextual) */}
      <AnimatePresence>
        {!showChat && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChat(true)}
            className="fixed bottom-[110px] right-8 w-20 h-20 bg-primary text-white rounded-[32px] flex items-center justify-center shadow-premium z-40 border-4 border-bg-primary"
          >
            <MessageSquare size={32} className="fill-white/10" />
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-alert text-white rounded-full border-4 border-bg-primary flex items-center justify-center text-[10px] font-bold shadow-sm">
              1
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Interface Overlay */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-bg-secondary z-[60] flex flex-col"
          >
            <header className="h-24 glass border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-bg-primary border border-gray-100 dark:border-gray-800 overflow-hidden shadow-soft">
                  <img src="https://picsum.photos/seed/client/100/100" alt="Client" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-bold text-text-main text-base">María Rodríguez</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                     <span className="text-[10px] text-success font-bold uppercase tracking-widest leading-none">● En línea</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="w-11 h-11 rounded-2xl bg-bg-primary border border-gray-100 dark:border-gray-800 flex items-center justify-center text-text-muted hover:text-alert transition-all shadow-soft"
              >
                <X size={22} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 no-scrollbar">
              {chatLog.map((chat) => (
                <div 
                  key={chat.id}
                  className={`flex flex-col ${chat.sender === 'pro' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[80%] px-5 py-3.5 rounded-[24px] text-sm font-medium shadow-soft ${
                    chat.sender === 'pro' 
                    ? 'bg-primary text-white rounded-tr-sm' 
                    : 'bg-bg-primary text-text-main border border-gray-100 dark:border-white/5 rounded-tl-sm shadow-sm'
                  }`}>
                    {chat.text}
                  </div>
                  <span className="text-[10px] text-text-muted font-bold tracking-widest mt-2 px-1">{chat.time}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-bg-primary/80 dark:bg-bg-primary/40 backdrop-blur-xl border-t border-gray-100/50 dark:border-white/5 pb-10">
              <div className="max-w-lg mx-auto flex items-center gap-3">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe un mensaje..."
                  className="flex-grow flex-1 min-w-0 h-14 md:h-16 bg-bg-primary shadow-soft border border-gray-100 dark:border-gray-800 rounded-[28px] px-4 md:px-6 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all text-text-main placeholder:text-text-muted/50"
                />
                <button 
                  onClick={handleSend}
                  className="w-16 h-16 bg-primary text-white rounded-[28px] flex items-center justify-center shrink-0 active:scale-95 transition-transform shadow-premium"
                >
                  <Send size={20} className="translate-x-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pro Pricing Overlay */}
      <AnimatePresence>
        {jobState === 'pro_pricing' && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/20 z-[70] backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setJobState('ready'); // Drag down to cancel back to standard view
                }
              }}
              className="fixed bottom-0 left-0 right-0 bg-bg-primary z-[80] rounded-t-[32px] sm:rounded-t-[48px] px-6 sm:px-8 pb-24 shadow-premium flex flex-col gap-8 max-w-lg mx-auto border-t border-white/10 h-[calc(100vh-32px)] overflow-y-auto no-scrollbar"
            >
               {/* Drag Handle Container with large touch target */}
               <div 
                 className="w-full pt-1 pb-4 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
               >
                 <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
               </div>
              
              <div className="text-center">
                <h3 className="text-3xl font-bold text-text-main mb-3 font-manrope tracking-tight">Cierre de Servicio</h3>
                <p className="text-base text-text-muted font-medium">Define el monto final por los trabajos realizados.</p>
              </div>
              
              <div className="relative group">
                <span className="absolute left-10 top-1/2 -translate-y-1/2 text-4xl font-bold text-primary group-focus-within:scale-110 transition-transform">$</span>
                <input 
                  type="number" 
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  autoFocus
                  className="w-full text-center text-6xl font-bold font-manrope bg-bg-primary border border-gray-100 dark:border-gray-800 rounded-[40px] py-10 shadow-premium focus:ring-2 focus:ring-primary focus:border-primary outline-none text-text-main"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setJobState('client_approval')}
                className="w-full h-[76px] bg-primary text-white rounded-[32px] font-bold shadow-premium text-xl relative overflow-hidden group shrink-0"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10">Solicitar Pago</span>
              </motion.button>

              {/* Spacer to guarantee content is above bottom nav */}
              <div className="h-20 shrink-0 w-full"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Client Approval Simulation Overlay */}
      <AnimatePresence>
        {jobState === 'client_approval' && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/20 z-[70] backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 m-auto w-[90%] max-w-md h-fit bg-bg-primary z-[80] rounded-[48px] p-10 shadow-premium flex flex-col gap-8 border border-white/10"
            >
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-[32px] bg-primary shadow-premium flex items-center justify-center animate-bounce">
                  <CheckCircle size={48} className="text-white" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-text-main mb-3 font-manrope tracking-tight">Cobro en Proceso</h3>
                <p className="text-base text-text-muted font-medium mb-8 leading-relaxed">Estamos esperando que María confirme el monto final desde su aplicación.</p>
                
                <div className="bg-bg-primary rounded-[32px] p-6 border border-gray-100 dark:border-gray-800 shadow-soft mb-8">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Monto solicitado</p>
                  <p className="text-4xl font-bold font-manrope text-primary">${Number(finalPrice).toLocaleString()}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setJobState('ready')}
                    className="w-full h-16 bg-success text-white rounded-3xl font-bold shadow-premium transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Simular Probación del Cliente
                  </button>
                  <button 
                    onClick={() => setJobState('pro_pricing')}
                    className="w-full h-16 bg-bg-primary border border-gray-200 dark:border-gray-800 text-text-muted rounded-3xl font-bold hover:bg-bg-secondary transition-all active:scale-95"
                  >
                    Modificar presupuesto
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Clock({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
