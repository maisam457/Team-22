import { useState, useEffect } from 'react';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeolocationState {
  coordinates: Coordinates | null;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean | null;
}

export function useGeolocation(requestOnMount = false) {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    isLoading: false,
    error: null,
    hasPermission: null,
  });

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        isLoading: false,
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          isLoading: false,
          error: null,
          hasPermission: true,
        });

        // Cache location in sessionStorage (expires when browser closes)
        sessionStorage.setItem('user_location', JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: Date.now(),
        }));
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }

        setState({
          coordinates: null,
          isLoading: false,
          error: errorMessage,
          hasPermission: error.code === error.PERMISSION_DENIED ? false : null,
        });
      },
      {
        enableHighAccuracy: false, // Faster, less battery drain
        timeout: 10000, // 10 seconds
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  };

  const clearLocation = () => {
    setState({
      coordinates: null,
      isLoading: false,
      error: null,
      hasPermission: null,
    });
    sessionStorage.removeItem('user_location');
  };

  // Check for cached location on mount
  useEffect(() => {
    const cached = sessionStorage.getItem('user_location');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;
        
        // Use cached location if less than 5 minutes old
        if (age < 300000) {
          setState({
            coordinates: {
              latitude: parsed.latitude,
              longitude: parsed.longitude,
            },
            isLoading: false,
            error: null,
            hasPermission: true,
          });
          return;
        }
      } catch (e) {
        sessionStorage.removeItem('user_location');
      }
    }

    if (requestOnMount) {
      requestLocation();
    }
  }, [requestOnMount]);

  return {
    ...state,
    requestLocation,
    clearLocation,
  };
}

