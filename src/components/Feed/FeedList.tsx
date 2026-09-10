'use client';

import { PostCard } from './PostCard';
import { Post, User } from '@/lib/types';

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface FeedListProps {
  posts: Post[];
  users: User[];
  onSavePost?: (postId: string, isSaved: boolean) => void;
  savedPosts?: Set<string>;
}

// Generate mock comments for posts
const generateMockComments = (post: Post, users: User[], commentCount: number): Comment[] => {
  const comments: Comment[] = [];
  const mockCommenters = users.filter(u => u.id !== post.authorId).slice(0, Math.min(commentCount, 3));

  for (let i = 0; i < Math.min(commentCount, mockCommenters.length); i++) {
    const commenter = mockCommenters[i];
    const commentTemplates = [
      "This is such an inspiring post! Keep up the great work.",
      "Love seeing the positive impact of these mentorship programs!",
      "Great work everyone! The community is stronger together.",
      "Amazing dedication and teamwork on display here!",
      "These stories always motivate me to do more!",
      "The commitment to helping others is truly admirable."
    ];

    comments.push({
      id: `comment_${post.id}_${i}`,
      authorId: commenter.id,
      authorName: commenter.name,
      content: commentTemplates[i % commentTemplates.length],
      createdAt: new Date(Date.now() - (i + 1) * 60 * 60 * 1000).toISOString() // Spread out over time
    });
  }

  return comments;
};

export function FeedList({ posts, users, onSavePost, savedPosts }: FeedListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-600 mb-4">
          There are no posts matching your current filter. Try selecting a different filter or check back later.
        </p>
        <p className="text-sm text-gray-500">
          Posts will appear here when they match your selected criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => {
        const author = users.find(user => user.id === post.authorId);
        if (!author) return null;

        return (
          <PostCard
            key={post.id}
            post={post}
            authorName={author.name}
            authorRole={author.role}
            authorAvatar={author.avatarUrl}
            onSave={onSavePost}
            isSaved={savedPosts?.has(post.id) || false}
            index={index}
            initialComments={generateMockComments(post, users, post.commentCount || 0)}
          />
        );
      })}
    </div>
  );
}
