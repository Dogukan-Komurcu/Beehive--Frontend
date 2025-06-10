import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { Hive } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Layers, Filter, Search, Maximize2, Eye, AlertTriangle } from 'lucide-react';

const MapView = () => {
  const [viewMode, setViewMode] = useState('satellite');
  const [selectedHive, setSelectedHive] = useState<Hive | null>(null);
  const [hiveLocations, setHiveLocations] = useState<Hive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHives = async () => {
      setLoading(true);
      try {
        const data = await apiService.getHives();
        setHiveLocations(data);
      } catch (error) {
        // Hata yönetimi eklenebilir
      } finally {
        setLoading(false);
      }
    };
    fetchHives();
  }, []);

  const statusColors = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-honey p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">🗺️ Harita Görünümü</h1>
            <p className="text-lg opacity-90">Kovanlarınızın gerçek zamanlı konumları ve durumları</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={() => setViewMode(viewMode === 'satellite' ? 'map' : 'satellite')}
            >
              <Layers className="w-4 h-4 mr-2" />
              {viewMode === 'satellite' ? 'Harita' : 'Uydu'}
            </Button>
            <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Filter className="w-4 h-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 text-6xl opacity-20">🐝</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Toplam Kovan', value: hiveLocations.length, icon: MapPin, color: 'gradient-honey' },
          { label: 'Aktif', value: hiveLocations.filter(h => h.status === 'active').length, icon: Eye, color: 'bg-green-500' },
          { label: 'Uyarı', value: hiveLocations.filter(h => h.status === 'warning').length, icon: AlertTriangle, color: 'bg-yellow-500' },
          { label: 'Çevrimdışı', value: hiveLocations.filter(h => h.status === 'offline').length, icon: AlertTriangle, color: 'bg-red-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-premium card-hover animate-fade-in-delay group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <Card className="card-premium card-hover">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="mr-3 h-6 w-6 text-amber-600" />
                  Kovan Konumları
                </CardTitle>
                <Button size="sm" variant="outline" className="hover:bg-amber-50">
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Tam Ekran
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden shadow-inner">
                {/* Map Placeholder with Interactive Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center animate-zoom-in">
                    <Navigation className="h-16 w-16 text-blue-400 mx-auto mb-4 bee-float" />
                    <p className="text-gray-600 font-medium mb-2">Harita entegrasyonu yakında eklenecek</p>
                    <p className="text-sm text-gray-500">İnteraktif harita özelliği geliştirilmekte</p>
                  </div>
                </div>
                
                {/* Mock Hive Markers */}
                {hiveLocations.map((hive, index) => (
                  <div
                    key={hive.id}
                    className={`absolute w-4 h-4 ${statusColors[hive.status]} rounded-full cursor-pointer shadow-lg 
                               hover:scale-150 transition-all duration-300 animate-pulse`}
                    style={{
                      top: `${20 + index * 15}%`,
                      left: `${25 + index * 20}%`
                    }}
                    onClick={() => setSelectedHive(hive)}
                  >
                    <div className="absolute -inset-2 bg-white rounded-full opacity-50"></div>
                  </div>
                ))}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button size="sm" variant="outline" className="bg-white/90 shadow-lg">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/90 shadow-lg">
                    <Layers className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hive Details Sidebar */}
        <div className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="text-lg">Kovan Listesi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {hiveLocations.map((hive, index) => (
                <div
                  key={hive.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer animate-slide-in-right hover-scale
                    ${selectedHive?.id === hive.id 
                      ? 'border-amber-300 bg-amber-50 shadow-lg' 
                      : 'border-gray-200 bg-white hover:border-amber-200 hover:shadow-md'
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedHive(hive)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{hive.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={`${statusColors[hive.status]} text-white border-0`}
                    >
                      {hive.status === 'active' ? 'Aktif' : 
                       hive.status === 'warning' ? 'Uyarı' : 'Çevrimdışı'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-600">Sıcaklık</span>
                    </div>
                    <span className="font-medium text-gray-900">{hive.temperature}°C</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-600">Arı Sayısı</span>
                    </div>
                    <span className="font-medium text-gray-900">{hive.beeCount}</span>
                  </div>
                  <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-honey transition-all duration-1000"
                      style={{ width: `${Math.min(hive.beeCount / 1000, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {selectedHive && (
            <Card className="card-premium animate-zoom-in">
              <CardHeader>
                <CardTitle className="text-lg text-gradient">Seçili Kovan Detayları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedHive.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`${statusColors[selectedHive.status]} text-white border-0 text-sm px-3 py-1`}
                    >
                      {selectedHive.status === 'active' ? 'Aktif' : 
                       selectedHive.status === 'warning' ? 'Uyarı' : 'Çevrimdışı'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{selectedHive.temperature}°C</p>
                      <p className="text-sm text-gray-600">Sıcaklık</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{selectedHive.beeCount}</p>
                      <p className="text-sm text-gray-600">Arı Sayısı</p>
                    </div>
                  </div>
                  <Button className="w-full gradient-honey text-white hover:shadow-lg">
                    Detaylı Görünüm
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
