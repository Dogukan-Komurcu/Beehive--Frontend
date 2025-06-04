
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Activity,
  Crown,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  Battery
} from 'lucide-react';

interface UserDetailModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({ open, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('info');

  if (!user) return null;

  // Mock hive data for the selected user
  const userHives = [
    {
      id: 1,
      name: 'Kovan #1',
      location: 'Bahçe Köşesi',
      status: 'active',
      temperature: 32,
      humidity: 65,
      weight: 45.2,
      lastUpdate: '5 dakika önce',
      batteryLevel: 85,
      alerts: 0
    },
    {
      id: 2,
      name: 'Kovan #2',
      location: 'Çiçek Tarlası',
      status: 'warning',
      temperature: 28,
      humidity: 78,
      weight: 38.7,
      lastUpdate: '15 dakika önce',
      batteryLevel: 92,
      alerts: 1
    },
    {
      id: 3,
      name: 'Kovan #3',
      location: 'Arka Bahçe',
      status: 'inactive',
      temperature: 25,
      humidity: 55,
      weight: 41.8,
      lastUpdate: '2 saat önce',
      batteryLevel: 23,
      alerts: 2
    }
  ];

  // Mock login history
  const loginHistory = [
    { date: '04.06.2024 09:15', ip: '192.168.1.100', device: 'Chrome - Windows', status: 'Başarılı' },
    { date: '03.06.2024 18:30', ip: '192.168.1.100', device: 'Chrome - Windows', status: 'Başarılı' },
    { date: '03.06.2024 08:45', ip: '10.0.0.25', device: 'Safari - iPhone', status: 'Başarılı' },
    { date: '02.06.2024 14:20', ip: '192.168.1.100', device: 'Chrome - Windows', status: 'Başarısız' },
    { date: '02.06.2024 14:18', ip: '192.168.1.100', device: 'Chrome - Windows', status: 'Başarılı' }
  ];

  const tabs = [
    { id: 'info', label: 'Kişisel Bilgiler', icon: User },
    { id: 'hives', label: 'Kovanlar', icon: Activity },
    { id: 'history', label: 'Giriş Geçmişi', icon: Clock },
    { id: 'permissions', label: 'Yetkiler', icon: Shield }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="gradient-honey text-white">
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-blue-600" />
                    Kişisel Bilgiler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Katılım: {user.joinDate}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-green-600" />
                    Hesap Durumu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Rol:</span>
                    <Badge 
                      className={user.role === 'admin' 
                        ? 'gradient-honey text-white border-0' 
                        : 'bg-blue-100 text-blue-800 border-blue-200'
                      }
                    >
                      {user.role === 'admin' ? (
                        <><Crown className="w-3 h-3 mr-1" /> Yönetici</>
                      ) : (
                        <><Eye className="w-3 h-3 mr-1" /> Gözlemci</>
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Durum:</span>
                    <Badge className={user.status === 'online' 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-gray-100 text-gray-800 border-gray-200'
                    }>
                      {user.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Son Aktivite:</span>
                    <span className="text-sm text-gray-600">{user.lastActive}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Yönetilen Kovan:</span>
                    <span className="font-semibold">{user.hivesManaged}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Hives Tab */}
        {activeTab === 'hives' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Kullanıcının Kovanları ({userHives.length})</h3>
            </div>
            <div className="grid gap-4">
              {userHives.map((hive) => (
                <Card key={hive.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="text-lg font-semibold">{hive.name}</h4>
                          <Badge variant="outline" className={getStatusColor(hive.status)}>
                            {getStatusIcon(hive.status)}
                            <span className="ml-1">
                              {hive.status === 'active' ? 'Aktif' : 
                               hive.status === 'warning' ? 'Uyarı' : 'İnaktif'}
                            </span>
                          </Badge>
                          {hive.alerts > 0 && (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                              {hive.alerts} Uyarı
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="w-4 h-4 text-red-500" />
                            <span className="text-sm">{hive.temperature}°C</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{hive.humidity}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wind className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{hive.weight} kg</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Battery className="w-4 h-4 text-purple-500" />
                            <span className="text-sm">{hive.batteryLevel}%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{hive.location}</span>
                          </div>
                          <span>Son güncelleme: {hive.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Login History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Giriş Geçmişi</h3>
            <div className="space-y-3">
              {loginHistory.map((login, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{login.date}</p>
                            <p className="text-sm text-gray-600">{login.device}</p>
                          </div>
                          <div>
                            <p className="text-sm">IP: {login.ip}</p>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={login.status === 'Başarılı' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                        }
                      >
                        {login.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kullanıcı Yetkileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Kovan Ekleme</span>
                    <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Kovan Düzenleme</span>
                    <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Uyarı Yönetimi</span>
                    <Badge className={user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {user.role === 'admin' ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Kullanıcı Yönetimi</span>
                    <Badge className={user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {user.role === 'admin' ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Sistem Ayarları</span>
                    <Badge className={user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {user.role === 'admin' ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Kapat
          </Button>
          <Button className="gradient-honey text-white">
            Kullanıcıyı Düzenle
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
