
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Crown } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

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
        description: "Giriş yapıldı. Dashboard'a yönlendiriliyorsunuz...",
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            <span className="mr-2">🐝</span>
            Giriş Yap
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              placeholder="arici@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="text-right">
            <Button variant="link" className="text-sm text-amber-600 p-0">
              Şifremi unuttum
            </Button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full gradient-honey text-white" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Giriş yapılıyor...
              </>
            ) : (
              'Giriş Yap'
            )}
          </Button>
          
          <div className="text-center text-sm text-gray-600">
            Hesabınız yok mu?{' '}
            <Button variant="link" className="text-amber-600 p-0" onClick={onClose}>
              Kayıt ol
            </Button>
          </div>
          
          <div className="border-t pt-4 space-y-3">
            <Button
              type="button"
              onClick={handleAdminLogin}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading}
            >
              <Crown className="mr-2 h-4 w-4" />
              Admin Girişi
            </Button>
            
            <div className="text-xs text-gray-500 bg-amber-50 p-3 rounded">
              <strong>Test için:</strong><br />
              <strong className="text-red-600">Admin:</strong> sudolens@gmail.com (Şifre: 123456)<br />
              Normal: admin@test.com / user@test.com<br />
              Şifre: herhangi bir şifre
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
