
import React from 'react';
import { SensorData } from '@/types/api';

interface SensorDataTableProps {
  data: SensorData[];
  loading: boolean;
}

export const SensorDataTable: React.FC<SensorDataTableProps> = ({ data, loading }) => {
  if (loading) {
    return <div className="text-gray-500">Yükleniyor...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-gray-400">Kayıtlı veri yok.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm bg-white rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 border-b">Tarih</th>
            <th className="px-4 py-2 border-b">Sıcaklık (°C)</th>
            <th className="px-4 py-2 border-b">Nem (%)</th>
            <th className="px-4 py-2 border-b">Batarya (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">
                {new Date(row.timestamp).toLocaleString('tr-TR')}
              </td>
              <td className="px-4 py-2 border-b">{row.temperature}</td>
              <td className="px-4 py-2 border-b">{row.humidity}</td>
              <td className="px-4 py-2 border-b">{row.battery}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
