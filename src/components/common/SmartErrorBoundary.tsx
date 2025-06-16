
import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Mail,
  Lightbulb,
  Shield
} from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class SmartErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error for debugging
    console.error('SmartErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-200/30 to-orange-200/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <Card className="relative z-10 max-w-2xl w-full bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8">
              {/* Error Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>
                
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold mb-4">
                  <Bug className="h-4 w-4 mr-2" />
                  Beklenmeyen Hata
                </Badge>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Bir Şeyler <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Ters Gitti</span>
                </h1>
                
                <p className="text-lg text-gray-600 mb-6">
                  Uygulama beklenmeyen bir hatayla karşılaştı. Endişelenmeyin, bu durum geçicidir.
                </p>
              </div>

              {/* Error Details (Development Mode) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                    <Bug className="h-4 w-4 mr-2" />
                    Geliştirici Bilgisi
                  </h3>
                  <pre className="text-xs text-red-700 bg-red-100 p-3 rounded overflow-auto max-h-32">
                    {this.state.error.toString()}
                  </pre>
                </div>
              )}

              {/* Smart Solutions */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-amber-600" />
                  Akıllı Çözümler
                </h2>
                
                <div className="grid gap-3">
                  <Button
                    onClick={this.handleRetry}
                    className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Yeniden Dene
                    <span className="ml-auto text-sm opacity-80">Önerilen</span>
                  </Button>
                  
                  <Button
                    onClick={this.handleReload}
                    variant="outline"
                    className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sayfayı Yenile
                    <span className="ml-auto text-sm opacity-60">Alternatif</span>
                  </Button>
                  
                  <Button
                    onClick={this.handleGoHome}
                    variant="outline"
                    className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Ana Sayfaya Dön
                    <span className="ml-auto text-sm opacity-60">Güvenli</span>
                  </Button>
                </div>
              </div>

              {/* Help Section */}
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-amber-600" />
                  Sorun Devam Ediyor mu?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Bu hata devam ederse, lütfen bizimle iletişime geçin. Teknik ekibimiz sorunu çözmek için burada.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('mailto:support@akillarikovan.com', '_blank')}
                    className="border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Destek Ekibi
                  </Button>
                  <Badge className="bg-amber-100 text-amber-700 px-3 py-1">
                    24/7 Destek
                  </Badge>
                </div>
              </div>

              {/* Footer Info */}
              <div className="mt-6 text-center text-xs text-gray-500">
                <p>Hata ID: {Date.now()}</p>
                <p className="mt-1">Bu bilgiyi destek ekibiyle paylaşabilirsiniz</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SmartErrorBoundary;
