
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Hive } from '@/types/api';

interface EditSensorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingHive: Hive | null;
  editSensorValues: {
    temperature: string;
    humidity: string;
    battery: string;
  };
  onValueChange: (key: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  onClose: () => void;
}

export const EditSensorModal: React.FC<EditSensorModalProps> = ({
  open,
  onOpenChange,
  editingHive,
  editSensorValues,
  onValueChange,
  onSubmit,
  loading,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg z-[100] !overflow-visible">
        <DialogHeader>
          <DialogTitle>Sensör Verisini Düzenle</DialogTitle>
        </DialogHeader>
        <TooltipProvider>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Sıcaklık (°C)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={editSensorValues.temperature}
                  onChange={e => onValueChange('temperature', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Nem (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={editSensorValues.humidity}
                  onChange={e => onValueChange('humidity', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Batarya (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={editSensorValues.battery}
                  onChange={e => onValueChange('battery', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                İptal
              </Button>
              <Button type="submit" className="gradient-honey text-white" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </div>
          </form>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
};
