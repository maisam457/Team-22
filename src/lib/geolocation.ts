import { Coordinates } from '@/hooks/useGeolocation';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 First coordinate
 * @param coord2 Second coordinate
 * @returns Distance in miles
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.latitude)) *
      Math.cos(toRadians(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 * @param miles Distance in miles
 * @returns Formatted string
 */
export function formatDistance(miles: number): string {
  if (miles < 1) {
    return 'Less than 1 mile away';
  } else if (miles < 10) {
    return `${miles} miles away`;
  } else if (miles < 100) {
    return `${Math.round(miles)} miles away`;
  } else {
    return `${Math.round(miles / 10) * 10}+ miles away`;
  }
}

/**
 * Get coordinates from location string (city, state)
 * This is a simplified geocoding - in production, you'd use a real geocoding API
 * For now, we'll use approximate coordinates for major US states
 */
const STATE_COORDINATES: Record<string, Coordinates> = {
  TX: { latitude: 31.9686, longitude: -99.9018 },
  MA: { latitude: 42.4072, longitude: -71.3824 },
  WA: { latitude: 47.7511, longitude: -120.7401 },
  IL: { latitude: 40.6331, longitude: -89.3985 },
  FL: { latitude: 27.6648, longitude: -81.5158 },
  CA: { latitude: 36.7783, longitude: -119.4179 },
  NY: { latitude: 43.2994, longitude: -74.2179 },
  PA: { latitude: 41.2033, longitude: -77.1945 },
  OH: { latitude: 40.4173, longitude: -82.9071 },
  GA: { latitude: 32.1656, longitude: -82.9001 },
};

/**
 * Get approximate coordinates from state code
 * @param state Two-letter state code
 * @returns Coordinates or null if not found
 */
export function getStateCoordinates(state: string): Coordinates | null {
  return STATE_COORDINATES[state.toUpperCase()] || null;
}

/**
 * Check if a post is within a certain radius
 * @param userCoords User's coordinates
 * @param postAuthorCoords Post author's coordinates
 * @param radiusMiles Radius in miles
 * @returns true if within radius
 */
export function isWithinRadius(
  userCoords: Coordinates,
  postAuthorCoords: Coordinates,
  radiusMiles: number = 50
): boolean {
  const distance = calculateDistance(userCoords, postAuthorCoords);
  return distance <= radiusMiles;
}

