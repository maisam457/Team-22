import { NextRequest, NextResponse } from 'next/server';
import { getAllStories, addStory, markStoryAsViewed, addStoryReaction } from '@/data/mockStories';
import { getUserById } from '@/data/mockUsers';
import { Story } from '@/lib/types';
import { id, nowISO } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const stories = getAllStories();
    
    if (userId) {
      // Return stories grouped by author with view status
      const storyGroups = stories.reduce((acc, story) => {
        const existingGroup = acc.find(group => group.authorId === story.authorId);
        const author = getUserById(story.authorId);
        
        if (existingGroup) {
          existingGroup.stories.push(story);
        } else {
          acc.push({
            authorId: story.authorId,
            authorName: author?.name || 'Unknown User',
            authorAvatar: author?.avatarUrl || '',
            authorRole: author?.role || 'CHILD',
            stories: [story],
            hasUnviewed: !story.views.includes(userId)
          });
        }
        return acc;
      }, [] as any[]);

      return NextResponse.json(storyGroups);
    }

    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { authorId, content, mediaUrl, mediaType } = body;

    if (!authorId) {
      return NextResponse.json({ error: 'Author ID is required' }, { status: 400 });
    }

    if (!content && !mediaUrl) {
      return NextResponse.json({ error: 'Content or media is required' }, { status: 400 });
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    const newStory: Story = {
      id: id(),
      authorId,
      createdAt: nowISO(),
      expiresAt: expiresAt.toISOString(),
      content: content || '',
      mediaUrl: mediaUrl || undefined,
      mediaType: mediaType || undefined,
      views: [],
      reactions: { like: 0, support: 0, celebrate: 0 }
    };

    addStory(newStory);

    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
