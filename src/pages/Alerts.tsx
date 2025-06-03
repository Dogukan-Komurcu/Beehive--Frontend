
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      hive: 'Kovan-002',
      type: 'critical',
      message: 'Yüksek sıcaklık uyarısı - 42°C',
      time: '5 dakika önce',
      status: 'active'
    },
    {
      id: 2,
      hive: 'Kovan-004',
      type: 'error',
      message: 'Bağlantı kesildi',
      time: '15 dakika önce',
      status: 'active'
    },
    {
      id: 3,
      hive: 'Kovan-007',
      type: 'warning',
      message: 'Düşük batarya seviyesi - %15',
      time: '1 saat önce',
      status: 'active'
    },
    {
      id: 4,
      hive: 'Kovan-003',
      type: 'info',
      message: 'Rutin bakım zamanı geldi',
      time: '2 saat önce',
      status: 'resolved'
    },
    {
      id: 5,
      hive: 'Kovan-001',
      type: 'success',
      message: 'Sistem güncellendi',
      time: '3 saat önce',
      status: 'resolved'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
      case 'error':
        return <AlertTriangle className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Uyarılar</h1>
          <p className="text-gray-600">Sistem uyarıları ve bildirimler</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Tümünü Okundu İşaretle</Button>
          <Button className="gradient-honey text-white">Uyarı Ayarları</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Kritik Uyarılar</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uyarılar</p>
                <p className="text-2xl font-bold text-amber-600">1</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bilgiler</p>
                <p className="text-2xl font-bold text-blue-600">1</p>
              </div>
              <Info className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Çözümlendi</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Son Uyarılar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertColor(alert.type)} ${
                  alert.status === 'resolved' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{alert.hive}</h4>
                        <Badge
                          variant={alert.status === 'active' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {alert.status === 'active' ? 'Aktif' : 'Çözümlendi'}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{alert.message}</p>
                      <p className="text-xs opacity-75">{alert.time}</p>
                    </div>
                  </div>
                  {alert.status === 'active' && (
                    <Button size="sm" variant="outline">
                      Çözümlendi
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
