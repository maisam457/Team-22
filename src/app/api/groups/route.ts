import { NextRequest, NextResponse } from 'next/server';
import { CreateGroupPayload, Group } from '@/lib/types';

// Mock data store (replace with actual database)
let groups: Group[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let filteredGroups = [...groups];

    // Filter by user's groups (creator or member)
    if (userId) {
      filteredGroups = filteredGroups.filter(
        group => group.creatorId === userId
      );
    }

    // Sort by creation date descending
    filteredGroups.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ groups: filteredGroups });
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch groups' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateGroupPayload = await request.json();

    // Validate required fields
    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Group name is required' },
        { status: 400 }
      );
    }

    if (body.name.length > 50) {
      return NextResponse.json(
        { error: 'Group name must be 50 characters or less' },
        { status: 400 }
      );
    }

    if (body.description && body.description.length > 500) {
      return NextResponse.json(
        { error: 'Description must be 500 characters or less' },
        { status: 400 }
      );
    }

    // Create group
    const group: Group = {
      id: `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: body.name.trim(),
      description: body.description?.trim(),
      privacy: body.privacy,
      creatorId: 'user_123', // In a real app, get from session
      memberCount: 1, // Creator is automatically a member
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to mock store
    groups.unshift(group);

    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json(
      { error: 'Failed to create group' },
      { status: 500 }
    );
  }
}
