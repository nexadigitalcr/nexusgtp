
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsWindowProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'general' | 'notifications' | 'personalization' | 'data' | 'builder' | 'apps' | 'security';
}

const SettingsWindow = ({ isOpen, onClose, initialTab = 'general' }: SettingsWindowProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in-50" onClick={onClose}>
      <div 
        className="w-full max-w-2xl max-h-[85vh] bg-chatgpt-main rounded-lg shadow-lg overflow-hidden animate-in fade-in-50 zoom-in-90"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-chatgpt-border">
          <h2 className="text-xl font-semibold text-white">Configuración</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-[calc(85vh-64px)]">
          {/* Sidebar */}
          <div className="w-48 bg-chatgpt-sidebar p-2 overflow-y-auto">
            <TabButton 
              active={activeTab === 'general'} 
              icon="Settings" 
              label="General" 
              onClick={() => setActiveTab('general')} 
            />
            <TabButton 
              active={activeTab === 'notifications'} 
              icon="Bell" 
              label="Notificaciones" 
              onClick={() => setActiveTab('notifications')} 
            />
            <TabButton 
              active={activeTab === 'personalization'} 
              icon="Palette" 
              label="Personalización" 
              onClick={() => setActiveTab('personalization')} 
            />
            <TabButton 
              active={activeTab === 'data'} 
              icon="Database" 
              label="Controles de datos" 
              onClick={() => setActiveTab('data')} 
            />
            <TabButton 
              active={activeTab === 'builder'} 
              icon="Tool" 
              label="Perfil de constructor" 
              onClick={() => setActiveTab('builder')} 
            />
            <TabButton 
              active={activeTab === 'apps'} 
              icon="AppWindow" 
              label="Aplicaciones conectadas" 
              onClick={() => setActiveTab('apps')} 
            />
            <TabButton 
              active={activeTab === 'security'} 
              icon="Shield" 
              label="Seguridad" 
              onClick={() => setActiveTab('security')} 
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'data' && <DataSettings />}
            {/* Add other tabs content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}

const TabButton = ({ active, icon, label, onClick }: TabButtonProps) => {
  // We're using a generic implementation for icons since we're not importing all of them
  return (
    <button
      className={cn(
        "flex w-full items-center rounded-md px-3 py-2 text-sm text-white mb-1",
        active ? "bg-chatgpt-hover" : "hover:bg-chatgpt-hover"
      )}
      onClick={onClick}
    >
      <div className="mr-2">
        <span className="flex h-5 w-5 items-center justify-center">
          {/* Icon would go here, but we're using a simplified version */}
        </span>
      </div>
      <span>{label}</span>
    </button>
  );
};

const GeneralSettings = () => {
  return (
    <div className="text-white space-y-6">
      <div>
        <h3 className="text-lg mb-4">Tema</h3>
        <div className="flex justify-between items-center">
          <span>Sistema</span>
          <Select defaultValue="system">
            <SelectTrigger className="w-36 bg-chatgpt-secondary border-chatgpt-border">
              <SelectValue placeholder="Sistema" />
            </SelectTrigger>
            <SelectContent className="bg-chatgpt-secondary border-chatgpt-border text-white">
              <SelectItem value="system">Sistema</SelectItem>
              <SelectItem value="dark">Oscuro</SelectItem>
              <SelectItem value="light">Claro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-2">
        <div className="flex justify-between items-center mb-4">
          <span>Mostrar siempre el código al usar el análisis de datos</span>
          <Switch />
        </div>
        <div className="flex justify-between items-center">
          <span>Mostrar sugerencias de seguimiento en los chats</span>
          <Switch checked />
        </div>
      </div>

      <div className="pt-2">
        <h3 className="text-lg mb-4">Idioma</h3>
        <div className="flex justify-between items-center">
          <span>Automático</span>
          <Select defaultValue="auto">
            <SelectTrigger className="w-36 bg-chatgpt-secondary border-chatgpt-border">
              <SelectValue placeholder="Automático" />
            </SelectTrigger>
            <SelectContent className="bg-chatgpt-secondary border-chatgpt-border text-white">
              <SelectItem value="auto">Automático</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-2 space-y-4">
        <h3 className="text-lg">Chats archivados</h3>
        <Button variant="outline" className="w-full sm:w-auto">Administrar</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg">Gestión de chats</h3>
        <Button variant="outline" className="w-full sm:w-auto">Archivar todo</Button>
        <Button variant="destructive" className="w-full sm:w-auto ml-0 sm:ml-2">Eliminar todo</Button>
        <div className="pt-4">
          <Button variant="outline" className="w-full sm:w-auto">Cerrar sesión</Button>
        </div>
      </div>
    </div>
  );
};

const DataSettings = () => {
  return (
    <div className="text-white space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Control de datos</h3>
        <p className="text-gray-400 mb-6">
          Gestiona cómo se utilizan tus datos para mejorar nuestros servicios.
        </p>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <div>
              <h4 className="font-medium">Historial de uso</h4>
              <p className="text-sm text-gray-400">Guardar tus conversaciones para referencia futura</p>
            </div>
            <Switch checked />
          </div>
          
          <div className="flex justify-between items-center py-2">
            <div>
              <h4 className="font-medium">Compartir datos para mejoras</h4>
              <p className="text-sm text-gray-400">Ayúdanos a mejorar nuestros modelos con tus interacciones</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex justify-between items-center py-2">
            <div>
              <h4 className="font-medium">Entrenamiento de modelos</h4>
              <p className="text-sm text-gray-400">Permite que tus conversaciones se usen para entrenar modelos futuros</p>
            </div>
            <Switch />
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-chatgpt-border">
          <Button variant="outline" className="mr-2">Exportar datos</Button>
          <Button variant="destructive">Eliminar todos los datos</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
