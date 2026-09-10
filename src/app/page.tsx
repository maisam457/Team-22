'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FiltersBar } from '@/components/Feed/FiltersBar';
import { CreatePost } from '@/components/Feed/CreatePost';
import { FeedList } from '@/components/Feed/FeedList';
import { StoriesFeed } from '@/components/Stories/StoriesFeed';
import { StoryViewer } from '@/components/Stories/StoryViewer';
import { CreateStory } from '@/components/Stories/CreateStory';
import { Post, User, StoryGroup, Story } from '@/lib/types';
import { scorePostsForUser } from '@/lib/scoring';
import { useAuth } from '@/lib/auth';

function HomeContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeFilter = searchParams?.get('filter') || 'all';
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedStoryGroup, setSelectedStoryGroup] = useState<StoryGroup | null>(null);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Load saved posts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedPosts');
    if (saved) {
      try {
        setSavedPosts(new Set(JSON.parse(saved)));
      } catch (error) {
        console.error('Error loading saved posts:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Fetch posts and users data
    const fetchData = async () => {
      try {
        // Fetch posts from API
        let fetchedPosts: Post[] = [];
        const postsResponse = await fetch('/api/feed?userId=alumni_01');
        if (postsResponse.ok) {
          fetchedPosts = await postsResponse.json();
          // If we already have a current user and users list we could score here,
          // but we'll wait until we fetch currentUser and mockUsers below and then
          // re-score to ensure sorting is consistent for the viewer.
          setPosts(fetchedPosts);
        }

        // For demo, we'll use static user data since it's mocked
        // In a real app, you'd fetch this from an API too
        const usersResponse = await fetch('/api/users/me?userId=alumni_01');
        if (usersResponse.ok) {
          const userData = await usersResponse.json();
          setCurrentUser(userData);
          
          // Import all mock users to ensure story authors are available
          const { mockUsers } = await import('@/data/mockUsers');
          setUsers(mockUsers);

          // Re-score posts for the current user using the mock users list so the
          // feed is consistently sorted according to our scoring logic.
          if (fetchedPosts && fetchedPosts.length) {
            try {
              const scored = scorePostsForUser(userData, fetchedPosts, mockUsers);
              setPosts(scored);
            } catch (err) {
              // fallback: keep the posts as-is
              console.error('Error re-scoring posts on client:', err);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, router]);

  const handleFilterChange = (filterId: string) => {
    // update the URL query param so Topbar and page stay in sync
    try {
      router.push(`${pathname}?filter=${filterId}`);
    } catch (err) {
      // fallback: no-op
      console.error('Error changing filter:', err);
    }
  };

  const handleSavePost = (postId: string, isSaved: boolean) => {
    setSavedPosts(prev => {
      const newSaved = new Set(prev);
      if (isSaved) {
        newSaved.add(postId);
      } else {
        newSaved.delete(postId);
      }
      
      // Persist to localStorage
      localStorage.setItem('savedPosts', JSON.stringify([...newSaved]));
      return newSaved;
    });
  };

  const handleCreatePost = async (content: string, tagIds: string[]) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorId: 'alumni_01',
          content,
          tagIds,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        // Prepend and then re-score so the feed remains in the correct order
        setPosts(prev => {
          const updated = [newPost, ...prev];
          if (currentUser) {
            return scorePostsForUser(currentUser, updated, users);
          }
          return updated;
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleStoryCreated = (story: Story) => {
    // Refresh the page or update stories state
    window.location.reload();
  };

  const handleStoryClick = (storyGroup: StoryGroup) => {
    setSelectedStoryGroup(storyGroup);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your feed...</p>
        </div>
      </div>
    );
  }

  // Compute the posts visible for the active filter and current user.
  const getVisiblePosts = () => {
    if (!posts || posts.length === 0) return [] as Post[];

    let candidates = posts.slice(); // copy

    try {
      switch (activeFilter) {
        case 'popular': {
          // Sort by total reactions (most reactions first)
          candidates = candidates.sort((a, b) => {
            const reactionsA = (a.reactions?.like || 0) + (a.reactions?.support || 0) + (a.reactions?.celebrate || 0);
            const reactionsB = (b.reactions?.like || 0) + (b.reactions?.support || 0) + (b.reactions?.celebrate || 0);
            return reactionsB - reactionsA;
          });
          break;
        }

        case 'nearby': {
          // Filter posts and order by proximity to Dallas, TX
          // Define Dallas, TX as the reference point
          const dallasLocation = { city: 'Dallas', state: 'TX' };

          // Sort by distance from Dallas: TX (0) → AZ (1) → Other states (2+)
          candidates = candidates.sort((a, b) => {
            const authorA = users.find(u => u.id === a.authorId);
            const authorB = users.find(u => u.id === b.authorId);

            // Calculate distance scores (lower score = closer)
            const getDistanceScore = (location: { city?: string; state?: string } | undefined) => {
              if (!location) return 999; // Very far if no location

              // Same city (Dallas) gets score 0
              if (location.city === dallasLocation.city && location.state === dallasLocation.state) return 0;

              // Texas (same state, different city) gets score 1
              if (location.state === 'TX') return 1;

              // Arizona gets score 2 (close to Texas)
              if (location.state === 'AZ') return 2;

              // Other states get score 3+
              return 3;
            };

            const distanceA = getDistanceScore(authorA?.location);
            const distanceB = getDistanceScore(authorB?.location);

            // Sort by distance (closest first)
            if (distanceA !== distanceB) return distanceA - distanceB;

            // If same distance, sort by recency
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          break;
        }

        case 'mentorship': {
          // Filter posts that show mentoring relationships
          if (users.length) {
            candidates = candidates.filter(p => {
              const author = users.find(u => u.id === p.authorId);
              if (!author) return false;

              // Include posts by athletes and alumni (mentors)
              const isMentor = author.role === 'ALUMNI' || author.role === 'ATHLETE';

              // Include posts by children that mention their mentors
              const isChildWithMentor = author.role === 'CHILD' &&
                (p.content?.toLowerCase().includes('mentor') ||
                 p.content?.toLowerCase().includes('coach') ||
                 p.content?.toLowerCase().includes('teacher'));

              return isMentor || isChildWithMentor;
            });
          }
          // Sort by mentorship relevance score (mentor posts first, then by recency)
          candidates = candidates.sort((a, b) => {
            const authorA = users.find(u => u.id === a.authorId);
            const authorB = users.find(u => u.id === b.authorId);

            // Mentors (athletes/alumni) get higher priority
            const scoreA = (authorA?.role === 'ALUMNI' || authorA?.role === 'ATHLETE') ? 2 : 1;
            const scoreB = (authorB?.role === 'ALUMNI' || authorB?.role === 'ATHLETE') ? 2 : 1;

            if (scoreA !== scoreB) return scoreB - scoreA;

            // Then sort by recency
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          break;
        }

        case 'events': {
          // Filter for public events open to all Team IMPACT members
          const eventKeywords = /\b(session|event|practice|meet|lesson|tournament|game|match|competition|workshop|clinic|camp|open|everyone|public)\b/i;
          candidates = candidates.filter(p => {
            const hasEventTag = p.tags.some(t => t.id === 'events' || t.id === 'tournament' || t.id === 'practice');
            const matchesKeyword = eventKeywords.test(p.content || '');
            const mentionsPublic = p.content?.toLowerCase().includes('everyone') ||
                                 p.content?.toLowerCase().includes('all members') ||
                                 p.content?.toLowerCase().includes('team impact family') ||
                                 p.content?.toLowerCase().includes('community') ||
                                 p.content?.toLowerCase().includes('public');
            return hasEventTag || matchesKeyword || mentionsPublic;
          });
          // Sort by event relevance score (public events first, then by engagement, then recency)
          candidates = candidates.sort((a, b) => {
            const authorA = users.find(u => u.id === a.authorId);
            const authorB = users.find(u => u.id === b.authorId);

            // Public/community events get highest priority
            const isPublicA = a.content?.toLowerCase().includes('everyone') ||
                             a.content?.toLowerCase().includes('all members') ||
                             a.content?.toLowerCase().includes('community');
            const isPublicB = b.content?.toLowerCase().includes('everyone') ||
                             b.content?.toLowerCase().includes('all members') ||
                             b.content?.toLowerCase().includes('community');

            if (isPublicA && !isPublicB) return -1;
            if (isPublicB && !isPublicA) return 1;

            // Then by engagement
            const engagementA = (a.reactions?.like || 0) + (a.reactions?.support || 0) + (a.reactions?.celebrate || 0);
            const engagementB = (b.reactions?.like || 0) + (b.reactions?.support || 0) + (b.reactions?.celebrate || 0);

            if (engagementA !== engagementB) return engagementB - engagementA;

            // Finally by recency
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          break;
        }

         case 'my-tags': {
           if (currentUser) {
             const myTagIds = currentUser.tags.map(t => t.id);
             candidates = candidates.filter(p => p.tags.some(t => myTagIds.includes(t.id)));
           } else {
             candidates = [];
           }
           // Sort by tag relevance (more matching tags first, then recency)
           if (currentUser) {
             candidates = candidates.sort((a, b) => {
               const matchingTagsA = a.tags.filter(t => currentUser.tags.some(ut => ut.id === t.id)).length;
               const matchingTagsB = b.tags.filter(t => currentUser.tags.some(ut => ut.id === t.id)).length;

               if (matchingTagsA !== matchingTagsB) return matchingTagsB - matchingTagsA;

               return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
             });
           }
           break;
         }

         case 'saved': {
           candidates = candidates.filter(p => savedPosts.has(p.id));
           // Sort by save date (most recently saved first)
           // Since we don't track save dates, sort by original post recency
           candidates = candidates.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
           break;
         }

        case 'all':
        default:
          // Sort all posts by recency for the default view
          candidates = candidates.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    } catch (err) {
      console.error('Error filtering posts for filter', activeFilter, err);
    }

    return candidates;
  };

  const visiblePosts = getVisiblePosts();

  return (
    <div className="space-y-6">
      {/* Stories Feed */}
      <StoriesFeed
        currentUserId={currentUser?.id || 'alumni_01'}
        onStoryClick={handleStoryClick}
        onCreateStory={() => setShowCreateStory(true)}
      />

      <FiltersBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* Only show CreatePost when viewing "all" posts */}
      {activeFilter === 'all' && (
        <CreatePost onPost={handleCreatePost} />
      )}

      <FeedList
        posts={visiblePosts}
        users={users}
        onSavePost={handleSavePost}
        savedPosts={savedPosts}
      />

      {/* Story Viewer */}
      {selectedStoryGroup && (
        <StoryViewer
          storyGroup={selectedStoryGroup}
          currentUserId={currentUser?.id || 'alumni_01'}
          users={users}
          onClose={() => setSelectedStoryGroup(null)}
        />
      )}

      {/* Create Story Modal */}
      {showCreateStory && currentUser && (
        <CreateStory
          currentUser={currentUser}
          onClose={() => setShowCreateStory(false)}
          onStoryCreated={handleStoryCreated}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your feed...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}