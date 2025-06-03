
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Battery,
  Eye,
  Edit,
  X
} from 'lucide-react';

interface Hive {
  id: number;
  name: string;
  location: string;
  status: 'active' | 'warning' | 'offline';
  temperature: number;
  humidity: number;
  battery: number;
  lastUpdate: string;
  beeCount: number;
}

interface AllHivesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AllHivesModal = ({ isOpen, onClose }: AllHivesModalProps) => {
  const allHives: Hive[] = [
    { id: 1, name: 'Kovan-001', location: 'Ankara Bahçe', status: 'active', temperature: 34, humidity: 65, battery: 85, lastUpdate: '2 dk önce', beeCount: 45000 },
    { id: 2, name: 'Kovan-002', location: 'İzmir Çiftlik', status: 'warning', temperature: 38, humidity: 45, battery: 45, lastUpdate: '5 dk önce', beeCount: 52000 },
    { id: 3, name: 'Kovan-003', location: 'Bursa Tarla', status: 'active', temperature: 32, humidity: 70, battery: 92, lastUpdate: '1 dk önce', beeCount: 48000 },
    { id: 4, name: 'Kovan-004', location: 'Antalya Sera', status: 'offline', temperature: 0, humidity: 0, battery: 0, lastUpdate: '2 saat önce', beeCount: 0 },
    { id: 5, name: 'Kovan-005', location: 'Konya Çayır', status: 'active', temperature: 33, humidity: 68, battery: 78, lastUpdate: '3 dk önce', beeCount: 41000 },
    { id: 6, name: 'Kovan-006', location: 'Trabzon Yayla', status: 'active', temperature: 31, humidity: 72, battery: 88, lastUpdate: '4 dk önce', beeCount: 43000 },
    { id: 7, name: 'Kovan-007', location: 'Muğla Orman', status: 'warning', temperature: 39, humidity: 42, battery: 25, lastUpdate: '8 dk önce', beeCount: 38000 },
    { id: 8, name: 'Kovan-008', location: 'Samsun Kıyı', status: 'active', temperature: 29, humidity: 75, battery: 91, lastUpdate: '1 dk önce', beeCount: 46000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'warning': return 'Uyarı';
      case 'offline': return 'Çevrimdışı';
      default: return 'Bilinmiyor';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center">
              🐝 Tüm Kovanlar ({allHives.length})
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {allHives.map((hive) => (
              <Card key={hive.id} className="card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{hive.name}</h3>
                    <Badge className={getStatusColor(hive.status)}>
                      {getStatusText(hive.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="mr-1 h-4 w-4" />
                    {hive.location}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                      </div>
                      <div className="text-sm font-medium">{hive.temperature}°C</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Droplets className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-sm font-medium">{hive.humidity}%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Battery className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-sm font-medium">{hive.battery}%</div>
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Arı Sayısı:</span>
                      <span className="font-medium">{hive.beeCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Son Güncelleme:</span>
                      <span className="font-medium">{hive.lastUpdate}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      Detay
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-1 h-3 w-3" />
                      Düzenle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
