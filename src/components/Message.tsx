
import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';
import { assistants } from '@/data/assistants';

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
  assistantId?: string;
};

const Message = ({ role, content, assistantId }: MessageProps) => {
  // Find the current assistant if it's an assistant message
  const currentAssistant = role === 'assistant' && assistantId 
    ? assistants.find(a => a.id === assistantId) 
    : null;

  return (
    <div className="py-6">
      <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <MessageAvatar 
          isAssistant={role === 'assistant'} 
          avatar={currentAssistant?.avatar}
        />
        <div className={`flex-1 space-y-2 ${role === 'user' ? 'flex justify-end' : ''}`}>
          <div className={`${role === 'user' ? 'bg-gray-700/50 rounded-[20px] px-4 py-2 inline-block' : ''}`}>
            {content}
          </div>
          {role === 'assistant' && <MessageActions />}
        </div>
      </div>
    </div>
  );
};

export default Message;
