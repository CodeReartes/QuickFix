import { useEffect, useState } from 'react';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Tu navegador no soporta notificaciones push.');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        showNotification('¡Notificaciones activadas!', {
          body: 'Recibirás avisos de nuevos trabajos y mensajes.',
          icon: '/favicon.ico' // Or any icon path
        });
      }
      return result === 'granted';
    } catch (error) {
      console.error('Error al pedir permisos:', error);
      return false;
    }
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notif = new Notification(title, options);
      
      notif.onclick = () => {
        window.focus();
        notif.close();
      };
      
      return notif;
    }
    return null;
  };

  return {
    permission,
    requestPermission,
    showNotification
  };
};
