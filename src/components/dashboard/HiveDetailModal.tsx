
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  X, 
  Thermometer, 
  Droplets, 
  Battery, 
  MapPin, 
  Calendar,
  TrendingUp,
  Activity,
  AlertTriangle,
  Wifi,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Hive {
  id: number;
  name: string;
  location: string;
  coordinates: string;
  status: 'active' | 'warning' | 'offline';
  temperature: number;
  humidity: number;
  battery: number;
  lastUpdate: string;
  installDate: string;
  beeCount: number;
}

interface HiveDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  hive: Hive | null;
}

export const HiveDetailModal = ({ isOpen, onClose, hive }: HiveDetailModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!hive) return null;

  // Mock historical data
  const temperatureData = [
    { time: '00:00', value: 32 },
    { time: '04:00', value: 31 },
    { time: '08:00', value: 33 },
    { time: '12:00', value: 35 },
    { time: '16:00', value: 34 },
    { time: '20:00', value: 33 },
  ];

  const humidityData = [
    { time: '00:00', value: 70 },
    { time: '04:00', value: 72 },
    { time: '08:00', value: 68 },
    { time: '12:00', value: 65 },
    { time: '16:00', value: 66 },
    { time: '20:00', value: 68 },
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center">
              🐝 {hive.name} - Detaylı Görünüm
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="sensors">Sensör Verileri</TabsTrigger>
            <TabsTrigger value="history">Geçmiş</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Durum Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kovan Durumu:</span>
                    <Badge className={getStatusColor(hive.status)}>
                      {getStatusText(hive.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Arı Sayısı:</span>
                    <span className="font-medium">{hive.beeCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Son Güncelleme:</span>
                    <span className="font-medium">{hive.lastUpdate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kurulum Tarihi:</span>
                    <span className="font-medium">{new Date(hive.installDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Konum Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Adres:</span>
                    <p className="font-medium">{hive.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Koordinatlar:</span>
                    <p className="font-medium">{hive.coordinates}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Haritada Göster
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Thermometer className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{hive.temperature}°C</p>
                      <p className="text-sm text-gray-600">Sıcaklık</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Droplets className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{hive.humidity}%</p>
                      <p className="text-sm text-gray-600">Nem</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Battery className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{hive.battery}%</p>
                      <p className="text-sm text-gray-600">Batarya</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sıcaklık Trendi (24 saat)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nem Trendi (24 saat)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={humidityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sensör Durumları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sıcaklık Sensörü</span>
                    <Badge className="bg-green-100 text-green-800">Çalışıyor</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Nem Sensörü</span>
                    <Badge className="bg-green-100 text-green-800">Çalışıyor</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ağırlık Sensörü</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Uyarı</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ses Sensörü</span>
                    <Badge className="bg-green-100 text-green-800">Çalışıyor</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bağlantı Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sinyal Gücü</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={75} className="w-16 h-2" />
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bağlantı Türü</span>
                    <Badge variant="outline">4G LTE</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">IP Adresi</span>
                    <span className="text-sm font-mono">192.168.1.45</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Son Aktiviteler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: '2 saat önce', event: 'Sıcaklık uyarısı alındı', type: 'warning' },
                    { time: '6 saat önce', event: 'Sistem güncellemesi tamamlandı', type: 'info' },
                    { time: '1 gün önce', event: 'Batarya seviyesi düştü', type: 'warning' },
                    { time: '2 gün önce', event: 'Rutin veri yedeklemesi yapıldı', type: 'info' },
                    { time: '3 gün önce', event: 'Sensör kalibrasyonu tamamlandı', type: 'success' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'warning' ? 'bg-yellow-500' :
                        activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.event}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kovan Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Sıcaklık Uyarı Limiti</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input type="number" defaultValue="40" className="flex-1 px-3 py-2 border rounded-lg" />
                      <span className="text-sm text-gray-500">°C</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Nem Uyarı Limiti</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input type="number" defaultValue="40" className="flex-1 px-3 py-2 border rounded-lg" />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1 gradient-honey text-white">
                    Ayarları Kaydet
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Varsayılana Dön
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
