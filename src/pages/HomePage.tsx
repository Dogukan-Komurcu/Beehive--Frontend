import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoginModal } from '@/components/auth/LoginModal';
import { RegisterModal } from '@/components/auth/RegisterModal';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Thermometer, 
  BarChart3, 
  Bell,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Settings,
  Database,
  AlertCircle,
  Navigation,
  ChevronRight
} from 'lucide-react';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleDemoClick = () => {
    navigate('/demo');
  };

  const features = [
    {
      icon: MapPin,
      title: 'Konum Takibi',
      description: 'Harita üzerinden anlık kovan konumları ve GPS koordinatları'
    },
    {
      icon: Thermometer,
      title: 'Çevresel Veriler',
      description: 'Sıcaklık, nem, batarya ve hareket sensörü verileri'
    },
    {
      icon: BarChart3,
      title: 'Veri Analizi',
      description: 'Grafiksel geçmiş veriler ve trend analizleri'
    },
    {
      icon: Bell,
      title: 'Uyarı Sistemi',
      description: 'Kritik durumlarda anlık bildirim ve alarm sistemi'
    }
  ];

  const quickLinks = [
    {
      title: 'Ana Dashboard',
      description: 'Genel bakış ve önemli metrikleri görün',
      icon: BarChart3,
      path: '/dashboard',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Kovan Yönetimi',
      description: 'Kovanlarınızı yönetin ve düzenleyin',
      icon: Database,
      path: '/dashboard/hives',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Harita Görünümü',
      description: 'Kovanlarınızı harita üzerinde görün',
      icon: Navigation,
      path: '/dashboard/map',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Sensör Verileri',
      description: 'Detaylı sensör analizi ve geçmiş',
      icon: Thermometer,
      path: '/dashboard/sensors',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Uyarılar',
      description: 'Sistem uyarıları ve bildirimler',
      icon: AlertCircle,
      path: '/dashboard/alerts',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Kullanıcı Yönetimi',
      description: 'Kullanıcıları yönetin (Admin)',
      icon: Users,
      path: '/dashboard/users',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Sistem Ayarları',
      description: 'Uygulama ayarları ve yapılandırma',
      icon: Settings,
      path: '/dashboard/settings',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-amber-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-honey rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🐝</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Akılları Kovanı</h1>
                <p className="text-sm text-gray-600">Dijital Arı Kovanı Takip Sistemi</p>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowLogin(true)}
                className="border-amber-200 text-amber-700 hover:bg-amber-50 h-10 px-6"
              >
                <Shield className="mr-2 h-4 w-4" />
                Giriş Yap
              </Button>
              <Button 
                onClick={() => setShowRegister(true)}
                className="gradient-honey text-white hover:shadow-lg transition-all duration-300 h-10 px-6"
              >
                <Users className="mr-2 h-4 w-4" />
                Kayıt Ol
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-lg bg-amber-100 text-amber-800 bee-float">
                🍯 Yeni Nesil Arıcılık Teknolojisi
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Arı Kovanlarınızı{' '}
              <span className="text-transparent bg-clip-text gradient-honey">
                Dijital Olarak
              </span>{' '}
              Takip Edin!
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Gerçek zamanlı sensör verileri, harita destekli takip ve akıllı analiz araçları ile 
              arı kolonilerinizi koruyun ve verimliliği artırın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                onClick={() => setShowRegister(true)}
                className="gradient-honey text-white text-lg px-8 py-4 hover:shadow-xl transition-all duration-300 pulse-glow"
              >
                🚀 Hemen Başlayın
              </Button>
              
              {/* Demo Button */}
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleDemoClick}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 text-lg px-8 py-4 relative overflow-hidden group"
              >
                <Eye className="mr-2 h-5 w-5" />
                🎬 Demo Modunu Deneyin
                <div className="flex items-center ml-2 text-sm opacity-75">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>30dk</span>
                </div>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-amber-200 text-amber-700 hover:bg-amber-50 text-lg px-8 py-4"
              >
                📺 Demo İzle
              </Button>
            </div>

            {/* Demo Info */}
            <div className="mt-6 inline-flex items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              <span className="font-medium">Demo Modu:</span>
              <span className="ml-1">Tüm özellikleri keşfedin, kayıt gerektirmez!</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20 bee-float">
          <div className="text-6xl">🐝</div>
        </div>
        <div className="absolute top-40 right-20 opacity-20 bee-float" style={{animationDelay: '1s'}}>
          <div className="text-4xl">🍯</div>
        </div>
        <div className="absolute bottom-20 left-20 opacity-20 bee-float" style={{animationDelay: '2s'}}>
          <div className="text-5xl">🌻</div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 Hızlı Erişim Bağlantıları
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sistemimizdeki tüm sayfalara doğrudan erişim sağlayın
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${link.color}`}></div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <link.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {link.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(link.path)}
                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0 h-auto font-medium"
                      >
                        Sayfaya Git
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden Akılları Kovanı?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern arıcılık için tasarlanmış kapsamlı dijital çözümlerimiz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover border-amber-100 bg-white/80 backdrop-blur-sm animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-honey rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-amber-100">Takip Edilen Kovan</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-amber-100">Anlık İzleme</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-amber-100">Sistem Uptime</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-amber-100">Mutlu Arıcı</div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-amber-100 bg-white/80 backdrop-blur-sm card-hover animate-fade-in">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Güvenli ve Güvenilir</h3>
                <p className="text-gray-600">
                  Verileriniz şifreli olarak saklanır ve sadece yetkilendirilmiş kişiler erişebilir.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 bg-white/80 backdrop-blur-sm card-hover animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-6">
                <Smartphone className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mobil Uyumlu</h3>
                <p className="text-gray-600">
                  Responsive tasarım ile her cihazdan kolayca erişim sağlayın.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 bg-white/80 backdrop-blur-sm card-hover animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Akıllı Analiz</h3>
                <p className="text-gray-600">
                  Yapay zeka destekli analizler ile verimliliği artırın.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-honey rounded flex items-center justify-center">
                  <span className="text-lg">🐝</span>
                </div>
                <span className="text-xl font-bold">Akılları Kovanı</span>
              </div>
              <p className="text-gray-400">
                Modern arıcılık için dijital çözümler
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Özellikler</li>
                <li>Fiyatlandırma</li>
                <li>Demo</li>
                <li>API</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Hakkımızda</li>
                <li>İletişim</li>
                <li>Yardım</li>
                <li>Dokümantasyon</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Yasal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Gizlilik Politikası</li>
                <li>Kullanım Koşulları</li>
                <li>Çerez Politikası</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Akılları Kovanı. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
};

export default HomePage;
