import { Home, MessageCircle, User, History } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: 'home' | 'activity' | 'messages' | 'profile';
  onTabChange: (tab: any) => void;
  unreadMessages?: number;
}

export default function BottomNav({ activeTab, onTabChange, unreadMessages = 0 }: BottomNavProps) {
  const TABS = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'activity', label: 'Historial', icon: History },
    { id: 'messages', label: 'Mensajes', icon: MessageCircle, badge: unreadMessages },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-[999] pointer-events-auto bg-white dark:bg-[#1A1A1A] border-t border-black/5 dark:border-white/10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pt-1 pb-safe">
      <nav className="flex items-center justify-between px-4 pb-1 w-full max-w-md mx-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center h-[46px] group outline-none flex-1 gap-1"
            >
              <div className={`relative z-10 transition-colors duration-300 ease-out flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[#0052FF] dark:text-[#00D8FF]' : 'text-text-muted hover:text-text-main'}`}>
                {/* Icon */}
                <div className="relative">
                  <tab.icon 
                    size={24} 
                    strokeWidth={isActive ? 2.5 : 2} 
                    className="transition-transform duration-300"
                  />
                  {(tab as any).badge ? (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-[#1A1A1A] flex items-center justify-center">
                       <span className="text-[8px] font-black text-white leading-none shadow-sm">{tab.badge > 9 ? '9+' : tab.badge}</span>
                    </div>
                  ) : null}
                </div>
                
                {/* Always Visible Label */}
                <span className="text-[10px] font-bold tracking-wide leading-none mt-1">
                  {tab.label}
                </span>
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute bottom-[-1px] w-8 h-[2.5px] bg-[#0052FF] dark:bg-[#00D8FF] rounded-full shadow-[0_2px_8px_rgba(0,82,255,0.4)]"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}


