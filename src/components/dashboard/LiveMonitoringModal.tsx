
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, MapPin, Thermometer, Droplets, Battery, Wifi, Eye } from 'lucide-react';

interface LiveMonitoringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveMonitoringModal = ({ isOpen, onClose }: LiveMonitoringModalProps) => {
  const [selectedHive, setSelectedHive] = useState<number | null>(null);

  const hives = [
    {
      id: 1,
      name: 'Kovan-001',
      location: 'Ankara Bahçe',
      coordinates: '39.9334, 32.8597',
      status: 'active',
      temperature: 34.2,
      humidity: 65,
      battery: 85,
      signalStrength: 92,
      activity: 87,
      lastUpdate: '2 dk önce',
      beeCount: 45000
    },
    {
      id: 2,
      name: 'Kovan-002',
      location: 'İzmir Çiftlik',
      coordinates: '38.4237, 27.1428',
      status: 'warning',
      temperature: 38.1,
      humidity: 45,
      battery: 45,
      signalStrength: 78,
      activity: 65,
      lastUpdate: '5 dk önce',
      beeCount: 52000
    },
    {
      id: 3,
      name: 'Kovan-003',
      location: 'Bursa Tarla',
      coordinates: '40.1826, 29.0669',
      status: 'active',
      temperature: 32.8,
      humidity: 70,
      battery: 92,
      signalStrength: 88,
      activity: 91,
      lastUpdate: '1 dk önce',
      beeCount: 48000
    }
  ];

  const selectedHiveData = hives.find(h => h.id === selectedHive);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Activity className="mr-2 h-6 w-6 text-green-600" />
            Canlı İzleme
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Hive List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Kovan Listesi</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {hives.map((hive) => (
                <Card 
                  key={hive.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedHive === hive.id ? 'ring-2 ring-amber-400 bg-amber-50' : ''
                  }`}
                  onClick={() => setSelectedHive(hive.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{hive.name}</h4>
                      <Badge className={getStatusColor(hive.status)}>
                        {hive.status === 'active' ? 'Aktif' : 'Uyarı'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {hive.location}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Sıcaklık: {hive.temperature}°C</div>
                      <div>Batarya: {hive.battery}%</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Selected Hive Details */}
          <div className="lg:col-span-2">
            {selectedHiveData ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedHiveData.name}</h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedHiveData.location}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(selectedHiveData.status)} text-base px-3 py-1`}>
                    {selectedHiveData.status === 'active' ? 'Aktif' : 'Uyarı'}
                  </Badge>
                </div>

                {/* Real-time Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-600">{selectedHiveData.temperature}°C</p>
                      <p className="text-sm text-gray-600">Sıcaklık</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">{selectedHiveData.humidity}%</p>
                      <p className="text-sm text-gray-600">Nem</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Battery className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">{selectedHiveData.battery}%</p>
                      <p className="text-sm text-gray-600">Batarya</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Wifi className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">{selectedHiveData.signalStrength}%</p>
                      <p className="text-sm text-gray-600">Sinyal</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Detaylı Bilgiler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Aktivite Seviyesi</span>
                        <span>{selectedHiveData.activity}%</span>
                      </div>
                      <Progress value={selectedHiveData.activity} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Koordinatlar:</span>
                        <p className="font-medium">{selectedHiveData.coordinates}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Arı Sayısı:</span>
                        <p className="font-medium">{selectedHiveData.beeCount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Son Güncelleme:</span>
                        <p className="font-medium">{selectedHiveData.lastUpdate}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Sinyal Gücü:</span>
                        <p className="font-medium">{selectedHiveData.signalStrength}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location Map Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Konum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Harita yakında eklenecek</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <Eye className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Kovan Seçin</h3>
                  <p className="text-gray-500">Canlı verilerini görüntülemek için sol taraftan bir kovan seçin</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Kapat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
