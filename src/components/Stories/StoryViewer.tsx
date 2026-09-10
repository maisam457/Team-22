'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Heart, MessageCircle, Share, Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StoryGroup, Story, User } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { markStoryAsViewed, addStoryReaction } from '@/data/mockStories';

interface StoryViewerProps {
  storyGroup: StoryGroup;
  currentUserId: string;
  users: User[];
  onClose: () => void;
  onNextGroup?: () => void;
  onPrevGroup?: () => void;
}

export function StoryViewer({ 
  storyGroup, 
  currentUserId, 
  users, 
  onClose, 
  onNextGroup, 
  onPrevGroup 
}: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const currentStory = storyGroup.stories[currentStoryIndex];
  const author = users.find(u => u.id === storyGroup.authorId);

  // Mark story as viewed when it's displayed
  useEffect(() => {
    if (currentStory && !currentStory.views.includes(currentUserId)) {
      markStoryAsViewed(currentStory.id, currentUserId);
    }
  }, [currentStory, currentUserId]);

  // Progress bar animation
  useEffect(() => {
    if (isPaused) return;

    const duration = 5000; // 5 seconds per story
    const startTime = Date.now();
    const startProgress = progress;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = startProgress + (elapsed / duration) * 100;
      
      if (newProgress >= 100) {
        setProgress(100);
        handleNextStory();
      } else {
        setProgress(newProgress);
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentStoryIndex, isPaused, progress]);

  const handleNextStory = () => {
    if (currentStoryIndex < storyGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else if (onNextGroup) {
      onNextGroup();
    } else {
      onClose();
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else if (onPrevGroup) {
      onPrevGroup();
    }
  };

  const handleReaction = (reactionType: 'like' | 'support' | 'celebrate') => {
    if (currentStory) {
      addStoryReaction(currentStory.id, reactionType);
      setShowReactions(true);
      setTimeout(() => setShowReactions(false), 2000);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') handleNextStory();
    if (e.key === 'ArrowLeft') handlePrevStory();
    if (e.key === ' ') {
      e.preventDefault();
      setIsPaused(!isPaused);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPaused]);

  if (!currentStory || !author) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: currentStory.mediaUrl ? `url(${currentStory.mediaUrl})` : 'none',
          backgroundColor: currentStory.mediaUrl ? 'transparent' : '#1a1a1a'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
        {storyGroup.stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-white transition-all duration-100 ${
                index < currentStoryIndex ? 'w-full' : 
                index === currentStoryIndex ? 'w-0' : 'w-0'
              }`}
              style={{
                width: index === currentStoryIndex ? `${progress}%` : 
                       index < currentStoryIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-16 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-white/50">
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              {author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
              <div className="flex items-center space-x-2">
              <span className="text-white font-semibold">{author.name}</span>
              <Badge variant="outline" className="text-xs bg-white/20 text-white border-white/30">
                {author.role}
              </Badge>
            </div>
            <span className="text-white/80 text-sm">
              {formatRelativeTime(currentStory.createdAt)}
            </span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="absolute bottom-20 left-4 right-4 z-10">
        {currentStory.content && (
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <p className="text-white text-lg leading-relaxed">{currentStory.content}</p>
          </div>
        )}

        {/* Reactions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleReaction('like')}
              className="text-white hover:bg-white/20"
            >
              <Heart className="h-6 w-6" />
            </Button>
            <span className="text-white text-sm">{currentStory.reactions.like}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleReaction('support')}
              className="text-white hover:bg-white/20"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="text-white text-sm">{currentStory.reactions.support}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleReaction('celebrate')}
              className="text-white hover:bg-white/20"
            >
              <Share className="h-6 w-6" />
            </Button>
            <span className="text-white text-sm">{currentStory.reactions.celebrate}</span>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <Eye className="h-5 w-5 text-white/80" />
            <span className="text-white/80 text-sm">{currentStory.views.length}</span>
          </div>
        </div>
      </div>

      {/* Navigation Areas */}
      <div 
        className="absolute left-0 top-0 w-1/3 h-full cursor-pointer"
        onClick={handlePrevStory}
      />
      <div 
        className="absolute right-0 top-0 w-1/3 h-full cursor-pointer"
        onClick={handleNextStory}
      />

      {/* Reaction Animation */}
      {showReactions && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-6xl animate-bounce">❤️</div>
        </div>
      )}

      {/* Pause Indicator */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}
