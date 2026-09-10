import { NextRequest, NextResponse } from 'next/server';
import { getUserById, upsertUser } from '@/data/mockUsers';
import { getTagById } from '@/data/mockTags';
import { User, Tag } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'alumni_01'; // Default to demo user

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, bio, location, tagIds } = body;

    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const existingUser = getUserById(id);
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updateData: Partial<User> = {};

    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (location !== undefined) updateData.location = location;

    if (tagIds !== undefined && Array.isArray(tagIds)) {
      const tags = tagIds.map(tagId => getTagById(tagId)).filter((tag): tag is Tag => tag !== undefined);
      if (tags.length !== tagIds.length) {
        return NextResponse.json({ error: 'Invalid tag IDs' }, { status: 400 });
      }
      updateData.tags = tags;
    }

    const updatedUser = upsertUser({ id, ...updateData });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
