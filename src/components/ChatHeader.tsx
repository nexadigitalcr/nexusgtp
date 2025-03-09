
import { useState } from 'react';
import { Menu, Lock, ChevronDown, MessageSquarePlus, Info, Pin, PinOff, MessageSquare } from 'lucide-react';
import { Assistant } from '@/data/assistants';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AboutAssistantModal from './AboutAssistantModal';

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  currentAssistant?: Assistant | null;
  onNewChat?: () => void;
  onTogglePin?: (assistantId: string) => void;
}

const ChatHeader = ({ 
  isSidebarOpen, 
  currentAssistant,
  onNewChat,
  onTogglePin
}: ChatHeaderProps) => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    }
  };

  const handleTogglePin = () => {
    if (onTogglePin && currentAssistant) {
      onTogglePin(currentAssistant.id);
    }
  };

  return (
    <div className="flex items-center">
      {!isSidebarOpen && (
        <button className="h-9 w-9 rounded-md p-2 mr-3 hover:bg-chatgpt-hover">
          <Menu className="h-5 w-5" />
        </button>
      )}
      <div className="flex items-center gap-2">
        {currentAssistant && (
          <div className="w-7 h-7 rounded-full bg-gray-700 overflow-hidden mr-1 border border-white/10">
            <img src={currentAssistant.avatar} alt={currentAssistant.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex items-center">
          <span className="font-semibold text-lg">
            {currentAssistant ? currentAssistant.name : "Nexus AI"}
          </span>
          {currentAssistant?.visibility === "private" && (
            <Lock className="h-4 w-4 text-gray-400 ml-2" />
          )}
          
          {currentAssistant && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-1 p-1 h-auto">
                  <ChevronDown className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleNewChat} className="flex items-center gap-2">
                  <MessageSquarePlus className="h-4 w-4 text-gray-300" />
                  <span>Nuevo Chat</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsAboutModalOpen(true)} className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-gray-300" />
                  <span>Acerca de</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleTogglePin} className="flex items-center gap-2">
                  {currentAssistant.isPinned ? (
                    <>
                      <PinOff className="h-4 w-4 text-gray-300" />
                      <span>Desanclar del Sidebar</span>
                    </>
                  ) : (
                    <>
                      <Pin className="h-4 w-4 text-gray-300" />
                      <span>Anclar al Sidebar</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-300" />
                  <span>Enviar Comentarios</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      {currentAssistant && (
        <AboutAssistantModal 
          assistant={currentAssistant}
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatHeader;
