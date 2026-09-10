import { NextRequest, NextResponse } from 'next/server';
import { mockUsers, getUserById } from '@/data/mockUsers';
import { mockPosts } from '@/data/mockPosts';
import { scorePostsForUser } from '@/lib/scoring';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'alumni_01'; // Default to demo user

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Score and sort posts for the user
    const scoredPosts = scorePostsForUser(user, mockPosts, mockUsers);

    return NextResponse.json(scoredPosts);
  } catch (error) {
    console.error('Error fetching feed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
