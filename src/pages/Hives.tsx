
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Thermometer,
  Droplets,
  Battery,
  Calendar,
  Filter,
  SortAsc,
  SortDesc,
  Download,
  Upload
} from 'lucide-react';
import { HiveDetailModal } from '@/components/dashboard/HiveDetailModal';
import { EditHiveModal } from '@/components/dashboard/EditHiveModal';

const Hives = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHive, setSelectedHive] = useState<any>(null);
  const { toast } = useToast();

  // Mock veriler - expanded with more hives
  const [hives, setHives] = useState([
    {
      id: 1,
      name: 'Kovan-001',
      location: 'Ankara Bahçe',
      coordinates: '39.9334, 32.8597',
      status: 'active',
      temperature: 34,
      humidity: 65,
      battery: 85,
      lastUpdate: '2 dk önce',
      installDate: '2024-01-15',
      beeCount: 45000
    },
    {
      id: 2,
      name: 'Kovan-002',
      location: 'İzmir Çiftlik',
      coordinates: '38.4237, 27.1428',
      status: 'warning',
      temperature: 38,
      humidity: 45,
      battery: 45,
      lastUpdate: '5 dk önce',
      installDate: '2024-02-10',
      beeCount: 52000
    },
    {
      id: 3,
      name: 'Kovan-003',
      location: 'Bursa Tarla',
      coordinates: '40.1826, 29.0669',
      status: 'active',
      temperature: 32,
      humidity: 70,
      battery: 92,
      lastUpdate: '1 dk önce',
      installDate: '2024-01-20',
      beeCount: 48000
    },
    {
      id: 4,
      name: 'Kovan-004',
      location: 'Antalya Sera',
      coordinates: '36.8969, 30.7133',
      status: 'offline',
      temperature: 0,
      humidity: 0,
      battery: 0,
      lastUpdate: '2 saat önce',
      installDate: '2024-03-05',
      beeCount: 0
    },
    {
      id: 5,
      name: 'Kovan-005',
      location: 'Konya Çayır',
      coordinates: '37.8746, 32.4932',
      status: 'active',
      temperature: 33,
      humidity: 68,
      battery: 78,
      lastUpdate: '3 dk önce',
      installDate: '2024-02-25',
      beeCount: 41000
    },
    {
      id: 6,
      name: 'Kovan-006',
      location: 'Trabzon Yayla',
      coordinates: '41.0015, 39.7178',
      status: 'active',
      temperature: 31,
      humidity: 72,
      battery: 88,
      lastUpdate: '4 dk önce',
      installDate: '2024-03-10',
      beeCount: 43000
    },
    {
      id: 7,
      name: 'Kovan-007',
      location: 'Muğla Orman',
      coordinates: '37.2153, 28.3636',
      status: 'warning',
      temperature: 39,
      humidity: 42,
      battery: 25,
      lastUpdate: '8 dk önce',
      installDate: '2024-01-30',
      beeCount: 38000
    },
    {
      id: 8,
      name: 'Kovan-008',
      location: 'Samsun Kıyı',
      coordinates: '41.2928, 36.3313',
      status: 'active',
      temperature: 29,
      humidity: 75,
      battery: 91,
      lastUpdate: '1 dk önce',
      installDate: '2024-02-15',
      beeCount: 46000
    }
  ]);

  const filteredAndSortedHives = hives
    .filter(hive => {
      const matchesSearch = hive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hive.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || hive.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let compareValue = 0;
      switch (sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'location':
          compareValue = a.location.localeCompare(b.location);
          break;
        case 'temperature':
          compareValue = a.temperature - b.temperature;
          break;
        case 'battery':
          compareValue = a.battery - b.battery;
          break;
        case 'beeCount':
          compareValue = a.beeCount - b.beeCount;
          break;
        default:
          compareValue = 0;
      }
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

  const handleAddHive = () => {
    toast({
      title: "Başarılı!",
      description: "Yeni kovan eklendi.",
    });
    setShowAddModal(false);
  };

  const handleEditHive = (updatedHive: any) => {
    setHives(prev => prev.map(h => h.id === updatedHive.id ? updatedHive : h));
  };

  const handleDeleteHive = (id: number) => {
    setHives(hives.filter(hive => hive.id !== id));
    toast({
      title: "Kovan silindi",
      description: "Kovan başarıyla sistemden kaldırıldı.",
    });
  };

  const handleViewDetails = (hive: any) => {
    setSelectedHive(hive);
    setShowDetailModal(true);
  };

  const handleEditClick = (hive: any) => {
    setSelectedHive(hive);
    setShowEditModal(true);
  };

  const handleExportData = () => {
    toast({
      title: "Veriler dışa aktarılıyor",
      description: "Kovan verileri CSV formatında indiriliyor...",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Veri içe aktarma",
      description: "Dosya seçimi açılıyor...",
    });
  };

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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kovanlar</h1>
          <p className="text-gray-600">Tüm arı kovanlarınızı yönetin</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Dışa Aktar
          </Button>
          <Button variant="outline" onClick={handleImportData}>
            <Upload className="mr-2 h-4 w-4" />
            İçe Aktar
          </Button>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="gradient-honey text-white">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Kovan Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Yeni Kovan Ekle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Kovan Adı</Label>
                  <Input id="name" placeholder="Kovan-009" />
                </div>
                <div>
                  <Label htmlFor="location">Konum</Label>
                  <Input id="location" placeholder="İstanbul Çiftlik" />
                </div>
                <div>
                  <Label htmlFor="coordinates">Koordinatlar</Label>
                  <Input id="coordinates" placeholder="41.0082, 28.9784" />
                </div>
                <div>
                  <Label htmlFor="beeCount">Tahmini Arı Sayısı</Label>
                  <Input id="beeCount" type="number" placeholder="40000" />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddHive} className="flex-1 gradient-honey text-white">
                    Ekle
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                    İptal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Kovan adı veya konum ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="warning">Uyarı</SelectItem>
                  <SelectItem value="offline">Çevrimdışı</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Ada Göre</SelectItem>
                  <SelectItem value="location">Konuma Göre</SelectItem>
                  <SelectItem value="temperature">Sıcaklığa Göre</SelectItem>
                  <SelectItem value="battery">Bataryaya Göre</SelectItem>
                  <SelectItem value="beeCount">Arı Sayısına Göre</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{hives.length}</div>
            <div className="text-sm text-gray-600">Toplam Kovan</div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {hives.filter(h => h.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Aktif Kovan</div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {hives.filter(h => h.status === 'warning').length}
            </div>
            <div className="text-sm text-gray-600">Uyarı Var</div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {hives.filter(h => h.status === 'offline').length}
            </div>
            <div className="text-sm text-gray-600">Çevrimdışı</div>
          </CardContent>
        </Card>
      </div>

      {/* Hives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedHives.map((hive) => (
          <Card key={hive.id} className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{hive.name}</CardTitle>
                <Badge className={getStatusColor(hive.status)}>
                  {getStatusText(hive.status)}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-1 h-4 w-4" />
                {hive.location}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sensor Data */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="text-sm font-medium">{hive.temperature}°C</div>
                  <div className="text-xs text-gray-500">Sıcaklık</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="text-sm font-medium">{hive.humidity}%</div>
                  <div className="text-xs text-gray-500">Nem</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Battery className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-sm font-medium">{hive.battery}%</div>
                  <div className="text-xs text-gray-500">Batarya</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="pt-2 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Arı Sayısı:</span>
                  <span className="font-medium">{hive.beeCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Son Güncelleme:</span>
                  <span className="font-medium">{hive.lastUpdate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kurulum:</span>
                  <span className="font-medium">{new Date(hive.installDate).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetails(hive)}
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Detay
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditClick(hive)}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Düzenle
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteHive(hive.id)}
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedHives.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kovan bulunamadı</h3>
            <p className="text-gray-600 mb-4">
              Arama kriterlerinize uygun kovan bulunamadı. Farklı terimler deneyin.
            </p>
            <Button variant="outline" onClick={() => {setSearchTerm(''); setFilterStatus('all');}}>
              Filtreleri Temizle
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <HiveDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        hive={selectedHive}
      />

      <EditHiveModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        hive={selectedHive}
        onSave={handleEditHive}
      />
    </div>
  );
};

export default Hives;
