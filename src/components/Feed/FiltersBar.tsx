'use client';

import { MapPin, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Filter {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

const filters: Filter[] = [
  { id: 'all', label: 'All' },
  { id: 'popular', label: '🔥 Popular' },
  { id: 'nearby', label: 'Nearby', icon: <MapPin className="h-3.5 w-3.5" /> },
  { id: 'mentorship', label: 'Mentorship' },
  { id: 'events', label: 'Events' },
  { id: 'my-tags', label: 'My Tags' },
  { id: 'saved', label: '⭐ Saved' },
];

interface FiltersBarProps {
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
  isLoadingLocation?: boolean;
}

export function FiltersBar({ activeFilter = 'all', onFilterChange, isLoadingLocation = false }: FiltersBarProps) {
  return (
    <div className="sticky top-16 z-10 bg-white border-b border-slate-200 px-4 py-4 -mx-4 sm:-mx-6 lg:-mx-8 mb-6">
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-thin">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          const isNearbyLoading = filter.id === 'nearby' && isLoadingLocation;
          
          return (
            <Badge
              key={filter.id}
              variant={isActive ? "default" : "secondary"}
              className={cn(
                "cursor-pointer transition-all duration-150 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5",
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              )}
              onClick={() => !isNearbyLoading && onFilterChange?.(filter.id)}
            >
              {isNearbyLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                filter.icon
              )}
              {filter.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
