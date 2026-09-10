import { Conversation, Message } from '@/lib/types';

export const mockConversations: Conversation[] = [
  {
    id: 'conv_01',
    participantIds: ['alumni_01', 'child_01'],
    lastMessageAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  },
  {
    id: 'conv_02',
    participantIds: ['athlete_01', 'child_03'],
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 'conv_03',
    participantIds: ['alumni_02', 'child_02'],
    lastMessageAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
  },
  {
    id: 'conv_04',
    participantIds: ['athlete_02', 'child_01'],
    lastMessageAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
  },
];

export const mockMessages: Message[] = [
  // Conversation 1: Sarah (alumni_01) and Alex (child_01)
  {
    id: 'msg_01',
    conversationId: 'conv_01',
    senderId: 'child_01',
    body: 'Hey Sarah! I just finished my math homework and got all the answers right! 🧮✨',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg_02',
    conversationId: 'conv_01',
    senderId: 'alumni_01',
    body: 'That\'s amazing, Alex! I knew you could do it. You\'re a math superstar! 🌟 What was your favorite problem?',
    createdAt: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg_03',
    conversationId: 'conv_01',
    senderId: 'child_01',
    body: 'The one with the baseball statistics! ⚾️ Can we do more of those next time?',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg_04',
    conversationId: 'conv_01',
    senderId: 'alumni_01',
    body: 'Absolutely! I\'ll prepare some fun baseball math problems for our next session. You\'re going to love them! 😊',
    createdAt: new Date(Date.now() - 23 * 60 * 1000).toISOString(),
  },

  // Conversation 2: Marcus (athlete_01) and Tyler (child_03)
  {
    id: 'msg_05',
    conversationId: 'conv_02',
    senderId: 'child_03',
    body: 'Marcus! I made my first basket today at practice! 🏀🥳',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg_06',
    conversationId: 'conv_02',
    senderId: 'athlete_01',
    body: 'TYLER! That\'s incredible! I\'m so proud of you! You\'ve been working so hard and it\'s paying off. 🎉',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg_07',
    conversationId: 'conv_02',
    senderId: 'child_03',
    body: 'Thank you! Can we practice more shots tomorrow? I want to get even better! 💪',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
  },

  // Conversation 3: David (alumni_02) and Emma (child_02)
  {
    id: 'msg_08',
    conversationId: 'conv_03',
    senderId: 'child_02',
    body: 'David! I swam 2 full laps today without stopping! 🏊‍♀️',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg_09',
    conversationId: 'conv_03',
    senderId: 'alumni_02',
    body: 'Emma, that\'s fantastic progress! You\'re becoming such a strong swimmer. I\'m so impressed! 🌊',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000 + 3 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg_10',
    conversationId: 'conv_03',
    senderId: 'child_02',
    body: 'Thank you! I love swimming with you. When can we go to the big pool? 😊',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000 + 6 * 60 * 1000).toISOString(),
  },

  // Conversation 4: Jessica (athlete_02) and Alex (child_01)
  {
    id: 'msg_11',
    conversationId: 'conv_04',
    senderId: 'athlete_02',
    body: 'Hey Alex! How are you feeling after our run yesterday? Ready for more training? 🏃‍♀️',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg_12',
    conversationId: 'conv_04',
    senderId: 'child_01',
    body: 'I feel great! My legs are a little tired but I had so much fun! Can we run by the park again?',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000 + 4 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg_13',
    conversationId: 'conv_04',
    senderId: 'athlete_02',
    body: 'Of course! The park is my favorite place to run too. See you tomorrow, champ! 💨🌳',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000 + 7 * 60 * 1000).toISOString(),
  },
];

export function getConversationById(id: string): Conversation | undefined {
  return mockConversations.find(conv => conv.id === id);
}

export function getConversationsForUser(userId: string): Conversation[] {
  return mockConversations
    .filter(conv => conv.participantIds.includes(userId))
    .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
}

export function getMessagesForConversation(conversationId: string): Message[] {
  return mockMessages
    .filter(msg => msg.conversationId === conversationId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function addMessage(message: Message): void {
  mockMessages.push(message);

  // Update conversation's lastMessageAt
  const conversation = mockConversations.find(conv => conv.id === message.conversationId);
  if (conversation) {
    conversation.lastMessageAt = message.createdAt;
  }
}

export function createConversation(participantIds: string[]): Conversation {
  const newConversation: Conversation = {
    id: `conv_${Date.now()}`,
    participantIds,
    lastMessageAt: new Date().toISOString(),
  };

  mockConversations.push(newConversation);
  return newConversation;
}
