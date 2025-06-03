
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

const MapView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Harita Görünümü</h1>
          <p className="text-gray-600">Kovanlarınızın konumları ve durumları</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-amber-600" />
            Kovan Konumları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Harita entegrasyonu yakında eklenecek</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
