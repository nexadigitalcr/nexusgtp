
import React, { useState } from 'react';
import { X, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CustomizeWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomizeWindow = ({ isOpen, onClose }: CustomizeWindowProps) => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'behavior'>('appearance');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in-50" onClick={onClose}>
      <div 
        className="w-full max-w-2xl max-h-[85vh] bg-chatgpt-main rounded-lg shadow-lg overflow-hidden animate-in fade-in-50 zoom-in-90"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-chatgpt-border">
          <h2 className="text-xl font-semibold text-white">Personalizar ChatGPT</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex space-x-4 mb-6">
            <Button
              variant={activeTab === 'appearance' ? 'default' : 'outline'}
              className={activeTab === 'appearance' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              onClick={() => setActiveTab('appearance')}
            >
              Apariencia
            </Button>
            <Button
              variant={activeTab === 'behavior' ? 'default' : 'outline'}
              className={activeTab === 'behavior' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              onClick={() => setActiveTab('behavior')}
            >
              Comportamiento
            </Button>
          </div>

          {activeTab === 'appearance' && (
            <div className="space-y-6 text-white">
              <div>
                <h3 className="text-lg mb-4">Tema de la interfaz</h3>
                <div className="grid grid-cols-3 gap-4">
                  <ThemeOption label="Sistema" isSelected={true} />
                  <ThemeOption label="Claro" isSelected={false} />
                  <ThemeOption label="Oscuro" isSelected={false} />
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-4">Tamaño de texto</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">A</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    value="2" 
                    className="w-full h-2 rounded-lg appearance-none bg-chatgpt-secondary outline-none" 
                  />
                  <span className="text-lg">A</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-4">Color de acento</h3>
                <div className="grid grid-cols-5 gap-4">
                  <ColorOption color="bg-blue-500" isSelected={true} />
                  <ColorOption color="bg-purple-500" isSelected={false} />
                  <ColorOption color="bg-green-500" isSelected={false} />
                  <ColorOption color="bg-red-500" isSelected={false} />
                  <ColorOption color="bg-yellow-500" isSelected={false} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'behavior' && (
            <div className="space-y-6 text-white">
              <div>
                <h3 className="text-lg mb-4">Modelo predeterminado</h3>
                <Select defaultValue="gpt4">
                  <SelectTrigger className="w-full bg-chatgpt-secondary border-chatgpt-border">
                    <SelectValue placeholder="Seleccionar modelo" />
                  </SelectTrigger>
                  <SelectContent className="bg-chatgpt-secondary border-chatgpt-border text-white">
                    <SelectItem value="gpt4">GPT-4</SelectItem>
                    <SelectItem value="gpt35">GPT-3.5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-lg mb-4">Opciones de chat</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Mostrar citas y fuentes</span>
                    <Switch checked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sugerencias automáticas</span>
                    <Switch checked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Guardar historial de chat</span>
                    <Switch checked />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-4">Tono de respuesta</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm">Formal</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value="3" 
                    className="w-full h-2 rounded-lg appearance-none bg-chatgpt-secondary outline-none" 
                  />
                  <span className="text-sm">Casual</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Conciso</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value="3" 
                    className="w-full h-2 rounded-lg appearance-none bg-chatgpt-secondary outline-none" 
                  />
                  <span className="text-sm">Detallado</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-chatgpt-border flex justify-end">
            <Button onClick={onClose}>Guardar cambios</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ThemeOptionProps {
  label: string;
  isSelected: boolean;
}

const ThemeOption = ({ label, isSelected }: ThemeOptionProps) => {
  return (
    <div className={`
      p-3 rounded-lg border-2 flex items-center justify-center
      ${isSelected ? 'border-blue-500 bg-chatgpt-hover' : 'border-chatgpt-border bg-chatgpt-secondary hover:bg-chatgpt-hover'}
      cursor-pointer
    `}>
      {label}
    </div>
  );
};

interface ColorOptionProps {
  color: string;
  isSelected: boolean;
}

const ColorOption = ({ color, isSelected }: ColorOptionProps) => {
  return (
    <div className={`
      h-10 rounded-full ${color} flex items-center justify-center
      ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-chatgpt-main' : ''}
      cursor-pointer
    `}>
      {isSelected && <Smile className="h-5 w-5 text-white" />}
    </div>
  );
};

export default CustomizeWindow;
