
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

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

interface EditHiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  hive: Hive | null;
  onSave: (updatedHive: Hive) => void;
}

export const EditHiveModal = ({ isOpen, onClose, hive, onSave }: EditHiveModalProps) => {
  const [formData, setFormData] = useState({
    name: hive?.name || '',
    location: hive?.location || '',
    coordinates: hive?.coordinates || '',
    beeCount: hive?.beeCount || 0,
  });
  const { toast } = useToast();

  React.useEffect(() => {
    if (hive) {
      setFormData({
        name: hive.name,
        location: hive.location,
        coordinates: hive.coordinates,
        beeCount: hive.beeCount,
      });
    }
  }, [hive]);

  const handleSave = () => {
    if (!hive) return;

    const updatedHive: Hive = {
      ...hive,
      ...formData,
    };

    onSave(updatedHive);
    toast({
      title: "Başarılı!",
      description: "Kovan bilgileri güncellendi.",
    });
    onClose();
  };

  if (!hive) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Kovan Düzenle</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Kovan Adı</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Kovan-001"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Konum</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ankara Bahçe"
            />
          </div>
          
          <div>
            <Label htmlFor="coordinates">Koordinatlar</Label>
            <Input
              id="coordinates"
              value={formData.coordinates}
              onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
              placeholder="39.9334, 32.8597"
            />
          </div>
          
          <div>
            <Label htmlFor="beeCount">Tahmini Arı Sayısı</Label>
            <Input
              id="beeCount"
              type="number"
              value={formData.beeCount}
              onChange={(e) => setFormData({ ...formData, beeCount: parseInt(e.target.value) || 0 })}
              placeholder="45000"
            />
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSave} className="flex-1 gradient-honey text-white">
              Kaydet
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              İptal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
