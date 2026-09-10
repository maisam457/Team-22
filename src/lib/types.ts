export type Role = 'CHILD' | 'ATHLETE' | 'ALUMNI';
export type TagType = 'INTEREST' | 'DIAGNOSIS' | 'GEOGRAPHY';

export interface Tag {
  id: string;
  label: string;
  type: TagType;
  value?: string; // e.g., city/state for GEOGRAPHY
}

export interface User {
  id: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  bio?: string;
  tags: Tag[];
  location?: { city: string; state: string; lat?: number; lng?: number };
  followingIds: string[];
  linkedin?: string;
  email?: string;
  phone?: string;
}

export interface Post {
  id: string;
  authorId: string;
  createdAt: string;
  content: string;
  mediaUrl?: string;
  images?: string[]; // Array of image URLs
  tags: Tag[];
  reactions: { like: number; support: number; celebrate: number };
  commentCount: number;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessageAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
}

export interface Story {
  id: string;
  authorId: string;
  createdAt: string;
  expiresAt: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  views: string[]; // Array of user IDs who viewed the story
  reactions: { like: number; support: number; celebrate: number };
}

export interface StoryGroup {
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole: Role;
  stories: Story[];
  hasUnviewed: boolean;
}

export type DonationEventDTO = {
  id: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  goalAmountCents: number;
  currency: 'USD' | 'EUR' | 'GBP';
  externalPaymentUrl: string;
  startAt: string; // ISO
  endAt: string;   // ISO
  beneficiary?: string;
  tags?: string[];
  visibility: 'public' | 'unlisted';
  allowComments: boolean;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
};

export interface CreateDonationPayload {
  title: string;
  description?: string;
  coverImageUrl?: string;
  goalAmountCents: number;
  currency: 'USD' | 'EUR' | 'GBP';
  externalPaymentUrl: string;
  startAt: string;
  endAt: string;
  beneficiary?: string;
  tags?: string[];
  visibility: 'public' | 'unlisted';
  allowComments: boolean;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  privacy: 'public' | 'private';
  creatorId: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupPayload {
  name: string;
  description?: string;
  privacy: 'public' | 'private';
}