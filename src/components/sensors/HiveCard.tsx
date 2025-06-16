
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Thermometer, Droplets, Battery } from 'lucide-react';
import { Hive, SensorData } from '@/types/api';
import { SensorDataTable } from './SensorDataTable';

interface HiveCardProps {
  hive: Hive;
  sensorHistory: SensorData[];
  historyLoading: boolean;
  onEditClick: (hive: Hive) => void;
}

export const HiveCard: React.FC<HiveCardProps> = ({
  hive,
  sensorHistory,
  historyLoading,
  onEditClick,
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-10 h-10 bg-gradient-honey rounded-lg flex items-center justify-center text-white font-bold text-lg">
          {hive.name.split('-')[1] || hive.name}
        </div>
        <div>
          <div className="font-semibold text-lg">{hive.name}</div>
          <div className="text-gray-500 text-sm">{hive.location}</div>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="ml-auto" 
          onClick={() => onEditClick(hive)}
        >
          Sensör Verisini Düzenle
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-orange-500" />
          <span className="font-medium">{hive.temperature}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          <span className="font-medium">{hive.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-green-500" />
          <span className="font-medium">{hive.battery}%</span>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="text-base font-bold mb-1">Kayıtlı Sensör Verileri</h2>
        <SensorDataTable data={sensorHistory} loading={historyLoading} />
      </div>
    </Card>
  );
};
