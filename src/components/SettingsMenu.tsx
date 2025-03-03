
import React from 'react';
import { 
  User, Settings, PenSquare, ListTodo, Sparkles, 
  UserPlus, Download, Search, LogOut, Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
  onOpenMyGPTs: () => void;
  onOpenCustomize: () => void;
}

const SettingsMenu = ({ 
  isOpen, 
  onClose, 
  onOpenSettings,
  onOpenMyGPTs,
  onOpenCustomize
}: SettingsMenuProps) => {
  if (!isOpen) return null;

  const handleItemClick = (handler: () => void) => {
    handler();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div 
        className="absolute right-2 top-16 w-72 overflow-hidden rounded-lg bg-chatgpt-main p-2 shadow-lg animate-in fade-in-50 slide-in-from-top-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex items-center p-2 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
            <span className="text-lg font-semibold">N</span>
          </div>
          <div className="ml-3">
            <div className="font-medium">Nexa Digital</div>
            <div className="text-sm text-gray-400">nexadigitalcr@gmail.com</div>
          </div>
        </div>

        <div className="border-t border-chatgpt-border my-2"></div>

        <div className="flex flex-col space-y-1">
          <MenuButton icon={User} label="Cuenta personal" />
          <MenuButton icon={Building2} label="Administrar espacio de trabajo" />
          
          <div className="flex items-center p-2 rounded-md text-white hover:bg-chatgpt-hover">
            <ListTodo className="h-5 w-5 mr-3" />
            <span>Tareas</span>
            <span className="ml-2 rounded bg-blue-900 px-1.5 py-0.5 text-xs">BETA</span>
          </div>
          
          <MenuButton 
            icon={Sparkles} 
            label="Mis GPT" 
            onClick={() => handleItemClick(onOpenMyGPTs)} 
          />
          <MenuButton 
            icon={PenSquare} 
            label="Personalizar ChatGPT" 
            onClick={() => handleItemClick(onOpenCustomize)} 
          />
          <MenuButton 
            icon={Settings} 
            label="Configuración" 
            onClick={() => handleItemClick(onOpenSettings)} 
          />
        </div>

        <div className="border-t border-chatgpt-border my-2"></div>

        <div className="flex flex-col space-y-1">
          <MenuButton icon={UserPlus} label="Agregar compañeros de equipo" />
          <MenuButton icon={Download} label="Descargar la aplicación de Windows" />
          <MenuButton icon={Search} label="Obtener la extensión de búsqueda de ChatGPT" />
          <MenuButton icon={LogOut} label="Cerrar sesión" />
        </div>

        <div className="flex justify-end p-2 text-gray-400 text-sm">
          <button className="hover:text-white">?</button>
        </div>
      </div>
    </div>
  );
};

interface MenuButtonProps {
  icon: React.FC<any>;
  label: string;
  onClick?: () => void;
}

const MenuButton = ({ icon: Icon, label, onClick }: MenuButtonProps) => {
  return (
    <button 
      className="flex w-full items-center p-2 rounded-md text-white hover:bg-chatgpt-hover"
      onClick={onClick}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span>{label}</span>
    </button>
  );
};

export default SettingsMenu;
