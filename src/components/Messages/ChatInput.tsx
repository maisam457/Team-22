'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  currentUserId: string;
}

const DONATION_MSG = '[DONATION_REQUEST] 🐾 Would you like to donate to our cause?';

export function ChatInput({ onSendMessage, disabled, currentUserId }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 border-t border-white/20 bg-white/50 backdrop-blur-sm">
      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="min-h-[45px] max-h-32 resize-none bg-white/80 border-white/30 focus:border-blue-300 focus:ring-blue-200 rounded-xl text-black"
            disabled={disabled}
          />
        </div>
        {/* Donation Request Button */}
        <Button
          onClick={() => {
            const draft = 'Hi! Would you consider making a donation of $___ to support our cause?';
            setMessage(draft);
            setTimeout(() => {
              const textarea = document.querySelector('textarea');
              if (textarea) textarea.focus();
            }, 0);
          }}
          disabled={disabled}
          size="icon"
          className="flex-shrink-0 h-11 w-11 bg-green-500 hover:bg-green-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          title="Draft donation request"
        >
          <span className="text-xl">🐾</span>
        </Button>
        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="icon"
          className="flex-shrink-0 h-11 w-11 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
