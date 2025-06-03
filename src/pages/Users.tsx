
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, Users as UsersIcon, Shield, User } from 'lucide-react';

const Users = () => {
  const users = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      lastActive: '2 dakika önce',
      status: 'online'
    },
    {
      id: 2,
      name: 'Fatma Demir',
      email: 'fatma@example.com',
      role: 'observer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      lastActive: '1 saat önce',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      role: 'observer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      lastActive: '3 saat önce',
      status: 'offline'
    },
    {
      id: 4,
      name: 'Ayşe Özkan',
      email: 'ayse@example.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      lastActive: '1 gün önce',
      status: 'offline'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kullanıcılar</h1>
          <p className="text-gray-600">Sistem kullanıcıları ve yetkilendirme</p>
        </div>
        <Button className="gradient-honey text-white">
          <UserPlus className="mr-2 h-4 w-4" />
          Yeni Kullanıcı Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                <p className="text-3xl font-bold text-gray-900">{users.length}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Yöneticiler</p>
                <p className="text-3xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gözlemciler</p>
                <p className="text-3xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'observer').length}
                </p>
              </div>
              <User className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={user.role === 'admin' ? 'default' : 'secondary'}
                        className={user.role === 'admin' ? 'bg-amber-100 text-amber-800' : ''}
                      >
                        {user.role === 'admin' ? 'Yönetici' : 'Gözlemci'}
                      </Badge>
                      <Badge 
                        variant={user.status === 'online' ? 'default' : 'secondary'}
                        className={user.status === 'online' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {user.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{user.lastActive}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Düzenle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
