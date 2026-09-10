import { NextRequest, NextResponse } from 'next/server';
import { CreateDonationPayload, DonationEventDTO } from '@/lib/types';

// Mock data store (replace with actual database)
let donations: DonationEventDTO[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    const mine = searchParams.get('mine');

    let filteredDonations = [...donations];

    // Filter by active status
    if (active === 'true') {
      const now = new Date();
      filteredDonations = filteredDonations.filter(
        donation => new Date(donation.startAt) <= now && new Date(donation.endAt) >= now
      );
    } else if (active === 'false') {
      const now = new Date();
      filteredDonations = filteredDonations.filter(
        donation => new Date(donation.startAt) > now || new Date(donation.endAt) < now
      );
    }

    // Filter by creator (mine)
    if (mine === 'true') {
      // In a real app, you'd get the user ID from the session
      const userId = 'user_123'; // Mock user ID
      filteredDonations = filteredDonations.filter(donation => donation.creatorId === userId);
    }

    // Sort by start date descending
    filteredDonations.sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());

    return NextResponse.json({ donations: filteredDonations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateDonationPayload = await request.json();

    // Validate required fields
    if (!body.title || body.title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (body.title.length > 80) {
      return NextResponse.json(
        { error: 'Title must be 80 characters or less' },
        { status: 400 }
      );
    }

    if (body.description && body.description.length > 1000) {
      return NextResponse.json(
        { error: 'Description must be 1000 characters or less' },
        { status: 400 }
      );
    }

    if (!body.goalAmountCents || body.goalAmountCents <= 0) {
      return NextResponse.json(
        { error: 'Goal amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (!body.externalPaymentUrl || body.externalPaymentUrl.trim().length === 0) {
      return NextResponse.json(
        { error: 'External payment URL is required' },
        { status: 400 }
      );
    }

    if (!body.startAt || !body.endAt) {
      return NextResponse.json(
        { error: 'Start and end dates are required' },
        { status: 400 }
      );
    }

    if (new Date(body.startAt) >= new Date(body.endAt)) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Validate URL format
    const isValidUrl = (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (body.coverImageUrl && !isValidUrl(body.coverImageUrl)) {
      return NextResponse.json(
        { error: 'Cover image URL must be a valid URL' },
        { status: 400 }
      );
    }

    if (!isValidUrl(body.externalPaymentUrl)) {
      return NextResponse.json(
        { error: 'External payment URL must be a valid URL' },
        { status: 400 }
      );
    }

    // Create donation event
    const donation: DonationEventDTO = {
      id: `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: body.title.trim(),
      description: body.description?.trim(),
      coverImageUrl: body.coverImageUrl?.trim(),
      goalAmountCents: body.goalAmountCents,
      currency: body.currency,
      externalPaymentUrl: body.externalPaymentUrl.trim(),
      startAt: body.startAt,
      endAt: body.endAt,
      beneficiary: body.beneficiary?.trim(),
      tags: body.tags || [],
      visibility: body.visibility,
      allowComments: body.allowComments,
      creatorId: 'user_123', // In a real app, get from session
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to mock store
    donations.unshift(donation);

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json(
      { error: 'Failed to create donation' },
      { status: 500 }
    );
  }
}
