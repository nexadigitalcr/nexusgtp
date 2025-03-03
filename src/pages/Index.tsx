
import { useState } from 'react';
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

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // State for UI components
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isSettingsWindowOpen, setIsSettingsWindowOpen] = useState(false);
  const [isMyGPTsWindowOpen, setIsMyGPTsWindowOpen] = useState(false);
  const [isCustomizeWindowOpen, setIsCustomizeWindowOpen] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
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

      const assistantMessage: Message = {
        role: 'assistant',
        content: "I am a hardcoded response. The database connection has been removed for testing purposes. You can modify this response in the Index.tsx file."
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
            <ChatHeader isSidebarOpen={isSidebarOpen} />
            <UserButton onClick={handleToggleSettingsMenu} />
          </div>
        </div>
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              <div>
                <h1 className="mb-8 text-4xl font-semibold text-center">What can I help with?</h1>
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
                ChatGPT can make mistakes. Check important info.
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
