import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, CheckCircle, ShieldAlert, BadgeCheck, XCircle, Search, FileImage, 
  Scale, MessageSquare, AlertTriangle, ShieldCheck, Clock, Check, Briefcase, ChevronRight 
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, doc, updateDoc, onSnapshot, addDoc } from 'firebase/firestore';
import { User } from '../types';
import { useAuth } from '../services/authService';

export default function AdminDashboard({ onSignOut, onSwitchMode }: { onSignOut: () => void, onSwitchMode?: (mode: 'client' | 'professional') => void }) {
  const [users, setUsers] = useState<User[]>([]);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'disputes'>('users');
  
  const [filter, setFilter] = useState<'all' | 'client' | 'professional'>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending'>('pending');
  const [disputeFilter, setDisputeFilter] = useState<'all' | 'under_review' | 'resolved'>('all');
  
  const [search, setSearch] = useState('');
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData: User[] = [];
      snapshot.forEach((doc) => {
        usersData.push(doc.data() as User);
      });
      setUsers(usersData);
    }, (error) => {
      console.error("Error fetching users:", error);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const disputesQ = query(collection(db, 'disputes'));
    const unsubscribe = onSnapshot(disputesQ, (snapshot) => {
      const listData: any[] = [];
      snapshot.forEach((doc) => {
        listData.push({ id: doc.id, ...doc.data() });
      });
      listData.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
      setDisputes(listData);
    }, (error) => {
      console.error("Error fetching disputes:", error);
    });
    return unsubscribe;
  }, []);

  const handleApprovePayment = async (userId: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        is_premium: true,
        premium_status: 'active',
        last_payment_date: Date.now()
      });
    } catch (e) {
      console.error("Error approving payment", e);
    }
  };

  const handleApproveRecharge = async (userId: string, amount: number) => {
    try {
      const userDoc = users.find(u => u.uid === userId);
      const currentBalance = userDoc?.wallet_balance || 0;
      await updateDoc(doc(db, 'users', userId), {
        wallet_balance: currentBalance + amount,
        'recharge_request.status': 'SUCCESSFUL'
      });
    } catch (e) {
      console.error("Error approving recharge request", e);
    }
  };

  const handleRejectRecharge = async (userId: string) => {
    const reason = prompt("Por favor ingresá el motivo de rechazo de la carga (Ej: Comprobante ilegible, Monto inexacto):");
    if (reason === null) return; // user cancelled prompt
    try {
      await updateDoc(doc(db, 'users', userId), {
        'recharge_request.status': 'REJECTED',
        'recharge_request.rejection_reason': reason || 'comprobante inválido o ilegible'
      });
    } catch (e) {
      console.error("Error rejecting recharge request", e);
    }
  };

  const handleToggleActive = async (userId: string, currentBlocked: boolean | undefined) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        is_blocked: !currentBlocked
      });
    } catch (e) {
      console.error("Error toggling account block status", e);
    }
  };

  const handleInterveneDispute = async (disputeId: string) => {
    try {
      await updateDoc(doc(db, 'disputes', disputeId), {
        mediatorName: 'Administrador Principal (Soporte Técnico)',
        takenByAdmin: true,
        updatedAt: new Date().toISOString()
      });
      
      const d = disputes.find(x => x.id === disputeId);
      if (d) {
        await addDoc(collection(db, 'notifications'), {
          recipientId: d.clientId,
          title: 'ℹ️ Mediación Intervenida',
          description: `El Administrador Principal ha tomado intervención técnica de tu reclamo por ${d.jobCategory}.`,
          type: 'info',
          read: false,
          createdAt: new Date().toISOString()
        });

        await addDoc(collection(db, 'notifications'), {
          recipientId: d.professionalId,
          title: '⚠️ Reclamo Intervenido por Administrador',
          description: `La administración ha tomado intervención directa sobre el reclamo de ${d.jobCategory} iniciado por el cliente.`,
          type: 'warning',
          read: false,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error("Error taking control of dispute", e);
    }
  };

  const handleResolveFavorClient = async (disputeId: string) => {
    const defaultText = "Fallo Arbitral: Luego de auditar detalladamente el material visual adjunto y la descripción proporcionada, la administración ha validado la impericia técnica de la labor. Se dictamina compensación total a favor del cliente.";
    const evaluation = prompt("Escribe tu veredicto de mediación o presiona Aceptar para el veredicto por defecto:", defaultText);
    if (evaluation === null) return;

    try {
      await updateDoc(doc(db, 'disputes', disputeId), {
        status: 'resolved_client',
        mediatorEvaluation: evaluation || defaultText,
        updatedAt: new Date().toISOString()
      });

      const d = disputes.find(x => x.id === disputeId);
      if (d) {
        await addDoc(collection(db, 'notifications'), {
          recipientId: d.clientId,
          title: '🎉 ¡Sentencia de Mediación Aprobada!',
          description: `El Administrador emitió un fallo a tu favor por el trabajo de de ${d.jobCategory}. Podés reclamar tu reposición sin cargo.`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error("Error resolving dispute to client", e);
    }
  };

  const handleResolveFavorPro = async (disputeId: string) => {
    const defaultText = "Fallo Arbitral: Tras analizar las evidencias técnicas recabadas, se constató que la obra cumple acabadamente con los requisitos pactados y las normativas. No se encuentran fallas técnicas imputables. El reclamo del cliente ha sido desestimado.";
    const evaluation = prompt("Escribe el veredicto o presiona Aceptar para el veredicto por defecto:", defaultText);
    if (evaluation === null) return;

    try {
      await updateDoc(doc(db, 'disputes', disputeId), {
        status: 'closed',
        mediatorEvaluation: evaluation || defaultText,
        updatedAt: new Date().toISOString()
      });

      const d = disputes.find(x => x.id === disputeId);
      if (d) {
        await addDoc(collection(db, 'notifications'), {
          recipientId: d.clientId,
          title: '🔴 Mediación Finalizada',
          description: `El mediador desestimó el reclamo tecnico sobre la tarea de ${d.jobCategory}.`,
          type: 'info',
          read: false,
          createdAt: new Date().toISOString()
        });
        await addDoc(collection(db, 'notifications'), {
          recipientId: d.professionalId,
          title: '✅ Reclamo Desestimado',
          description: `El reclamo iniciado por el cliente por tu servicio de ${d.jobCategory} fue desestimado a tu favor.`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error("Error closing dispute in favor of pro", e);
    }
  };

  const filteredUsers = users.filter(u => {
    if (filter !== 'all' && u.role !== filter) return false;
    if (paymentFilter === 'pending' && u.premium_status !== 'pending') return false;
    if (search && !u.displayName.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filteredDisputes = disputes.filter(d => {
    if (disputeFilter === 'under_review' && d.status !== 'under_review') return false;
    if (disputeFilter === 'resolved' && (d.status !== 'resolved_client' && d.status !== 'reassigned' && d.status !== 'closed')) return false;
    
    if (search) {
      const searchLower = search.toLowerCase();
      const matchClient = d.clientName?.toLowerCase().includes(searchLower);
      const matchPro = d.professionalName?.toLowerCase().includes(searchLower);
      const matchCategory = d.jobCategory?.toLowerCase().includes(searchLower);
      const matchType = d.disputeType?.toLowerCase().includes(searchLower);
      return matchClient || matchPro || matchCategory || matchType;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-150 flex flex-col px-6 pt-4 pb-0 gap-4 shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl text-primary font-manrope">Panel de Control</h1>
          <button onClick={onSignOut} className="text-sm font-bold text-text-muted hover:text-alert transition-colors cursor-pointer">
            Cerrar Sesión
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onSwitchMode?.('client')}
            className="flex-1 bg-primary/5 hover:bg-primary/10 text-primary py-2 rounded-xl text-xs font-bold transition-all border border-primary/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Users size={14} /> Modo Cliente
          </button>
          <button 
            onClick={() => onSwitchMode?.('professional')}
            className="flex-1 bg-secondary/5 hover:bg-secondary/10 text-secondary py-2 rounded-xl text-xs font-bold transition-all border border-secondary/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShieldAlert size={14} /> Modo Profesional
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-t border-gray-100 mt-2">
          <button
            onClick={() => {
              setActiveTab('users');
              setSearch('');
            }}
            className={`flex-1 py-3 text-center text-[11px] font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === 'users'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text-main'
            }`}
          >
            Usuarios y Finanzas
          </button>
          <button
            onClick={() => {
              setActiveTab('disputes');
              setSearch('');
            }}
            className={`flex-1 py-3 text-center text-[11px] font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'disputes'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text-main'
            }`}
          >
            Casos de Mediación
            {disputes.filter(d => d.status === 'under_review').length > 0 && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[9px] font-extrabold animate-pulse">
                {disputes.filter(d => d.status === 'under_review').length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* FILTER BUTTONS & SEARCH BAR */}
      {activeTab === 'users' ? (
        <div className="flex flex-col shrink-0">
          <div className="p-4 px-6 flex gap-2 overflow-x-auto no-scrollbar bg-white border-b border-gray-100">
            <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 cursor-pointer ${filter === 'all' ? 'bg-primary text-white' : 'bg-[#F1F5F9] text-text-muted border border-transparent'}`}>Todos</button>
            <button onClick={() => setFilter('client')} className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 cursor-pointer ${filter === 'client' ? 'bg-primary text-white' : 'bg-[#F1F5F9] text-text-muted border border-transparent'}`}>Clientes</button>
            <button onClick={() => setFilter('professional')} className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 cursor-pointer ${filter === 'professional' ? 'bg-primary text-white' : 'bg-[#F1F5F9] text-text-muted border border-transparent'}`}>Profesionales</button>
            <button onClick={() => setPaymentFilter(paymentFilter === 'pending' ? 'all' : 'pending')} className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 cursor-pointer ${paymentFilter === 'pending' ? 'bg-secondary text-white' : 'bg-[#F1F5F9] text-text-muted border border-transparent'}`}>Pagos Pendientes ({users.filter(u => u.premium_status === 'pending').length})</button>
          </div>

          <div className="px-6 py-3 bg-white border-b border-gray-100">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text"
                placeholder="Buscar usuario o email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-[#F8FAFC] rounded-xl border border-gray-100 outline-none focus:border-primary transition-colors text-xs font-semibold text-text-main"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col shrink-0">
          <div className="p-4 px-6 flex gap-2 overflow-x-auto no-scrollbar bg-white border-b border-gray-100">
            <button onClick={() => setDisputeFilter('all')} className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 cursor-pointer ${disputeFilter === 'all' ? 'bg-primary text-white' : 'bg-[#F1F5F9] text-text-muted border border-transparent'}`}>Todos los casos</button>
            <button onClick={() => setDisputeFilter('under_review')} className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 cursor-pointer flex items-center gap-1.5 ${disputeFilter === 'under_review' ? 'bg-amber-500 text-white' : 'bg-[#F1F5F9] text-text-muted border border-transparent'}`}>
              🟡 En Evaluación ({disputes.filter(d => d.status === 'under_review').length})
            </button>
            <button onClick={() => setDisputeFilter('resolved')} className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 cursor-pointer flex items-center gap-1.5 ${disputeFilter === 'resolved' ? 'bg-emerald-600 text-white' : 'bg-[#F1F5F9] text-text-muted border border-transparent'}`}>
              🟢 Dictaminados ({disputes.filter(d => d.status !== 'under_review').length})
            </button>
          </div>

          <div className="px-6 py-3 bg-white border-b border-gray-100">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text"
                placeholder="Buscar por cliente, profesional, categoría..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-[#F8FAFC] rounded-xl border border-gray-100 outline-none focus:border-primary transition-colors text-xs font-semibold text-text-main"
              />
            </div>
          </div>
        </div>
      )}

      {/* DETAILED RENDERING OF TABS */}
      <main className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 no-scrollbar">
        {activeTab === 'users' ? (
          <>
            {/* Pending Recharges Section (Bank Transfers) */}
            {users.filter(u => u.recharge_request?.status === 'PENDING_ADMIN_APPROVAL').length > 0 && (
              <div className="flex flex-col gap-3 py-1">
                <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest px-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Solicitudes de Carga (Banco/Transferencia)
                </h4>
                <div className="flex flex-col gap-3">
                  {users.filter(u => u.recharge_request?.status === 'PENDING_ADMIN_APPROVAL').map(u => (
                    <div key={u.uid} className="bg-amber-50/40 p-4 rounded-2xl border-2 border-dashed border-amber-300/65 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center font-black text-amber-700 text-xs overflow-hidden shrink-0">
                          {u.photoURL ? <img src={u.photoURL} alt={u.displayName} className="w-full h-full object-cover" /> : u.displayName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-amber-900 leading-tight">{u.displayName}</p>
                          <p className="text-[10px] text-amber-700/80 mt-0.5 leading-none">{u.email}</p>
                          <p className="text-[9px] text-gray-400 mt-1 font-mono">
                            {u.recharge_request?.timestamp ? new Date(u.recharge_request.timestamp).toLocaleString('es-AR') : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:self-center">
                        <div className="bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-300/50 font-black text-amber-900 text-xs tracking-tight">
                          Monto: ${u.recharge_request?.amount.toLocaleString('es-AR')}
                        </div>

                        {u.recharge_request?.screenshot && (
                          <button
                            onClick={() => setSelectedProof(u.recharge_request!.screenshot)}
                            className="text-amber-700 hover:bg-amber-500/15 p-2 rounded-xl text-[10px] font-black border border-amber-300/40 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <FileImage size={13} /> Ver Comprobante
                          </button>
                        )}

                        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                          <button
                            onClick={() => handleApproveRecharge(u.uid, u.recharge_request!.amount)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-black transition-all cursor-pointer shadow-sm active:scale-95"
                          >
                            Aprobar
                          </button>
                          <button
                            onClick={() => handleRejectRecharge(u.uid)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl text-[11px] font-black transition-all border border-red-200 cursor-pointer active:scale-95"
                          >
                            Rechazar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredUsers.map(user => (
              <div key={user.uid} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary overflow-hidden shrink-0">
                      {user.photoURL ? <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" /> : user.displayName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-sm text-text-main truncate leading-snug">{user.displayName}</h3>
                      <p className="text-xs text-text-muted truncate leading-none mt-0.5">{user.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase shrink-0 ${user.role === 'client' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                    {user.role === 'client' ? 'CLIENTE' : 'PROFESIONAL'}
                  </span>
                </div>

                {user.premium_status === 'pending' && (
                  <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <BadgeCheck size={18} className="text-amber-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-amber-800">Solicitud Premium</p>
                        {user.payment_proof_url ? (
                          <button 
                            onClick={() => setSelectedProof(user.payment_proof_url!)}
                            className="text-amber-600 text-[10px] font-bold underline mt-1 flex items-center gap-1 cursor-pointer"
                          >
                             <FileImage size={11} /> Ver Comprobante
                          </button>
                        ) : (
                          <p className="text-[9px] text-amber-600">Sin comprobante</p>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleApprovePayment(user.uid)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer leading-none shrink-0"
                    >
                      Aprobar
                    </button>
                  </div>
                )}
                
                {/* Suspension controls */}
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center mt-0.5">
                   <button 
                    onClick={() => handleToggleActive(user.uid, user.is_blocked)}
                    className={`text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${user.is_blocked ? 'text-success' : 'text-alert'}`}
                   >
                     {user.is_blocked ? <CheckCircle size={14} /> : <ShieldAlert size={14} />} 
                     {user.is_blocked 
                       ? (user.role === 'client' ? 'Activar Cliente' : 'Activar Profesional') 
                       : (user.role === 'client' ? 'Suspender Cliente' : 'Suspender Profesional')}
                   </button>
                   {user.is_blocked && (
                     <span className="text-[9px] font-extrabold text-alert uppercase bg-red-100/50 dark:bg-red-950/20 px-2 py-0.5 rounded">
                       Suspendido
                     </span>
                   )}
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-10 opacity-50 flex flex-col items-center">
                 <Search size={32} className="mb-3 text-text-muted" />
                 <p className="font-bold text-xs text-text-muted">No se encontraron usuarios.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Casos de Mediación Section */}
            {filteredDisputes.map((dispute) => {
              const hasIntervened = dispute.takenByAdmin || dispute.mediatorName?.includes('Administrador');
              
              return (
                <div key={dispute.id} className="bg-white rounded-2xl border border-gray-150 p-5 shadow-sm flex flex-col gap-4 text-left">
                  {/* Category and ID */}
                  <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                    <div>
                      <span className="text-[9px] font-black text-text-muted uppercase tracking-wider block">Reclamo Técnico</span>
                      <h3 className="font-extrabold text-base text-text-main flex items-center gap-1.5 mt-0.5 leading-snug">
                        <AlertTriangle size={15} className="text-red-500 shrink-0" />
                        {dispute.jobCategory}
                      </h3>
                      <p className="text-[10px] font-mono text-text-muted select-translate-all mt-0.5">ID: DISP-{dispute.id.substring(0,8).toUpperCase()}</p>
                    </div>

                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                      dispute.status === 'under_review' ? 'bg-amber-100 text-amber-700' :
                      dispute.status === 'resolved_client' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 animate-pulse' :
                      dispute.status === 'reassigned' ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-100 text-text-muted'
                    }`}>
                      {
                        dispute.status === 'under_review' ? '🟡 EN EVALUACIÓN' :
                        dispute.status === 'resolved_client' ? '🟢 DICTAMEN CLIENTE' :
                        dispute.status === 'reassigned' ? '🔵 RE-ASIGNADO' :
                        '⚪ CERRADO'
                      }
                    </span>
                  </div>

                  {/* Parties Involved */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100/70">
                    <div>
                      <span className="text-[9px] font-black text-text-muted uppercase tracking-widest block mb-0.5">Cliente reclamante</span>
                      <p className="font-extrabold text-xs text-text-main truncate">{dispute.clientName}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-text-muted uppercase tracking-widest block mb-0.5">Profesional de la tarea</span>
                      <p className="font-extrabold text-xs text-text-main truncate">{dispute.professionalName}</p>
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div>
                    <span className="text-[9px] font-black text-text-muted uppercase tracking-wider block mb-1">Descripción del Incidente</span>
                    <div className="bg-red-50/20 border border-red-500/10 p-4 rounded-xl">
                      <p className="text-xs font-extrabold text-red-900 border-b border-dashed border-red-200/50 pb-1.5 mb-2 flex items-center gap-1 uppercase tracking-tight">
                        Motivo: <span className="font-semibold">{dispute.disputeType}</span>
                      </p>
                      <p className="text-xs text-text-main font-semibold leading-relaxed italic select-all">
                        "{dispute.explanation}"
                      </p>
                    </div>
                  </div>

                  {/* Evidence visual attached */}
                  {dispute.evidencePhoto && (
                    <div>
                      <span className="text-[9px] font-black text-text-muted uppercase tracking-wider block mb-1">Evidencia Fotográfica</span>
                      <button 
                        onClick={() => setSelectedProof(dispute.evidencePhoto)}
                        className="relative rounded-xl overflow-hidden block w-full max-w-sm group border border-gray-150 cursor-pointer"
                      >
                        <img src={dispute.evidencePhoto} alt="Evidencia de mediación" className="w-full h-32 object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1 p-2">
                          <FileImage size={15} /> Ampliar Evidencia
                        </div>
                      </button>
                    </div>
                  )}

                  {/* Active Mediator information line */}
                  <div className="flex items-center gap-1.5 text-xs text-text-muted border-t border-gray-100 pt-3">
                    <Scale size={14} className="text-primary shrink-0" />
                    <span>
                      Mediador actual: <strong className="text-text-main font-bold">{dispute.mediatorName || 'Fondo Automático'}</strong>
                    </span>
                  </div>

                  {/* Custom admin evaluation if resolved */}
                  {dispute.mediatorEvaluation && (
                    <div className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl mt-1">
                      <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Fallo del Administrador</span>
                      <p className="text-xs text-emerald-900 font-semibold leading-relaxed">
                        {dispute.mediatorEvaluation}
                      </p>
                    </div>
                  )}

                  {/* CONTROL BUTTONS FOR ADMIN ACTION */}
                  <div className="flex flex-col gap-2 mt-2 border-t border-gray-100 pt-3">
                    {!hasIntervened && dispute.status === 'under_review' ? (
                      <button
                        onClick={() => handleInterveneDispute(dispute.id)}
                        className="w-full h-11 bg-gradient-to-r from-[#0052FF] to-primary hover:opacity-90 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 cursor-pointer"
                      >
                        <ShieldCheck size={15} /> ¡Tomar iniciativa del reclamo!
                      </button>
                    ) : dispute.status === 'under_review' ? (
                      <div className="flex flex-col gap-2.5">
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-2.5 flex items-center gap-2 text-xs font-extrabold text-primary uppercase tracking-wider">
                          <ShieldCheck size={14} className="fill-primary/20 animate-pulse" />
                          <span>Intervenido por ti: Listo para dictaminar</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleResolveFavorClient(dispute.id)}
                            className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm shadow-emerald-500/15"
                            title="Aprobar compensación total para el cliente"
                          >
                            <Check size={13} /> Fallo Cliente
                          </button>
                          <button
                            onClick={() => handleResolveFavorPro(dispute.id)}
                            className="h-10 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm shadow-rose-500/15"
                            title="Rechazar el reclamo del cliente y favorecer al prestador"
                          >
                            <XCircle size={13} /> Desestimar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-bold text-text-muted justify-center py-1">
                        <Check size={14} className="text-emerald-500" />
                        <span>Caso resuelto con éxito</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredDisputes.length === 0 && (
              <div className="text-center py-12 opacity-50 flex flex-col items-center">
                 <Scale size={36} className="mb-3 text-text-muted" />
                 <p className="font-bold text-xs text-text-muted">No se encontraron reclamos con los filtros actuales.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Proof Viewer Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-[3000] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative max-w-lg w-full bg-white rounded-[32px] overflow-hidden p-2 shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedProof(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer z-10"
            >
              <XCircle size={22} />
            </button>
            <img src={selectedProof} alt="Visualización ampliada" className="w-full h-auto rounded-[24px]" />
          </div>
        </div>
      )}
    </div>
  );
}
