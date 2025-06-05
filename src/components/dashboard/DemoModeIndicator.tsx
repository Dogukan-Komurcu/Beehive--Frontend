
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, Clock, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DemoModeIndicator = () => {
  const { isDemoMode, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!isDemoMode) return null;

  const handleRegister = () => {
    logout();
    navigate('/');
    toast({
      title: "Demo Modundan Çıkıldı",
      description: "Kayıt olmak için ana sayfaya yönlendirildiniz.",
    });
  };

  return (
    <div className="space-y-3">
      {/* Top Bar Indicator */}
      <Alert className="border-amber-200 bg-amber-50">
        <Eye className="h-4 w-4 text-amber-600" />
        <AlertDescription className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
              🧪 DEMO MODU
            </Badge>
            <span className="text-amber-700">
              Veriler sadece görüntülenebilir. Düzenleme yapılamaz.
            </span>
            <div className="flex items-center text-amber-600 text-sm">
              <Clock className="h-3 w-3 mr-1" />
              <span>30 dakika oturum</span>
            </div>
          </div>
          <Button 
            size="sm" 
            onClick={handleRegister}
            className="gradient-honey text-white hover:shadow-md"
          >
            <UserPlus className="h-3 w-3 mr-1" />
            Kayıt Ol
          </Button>
        </AlertDescription>
      </Alert>

      {/* CTA Banner */}
      <Alert className="border-green-200 bg-green-50">
        <AlertDescription className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-green-700">
              🎉 Beğendiniz mi? Tam özellikli hesap için hemen kayıt olun!
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRegister}
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              ➡️ Hemen Kayıt Ol
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
