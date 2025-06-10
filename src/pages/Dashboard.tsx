import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Layers, 
  MapPin, 
  Thermometer, 
  Droplets,
  Battery,
  TrendingUp,
  AlertTriangle,
  Activity,
  Eye
} from 'lucide-react';
import { ReportsModal } from '@/components/dashboard/ReportsModal';
import { LiveMonitoringModal } from '@/components/dashboard/LiveMonitoringModal';
import { AllHivesModal } from '@/components/dashboard/AllHivesModal';
import { AllAlertsModal } from '@/components/dashboard/AllAlertsModal';
import { DemoModeIndicator } from '@/components/dashboard/DemoModeIndicator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Hive, SensorData } from '@/types/api';

const Dashboard = () => {
  const [showReports, setShowReports] = useState(false);
  const [showLiveMonitoring, setShowLiveMonitoring] = useState(false);
  const [showAllHives, setShowAllHives] = useState(false);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const { isDemoMode } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({ totalHives: 0, activeHives: 0, alertCount: 0, offlineHives: 0 });
  const [recentHives, setRecentHives] = useState<Hive[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<any[]>([]);
  const [sensorDataMap, setSensorDataMap] = useState<Record<number, SensorData | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const dashboardData = await apiService.getDashboardData();
        setStats({
          totalHives: dashboardData.totalHives,
          activeHives: dashboardData.activeHives,
          alertCount: dashboardData.alertCount,
          offlineHives: dashboardData.offlineHives,
        });
        const hivesData = await apiService.getMyHives();
        setRecentHives(hivesData);
        // Her kovan için en güncel sensör verisini çek
        const sensorMap: Record<number, SensorData | null> = {};
        for (const hive of hivesData) {
          try {
            const data = await apiService.getSensorData(hive.id);
            sensorMap[hive.id] = Array.isArray(data) && data.length > 0 ? data[data.length - 1] : null;
          } catch {
            sensorMap[hive.id] = null;
          }
        }
        setSensorDataMap(sensorMap);
        // Alerts
        const data = await apiService.getMyAlerts();
        const mapped = Array.isArray(data)
          ? data.slice(0, 3).map((alert: any) => ({
              id: alert.id,
              hiveId: alert.hiveId ?? alert.hive_id ?? (alert.hive && alert.hive.id),
              hiveName: alert.hiveName ?? alert.hive_name ?? (alert.hive && alert.hive.name),
              message: alert.message,
              type: alert.type,
              timestamp: alert.timestamp ?? alert.createdAt ?? alert.created_at,
              isRead: alert.isRead ?? alert.read,
              userId: alert.userId ?? (alert.user && alert.user.id),
            }))
          : [];
        setRecentAlerts(mapped);
      } catch (error) {
        // Hata yönetimi eklenebilir
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleDemoRestriction = (action: string) => {
    if (isDemoMode) {
      toast({
        title: "Demo Modu Kısıtlaması",
        description: `${action} demo modunda devre dışıdır. Tam erişim için kayıt olun.`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Demo Mode Indicator */}
      <DemoModeIndicator />

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Arı kovanlarınızın genel durumu</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => {
              if (handleDemoRestriction("Rapor görüntüleme")) {
                setShowReports(true);
              }
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            Raporları Görüntüle
          </Button>
          <Button 
            className="gradient-honey text-white"
            onClick={() => setShowLiveMonitoring(true)}
          >
            <Activity className="mr-2 h-4 w-4" />
            Canlı İzle
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover border-amber-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Kovan</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalHives}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 bu ay
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-honey rounded-lg flex items-center justify-center">
                <Layers className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktif Kovan</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeHives}</p>
                <p className="text-sm text-gray-500 mt-1">
                  %{Math.round((stats.activeHives / stats.totalHives) * 100)} çevrimiçi
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover border-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uyarılar</p>
                <p className="text-3xl font-bold text-red-600">{stats.alertCount}</p>
                <p className="text-sm text-red-500 mt-1">Dikkat gerekiyor</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Çevrimdışı</p>
                <p className="text-3xl font-bold text-gray-600">{stats.offlineHives}</p>
                <p className="text-sm text-gray-500 mt-1">Bağlantı yok</p>
              </div>
              <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Hives */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Layers className="mr-2 h-5 w-5 text-amber-600" />
              Son Kovan Durumları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentHives.map((hive) => {
                const sensor = sensorDataMap[hive.id];
                return (
                  <div key={hive.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-honey rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {hive.name.split('-')[1] || hive.name}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{hive.name}</h4>
                        <p className="text-sm text-gray-500">{hive.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span>{sensor ? sensor.temperature : '-'}°C</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span>{sensor ? sensor.humidity : '-'}%</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Battery className="h-4 w-4 text-green-500" />
                        <span>{sensor ? sensor.battery : '-'}%</span>
                      </div>
                      <Badge 
                        variant={hive.status === 'active' ? 'default' : hive.status === 'warning' ? 'destructive' : 'secondary'}
                        className={hive.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {hive.status === 'active' ? 'Aktif' : hive.status === 'warning' ? 'Uyarı' : 'Çevrimdışı'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="w-full" onClick={() => setShowAllHives(true)}>
                Tüm Kovanları Görüntüle
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
              Son Uyarılar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.length === 0 ? (
                <div className="text-center text-gray-400 py-8">Hiç uyarı yok.</div>
              ) : (
                recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.hiveName || alert.hiveId}</p>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      </div>
                      <Badge 
                        variant={alert.type === 'error' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'outline'}
                        className="ml-2"
                      >
                        {alert.type === 'error' ? 'Kritik' : alert.type === 'warning' ? 'Uyarı' : 'Bilgi'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => setShowAllAlerts(true)}>
                Tüm Uyarıları Görüntüle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>Sistem Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Sistem Sağlığı</span>
                <span className="text-sm text-green-600">%98</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Veri Kalitesi</span>
                <span className="text-sm text-amber-600">%85</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Ağ Bağlantısı</span>
                <span className="text-sm text-green-600">%92</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ReportsModal 
        isOpen={showReports}
        onClose={() => setShowReports(false)}
      />
      
      <LiveMonitoringModal 
        isOpen={showLiveMonitoring}
        onClose={() => setShowLiveMonitoring(false)}
      />

      <AllHivesModal 
        isOpen={showAllHives}
        onClose={() => setShowAllHives(false)}
      />

      <AllAlertsModal 
        isOpen={showAllAlerts}
        onClose={() => setShowAllAlerts(false)}
      />
    </div>
  );
};

export default Dashboard;
