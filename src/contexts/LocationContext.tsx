import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Location } from '@/types';

interface LocationContextType {
  locations: Location[];
  selectedLocation: Location | null;
  addLocation: (location: Omit<Location, 'id'>) => void;
  removeLocation: (id: string) => void;
  updateLocation: (id: string, updates: Partial<Location>) => void;
  selectLocation: (id: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocations = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocations must be used within LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

// Default locations
const DEFAULT_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Bangkok',
    lat: 13.7563,
    lon: 100.5018,
    timezone: 'Asia/Bangkok',
    isTracking: true,
  },
  {
    id: '2',
    name: 'Chiang Mai',
    lat: 18.7883,
    lon: 98.9853,
    timezone: 'Asia/Bangkok',
    isTracking: true,
  },
  {
    id: '3',
    name: 'Phuket',
    lat: 7.8804,
    lon: 98.3923,
    timezone: 'Asia/Bangkok',
    isTracking: true,
  },
];

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [locations, setLocations] = useState<Location[]>(() => {
    const saved = localStorage.getItem('locations');
    return saved ? JSON.parse(saved) : DEFAULT_LOCATIONS;
  });

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(() => {
    const savedId = localStorage.getItem('selectedLocationId');
    const saved = localStorage.getItem('locations');
    const locs: Location[] = saved ? JSON.parse(saved) : DEFAULT_LOCATIONS;

    if (savedId) {
      return locs.find((loc) => loc.id === savedId) || locs[0];
    }
    return locs[0];
  });

  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem('selectedLocationId', selectedLocation.id);
    }
  }, [selectedLocation]);

  const addLocation = (location: Omit<Location, 'id'>) => {
    const newLocation: Location = {
      ...location,
      id: Date.now().toString(),
      isTracking: true,
    };
    setLocations((prev) => [...prev, newLocation]);
  };

  const removeLocation = (id: string) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
    if (selectedLocation?.id === id) {
      const remaining = locations.filter((loc) => loc.id !== id);
      setSelectedLocation(remaining[0] || null);
    }
  };

  const updateLocation = (id: string, updates: Partial<Location>) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, ...updates } : loc))
    );
    if (selectedLocation?.id === id) {
      setSelectedLocation((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const selectLocation = (id: string) => {
    const location = locations.find((loc) => loc.id === id);
    if (location) {
      setSelectedLocation(location);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        locations,
        selectedLocation,
        addLocation,
        removeLocation,
        updateLocation,
        selectLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
