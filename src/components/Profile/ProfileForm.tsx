'use client';

import { useState, useEffect } from 'react';
import { Save, MapPin, Link as LinkIcon, Copy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TagsPicker } from './TagsPicker';
import { User } from '@/lib/types';
import { mockTags } from '@/data/mockTags';

interface ProfileFormProps {
  user?: User;
  onSave?: (updatedUser: Partial<User>) => void;
}

export function ProfileForm({ user, onSave }: ProfileFormProps) {
  // Loads mock LinkedIn data and updates the form
  const handleUpdateFromLinkedIn = async () => {
    // Only for Sarah Johnson (alumni_01) in this mock
    if (!user) return;
    const res = await fetch('/src/data/mockLinkedInProfiles.json');
    const data = await res.json();
    const linkedInData = data[user.id];
    if (linkedInData) {
      setFormData({
        name: linkedInData.name,
        bio: linkedInData.bio,
        location: linkedInData.location,
        selectedTagIds: linkedInData.tags.map((tag: any) => tag.id),
        linkedin: linkedInData.linkedin,
      });
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: { city: '', state: '' },
    selectedTagIds: [] as string[],
    linkedin: '',
    email: '',
  });
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        bio: user.bio || '',
        location: user.location || { city: '', state: '' },
        selectedTagIds: user.tags.map(tag => tag.id),
        linkedin: user.linkedin || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          name: formData.name,
          bio: formData.bio,
          location: formData.location,
          tagIds: formData.selectedTagIds,
          linkedin: formData.linkedin,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onSave?.(updatedUser);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateInvite = async () => {
    try {
      const response = await fetch('/api/invites', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setInviteCode(data.code);
      }
    } catch (error) {
      console.error('Error generating invite:', error);
    }
  };

  const handleCopyInvite = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <Badge variant="outline">{user.role}</Badge>
              </div>
              {user.location && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location.city}, {user.location.state}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email ?? ""}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value ?? "" }))}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            className="mb-4"
            onClick={handleUpdateFromLinkedIn}
          >
            Update using LinkedIn
          </Button>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name ?? ""}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value ?? "" }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/your-profile"
              value={formData.linkedin ?? ""}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value ?? "" }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio ?? ""}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value ?? "" }))}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.location.city ?? ""}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, city: e.target.value ?? "" }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.location.state ?? ""}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, state: e.target.value ?? "" }
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Interests & Tags</Label>
            <TagsPicker
              tags={mockTags}
              selectedTagIds={formData.selectedTagIds}
              onTagToggle={(tagId) => {
                setFormData(prev => ({
                  ...prev,
                  selectedTagIds: prev.selectedTagIds.includes(tagId)
                    ? prev.selectedTagIds.filter(id => id !== tagId)
                    : [...prev.selectedTagIds, tagId]
                }));
              }}
            />
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Invite Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LinkIcon className="h-5 w-5 mr-2" />
            Invite Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Share this link with others to invite them to join Team IMPACT Hub.
          </p>

          {inviteCode ? (
            <div className="flex items-center space-x-2">
              <Input value={inviteCode} readOnly />
              <Button variant="outline" size="icon" onClick={handleCopyInvite}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={handleGenerateInvite} variant="outline" className="w-full">
              Generate Invite Link
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Profile Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{formData.name || user.name}</p>
                <p className="text-sm text-muted-foreground">{user.role}</p>
              </div>
            </div>

            {formData.bio && (
              <p className="text-sm">{formData.bio}</p>
            )}

            {formData.email && (
              <p className="text-sm"><span className="font-medium">Email: </span>{formData.email}</p>
            )}

            {formData.location.city && formData.location.state && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {formData.location.city}, {formData.location.state}
              </div>
            )}

            {formData.selectedTagIds.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {mockTags
                  .filter(tag => formData.selectedTagIds.includes(tag.id))
                  .map(tag => (
                    <Badge key={tag.id} variant="secondary" className="text-xs">
                      {tag.label}
                    </Badge>
                  ))
                }
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
