
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Brain,
  BarChart3,
  MapPin,
  Bell,
  Users,
  Rocket,
  ChevronDown,
  Play,
  Star,
  Lightbulb
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'Akıllı Analiz',
      description: 'AI destekli veri analizi ile kovanlarınızın sağlığını öngörün',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MapPin,
      title: 'Gerçek Zamanlı Takip',
      description: 'GPS ile anlık konum ve hareket izleme sistemi',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Bell,
      title: 'Proaktif Uyarılar',
      description: 'Kritik durumları önceden tespit eden alarm sistemi',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Detaylı Raporlar',
      description: 'Kapsamlı analitik ve trend raporları',
      color: 'from-green-500 to-green-600'
    }
  ];

  const smartActions = [
    { icon: Rocket, label: 'Hızlı Başlat', action: () => navigate('/demo'), description: 'Demo ile keşfet' },
    { icon: Users, label: 'Giriş Yap', action: () => navigate('/'), description: 'Hesabına erişim' },
    { icon: Lightbulb, label: 'Öğren', action: () => navigate('/'), description: 'Nasıl çalışır?' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-100/10 to-yellow-100/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Smart Navigation */}
        <header className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-honey rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110">
                <span className="text-3xl">🐝</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 gradient-text-animation">Akılları Kovanı</h1>
                <p className="text-gray-600 font-medium">Yeni Nesil Arıcılık Platformu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {smartActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="group border-amber-200 text-amber-700 hover:bg-amber-50 transition-all duration-300 hover:scale-105"
                >
                  <action.icon className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Smart Feature Showcase */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-100">
            <div className="text-center mb-8">
              <Badge className="bg-gradient-honey text-white px-4 py-2 text-sm font-semibold mb-4 animate-pulse">
                <Sparkles className="h-4 w-4 mr-2" />
                Yapay Zeka Destekli
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Arıcılıkta <span className="text-transparent bg-clip-text gradient-honey">Devrim</span> Yaratıyoruz
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Modern sensör teknolojisi, yapay zeka analizi ve gerçek zamanlı takip ile arı kovanlarınızı koruyun
              </p>
            </div>

            {/* Interactive Feature Display */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-500 ${
                      currentFeature === index 
                        ? 'scale-105 shadow-xl bg-gradient-to-r from-white to-amber-50 border-amber-300' 
                        : 'hover:scale-102 hover:shadow-lg border-gray-200'
                    }`}
                    onClick={() => setCurrentFeature(index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg ${currentFeature === index ? 'animate-pulse' : ''}`}>
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                        {currentFeature === index && (
                          <ChevronDown className="h-5 w-5 text-amber-600 animate-bounce" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 shadow-inner">
                  <div className="text-center">
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${features[currentFeature].color} flex items-center justify-center text-white shadow-2xl animate-pulse`}>
                      {React.createElement(features[currentFeature].icon, { className: "h-12 w-12" })}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {features[currentFeature].title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {features[currentFeature].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Smart Action Center */}
        <section className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <Zap className="inline-block h-8 w-8 text-amber-500 mr-3" />
              Akıllı Eylem Merkezi
            </h2>
            <p className="text-lg text-gray-600">İhtiyacınıza göre en uygun aksiyonu seçin</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {smartActions.map((action, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-honey opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <action.icon className="h-8 w-8 text-amber-600 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {action.label}
                  </h3>
                  <p className="text-gray-600 mb-4">{action.description}</p>
                  <Button 
                    onClick={action.action}
                    className="w-full gradient-honey text-white hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                  >
                    Başla
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Demo CTA */}
        <section className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white via-amber-50/50 to-orange-50/50 border-amber-200 shadow-2xl overflow-hidden">
            <CardContent className="p-12">
              <div className="mb-8">
                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-sm font-semibold mb-6">
                  <Play className="h-4 w-4 mr-2" />
                  Canlı Demo Hazır
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Sistemi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">30 Dakika</span> Ücretsiz Deneyin
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Gerçek verilerle çalışan demo versiyonumuzla tüm özellikleri keşfedin. Kayıt gerektirmez!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/demo')}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 pulse-glow"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Demo'yu Başlat
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Güvenli • Kayıt Gerektirmez • Anında Erişim</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center space-x-8">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-600 font-medium">500+ Mutlu Kullanıcı</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
