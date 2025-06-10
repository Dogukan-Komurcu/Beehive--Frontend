import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

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
  estimatedBeeCount?: number;
  estimated_bee_count?: number;
}

interface SensorData {
  id: number;
  hiveId: number;
  temperature: number;
  humidity: number;
  battery: number;
  timestamp: string;
}

interface HiveDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  hive: Hive | null;
  sensorData?: SensorData | null;
}

export const HiveDetailModal = ({ isOpen, onClose, hive, sensorData }: HiveDetailModalProps) => {
  if (!hive) return null;

  // Arı sayısı gösterimi için güvenli kontrol
  const beeCountDisplay =
    hive.estimated_bee_count ??
    hive.estimatedBeeCount ??
    hive.beeCount ??
    '-';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Kovan Bilgisi</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            <span className="font-semibold text-lg">{hive.name}</span>
            <Badge variant={hive.status === 'active' ? 'default' : 'destructive'} className="text-xs">
              {hive.status === 'active' ? 'Aktif' : hive.status === 'warning' ? 'Uyarı' : 'Çevrimdışı'}
            </Badge>
          </div>
          <div>
            <span className="font-medium">Konum:</span> {hive.location}
          </div>
          <div>
            <span className="font-medium">Sıcaklık:</span> {sensorData ? sensorData.temperature : '-'}°C
          </div>
          <div>
            <span className="font-medium">Nem:</span> {sensorData ? sensorData.humidity : '-'}%
          </div>
          <div>
            <span className="font-medium">Batarya:</span> {sensorData ? sensorData.battery : '-'}%
          </div>
          <div>
            <span className="font-medium">Arı Sayısı:</span> <b>{beeCountDisplay}</b>
          </div>
          <div>
            <span className="font-medium">Son Güncelleme:</span> {sensorData ? new Date(sensorData.timestamp).toLocaleString('tr-TR') : '-'}
          </div>
          <div>
            <span className="font-medium">Oluşturulma Tarihi:</span> {hive.installDate ? new Date(hive.installDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
