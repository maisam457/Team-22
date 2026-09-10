'use client';

import { useState, useEffect } from 'react';
import { ThreadsList } from '@/components/Messages/ThreadsList';
import { ChatWindow } from '@/components/Messages/ChatWindow';
import { ChatInput } from '@/components/Messages/ChatInput';
import { Conversation, Message, User } from '@/lib/types';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // TODO: Replace with real auth
  const currentUserId = 'alumni_01';

  useEffect(() => {
    // Fetch conversations and users data
    const fetchData = async () => {
      try {
        // Fetch conversations
        const conversationsResponse = await fetch('/api/messages?userId=alumni_01');
        if (conversationsResponse.ok) {
          const conversationsData = await conversationsResponse.json();
          setConversations(conversationsData);

          // Auto-select the first conversation if available
          if (conversationsData.length > 0) {
            setSelectedConversationId(conversationsData[0].id);
          }
        }

        // For demo, we'll use static user data
        setUsers([
          {
            id: 'child_01',
            name: 'Alex Rodriguez',
            role: 'CHILD' as const,
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            bio: '10-year-old baseball fan fighting leukemia.',
            tags: [],
            location: { city: 'Austin', state: 'TX' },
            followingIds: [],
          },
          {
            id: 'athlete_01',
            name: 'Marcus Thompson',
            role: 'ATHLETE' as const,
            avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            bio: 'College soccer player.',
            tags: [],
            location: { city: 'Austin', state: 'TX' },
            followingIds: [],
          },
          {
            id: 'child_02',
            name: 'Emma Davis',
            role: 'CHILD' as const,
            avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            bio: '8-year-old swimmer with Down syndrome.',
            tags: [],
            location: { city: 'Boston', state: 'MA' },
            followingIds: [],
          },
          {
            id: 'alumni_02',
            name: 'David Chen',
            role: 'ALUMNI' as const,
            avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            bio: 'Former swimmer, now working in tech.',
            tags: [],
            location: { city: 'Seattle', state: 'WA' },
            followingIds: [],
          },
          {
            id: 'child_03',
            name: 'Tyler Wilson',
            role: 'CHILD' as const,
            avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            bio: '12-year-old basketball player with cancer.',
            tags: [],
            location: { city: 'Chicago', state: 'IL' },
            followingIds: [],
          },
          {
            id: 'athlete_02',
            name: 'Jessica Brown',
            role: 'ATHLETE' as const,
            avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
            bio: 'Track and field athlete.',
            tags: [],
            location: { city: 'Miami', state: 'FL' },
            followingIds: [],
          },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Load mock messages once on mount
    import('@/data/mockMessages').then(mod => {
      setAllMessages(mod.mockMessages);
    });
  }, []);

  const handleSendMessage = async (messageBody: string) => {
    if (!selectedConversationId) return;
    const newMessage = {
      id: `local_${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: currentUserId,
      body: messageBody,
      createdAt: new Date().toISOString(),
    };
    setAllMessages(prev => [...prev, newMessage]);
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversationId
          ? { ...conv, lastMessageAt: newMessage.createdAt }
          : conv
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading conversations...</p>
        </div>
      </div>
    );
  }

  const filteredMessages = selectedConversationId
    ? allMessages.filter(m => m.conversationId === selectedConversationId)
    : [];

  return (
    <div className="h-[calc(100vh-200px)] flex border rounded-lg overflow-hidden mt-4">
      {/* Conversations list */}
      <div className="w-1/3 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">Messages</h2>
        </div>
        <ThreadsList
          conversations={conversations}
          users={users}
          selectedConversationId={selectedConversationId || undefined}
          onConversationSelect={setSelectedConversationId}
        />
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedConversationId ? (
          <>
            <ChatWindow
              messages={filteredMessages}
              users={users}
              currentUserId={currentUserId}
            />
            <ChatInput onSendMessage={handleSendMessage} currentUserId={currentUserId} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center p-8">
            <div>
              <p className="text-muted-foreground mb-2">Select a conversation</p>
              <p className="text-sm text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
