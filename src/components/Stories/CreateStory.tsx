'use client';

import { useState, useRef } from 'react';
import { X, Camera, Image, Video, Smile, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Story, User } from '@/lib/types';
import { id, nowISO } from '@/lib/utils';
import { addStory } from '@/data/mockStories';

interface CreateStoryProps {
  currentUser: User;
  onClose: () => void;
  onStoryCreated: (story: Story) => void;
}

export function CreateStory({ currentUser, onClose, onStoryCreated }: CreateStoryProps) {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file upload - in a real app, you'd upload to a cloud service
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setMediaUrl(result);
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateStory = async () => {
    if (!content.trim() && !mediaUrl) return;

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    const newStory: Story = {
      id: id(),
      authorId: currentUser.id,
      createdAt: nowISO(),
      expiresAt: expiresAt.toISOString(),
      content: content.trim(),
      mediaUrl: mediaUrl || undefined,
      mediaType: mediaType || undefined,
      views: [],
      reactions: { like: 0, support: 0, celebrate: 0 }
    };

    addStory(newStory);
    onStoryCreated(newStory);
    onClose();
  };

  const handleRemoveMedia = () => {
    setMediaUrl(null);
    setMediaType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (previewMode && mediaUrl) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="relative w-full h-full max-w-md max-h-[80vh] bg-white rounded-2xl overflow-hidden">
          {/* Preview Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-white font-semibold">{currentUser.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPreviewMode(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Preview Content */}
          <div className="relative w-full h-full">
            {mediaType === 'image' ? (
              <img
                src={mediaUrl}
                alt="Story preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                src={mediaUrl}
                className="w-full h-full object-contain"
                controls
              />
            )}
            
            {/* Content Overlay */}
            {content && (
              <div className="absolute bottom-20 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-white text-lg leading-relaxed">{content}</p>
                </div>
              </div>
            )}
          </div>

          {/* Preview Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(false)}
              className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              Edit
            </Button>
            <Button
              onClick={handleCreateStory}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              Share Story
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Button variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <Button
            onClick={() => setPreviewMode(true)}
            disabled={!content.trim() && !mediaUrl}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            Preview
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{currentUser.name}</span>
                {(() => {
                  const role = (currentUser.role || '').toLowerCase();
                  const hideRoles = ['athlete', 'athelte', 'child', 'alumni'];
                  return hideRoles.includes(role) ? null : (
                    <Badge variant="outline" className="text-xs">
                      {currentUser.role}
                    </Badge>
                  );
                })()}
              </div>
              <span className="text-sm text-gray-500">Your story</span>
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex-1"
              >
                <Camera className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Add Photo/Video'}
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {mediaUrl && (
              <div className="relative">
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  {mediaType === 'image' ? (
                    <img
                      src={mediaUrl}
                      alt="Upload preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <video
                      src={mediaUrl}
                      className="w-full h-full object-contain"
                      controls
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveMedia}
                    className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Add a message</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="min-h-[100px] resize-none"
              maxLength={200}
            />
            <div className="text-right text-xs text-gray-500">
              {content.length}/200
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Smile className="h-4 w-4 mr-2" />
              Feeling
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              Tag People
            </Button>
          </div>

          {/* Story Info */}
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Your story will be visible for 24 hours</strong> to your connections and can be viewed by anyone who follows you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
