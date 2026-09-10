'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
const { X, Menu, Plus, Globe, Lock } = require('lucide-react');
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { mockTags } from '@/data/mockTags';
import { cn } from '@/lib/utils';
import { CreateGroupModal } from '@/components/Groups/CreateGroupModal';
import { Group } from '@/lib/types';

const navigation = [
  { name: 'Feed', href: '/', icon: '🏠' },
  { name: 'Messages', href: '/messages', icon: '💬' },
  { name: 'Profile', href: '/profile', icon: '👤' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups?userId=user_123');
      if (response.ok) {
        const data = await response.json();
        setGroups(data.groups || []);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleGroupCreated = (group: Group) => {
    setGroups(prev => [group, ...prev]);
    setShowCreateGroupModal(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-14 sm:top-16 left-2 sm:left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="h-8 w-8 sm:h-9 sm:w-9 bg-white shadow-md"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:fixed inset-y-0 left-0 z-40 w-72 sm:w-80 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 pt-14 sm:pt-16",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-4">
          {/* Navigation */}
          <nav className="space-y-1 mt-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <span className={cn(
                    "text-lg",
                    isActive ? "text-blue-600" : "text-slate-400"
                  )}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* My Channels section */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">My Channels (choose interests)</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {mockTags.filter(tag => tag.type === 'INTEREST').map((tag) => {
                const active = selectedInterests.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleInterest(tag.id)}
                    className={`cursor-pointer transition-colors duration-150 px-2.5 py-1 rounded-md text-xs font-medium border ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                    aria-pressed={active}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mb-3 px-3">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">My Groups</h3>
              <Button
                onClick={() => setShowCreateGroupModal(true)}
                size="sm"
                className="h-6 px-2 text-xs bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-3 w-3 mr-1" />
                Create Group
              </Button>
            </div>

            <div className="space-y-2 mb-4">
              {groups.length === 0 ? (
                <p className="text-xs text-slate-400 px-3">No groups yet. Create your first group!</p>
              ) : (
                groups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      {group.privacy === 'public' ? (
                        <Globe className="h-4 w-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <Lock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{group.name}</p>
                        <p className="text-xs text-slate-500">{group.memberCount} member{group.memberCount !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">Channels</h3>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.length === 0 ? (
                <p className="text-xs text-slate-400 px-3">Select interests above to create channels</p>
              ) : (
                selectedInterests.map(id => {
                  const tag = mockTags.find(t => t.id === id);
                  if (!tag) return null;
                  return (
                    <Link key={tag.id} href={`/channels/${tag.id}`} className="no-underline">
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-purple-600 hover:text-white transition-colors duration-150 px-3 py-1 rounded-lg text-xs font-semibold border border-slate-200 bg-slate-50 text-purple-700 shadow-sm"
                      >
                        #{tag.label}
                      </Badge>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* User info at bottom */}
          <div className="pt-4 border-t border-slate-200 mb-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" alt="Sarah Johnson" />
                <AvatarFallback className="bg-blue-600 text-white text-sm">SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">Sarah Johnson</p>
                <p className="text-xs text-slate-500">Alumni</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <CreateGroupModal
          onClose={() => setShowCreateGroupModal(false)}
          onSuccess={handleGroupCreated}
        />
      )}
    </>
  );
}
