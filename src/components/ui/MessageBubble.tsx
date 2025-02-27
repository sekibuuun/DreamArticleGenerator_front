import { cn } from '@/lib/utils';

export interface MessageBubbleProps {
  message: string;
  role: 'user' | 'assistant';
  className?: string;
}

export const MessageBubble = ({ 
  message, 
  role,
  className
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        'flex mb-4',
        role === 'user' ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div
        className={cn(
          'inline-block max-w-xs px-4 py-2 rounded-2xl break-words',
          role === 'user' 
            ? 'bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-br-none' 
            : 'bg-white text-gray-800 border border-pink-100 rounded-bl-none'
        )}
        role="log"
        aria-label={role === 'user' ? 'あなたのメッセージ' : 'アシスタントの返答'}
      >
        {message}
      </div>
    </div>
  );
};