import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { X, MapPin, Navigation } from 'lucide-react';

interface AddHiveWithMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (hiveData: any) => void;
}

export const AddHiveWithMapModal = ({ isOpen, onClose, onAdd }: AddHiveWithMapModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    coordinates: '',
    beeCount: 0,
  });
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  // İstanbul koordinatları
  const istanbulCoords = { lat: 41.0082, lng: 28.9784 };
  
  // Mock harita noktaları (gerçek harita entegrasyonu için placeholder)
  const mockLocations = [
    { id: 1, name: 'İstanbul', lat: 41.0082, lng: 28.9784 },
    { id: 2, name: 'Ankara', lat: 39.9334, lng: 32.8597 },
    { id: 3, name: 'İzmir', lat: 38.4237, lng: 27.1428 },
    { id: 4, name: 'Bursa', lat: 40.1826, lng: 29.0669 },
    { id: 5, name: 'Antalya', lat: 36.8969, lng: 30.7133 },
  ];

  const handleLocationSelect = (location: { id: number; name: string; lat: number; lng: number }) => {
    setSelectedLocation({ lat: location.lat, lng: location.lng });
    
    if (location.name === 'İstanbul') {
      setFormData(prev => ({
        ...prev,
        location: 'İstanbul',
        coordinates: `${location.lat}, ${location.lng}`,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        location: location.name,
        coordinates: `${location.lat}, ${location.lng}`,
      }));
    }

    toast({
      title: "Konum seçildi",
      description: `${location.name} konumu seçildi`,
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.location || !formData.coordinates) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun",
        variant: "destructive",
      });
      return;
    }

    const newHive = {
      // id backend tarafından atanmalı
      name: formData.name,
      location: formData.location,
      coordinates: formData.coordinates,
      estimatedBeeCount: formData.beeCount, // backend camelCase bekliyor
      installDate: new Date().toISOString(),
      // Diğer alanlar backend default veya opsiyonel ise eklenmez
    };

    onAdd(newHive);
    setFormData({ name: '', location: '', coordinates: '', beeCount: 0 });
    setSelectedLocation(null);
    onClose();
  };

  const resetForm = () => {
    setFormData({ name: '', location: '', coordinates: '', beeCount: 0 });
    setSelectedLocation(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">🐝 Yeni Kovan Ekle - Harita ile Konum Seç</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Harita Bölümü */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-semibold">Haritadan Konum Seç</h3>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium mb-2">Konum seçmek için aşağıdaki şehirlere tıklayın</p>
                    </div>
                  </div>
                  
                  {/* Mock harita noktaları */}
                  {mockLocations.map((location, index) => (
                    <div
                      key={location.id}
                      className={`absolute w-6 h-6 rounded-full cursor-pointer shadow-lg transition-all duration-300 hover:scale-125 ${
                        selectedLocation?.lat === location.lat && selectedLocation?.lng === location.lng
                          ? 'bg-amber-500 ring-4 ring-amber-200'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                      style={{
                        top: `${20 + index * 15}%`,
                        left: `${15 + index * 18}%`
                      }}
                      onClick={() => handleLocationSelect(location)}
                      title={location.name}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                        {location.name}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seçili konum bilgisi */}
            {selectedLocation && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-amber-600" />
                    <span className="font-medium text-amber-800">Seçili Konum:</span>
                    <span className="text-amber-700">{formData.location}</span>
                  </div>
                  <p className="text-sm text-amber-600 mt-1">
                    Koordinatlar: {formData.coordinates}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Form Bölümü */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📝</span>
              <h3 className="text-lg font-semibold">Kovan Bilgileri</h3>
            </div>

            <div>
              <Label htmlFor="name">Kovan Adı *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Örn: Kovan-009"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Konum *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Haritadan seçin veya manuel girin"
              />
            </div>
            
            <div>
              <Label htmlFor="coordinates">Koordinatlar *</Label>
              <Input
                id="coordinates"
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                placeholder="Haritadan otomatik doldurulur"
              />
            </div>
            
            <div>
              <Label htmlFor="beeCount">Tahmini Arı Sayısı</Label>
              <Input
                id="beeCount"
                type="number"
                value={formData.beeCount}
                onChange={(e) => setFormData({ ...formData, beeCount: parseInt(e.target.value) || 0 })}
                placeholder="Örn: 45000"
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button onClick={handleSave} className="w-full gradient-honey text-white">
                <MapPin className="mr-2 h-4 w-4" />
                Kovanı Ekle
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  Formu Temizle
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
