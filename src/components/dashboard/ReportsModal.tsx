
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportsModal = ({ isOpen, onClose }: ReportsModalProps) => {
  const reports = [
    {
      id: 1,
      title: 'Haftalık Performans Raporu',
      description: 'Son 7 günün detaylı analizi',
      date: '15 Aralık 2024',
      type: 'Performans',
      status: 'Hazır'
    },
    {
      id: 2,
      title: 'Sıcaklık Trend Analizi',
      description: 'Aylık sıcaklık değişimleri',
      date: '10 Aralık 2024',
      type: 'Analitik',
      status: 'Hazır'
    },
    {
      id: 3,
      title: 'Kovan Sağlık Raporu',
      description: 'Tüm kovanların sağlık durumu',
      date: '12 Aralık 2024',
      type: 'Sağlık',
      status: 'İşleniyor'
    },
    {
      id: 4,
      title: 'Uyarı ve Alarm Özeti',
      description: 'Son 30 günün uyarı analizi',
      date: '14 Aralık 2024',
      type: 'Uyarı',
      status: 'Hazır'
    }
  ];

  const handleDownload = (reportTitle: string) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${reportTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <FileText className="mr-2 h-6 w-6" />
            Kovan Raporları
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Toplam Rapor</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Bu Ay</p>
                    <p className="text-2xl font-bold text-green-600">8</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Beklemede</p>
                    <p className="text-2xl font-bold text-orange-600">2</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports List */}
          <div className="max-h-96 overflow-y-auto space-y-3">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{report.title}</h4>
                        <Badge 
                          variant={report.status === 'Hazır' ? 'default' : 'secondary'}
                          className={report.status === 'Hazır' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {report.date}
                        </div>
                        <span className="px-2 py-1 bg-gray-100 rounded">{report.type}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        disabled={report.status !== 'Hazır'}
                      >
                        Görüntüle
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-amber-600 hover:bg-amber-700"
                        onClick={() => handleDownload(report.title)}
                        disabled={report.status !== 'Hazır'}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        İndir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Kapat
            </Button>
            <Button className="gradient-honey text-white">
              Yeni Rapor Oluştur
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
