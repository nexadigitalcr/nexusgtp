
import React, { useState } from 'react';
import { X, Plus, Trash, Edit, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MyGPTsWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GPTModel {
  id: string;
  name: string;
  description: string;
  apiKey: string;
}

const MyGPTsWindow = ({ isOpen, onClose }: MyGPTsWindowProps) => {
  const [gptModels, setGptModels] = useState<GPTModel[]>([
    {
      id: '1',
      name: 'GPT-4',
      description: 'The most powerful text generation model',
      apiKey: 'sk-...'
    },
    {
      id: '2',
      name: 'GPT-3.5',
      description: 'Efficient and cost-effective for most tasks',
      apiKey: 'sk-...'
    }
  ]);
  
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [newModel, setNewModel] = useState({ name: '', description: '', apiKey: '' });

  if (!isOpen) return null;

  const handleAddModel = () => {
    if (newModel.name && newModel.apiKey) {
      setGptModels([...gptModels, { ...newModel, id: Date.now().toString() }]);
      setNewModel({ name: '', description: '', apiKey: '' });
      setIsAddingModel(false);
    }
  };

  const handleDeleteModel = (id: string) => {
    setGptModels(gptModels.filter(model => model.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in-50" onClick={onClose}>
      <div 
        className="w-full max-w-2xl max-h-[85vh] bg-chatgpt-main rounded-lg shadow-lg overflow-hidden animate-in fade-in-50 zoom-in-90"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-chatgpt-border">
          <h2 className="text-xl font-semibold text-white">Mis GPTs</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 max-h-[calc(85vh-64px)] overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-white text-lg mb-4">Modelos GPT Conectados</h3>
            <div className="space-y-4">
              {gptModels.map((model) => (
                <div key={model.id} className="bg-chatgpt-secondary p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-white font-medium">{model.name}</h4>
                      <p className="text-gray-400 text-sm">{model.description}</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-gray-400 text-xs">API Key:</span>
                        <span className="text-gray-400 text-xs ml-2">
                          {model.apiKey.substring(0, 3)}...{model.apiKey.substring(model.apiKey.length - 3)}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => handleDeleteModel(model.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isAddingModel ? (
            <div className="bg-chatgpt-secondary p-4 rounded-lg mb-4">
              <h4 className="text-white font-medium mb-4">Agregar nuevo modelo GPT</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Nombre del modelo</label>
                  <Input 
                    className="bg-chatgpt-main border-chatgpt-border text-white"
                    placeholder="ej. GPT-4"
                    value={newModel.name}
                    onChange={(e) => setNewModel({...newModel, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Descripción (opcional)</label>
                  <Input 
                    className="bg-chatgpt-main border-chatgpt-border text-white"
                    placeholder="Descripción corta del modelo"
                    value={newModel.description}
                    onChange={(e) => setNewModel({...newModel, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">API Key</label>
                  <Input 
                    className="bg-chatgpt-main border-chatgpt-border text-white"
                    placeholder="sk-..."
                    type="password"
                    value={newModel.apiKey}
                    onChange={(e) => setNewModel({...newModel, apiKey: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingModel(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddModel}>Agregar</Button>
                </div>
              </div>
            </div>
          ) : (
            <Button 
              className="w-full flex items-center justify-center"
              onClick={() => setIsAddingModel(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar nuevo modelo GPT
            </Button>
          )}

          <div className="mt-6 pt-4 border-t border-chatgpt-border">
            <div className="flex items-center justify-between text-blue-400 hover:text-blue-300 cursor-pointer">
              <span>Ver la documentación de la API de OpenAI</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGPTsWindow;
