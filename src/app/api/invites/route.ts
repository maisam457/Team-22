import { NextResponse } from 'next/server';
import { id } from '@/lib/utils';

export async function POST() {
  try {
    // Generate a simple UUID-like invite code
    const code = `invite_${id()}`;

    return NextResponse.json({ code });
  } catch (error) {
    console.error('Error creating invite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // For demo purposes, we'll just return a mock validation
  // In a real app, this would validate against a database
  return NextResponse.json({
    valid: true,
    message: 'Invite code is valid (mock validation)'
  });
}
