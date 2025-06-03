
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Database, 
  Wifi,
  Thermometer,
  Save
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600">Sistem ve uygulama ayarları</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bildirim Ayarları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-blue-600" />
              Bildirim Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="critical-alerts">Kritik Uyarılar</Label>
                <p className="text-sm text-gray-500">Acil durumlar için anında bildirim</p>
              </div>
              <Switch id="critical-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="temp-alerts">Sıcaklık Uyarıları</Label>
                <p className="text-sm text-gray-500">Anormal sıcaklık değerleri</p>
              </div>
              <Switch id="temp-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="battery-alerts">Batarya Uyarıları</Label>
                <p className="text-sm text-gray-500">Düşük batarya seviyesi</p>
              </div>
              <Switch id="battery-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">E-posta Bildirimleri</Label>
                <p className="text-sm text-gray-500">Günlük rapor ve özetler</p>
              </div>
              <Switch id="email-notifications" />
            </div>
          </CardContent>
        </Card>

        {/* Sensör Ayarları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Thermometer className="mr-2 h-5 w-5 text-orange-600" />
              Sensör Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="temp-min">Minimum Sıcaklık (°C)</Label>
              <Input id="temp-min" type="number" defaultValue="20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temp-max">Maksimum Sıcaklık (°C)</Label>
              <Input id="temp-max" type="number" defaultValue="40" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="humidity-min">Minimum Nem (%)</Label>
              <Input id="humidity-min" type="number" defaultValue="40" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="humidity-max">Maksimum Nem (%)</Label>
              <Input id="humidity-max" type="number" defaultValue="80" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="battery-threshold">Batarya Uyarı Eşiği (%)</Label>
              <Input id="battery-threshold" type="number" defaultValue="20" />
            </div>
          </CardContent>
        </Card>

        {/* Sistem Ayarları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="mr-2 h-5 w-5 text-gray-600" />
              Sistem Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="data-interval">Veri Toplama Aralığı (dakika)</Label>
              <Input id="data-interval" type="number" defaultValue="5" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-backup">Otomatik Yedekleme</Label>
                <p className="text-sm text-gray-500">Günlük otomatik veri yedekleme</p>
              </div>
              <Switch id="auto-backup" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-mode">Bakım Modu</Label>
                <p className="text-sm text-gray-500">Sistem bakım durumu</p>
              </div>
              <Switch id="maintenance-mode" />
            </div>
          </CardContent>
        </Card>

        {/* Güvenlik Ayarları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-green-600" />
              Güvenlik Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Oturum Zaman Aşımı (dakika)</Label>
              <Input id="session-timeout" type="number" defaultValue="60" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">İki Faktörlü Doğrulama</Label>
                <p className="text-sm text-gray-500">Ek güvenlik katmanı</p>
              </div>
              <Switch id="two-factor" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="login-alerts">Giriş Uyarıları</Label>
                <p className="text-sm text-gray-500">Şüpheli giriş bildirimleri</p>
              </div>
              <Switch id="login-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kaydet Butonu */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Ayarları Kaydet</h3>
              <p className="text-sm text-gray-500">Değişiklikleri kalıcı olarak kaydet</p>
            </div>
            <Button className="gradient-honey text-white">
              <Save className="mr-2 h-4 w-4" />
              Kaydet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
