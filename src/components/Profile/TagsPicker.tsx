'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TagsPickerProps {
  tags: Tag[];
  selectedTagIds: string[];
  onTagToggle: (tagId: string) => void;
}

export function TagsPicker({ tags, selectedTagIds, onTagToggle }: TagsPickerProps) {
  // Group tags by type
  const tagsByType = tags.reduce((acc, tag) => {
    if (!acc[tag.type]) {
      acc[tag.type] = [];
    }
    acc[tag.type].push(tag);
    return acc;
  }, {} as Record<string, Tag[]>);

  const typeLabels = {
    INTEREST: 'Interests',
    DIAGNOSIS: 'Diagnosis',
    GEOGRAPHY: 'Location',
  };

  return (
    <div className="space-y-4">
      {Object.entries(tagsByType).map(([type, typeTags]) => (
        <Card key={type}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {typeLabels[type as keyof typeof typeLabels]}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {typeTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={selectedTagIds.includes(tag.id) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors",
                    selectedTagIds.includes(tag.id)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => onTagToggle(tag.id)}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
