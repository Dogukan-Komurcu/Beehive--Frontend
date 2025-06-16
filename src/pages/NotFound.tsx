
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  MapPin, 
  Lightbulb,
  Navigation,
  BarChart3,
  Settings,
  Users,
  AlertCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const smartSuggestions = [
    { 
      path: '/dashboard', 
      title: 'Ana Dashboard', 
      icon: BarChart3, 
      description: 'Kovan verilerinize genel bakış',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      path: '/dashboard/hives', 
      title: 'Kovan Yönetimi', 
      icon: MapPin, 
      description: 'Kovanlarınızı yönetin',
      color: 'from-green-500 to-green-600'
    },
    { 
      path: '/dashboard/map', 
      title: 'Harita Görünümü', 
      icon: Navigation, 
      description: 'Kovanları haritada görün',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      path: '/dashboard/sensors', 
      title: 'Sensör Verileri', 
      icon: Settings, 
      description: 'Detaylı sensör analizi',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      path: '/demo', 
      title: 'Demo Modu', 
      icon: Sparkles, 
      description: 'Sistemi ücretsiz deneyin',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const quickActions = [
    { 
      label: 'Ana Sayfaya Dön', 
      action: () => navigate('/'), 
      icon: Home, 
      primary: true 
    },
    { 
      label: 'Geri Git', 
      action: () => navigate(-1), 
      icon: ArrowLeft, 
      primary: false 
    },
    { 
      label: 'Sayfayı Yenile', 
      action: () => window.location.reload(), 
      icon: RefreshCw, 
      primary: false 
    }
  ];

  const handleSmartSearch = () => {
    const query = searchQuery.toLowerCase();
    const matchingSuggestion = smartSuggestions.find(s => 
      s.title.toLowerCase().includes(query) || 
      s.description.toLowerCase().includes(query)
    );
    
    if (matchingSuggestion) {
      navigate(matchingSuggestion.path);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-200/30 to-orange-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className={`relative z-10 max-w-4xl w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Card className="text-center bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-12">
            {/* Error Display */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🐝</span>
              </div>
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-lg font-semibold mb-6">
                <AlertCircle className="h-5 w-5 mr-2" />
                404 - Sayfa Bulunamadı
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Aradığınız Sayfa <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Kaybolmuş</span>
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                <code className="bg-gray-100 px-3 py-1 rounded text-red-600 font-mono text-sm">
                  {location.pathname}
                </code>
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Bu sayfa mevcut değil veya taşınmış olabilir. Size yardımcı olalım!
              </p>
            </div>

            {/* Smart Search */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-center">
                <Search className="h-5 w-5 mr-2 text-amber-600" />
                Akıllı Arama
              </h2>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Ne arıyorsunuz? (örn: kovan, harita, sensör)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSmartSearch()}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <Button 
                  onClick={handleSmartSearch}
                  className="gradient-honey text-white px-6 hover:shadow-lg transition-all duration-300"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-600" />
                Hızlı İşlemler
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.action}
                    variant={action.primary ? "default" : "outline"}
                    size="lg"
                    className={`transition-all duration-300 hover:scale-105 ${
                      action.primary 
                        ? 'gradient-honey text-white shadow-lg hover:shadow-xl' 
                        : 'border-amber-200 text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Smart Suggestions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center justify-center">
                <Navigation className="h-5 w-5 mr-2 text-amber-600" />
                Önerilen Sayfalar
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {smartSuggestions.map((suggestion, index) => (
                  <Card 
                    key={index}
                    className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
                    onClick={() => navigate(suggestion.path)}
                  >
                    <div className={`h-1 bg-gradient-to-r ${suggestion.color}`}></div>
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${suggestion.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <suggestion.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                        {suggestion.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {suggestion.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full text-amber-600 hover:text-amber-700 hover:bg-amber-50 font-medium"
                      >
                        Sayfaya Git →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-center">
                <Users className="h-5 w-5 mr-2 text-amber-600" />
                Hala Yardıma İhtiyacınız Var mı?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Aradığınızı bulamadıysanız, ana sayfaya dönüp navigasyonu kullanabilir veya demo modunu deneyebilirsiniz.
              </p>
              <Button 
                onClick={() => navigate('/demo')}
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Demo Modunu Dene
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
