
import { Menu } from 'lucide-react';

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  currentAssistant?: string;
}

const ChatHeader = ({ isSidebarOpen, currentAssistant }: ChatHeaderProps) => {
  return (
    <div className="flex items-center">
      {!isSidebarOpen && (
        <button className="h-9 w-9 rounded-md p-2 mr-3 hover:bg-chatgpt-hover">
          <Menu className="h-5 w-5" />
        </button>
      )}
      <span className="font-semibold text-lg">
        {currentAssistant || "Nexus AI"}
      </span>
    </div>
  );
};

export default ChatHeader;
