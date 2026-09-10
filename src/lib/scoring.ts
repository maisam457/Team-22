import { Post, User } from './types';

export function scorePostsForUser(user: User, posts: Post[], users: User[]): Post[] {
  const scoredPosts = posts.map(post => {
    const author = users.find(u => u.id === post.authorId);
    if (!author) return { post, score: 0 };

    let score = 0;

    // Shared interest tags (+3 each)
    const userInterests = user.tags.filter(t => t.type === 'INTEREST');
    const postInterests = post.tags.filter(t => t.type === 'INTEREST');
    const sharedInterests = userInterests.filter(ui =>
      postInterests.some(pi => pi.id === ui.id)
    );
    score += sharedInterests.length * 3;

    // Shared diagnosis tags (+2 each) - DIAGNOSIS type no longer exists
    // const userDiagnoses = user.tags.filter(t => t.type === 'DIAGNOSIS');
    // const postDiagnoses = post.tags.filter(t => t.type === 'DIAGNOSIS');
    // const sharedDiagnoses = userDiagnoses.filter(ud =>
    //   postDiagnoses.some(pd => pd.id === ud.id)
    // );
    // score += sharedDiagnoses.length * 2;

    // Same state (+2)
    if (user.location?.state && author.location?.state &&
        user.location.state === author.location.state) {
      score += 2;
    }

    // Following the author (+1)
    if (user.followingIds.includes(author.id)) {
      score += 1;
    }

    // Slight penalty for self-posts (-1) to avoid showing own posts first
    if (author.id === user.id) {
      score -= 1;
    }

    // Recency boost (newer posts score higher)
    const postDate = new Date(post.createdAt);
    const now = new Date();
    const daysOld = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
    const recencyBoost = Math.max(0, 10 - daysOld);
    score += recencyBoost;

    return { post, score };
  });

  // Sort by score desc, then by recency desc
  return scoredPosts
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.post.createdAt).getTime() - new Date(a.post.createdAt).getTime();
    })
    .map(sp => sp.post);
}
