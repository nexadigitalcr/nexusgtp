
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

  // State for UI components
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isSettingsWindowOpen, setIsSettingsWindowOpen] = useState(false);
  const [isMyGPTsWindowOpen, setIsMyGPTsWindowOpen] = useState(false);
  const [isCustomizeWindowOpen, setIsCustomizeWindowOpen] = useState(false);

  useEffect(() => {
    if (assistantId) {
      const foundAssistant = assistants.find(a => a.id === assistantId);
      if (foundAssistant) {
        setCurrentAssistant(foundAssistant);
        
        // Add a welcome message from the assistant
        setMessages([{
          role: 'assistant',
          content: `Hola, soy ${foundAssistant.name}. ${foundAssistant.description} ¿En qué puedo ayudarte hoy?`
        }]);
        
        // Show a toast to confirm selection
        toast({
          title: `${foundAssistant.name} seleccionado`,
          description: "Ahora estás chateando con un asistente especializado.",
        });
      }
    }
  }, [assistantId, toast]);

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

      // Simulate API delay
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
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="fixed top-0 z-30 w-full border-b border-white/20 bg-chatgpt-main/95 backdrop-blur">
          <div className="flex h-[60px] items-center justify-between px-4">
            <ChatHeader 
              isSidebarOpen={isSidebarOpen} 
              currentAssistant={currentAssistant ? currentAssistant.name : undefined}
            />
            <UserButton onClick={handleToggleSettingsMenu} />
          </div>
        </div>
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              <div>
                <h1 className="mb-8 text-4xl font-semibold text-center">¿En qué puedo ayudarte?</h1>
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <ActionButtons />
            </div>
          ) : (
            <>
              <MessageList messages={messages} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <div className="text-xs text-center text-gray-500 py-2">
                Nexus AI puede cometer errores. Verifica la información importante.
              </div>
            </>
          )}
        </div>
      </main>

      {/* Settings Menu */}
      <SettingsMenu 
        isOpen={isSettingsMenuOpen}
        onClose={() => setIsSettingsMenuOpen(false)}
        onOpenSettings={handleOpenSettings}
        onOpenMyGPTs={handleOpenMyGPTs}
        onOpenCustomize={handleOpenCustomize}
      />

      {/* Settings Window */}
      <SettingsWindow 
        isOpen={isSettingsWindowOpen}
        onClose={() => setIsSettingsWindowOpen(false)}
      />

      {/* My GPTs Window */}
      <MyGPTsWindow 
        isOpen={isMyGPTsWindowOpen}
        onClose={() => setIsMyGPTsWindowOpen(false)}
      />

      {/* Customize Window */}
      <CustomizeWindow 
        isOpen={isCustomizeWindowOpen}
        onClose={() => setIsCustomizeWindowOpen(false)}
      />
    </div>
  );
};

export default Index;
