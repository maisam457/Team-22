import { Tag } from '@/lib/types';

export const mockTags: Tag[] = [
  // Athletic Interests
  { id: 'baseball', label: 'Baseball', type: 'INTEREST' },
  { id: 'basketball', label: 'Basketball', type: 'INTEREST' },
  { id: 'soccer', label: 'Soccer', type: 'INTEREST' },
  { id: 'football', label: 'Football', type: 'INTEREST' },
  { id: 'running', label: 'Running', type: 'INTEREST' },
  { id: 'swimming', label: 'Swimming', type: 'INTEREST' },
  { id: 'tennis', label: 'Tennis', type: 'INTEREST' },
  { id: 'volleyball', label: 'Volleyball', type: 'INTEREST' },
  { id: 'golf', label: 'Golf', type: 'INTEREST' },
  { id: 'lacrosse', label: 'Lacrosse', type: 'INTEREST' },
  { id: 'hockey', label: 'Hockey', type: 'INTEREST' },
  { id: 'wrestling', label: 'Wrestling', type: 'INTEREST' },
  { id: 'track-field', label: 'Track & Field', type: 'INTEREST' },
  { id: 'cross-country', label: 'Cross Country', type: 'INTEREST' },
  { id: 'softball', label: 'Softball', type: 'INTEREST' },

  // Geography/Location
  { id: 'austin-tx', label: 'Austin, TX', type: 'GEOGRAPHY', value: 'TX' },
  { id: 'dallas-tx', label: 'Dallas, TX', type: 'GEOGRAPHY', value: 'TX' },
  { id: 'boston-ma', label: 'Boston, MA', type: 'GEOGRAPHY', value: 'MA' },
  { id: 'chicago-il', label: 'Chicago, IL', type: 'GEOGRAPHY', value: 'IL' },
  { id: 'miami-fl', label: 'Miami, FL', type: 'GEOGRAPHY', value: 'FL' },
  { id: 'new-york-ny', label: 'New York, NY', type: 'GEOGRAPHY', value: 'NY' },
  { id: 'los-angeles-ca', label: 'Los Angeles, CA', type: 'GEOGRAPHY', value: 'CA' },
  { id: 'denver-co', label: 'Denver, CO', type: 'GEOGRAPHY', value: 'CO' },
  { id: 'atlanta-ga', label: 'Atlanta, GA', type: 'GEOGRAPHY', value: 'GA' },
  { id: 'phoenix-az', label: 'Phoenix, AZ', type: 'GEOGRAPHY', value: 'AZ' },
];

export function getTagById(id: string): Tag | undefined {
  return mockTags.find(tag => tag.id === id);
}

export function getTagsByType(type: Tag['type']): Tag[] {
  return mockTags.filter(tag => tag.type === type);
}
