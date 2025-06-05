
import { useToast } from '@/hooks/use-toast';

export const useDemoRestrictions = () => {
  const { toast } = useToast();

  const checkDemoRestriction = (isDemoMode: boolean, action: string): boolean => {
    if (isDemoMode) {
      toast({
        title: "Demo Modu Kısıtlaması",
        description: `${action} demo modunda devre dışıdır. Tam erişim için kayıt olun.`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const getButtonProps = (isDemoMode: boolean, action: string) => ({
    disabled: isDemoMode,
    onClick: isDemoMode ? () => checkDemoRestriction(true, action) : undefined,
    className: isDemoMode ? 'opacity-50 cursor-not-allowed' : ''
  });

  return { checkDemoRestriction, getButtonProps };
};

// Demo modunda kısıtlanan aksiyonlar
export const DEMO_RESTRICTED_ACTIONS = {
  CREATE_HIVE: 'Kovan ekleme',
  EDIT_HIVE: 'Kovan düzenleme',
  DELETE_HIVE: 'Kovan silme',
  CREATE_USER: 'Kullanıcı ekleme',
  EDIT_USER: 'Kullanıcı düzenleme',
  DELETE_USER: 'Kullanıcı silme',
  EXPORT_DATA: 'Veri dışa aktarma',
  IMPORT_DATA: 'Veri içe aktarma',
  GENERATE_REPORT: 'Rapor oluşturma',
  CHANGE_SETTINGS: 'Ayar değişikliği',
  DELETE_ALERT: 'Uyarı silme'
};
