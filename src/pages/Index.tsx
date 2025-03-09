
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import UserButton from '@/components/UserButton';
import SettingsMenu from '@/components/SettingsMenu';
import SettingsWindow from '@/components/SettingsWindow';
import MyGPTsWindow from '@/components/MyGPTsWindow';
import CustomizeWindow from '@/components/CustomizeWindow';
import { assistants } from '@/data/assistants';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const assistantId = searchParams.get('assistant');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState<typeof assistants[0] | null>(null);
  const { toast } = useToast();

  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isSettingsWindowOpen, setIsSettingsWindowOpen] = useState(false);
  const [isMyGPTsWindowOpen, setIsMyGPTsWindowOpen] = useState(false);
  const [isCustomizeWindowOpen, setIsCustomizeWindowOpen] = useState(false);
  const [pinnedAssistants, setPinnedAssistants] = useState<string[]>([]);

  useEffect(() => {
    // Try to load pinned assistants from localStorage
    const savedPinnedAssistants = localStorage.getItem('pinnedAssistants');
    if (savedPinnedAssistants) {
      try {
        setPinnedAssistants(JSON.parse(savedPinnedAssistants));
      } catch (e) {
        console.error('Error loading pinned assistants:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (assistantId) {
      const foundAssistant = assistants.find(a => a.id === assistantId);
      if (foundAssistant) {
        // Apply the isPinned status from our state
        const isPinned = pinnedAssistants.includes(foundAssistant.id);
        setCurrentAssistant({ ...foundAssistant, isPinned });
        
        // Clear previous messages and add welcome message with the assistant's description
        setMessages([{
          role: 'assistant',
          content: `Hola, soy ${foundAssistant.name}. ${foundAssistant.description}`
        }]);
        
        toast({
          title: `${foundAssistant.name} seleccionado`,
          description: "Ahora estás chateando con un asistente especializado.",
        });
      }
    }
  }, [assistantId, toast, pinnedAssistants]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa un mensaje",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [
        ...messages,
        { role: 'user', content } as const
      ];
      
      setMessages(newMessages);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantName = currentAssistant ? currentAssistant.name : "Nexus AI";
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: `Como ${assistantName}, puedo decirte que esta respuesta es simulada. La conexión a la base de datos ha sido eliminada con fines de prueba. Puedes modificar esta respuesta en el archivo Index.tsx.`
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    // Start a new chat with the current assistant
    setMessages([{
      role: 'assistant',
      content: `Hola, soy ${currentAssistant?.name}. ${currentAssistant?.description} ¿En qué puedo ayudarte hoy?`
    }]);
    
    toast({
      title: "Nuevo chat iniciado",
      description: `Empezando una nueva conversación con ${currentAssistant?.name}.`,
    });
  };

  const handleTogglePin = (assistantId: string) => {
    // Update pinned assistants list
    let newPinnedAssistants: string[];
    
    if (pinnedAssistants.includes(assistantId)) {
      // Remove from pinned
      newPinnedAssistants = pinnedAssistants.filter(id => id !== assistantId);
      toast({
        title: "Asistente desanclado",
        description: "El asistente ha sido desanclado del sidebar.",
      });
    } else {
      // Add to pinned
      newPinnedAssistants = [...pinnedAssistants, assistantId];
      toast({
        title: "Asistente anclado",
        description: "El asistente ha sido anclado al sidebar para fácil acceso.",
      });
    }
    
    // Update state and localStorage
    setPinnedAssistants(newPinnedAssistants);
    localStorage.setItem('pinnedAssistants', JSON.stringify(newPinnedAssistants));
    
    // Update current assistant if that's the one we're toggling
    if (currentAssistant && currentAssistant.id === assistantId) {
      setCurrentAssistant({
        ...currentAssistant,
        isPinned: !pinnedAssistants.includes(assistantId)
      });
    }
  };

  const handleToggleSettingsMenu = () => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  };

  const handleOpenSettings = () => {
    setIsSettingsWindowOpen(true);
  };

  const handleOpenMyGPTs = () => {
    setIsMyGPTsWindowOpen(true);
  };

  const handleOpenCustomize = () => {
    setIsCustomizeWindowOpen(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onApiKeyChange={() => {}} // Empty function since we don't need API key anymore
        currentAssistantId={currentAssistant?.id}
        pinnedAssistantIds={pinnedAssistants}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="fixed top-0 z-30 w-full border-b border-white/20 bg-chatgpt-main/95 backdrop-blur">
          <div className="flex h-[60px] items-center justify-between px-4">
            <ChatHeader 
              isSidebarOpen={isSidebarOpen} 
              currentAssistant={currentAssistant}
              onNewChat={handleNewChat}
              onTogglePin={handleTogglePin}
            />
            <UserButton onClick={handleToggleSettingsMenu} />
          </div>
        </div>
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              {currentAssistant && (
                <div className="flex flex-col items-center mb-8 text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden mb-4">
                    <img src={currentAssistant.avatar} alt={currentAssistant.name} className="w-full h-full object-cover" />
                  </div>
                  <h1 className="text-4xl font-semibold mb-2">{currentAssistant.name}</h1>
                  <p className="text-gray-400 max-w-lg">{currentAssistant.description}</p>
                  {currentAssistant.author && (
                    <p className="text-sm text-gray-500 mt-2">Por {currentAssistant.author}</p>
                  )}
                </div>
              )}
              <div>
                <h1 className={`mb-8 text-4xl font-semibold text-center ${currentAssistant ? 'sr-only' : ''}`}>¿En qué puedo ayudarte?</h1>
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <ActionButtons />
            </div>
          ) : (
            <>
              <div className="w-full flex flex-col items-center justify-center mb-8 pt-4">
                {currentAssistant && (
                  <div className="text-center mb-4">
                    <h1 className="text-3xl font-semibold mb-2">{currentAssistant.name}</h1>
                    {currentAssistant.author && (
                      <p className="text-sm text-gray-500">Por {currentAssistant.author}</p>
                    )}
                  </div>
                )}
              </div>
              <MessageList 
                messages={messages} 
                assistantId={currentAssistant?.id}
              />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <div className="text-xs text-center text-gray-500 py-2">
                ChatGPT puede cometer errores. Verifica la información importante.
              </div>
            </>
          )}
        </div>
      </main>

      <SettingsMenu 
        isOpen={isSettingsMenuOpen}
        onClose={() => setIsSettingsMenuOpen(false)}
        onOpenSettings={handleOpenSettings}
        onOpenMyGPTs={handleOpenMyGPTs}
        onOpenCustomize={handleOpenCustomize}
      />

      <SettingsWindow 
        isOpen={isSettingsWindowOpen}
        onClose={() => setIsSettingsWindowOpen(false)}
      />

      <MyGPTsWindow 
        isOpen={isMyGPTsWindowOpen}
        onClose={() => setIsMyGPTsWindowOpen(false)}
      />

      <CustomizeWindow 
        isOpen={isCustomizeWindowOpen}
        onClose={() => setIsCustomizeWindowOpen(false)}
      />
    </div>
  );
};

export default Index;
