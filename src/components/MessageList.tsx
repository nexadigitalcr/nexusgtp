
import Message from './Message';

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

interface MessageListProps {
  messages: MessageProps[];
  assistantId?: string;
}

const MessageList = ({ messages, assistantId }: MessageListProps) => {
  return (
    <div className="w-full h-[calc(100%-130px)] overflow-y-auto pb-8">
      <div className="max-w-3xl mx-auto">
        {messages.map((message, index) => (
          <Message 
            key={index} 
            role={message.role} 
            content={message.content}
            assistantId={assistantId}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
