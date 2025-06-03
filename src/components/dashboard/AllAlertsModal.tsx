
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  X,
  Filter,
  RotateCcw
} from 'lucide-react';

interface Alert {
  id: number;
  hive: string;
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'warning' | 'info';
  read: boolean;
  resolved: boolean;
}

interface AllAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AllAlertsModal = ({ isOpen, onClose }: AllAlertsModalProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, hive: 'Kovan-002', title: 'Kritik Uyarı', message: 'Yüksek sıcaklık - 42°C', time: '5 dk önce', type: 'critical', read: false, resolved: false },
    { id: 2, hive: 'Kovan-004', title: 'Bağlantı Sorunu', message: 'Kovan çevrimdışı', time: '15 dk önce', type: 'warning', read: false, resolved: false },
    { id: 3, hive: 'Kovan-007', title: 'Düşük Batarya', message: 'Batarya seviyesi %15', time: '1 saat önce', type: 'warning', read: true, resolved: false },
    { id: 4, hive: 'Kovan-001', title: 'Sistem Güncellemesi', message: 'Başarıyla güncellendi', time: '2 saat önce', type: 'info', read: true, resolved: true },
    { id: 5, hive: 'Kovan-003', title: 'Nem Uyarısı', message: 'Düşük nem seviyesi %35', time: '3 saat önce', type: 'warning', read: false, resolved: false },
    { id: 6, hive: 'Kovan-005', title: 'Aktivite Anomalisi', message: 'Anormal arı aktivitesi tespit edildi', time: '4 saat önce', type: 'critical', read: true, resolved: false },
    { id: 7, hive: 'Kovan-006', title: 'Bakım Hatırlatması', message: 'Rutin bakım zamanı geldi', time: '1 gün önce', type: 'info', read: true, resolved: true },
    { id: 8, hive: 'Kovan-008', title: 'Sensör Arızası', message: 'Sıcaklık sensörü yanıt vermiyor', time: '2 gün önce', type: 'critical', read: false, resolved: false }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  const resolveAlert = (id: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, resolved: true, read: true } : alert
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'critical': return 'Kritik';
      case 'warning': return 'Uyarı';
      default: return 'Bilgi';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unread') return !alert.read;
    if (filter === 'critical') return alert.type === 'critical';
    return true;
  });

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center">
              🚨 Tüm Uyarılar ({filteredAlerts.length})
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} okunmamış
                </Badge>
              )}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            Tümü ({alerts.length})
          </Button>
          <Button 
            variant={filter === 'unread' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('unread')}
          >
            <Filter className="mr-1 h-3 w-3" />
            Okunmamış ({unreadCount})
          </Button>
          <Button 
            variant={filter === 'critical' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('critical')}
          >
            Kritik ({alerts.filter(a => a.type === 'critical').length})
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            className="ml-auto"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Tümünü Okundu İşaretle
          </Button>
        </div>
        
        <ScrollArea className="h-[50vh]">
          <div className="space-y-3 p-2">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-all ${
                  alert.resolved 
                    ? 'bg-green-50 border-green-200' 
                    : alert.read 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-blue-50 border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className={`text-sm font-medium ${alert.read ? 'text-gray-600' : 'text-gray-900'}`}>
                          {alert.hive} - {alert.title}
                        </p>
                        <Badge 
                          variant={alert.type === 'critical' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {getTypeText(alert.type)}
                        </Badge>
                        {alert.resolved && (
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                            Çözümlendi
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm ${alert.read ? 'text-gray-500' : 'text-gray-700'}`}>
                        {alert.message}
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-400">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!alert.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    {!alert.resolved && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => resolveAlert(alert.id)}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Çözümle
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
