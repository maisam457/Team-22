 'use client';

import { useState, useRef, useEffect } from 'react';
// Simple fallback icon for failed image loads
const ImageIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Post } from '@/lib/types';
import { formatRelativeTime, formatRole } from '@/lib/utils';
const { MoreHorizontal, Heart, MessageCircle, Share, Bookmark, ThumbsUp, Shield, Star, Send } = require('lucide-react');

// Removed custom Icon component - using Lucide icons directly

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  onSave?: (postId: string, isSaved: boolean) => void;
  isSaved?: boolean;
  index?: number;
  initialComments?: Comment[];
}

export function PostCard({ post, authorName, authorRole, authorAvatar, onSave, isSaved = false, index = 0, initialComments = [] }: PostCardProps) {
  const [reactions, setReactions] = useState(post.reactions);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const sharePanelRef = useRef<HTMLDivElement | null>(null);
  const shareTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [reactionStates, setReactionStates] = useState({
    like: false,
    support: false,
    celebrate: false
  });
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showCommentEmojiPicker, setShowCommentEmojiPicker] = useState(false);

  const handleReaction = (type: 'like' | 'support' | 'celebrate') => {
    setReactionStates(prev => ({
      ...prev,
      [type]: !prev[type]
    }));

    setReactions(prev => ({
      ...prev,
      [type]: prev[type] + (reactionStates[type] ? -1 : 1)
    }));
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: `comment_${Date.now()}`,
        authorId: 'current_user',
        authorName: 'You',
        content: commentText,
        createdAt: new Date().toISOString()
      };

      setComments(prev => [newComment, ...prev]);
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  // close share panel when clicking outside or pressing Escape
  useEffect(() => {
    function onDocClick(e: Event) {
      const target = e.target as Node | null;
      if (showShare) {
        if (target && sharePanelRef.current && !sharePanelRef.current.contains(target) && shareTriggerRef.current && !shareTriggerRef.current.contains(target)) {
          setShowShare(false);
        }
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowShare(false);
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [showShare]);

  // Consistent background color for visual depth
  const getBackgroundClass = () => {
    return 'bg-white';
  };

  return (
    <Card className={`mb-4 sm:mb-6 group hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-300 border border-slate-200 shadow-lg w-full max-w-full overflow-hidden ${getBackgroundClass()}`}>
      <CardHeader className="pb-3 sm:pb-4">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-blue-100 flex-shrink-0">
                <AvatarImage src={authorAvatar} alt={authorName} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm sm:text-base">
                  {authorName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-semibold text-gray-900">{authorName}</p>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {formatRole(authorRole)}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {formatRelativeTime(post.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex ml-auto bg-white text-blue-600 border-blue-600 hover:bg-gray-100 hover:text-blue-700 text-xs"
              >
                Follow
              </Button>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md border-white/20">
              <DropdownMenuItem className="hover:bg-slate-50">Report post</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-50">Unfollow</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-50">Hide post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post content */}
        <div className="space-y-3">
          <p className="text-gray-900 leading-relaxed break-words overflow-wrap-anywhere">{post.content}</p>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className="mt-4 w-full overflow-hidden">
              {post.images.length === 1 ? (
                // Single image - centered display
                <div className="flex justify-center w-full">
                  <div className="relative max-w-full w-full">
                    <img
                      src={post.images[0]}
                      alt="Post image"
                      className="max-h-96 w-full max-w-full rounded-lg shadow-md object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden items-center justify-center max-h-96 w-full min-h-48"
                      style={{ display: 'none' }}
                    >
                      <div className="text-center text-gray-500">
                        <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Image failed to load</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Multiple images - grid layout
                <div className={`grid gap-2 w-full ${
                  post.images?.length === 2 
                    ? 'grid-cols-2' 
                    : post.images?.length === 3 
                    ? 'grid-cols-2 grid-rows-2' 
                    : 'grid-cols-2 grid-rows-2'
                }`}>
                  {post.images?.slice(0, 4).map((imageUrl, index) => (
                    <div key={index} className="relative w-full">
                      <img
                        src={imageUrl}
                        alt={`Post image ${index + 1}`}
                        className={`w-full max-w-full rounded-lg shadow-md object-cover ${
                          post.images?.length === 3 && index === 0 
                            ? 'row-span-2' 
                            : 'h-32'
                        }`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const placeholder = target.nextElementSibling as HTMLElement;
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                      <div 
                        className={`hidden items-center justify-center bg-gray-100 rounded-lg shadow-md ${
                          post.images?.length === 3 && index === 0 
                            ? 'h-64' 
                            : 'h-32'
                        }`}
                        style={{ display: 'none' }}
                      >
                        <div className="text-center text-gray-500">
                          <ImageIcon className="h-8 w-8 mx-auto mb-1 text-gray-400" />
                          <p className="text-xs">Failed to load</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {post.images && post.images.length > 4 && (
                    <div className="relative w-full">
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          +{post.images.length - 4}
                        </span>
                      </div>
                      <img
                        src={post.images[3]}
                        alt="More images"
                        className="w-full max-w-full h-32 rounded-lg shadow-md object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 hover:text-blue-900 transition-all font-medium">
                  {tag.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Reactions */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1 sm:space-x-3 flex-wrap gap-1 sm:gap-0">
              <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReaction('like')}
              className={`transition-all hover:bg-slate-100 px-2 sm:px-3 py-1 sm:py-2 ${
                reactionStates.like
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <ThumbsUp className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${reactionStates.like ? 'text-green-600' : 'text-gray-600'}`} />
              <span className="text-gray-900 font-medium text-xs sm:text-sm">{reactions.like}</span>
            </Button>
              <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReaction('support')}
              className={`transition-all hover:bg-slate-100 px-2 sm:px-3 py-1 sm:py-2 ${
                reactionStates.support
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Shield className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${reactionStates.support ? 'text-red-600' : 'text-gray-600'}`} />
              <span className="text-gray-900 font-medium text-xs sm:text-sm">{reactions.support}</span>
            </Button>
              <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReaction('celebrate')}
              className={`transition-all hover:bg-slate-100 px-2 sm:px-3 py-1 sm:py-2 ${
                reactionStates.celebrate
                  ? 'text-yellow-600 bg-yellow-50'
                  : 'text-gray-600 hover:text-yellow-600'
              }`}
            >
              <Star className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${reactionStates.celebrate ? 'text-yellow-600' : 'text-gray-600'}`} />
              <span className="text-gray-900 font-medium text-xs sm:text-sm">{reactions.celebrate}</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 flex-wrap gap-1 sm:gap-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCommentInput(!showCommentInput)}
              className="hover:text-blue-600 hover:bg-blue-50 px-2 sm:px-3 py-1 sm:py-2"
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{comments.length} comments</span>
              <span className="sm:hidden">{comments.length}</span>
            </Button>
              <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onSave?.(post.id, !isSaved)}
              className={`hover:text-gray-700 hover:bg-gray-50 px-2 sm:px-3 py-1 sm:py-2 ${
                isSaved ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Bookmark className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${isSaved ? 'text-blue-600' : 'text-gray-600'}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
            <div className="relative">
              <button
                ref={shareTriggerRef}
                onClick={() => setShowShare(s => !s)}
                className="inline-flex items-center gap-1 sm:gap-2 rounded-md text-xs sm:text-sm font-medium px-2 py-1 text-gray-600 hover:bg-white hover:text-black"
                aria-haspopup="true"
                aria-expanded={showShare}
              >
                <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 12h16M12 4v16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="hidden sm:inline">Share</span>
              </button>

              {showShare && (
                <div ref={sharePanelRef} className="absolute right-0 mt-2 z-50 bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg p-3 sm:p-4 w-[20rem] sm:w-[28rem] rounded">
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-medium">Share in a post</h3>
                    <div className="mt-3">
                      <button className="px-5 py-2 rounded-full bg-black text-white">Create post</button>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">No subscribers</p>
                  </div>

                  <div className="border-t border-gray-200 my-3" />

                  <h4 className="text-sm font-medium mb-2">Share</h4>

                  <div className="grid grid-cols-6 gap-4">
                    <div className="flex flex-col items-center">
                      <button
                        className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center"
                        onClick={async () => {
                          const embed = `<iframe src="${typeof window !== 'undefined' ? `${window.location.origin}/?post=${post.id}` : post.id}" width="600" height="400"></iframe>`;
                          try {
                            await navigator.clipboard.writeText(embed);
                            setEmbedCopied(true);
                            setTimeout(() => setEmbedCopied(false), 1500);
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                        aria-label="Copy embed"
                      >
                        <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6L2 12l6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <span className="text-xs text-gray-600 mt-2">Embed</span>
                      {embedCopied && <span className="text-xs text-green-600 mt-1">Copied!</span>}
                    </div>

                    <div className="flex flex-col items-center">
                      <a
                        className="h-12 w-12 rounded-full bg-green-500 shadow flex items-center justify-center"
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.content + '\n\n' + (typeof window !== 'undefined' ? `${window.location.origin}/?post=${post.id}` : post.id))}`}
                        target="_blank" rel="noreferrer"
                        aria-label="Share to WhatsApp"
                      >
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="1.5"/></svg>
                      </a>
                      <span className="text-xs text-gray-600 mt-2">WhatsApp</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <a
                        className="h-12 w-12 rounded-full bg-blue-700 shadow flex items-center justify-center"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent((typeof window !== 'undefined') ? `${window.location.origin}/?post=${post.id}` : post.id)}`}
                        target="_blank" rel="noreferrer"
                        aria-label="Share to Facebook"
                      >
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z"/></svg>
                      </a>
                      <span className="text-xs text-gray-600 mt-2">Facebook</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <a
                        className="h-12 w-12 rounded-full bg-black shadow flex items-center justify-center"
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent((typeof window !== 'undefined') ? `${window.location.origin}/?post=${post.id}` : post.id)}&text=${encodeURIComponent(post.content.slice(0, 200))}`}
                        target="_blank" rel="noreferrer"
                        aria-label="Share to X"
                      >
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.48 4.48 0 0 0 12.07 5v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                      </a>
                      <span className="text-xs text-gray-600 mt-2">X</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <a
                        className="h-12 w-12 rounded-full bg-gray-300 shadow flex items-center justify-center"
                        href={`mailto:?subject=${encodeURIComponent('Check out this post')}&body=${encodeURIComponent(post.content + '\n\n' + (typeof window !== 'undefined' ? `${window.location.origin}/?post=${post.id}` : post.id))}`}
                        aria-label="Share via Email"
                      >
                        <svg className="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z" strokeWidth="1.5"/></svg>
                      </a>
                      <span className="text-xs text-gray-600 mt-2">Email</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <button className="h-12 w-12 rounded-full bg-yellow-400 shadow flex items-center justify-center" onClick={() => { window.open('https://www.kakaocorp.com', '_blank'); }} aria-label="Share to Kakao">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                      </button>
                      <span className="text-xs text-gray-600 mt-2">Kakao</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comment Input */}
        {showCommentInput && (
          <div className="pt-3 sm:pt-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="pr-8 sm:pr-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCommentSubmit();
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 hover:bg-amber-100"
                  onClick={() => setShowCommentEmojiPicker(!showCommentEmojiPicker)}
                >
                  <span className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600 text-lg">😊</span>
                </Button>
              </div>
              <Button
                size="sm"
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
                className="bg-blue-500 hover:bg-blue-600 px-3 sm:px-4"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Comment Emoji Picker */}
        {showCommentEmojiPicker && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg p-2 sm:p-3 shadow-lg">
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 sm:gap-2">
              {['❤️', '👍', '👏', '🎉', '🌟', '💪', '🙏', '🤝',
                '💙', '😊', '🥰', '🤗', '🙌', '✨', '🔥', '💯'].map((emoji) => (
                <button
                  key={emoji}
                  className="text-lg sm:text-xl hover:bg-blue-50 rounded p-1 sm:p-2 transition-colors"
                  onClick={() => {
                    setCommentText(prev => prev + emoji);
                    setShowCommentEmojiPicker(false);
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comments Display */}
        {comments.length > 0 && (
          <div className="pt-3 sm:pt-4 border-t border-gray-100">
            <div className="space-y-2 sm:space-y-3">
              {comments.slice(0, showAllComments ? comments.length : 2).map((comment) => (
                <div key={comment.id} className="flex space-x-2 sm:space-x-3">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                      {comment.authorName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">{comment.authorName}</p>
                      <p className="text-xs sm:text-sm text-gray-700 break-words">{comment.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(comment.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {comments.length > 2 && !showAllComments && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllComments(true)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-sm px-2 py-1"
                >
                  Load {comments.length - 2} more comments
                </Button>
              )}

              {showAllComments && comments.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllComments(false)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-sm px-2 py-1"
                >
                  Show less
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
