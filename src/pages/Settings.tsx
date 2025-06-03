
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Database, 
  Wifi,
  Thermometer,
  Save,
  Smartphone,
  Globe,
  Palette,
  Moon,
  Sun,
  Volume2,
  Lock,
  Key,
  Users,
  Activity,
  Zap
} from 'lucide-react';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    critical: true,
    temperature: true,
    battery: true,
    email: false,
    sms: true,
    sound: true
  });

  const [sensorLimits, setSensorLimits] = useState({
    tempMin: 20,
    tempMax: 40,
    humidityMin: 40,
    humidityMax: 80,
    batteryThreshold: 20
  });

  const settingsSections = [
    {
      title: 'Bildirim Ayarları',
      icon: Bell,
      color: 'bg-blue-500',
      description: 'Uyarı ve bildirim tercihlerinizi yönetin'
    },
    {
      title: 'Sensör Ayarları',
      icon: Thermometer,
      color: 'bg-orange-500',
      description: 'Sıcaklık ve nem eşik değerlerini ayarlayın'
    },
    {
      title: 'Sistem Ayarları',
      icon: SettingsIcon,
      color: 'bg-gray-600',
      description: 'Genel sistem yapılandırması'
    },
    {
      title: 'Güvenlik Ayarları',
      icon: Shield,
      color: 'bg-green-600',
      description: 'Hesap güvenliği ve erişim kontrolü'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-sunset p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              ⚙️ Sistem Ayarları
              <span className="ml-3 text-2xl bee-float">🐝</span>
            </h1>
            <p className="text-lg opacity-90">Akılları Kovanı sistem yapılandırması</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Database className="mr-2 h-4 w-4" />
              Yedekle
            </Button>
            <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Save className="mr-2 h-4 w-4" />
              Tümünü Kaydet
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 text-6xl opacity-20">🔧</div>
      </div>

      {/* Quick Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {settingsSections.map((section, index) => (
          <Card key={index} className="card-premium card-hover animate-fade-in-delay group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${section.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <Badge variant="outline" className="text-xs">Aktif</Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gradient transition-all duration-500">
                {section.title}
              </h3>
              <p className="text-sm text-gray-600">{section.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bildirim Ayarları */}
        <Card className="card-premium card-hover animate-slide-in-left">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Bell className="mr-3 h-6 w-6 text-blue-600" />
              Bildirim Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { 
                key: 'critical',
                title: 'Kritik Uyarılar', 
                description: 'Acil durumlar için anında bildirim',
                icon: Zap,
                color: 'text-red-500'
              },
              { 
                key: 'temperature',
                title: 'Sıcaklık Uyarıları', 
                description: 'Anormal sıcaklık değerleri',
                icon: Thermometer,
                color: 'text-orange-500'
              },
              { 
                key: 'battery',
                title: 'Batarya Uyarıları', 
                description: 'Düşük batarya seviyesi',
                icon: Activity,
                color: 'text-yellow-500'
              },
              { 
                key: 'email',
                title: 'E-posta Bildirimleri', 
                description: 'Günlük rapor ve özetler',
                icon: Globe,
                color: 'text-blue-500'
              },
              { 
                key: 'sms',
                title: 'SMS Bildirimleri', 
                description: 'Kritik durumlar için SMS',
                icon: Smartphone,
                color: 'text-green-500'
              },
              { 
                key: 'sound',
                title: 'Ses Bildirimleri', 
                description: 'Sistem ses uyarıları',
                icon: Volume2,
                color: 'text-purple-500'
              }
            ].map((item) => (
              <div key={item.key} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div>
                      <Label htmlFor={item.key} className="font-medium text-gray-900">
                        {item.title}
                      </Label>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <Switch 
                    id={item.key} 
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, [item.key]: checked }))
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sensör Ayarları */}
        <Card className="card-premium card-hover animate-slide-in-right">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Thermometer className="mr-3 h-6 w-6 text-orange-600" />
              Sensör Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temp-min" className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  Minimum Sıcaklık (°C)
                </Label>
                <Input 
                  id="temp-min" 
                  type="number" 
                  value={sensorLimits.tempMin}
                  onChange={(e) => setSensorLimits(prev => ({ ...prev, tempMin: Number(e.target.value) }))}
                  className="bg-blue-50 border-blue-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temp-max" className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                  Maksimum Sıcaklık (°C)
                </Label>
                <Input 
                  id="temp-max" 
                  type="number" 
                  value={sensorLimits.tempMax}
                  onChange={(e) => setSensorLimits(prev => ({ ...prev, tempMax: Number(e.target.value) }))}
                  className="bg-red-50 border-red-200 focus:border-red-400"
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="humidity-min" className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                  Minimum Nem (%)
                </Label>
                <Input 
                  id="humidity-min" 
                  type="number" 
                  value={sensorLimits.humidityMin}
                  onChange={(e) => setSensorLimits(prev => ({ ...prev, humidityMin: Number(e.target.value) }))}
                  className="bg-cyan-50 border-cyan-200 focus:border-cyan-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="humidity-max" className="flex items-center">
                  <div className="w-3 h-3 bg-teal-400 rounded-full mr-2"></div>
                  Maksimum Nem (%)
                </Label>
                <Input 
                  id="humidity-max" 
                  type="number" 
                  value={sensorLimits.humidityMax}
                  onChange={(e) => setSensorLimits(prev => ({ ...prev, humidityMax: Number(e.target.value) }))}
                  className="bg-teal-50 border-teal-200 focus:border-teal-400"
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="battery-threshold" className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                Batarya Uyarı Eşiği (%)
              </Label>
              <Input 
                id="battery-threshold" 
                type="number" 
                value={sensorLimits.batteryThreshold}
                onChange={(e) => setSensorLimits(prev => ({ ...prev, batteryThreshold: Number(e.target.value) }))}
                className="bg-yellow-50 border-yellow-200 focus:border-yellow-400"
              />
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">Önizleme Değerleri</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Sıcaklık Aralığı:</span>
                  <br />
                  <span className="font-medium text-orange-700">
                    {sensorLimits.tempMin}°C - {sensorLimits.tempMax}°C
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Nem Aralığı:</span>
                  <br />
                  <span className="font-medium text-cyan-700">
                    {sensorLimits.humidityMin}% - {sensorLimits.humidityMax}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sistem Ayarları */}
        <Card className="card-premium card-hover animate-fade-in-delay">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <SettingsIcon className="mr-3 h-6 w-6 text-gray-600" />
              Sistem Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="data-interval" className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-blue-500" />
                Veri Toplama Aralığı (dakika)
              </Label>
              <Input id="data-interval" type="number" defaultValue="5" className="bg-blue-50 border-blue-200" />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              {[
                { 
                  title: 'Otomatik Yedekleme', 
                  description: 'Günlük otomatik veri yedekleme',
                  icon: Database,
                  defaultChecked: true
                },
                { 
                  title: 'Bakım Modu', 
                  description: 'Sistem bakım durumu',
                  icon: SettingsIcon,
                  defaultChecked: false
                },
                { 
                  title: 'Karanlık Tema', 
                  description: 'Arayüz tema ayarları',
                  icon: isDarkMode ? Moon : Sun,
                  defaultChecked: isDarkMode
                },
                { 
                  title: 'Otomatik Güncellemeler', 
                  description: 'Yazılım güncellemelerini otomatik yükle',
                  icon: Zap,
                  defaultChecked: true
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <item.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <Label className="font-medium text-gray-900">{item.title}</Label>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <Switch 
                    defaultChecked={item.defaultChecked}
                    onCheckedChange={item.title === 'Karanlık Tema' ? setIsDarkMode : undefined}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Güvenlik Ayarları */}
        <Card className="card-premium card-hover animate-fade-in-delay-2">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Shield className="mr-3 h-6 w-6 text-green-600" />
              Güvenlik Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="session-timeout" className="flex items-center">
                <Lock className="w-4 h-4 mr-2 text-green-500" />
                Oturum Zaman Aşımı (dakika)
              </Label>
              <Input id="session-timeout" type="number" defaultValue="60" className="bg-green-50 border-green-200" />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              {[
                { 
                  title: 'İki Faktörlü Doğrulama', 
                  description: 'SMS/E-posta ile ek güvenlik',
                  icon: Key,
                  badge: 'Önerilen'
                },
                { 
                  title: 'Giriş Uyarıları', 
                  description: 'Şüpheli giriş bildirimleri',
                  icon: Shield,
                  badge: null
                },
                { 
                  title: 'Oturum Kayıtları', 
                  description: 'Kullanıcı oturum geçmişi',
                  icon: Users,
                  badge: null
                },
                { 
                  title: 'IP Kısıtlaması', 
                  description: 'Belirli IP adreslerinden erişim',
                  icon: Globe,
                  badge: 'Gelişmiş'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <item.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Label className="font-medium text-gray-900">{item.title}</Label>
                        {item.badge && (
                          <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <Switch defaultChecked={index < 2} />
                </div>
              ))}
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <h4 className="font-medium text-green-800 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Güvenlik Durumu
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Sistem güvenliği: Yüksek</span>
                <Badge className="bg-green-500 text-white">Güvenli</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save All Button */}
      <Card className="card-premium animate-zoom-in">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-2">Ayarları Kaydet</h3>
              <p className="text-gray-600">Tüm değişiklikleri kalıcı olarak kaydedin</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="hover:bg-gray-50">
                Sıfırla
              </Button>
              <Button className="gradient-honey text-white px-8 py-3 text-lg hover:shadow-xl transition-all duration-300">
                <Save className="mr-2 h-5 w-5" />
                Tümünü Kaydet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
