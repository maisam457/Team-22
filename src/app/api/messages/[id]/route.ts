import { NextRequest, NextResponse } from 'next/server';
import { getMessagesForConversation, addMessage, getConversationById } from '@/data/mockMessages';
import { getUserById } from '@/data/mockUsers';
import { id, nowISO } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: conversationId } = await params;
    const conversation = getConversationById(conversationId);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    const messages = getMessagesForConversation(conversationId);

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: conversationId } = await params;
    const conversation = getConversationById(conversationId);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    const body = await request.json();
    const { senderId, message: messageBody } = body;

    if (!senderId || !messageBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const sender = getUserById(senderId);
    if (!sender) {
      return NextResponse.json({ error: 'Sender not found' }, { status: 404 });
    }

    if (!conversation.participantIds.includes(senderId)) {
      return NextResponse.json({ error: 'User not in conversation' }, { status: 403 });
    }

    const newMessage = {
      id: id(),
      conversationId,
      senderId,
      body: messageBody,
      createdAt: nowISO(),
    };

    addMessage(newMessage);

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
