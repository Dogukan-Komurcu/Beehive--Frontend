
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Eye, 
  Clock, 
  UserPlus, 
  Shield, 
  Database, 
  Edit, 
  Trash2, 
  Settings,
  BarChart3,
  Map,
  Bell,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Demo = () => {
  const { user, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessionProgress, setSessionProgress] = React.useState(100);

  useEffect(() => {
    // Demo oturumu başlat
    if (!user?.isDemo) {
      handleDemoLogin();
    }
  }, []);

  useEffect(() => {
    // 30 dakikalik oturum sayacı
    if (user?.isDemo) {
      const startTime = localStorage.getItem('demoLoginTime');
      if (startTime) {
        const interval = setInterval(() => {
          const elapsed = Date.now() - parseInt(startTime);
          const remaining = Math.max(0, 30 * 60 * 1000 - elapsed);
          const progress = (remaining / (30 * 60 * 1000)) * 100;
          setSessionProgress(progress);
          
          if (remaining <= 0) {
            clearInterval(interval);
            toast({
              title: "Demo Oturumu Sona Erdi",
              description: "30 dakikalık demo süreniz doldu. Ana sayfaya yönlendiriliyorsunuz.",
              variant: "destructive"
            });
            setTimeout(() => navigate('/'), 2000);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [user, navigate, toast]);

  const handleDemoLogin = async () => {
    try {
      await loginAsDemo();
      toast({
        title: "Demo Moduna Hoş Geldiniz! 🎬",
        description: "30 dakikalık demo oturumunuz başladı. Sistemin tüm özelliklerini keşfedebilirsiniz!",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Demo moduna geçiş başarısız oldu.",
        variant: "destructive"
      });
      navigate('/');
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleRegister = () => {
    navigate('/');
    toast({
      title: "Kayıt için Ana Sayfaya Yönlendirildiniz",
      description: "Tam özellikli hesap için kayıt olabilirsiniz.",
    });
  };

  const demoFeatures = [
    {
      icon: Eye,
      title: 'Görüntüleme İzinleri',
      description: 'Tüm kovan verilerini, sensör bilgilerini ve analizleri görüntüleyebilirsiniz',
      allowed: true
    },
    {
      icon: BarChart3,
      title: 'Grafik ve Analiz',
      description: 'Detaylı grafikleri ve trend analizlerini inceleyebilirsiniz',
      allowed: true
    },
    {
      icon: Map,
      title: 'Harita Görünümü',
      description: 'Kovanların harita üzerindeki konumlarını görebilirsiniz',
      allowed: true
    },
    {
      icon: Bell,
      title: 'Uyarıları Görme',
      description: 'Sistem uyarılarını ve bildirimleri görebilirsiniz',
      allowed: true
    },
    {
      icon: Activity,
      title: 'Sensör Verileri',
      description: 'Gerçek zamanlı sensör verilerini takip edebilirsiniz',
      allowed: true
    },
    {
      icon: Edit,
      title: 'Veri Düzenleme',
      description: 'Kovan bilgilerini düzenleyemez, yeni veri ekleyemezsiniz',
      allowed: false
    },
    {
      icon: Trash2,
      title: 'Veri Silme',
      description: 'Hiçbir veriyi silemez veya değiştiremezsiniz',
      allowed: false
    },
    {
      icon: Settings,
      title: 'Sistem Ayarları',
      description: 'Sistem ayarlarını değiştiremez, kullanıcı yönetimi yapamazsınız',
      allowed: false
    }
  ];

  const remainingMinutes = Math.ceil(sessionProgress * 30 / 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Demo Modu</h1>
                <p className="text-sm text-gray-600">Akıllı Kovanı Demo Deneyimi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                🎬 DEMO KULLANICI
              </Badge>
              <Button onClick={handleRegister} className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Kayıt Ol
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Session Status */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Clock className="h-4 w-4 text-blue-600" />
          <AlertDescription className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-blue-700 font-medium">
                Demo Oturum Durumu: {remainingMinutes} dakika kaldı
              </span>
              <div className="flex items-center space-x-2">
                <Progress value={sessionProgress} className="w-32" />
                <span className="text-sm text-blue-600">{Math.round(sessionProgress)}%</span>
              </div>
            </div>
            <Button 
              size="sm" 
              onClick={handleGoToDashboard}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              Dashboard'a Git →
            </Button>
          </AlertDescription>
        </Alert>

        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-purple-100 text-purple-800">
              🎉 Demo Moduna Hoş Geldiniz!
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Akıllı Kovanı Sistemini{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Keşfedin
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            30 dakikalık demo sürenizde sistemin tüm özelliklerini görüntüleyebilir, 
            ancak veri değiştirme işlemleri yapamaksınız.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {demoFeatures.map((feature, index) => (
            <Card key={index} className={`border-2 transition-all duration-200 ${
              feature.allowed 
                ? 'border-green-200 bg-green-50 hover:shadow-md' 
                : 'border-red-200 bg-red-50'
            }`}>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  feature.allowed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-center">
                  {feature.title}
                  {feature.allowed ? (
                    <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 ml-2" />
                  )}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Rules */}
        <Card className="border-amber-200 bg-amber-50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Demo Modu Kuralları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Yapabilecekleriniz:</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Tüm verileri görüntüleme</li>
                  <li>• Grafikleri ve analizleri inceleme</li>
                  <li>• Harita görünümünü kullanma</li>
                  <li>• Uyarıları ve bildirimleri görme</li>
                  <li>• Sensör verilerini takip etme</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">❌ Yapamayacaklarınız:</h4>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• Veri ekleme, düzenleme veya silme</li>
                  <li>• Yeni kovan oluşturma</li>
                  <li>• Sistem ayarlarını değiştirme</li>
                  <li>• Kullanıcı yönetimi</li>
                  <li>• Kalıcı değişiklikler yapma</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleGoToDashboard}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 text-lg"
            >
              🚀 Demo'ya Başla
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleRegister}
              className="border-green-500 text-green-700 hover:bg-green-50 px-8 py-4 text-lg"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Tam Hesap İçin Kayıt Ol
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            Demo oturumunuz {remainingMinutes} dakika sonra otomatik olarak sona erecektir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Demo;
