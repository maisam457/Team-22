'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Calendar, DollarSign, Globe, Lock, Tag, ExternalLink } from 'lucide-react';
import { CreateDonationPayload, DonationEventDTO } from '@/lib/types';

interface CreateDonationModalProps {
  onClose: () => void;
  onSuccess: (donation: DonationEventDTO) => void;
}

export function CreateDonationModal({ onClose, onSuccess }: CreateDonationModalProps) {
  const [formData, setFormData] = useState<CreateDonationPayload>({
    title: '',
    description: '',
    coverImageUrl: '',
    goalAmountCents: 0,
    currency: 'USD',
    externalPaymentUrl: '',
    startAt: '',
    endAt: '',
    beneficiary: '',
    tags: [],
    visibility: 'public',
    allowComments: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 80) {
      newErrors.title = 'Title must be 80 characters or less';
    }

    // Description validation
    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less';
    }

    // Cover Image URL validation
    if (formData.coverImageUrl && !isValidUrl(formData.coverImageUrl)) {
      newErrors.coverImageUrl = 'Please enter a valid URL';
    }

    // Goal Amount validation
    if (!formData.goalAmountCents || formData.goalAmountCents <= 0) {
      newErrors.goalAmountCents = 'Goal amount must be greater than 0';
    }

    // External Payment URL validation
    if (!formData.externalPaymentUrl.trim()) {
      newErrors.externalPaymentUrl = 'External payment URL is required';
    } else if (!isValidUrl(formData.externalPaymentUrl)) {
      newErrors.externalPaymentUrl = 'Please enter a valid URL';
    }

    // Date validation
    if (!formData.startAt) {
      newErrors.startAt = 'Start date is required';
    }
    if (!formData.endAt) {
      newErrors.endAt = 'End date is required';
    }
    if (formData.startAt && formData.endAt && new Date(formData.startAt) >= new Date(formData.endAt)) {
      newErrors.endAt = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const donation = await response.json();
        onSuccess(donation);
        // Show success toast
        alert('Donation event created successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Failed to create donation'}`);
      }
    } catch (error) {
      console.error('Error creating donation:', error);
      alert('Failed to create donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateDonationPayload, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Create Donation Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter donation event title"
              className="mt-1"
              maxLength={80}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {formData.title.length}/80 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your donation event"
              className="mt-1 min-h-[100px]"
              maxLength={1000}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {formData.description?.length || 0}/1000 characters
            </p>
          </div>

          {/* Cover Image URL */}
          <div>
            <Label htmlFor="coverImageUrl" className="text-sm font-medium text-gray-700">
              Cover Image URL
            </Label>
            <Input
              id="coverImageUrl"
              type="url"
              value={formData.coverImageUrl}
              onChange={(e) => handleInputChange('coverImageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="mt-1"
            />
            {errors.coverImageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.coverImageUrl}</p>
            )}
          </div>

          {/* Goal Amount and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goalAmount" className="text-sm font-medium text-gray-700">
                Goal Amount *
              </Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="goalAmount"
                  type="number"
                  value={formData.goalAmountCents / 100}
                  onChange={(e) => handleInputChange('goalAmountCents', Math.round(parseFloat(e.target.value) * 100))}
                  placeholder="0.00"
                  className="pl-10"
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.goalAmountCents && (
                <p className="text-red-500 text-sm mt-1">{errors.goalAmountCents}</p>
              )}
            </div>

            <div>
              <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                Currency *
              </Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Start and End Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startAt" className="text-sm font-medium text-gray-700">
                Start Date/Time *
              </Label>
              <Input
                id="startAt"
                type="datetime-local"
                value={formData.startAt}
                onChange={(e) => handleInputChange('startAt', e.target.value)}
                className="mt-1"
              />
              {errors.startAt && (
                <p className="text-red-500 text-sm mt-1">{errors.startAt}</p>
              )}
            </div>

            <div>
              <Label htmlFor="endAt" className="text-sm font-medium text-gray-700">
                End Date/Time *
              </Label>
              <Input
                id="endAt"
                type="datetime-local"
                value={formData.endAt}
                onChange={(e) => handleInputChange('endAt', e.target.value)}
                className="mt-1"
              />
              {errors.endAt && (
                <p className="text-red-500 text-sm mt-1">{errors.endAt}</p>
              )}
            </div>
          </div>

          {/* Beneficiary */}
          <div>
            <Label htmlFor="beneficiary" className="text-sm font-medium text-gray-700">
              Beneficiary
            </Label>
            <Input
              id="beneficiary"
              value={formData.beneficiary}
              onChange={(e) => handleInputChange('beneficiary', e.target.value)}
              placeholder="Who will benefit from this donation?"
              className="mt-1"
            />
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Tags</Label>
            <div className="mt-1 flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag and press Enter"
                className="flex-1"
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* External Payment URL */}
          <div>
            <Label htmlFor="externalPaymentUrl" className="text-sm font-medium text-gray-700">
              External Payment URL *
            </Label>
            <div className="relative mt-1">
              <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="externalPaymentUrl"
                type="url"
                value={formData.externalPaymentUrl}
                onChange={(e) => handleInputChange('externalPaymentUrl', e.target.value)}
                placeholder="https://donate.stripe.com/..."
                className="pl-10"
              />
            </div>
            {errors.externalPaymentUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.externalPaymentUrl}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              We'll use Stripe/PayPal hosted pages for payments
            </p>
          </div>

          {/* Visibility */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Visibility</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === 'public'}
                  onChange={(e) => handleInputChange('visibility', e.target.value)}
                  className="text-blue-600"
                />
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Public - Visible to everyone</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="visibility"
                  value="unlisted"
                  checked={formData.visibility === 'unlisted'}
                  onChange={(e) => handleInputChange('visibility', e.target.value)}
                  className="text-blue-600"
                />
                <Lock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">Unlisted - Only accessible via link</span>
              </label>
            </div>
          </div>

          {/* Allow Comments */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="allowComments"
              checked={formData.allowComments}
              onCheckedChange={(checked) => handleInputChange('allowComments', checked)}
            />
            <Label htmlFor="allowComments" className="text-sm text-gray-700">
              Allow comments on this donation event
            </Label>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-95 disabled:transform-none transition-all duration-200 ease-in-out"
            >
              {isSubmitting ? 'Creating...' : 'Create Donation'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
