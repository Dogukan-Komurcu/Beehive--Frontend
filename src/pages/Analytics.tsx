
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity, 
  Zap, 
  Target,
  Calendar,
  Download,
  RefreshCw,
  Filter
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const metrics = [
    { 
      title: 'Haftalık Verim', 
      value: '+12.5%', 
      change: '+2.3%',
      icon: TrendingUp, 
      color: 'bg-green-500',
      trend: 'up',
      description: 'Geçen haftaya göre'
    },
    { 
      title: 'Ortalama Sıcaklık', 
      value: '34.2°C', 
      change: '+1.2°C',
      icon: Activity, 
      color: 'bg-orange-500',
      trend: 'up',
      description: 'Optimal aralıkta'
    },
    { 
      title: 'Nem Oranı', 
      value: '68%', 
      change: '-3%',
      icon: BarChart3, 
      color: 'bg-blue-500',
      trend: 'down',
      description: 'İdeal seviyede'
    },
    { 
      title: 'Aktiflik Oranı', 
      value: '87%', 
      change: '+5%',
      icon: Zap, 
      color: 'bg-purple-500',
      trend: 'up',
      description: 'Yüksek performans'
    },
  ];

  const performanceData = [
    { name: 'Kovan 1', health: 95, productivity: 88, issues: 1 },
    { name: 'Kovan 2', health: 78, productivity: 65, issues: 3 },
    { name: 'Kovan 3', health: 92, productivity: 91, issues: 0 },
    { name: 'Kovan 4', health: 45, productivity: 23, issues: 8 },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-royal p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                📊 Analitik Dashboard
                <span className="ml-3 text-2xl bee-float">🐝</span>
              </h1>
              <p className="text-lg opacity-90">Detaylı veri analizi ve performans raporları</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Yenile
              </Button>
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Download className="w-4 h-4 mr-2" />
                Rapor Al
              </Button>
            </div>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex space-x-2">
            {['day', 'week', 'month', 'year'].map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? "default" : "outline"}
                className={timeRange === range 
                  ? "bg-white text-purple-600 hover:bg-white/90" 
                  : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                }
                onClick={() => setTimeRange(range)}
              >
                {range === 'day' ? 'Günlük' : 
                 range === 'week' ? 'Haftalık' : 
                 range === 'month' ? 'Aylık' : 'Yıllık'}
              </Button>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 text-8xl opacity-10">📈</div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="card-premium card-hover animate-fade-in-delay group data-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                    {metric.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <Badge 
                      variant="outline" 
                      className={`${metric.trend === 'up' ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'} text-xs`}
                    >
                      {metric.change}
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">{metric.description}</span>
                  </div>
                </div>
                <div className={`${metric.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 status-indicator`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              {/* Mini progress indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Bu {timeRange === 'day' ? 'gün' : timeRange === 'week' ? 'hafta' : timeRange === 'month' ? 'ay' : 'yıl'}</span>
                  <span>{metric.trend === 'up' ? '↗️' : '↘️'}</span>
                </div>
                <Progress 
                  value={Math.abs(parseFloat(metric.change))} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-premium card-hover animate-slide-in-left">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-xl">
                <BarChart3 className="mr-3 h-6 w-6 text-blue-600" />
                Aylık Performans Trendi
              </CardTitle>
              <Button size="sm" variant="outline" className="hover:bg-blue-50">
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center animate-zoom-in">
                <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4 hover-scale" />
                <p className="text-gray-600 font-medium mb-2">İnteraktif Grafik</p>
                <p className="text-sm text-gray-500">Recharts entegrasyonu yakında</p>
              </div>
              {/* Mock Chart Elements */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                  <div 
                    key={i}
                    className="bg-blue-400 rounded-t animate-slide-in-up hover:bg-blue-500 transition-colors cursor-pointer"
                    style={{ 
                      height: `${height}%`, 
                      width: '8%',
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium card-hover animate-slide-in-right">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <PieChart className="mr-3 h-6 w-6 text-purple-600" />
              Kovan Durumu Dağılımı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center animate-zoom-in">
                <PieChart className="h-16 w-16 text-purple-400 mx-auto mb-4 hover-scale" />
                <p className="text-gray-600 font-medium mb-2">Durum Analizi</p>
                <p className="text-sm text-gray-500">Pie chart entegrasyonu yakında</p>
              </div>
              {/* Mock Pie Chart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-8 border-purple-200 border-t-purple-500 border-r-green-500 border-b-yellow-500 border-l-red-500 animate-spin" 
                     style={{ animationDuration: '8s' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Table */}
      <Card className="card-premium card-hover animate-fade-in-delay-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl">
              <Target className="mr-3 h-6 w-6 text-green-600" />
              Kovan Performans Özeti
            </CardTitle>
            <Badge variant="outline" className="gradient-honey text-white border-0">
              4 Aktif Kovan
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((hive, index) => (
              <div 
                key={index}
                className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border-2 border-gray-100 hover:border-amber-200 transition-all duration-300 animate-slide-in-up hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{hive.name}</h4>
                  <div className="flex space-x-2">
                    <Badge 
                      variant="outline" 
                      className={`${hive.health > 80 ? 'bg-green-100 text-green-800' : 
                                   hive.health > 60 ? 'bg-yellow-100 text-yellow-800' : 
                                   'bg-red-100 text-red-800'} border-0`}
                    >
                      {hive.issues} Uyarı
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Sağlık Durumu</span>
                      <span className="font-medium">{hive.health}%</span>
                    </div>
                    <Progress value={hive.health} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Verimlilik</span>
                      <span className="font-medium">{hive.productivity}%</span>
                    </div>
                    <Progress value={hive.productivity} className="h-3" />
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="hover:bg-amber-50 hover:border-amber-300"
                    >
                      Detaylı Rapor
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
