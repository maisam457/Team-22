'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Conversation, User } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

interface ThreadsListProps {
  conversations: Conversation[];
  users: User[];
  selectedConversationId?: string;
  onConversationSelect: (conversationId: string) => void;
}

export function ThreadsList({
  conversations,
  users,
  selectedConversationId,
  onConversationSelect
}: ThreadsListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-2">No conversations yet</p>
        <p className="text-sm text-muted-foreground">
          Start a conversation by posting or connecting with others!
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full scrollbar-thin">
      <div className="space-y-3 p-6">
        {conversations.map((conversation) => {
          // Get the other participant (not the current user)
          const otherParticipantId = conversation.participantIds.find(id => id !== 'alumni_01');
          const otherParticipant = otherParticipantId ? users.find(u => u.id === otherParticipantId) : null;

          if (!otherParticipant) return null;

          const isSelected = selectedConversationId === conversation.id;

          return (
            <Button
              key={conversation.id}
              variant={isSelected ? "secondary" : "ghost"}
              className={`w-full justify-start p-4 h-auto transition-all duration-200 hover:scale-[1.02] ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200'
                  : 'hover:bg-white/60 hover:shadow-md'
              }`}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <div className="flex items-start space-x-3 w-full">
                <Avatar className="h-12 w-12 flex-shrink-0 ring-2 ring-blue-100">
                  <AvatarImage src={otherParticipant.avatarUrl} alt={otherParticipant.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    {otherParticipant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold truncate text-gray-900">{otherParticipant.name}</p>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {otherParticipant.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {formatRelativeTime(conversation.lastMessageAt)}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
