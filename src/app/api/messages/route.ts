import { NextRequest, NextResponse } from 'next/server';
import { getConversationsForUser } from '@/data/mockMessages';
import { getUserById } from '@/data/mockUsers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'alumni_01'; // Default to demo user

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const conversations = getConversationsForUser(userId);

    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
