import { Post } from '@/lib/types';
import { mockTags } from './mockTags';

export const mockPosts: Post[] = [
  {
    id: 'post_01',
    authorId: 'alumni_01',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    content: 'As a former college basketball player, I was thrilled to witness the incredible determination and teamwork at today\'s practice session. These young athletes inspire me every single day with their resilience and passion for the game. #TeamIMPACT #BasketballFamily',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2022/08/Go-team-600x450-1.jpg?fit=600%2C450&quality=89&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'basketball')!,
      mockTags.find(t => t.id === 'boston-ma')!,
    ],
    reactions: { like: 12, support: 8, celebrate: 5 },
    commentCount: 3,
  },
  {
    id: 'post_02',
    authorId: 'child_01',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    content: 'As Alex\'s parent, I couldn\'t be more grateful for the incredible swimming program that has given my son so much confidence and joy. Watching him learn new strokes and build his skills has been absolutely heartwarming. Thank you to all the amazing coaches and volunteers who make this possible! 🏊‍♀️💙',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2024/03/TMOYMason6-e1710170568138.jpeg?fit=768%2C768&quality=89&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'swimming')!,
      mockTags.find(t => t.id === 'austin-tx')!,
    ],
    reactions: { like: 15, support: 12, celebrate: 7 },
    commentCount: 5,
  },
  {
    id: 'post_03',
    authorId: 'athlete_01',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    content: 'I scored the winning goal in today\'s soccer match! The rush of crossing that finish line with my teammates cheering is something I\'ll never forget. Being part of this team has taught me so much about perseverance and teamwork. ⚽️🏆',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2025/08/1-1.png?fit=800%2C960&quality=80&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'soccer')!,
      mockTags.find(t => t.id === 'phoenix-az')!,
    ],
    reactions: { like: 18, support: 14, celebrate: 9 },
    commentCount: 7,
  },
  {
    id: 'post_04',
    authorId: 'child_02',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    content: 'As Emma\'s mother, I am overwhelmed with gratitude for the track and field program that has transformed my daughter\'s confidence. Watching her run her personal best time with the crowd cheering was absolutely magical. Thank you to the incredible coaches who believe in our children! 🏃‍♀️💖',
    images: [
      'https://images.squarespace-cdn.com/content/v1/53e6596be4b064fa800da676/1407620507225-WDO6QQ83WVJH70VM94VZ/Bloemfontein_3.17.11-214.jpg?format=1500w'
    ],
    tags: [
      mockTags.find(t => t.id === 'track-field')!,
      mockTags.find(t => t.id === 'miami-fl')!,
    ],
    reactions: { like: 22, support: 16, celebrate: 11 },
    commentCount: 4,
  },
  {
    id: 'post_05',
    authorId: 'alumni_02',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    content: 'I had the honor of witnessing an incredible tennis tournament today where young athletes demonstrated exceptional skill and sportsmanship. The level of dedication and passion shown by these players fills me with hope for the future of our sport. 🎾🏆',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2025/09/FullSizeRender-scaled-1.webp?fit=800%2C600&quality=80&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'tennis')!,
      mockTags.find(t => t.id === 'dallas-tx')!,
    ],
    reactions: { like: 14, support: 10, celebrate: 6 },
    commentCount: 2,
  },
  {
    id: 'post_06',
    authorId: 'child_03',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    content: 'As Tyler\'s father, I\'m incredibly grateful for the volleyball program that has brought so much joy and teamwork into my son\'s life. Watching him learn new serves and spikes with his teammates has been absolutely heartwarming. Thank you to all the amazing coaches! 🏐💙',
    images: [
      'https://www.ncaa.com/_flysystem/public-s3/styles/original/public-s3/media/maryland_11.jpg?itok=Rkmwn-nL'
    ],
    tags: [
      mockTags.find(t => t.id === 'volleyball')!,
      mockTags.find(t => t.id === 'austin-tx')!,
    ],
    reactions: { like: 25, support: 18, celebrate: 12 },
    commentCount: 8,
  },
  {
    id: 'post_07',
    authorId: 'athlete_02',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    content: 'I crossed the finish line first in today\'s cross country meet! The feeling of pushing through those final miles with my teammates cheering is something I\'ll never forget. This sport has taught me so much about mental toughness and perseverance. 🏃‍♂️🏆',
    images: [
      'https://images.squarespace-cdn.com/content/v1/53e6596be4b064fa800da676/1407620507225-WDO6QQ83WVJH70VM94VZ/Bloemfontein_3.17.11-214.jpg?format=1500w'
    ],
    tags: [
      mockTags.find(t => t.id === 'cross-country')!,
      mockTags.find(t => t.id === 'denver-co')!,
    ],
    reactions: { like: 16, support: 13, celebrate: 8 },
    commentCount: 3,
  },
  {
    id: 'post_08',
    authorId: 'child_04',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    content: 'As Sofia\'s mother, I am so grateful for the hockey program that has brought such joy and camaraderie into my daughter\'s life. Watching her develop teamwork skills and confidence on the ice has been absolutely wonderful. Thank you to all the incredible coaches and volunteers! 🏒💖',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2024/03/TMOYMason6-e1710170568138.jpeg?fit=768%2C768&quality=89&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'hockey')!,
      mockTags.find(t => t.id === 'atlanta-ga')!,
    ],
    reactions: { like: 19, support: 15, celebrate: 9 },
    commentCount: 6,
  },
  {
    id: 'post_09',
    authorId: 'alumni_01',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    content: 'What an amazing wrestling tournament! The dedication and sportsmanship shown by all the athletes was truly inspiring. These young competitors are the future of the sport! 🤼‍♂️🏅',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2025/09/FullSizeRender-scaled-1.webp?fit=800%2C600&quality=80&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'wrestling')!,
      mockTags.find(t => t.id === 'new-york-ny')!,
    ],
    reactions: { like: 21, support: 17, celebrate: 10 },
    commentCount: 4,
  },
  {
    id: 'post_10',
    authorId: 'child_01',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    content: 'As Alex\'s parent, I\'m so thankful for the baseball program that has given my son such confidence and joy. Watching him learn to hit curveballs and field grounders with his teammates has been absolutely wonderful. Thank you to the amazing coaches! ⚾️💙',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2022/08/Go-team-600x450-1.jpg?fit=600%2C450&quality=89&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'baseball')!,
      mockTags.find(t => t.id === 'los-angeles-ca')!,
    ],
    reactions: { like: 13, support: 9, celebrate: 5 },
    commentCount: 2,
  },
  {
    id: 'post_11',
    authorId: 'athlete_01',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    content: 'Incredible golf tournament today! The precision and focus these young golfers showed was remarkable. So proud of their dedication and sportsmanship! ⛳️🏆',
    images: [
      'https://www.ncaa.com/_flysystem/public-s3/styles/original/public-s3/media/maryland_11.jpg?itok=Rkmwn-nL'
    ],
    tags: [
      mockTags.find(t => t.id === 'golf')!,
      mockTags.find(t => t.id === 'phoenix-az')!,
    ],
    reactions: { like: 17, support: 14, celebrate: 8 },
    commentCount: 5,
  },
  {
    id: 'post_12',
    authorId: 'child_02',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    content: 'Fantastic lacrosse practice today! Learning to catch and throw with my teammates. The teamwork makes it so much more fun! 🥍⚡',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2025/08/1-1.png?fit=800%2C960&quality=80&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'lacrosse')!,
      mockTags.find(t => t.id === 'denver-co')!,
    ],
    reactions: { like: 11, support: 8, celebrate: 4 },
    commentCount: 3,
  },
  {
    id: 'post_13',
    authorId: 'alumni_02',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    content: 'Outstanding softball game today! The skill and strategy on display was incredible. These young athletes are developing real talent! 🥎💪',
    images: [
      'https://images.squarespace-cdn.com/content/v1/53e6596be4b064fa800da676/1407620507225-WDO6QQ83WVJH70VM94VZ/Bloemfontein_3.17.11-214.jpg?format=1500w'
    ],
    tags: [
      mockTags.find(t => t.id === 'softball')!,
      mockTags.find(t => t.id === 'chicago-il')!,
    ],
    reactions: { like: 20, support: 16, celebrate: 11 },
    commentCount: 7,
  },
  {
    id: 'post_14',
    authorId: 'child_03',
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
    content: 'Amazing swimming lesson today! Learning butterfly stroke and diving techniques. The water feels like my second home now! 🏊‍♀️🌊',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2024/03/TMOYMason6-e1710170568138.jpeg?fit=768%2C768&quality=89&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'swimming')!,
      mockTags.find(t => t.id === 'miami-fl')!,
    ],
    reactions: { like: 14, support: 10, celebrate: 6 },
    commentCount: 4,
  },
  {
    id: 'post_15',
    authorId: 'athlete_02',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    content: 'Incredible football practice today! The team\'s coordination and strategy work was outstanding. These young athletes are developing real leadership skills! 🏈👏',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2025/09/FullSizeRender-scaled-1.webp?fit=800%2C600&quality=80&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'football')!,
      mockTags.find(t => t.id === 'austin-tx')!,
    ],
    reactions: { like: 18, support: 15, celebrate: 9 },
    commentCount: 6,
  },
  {
    id: 'post_16',
    authorId: 'child_04',
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(), // 11 days ago
    content: 'Amazing tennis lesson today! Learning proper serve technique and footwork. My coach makes it so much fun to learn! 🎾🏆',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2022/08/Go-team-600x450-1.jpg?fit=600%2C450&quality=89&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'tennis')!,
      mockTags.find(t => t.id === 'dallas-tx')!,
    ],
    reactions: { like: 16, support: 12, celebrate: 7 },
    commentCount: 5,
  },
  {
    id: 'post_17',
    authorId: 'alumni_01',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    content: 'Outstanding basketball tournament! The teamwork and skill development I witnessed was incredible. These young athletes are the future stars of the sport! 🏀⭐',
    images: [
      'https://www.ncaa.com/_flysystem/public-s3/styles/original/public-s3/media/maryland_11.jpg?itok=Rkmwn-nL'
    ],
    tags: [
      mockTags.find(t => t.id === 'basketball')!,
      mockTags.find(t => t.id === 'boston-ma')!,
    ],
    reactions: { like: 24, support: 19, celebrate: 13 },
    commentCount: 8,
  },
  {
    id: 'post_18',
    authorId: 'child_01',
    createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(), // 13 days ago
    content: 'Amazing soccer practice today! Learning dribbling skills and team strategies. My teammates are the best! ⚽️👥',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2025/08/1-1.png?fit=800%2C960&quality=80&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'soccer')!,
      mockTags.find(t => t.id === 'new-york-ny')!,
    ],
    reactions: { like: 12, support: 9, celebrate: 5 },
    commentCount: 3,
  },
  {
    id: 'post_19',
    authorId: 'athlete_01',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    content: 'Fantastic volleyball match today! The serves, spikes, and teamwork were all incredible. These young athletes are developing real competitive spirit! 🏐🔥',
    images: [
      'https://images.squarespace-cdn.com/content/v1/53e6596be4b064fa800da676/1407620507225-WDO6QQ83WVJH70VM94VZ/Bloemfontein_3.17.11-214.jpg?format=1500w'
    ],
    tags: [
      mockTags.find(t => t.id === 'volleyball')!,
      mockTags.find(t => t.id === 'los-angeles-ca')!,
    ],
    reactions: { like: 23, support: 18, celebrate: 12 },
    commentCount: 9,
  },
  {
    id: 'post_20',
    authorId: 'child_02',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 14 days ago + 2 hours
    content: 'Incredible track and field practice! Learning hurdles and sprint techniques. The feeling of crossing the finish line first is amazing! 🏃‍♀️🥇',
    images: [
      'https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2024/03/TMOYMason6-e1710170568138.jpeg?fit=768%2C768&quality=89&ssl=1'
    ],
    tags: [
      mockTags.find(t => t.id === 'track-field')!,
      mockTags.find(t => t.id === 'atlanta-ga')!,
    ],
    reactions: { like: 15, support: 11, celebrate: 6 },
    commentCount: 4,
  },
];

export function addPost(post: Post): void {
  mockPosts.unshift(post);
}

export function getPostsByAuthor(authorId: string): Post[] {
  return mockPosts.filter(post => post.authorId === authorId);
}
