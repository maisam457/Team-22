'use client';

import { useState, useRef } from 'react';
import { Plus, Image as ImageIcon, Smile, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { mockTags } from '@/data/mockTags';

interface CreatePostProps {
  onPost?: (content: string, tagIds: string[]) => void;
}

const MAX_CHARACTERS = 2000;

const EMOJI_LIST = ['😊', '❤️', '🎉', '👍', '🙏', '💪', '🌟', '✨', '🔥', '😂', '🥰', '😍', '🤗', '👏', '🎊', '💯', '🏆', '⚡', '🌈', '💙'];

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const characterCount = content.length;
  const isOverLimit = characterCount > MAX_CHARACTERS;

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = () => {
    if (content.trim() && onPost) {
      onPost(content, selectedTags);
      setContent('');
      setSelectedTags([]);
      setUploadedImage(null);
      setIsExpanded(false);
      setShowEmojiPicker(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card className="mb-6 bg-white border border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" alt="Sarah Johnson" />
            <AvatarFallback className="bg-blue-600 text-white text-sm">SJ</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <a href="/profile/alumni_01" className="font-medium text-slate-900 text-sm hover:text-blue-600 transition-colors">Sarah Johnson</a>
            <p className="text-xs text-slate-500">Alumni</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto bg-white text-blue-600 border-blue-600 hover:bg-gray-100 hover:text-blue-700"
          >
            Follow
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Textarea
              placeholder="Share what's on your mind..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="min-h-[100px] resize-none border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 pr-12 text-slate-900 placeholder-slate-400 bg-white rounded-lg text-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 hover:bg-amber-100"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-4 w-4 text-amber-600" />
            </Button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
              <div className="grid grid-cols-8 gap-2">
                {['❤️', '👍', '👏', '🎉', '🌟', '💪', '🙏', '🤝',
                  '💙', '😊', '🥰', '🤗', '🙌', '✨', '🔥', '💯'].map((emoji) => (
                  <button
                    key={emoji}
                    className="text-xl hover:bg-blue-50 rounded p-2 transition-colors"
                    onClick={() => {
                      setContent(prev => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isExpanded && (
            <div className="flex justify-end">
              <span className={`text-sm transition-colors ${
                isOverLimit
                  ? 'text-red-600 font-semibold'
                  : characterCount > MAX_CHARACTERS * 0.9
                  ? 'text-yellow-600'
                  : 'text-gray-400'
              }`}>
                {characterCount}/{MAX_CHARACTERS}
              </span>
            </div>
          )}
        </div>

        {/* Image Preview */}
        {uploadedImage && (
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={uploadedImage}
              alt="Upload preview"
              className="w-full max-h-96 object-contain"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {isExpanded && (
          <>
            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">Choose an emoji</p>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_LIST.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="text-2xl hover:scale-125 transition-transform duration-200 hover:bg-white rounded p-2"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tag selector */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-600">Add tags</p>
              <div className="flex flex-wrap gap-2">
                {mockTags.slice(0, 10).map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors duration-150 text-xs ${
                      selectedTags.includes(tag.id)
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                    onClick={() => handleTagToggle(tag.id)}
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-slate-100 text-slate-700 h-9"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsExpanded(false);
                    setShowEmojiPicker(false);
                    setUploadedImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="text-slate-600 hover:bg-slate-100 h-9"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!content.trim() || isOverLimit}
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed h-9 px-4"
                >
                  Post
                </Button>
              </div>
            </div>
          </>
        )}

        {!isExpanded && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-slate-100 text-slate-700 h-9"
                onClick={() => {
                  setIsExpanded(true);
                  setTimeout(() => fileInputRef.current?.click(), 100);
                }}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Photo
              </Button>
            </div>
            <Button
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
