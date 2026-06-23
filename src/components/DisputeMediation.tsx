import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../services/authService';
import { 
  ArrowLeft, ShieldAlert, FileText, Camera, Upload, CheckCircle2, 
  ChevronRight, X, Clock, Sparkles, AlertTriangle, ShieldCheck, 
  Trash2, Landmark, HelpCircle, Trophy, UserCheck, RefreshCw
} from 'lucide-react';
import { collection, query, where, getDocs, addDoc, serverTimestamp, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';

interface DisputeMediationProps {
  onClose: () => void;
}

export default function DisputeMediation({ onClose }: DisputeMediationProps) {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState<'list' | 'create' | 'view'>('list');
  
  // Lists
  const [jobs, setJobs] = useState<any[]>([]);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Creation State
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [disputeType, setDisputeType] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [evidencePhoto, setEvidencePhoto] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Viewing State
  const [activeDispute, setActiveDispute] = useState<any | null>(null);
  const [reassigning, setReassigning] = useState(false);
  const [reassignSuccess, setReassignSuccess] = useState(false);

  const isPremium = user?.role === 'premium' || user?.is_premium || user?.premium_status === 'active';
  const points = user?.client_points ?? 0;

  // Real-time disputes & fetch jobs
  useEffect(() => {
    if (!user) return;

    // Fetch active disputes
    const disputesQ = query(
      collection(db, 'disputes'),
      where('clientId', '==', user.uid)
    );
    
    const unsubDisputes = onSnapshot(disputesQ, (snap) => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDisputes(list);
      
      // Update loaded active dispute, if any
      if (activeDispute) {
        const updated = list.find(d => d.id === activeDispute.id);
        if (updated) setActiveDispute(updated);
      }
      setLoading(false);
    });

    // Fetch client's completed or paid jobs
    const fetchJobs = async () => {
      try {
        const jobsQ = query(
          collection(db, 'jobs'),
          where('clientId', '==', user.uid)
        );
        const snap = await getDocs(jobsQ);
        const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setJobs(fetched);
      } catch (err) {
        console.error("Error fetching jobs for disputes:", err);
      }
    };
    fetchJobs();

    return () => unsubDisputes();
  }, [user, activeDispute?.id]);

  // Create demonstration completed job if user has none
  const handleCreateDemoJob = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const demoJob = {
        clientId: user.uid,
        clientName: user.displayName || 'Cliente',
        clientAvatar: user.photoURL || '',
        category: 'Plomería',
        description: 'Reparación de cañería rota bajo mesada de cocina que gotea constantemente.',
        price: 25000,
        status: 'paid_completed',
        professionalId: 'pro_demo_id',
        professionalName: 'Victoria Gonzalez',
        location: { lat: -31.4167, lng: -64.1833, address: 'General Paz 120, Córdoba' },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        finishedWorkImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80'
      };

      const docRef = await addDoc(collection(db, 'jobs'), demoJob);
      const newJob = { id: docRef.id, ...demoJob };
      setJobs(prev => [newJob, ...prev]);
      setSelectedJob(newJob);
      setStep('create');
    } catch (err) {
      console.error("Error creating demo completed job:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen es demasiado grande. Seleccione una menor a 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
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
        setEvidencePhoto(canvas.toDataURL('image/webp', 0.8));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleUseDemoEvidencePhoto = () => {
    // High-fidelity demo photo of leaky pipe / electric sparks
    setEvidencePhoto("https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop&q=80");
  };

  const handleSubmitDispute = async () => {
    if (!user || !selectedJob || !disputeType || !explanation) return;
    setSubmitting(true);

    try {
      const newDispute = {
        clientId: user.uid,
        clientName: user.displayName || 'Cliente',
        clientAvatar: user.photoURL || '',
        jobId: selectedJob.id,
        jobCategory: selectedJob.category,
        jobDescription: selectedJob.description,
        professionalId: selectedJob.professionalId || 'pro_unknown',
        professionalName: selectedJob.professionalName || 'Profesional de Servicios',
        disputeType,
        explanation,
        evidencePhoto: evidencePhoto || '',
        status: 'under_review', // 'under_review' | 'resolved_client' | 'resolved_pro' | 'reassigned' | 'agreement_reached'
        mediatorName: 'Juan Pérez (Mediador Coordinador)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'disputes'), newDispute);
      const created = { id: docRef.id, ...newDispute };
      setActiveDispute(created);
      setStep('view');
      
      // Clean creation fields
      setSelectedJob(null);
      setDisputeType('');
      setExplanation('');
      setEvidencePhoto(null);
    } catch (err) {
      console.error("Error creating dispute:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Simulate mediator ruling in favor of client (Updates Firestore)
  const handleSimulateRuling = async () => {
    if (!activeDispute) return;
    try {
      const dRef = doc(db, 'disputes', activeDispute.id);
      await updateDoc(dRef, {
        status: 'resolved_client',
        mediatorEvaluation: 'Fallo Arbitral: Se verificó la evidencia aportada por el cliente. Las uniones de caño no poseían el pegamento de sellado técnico correspondientemente homologado por las normativas vigentes, produciendo la pérdida grave detectada. El reclamo es procedente al 100%. Se habilita la compensación inmediata.',
        updatedAt: new Date().toISOString()
      });
      // Add a notification for client about ruling
      await addDoc(collection(db, 'notifications'), {
        recipientId: user.uid,
        title: '¡Resolución de Disputa!',
        description: `El mediador emitió un fallo a tu favor sobre el trabajo de ${activeDispute.jobCategory}.`,
        type: 'success',
        read: false,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error simulating outcome:", err);
    }
  };

  // Give complimentary points so user never gets stuck
  const handleGiveGiftPoints = async () => {
    if (!user) return;
    try {
      await updateProfile({
        client_points: 500
      });
    } catch (err) {
      console.error("Error giving companion points:", err);
    }
  };

  // Redeem Compensation & Create Free Replacement Job
  const handleRedeemCompensation = async (method: 'points' | 'premium') => {
    if (!user || !activeDispute) return;
    setReassigning(true);

    try {
      if (method === 'points') {
        const nextPoints = Math.max(0, points - 500);
        await updateProfile({
          client_points: nextPoints
        });
      } else {
        // Premium compensation - doesn't subtract points, but can deduct extra_garantias if tracked
        const nextGarantias = Math.max(0, (user.extra_garantias ?? 2) - 1);
        await updateProfile({
          extra_garantias: nextGarantias
        });
      }

      // Create new job in database for free
      const freeJob = {
        clientId: user.uid,
        clientName: user.displayName || 'Cliente',
        clientAvatar: user.photoURL || '',
        category: activeDispute.jobCategory,
        description: `⚠️ REPOSICIÓN BONIFICADA POR MEDIACIÓN (Soporte ID disputado: ${activeDispute.id.substring(0, 4)}): ${activeDispute.jobDescription}`,
        price: 'Totalmente Gratis ($0 Cobertura Arbitral)',
        status: 'pending',
        location: selectedJob?.location || { lat: -31.4167, lng: -64.1833, address: 'Córdoba Capital, Córdoba' },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isFreeReplacement: true,
        disputeReferenceId: activeDispute.id
      };

      await addDoc(collection(db, 'jobs'), freeJob);

      // Update dispute status to 'reassigned'
      const dRef = doc(db, 'disputes', activeDispute.id);
      await updateDoc(dRef, {
        status: 'reassigned',
        updatedAt: new Date().toISOString()
      });

      // Create notification for success
      await addDoc(collection(db, 'notifications'), {
        recipientId: user.uid,
        title: '¡Reposición creada gratis!',
        description: `Se subió tu solicitud de ${activeDispute.jobCategory} a la cartelera 100% bonificada.`,
        type: 'success',
        read: false,
        createdAt: serverTimestamp()
      });

      setReassignSuccess(true);
    } catch (err) {
      console.error("Error creating compensation job:", err);
    } finally {
      setReassigning(false);
    }
  };

  const handleCleanUpAllDisputes = async () => {
    try {
      setLoading(true);
      for (const d of disputes) {
        await deleteDoc(doc(db, 'disputes', d.id));
      }
      setActiveDispute(null);
      setStep('list');
    } catch (e) {
      console.error("Error wiping disputes:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-gray-50 dark:bg-bg-primary flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-150 dark:border-white/5 bg-white dark:bg-bg-primary/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => {
              if (step === 'create') {
                setStep('list');
                setSelectedJob(null);
              } else if (step === 'view') {
                setStep('list');
                setActiveDispute(null);
                setReassignSuccess(false);
              } else {
                onClose();
              }
            }} 
            className="w-10 h-10 bg-gray-100 dark:bg-gray-850 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-text-main transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-text-main leading-tight font-manrope">Módulo de Disputas y Mediación</h2>
              <p className="text-[10px] font-bold text-text-muted tracking-wide uppercase">Reporte de Problema Grave</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800/80 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </header>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-20 no-scrollbar max-w-2xl mx-auto w-full flex flex-col">
        
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12">
            <RefreshCw className="animate-spin text-primary" size={32} />
            <p className="text-sm font-bold text-text-muted">Cargando base de resoluciones...</p>
          </div>
        ) : step === 'list' ? (
          <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
            {/* Context Notice Banner */}
            <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-4 flex gap-3.5 items-start">
              <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={18} />
              <div className="text-left">
                <h4 className="text-xs font-black text-orange-600 dark:text-orange-400 mt-0 uppercase tracking-wider">¿Qué es una Mediación Proactiva?</h4>
                <p className="text-xs text-text-muted leading-relaxed mt-1">
                  Si un profesional generó daños, cobró incorrectamente o dejó el trabajo incompleto, podés abrir un reclamo. Nuestro equipo auditará las pruebas. Si el veredicto es a tu favor, generamos un técnico de reemplazo <strong>100% gratis</strong>.
                </p>
              </div>
            </div>

            {/* Panel 1: Active Claims */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-text-muted uppercase tracking-wider px-1">Tus Reclamos en Curso</h3>
                {disputes.length > 0 && (
                  <button 
                    onClick={handleCleanUpAllDisputes}
                    className="text-[10.5px] font-extrabold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20"
                    title="Limpiar historial de disputas"
                  >
                    <Trash2 size={12} />
                    Limpiar Disputas
                  </button>
                )}
              </div>

              {disputes.length === 0 ? (
                <div className="text-center py-10 px-6 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-bg-secondary flex flex-col items-center gap-3">
                  <ShieldCheck className="text-text-muted/40" size={36} />
                  <p className="text-xs font-bold text-text-muted">No tenés reclamos activos en este momento.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {disputes.map((d) => {
                    const statusConfig = 
                      d.status === 'under_review' ? { bg: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400', name: '🟡 EN AUDITORÍA' } :
                      d.status === 'resolved_client' ? { bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25', name: '🟢 FALLO A FAVOR' } :
                      d.status === 'reassigned' ? { bg: 'bg-blue-500/10 text-blue-500', name: '🔵 RESUELTO Y RE-ASIGNADO' } :
                      { bg: 'bg-gray-150 text-text-muted', name: '⚪ CERRADO' };

                    return (
                      <button
                        key={d.id}
                        onClick={() => {
                          setActiveDispute(d);
                          setStep('view');
                        }}
                        className="w-full flex items-center justify-between p-4 bg-white dark:bg-bg-secondary border border-gray-150 dark:border-gray-800/60 rounded-2xl hover:border-gray-300 dark:hover:border-gray-700 transition-all text-left shadow-sm"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${statusConfig.bg.split(' ')[0]}`}>
                            <FileText size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-black text-text-main uppercase tracking-tight">{d.jobCategory} - Grave</p>
                            <p className="text-[11px] text-text-muted truncate mt-0.5">Profesional: {d.professionalName}</p>
                            <p className="text-[10px] text-text-muted mt-1 font-mono">ID: {d.id.substring(0,6).toUpperCase()}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[9px] font-black px-2.5 py-1 rounded-full ${statusConfig.bg}`}>
                            {statusConfig.name}
                          </span>
                          <ChevronRight size={14} className="text-text-muted" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Panel 2: New Dispute trigger */}
            <div className="flex flex-col gap-3 mt-4">
              <h3 className="text-xs font-black text-text-muted uppercase tracking-wider px-1">Iniciar Nuevo Reclamo</h3>
              
              <div className="p-5 bg-white dark:bg-bg-secondary border border-gray-150 dark:border-gray-800 rounded-[28px] shadow-sm flex flex-col gap-4">
                <p className="text-xs text-text-muted leading-relaxed">
                  ¿Tuviste problemas críticos con un trabajo en tu historial de contrataciones? Seleccionalo para iniciar la mediación y coordinar el reclamo de pruebas.
                </p>

                {jobs.length === 0 ? (
                  <div className="flex flex-col gap-3 py-3 items-center text-center">
                    <p className="text-[11px] italic text-text-muted">¡Parece que tu historial está vacío! Creamos un trabajo completado de prueba para que experimentes la disputa:</p>
                    <button
                      type="button"
                      onClick={handleCreateDemoJob}
                      className="w-full h-11 bg-primary text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-primary-dark shadow-md transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Sparkles size={14} />
                      Crear Trabajo de Prueba
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                      {jobs.map((job) => (
                        <button
                          key={job.id}
                          onClick={() => {
                            setSelectedJob(job);
                            setStep('create');
                          }}
                          className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-850 text-left hover:border-primary/40 transition-all text-xs"
                        >
                          <div className="min-w-0">
                            <p className="font-bold text-text-main">{job.category}</p>
                            <p className="text-[10px] text-text-muted mt-0.5 truncate">{job.description}</p>
                          </div>
                          <ChevronRight size={14} className="text-text-muted shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-850 pt-3">
                      <button
                        onClick={handleCreateDemoJob}
                        className="text-xs text-primary font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles size={13} />
                        Agregar otro trabajo completado de demostración
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        ) : step === 'create' ? (
          <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-right-4 duration-200">
            {/* Header info detailing current job */}
            <div className="p-4 bg-white dark:bg-bg-secondary border border-gray-150 dark:border-gray-800 rounded-2xl">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-wider block">Trabajo Seleccionado</span>
              <h4 className="text-sm font-black text-text-main mt-1">{selectedJob?.category}</h4>
              <p className="text-xs text-text-muted mt-1 leading-snug line-clamp-2">{selectedJob?.description}</p>
              <div className="flex items-center gap-2 mt-3.5 pt-3 border-t border-gray-100 dark:border-gray-855 text-[11px] text-text-muted font-bold">
                <span className="shrink-0 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">Monto: ${selectedJob?.price}</span>
                <span>•</span>
                <span>Técnico: {selectedJob?.professionalName || 'Victoria Gonzalez'}</span>
              </div>
            </div>

            {/* Issue form inputs */}
            <div className="flex flex-col gap-5 text-left">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-text-muted uppercase tracking-wider px-0.5">¿Cuál fue la gravedad del problema?</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {[
                    { id: 'mal_trabajo', name: 'Trabajo Mal Hecho o Falla Crítica', desc: 'Arreglo defectuoso que sigue fallando' },
                    { id: 'rotura', name: 'Daño Físico o Rotura Secundaria', desc: 'Rompieron cañería o artefactos' },
                    { id: 'estafa', name: 'Cobro Indebido o Sobretarifa', desc: 'Cobró extras no acordados ni informados' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDisputeType(opt.id === disputeType ? '' : opt.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        disputeType === opt.id 
                          ? 'bg-red-500/5 border-red-500 shadow-md shadow-red-500/5' 
                          : 'bg-white dark:bg-bg-secondary border-gray-200 dark:border-gray-800 hover:border-gray-300'
                      }`}
                    >
                      <h5 className="font-bold text-xs text-text-main line-clamp-1">{opt.name}</h5>
                      <p className="text-[10px] text-text-muted mt-1 leading-snug leading-none">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form narrative input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-text-muted uppercase tracking-wider px-0.5">Explica detalladamente la situación:</label>
                <textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Por favor, describe exactamente qué salió mal y qué tipo de daños técnicos se provocaron..."
                  className="w-full min-h-[120px] p-4 bg-white dark:bg-bg-secondary border border-gray-200 dark:border-gray-800 rounded-2xl text-xs text-text-main placeholder:text-text-muted/60 focus:ring-1 focus:ring-red-400 outline-none resize-none font-bold"
                />
              </div>

              {/* Photo attachment evidence upload */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-text-muted uppercase tracking-wider px-0.5">Adjuntar Pruebas Fotográficas (Evidencia):</label>
                <div className="p-4 bg-white dark:bg-bg-secondary border border-gray-200 dark:border-gray-850 rounded-2xl flex flex-col gap-4">
                  {evidencePhoto ? (
                    <div className="relative rounded-xl overflow-hidden self-center border border-gray-200/50 max-w-xs">
                      <img src={evidencePhoto} alt="Evidencia" className="max-h-52 object-cover rounded-xl" />
                      <button
                        onClick={() => setEvidencePhoto(null)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-all cursor-pointer"
                        title="Eliminar foto"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-6 px-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl justify-center text-center">
                      <Camera className="text-text-muted/50" size={30} />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-text-main">Tomá una foto o subila de tu galería</span>
                        <span className="text-[10px] text-text-muted">Formatos aceptados: JPG, PNG, WEBP de hasta 5MB</span>
                      </div>
                      
                      <div className="flex gap-2.5 mt-2">
                        <label className="px-4 py-2 bg-gray-150 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-text-main text-[11px] font-extrabold rounded-lg cursor-pointer transition-colors">
                          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                          Seleccionar Archivo
                        </label>
                        <button
                          onClick={handleUseDemoEvidencePhoto}
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-[11px] font-extrabold rounded-lg transition-colors cursor-pointer"
                        >
                          Usar Foto de Demo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit triggers */}
              <button
                disabled={submitting || !disputeType || !explanation}
                onClick={handleSubmitDispute}
                className="w-full h-14 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 mt-4 shadow-lg shadow-red-500/10 active:scale-95 transition-all text-center cursor-pointer"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    Iniciando Arbitraje Técnico...
                  </>
                ) : (
                  <>
                    <ShieldAlert size={16} />
                    Iniciar Reclamo de Mediación
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* View Dispute Mediation Center */
          <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
            {/* Resolution Progress Tracker */}
            <div className="bg-white dark:bg-bg-secondary border border-gray-150 dark:border-gray-800 rounded-3xl p-5 shadow-sm text-left">
              <div className="flex justify-between items-start border-b border-gray-100 dark:border-gray-850 pb-3 mb-4">
                <div>
                  <span className="text-[9px] font-black text-text-muted uppercase tracking-wider block">ID de Mediación</span>
                  <h4 className="text-xs font-mono font-black text-text-main select-all mt-0.5">DISP-{activeDispute?.id?.toUpperCase()?.substring(0,8)}</h4>
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                  activeDispute?.status === 'under_review' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                  activeDispute?.status === 'resolved_client' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                  activeDispute?.status === 'reassigned' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-gray-100 dark:bg-gray-800 text-text-muted'
                }`}>
                  {
                    activeDispute?.status === 'under_review' ? '🟡 EN EVALUACIÓN' :
                    activeDispute?.status === 'resolved_client' ? '🟢 DICTAMEN A FAVOR' :
                    activeDispute?.status === 'reassigned' ? '🔵 CUBIERTO / RE-ASIGNADO' :
                    '⚪ CERRADO'
                  }
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="flex flex-col gap-4 mt-2">
                {[
                  { step: 1, title: 'Reclamo Formalizado', date: 'Hace instantes', desc: 'Se abrieron actas de mediación y se notificó al profesional.', isDone: true },
                  { step: 2, title: 'Revisión técnica de Evidencias', date: 'En línea', desc: `El mediador asignado (${activeDispute?.mediatorName || 'Coordinador Técnico'}) audita las imágenes y descripciones.`, isDone: true },
                  { 
                    step: 3, 
                    title: 'Declaratoria y Resolución', 
                    date: activeDispute?.status !== 'under_review' ? 'Emitido recién' : 'Esperando resolución del mediador', 
                    desc: activeDispute?.status !== 'under_review' ? (activeDispute?.mediatorEvaluation ?? 'Se dictaminó que corresponde compensación total.') : 'El mediador dictará la sentencia arbitral en base a los reglamentos.', 
                    isDone: activeDispute?.status !== 'under_review' 
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                        item.isDone ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-850 text-text-muted border border-gray-250'
                      }`}>
                        {item.step}
                      </div>
                      {i < 2 && <div className={`w-0.5 flex-1 min-h-[30px] ${item.isDone ? 'bg-emerald-500' : 'bg-gray-150 dark:bg-gray-850'}`} />}
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-text-main flex gap-2 items-center">
                        {item.title}
                        <span className="text-[9px] text-text-muted font-normal">({item.date})</span>
                      </h5>
                      <p className="text-[11px] text-text-muted leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated ruling trigger (ONLY when status is 'under_review') */}
            {activeDispute?.status === 'under_review' && (
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl flex flex-col gap-3.5 items-stretch text-left">
                <div className="flex gap-3 items-start">
                  <Sparkles className="text-yellow-600 shrink-0 mt-0.5" size={17} />
                  <div>
                    <h5 className="text-xs font-black text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">Acción de Demostración del Mediador</h5>
                    <p className="text-[11px] text-text-muted leading-relaxed mt-0.5">
                      Para ver y experimentar el funcionamiento del reclamo y los beneficios de compensación con puntos/garantías, simulá el fallo del mediador de forma online haciendo clic abajo:
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSimulateRuling}
                  className="h-10 px-4 bg-yellow-600 hover:bg-yellow-700 text-white text-[11px] font-black rounded-xl transition-all self-start cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <RefreshCw size={12} />
                  Simular Fallo a Favor del Cliente
                </button>
              </div>
            )}

            {/* Dispute details panel & evidence photo */}
            <div className="p-4 bg-white dark:bg-bg-secondary border border-gray-150 dark:border-gray-800 rounded-2xl flex flex-col text-left gap-3">
              <h4 className="text-xs font-black text-text-muted uppercase tracking-wider pb-2 border-b border-gray-50 dark:border-gray-850">Información del reclamo cargado</h4>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-text-muted block text-[10px]">Trabajo disputado</span>
                  <strong className="text-text-main">{activeDispute?.jobCategory}</strong>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">Técnico imputado</span>
                  <strong className="text-text-main">{activeDispute?.professionalName}</strong>
                </div>
              </div>

              <div className="text-xs mt-1">
                <span className="text-text-muted block text-[10px]">Explicación de la fallas</span>
                <p className="text-text-main bg-gray-50 dark:bg-gray-850 p-3 rounded-xl border border-gray-100/50 mt-1 leading-snug font-bold">
                  "{activeDispute?.explanation}"
                </p>
              </div>

              {activeDispute?.evidencePhoto && (
                <div className="mt-2">
                  <span className="text-text-muted block text-[10px] mb-1.5">Fotografía de Prueba aportada</span>
                  <img src={activeDispute.evidencePhoto} alt="Evidencia de mediación" className="max-h-48 rounded-xl object-cover border border-gray-150/60" />
                </div>
              )}
            </div>

            {/* Compensation triggers (ONLY when resolved_client) */}
            {activeDispute?.status === 'resolved_client' && !reassignSuccess && (
              <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-[28px] flex flex-col gap-4 text-left animate-in zoom-in fade-in duration-200">
                <div className="flex gap-3.5 items-start">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5 animate-pulse" size={24} />
                  <div>
                    <h4 className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">¡DICTAMEN PROCEDENTE Y GRATUITO!</h4>
                    <p className="text-xs text-text-muted leading-relaxed mt-1">
                      El mediador confirmó que la falla técnica es responsabilidad directa del proveedor y resolvió el caso a tu favor. Se ha habilitado la <strong>bonificación total</strong> para que otro profesional realice la tarea correctamente.
                    </p>
                  </div>
                </div>

                <div className="border-t border-emerald-500/10 pt-4 flex flex-col gap-3">
                  <h5 className="text-[11px] font-black text-text-main uppercase tracking-wider">Elegí un beneficio para canjear de forma gratuita:</h5>
                  
                  {isPremium ? (
                    /* Premium option card */
                    <button
                      disabled={reassigning}
                      onClick={() => handleRedeemCompensation('premium')}
                      className="w-full p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/30 rounded-2xl flex items-center justify-between hover:border-yellow-500/50 active:scale-[0.99] transition-all text-left"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-yellow-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md shadow-yellow-500/10 shrink-0">
                          ★
                        </div>
                        <div>
                          <h6 className="text-xs font-black text-yellow-700 dark:text-yellow-400 uppercase tracking-tight">Socio Premium Gold - Cobertura Total</h6>
                          <p className="text-[10px] text-text-muted mt-0.5">Usar tu "Garantía Plus" de membresía para reposición $0.</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-yellow-600 dark:text-yellow-400 shrink-0 ml-1 bg-yellow-500/10 px-2 py-1 rounded-lg uppercase">
                        Aplicar $0
                      </span>
                    </button>
                  ) : (
                    /* Basic option cards (Points) */
                    <div className="flex flex-col gap-2.5">
                      <div className="p-4 bg-white dark:bg-bg-secondary border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10.5px] font-black text-text-main block">Tus Puntos de Fidelidad actuales</span>
                          <span className="text-[10px] text-text-muted mt-0.5 block">Requerido para canjear gratis: <strong>500 Puntos</strong></span>
                        </div>
                        <span className="text-sm font-mono font-black text-text-main bg-gray-50 dark:bg-gray-850 px-3 py-1.5 rounded-lg border border-gray-150">
                          🪙 {points} pts
                        </span>
                      </div>

                      {points >= 500 ? (
                        <button
                          disabled={reassigning}
                          onClick={() => handleRedeemCompensation('points')}
                          className="w-full h-12 bg-primary text-white rounded-xl text-xs font-bold leading-none flex items-center justify-center gap-1.5 shadow-md active:scale-95 hover:bg-primary-dark transition-all cursor-pointer"
                        >
                          <Trophy size={14} />
                          Canjear 500 Puntos y Re-crear Trabajo Gratis
                        </button>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <p className="text-[10.5px] text-red-500 font-bold leading-snug">
                            No posees los 500 puntos requeridos. Para poder experimentar la compensación gratuita de forma inmediata, solicita aquí tu cortesía de bienvenida de 500 puntos:
                          </p>
                          <button
                            onClick={handleGiveGiftPoints}
                            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Trophy size={14} className="animate-bounce" />
                            Obtener Cortesía de 500 Puntos Gratis
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Compensation success screen */}
            {(activeDispute?.status === 'reassigned' || reassignSuccess) && (
              <div className="p-6 bg-gradient-to-b from-blue-500/10 to-sky-500/5 border border-blue-500/20 rounded-[32px] text-center flex flex-col items-center gap-3 animate-in zoom-in fade-in duration-300">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md shadow-blue-500/10 shrink-0">
                  <UserCheck size={24} />
                </div>
                <h4 className="text-base font-black text-blue-600 dark:text-blue-400 uppercase tracking-wide">¡TRABAJO BONIFICADO RE-PUBLICADO CORRECTAMENTE!</h4>
                
                <p className="text-xs text-text-muted leading-relaxed max-w-md mx-auto">
                  La reposición del servicio de <strong>{activeDispute?.jobCategory}</strong> ha sido creada de forma 100% bonificada ($0 final) y publicada inmediatamente en la bolsa de trabajo para la zona de Córdoba. Un profesional calificado la tomará en la brevedad.
                </p>

                <div className="border border-blue-500/10 rounded-xl bg-white/45 dark:bg-black/10 p-3 mt-2 text-left self-stretch text-[11px] text-text-muted">
                  <strong>Estado actual:</strong> El dinero se ha cobrado del fondo operativo de garantía de Servicios Pro. El profesional anterior fue penalizado correspondientemente en su ranking y se cerró la etapa de mediación técnica.
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep('list');
                    setActiveDispute(null);
                    setReassignSuccess(false);
                  }}
                  className="mt-2 px-5 h-11 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-lg transition-all shadow-md active:scale-[0.98] cursor-pointer inline-flex items-center"
                >
                  Regresar a la Lista de Disputas
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </motion.div>
  );
}
