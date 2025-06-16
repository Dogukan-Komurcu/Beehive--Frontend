
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Thermometer, Plus } from 'lucide-react';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Hive, SensorData } from '@/types/api';
import { SensorModal } from '@/components/sensors/SensorModal';
import { EditSensorModal } from '@/components/sensors/EditSensorModal';
import { HiveCard } from '@/components/sensors/HiveCard';

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

	const closeModal = () => {
		setShowModal(false);
		setSelectedHiveId('');
		setSensorValues({ temperature: '', humidity: '', battery: '' });
	};

	const handleValueChange = (key: string, value: string) => {
		setSensorValues((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
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
		} catch (err: any) {
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
		} catch (err: any) {
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
						<HiveCard
							key={hive.id}
							hive={hive}
							sensorHistory={sensorHistories[hive.id] || []}
							historyLoading={historyLoading}
							onEditClick={openEditModal}
						/>
					))}
				</div>
			)}
			
			<SensorModal
				open={showModal}
				onOpenChange={setShowModal}
				hives={hives}
				selectedHiveId={selectedHiveId}
				setSelectedHiveId={setSelectedHiveId}
				sensorValues={sensorValues}
				onValueChange={handleValueChange}
				onSubmit={handleSubmit}
				loading={loading}
				onClose={closeModal}
			/>

			<EditSensorModal
				open={editModalOpen}
				onOpenChange={setEditModalOpen}
				editingHive={editingHive}
				editSensorValues={editSensorValues}
				onValueChange={handleEditValueChange}
				onSubmit={handleEditSubmit}
				loading={loading}
				onClose={closeEditModal}
			/>
		</div>
	);
};

export default Sensors;
