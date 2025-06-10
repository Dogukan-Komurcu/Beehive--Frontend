import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import { apiService } from '@/services/api';
import { Alert as ApiAlert } from '@/types/api';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'warning' | 'info';
  read: boolean;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDropdown = ({ isOpen, onClose }: NotificationsDropdownProps) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Fetch alerts from backend and map to Notification[]
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await apiService.getMyAlerts();
      const mapped: Notification[] = Array.isArray(data)
        ? data.map((alert: ApiAlert) => {
            let type: Notification['type'] = 'info';
            if (alert.type === 'error') type = 'critical';
            else if (alert.type === 'warning') type = 'warning';
            else if (alert.type === 'info') type = 'info';
            return {
              id: alert.id,
              title:
                alert.type === 'error'
                  ? 'Kritik Uyarı'
                  : alert.type === 'warning'
                  ? 'Uyarı'
                  : 'Bilgi',
              message: `${alert.hiveName || alert.hiveId}: ${alert.message}`,
              time: alert.timestamp,
              type,
              read: alert.isRead,
            };
          })
        : [];
      setNotifications(mapped);
    } catch (err) {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) fetchNotifications();
    // Optionally, add polling here for real-time updates
  }, [isOpen]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const markAsRead = async (id: number) => {
    setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, read: true } : notif));
    try {
      await apiService.markAlertAsRead(id);
    } catch {}
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Bildirimler
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {loading ? (
              <div className="text-center text-gray-400 py-8">Yükleniyor...</div>
            ) : notifications.length === 0 ? (
              <div className="text-center text-gray-400 py-8">Hiç bildirim yok.</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    notification.read 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>{notification.title}</p>
                      <p className={`text-xs ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>{notification.message}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        <div className="mt-4 pt-3 border-t">
          <Button variant="outline" className="w-full text-sm" onClick={fetchNotifications}>
            Tüm Bildirimleri Görüntüle
          </Button>
        </div>
      </CardContent>
    </div>
  );
};
