
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Command,
  Search,
  Home,
  BarChart3,
  MapPin,
  Settings,
  Users,
  Bell,
  Navigation,
  Thermometer,
  Sparkles,
  ChevronRight,
  Clock,
  Star
} from 'lucide-react';

interface NavigationItem {
  path: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  keywords: string[];
  category: 'dashboard' | 'management' | 'analysis' | 'system';
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

const SmartNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<NavigationItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const navigationItems: NavigationItem[] = [
    {
      path: '/',
      title: 'Ana Sayfa',
      description: 'Hoş geldin sayfası ve genel bilgiler',
      icon: Home,
      keywords: ['ana', 'home', 'anasayfa', 'başlangıç'],
      category: 'dashboard'
    },
    {
      path: '/dashboard',
      title: 'Dashboard',
      description: 'Genel bakış ve önemli metrikleri görün',
      icon: BarChart3,
      keywords: ['dashboard', 'panel', 'özet', 'genel', 'bakış'],
      category: 'dashboard',
      requiresAuth: true
    },
    {
      path: '/dashboard/hives',
      title: 'Kovan Yönetimi',
      description: 'Kovanlarınızı yönetin ve düzenleyin',
      icon: MapPin,
      keywords: ['kovan', 'hive', 'yönetim', 'ekle', 'düzenle'],
      category: 'management',
      requiresAuth: true
    },
    {
      path: '/dashboard/map',
      title: 'Harita Görünümü',
      description: 'Kovanlarınızı harita üzerinde görün',
      icon: Navigation,
      keywords: ['harita', 'map', 'konum', 'gps', 'lokasyon'],
      category: 'analysis',
      requiresAuth: true
    },
    {
      path: '/dashboard/sensors',
      title: 'Sensör Verileri',
      description: 'Detaylı sensör analizi ve geçmiş',
      icon: Thermometer,
      keywords: ['sensör', 'sensor', 'veri', 'sıcaklık', 'nem', 'analiz'],
      category: 'analysis',
      requiresAuth: true
    },
    {
      path: '/dashboard/alerts',
      title: 'Uyarılar',
      description: 'Sistem uyarıları ve bildirimler',
      icon: Bell,
      keywords: ['uyarı', 'alert', 'bildirim', 'alarm'],
      category: 'system',
      requiresAuth: true
    },
    {
      path: '/dashboard/users',
      title: 'Kullanıcı Yönetimi',
      description: 'Kullanıcıları yönetin (Admin)',
      icon: Users,
      keywords: ['kullanıcı', 'user', 'admin', 'yönetim'],
      category: 'system',
      requiresAuth: true,
      adminOnly: true
    },
    {
      path: '/dashboard/settings',
      title: 'Sistem Ayarları',
      description: 'Uygulama ayarları ve yapılandırma',
      icon: Settings,
      keywords: ['ayar', 'settings', 'yapılandırma', 'config'],
      category: 'system',
      requiresAuth: true
    },
    {
      path: '/demo',
      title: 'Demo Modu',
      description: 'Sistemi ücretsiz deneyin',
      icon: Sparkles,
      keywords: ['demo', 'deneme', 'test', 'örnek'],
      category: 'dashboard'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredItems(navigationItems.filter(item => {
        if (item.requiresAuth && !user) return false;
        if (item.adminOnly && user?.role !== 'admin') return false;
        return true;
      }));
    } else {
      const filtered = navigationItems.filter(item => {
        if (item.requiresAuth && !user) return false;
        if (item.adminOnly && user?.role !== 'admin') return false;
        
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.keywords.some(keyword => keyword.includes(query))
        );
      });
      setFilteredItems(filtered);
    }
    setSelectedIndex(0);
  }, [searchQuery, user]);

  const handleSelect = (item: NavigationItem) => {
    navigate(item.path);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  const categoryLabels = {
    dashboard: 'Dashboard',
    management: 'Yönetim',
    analysis: 'Analiz',
    system: 'Sistem'
  };

  const categoryColors = {
    dashboard: 'from-blue-500 to-blue-600',
    management: 'from-green-500 to-green-600',
    analysis: 'from-purple-500 to-purple-600',
    system: 'from-orange-500 to-orange-600'
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-50 border-amber-200 text-amber-700 hover:bg-amber-50 backdrop-blur-sm bg-white/80"
      >
        <Search className="h-4 w-4 mr-2" />
        Hızlı Arama
        <Badge variant="secondary" className="ml-2 text-xs">⌘K</Badge>
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-0">
          {/* Search Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Sayfa ara... (örn: kovan, harita, sensör)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyNavigation}
                className="flex-1 text-lg outline-none bg-transparent"
                autoFocus
              />
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-600"
              >
                ESC
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Sonuç bulunamadı</p>
                <p className="text-sm">Farklı anahtar kelimeler deneyin</p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {Object.entries(
                  filteredItems.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = [];
                    acc[item.category].push(item);
                    return acc;
                  }, {} as Record<string, NavigationItem[]>)
                ).map(([category, items]) => (
                  <div key={category}>
                    <div className="px-3 py-2">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </h3>
                    </div>
                    {items.map((item, index) => {
                      const globalIndex = filteredItems.indexOf(item);
                      const isSelected = globalIndex === selectedIndex;
                      const isCurrent = location.pathname === item.path;
                      
                      return (
                        <div
                          key={item.path}
                          onClick={() => handleSelect(item)}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${categoryColors[item.category]} flex items-center justify-center text-white shadow-sm`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              {isCurrent && (
                                <Badge variant="secondary" className="text-xs">Mevcut</Badge>
                              )}
                              {item.adminOnly && (
                                <Badge className="bg-red-100 text-red-700 text-xs">Admin</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 truncate">{item.description}</p>
                          </div>
                          <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isSelected ? 'translate-x-1' : ''}`} />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">↑↓</kbd>
                  <span className="ml-1">Gezin</span>
                </span>
                <span className="flex items-center">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Enter</kbd>
                  <span className="ml-1">Seç</span>
                </span>
                <span className="flex items-center">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">ESC</kbd>
                  <span className="ml-1">Kapat</span>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-amber-400" />
                <span>Akıllı Navigasyon</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartNavigation;
