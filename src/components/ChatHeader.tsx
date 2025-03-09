
import { Menu, Lock } from 'lucide-react';
import { assistants } from '@/data/assistants';

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  currentAssistant?: string;
}

const ChatHeader = ({ isSidebarOpen, currentAssistant }: ChatHeaderProps) => {
  // Find the current assistant to check if it's private
  const assistant = currentAssistant 
    ? assistants.find(a => a.name === currentAssistant)
    : null;

  return (
    <div className="flex items-center">
      {!isSidebarOpen && (
        <button className="h-9 w-9 rounded-md p-2 mr-3 hover:bg-chatgpt-hover">
          <Menu className="h-5 w-5" />
        </button>
      )}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-lg">
          {currentAssistant || "Nexus AI"}
        </span>
        {assistant?.visibility === "private" && (
          <Lock className="h-4 w-4 text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
