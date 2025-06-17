
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Search, Settings, User, LogOut, Clock, Calendar } from 'lucide-react';
import { NotificationsDropdown } from './NotificationsDropdown';
import { HiveSearchModal } from './HiveSearchModal';

export const Header = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHiveSearch, setShowHiveSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowHiveSearch(true);
  };

  const currentTime = new Date().toLocaleTimeString('tr-TR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const currentDate = new Date().toLocaleDateString('tr-TR', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 relative shadow-sm">
      <div className="flex items-center justify-between">
        {/* Search Bar & Time Info */}
        <div className="flex items-center space-x-6 flex-1">
          <div className="flex-1 max-w-md">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Kovan ara... (⌘K ile hızlı arama)"
                  className="pl-12 pr-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border-gray-200/50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-300 cursor-pointer rounded-2xl shadow-sm"
                  onClick={() => setShowHiveSearch(true)}
                  readOnly
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                    ⌘K
                  </Badge>
                </div>
              </div>
            </form>
          </div>

          {/* Date & Time Display */}
          <div className="hidden lg:flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-2xl border border-blue-200/50">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">
                {currentDate}
              </span>
            </div>
            <div className="w-px h-4 bg-blue-300"></div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700 tabular-nums">
                {currentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Notifications & User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative h-11 w-11 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 border border-orange-200/50 transition-all duration-300"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5 text-orange-600" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-600 border-2 border-white shadow-lg animate-pulse"
              >
                3
              </Badge>
            </Button>
            <NotificationsDropdown 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)}
            />
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 px-4 py-2 h-12 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-amber-50 hover:to-orange-50 border border-gray-200/50 hover:border-amber-200/50 transition-all duration-300 group">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : ''}
                  </span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize group-hover:text-amber-600 transition-colors">
                    {user?.role === 'admin' ? 'Yönetici' : 'Gözlemci'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-2xl p-2">
              <div className="px-3 py-3 border-b border-gray-200/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : ''}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role === 'admin' ? 'Yönetici' : 'Gözlemci'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <DropdownMenuItem className="rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200">
                  <User className="mr-3 h-4 w-4 text-blue-500" />
                  <div>
                    <div className="font-medium">Profilim</div>
                    <div className="text-xs text-gray-500">Kişisel bilgilerimi düzenle</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200">
                  <Settings className="mr-3 h-4 w-4 text-purple-500" />
                  <div>
                    <div className="font-medium">Ayarlarım</div>
                    <div className="text-xs text-gray-500">Uygulama tercihlerim</div>
                  </div>
                </DropdownMenuItem>
              </div>
              
              <DropdownMenuSeparator className="bg-gray-200/50" />
              
              <div className="py-2">
                <DropdownMenuItem 
                  onClick={logout} 
                  className="rounded-xl text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-200"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <div>
                    <div className="font-medium">Çıkış Yap</div>
                    <div className="text-xs text-red-400">Güvenli çıkış</div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Hive Search Modal */}
      <HiveSearchModal 
        isOpen={showHiveSearch}
        onClose={() => setShowHiveSearch(false)}
      />
    </header>
  );
};
