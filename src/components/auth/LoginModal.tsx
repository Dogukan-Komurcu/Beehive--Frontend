
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Crown, Mail, Lock, Eye, EyeOff, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const redirected = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!open && user && !redirected.current) {
      redirected.current = true;
      if (user.role === 'admin') {
        navigate('/dashboard/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
    if (open) redirected.current = false;
    // eslint-disable-next-line
  }, [user, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    try {
      await login(email, password);
      toast({
        title: "Başarılı!",
        description: "Giriş yapıldı. Yönlendiriliyorsunuz...",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Giriş Hatası",
        description: "E-posta veya şifre hatalı.",
        variant: "destructive"
      });
    }
  };

  const handleAdminLogin = () => {
    setEmail('sudolens@gmail.com');
    setPassword('123456');
  };

  const handleUserLogin = () => {
    setEmail('user@test.com');
    setPassword('123456');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg overflow-hidden p-0 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/50 border-amber-200/50">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-honey text-white p-8 pb-12">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <DialogTitle className="text-center text-3xl font-bold mb-2">
              <span className="text-4xl mr-3">🐝</span>
              Hoş Geldiniz
            </DialogTitle>
            <p className="text-center text-amber-100 font-medium">
              Akılları Kovanı Dijital Takip Sistemi
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 opacity-30">
            <div className="text-2xl bee-float">🍯</div>
          </div>
          <div className="absolute bottom-2 left-4 opacity-20">
            <div className="text-xl bee-float" style={{animationDelay: '1s'}}>🌻</div>
          </div>
        </div>

        <div className="p-8 pt-0 -mt-6 relative z-20">
          {/* Login form card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-600" />
                  E-posta Adresi
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="arici@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-12 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-amber-600" />
                  Şifre
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-12 pr-12 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <Button variant="link" className="text-sm text-amber-600 p-0 hover:text-amber-700">
                  Şifremi unuttum
                </Button>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold gradient-honey text-white hover:shadow-xl transition-all duration-300 pulse-glow" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Güvenli Giriş
                  </>
                )}
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-600 mt-6">
              Hesabınız yok mu?{' '}
              <Button variant="link" className="text-amber-600 p-0 font-semibold hover:text-amber-700" onClick={onClose}>
                Hemen kayıt olun
              </Button>
            </div>
          </div>
          
          {/* Quick login options */}
          <div className="mt-6 space-y-4">
            <div className="text-center text-sm font-medium text-gray-600 mb-4">
              ⚡ Hızlı Giriş Seçenekleri
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={handleAdminLogin}
                className="h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                <Crown className="mr-2 h-4 w-4" />
                Admin Girişi
              </Button>
              
              <Button
                type="button"
                onClick={handleUserLogin}
                className="h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                <User className="mr-2 h-4 w-4" />
                Kullanıcı Girişi
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200/50">
              <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg">🔐</span>
                Test Hesapları
              </div>
              <div className="space-y-1">
                <div><strong className="text-red-600">Admin:</strong> sudolens@gmail.com (Şifre: 123456)</div>
                <div><strong className="text-blue-600">Kullanıcı:</strong> admin@test.com / user@test.com (Herhangi bir şifre)</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
