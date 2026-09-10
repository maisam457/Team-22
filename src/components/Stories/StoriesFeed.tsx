'use client';

import { useState, useEffect } from 'react';
import { Plus, Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { StoryGroup, User } from '@/lib/types';
import { getAllStories } from '@/data/mockStories';
import { getUserById } from '@/data/mockUsers';
import { StoryCreationPrompt } from './StoryCreationPrompt';
import { formatRole } from '@/lib/utils';

interface StoriesFeedProps {
  currentUserId: string;
  onStoryClick: (storyGroup: StoryGroup) => void;
  onCreateStory: () => void;
}

export function StoriesFeed({ currentUserId, onStoryClick, onCreateStory }: StoriesFeedProps) {
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStoryPromptOpen, setIsStoryPromptOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Fetch stories from API
        const response = await fetch(`/api/stories?userId=${currentUserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        
        const storyGroups = await response.json();
        
        // If API returns empty, fallback to mock data
        if (storyGroups.length === 0) {
          const stories = getAllStories();
          const users = new Map<string, User>();
          
          // Group stories by author
          const groupedStories = stories.reduce((acc, story) => {
            if (!users.has(story.authorId)) {
              const user = getUserById(story.authorId);
              if (user) users.set(story.authorId, user);
            }
            
            const existingGroup = acc.find(group => group.authorId === story.authorId);
            if (existingGroup) {
              existingGroup.stories.push(story);
            } else {
              const user = users.get(story.authorId);
              if (user) {
                acc.push({
                  authorId: story.authorId,
                  authorName: user.name,
                  authorAvatar: user.avatarUrl,
                  authorRole: user.role,
                  stories: [story],
                  hasUnviewed: !story.views.includes(currentUserId)
                });
              }
            }
            return acc;
          }, [] as StoryGroup[]);

          // Sort stories within each group by creation time
          groupedStories.forEach(group => {
            group.stories.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          });

          // Sort groups by most recent story and unviewed status
          groupedStories.sort((a, b) => {
            if (a.hasUnviewed && !b.hasUnviewed) return -1;
            if (!a.hasUnviewed && b.hasUnviewed) return 1;
            const aLatest = Math.max(...a.stories.map(s => new Date(s.createdAt).getTime()));
            const bLatest = Math.max(...b.stories.map(s => new Date(s.createdAt).getTime()));
            return bLatest - aLatest;
          });

          setStoryGroups(groupedStories);
        } else {
          setStoryGroups(storyGroups);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        // Fallback to mock data on error
        const stories = getAllStories();
        const users = new Map<string, User>();
        
        const groupedStories = stories.reduce((acc, story) => {
          if (!users.has(story.authorId)) {
            const user = getUserById(story.authorId);
            if (user) users.set(story.authorId, user);
          }
          
          const existingGroup = acc.find(group => group.authorId === story.authorId);
          if (existingGroup) {
            existingGroup.stories.push(story);
          } else {
            const user = users.get(story.authorId);
            if (user) {
              acc.push({
                authorId: story.authorId,
                authorName: user.name,
                authorAvatar: user.avatarUrl,
                authorRole: user.role,
                stories: [story],
                hasUnviewed: !story.views.includes(currentUserId)
              });
            }
          }
          return acc;
        }, [] as StoryGroup[]);

        groupedStories.forEach(group => {
          group.stories.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        });

        groupedStories.sort((a, b) => {
          if (a.hasUnviewed && !b.hasUnviewed) return -1;
          if (!a.hasUnviewed && b.hasUnviewed) return 1;
          const aLatest = Math.max(...a.stories.map(s => new Date(s.createdAt).getTime()));
          const bLatest = Math.max(...b.stories.map(s => new Date(s.createdAt).getTime()));
          return bLatest - aLatest;
        });

        setStoryGroups(groupedStories);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [currentUserId]);

  // Fetch current user
  useEffect(() => {
    const user = getUserById(currentUserId);
    setCurrentUser(user);
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="flex space-x-4 p-4 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <>
    <div className="flex space-x-4 p-4 bg-white/80 backdrop-blur-md border-b border-white/20 overflow-x-auto scrollbar-hide stories-scroll">
      {/* Create Story Button */}
      <div className="flex-shrink-0 flex flex-col items-center space-y-2">
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log('story clicked');
              setIsStoryPromptOpen(true);
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <Plus className="h-6 w-6 text-white" />
          </button>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-blue-600">
            <Plus className="h-3 w-3 text-blue-600" />
          </div>
        </div>
        <span className="text-xs text-gray-600 font-medium">Your Story</span>
      </div>

      {/* Story Circles */}
      {storyGroups.map((group) => {
        const hasUnviewed = group.stories.some(story => !story.views.includes(currentUserId));
        
        return (
          <div key={group.authorId} className="flex-shrink-0 flex flex-col items-center space-y-2">
            <div className="relative">
              <button
                onClick={() => onStoryClick(group)}
                className={`w-16 h-16 rounded-full transition-all duration-200 hover:scale-105 ${
                  hasUnviewed
                    ? 'ring-2 ring-orange-400'
                    : 'ring-2 ring-gray-300'
                }`}
              >
                <div className="w-full h-full rounded-full">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={group.authorAvatar} alt={group.authorName} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm">
                      {group.authorName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </button>
              
              {/* Story count indicator removed per request */}
              
              {/* Unviewed indicator */}
              {hasUnviewed && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
              )}
            </div>
            
            <div className="text-center">
              <span className="text-xs text-gray-600 font-medium block truncate max-w-16">
                {group.authorName}
              </span>
              {(() => {
                const role = (group.authorRole || '').toLowerCase();
                const hideRoles = ['athlete', 'athelte', 'child', 'alumni'];
                return hideRoles.includes(role) ? null : (
                  <Badge 
                    variant="outline" 
                    className="text-xs mt-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200"
                  >
                    {formatRole(group.authorRole)}
                  </Badge>
                );
              })()}
            </div>
          </div>
        );
      })}
    </div>
    
    {/* Story Creation Prompt */}
    {isStoryPromptOpen && currentUser && (
      <StoryCreationPrompt
        currentUser={currentUser}
        onClose={() => setIsStoryPromptOpen(false)}
        onStoryCreated={(story) => {
          console.log('Story created:', story);
          setIsStoryPromptOpen(false);
          // You can add logic here to update the stories list
        }}
      />
    )}
    </>
  );
}
