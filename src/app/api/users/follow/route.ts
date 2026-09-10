import { NextRequest, NextResponse } from 'next/server';
import { followUser, unfollowUser, getUserById } from '@/data/mockUsers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { actorId, targetId, action } = body;
    if (!actorId || !targetId || !action) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const actor = getUserById(actorId);
    const target = getUserById(targetId);
    if (!actor || !target) {
      return NextResponse.json({ error: 'User(s) not found' }, { status: 404 });
    }

    if (action === 'follow') {
      const updated = followUser(actorId, targetId);
      return NextResponse.json({ success: true, user: updated });
    }

    if (action === 'unfollow') {
      const updated = unfollowUser(actorId, targetId);
      return NextResponse.json({ success: true, user: updated });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('Follow API error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
