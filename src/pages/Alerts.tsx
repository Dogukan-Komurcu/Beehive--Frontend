import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { apiService } from '@/services/api';
import { Alert as ApiAlert } from '@/types/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const Alerts = () => {
  const [alerts, setAlerts] = useState<ApiAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [form, setForm] = useState({ hiveId: '', type: 'warning', message: '' });
  const [selectedAlert, setSelectedAlert] = useState<ApiAlert | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [myHives, setMyHives] = useState<{ id: number; name: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getMyAlerts();
        const mapped = Array.isArray(data)
          ? data.map((alert: any) => ({
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
        setAlerts(mapped);
      } catch (err: any) {
        setError(err.message || 'Uyarılar alınamadı');
      } finally {
        setLoading(false);
      }
    };
    const fetchMyHives = async () => {
      try {
        const hives = await apiService.getMyHives();
        setMyHives(hives.map((h: any) => ({ id: h.id, name: h.name })));
      } catch {}
    };
    fetchAlerts();
    fetchMyHives();
  }, []);

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

  // Count by type for summary cards
  const summary = alerts.reduce(
    (acc, alert) => {
      if (alert.type === 'error') acc.critical++;
      else if (alert.type === 'warning') acc.warning++;
      else if (alert.type === 'info') acc.info++;
      if (alert.isRead) acc.resolved++;
      return acc;
    },
    { critical: 0, warning: 0, info: 0, resolved: 0 }
  );

  const handleAddAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    try {
      await apiService.createAlert({
        hiveId: Number(form.hiveId),
        type: form.type,
        message: form.message,
      });
      setShowAddModal(false);
      setForm({ hiveId: '', type: 'warning', message: '' });
      toast({ title: 'Uyarı eklendi', description: 'Yeni uyarı başarıyla oluşturuldu.' });
      setLoading(true);
      const data = await apiService.getMyAlerts();
      const mapped = Array.isArray(data)
        ? data.map((alert: any) => ({
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
      setAlerts(mapped);
    } catch (err: any) {
      setCreateError(err.message || 'Uyarı eklenemedi');
    } finally {
      setCreating(false);
      setLoading(false);
    }
  };

  const handleResolveAlert = async (alertId: number) => {
    try {
      await apiService.deleteAlert(alertId);
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      toast({ title: 'Uyarı çözümlendi', description: 'Uyarı başarıyla kaldırıldı.' });
    } catch (err: any) {
      toast({ title: 'Hata', description: err.message || 'Uyarı silinemedi', variant: 'destructive' });
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
          <Button className="gradient-honey text-white">Uyarı Ayarları</Button>
          <Button className="gradient-honey text-white" onClick={() => setShowAddModal(true)}>
            Uyarı Ekle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Kritik Uyarılar</p>
                <p className="text-2xl font-bold text-red-600">{summary.critical}</p>
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
                <p className="text-2xl font-bold text-amber-600">{summary.warning}</p>
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
                <p className="text-2xl font-bold text-blue-600">{summary.info}</p>
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
                <p className="text-2xl font-bold text-green-600">{summary.resolved}</p>
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
          {loading ? (
            <div className="text-center text-gray-500 py-8">Yükleniyor...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <div className="text-center text-gray-400">Hiç uyarı bulunamadı.</div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${getAlertColor(alert.type)} ${
                      alert.isRead ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{alert.hiveName || alert.hiveId}</h4>
                            <Badge
                              variant={!alert.isRead ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {!alert.isRead ? 'Aktif' : 'Çözümlendi'}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{alert.message}</p>
                          <p className="text-xs opacity-75">{alert.timestamp}</p>
                        </div>
                      </div>
                      {!alert.isRead && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="p-2" title="Bilgi Görüntüle" onClick={() => { setSelectedAlert(alert); setShowInfoModal(true); }}>
                            <Info className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleResolveAlert(alert.id)}>
                            Çözümlendi
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Uyarı Ekle</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAlert} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kovan</label>
              <Select value={form.hiveId} onValueChange={val => setForm(f => ({ ...f, hiveId: val }))} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Kovan seçin" />
                </SelectTrigger>
                <SelectContent>
                  {myHives.map(hive => (
                    <SelectItem key={hive.id} value={String(hive.id)}>{hive.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Uyarı Tipi</label>
              <Select value={form.type} onValueChange={val => setForm(f => ({ ...f, type: val }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Uyarı Tipi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warning">Uyarı</SelectItem>
                  <SelectItem value="error">Kritik</SelectItem>
                  <SelectItem value="info">Bilgi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mesaj</label>
              <Input
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                placeholder="Uyarı mesajı"
              />
            </div>
            {createError && <div className="text-red-500 text-sm">{createError}</div>}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                İptal
              </Button>
              <Button type="submit" className="gradient-honey text-white" disabled={creating}>
                {creating ? 'Ekleniyor...' : 'Ekle'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kovan Uyarı Bilgisi</DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getAlertIcon(selectedAlert.type)}
                <span className="font-semibold text-lg">{selectedAlert.hiveName || selectedAlert.hiveId}</span>
                <Badge variant={!selectedAlert.isRead ? 'destructive' : 'secondary'} className="text-xs">
                  {!selectedAlert.isRead ? 'Aktif' : 'Çözümlendi'}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Mesaj:</span> {selectedAlert.message}
              </div>
              <div>
                <span className="font-medium">Tarih:</span> {selectedAlert.timestamp}
              </div>
              <div>
                <span className="font-medium">Tip:</span> {selectedAlert.type}
              </div>
              {selectedAlert.hiveId && (
                <div>
                  <span className="font-medium">Kovan ID:</span> {selectedAlert.hiveId}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Alerts;
