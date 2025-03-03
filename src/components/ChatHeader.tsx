
import { ChevronDown } from "lucide-react";

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ isSidebarOpen = true }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`font-semibold ${!isSidebarOpen ? 'ml-24' : ''}`}>ChatGPT</span>
      <ChevronDown className="h-4 w-4" />
    </div>
  );
};

export default ChatHeader;
