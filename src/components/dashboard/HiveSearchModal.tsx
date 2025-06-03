
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Thermometer, Droplets, Battery } from 'lucide-react';

interface Hive {
  id: number;
  name: string;
  location: string;
  status: 'active' | 'warning' | 'offline';
  temperature: number;
  humidity: number;
  battery: number;
  lastUpdate: string;
}

interface HiveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HiveSearchModal = ({ isOpen, onClose }: HiveSearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const hives: Hive[] = [
    {
      id: 1,
      name: 'Kovan-001',
      location: 'Ankara Bahçe',
      status: 'active',
      temperature: 34,
      humidity: 65,
      battery: 85,
      lastUpdate: '2 dk önce'
    },
    {
      id: 2,
      name: 'Kovan-002',
      location: 'İzmir Çiftlik',
      status: 'warning',
      temperature: 38,
      humidity: 45,
      battery: 45,
      lastUpdate: '5 dk önce'
    },
    {
      id: 3,
      name: 'Kovan-003',
      location: 'Bursa Tarla',
      status: 'active',
      temperature: 32,
      humidity: 70,
      battery: 92,
      lastUpdate: '1 dk önce'
    },
    {
      id: 4,
      name: 'Kovan-004',
      location: 'Antalya Sera',
      status: 'offline',
      temperature: 0,
      humidity: 0,
      battery: 0,
      lastUpdate: '2 saat önce'
    }
  ];

  const filteredHives = hives.filter(hive => 
    hive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hive.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <DialogContent className="max-w-2xl max-h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Kovan Ara
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Kovan adı veya konum ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredHives.map((hive) => (
              <div key={hive.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{hive.name}</h4>
                  <Badge className={getStatusColor(hive.status)}>
                    {getStatusText(hive.status)}
                  </Badge>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="mr-1 h-4 w-4" />
                  {hive.location}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    <span>{hive.temperature}°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>{hive.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Battery className="h-4 w-4 text-green-500" />
                    <span>{hive.battery}%</span>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Son güncelleme: {hive.lastUpdate}
                  </span>
                  <Button size="sm" variant="outline">
                    Detay Görüntüle
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredHives.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aradığınız kovan bulunamadı</p>
                <p className="text-sm text-gray-500">Farklı arama terimleri deneyin</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
