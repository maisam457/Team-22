'use client';

import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message, User } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';

interface ChatWindowProps {
  messages: Message[];
  users: User[];
  currentUserId: string;
}

export function ChatWindow({ messages, users, currentUserId }: ChatWindowProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-center p-8">
        <div>
          <p className="text-muted-foreground mb-2">No messages yet</p>
          <p className="text-sm text-muted-foreground">
            Start the conversation!
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea ref={scrollAreaRef} className="h-full p-6 scrollbar-thin">
      <div className="space-y-6">
        {messages.map((message) => {
          const sender = users.find(user => user.id === message.senderId);
          const isCurrentUser = message.senderId === currentUserId;

          if (!sender) return null;

          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-3 max-w-[75%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-blue-100">
                  <AvatarImage src={sender.avatarUrl} alt={sender.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm">
                    {sender.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-semibold text-gray-900">{sender.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(message.createdAt)}
                    </span>
                  </div>

                  <div
                    className={`px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-black'
                        : 'bg-white border border-gray-200 text-black'
                    }`}
                  >
                    {message.body}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
