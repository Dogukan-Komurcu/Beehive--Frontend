
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
  Layers
} from 'lucide-react';

const menuItems = [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    roles: ['admin', 'observer']
  },
  {
    label: 'Kovanlar',
    icon: Layers,
    path: '/dashboard/hives',
    roles: ['admin', 'observer']
  },
  {
    label: 'Harita',
    icon: Map,
    path: '/dashboard/map',
    roles: ['admin', 'observer']
  },
  {
    label: 'Grafikler',
    icon: BarChart3,
    path: '/dashboard/analytics',
    roles: ['admin', 'observer']
  },
  {
    label: 'Uyarılar',
    icon: Bell,
    path: '/dashboard/alerts',
    roles: ['admin', 'observer']
  },
  {
    label: 'Kullanıcılar',
    icon: Users,
    path: '/dashboard/users',
    roles: ['admin']
  },
  {
    label: 'Ayarlar',
    icon: Settings,
    path: '/dashboard/settings',
    roles: ['admin', 'observer']
  }
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'observer')
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-honey rounded-lg flex items-center justify-center">
            <span className="text-2xl">🐝</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Akılları Kovanı</h1>
            <p className="text-sm text-gray-500">v2.0</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200 bg-amber-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-honey rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role === 'admin' ? 'Yönetici' : 'Gözlemci'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full justify-start h-10 text-left font-medium transition-all duration-200",
                isActive 
                  ? "bg-amber-100 text-amber-700 border-r-2 border-amber-500" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start h-10 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </div>
  );
};
