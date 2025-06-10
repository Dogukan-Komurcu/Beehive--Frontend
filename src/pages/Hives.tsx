import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
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
import { AddHiveWithMapModal } from '@/components/dashboard/AddHiveWithMapModal';
import { Hive, SensorData } from '@/types/api';

const Hives = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHive, setSelectedHive] = useState<any>(null);
  const [hives, setHives] = useState<Hive[]>([]);
  const [sensorDataMap, setSensorDataMap] = useState<Record<number, SensorData | null>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHives = async () => {
      setLoading(true);
      try {
        const data = await apiService.getHives();
        console.log('API hives:', data); // estimated_bee_count kontrolü
        setHives(data);
        // Her kovan için en güncel sensör verisini çek
        const sensorMap: Record<number, SensorData | null> = {};
        for (const hive of data) {
          try {
            const sensorList = await apiService.getSensorData(hive.id);
            sensorMap[hive.id] = Array.isArray(sensorList) && sensorList.length > 0 ? sensorList[sensorList.length - 1] : null;
          } catch {
            sensorMap[hive.id] = null;
          }
        }
        setSensorDataMap(sensorMap);
      } catch (error: any) {
        toast({
          title: 'Kovanlar yüklenemedi',
          description: error.message || 'Bir hata oluştu.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHives();
  }, [toast]);

  // Mock veriler kaldırıldı, filtreleme ve sıralama backend'den gelen hives ile yapılacak
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

  const handleAddHive = async (newHive: Omit<Hive, 'id'>) => {
    try {
      const created = await apiService.createHive(newHive);
      setHives(prev => [...prev, created]);
      toast({
        title: 'Başarılı!',
        description: 'Yeni kovan eklendi.',
      });
    } catch (error: any) {
      toast({
        title: 'Kovan eklenemedi',
        description: error.message || 'Bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleEditHive = async (updatedHive: Hive) => {
    try {
      const updated = await apiService.updateHive(updatedHive.id, updatedHive);
      setHives(prev => prev.map(h => h.id === updated.id ? updated : h));
      toast({
        title: 'Kovan güncellendi',
        description: 'Kovan bilgileri başarıyla güncellendi.',
      });
    } catch (error: any) {
      toast({
        title: 'Kovan güncellenemedi',
        description: error.message || 'Bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteHive = async (id: number) => {
    try {
      await apiService.deleteHive(id);
      setHives(hives.filter(hive => hive.id !== id));
      toast({
        title: 'Kovan silindi',
        description: 'Kovan başarıyla sistemden kaldırıldı.',
      });
    } catch (error: any) {
      toast({
        title: 'Kovan silinemedi',
        description: error.message || 'Bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleViewDetails = (hive: Hive) => {
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
          <Button 
            className="gradient-honey text-white"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni Kovan Ekle
          </Button>
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
          <Card key={hive.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold text-lg">{hive.name}</div>
                <div className="text-gray-500 text-sm">{hive.location}</div>
              </div>
              <Badge variant="secondary" className="text-xs">{hive.status === 'active' ? 'Aktif' : hive.status === 'warning' ? 'Uyarı' : 'Bilinmiyor'}</Badge>
            </div>
            <div className="flex gap-6 mb-2">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span>Sıcaklık: <b>{sensorDataMap[hive.id]?.temperature ?? '-'}</b>°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span>Nem: <b>{sensorDataMap[hive.id]?.humidity ?? '-'}</b>%</span>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-green-500" />
                <span>Batarya: <b>{sensorDataMap[hive.id]?.battery ?? '-'}</b>%</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">🐝 Arı Sayısı:</span>
              <b>{hive.estimated_bee_count ?? hive.estimatedBeeCount ?? hive.beeCount ?? '-'}</b>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Kurulum Tarihi:</span>
              <span>{hive.installDate ? new Date(hive.installDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</span>
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
        sensorData={selectedHive ? sensorDataMap[selectedHive.id] : null}
      />

      <EditHiveModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        hive={selectedHive}
        onSave={handleEditHive}
      />

      <AddHiveWithMapModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddHive}
      />
    </div>
  );
};

export default Hives;
