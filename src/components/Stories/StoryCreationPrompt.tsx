'use client';

import { useState, useRef } from 'react';
import { X, Camera, Type, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { User } from '@/lib/types';

interface StoryCreationPromptProps {
  currentUser: User;
  onClose: () => void;
  onStoryCreated: (story: any) => void;
}

export function StoryCreationPrompt({ currentUser, onClose, onStoryCreated }: StoryCreationPromptProps) {
  const [showTextModal, setShowTextModal] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleTextClick = () => {
    setShowTextModal(true);
  };

  const handleAddToStory = () => {
    if (selectedFile && previewUrl) {
      // Handle photo story
      const story = {
        id: Date.now().toString(),
        authorId: currentUser.id,
        type: 'photo',
        content: selectedFile.name,
        mediaUrl: previewUrl,
        createdAt: new Date().toISOString(),
        views: []
      };
      onStoryCreated(story);
    } else if (textContent.trim()) {
      // Handle text story
      const story = {
        id: Date.now().toString(),
        authorId: currentUser.id,
        type: 'text',
        content: textContent.trim(),
        createdAt: new Date().toISOString(),
        views: []
      };
      onStoryCreated(story);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleTextSubmit = () => {
    if (textContent.trim()) {
      handleAddToStory();
    }
  };

  if (showTextModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add Text to Story</h3>
            <button
              onClick={() => setShowTextModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <Textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-32 resize-none text-lg"
            maxLength={200}
          />
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">{textContent.length}/200</span>
            <Button
              onClick={handleTextSubmit}
              disabled={!textContent.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add to Story
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Create Story</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Photo Option */}
          <div className="space-y-3">
            <button
              onClick={handlePhotoClick}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                <Camera className="h-8 w-8 text-gray-400" />
                <span className="text-gray-600 font-medium">Upload Photo</span>
              </div>
            </button>

            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-32 object-contain rounded-lg"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Text Option */}
          <button
            onClick={handleTextClick}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex flex-col items-center space-y-2">
              <Type className="h-8 w-8 text-gray-400" />
              <span className="text-gray-600 font-medium">Add Text</span>
            </div>
          </button>
        </div>

        {selectedFile && (
          <div className="mt-6">
            <Button
              onClick={handleAddToStory}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Add to Story
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
