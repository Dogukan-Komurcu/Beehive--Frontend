import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Users, 
  Database, 
  Settings, 
  Activity,
  AlertTriangle,
  BarChart3,
  FileText,
  Trash2,
  Edit,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Lock,
  Unlock,
  Crown,
  Search
} from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');

  // Admin kontrolü
  if (!user || user.email !== 'sudolens@gmail.com') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Erişim Reddedildi</h2>
            <p className="text-gray-600">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const adminStats = {
    totalUsers: 156,
    activeHives: 89,
    totalAlerts: 23,
    systemHealth: 98.5,
    dataStorage: '2.3 GB',
    lastBackup: '2 saat önce'
  };

  const recentActivities = [
    { id: 1, type: 'user', action: 'Yeni kullanıcı kaydı', user: 'Ahmet Yılmaz', time: '5 dakika önce' },
    { id: 2, type: 'hive', action: 'Kovan eklendi', user: 'Fatma Demir', time: '15 dakika önce' },
    { id: 3, type: 'alert', action: 'Kritik uyarı oluşturuldu', user: 'Sistem', time: '1 saat önce' },
    { id: 4, type: 'system', action: 'Sistem güncellemesi', user: 'Admin', time: '3 saat önce' }
  ];

  const systemSettings = [
    { key: 'backup_interval', label: 'Yedekleme Aralığı', value: '6 saat', type: 'select' },
    { key: 'alert_threshold', label: 'Uyarı Eşiği', value: '85%', type: 'number' },
    { key: 'session_timeout', label: 'Oturum Zaman Aşımı', value: '30 dakika', type: 'select' },
    { key: 'max_hives_per_user', label: 'Kullanıcı Başına Max Kovan', value: '50', type: 'number' }
  ];

  const handleSystemAction = (action: string) => {
    toast({
      title: "İşlem Başlatıldı",
      description: `${action} işlemi başlatıldı. Lütfen bekleyiniz...`,
    });
  };

  const handleUserAction = (action: string, userId?: number) => {
    toast({
      title: "Kullanıcı İşlemi",
      description: `${action} işlemi gerçekleştirildi.`,
    });
  };

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
    { id: 'users', label: 'Kullanıcı Yönetimi', icon: Users },
    { id: 'system', label: 'Sistem Ayarları', icon: Settings },
    { id: 'logs', label: 'Sistem Logları', icon: FileText },
    { id: 'security', label: 'Güvenlik', icon: Shield }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                👑 Admin Paneli
                <span className="ml-3 text-2xl bee-float">🔐</span>
              </h1>
              <p className="text-lg opacity-90">Sistem Yönetimi ve Kontrol Merkezi</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-75">Hoş geldiniz</p>
              <p className="text-lg font-semibold">{user.name}</p>
              <Badge className="bg-white/20 text-white border-white/30">
                <Crown className="w-3 h-3 mr-1" />
                Süper Admin
              </Badge>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 text-6xl opacity-20">⚡</div>
      </div>

      {/* Tab Navigation */}
      <Card className="card-premium">
        <CardContent className="p-0">
          <div className="flex overflow-x-auto border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all duration-300 ${
                  selectedTab === tab.id
                    ? 'border-red-500 text-red-600 bg-red-50'
                    : 'border-transparent text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-premium card-hover animate-fade-in-delay group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                      {adminStats.totalUsers}
                    </p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium card-hover animate-fade-in-delay group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aktif Kovan</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                      {adminStats.activeHives}
                    </p>
                  </div>
                  <div className="gradient-honey p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium card-hover animate-fade-in-delay group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bekleyen Uyarı</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                      {adminStats.totalAlerts}
                    </p>
                  </div>
                  <div className="bg-red-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium card-hover animate-fade-in-delay group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sistem Sağlığı</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                      {adminStats.systemHealth}%
                    </p>
                  </div>
                  <div className="bg-green-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium card-hover animate-fade-in-delay group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Veri Kullanımı</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                      {adminStats.dataStorage}
                    </p>
                  </div>
                  <div className="bg-purple-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium card-hover animate-fade-in-delay group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Son Yedekleme</p>
                    <p className="text-xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                      {adminStats.lastBackup}
                    </p>
                  </div>
                  <div className="bg-orange-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-3 h-6 w-6 text-blue-600" />
                Hızlı İşlemler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  onClick={() => handleSystemAction('Sistem Yedeklemesi')}
                  className="h-16 flex-col space-y-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Yedekle</span>
                </Button>
                <Button 
                  onClick={() => handleSystemAction('Sistem Güncellemesi')}
                  className="h-16 flex-col space-y-2 bg-green-600 hover:bg-green-700"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span className="text-sm">Güncelle</span>
                </Button>
                <Button 
                  onClick={() => handleSystemAction('Cache Temizleme')}
                  className="h-16 flex-col space-y-2 bg-orange-600 hover:bg-orange-700"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="text-sm">Temizle</span>
                </Button>
                <Button 
                  onClick={() => handleSystemAction('Sistem Taraması')}
                  className="h-16 flex-col space-y-2 bg-purple-600 hover:bg-purple-700"
                >
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Tara</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-3 h-6 w-6 text-green-600" />
                Son Aktiviteler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-500' :
                        activity.type === 'hive' ? 'bg-green-500' :
                        activity.type === 'alert' ? 'bg-red-500' : 'bg-purple-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* System Settings Tab */}
      {selectedTab === 'system' && (
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-3 h-6 w-6 text-blue-600" />
              Sistem Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {systemSettings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">Mevcut değer: {setting.value}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Düzenle
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other tabs content can be added here */}
      {selectedTab !== 'overview' && selectedTab !== 'system' && (
        <Card className="card-premium">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Bu Sekme Henüz Hazır Değil</h3>
            <p className="text-gray-600">Bu özellik yakında eklenecektir.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Admin;
