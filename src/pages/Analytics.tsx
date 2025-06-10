import React, { useState, useEffect, useMemo } from 'react';
import { apiService } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  PieChart as PieChartIcon, 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Zap, 
  Target,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  Battery
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // --- GRAFİKLER İÇİN EKLENEN STATE ---
  const [hives, setHives] = useState<any[]>([]);
  useEffect(() => {
    apiService.getHives().then(data => {
      console.log('API hives:', data); // Kovan verisini konsolda gör
      setHives(data);
    });
  }, []);
  // PieChart için veri hazırla (API'den gelen 'durum' alanı)
  const statusData = [
    { name: 'Aktif', value: hives.filter(h => h.durum === 'aktif').length },
    { name: 'Uyarı', value: hives.filter(h => h.durum === 'uyari').length },
    { name: 'Çevrimdışı', value: hives.filter(h => h.durum === 'cevrimdisi').length },
  ];
  const COLORS = ['#34d399', '#fbbf24', '#f87171'];
  // LineChart için: aylara göre toplam arı sayısı
  const beeCountTrend = hives.map(h => ({
    month: h.installDate ? new Date(h.installDate).toLocaleString('tr-TR', { month: 'short', year: '2-digit' }) : '-',
    beeCount: h.estimatedBeeCount ?? h.beeCount ?? 0
  }));
  // BarChart için: kovanların batarya durumu (API'den gelen 'batarya' propertysi)
  const batteryData = useMemo(
    () => hives
      .filter(h => h.batarya !== undefined && h.batarya !== null && !isNaN(Number(h.batarya)))
      .map(h => ({
        name: h.name,
        battery: Number(h.batarya)
      })),
    [hives]
  );

  useEffect(() => {
    setLoading(true);
    // Dummy metrik ve performans verisi (backend endpoint yoksa)
    const dummyMetrics = [
      {
        title: 'Toplam Kovan',
        value: hives.length,
        change: '+2',
        trend: 'up',
        description: 'Bu hafta',
        color: 'bg-purple-500',
        icon: PieChartIcon,
      },
      {
        title: 'Aktif Kovan',
        value: hives.filter(h => h.status === 'active').length,
        change: '+1',
        trend: 'up',
        description: 'Bu hafta',
        color: 'bg-green-500',
        icon: Activity,
      },
      {
        title: 'Uyarı Alan Kovan',
        value: hives.filter(h => h.status === 'warning').length,
        change: '+1',
        trend: 'up',
        description: 'Bu hafta',
        color: 'bg-yellow-500',
        icon: Zap,
      },
      {
        title: 'Çevrimdışı Kovan',
        value: hives.filter(h => h.status === 'offline').length,
        change: '0',
        trend: 'down',
        description: 'Bu hafta',
        color: 'bg-red-500',
        icon: Battery,
      },
    ];
    const dummyPerformance = hives.map(h => ({
      name: h.name,
      health: Math.round(60 + Math.random() * 40),
      productivity: Math.round(50 + Math.random() * 50),
      issues: h.status === 'warning' ? 1 : 0,
    }));
    setMetrics(dummyMetrics);
    setPerformanceData(dummyPerformance);
    setLoading(false);
  }, [timeRange, hives]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  // PieChart için özel legend ve ortada toplam
  const renderPieLabel = ({ cx, cy }) => {
    const total = statusData.reduce((sum, entry) => sum + entry.value, 0);
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-purple-700">
        {total}
        <tspan x={cx} y={cy + 22} className="text-xs fill-gray-500">Kovan</tspan>
      </text>
    );
  };
  const renderPieLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center mt-4">
        {payload.map((entry, idx) => (
          <li key={entry.value} className="flex items-center mx-3">
            <span className="w-3 h-3 rounded-full mr-2" style={{ background: COLORS[idx % COLORS.length] }}></span>
            <span className="text-sm text-gray-700">{entry.value} {entry.payload.name}</span>
          </li>
        ))}
      </ul>
    );
  };
  // LineChart için gradient ve custom tooltip
  const lineGradientId = 'beeLineGradient';
  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow text-xs border border-amber-200">
          <div><b>{label}</b></div>
          <div>Arı Sayısı: <b>{payload[0].value}</b></div>
        </div>
      );
    }
    return null;
  };
  // BarChart için batarya rengi ve bar üstü değer etiketi
  const getBatteryColor = (battery) => {
    if (battery > 80) return '#34d399';
    if (battery > 50) return '#fbbf24';
    return '#f87171';
  };
  const renderBarLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text x={x + width / 2} y={y - 8} fill="#374151" textAnchor="middle" fontSize="12">{value}%</text>
    );
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
        {/* Kovan Durumu Dağılımı PieChart */}
        <Card className="card-premium card-hover animate-slide-in-right shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <PieChartIcon className="mr-3 h-6 w-6 text-purple-600" />
              Kovan Durumu Dağılımı
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1">Kovanların güncel durum dağılımı</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} labelLine={false} label={renderPieLabel} isAnimationActive>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value, name) => [`${value} kovan`, name]} />
                  <Legend content={renderPieLegend} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Aylık Arı Sayısı Trendi LineChart */}
        <Card className="card-premium card-hover animate-slide-in-left shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <BarChart3 className="mr-3 h-6 w-6 text-blue-600" />
              Aylık Arı Sayısı Trendi
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1">Kovanlardaki arı sayısının aylara göre değişimi</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={beeCountTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={lineGradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RechartsTooltip content={CustomLineTooltip} />
                  <Legend />
                  <Line type="monotone" dataKey="beeCount" stroke="url(#beeLineGradient)" strokeWidth={3} dot={{ r: 5, fill: '#fbbf24', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} isAnimationActive />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Batarya Sağlığı BarChart */}
        <Card className="card-premium card-hover animate-slide-in-up shadow-xl lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Battery className="mr-3 h-6 w-6 text-green-600" />
              Kovan Batarya Sağlığı
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1">Kovanların batarya seviyeleri</p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              {batteryData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-lg">Kayıtlı batarya verisi yok.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={batteryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <RechartsTooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="battery" isAnimationActive label={{ position: 'top', fill: '#374151', fontSize: 14 }}>
                      {batteryData.map((entry, idx) => (
                        <Cell key={`cell-bar-${idx}`} fill={getBatteryColor(entry.battery)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
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
