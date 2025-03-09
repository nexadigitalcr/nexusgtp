
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Assistant } from '@/data/assistants';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface AssistantCardProps {
  assistant: Assistant;
  onClick?: (assistant: Assistant) => void;
  className?: string;
}

const AssistantCard = ({ assistant, onClick, className }: AssistantCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick(assistant);
    } else {
      // Default behavior is to navigate to main chat with assistant parameter
      navigate(`/?assistant=${assistant.id}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "bg-[#2A2A2A] rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:bg-[#383838]",
        className
      )}
    >
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0 transition-transform group-hover:scale-105 duration-300">
          <img src={assistant.avatar} alt={assistant.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-medium group-hover:text-blue-400 transition-colors duration-300">{assistant.name}</h3>
            {assistant.visibility === "private" && (
              <Lock className="h-3 w-3 text-gray-400" />
            )}
          </div>
          <p className="text-xs text-gray-400 line-clamp-2">{assistant.description}</p>
          {assistant.author && (
            <p className="text-xs text-gray-500 mt-1">By {assistant.author}</p>
          )}
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-block px-2 py-1 text-xs bg-[#222222] rounded-full text-gray-300 transition-colors group-hover:bg-[#2a2a2a]">
              {assistant.category}
            </span>
            {assistant.chat_count !== undefined && assistant.chat_count > 0 && (
              <span className="text-xs text-gray-400">
                {assistant.chat_count} {assistant.chat_count === 1 ? 'chat' : 'chats'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantCard;
