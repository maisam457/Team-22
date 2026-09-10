import { Story } from '@/lib/types';
import { id, nowISO } from '@/lib/utils';

// Helper function to create expiration time (24 hours from now)
const createExpirationTime = () => {
  const now = new Date();
  const expiration = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
  return expiration.toISOString();
};

export const mockStories: Story[] = [
  // Test story - guaranteed to work
  {
    id: 'test-story-1',
    authorId: 'alumni_01',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    expiresAt: createExpirationTime(),
    content: 'This is a test story! Click me to see the story viewer in action! 🎉',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'alumni_01',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    expiresAt: createExpirationTime(),
    content: 'Just finished a great mentoring session with Alex! He\'s making amazing progress with his baseball skills 🏟️⚾',
    mediaUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'athlete_01'],
    reactions: { like: 3, support: 2, celebrate: 1 }
  },
  {
    id: id(),
    authorId: 'child_01',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    expiresAt: createExpirationTime(),
    content: 'Had my first baseball practice today! Feeling strong 💪',
    mediaUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_01', 'athlete_01', 'child_02'],
    reactions: { like: 5, support: 4, celebrate: 3 }
  },
  {
    id: id(),
    authorId: 'athlete_01',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    expiresAt: createExpirationTime(),
    content: 'Team IMPACT game day! So proud of our team spirit 🎉',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'alumni_01', 'child_03'],
    reactions: { like: 7, support: 5, celebrate: 6 }
  },
  {
    id: id(),
    authorId: 'child_02',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    expiresAt: createExpirationTime(),
    content: 'Swimming lesson went great today! 🏊‍♀️',
    mediaUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_01', 'alumni_02'],
    reactions: { like: 4, support: 3, celebrate: 2 }
  },
  {
    id: id(),
    authorId: 'alumni_02',
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    expiresAt: createExpirationTime(),
    content: 'Sharing some coding tips with our young STEM enthusiasts! 💻',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'child_04'],
    reactions: { like: 6, support: 4, celebrate: 3 }
  },
  {
    id: id(),
    authorId: 'child_03',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    expiresAt: createExpirationTime(),
    content: 'Basketball practice with my team! We\'re getting better every day 🏀',
    mediaUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['athlete_01', 'athlete_02'],
    reactions: { like: 5, support: 3, celebrate: 4 }
  },
  {
    id: id(),
    authorId: 'athlete_02',
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), // 14 hours ago
    expiresAt: createExpirationTime(),
    content: 'Track practice was amazing today! Setting new personal records 🏃‍♀️',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_03', 'child_01'],
    reactions: { like: 8, support: 6, celebrate: 5 }
  },
  {
    id: id(),
    authorId: 'child_04',
    createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), // 16 hours ago
    expiresAt: createExpirationTime(),
    content: 'Art therapy session was so relaxing today 🎨',
    mediaUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_02', 'child_02'],
    reactions: { like: 4, support: 2, celebrate: 3 }
  },
  {
    id: id(),
    authorId: 'alumni_01',
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    expiresAt: createExpirationTime(),
    content: 'Morning workout complete! Ready to tackle the day 💪',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'athlete_01', 'child_02'],
    reactions: { like: 6, support: 4, celebrate: 2 }
  },
  {
    id: id(),
    authorId: 'child_01',
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
    expiresAt: createExpirationTime(),
    content: 'Playing my favorite video game after treatment! Gaming helps me relax 🎮',
    mediaUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_01', 'athlete_01'],
    reactions: { like: 7, support: 5, celebrate: 4 }
  },
  // Additional stories for more variety
  {
    id: id(),
    authorId: 'athlete_01',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    expiresAt: createExpirationTime(),
    content: 'Just finished a virtual workout session with my mentee! Technology is amazing 🏃‍♂️💻',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01'],
    reactions: { like: 9, support: 7, celebrate: 8 }
  },
  {
    id: id(),
    authorId: 'child_02',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    expiresAt: createExpirationTime(),
    content: 'Made a new friend at the pool today! Swimming brings people together 🏊‍♀️👫',
    mediaUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_01', 'alumni_02', 'child_04'],
    reactions: { like: 6, support: 5, celebrate: 4 }
  },
  {
    id: id(),
    authorId: 'alumni_02',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Building a robot with my mentee! STEM education is so important 🤖',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'child_04', 'athlete_01'],
    reactions: { like: 8, support: 6, celebrate: 7 }
  },
  {
    id: id(),
    authorId: 'child_03',
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
    expiresAt: createExpirationTime(),
    content: 'Team dinner after practice! Love my basketball family 🏀🍕',
    mediaUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['athlete_01', 'athlete_02', 'child_01'],
    reactions: { like: 7, support: 5, celebrate: 6 }
  },
  {
    id: id(),
    authorId: 'athlete_02',
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), // 9 hours ago
    expiresAt: createExpirationTime(),
    content: 'Volunteering at the local children\'s hospital today! Giving back feels amazing ❤️',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_03', 'child_01', 'alumni_01'],
    reactions: { like: 12, support: 10, celebrate: 9 }
  },
  {
    id: id(),
    authorId: 'child_04',
    createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), // 11 hours ago
    expiresAt: createExpirationTime(),
    content: 'Finished my painting! Art helps me express my feelings 🎨🌈',
    mediaUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_02', 'child_02', 'athlete_02'],
    reactions: { like: 9, support: 7, celebrate: 8 }
  },
  {
    id: id(),
    authorId: 'alumni_01',
    createdAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(), // 13 hours ago
    expiresAt: createExpirationTime(),
    content: 'Reading bedtime stories to my mentee over video call! Distance can\'t stop our bond 📚💙',
    mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'child_02', 'athlete_01'],
    reactions: { like: 11, support: 9, celebrate: 7 }
  },
  {
    id: id(),
    authorId: 'child_01',
    createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(), // 15 hours ago
    expiresAt: createExpirationTime(),
    content: 'Math homework done! My mentor helped me understand fractions 🧮✨',
    mediaUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_01', 'athlete_01', 'alumni_02'],
    reactions: { like: 8, support: 6, celebrate: 5 }
  },
  {
    id: id(),
    authorId: 'athlete_01',
    createdAt: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(), // 17 hours ago
    expiresAt: createExpirationTime(),
    content: 'Team IMPACT family dinner! So grateful for this community 🍽️❤️',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'child_03', 'athlete_02'],
    reactions: { like: 10, support: 8, celebrate: 9 }
  },
  {
    id: id(),
    authorId: 'child_02',
    createdAt: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(), // 19 hours ago
    expiresAt: createExpirationTime(),
    content: 'Music therapy session was magical today! 🎵🎶',
    mediaUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_01', 'alumni_02', 'child_04'],
    reactions: { like: 7, support: 5, celebrate: 6 }
  },
  {
    id: id(),
    authorId: 'alumni_02',
    createdAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(), // 21 hours ago
    expiresAt: createExpirationTime(),
    content: 'Virtual reality experience with my mentee! Technology is incredible 🥽🚀',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'child_04', 'athlete_01'],
    reactions: { like: 9, support: 7, celebrate: 8 }
  },
  {
    id: id(),
    authorId: 'child_03',
    createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(), // 23 hours ago
    expiresAt: createExpirationTime(),
    content: 'Basketball tournament tomorrow! Feeling nervous but excited 🏀😬',
    mediaUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['athlete_01', 'athlete_02', 'child_01'],
    reactions: { like: 6, support: 8, celebrate: 7 }
  },
  {
    id: id(),
    authorId: 'athlete_02',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    expiresAt: createExpirationTime(),
    content: 'Morning run with my mentee! Starting the day right 🏃‍♀️🌅',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_03', 'child_01'],
    reactions: { like: 8, support: 6, celebrate: 5 }
  },
  {
    id: id(),
    authorId: 'child_04',
    createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(), // 2.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Swimming competition this weekend! Training hard 🏊‍♀️💪',
    mediaUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_02', 'child_02', 'athlete_02'],
    reactions: { like: 7, support: 5, celebrate: 6 }
  },
  {
    id: id(),
    authorId: 'alumni_01',
    createdAt: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(), // 30 minutes ago
    expiresAt: createExpirationTime(),
    content: 'Just got a message from my mentee - they aced their test! So proud! 🎉📚',
    mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01'],
    reactions: { like: 12, support: 10, celebrate: 11 }
  },
  {
    id: id(),
    authorId: 'child_01',
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Playing catch with my dad! Family time is the best ⚾👨‍👦',
    mediaUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_01', 'athlete_01'],
    reactions: { like: 9, support: 7, celebrate: 8 }
  },
  {
    id: id(),
    authorId: 'athlete_01',
    createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(), // 3.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Team IMPACT reunion! Seeing everyone again after so long 🎉👥',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'child_03', 'athlete_02'],
    reactions: { like: 11, support: 9, celebrate: 10 }
  },
  {
    id: id(),
    authorId: 'child_02',
    createdAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(), // 4.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Dance class was so fun today! Moving to the music 🕺💃',
    mediaUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_01', 'alumni_02', 'child_04'],
    reactions: { like: 8, support: 6, celebrate: 7 }
  },
  {
    id: id(),
    authorId: 'alumni_02',
    createdAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(), // 5.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Coding workshop for kids! Teaching the next generation of programmers 💻👶',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_01', 'child_04', 'athlete_01'],
    reactions: { like: 10, support: 8, celebrate: 9 }
  },
  {
    id: id(),
    authorId: 'child_03',
    createdAt: new Date(Date.now() - 6.5 * 60 * 60 * 1000).toISOString(), // 6.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Basketball camp graduation! Got my certificate today 🏀📜',
    mediaUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['athlete_01', 'athlete_02', 'child_01'],
    reactions: { like: 9, support: 7, celebrate: 8 }
  },
  {
    id: id(),
    authorId: 'athlete_02',
    createdAt: new Date(Date.now() - 7.5 * 60 * 60 * 1000).toISOString(), // 7.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Marathon training with my mentee! Building endurance together 🏃‍♀️💪',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['child_03', 'child_01', 'alumni_01'],
    reactions: { like: 8, support: 6, celebrate: 7 }
  },
  {
    id: id(),
    authorId: 'child_04',
    createdAt: new Date(Date.now() - 8.5 * 60 * 60 * 1000).toISOString(), // 8.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Art gallery visit! So inspired by all the beautiful paintings 🎨🖼️',
    mediaUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: ['alumni_02', 'child_02', 'athlete_02'],
    reactions: { like: 7, support: 5, celebrate: 6 }
  },
  // Additional stories for better scrolling
  {
    id: id(),
    authorId: 'alumni_01',
    createdAt: new Date(Date.now() - 0.25 * 60 * 60 * 1000).toISOString(), // 15 minutes ago
    expiresAt: createExpirationTime(),
    content: 'Quick update: Just finished a virtual mentoring session! Technology is amazing 📱💙',
    mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_01',
    createdAt: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(), // 30 minutes ago
    expiresAt: createExpirationTime(),
    content: 'Just finished my homework with help from my mentor! Math is getting easier 📚✨',
    mediaUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'athlete_01',
    createdAt: new Date(Date.now() - 0.75 * 60 * 60 * 1000).toISOString(), // 45 minutes ago
    expiresAt: createExpirationTime(),
    content: 'Morning practice complete! Ready to tackle the day with my team 🏃‍♂️⚽',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_02',
    createdAt: new Date(Date.now() - 1.25 * 60 * 60 * 1000).toISOString(), // 1.25 hours ago
    expiresAt: createExpirationTime(),
    content: 'Swimming lesson was amazing! I\'m getting so much better 🏊‍♀️💪',
    mediaUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'alumni_02',
    createdAt: new Date(Date.now() - 1.75 * 60 * 60 * 1000).toISOString(), // 1.75 hours ago
    expiresAt: createExpirationTime(),
    content: 'Coding session with my mentee! Teaching them about web development 💻🌐',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_03',
    createdAt: new Date(Date.now() - 2.25 * 60 * 60 * 1000).toISOString(), // 2.25 hours ago
    expiresAt: createExpirationTime(),
    content: 'Basketball practice was intense today! My shooting is improving 🏀🎯',
    mediaUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'athlete_02',
    createdAt: new Date(Date.now() - 2.75 * 60 * 60 * 1000).toISOString(), // 2.75 hours ago
    expiresAt: createExpirationTime(),
    content: 'Track meet preparation! Feeling confident about tomorrow\'s race 🏃‍♀️🏆',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_04',
    createdAt: new Date(Date.now() - 3.25 * 60 * 60 * 1000).toISOString(), // 3.25 hours ago
    expiresAt: createExpirationTime(),
    content: 'Art therapy session was so peaceful today! Creating beautiful things 🎨🌈',
    mediaUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  // Stories from new diverse users
  {
    id: id(),
    authorId: 'alumni_03',
    createdAt: new Date(Date.now() - 0.75 * 60 * 60 * 1000).toISOString(), // 45 minutes ago
    expiresAt: createExpirationTime(),
    content: 'Just finished my shift at the children\'s hospital. These kids are so brave! 🏥💙',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'athlete_03',
    createdAt: new Date(Date.now() - 1.25 * 60 * 60 * 1000).toISOString(), // 1.25 hours ago
    expiresAt: createExpirationTime(),
    content: 'Basketball practice with my mentee! Teaching them about teamwork 🏀👥',
    mediaUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_05',
    createdAt: new Date(Date.now() - 1.75 * 60 * 60 * 1000).toISOString(), // 1.75 hours ago
    expiresAt: createExpirationTime(),
    content: 'Dance class was amazing! I love moving to the music 💃🎵',
    mediaUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'alumni_04',
    createdAt: new Date(Date.now() - 2.25 * 60 * 60 * 1000).toISOString(), // 2.25 hours ago
    expiresAt: createExpirationTime(),
    content: 'Physical therapy session went great! Helping kids build strength 💪🏃‍♂️',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'athlete_04',
    createdAt: new Date(Date.now() - 2.75 * 60 * 60 * 1000).toISOString(), // 2.75 hours ago
    expiresAt: createExpirationTime(),
    content: 'Volleyball practice complete! Ready for the big game tomorrow 🏐🏆',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_06',
    createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(), // 3.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Built a robot with my mentor today! Coding is so much fun 🤖💻',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'alumni_05',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    expiresAt: createExpirationTime(),
    content: 'Psychology session with a young patient today. So rewarding to help! 🧠💙',
    mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'athlete_05',
    createdAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(), // 4.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Football practice was intense! Teaching my mentee about perseverance 🏈💪',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_07',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Swimming lesson was so much fun! I\'m getting better every day 🏊‍♀️✨',
    mediaUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  // More stories from new users
  {
    id: id(),
    authorId: 'alumni_03',
    createdAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(), // 5.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Nursing school graduation party! So excited to help more kids 🎓👩‍⚕️',
    mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'athlete_03',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    expiresAt: createExpirationTime(),
    content: 'Psychology exam tomorrow! Studying hard to help kids better 🧠📚',
    mediaUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_05',
    createdAt: new Date(Date.now() - 6.5 * 60 * 60 * 1000).toISOString(), // 6.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Made a new friend at dance class! We\'re going to be dance partners 💃👫',
    mediaUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'alumni_04',
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
    expiresAt: createExpirationTime(),
    content: 'Adaptive sports clinic today! So inspiring to see kids overcome challenges 🏃‍♂️🌟',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'athlete_04',
    createdAt: new Date(Date.now() - 7.5 * 60 * 60 * 1000).toISOString(), // 7.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Special education class was amazing! Learning how to support kids better 📚💙',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_06',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    expiresAt: createExpirationTime(),
    content: 'Gaming tournament with my friends! We\'re getting really good at coding games 🎮💻',
    mediaUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'alumni_05',
    createdAt: new Date(Date.now() - 8.5 * 60 * 60 * 1000).toISOString(), // 8.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Research presentation went great! Studying how sports help kids with disabilities 🧠🏃‍♀️',
    mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'athlete_05',
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), // 9 hours ago
    expiresAt: createExpirationTime(),
    content: 'Education class about inclusive sports! Learning to make sports accessible for everyone 🏈♿',
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  },
  {
    id: id(),
    authorId: 'child_07',
    createdAt: new Date(Date.now() - 9.5 * 60 * 60 * 1000).toISOString(), // 9.5 hours ago
    expiresAt: createExpirationTime(),
    content: 'Art class was so fun! Painted a picture of my swimming pool 🎨🏊‍♀️',
    mediaUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop',
    mediaType: 'image',
    views: [],
    reactions: { like: 0, support: 0, celebrate: 0 }
  }
];

export function getStoriesByAuthor(authorId: string): Story[] {
  return mockStories.filter(story => story.authorId === authorId);
}

export function getAllStories(): Story[] {
  return mockStories.filter(story => {
    // Filter out expired stories
    return new Date(story.expiresAt) > new Date();
  });
}

export function addStory(story: Story): void {
  mockStories.unshift(story);
}

export function markStoryAsViewed(storyId: string, userId: string): void {
  const story = mockStories.find(s => s.id === storyId);
  if (story && !story.views.includes(userId)) {
    story.views.push(userId);
  }
}

export function addStoryReaction(storyId: string, reactionType: 'like' | 'support' | 'celebrate'): void {
  const story = mockStories.find(s => s.id === storyId);
  if (story) {
    story.reactions[reactionType]++;
  }
}
