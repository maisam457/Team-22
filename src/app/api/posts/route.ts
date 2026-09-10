import { NextRequest, NextResponse } from 'next/server';
import { addPost } from '@/data/mockPosts';
import { getUserById } from '@/data/mockUsers';
import { getTagById } from '@/data/mockTags';
import { Post, Tag } from '@/lib/types';
import { id, nowISO } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { authorId, content, tagIds } = body;

    if (!authorId || !content || !Array.isArray(tagIds)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const author = getUserById(authorId);
    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    // Validate tag IDs
    const tags = tagIds.map(tagId => getTagById(tagId)).filter((tag): tag is Tag => tag !== undefined);
    if (tags.length !== tagIds.length) {
      return NextResponse.json({ error: 'Invalid tag IDs' }, { status: 400 });
    }

    const newPost: Post = {
      id: id(),
      authorId,
      createdAt: nowISO(),
      content,
      tags,
      reactions: { like: 0, support: 0, celebrate: 0 },
      commentCount: 0,
    };

    addPost(newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
