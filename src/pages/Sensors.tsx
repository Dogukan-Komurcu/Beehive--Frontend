
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Thermometer, Droplets, Battery, Plus, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Hive, SensorData } from '@/types/api';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

const Sensors = () => {
	const [showModal, setShowModal] = useState(false);
	const [hives, setHives] = useState<Hive[]>([]);
	const [selectedHiveId, setSelectedHiveId] = useState('');
	const [sensorValues, setSensorValues] = useState({
		temperature: '',
		humidity: '',
		battery: '',
	});
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const [sensorHistories, setSensorHistories] = useState<Record<number, SensorData[]>>({});
	const [historyLoading, setHistoryLoading] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingHive, setEditingHive] = useState<Hive | null>(null);
	const [editSensorValues, setEditSensorValues] = useState({ temperature: '', humidity: '', battery: '' });

	useEffect(() => {
		apiService.getMyHives().then(async (hives) => {
			setHives(hives);
			setHistoryLoading(true);
			const histories: Record<number, SensorData[]> = {};
			for (const hive of hives) {
				try {
					const data = await apiService.getSensorData(hive.id);
					histories[hive.id] = Array.isArray(data) ? data : [];
				} catch {
					histories[hive.id] = [];
				}
			}
			setSensorHistories(histories);
			setHistoryLoading(false);
		}).catch(() => {
			setHives([]);
			setSensorHistories({});
		});
	}, [showModal]); // refresh after modal closes (new data added)

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedHiveId('');
		setSensorValues({ temperature: '', humidity: '', battery: '' });
	};

	const handleValueChange = (key, value) => {
		setSensorValues((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedHiveId) {
			toast({
				title: 'Kovan seçin',
				description: 'Lütfen bir kovan seçin.',
				variant: 'destructive',
			});
			return;
		}
		setLoading(true);
		try {
			const payload = {
				temperature: Number(sensorValues.temperature),
				humidity: Number(sensorValues.humidity),
				battery: Number(sensorValues.battery),
				timestamp: new Date().toISOString(),
			};
			await apiService.addSensorData(Number(selectedHiveId), payload);
			toast({ title: 'Başarılı', description: 'Sensör verisi eklendi.' });
			closeModal();
		} catch (err) {
			toast({
				title: 'Hata',
				description: err.message || 'Veri eklenemedi',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	const openEditModal = (hive: Hive) => {
		setEditingHive(hive);
		setEditSensorValues({
			temperature: hive.temperature?.toString() ?? '',
			humidity: hive.humidity?.toString() ?? '',
			battery: hive.battery?.toString() ?? '',
		});
		setEditModalOpen(true);
	};

	const closeEditModal = () => {
		setEditModalOpen(false);
		setEditingHive(null);
		setEditSensorValues({ temperature: '', humidity: '', battery: '' });
	};

	const handleEditValueChange = (key: string, value: string) => {
		setEditSensorValues((prev) => ({ ...prev, [key]: value }));
	};

	const handleEditSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editingHive) return;
		setLoading(true);
		try {
			const payload = {
				temperature: Number(editSensorValues.temperature),
				humidity: Number(editSensorValues.humidity),
				battery: Number(editSensorValues.battery),
				timestamp: new Date().toISOString(),
			};
			// Güncel veriyi ekle
			await apiService.addSensorData(editingHive.id, payload);
			// Eski verileri sil (sadece ilgili kovan için)
			if (sensorHistories[editingHive.id]?.length) {
				for (const row of sensorHistories[editingHive.id]) {
					await apiService.deleteSensorData(editingHive.id, row.id);
				}
			}
			toast({ title: 'Başarılı', description: 'Sensör verisi güncellendi.' });
			closeEditModal();
			setShowModal(false); // refresh
			// Son veriyi göster
			setSensorHistories((prev) => ({
				...prev,
				[editingHive.id]: [{ ...payload, id: Date.now(), hiveId: editingHive.id }],
			}));
		} catch (err) {
			toast({
				title: 'Hata',
				description: err.message || 'Veri güncellenemedi',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="flex items-center mb-6 gap-2 justify-between">
				<div className="flex items-center gap-2">
					<span className="text-3xl">
						<Thermometer className="inline-block text-amber-500 mr-2" />
					</span>
					<h1 className="text-2xl font-bold">Kovanlarım ve Sensör Verilerim</h1>
				</div>
				<Button className="gradient-honey text-white" onClick={() => setShowModal(true)}>
					<Plus className="h-4 w-4 mr-2" /> Sensör Verisi Ekle
				</Button>
			</div>
			{hives.length === 0 ? (
				<div className="text-gray-400">Hiç kovanınız yok.</div>
			) : (
				<div className="space-y-8">
					{hives.map((hive) => (
						<Card key={hive.id} className="p-4">
							<div className="flex items-center gap-4 mb-2">
								<div className="w-10 h-10 bg-gradient-honey rounded-lg flex items-center justify-center text-white font-bold text-lg">
									{hive.name.split('-')[1] || hive.name}
								</div>
								<div>
									<div className="font-semibold text-lg">{hive.name}</div>
									<div className="text-gray-500 text-sm">{hive.location}</div>
								</div>
								<Button size="sm" variant="outline" className="ml-auto" onClick={() => openEditModal(hive)}>
									Sensör Verisini Düzenle
								</Button>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
								<div className="flex items-center gap-2">
									<Thermometer className="h-5 w-5 text-orange-500" />
									<span className="font-medium">{hive.temperature}°C</span>
								</div>
								<div className="flex items-center gap-2">
									<Droplets className="h-5 w-5 text-blue-500" />
									<span className="font-medium">{hive.humidity}%</span>
								</div>
								<div className="flex items-center gap-2">
									<Battery className="h-5 w-5 text-green-500" />
									<span className="font-medium">{hive.battery}%</span>
								</div>
							</div>
							<div className="mt-2">
								<h2 className="text-base font-bold mb-1">Kayıtlı Sensör Verileri</h2>
								{historyLoading ? (
									<div className="text-gray-500">Yükleniyor...</div>
								) : (sensorHistories[hive.id]?.length === 0 ? (
									<div className="text-gray-400">Kayıtlı veri yok.</div>
								) : (
									<div className="overflow-x-auto">
										<table className="min-w-full border text-sm bg-white rounded-lg">
											<thead>
												<tr className="bg-gray-50">
													<th className="px-4 py-2 border-b">Tarih</th>
													<th className="px-4 py-2 border-b">Sıcaklık (°C)</th>
													<th className="px-4 py-2 border-b">Nem (%)</th>
													<th className="px-4 py-2 border-b">Batarya (%)</th>
												</tr>
											</thead>
											<tbody>
												{sensorHistories[hive.id].map((row) => (
													<tr key={row.id} className="hover:bg-gray-50">
														<td className="px-4 py-2 border-b">{new Date(row.timestamp).toLocaleString('tr-TR')}</td>
														<td className="px-4 py-2 border-b">{row.temperature}</td>
														<td className="px-4 py-2 border-b">{row.humidity}</td>
														<td className="px-4 py-2 border-b">{row.battery}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								))}
							</div>
						</Card>
					))}
				</div>
			)}
			<Dialog open={showModal} onOpenChange={setShowModal}>
				<DialogContent className="max-w-lg z-[100] !overflow-visible">
					<DialogHeader>
						<DialogTitle>Yeni Sensör Verisi Ekle</DialogTitle>
					</DialogHeader>
					<TooltipProvider>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Label>Kovan Seç</Label>
								<Select
									value={selectedHiveId}
									onValueChange={setSelectedHiveId}
									required
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Kovan seçin" />
									</SelectTrigger>
									<SelectContent className="z-[9999]">
										{hives.length === 0 ? (
											<SelectItem value="" disabled>
												Kovanınız yok
											</SelectItem>
										) : (
											hives.map((hive) => (
												<SelectItem key={hive.id} value={String(hive.id)}>
													{hive.name}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<Label className="flex items-center gap-1">
										Sıcaklık (°C)
										<Tooltip>
											<TooltipTrigger asChild>
												<span className="ml-1 cursor-pointer">
													<Info className="h-4 w-4 text-blue-400" />
												</span>
											</TooltipTrigger>
											<TooltipContent side="top" className="z-[9999]">
												Kovan içindeki sıcaklık değerini girin. (Örn: 34.5°C)
											</TooltipContent>
										</Tooltip>
									</Label>
									<Input
										type="number"
										step="0.1"
										value={sensorValues.temperature}
										onChange={(e) =>
											handleValueChange('temperature', e.target.value)
										}
										required
									/>
								</div>
								<div>
									<Label className="flex items-center gap-1">
										Nem (%)
										<Tooltip>
											<TooltipTrigger asChild>
												<span className="ml-1 cursor-pointer">
													<Info className="h-4 w-4 text-blue-400" />
												</span>
											</TooltipTrigger>
											<TooltipContent side="top" className="z-[9999]">
												Kovan içindeki nem oranını girin. (Örn: 60%)
											</TooltipContent>
										</Tooltip>
									</Label>
									<Input
										type="number"
										step="0.1"
										value={sensorValues.humidity}
										onChange={(e) =>
											handleValueChange('humidity', e.target.value)
										}
										required
									/>
								</div>
								<div>
									<Label className="flex items-center gap-1">
										Batarya (%)
										<Tooltip>
											<TooltipTrigger asChild>
												<span className="ml-1 cursor-pointer">
													<Info className="h-4 w-4 text-blue-400" />
												</span>
											</TooltipTrigger>
											<TooltipContent side="top" className="z-[9999]">
												Sensör cihazının batarya seviyesini girin. (Örn: 85%)
											</TooltipContent>
										</Tooltip>
									</Label>
									<Input
										type="number"
										step="0.1"
										value={sensorValues.battery}
										onChange={(e) =>
											handleValueChange('battery', e.target.value)
										}
										required
									/>
								</div>
							</div>
							<div className="flex justify-end gap-2">
								<Button
									type="button"
									variant="outline"
									onClick={closeModal}
									disabled={loading}
								>
									İptal
								</Button>
								<Button
									type="submit"
									className="gradient-honey text-white"
									disabled={loading}
								>
									{loading ? 'Ekleniyor...' : 'Ekle'}
								</Button>
							</div>
						</form>
					</TooltipProvider>
				</DialogContent>
			</Dialog>
			<Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
				<DialogContent className="max-w-lg z-[100] !overflow-visible">
					<DialogHeader>
						<DialogTitle>Sensör Verisini Düzenle</DialogTitle>
					</DialogHeader>
					<TooltipProvider>
						<form onSubmit={handleEditSubmit} className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<Label>Sıcaklık (°C)</Label>
									<Input
										type="number"
										step="0.1"
										value={editSensorValues.temperature}
										onChange={e => handleEditValueChange('temperature', e.target.value)}
										required
									/>
								</div>
								<div>
									<Label>Nem (%)</Label>
									<Input
										type="number"
										step="0.1"
										value={editSensorValues.humidity}
										onChange={e => handleEditValueChange('humidity', e.target.value)}
										required
									/>
								</div>
								<div>
									<Label>Batarya (%)</Label>
									<Input
										type="number"
										step="0.1"
										value={editSensorValues.battery}
										onChange={e => handleEditValueChange('battery', e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="flex justify-end gap-2">
								<Button type="button" variant="outline" onClick={closeEditModal} disabled={loading}>
									İptal
								</Button>
								<Button type="submit" className="gradient-honey text-white" disabled={loading}>
									{loading ? 'Kaydediliyor...' : 'Kaydet'}
								</Button>
							</div>
						</form>
					</TooltipProvider>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Sensors;
