
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Bell,
  Home,
  Map,
  Settings,
  Users,
  LogOut,
  Layers,
  Eye,
  Activity
} from 'lucide-react';

const menuItems = [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    roles: ['admin', 'observer', 'demo'],
    description: 'Genel bakış'
  },
  {
    label: 'Kovanlar',
    icon: Layers,
    path: '/dashboard/hives',
    roles: ['admin', 'observer', 'demo'],
    description: 'Kovan yönetimi'
  },
  {
    label: 'Harita',
    icon: Map,
    path: '/dashboard/map',
    roles: ['admin', 'observer', 'demo'],
    description: 'Harita görünümü'
  },
  {
    label: 'Grafikler',
    icon: BarChart3,
    path: '/dashboard/analytics',
    roles: ['admin', 'observer', 'demo'],
    description: 'Analitik & grafikler'
  },
  {
    label: 'Uyarılar',
    icon: Bell,
    path: '/dashboard/alerts',
    roles: ['admin', 'observer', 'demo'],
    description: 'Sistem uyarıları'
  },
  {
    label: 'Sensörler',
    icon: Activity,
    path: '/dashboard/sensors',
    roles: ['admin', 'observer', 'demo'],
    description: 'Sensör yönetimi'
  },
  {
    label: 'Kullanıcılar',
    icon: Users,
    path: '/dashboard/users',
    roles: ['admin'],
    description: 'Kullanıcı yönetimi'
  },
  {
    label: 'Ayarlar',
    icon: Settings,
    path: '/dashboard/settings',
    roles: ['admin', 'observer'],
    description: 'Sistem ayarları'
  }
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isDemoMode } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'observer')
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleDisplayName = (role?: string) => {
    switch (role) {
      case 'admin': return 'Yönetici';
      case 'observer': return 'Gözlemci';
      case 'demo': return 'Demo Kullanıcı';
      default: return 'Gözlemci';
    }
  };

  return (
    <div className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col h-screen shadow-xl">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🐝</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Akıllı Kovanı
            </h1>
            <p className="text-sm text-gray-500 font-medium">v2.0 - Profesyonel</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className={cn(
        "p-4 border-b border-gray-200/50",
        isDemoMode 
          ? "bg-gradient-to-r from-blue-50 to-cyan-50" 
          : "bg-gradient-to-r from-amber-50 to-orange-50"
      )}>
        <div className="flex items-center space-x-4">
          <div className={cn(
            "w-10 h-10 rounded-2xl flex items-center justify-center shadow-md",
            isDemoMode 
              ? "bg-gradient-to-br from-blue-500 to-cyan-600" 
              : "bg-gradient-to-br from-amber-500 to-orange-600"
          )}>
            {isDemoMode ? (
              <Eye className="h-5 w-5 text-white" />
            ) : (
              <span className="text-white text-sm font-bold">
                {user?.name ? user.name.charAt(0).toUpperCase() : ''}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.name}
            </p>
            <p className={cn(
              "text-xs font-medium capitalize",
              isDemoMode ? "text-blue-600" : "text-amber-600"
            )}>
              {getRoleDisplayName(user?.role)}
            </p>
          </div>
          <div className={cn(
            "w-2 h-2 rounded-full animate-pulse",
            isDemoMode ? "bg-blue-500" : "bg-green-500"
          )}></div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="space-y-1">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full justify-start h-12 text-left font-medium transition-all duration-300 group relative overflow-hidden",
                  isActive 
                    ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 shadow-md border-r-4 border-amber-500" 
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex items-center space-x-3 relative z-10">
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                    isActive 
                      ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg" 
                      : "bg-gray-200 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-orange-500"
                  )}>
                    <Icon className={cn(
                      "h-4 w-4 transition-colors duration-300",
                      isActive ? "text-white" : "text-gray-600 group-hover:text-white"
                    )} />
                  </div>
                  <div className="flex-1">
                    <span className="block font-semibold">{item.label}</span>
                    <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                      {item.description}
                    </span>
                  </div>
                </div>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 animate-pulse"></div>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-gray-200/50">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-700">Sistem Durumu</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-600">Aktif</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Bağlantı</span>
              <span className="font-medium text-green-600">%98</span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-full rounded-full animate-pulse" style={{width: '98%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200/50">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start h-12 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-pink-600 flex items-center justify-center transition-all duration-300">
              <LogOut className="h-4 w-4 text-red-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
              <span className="font-semibold">
                {isDemoMode ? 'Demo\'dan Çık' : 'Çıkış Yap'}
              </span>
              <div className="text-xs text-red-500 group-hover:text-red-600">
                Güvenli çıkış
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};
