
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { Hive } from '@/types/api';

interface SensorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hives: Hive[];
  selectedHiveId: string;
  setSelectedHiveId: (id: string) => void;
  sensorValues: {
    temperature: string;
    humidity: string;
    battery: string;
  };
  onValueChange: (key: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  onClose: () => void;
}

export const SensorModal: React.FC<SensorModalProps> = ({
  open,
  onOpenChange,
  hives,
  selectedHiveId,
  setSelectedHiveId,
  sensorValues,
  onValueChange,
  onSubmit,
  loading,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg z-[100] !overflow-visible">
        <DialogHeader>
          <DialogTitle>Yeni Sensör Verisi Ekle</DialogTitle>
        </DialogHeader>
        <TooltipProvider>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label>Kovan Seç</Label>
              <Select
                value={selectedHiveId}
                onValueChange={setSelectedHiveId}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Kovan seçin" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  {hives.length === 0 ? (
                    <SelectItem value="" disabled>
                      Kovanınız yok
                    </SelectItem>
                  ) : (
                    hives.map((hive) => (
                      <SelectItem key={hive.id} value={String(hive.id)}>
                        {hive.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="flex items-center gap-1">
                  Sıcaklık (°C)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 cursor-pointer">
                        <Info className="h-4 w-4 text-blue-400" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-[9999]">
                      Kovan içindeki sıcaklık değerini girin. (Örn: 34.5°C)
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  value={sensorValues.temperature}
                  onChange={(e) => onValueChange('temperature', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  Nem (%)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 cursor-pointer">
                        <Info className="h-4 w-4 text-blue-400" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-[9999]">
                      Kovan içindeki nem oranını girin. (Örn: 60%)
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  value={sensorValues.humidity}
                  onChange={(e) => onValueChange('humidity', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  Batarya (%)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 cursor-pointer">
                        <Info className="h-4 w-4 text-blue-400" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-[9999]">
                      Sensör cihazının batarya seviyesini girin. (Örn: 85%)
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  value={sensorValues.battery}
                  onChange={(e) => onValueChange('battery', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                İptal
              </Button>
              <Button
                type="submit"
                className="gradient-honey text-white"
                disabled={loading}
              >
                {loading ? 'Ekleniyor...' : 'Ekle'}
              </Button>
            </div>
          </form>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
};
