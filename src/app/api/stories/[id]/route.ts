import { NextRequest, NextResponse } from 'next/server';
import { getAllStories, markStoryAsViewed, addStoryReaction } from '@/data/mockStories';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const stories = getAllStories();
    const story = stories.find(s => s.id === id);

    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // Check if story has expired
    if (new Date(story.expiresAt) <= new Date()) {
      return NextResponse.json({ error: 'Story has expired' }, { status: 410 });
    }

    // Mark as viewed if userId provided
    if (userId && !story.views.includes(userId)) {
      markStoryAsViewed(id, userId);
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const stories = getAllStories();
    const story = stories.find(s => s.id === id);

    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (action === 'view') {
      if (!story.views.includes(userId)) {
        markStoryAsViewed(id, userId);
      }
      return NextResponse.json({ success: true });
    }

    if (action === 'react') {
      const { reactionType } = body;
      if (!reactionType || !['like', 'support', 'celebrate'].includes(reactionType)) {
        return NextResponse.json({ error: 'Invalid reaction type' }, { status: 400 });
      }
      
      addStoryReaction(id, reactionType);
      return NextResponse.json({ success: true, reactions: story.reactions });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating story:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
