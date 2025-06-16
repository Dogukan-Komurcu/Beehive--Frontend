
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronRight, 
  Home, 
  BarChart3, 
  MapPin, 
  Settings, 
  Users, 
  Bell, 
  Navigation, 
  Thermometer, 
  Sparkles,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface BreadcrumbItem {
  path: string;
  title: string;
  icon: React.ComponentType<any>;
  description?: string;
}

const SmartBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const pathMap: Record<string, BreadcrumbItem> = {
    '/': { path: '/', title: 'Ana Sayfa', icon: Home },
    '/demo': { path: '/demo', title: 'Demo Modu', icon: Sparkles, description: 'Ücretsiz deneme' },
    '/dashboard': { path: '/dashboard', title: 'Dashboard', icon: BarChart3, description: 'Genel bakış' },
    '/dashboard/hives': { path: '/dashboard/hives', title: 'Kovan Yönetimi', icon: MapPin, description: 'Kovanları yönet' },
    '/dashboard/map': { path: '/dashboard/map', title: 'Harita', icon: Navigation, description: 'Konum görünümü' },
    '/dashboard/sensors': { path: '/dashboard/sensors', title: 'Sensörler', icon: Thermometer, description: 'Veri analizi' },
    '/dashboard/alerts': { path: '/dashboard/alerts', title: 'Uyarılar', icon: Bell, description: 'Bildirimler' },
    '/dashboard/users': { path: '/dashboard/users', title: 'Kullanıcılar', icon: Users, description: 'Kullanıcı yönetimi' },
    '/dashboard/settings': { path: '/dashboard/settings', title: 'Ayarlar', icon: Settings, description: 'Sistem ayarları' }
  };

  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Always add home if not on home page
    if (location.pathname !== '/') {
      breadcrumbs.push(pathMap['/']);
    }
    
    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      if (pathMap[currentPath]) {
        breadcrumbs.push(pathMap[currentPath]);
      }
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();
  const currentPage = pathMap[location.pathname];

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 min-w-0">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 px-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <nav className="flex items-center space-x-2 min-w-0">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                const IconComponent = crumb.icon;
                
                return (
                  <React.Fragment key={crumb.path}>
                    {index > 0 && (
                      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    )}
                    
                    <div className="flex items-center space-x-1 min-w-0">
                      {isLast ? (
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-2 rounded-lg border border-amber-200">
                          <IconComponent className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <span className="font-medium text-gray-900 truncate">
                            {crumb.title}
                          </span>
                          {crumb.description && (
                            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 flex-shrink-0">
                              {crumb.description}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <Button
                          onClick={() => navigate(crumb.path)}
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1 text-gray-600 hover:text-amber-700 hover:bg-amber-50 px-2 py-1 rounded-md transition-colors duration-200"
                        >
                          <IconComponent className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{crumb.title}</span>
                        </Button>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </nav>
          </div>

          {/* Quick Info */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {user && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">
                  {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                </span>
              </div>
            )}
            
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        {/* Page Description */}
        {currentPage?.description && (
          <div className="mt-2 text-sm text-gray-600">
            <p>{currentPage.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartBreadcrumb;
