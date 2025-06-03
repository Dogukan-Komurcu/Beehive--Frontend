
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  read: boolean;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDropdown = ({ isOpen, onClose }: NotificationsDropdownProps) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      title: 'Kritik Uyarı',
      message: 'Kovan-002 yüksek sıcaklık - 42°C',
      time: '5 dk önce',
      type: 'critical',
      read: false
    },
    {
      id: 2,
      title: 'Bağlantı Sorunu',
      message: 'Kovan-004 çevrimdışı',
      time: '15 dk önce',
      type: 'warning',
      read: false
    },
    {
      id: 3,
      title: 'Düşük Batarya',
      message: 'Kovan-007 batarya seviyesi %15',
      time: '1 saat önce',
      type: 'warning',
      read: true
    },
    {
      id: 4,
      title: 'Sistem Güncellemesi',
      message: 'Kovan-001 başarıyla güncellendi',
      time: '2 saat önce',
      type: 'success',
      read: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
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
            {notifications.map((notification) => (
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
                    <p className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                      {notification.title}
                    </p>
                    <p className={`text-xs ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
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
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 pt-3 border-t">
          <Button variant="outline" className="w-full text-sm">
            Tüm Bildirimleri Görüntüle
          </Button>
        </div>
      </CardContent>
    </div>
  );
};
