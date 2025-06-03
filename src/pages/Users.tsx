
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  UserPlus, 
  Users as UsersIcon, 
  Shield, 
  User, 
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Crown,
  Eye
} from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '+90 532 123 4567',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      lastActive: '2 dakika önce',
      status: 'online',
      joinDate: '15 Mart 2024',
      location: 'Ankara, Türkiye',
      hivesManaged: 12
    },
    {
      id: 2,
      name: 'Fatma Demir',
      email: 'fatma@example.com',
      phone: '+90 532 987 6543',
      role: 'observer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      lastActive: '1 saat önce',
      status: 'offline',
      joinDate: '8 Nisan 2024',
      location: 'İstanbul, Türkiye',
      hivesManaged: 6
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      phone: '+90 532 456 7890',
      role: 'observer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      lastActive: '3 saat önce',
      status: 'offline',
      joinDate: '22 Şubat 2024',
      location: 'İzmir, Türkiye',
      hivesManaged: 8
    },
    {
      id: 4,
      name: 'Ayşe Özkan',
      email: 'ayse@example.com',
      phone: '+90 532 321 6547',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      lastActive: '1 gün önce',
      status: 'offline',
      joinDate: '5 Ocak 2024',
      location: 'Antalya, Türkiye',
      hivesManaged: 15
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-nature p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              👥 Kullanıcı Yönetimi
              <span className="ml-3 text-2xl bee-float">🐝</span>
            </h1>
            <p className="text-lg opacity-90">Sistem kullanıcıları ve yetkilendirme</p>
          </div>
          <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
            <UserPlus className="mr-2 h-5 w-5" />
            Yeni Kullanıcı Ekle
          </Button>
        </div>
        <div className="absolute -bottom-4 -right-4 text-6xl opacity-20">👨‍💼</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-premium card-hover animate-fade-in-delay group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                  {users.length}
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium card-hover animate-fade-in-delay group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Yöneticiler</p>
                <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <div className="gradient-honey p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Crown className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium card-hover animate-fade-in-delay group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gözlemciler</p>
                <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                  {users.filter(u => u.role === 'observer').length}
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium card-hover animate-fade-in-delay group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktif Kullanıcı</p>
                <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                  {users.filter(u => u.status === 'online').length}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card className="card-premium">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
            <div className="flex space-x-2">
              {[
                { value: 'all', label: 'Tümü' },
                { value: 'admin', label: 'Yöneticiler' },
                { value: 'observer', label: 'Gözlemciler' }
              ].map((filter) => (
                <Button
                  key={filter.value}
                  size="sm"
                  variant={selectedRole === filter.value ? "default" : "outline"}
                  onClick={() => setSelectedRole(filter.value)}
                  className={selectedRole === filter.value ? "gradient-honey text-white" : ""}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="card-premium card-hover animate-fade-in-delay-2">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <UsersIcon className="mr-3 h-6 w-6 text-blue-600" />
            Kullanıcı Listesi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user, index) => (
              <div 
                key={user.id}
                className="p-6 bg-gradient-to-r from-white to-gray-50/50 rounded-xl border-2 border-gray-100 hover:border-amber-200 transition-all duration-500 animate-slide-in-up hover-scale group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="gradient-honey text-white text-lg font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`}></div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                          {user.name}
                        </h4>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-1" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-1" />
                            <span className="text-sm">{user.phone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {user.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {user.joinDate}
                        </div>
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-1" />
                          {user.hivesManaged} Kovan
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={user.role === 'admin' 
                            ? 'gradient-honey text-white border-0' 
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                          }
                        >
                          {user.role === 'admin' ? (
                            <><Crown className="w-3 h-3 mr-1" /> Yönetici</>
                          ) : (
                            <><Eye className="w-3 h-3 mr-1" /> Gözlemci</>
                          )}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={user.status === 'online' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                          }
                        >
                          {user.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{user.lastActive}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:border-blue-300">
                        <Edit className="w-4 h-4 mr-1" />
                        Düzenle
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-red-50 hover:border-red-300 text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Aradığınız kriterlere uygun kullanıcı bulunamadı</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
