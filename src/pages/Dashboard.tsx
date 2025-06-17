
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
  Eye,
  Calendar,
  BarChart3,
  Bell,
  ArrowRight,
  Signal,
  Zap
} from 'lucide-react';
import { ReportsModal } from '@/components/dashboard/ReportsModal';
import { LiveMonitoringModal } from '@/components/dashboard/LiveMonitoringModal';
import { AllHivesModal } from '@/components/dashboard/AllHivesModal';
import { AllAlertsModal } from '@/components/dashboard/AllAlertsModal';
import { DemoModeIndicator } from '@/components/dashboard/DemoModeIndicator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Hive, SensorData } from '@/types/api';

const Dashboard = () => {
  const [showReports, setShowReports] = useState(false);
  const [showLiveMonitoring, setShowLiveMonitoring] = useState(false);
  const [showAllHives, setShowAllHives] = useState(false);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const { isDemoMode } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
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

  const quickActions = [
    {
      title: 'Kovanları Görüntüle',
      description: 'Tüm kovanlarınızı yönetin',
      icon: Layers,
      color: 'from-amber-500 to-orange-600',
      action: () => navigate('/dashboard/hives')
    },
    {
      title: 'Harita Görünümü',
      description: 'Kovanları harita üzerinde görün',
      icon: MapPin,
      color: 'from-green-500 to-emerald-600',
      action: () => navigate('/dashboard/map')
    },
    {
      title: 'Analitik & Grafikler',
      description: 'Detaylı veri analizi',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600',
      action: () => navigate('/dashboard/analytics')
    },
    {
      title: 'Uyarıları Görüntüle',
      description: 'Sistem uyarılarını kontrol et',
      icon: Bell,
      color: 'from-red-500 to-pink-600',
      action: () => navigate('/dashboard/alerts')
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-gray-600">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Demo Mode Indicator */}
      <DemoModeIndicator />

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-8 border border-amber-200">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Hoş Geldiniz! 🐝
            </h1>
            <p className="text-lg text-gray-700">
              Arı kovanlarınızın durumunu takip edin ve yönetin
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Sistem Aktif</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => {
                if (handleDemoRestriction("Rapor görüntüleme")) {
                  setShowReports(true);
                }
              }}
              className="bg-white/70 backdrop-blur-sm border-amber-300 hover:bg-white"
            >
              <Eye className="mr-2 h-4 w-4" />
              Raporları Görüntüle
            </Button>
            <Button 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
              onClick={() => setShowLiveMonitoring(true)}
            >
              <Activity className="mr-2 h-4 w-4" />
              Canlı İzle
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-amber-700">Toplam Kovan</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalHives}</p>
                <div className="flex items-center text-sm text-emerald-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+2 bu ay</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Layers className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-emerald-700">Aktif Kovan</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeHives}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <Signal className="h-3 w-3 mr-1" />
                  <span>%{Math.round((stats.activeHives / stats.totalHives) * 100)} çevrimiçi</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50 hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-700">Uyarılar</p>
                <p className="text-3xl font-bold text-gray-900">{stats.alertCount}</p>
                <div className="flex items-center text-sm text-red-600">
                  <Zap className="h-3 w-3 mr-1" />
                  <span>Dikkat gerekiyor</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-gray-50 to-slate-50 hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-slate-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Çevrimdışı</p>
                <p className="text-3xl font-bold text-gray-900">{stats.offlineHives}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  <span>Bağlantı yok</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Hızlı Erişim</h2>
          <p className="text-gray-600">Sık kullanılan işlemler</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={action.action}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <CardContent className="p-6 relative">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Hives */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Son Kovan Durumları</h3>
                  <p className="text-sm text-gray-600">Güncel sensör verileri</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAllHives(true)}>
                Tümünü Gör
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentHives.map((hive) => {
              const sensor = sensorDataMap[hive.id];
              return (
                <div key={hive.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-amber-50 hover:to-orange-50 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm">
                        {hive.name.split('-')[1] || hive.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                        {hive.name}
                      </h4>
                      <p className="text-sm text-gray-600">{hive.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-sm bg-white/70 px-3 py-2 rounded-lg">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">{sensor ? sensor.temperature : '-'}°C</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm bg-white/70 px-3 py-2 rounded-lg">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{sensor ? sensor.humidity : '-'}%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm bg-white/70 px-3 py-2 rounded-lg">
                      <Battery className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{sensor ? sensor.battery : '-'}%</span>
                    </div>
                    <Badge 
                      variant={hive.status === 'active' ? 'default' : hive.status === 'warning' ? 'destructive' : 'secondary'}
                      className={`${
                        hive.status === 'active' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : hive.status === 'warning' 
                          ? 'bg-red-100 text-red-800 border-red-200'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      } font-medium`}
                    >
                      {hive.status === 'active' ? 'Aktif' : hive.status === 'warning' ? 'Uyarı' : 'Çevrimdışı'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Son Uyarılar</h3>
                  <p className="text-sm text-gray-600">Sistem bildirimleri</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAllAlerts(true)}>
                Tümünü Gör
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Hiç uyarı yok!</p>
                  <p className="text-sm text-gray-600">Sistemler normal çalışıyor</p>
                </div>
              </div>
            ) : (
              recentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-red-50 hover:to-pink-50 transition-all duration-300 group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 group-hover:text-red-700 transition-colors">
                          {alert.hiveName || alert.hiveId}
                        </h4>
                        <Badge 
                          variant={alert.type === 'error' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {alert.type === 'error' ? 'Kritik' : alert.type === 'warning' ? 'Uyarı' : 'Bilgi'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sistem Durumu</h3>
              <p className="text-sm text-gray-600">Genel performans metrikleri</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Sistem Sağlığı</span>
                <span className="text-sm font-bold text-green-600">%98</span>
              </div>
              <Progress value={98} className="h-3 bg-gray-200" />
              <p className="text-xs text-gray-500">Mükemmel durumda</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Veri Kalitesi</span>
                <span className="text-sm font-bold text-amber-600">%85</span>
              </div>
              <Progress value={85} className="h-3 bg-gray-200" />
              <p className="text-xs text-gray-500">İyi durumda</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Ağ Bağlantısı</span>
                <span className="text-sm font-bold text-green-600">%92</span>
              </div>
              <Progress value={92} className="h-3 bg-gray-200" />
              <p className="text-xs text-gray-500">Stabil bağlantı</p>
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
