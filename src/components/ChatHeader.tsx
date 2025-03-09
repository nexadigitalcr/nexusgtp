
import { Menu, Lock } from 'lucide-react';
import { Assistant } from '@/data/assistants';

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  currentAssistant?: Assistant | null;
}

const ChatHeader = ({ isSidebarOpen, currentAssistant }: ChatHeaderProps) => {
  return (
    <div className="flex items-center">
      {!isSidebarOpen && (
        <button className="h-9 w-9 rounded-md p-2 mr-3 hover:bg-chatgpt-hover">
          <Menu className="h-5 w-5" />
        </button>
      )}
      <div className="flex items-center gap-2">
        {currentAssistant && (
          <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden mr-1">
            <img src={currentAssistant.avatar} alt={currentAssistant.name} className="w-full h-full object-cover" />
          </div>
        )}
        <span className="font-semibold text-lg">
          {currentAssistant ? currentAssistant.name : "Nexus AI"}
        </span>
        {currentAssistant?.visibility === "private" && (
          <Lock className="h-4 w-4 text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
