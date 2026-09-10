import { User } from '@/lib/types';
import { mockTags } from './mockTags';

export const mockUsers: User[] = [
  {
    id: 'alumni_01',
    name: 'Sarah Johnson',
    role: 'ALUMNI',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Former college basketball player, now mentoring young athletes with disabilities.',
    tags: [
      mockTags.find(t => t.id === 'basketball')!,
      mockTags.find(t => t.id === 'running')!,
      mockTags.find(t => t.id === 'boston-ma')!,
    ],
    location: { city: 'Boston', state: 'MA' },
    followingIds: ['child_01', 'athlete_01', 'child_02'],
  },
  {
    id: 'child_01',
    name: 'Alex Rodriguez',
    role: 'CHILD',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: '10-year-old baseball fan fighting leukemia. Loves video games and math.',
    tags: [
      mockTags.find(t => t.id === 'baseball')!,
      mockTags.find(t => t.id === 'soccer')!,
      mockTags.find(t => t.id === 'austin-tx')!,
    ],
    location: { city: 'Austin', state: 'TX' },
    followingIds: ['alumni_01', 'athlete_01'],
  },
  {
    id: 'athlete_01',
    name: 'Marcus Thompson',
    role: 'ATHLETE',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'College soccer player matched with a child who has cerebral palsy.',
    tags: [
      mockTags.find(t => t.id === 'soccer')!,
      mockTags.find(t => t.id === 'running')!,
      mockTags.find(t => t.id === 'tennis')!,
      mockTags.find(t => t.id === 'phoenix-az')!,
    ],
    location: { city: 'Phoenix', state: 'AZ' },
    followingIds: ['alumni_01', 'child_01', 'child_03'],
  },
  {
    id: 'child_02',
    name: 'Emma Davis',
    role: 'CHILD',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: '8-year-old swimmer with Down syndrome. Loves art and music.',
    tags: [
      mockTags.find(t => t.id === 'swimming')!,
      mockTags.find(t => t.id === 'volleyball')!,
      mockTags.find(t => t.id === 'golf')!,
      mockTags.find(t => t.id === 'track-field')!,
      mockTags.find(t => t.id === 'boston-ma')!,
    ],
    location: { city: 'Boston', state: 'MA' },
    followingIds: ['alumni_01', 'alumni_02'],
  },
  {
    id: 'alumni_02',
    name: 'David Chen',
    role: 'ALUMNI',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Former swimmer, now working in tech. Passionate about helping kids with autism.',
    tags: [
      mockTags.find(t => t.id === 'swimming')!,
      mockTags.find(t => t.id === 'hockey')!,
      mockTags.find(t => t.id === 'softball')!,
      mockTags.find(t => t.id === 'dallas-tx')!,
    ],
    location: { city: 'Dallas', state: 'TX' },
    followingIds: ['child_02', 'child_04'],
  },
  {
    id: 'child_03',
    name: 'Tyler Wilson',
    role: 'CHILD',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: '12-year-old basketball player with cancer. Loves reading and video games.',
    tags: [
      mockTags.find(t => t.id === 'basketball')!,
      mockTags.find(t => t.id === 'wrestling')!,
      mockTags.find(t => t.id === 'lacrosse')!,
      mockTags.find(t => t.id === 'football')!,
      mockTags.find(t => t.id === 'chicago-il')!,
    ],
    location: { city: 'Chicago', state: 'IL' },
    followingIds: ['athlete_01', 'athlete_02'],
  },
  {
    id: 'athlete_02',
    name: 'Jessica Brown',
    role: 'ATHLETE',
    avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    bio: 'Track and field athlete mentoring children with various disabilities.',
    tags: [
      mockTags.find(t => t.id === 'running')!,
      mockTags.find(t => t.id === 'golf')!,
      mockTags.find(t => t.id === 'swimming')!,
      mockTags.find(t => t.id === 'miami-fl')!,
    ],
    location: { city: 'Miami', state: 'FL' },
    followingIds: ['child_03', 'child_01'],
  },
  {
    id: 'child_04',
    name: 'Sofia Martinez',
    role: 'CHILD',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: '9-year-old artist with cerebral palsy. Loves swimming and reading.',
    tags: [
      mockTags.find(t => t.id === 'volleyball')!,
      mockTags.find(t => t.id === 'swimming')!,
      mockTags.find(t => t.id === 'wrestling')!,
      mockTags.find(t => t.id === 'tennis')!,
      mockTags.find(t => t.id === 'dallas-tx')!,
    ],
    location: { city: 'Dallas', state: 'TX' },
    followingIds: ['alumni_02', 'child_02'],
  },
  // Additional diverse users
  {
    id: 'alumni_03',
    name: 'Maria Garcia',
    role: 'ALUMNI',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Former swimmer, now pediatric nurse. Passionate about helping children with chronic illnesses.',
    tags: [
      mockTags.find(t => t.id === 'swimming')!,
      mockTags.find(t => t.id === 'hockey')!,
      mockTags.find(t => t.id === 'football')!,
      mockTags.find(t => t.id === 'miami-fl')!,
    ],
    location: { city: 'Miami', state: 'FL' },
    followingIds: ['child_01', 'child_03', 'athlete_02'],
  },
  {
    id: 'athlete_03',
    name: 'Jordan Kim',
    role: 'ATHLETE',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'College basketball player mentoring children with autism. Studying psychology.',
    tags: [
      mockTags.find(t => t.id === 'basketball')!,
      mockTags.find(t => t.id === 'hockey')!,
      mockTags.find(t => t.id === 'softball')!,
      mockTags.find(t => t.id === 'chicago-il')!,
    ],
    location: { city: 'Chicago', state: 'IL' },
    followingIds: ['child_01', 'child_04', 'alumni_01'],
  },
  {
    id: 'child_05',
    name: 'Maya Patel',
    role: 'CHILD',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: '11-year-old dancer with Down syndrome. Loves music and making friends.',
    tags: [
      mockTags.find(t => t.id === 'golf')!,
      mockTags.find(t => t.id === 'volleyball')!,
      mockTags.find(t => t.id === 'track-field')!,
      mockTags.find(t => t.id === 'boston-ma')!,
    ],
    location: { city: 'Boston', state: 'MA' },
    followingIds: ['alumni_01', 'child_02', 'athlete_03'],
  },
  {
    id: 'alumni_04',
    name: 'James Wilson',
    role: 'ALUMNI',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Former track athlete, now physical therapist. Specializes in adaptive sports.',
    tags: [
      mockTags.find(t => t.id === 'running')!,
      mockTags.find(t => t.id === 'hockey')!,
      mockTags.find(t => t.id === 'tennis')!,
      mockTags.find(t => t.id === 'austin-tx')!,
    ],
    location: { city: 'Austin', state: 'TX' },
    followingIds: ['athlete_01', 'child_03', 'child_05'],
  },
  {
    id: 'athlete_04',
    name: 'Taylor Chen',
    role: 'ATHLETE',
    avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    bio: 'College volleyball player. Studying special education and loves working with kids.',
    tags: [
      mockTags.find(t => t.id === 'basketball')!,
      mockTags.find(t => t.id === 'golf')!,
      mockTags.find(t => t.id === 'softball')!,
      mockTags.find(t => t.id === 'dallas-tx')!,
    ],
    location: { city: 'Dallas', state: 'TX' },
    followingIds: ['child_04', 'child_05', 'alumni_02'],
  },
  {
    id: 'child_06',
    name: 'Noah Johnson',
    role: 'CHILD',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: '13-year-old gamer with leukemia. Loves coding and building robots.',
    tags: [
      mockTags.find(t => t.id === 'lacrosse')!,
      mockTags.find(t => t.id === 'hockey')!,
      mockTags.find(t => t.id === 'swimming')!,
      mockTags.find(t => t.id === 'chicago-il')!,
    ],
    location: { city: 'Chicago', state: 'IL' },
    followingIds: ['alumni_02', 'alumni_03', 'athlete_03'],
  },
  {
    id: 'alumni_05',
    name: 'Dr. Lisa Brown',
    role: 'ALUMNI',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Former gymnast, now child psychologist. Specializes in helping children with disabilities.',
    tags: [
      mockTags.find(t => t.id === 'running')!,
      mockTags.find(t => t.id === 'hockey')!,
      mockTags.find(t => t.id === 'softball')!,
      mockTags.find(t => t.id === 'miami-fl')!,
    ],
    location: { city: 'Miami', state: 'FL' },
    followingIds: ['child_01', 'child_05', 'athlete_04'],
  },
  {
    id: 'athlete_05',
    name: 'Ryan O\'Connor',
    role: 'ATHLETE',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'College football player. Majoring in education and loves mentoring young athletes.',
    tags: [
      mockTags.find(t => t.id === 'baseball')!,
      mockTags.find(t => t.id === 'running')!,
      mockTags.find(t => t.id === 'football')!,
      mockTags.find(t => t.id === 'boston-ma')!,
    ],
    location: { city: 'Boston', state: 'MA' },
    followingIds: ['child_01', 'child_03', 'alumni_01'],
  },
  {
    id: 'child_07',
    name: 'Zoe Anderson',
    role: 'CHILD',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: '10-year-old artist with cerebral palsy. Loves painting and swimming.',
    tags: [
      mockTags.find(t => t.id === 'volleyball')!,
      mockTags.find(t => t.id === 'swimming')!,
      mockTags.find(t => t.id === 'tennis')!,
      mockTags.find(t => t.id === 'austin-tx')!,
    ],
    location: { city: 'Austin', state: 'TX' },
    followingIds: ['athlete_01', 'alumni_04', 'child_04'],
  }
];

export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}

export function upsertUser(user: Partial<User> & { id: string }): User {
  const existingIndex = mockUsers.findIndex(u => u.id === user.id);
  const updatedUser = { ...mockUsers[existingIndex], ...user };

  if (existingIndex >= 0) {
    mockUsers[existingIndex] = updatedUser;
  } else {
    mockUsers.push(updatedUser);
  }

  return updatedUser;
}
