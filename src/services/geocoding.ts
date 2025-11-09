import type { GeocodingResult } from '@/types';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

// Cache for search results to reduce API calls
const searchCache = new Map<string, GeocodingResult[]>();

export async function searchLocation(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const cacheKey = query.toLowerCase().trim();
  const cached = searchCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const params = new URLSearchParams({
    q: query,
    format: 'json',
    addressdetails: '1',
    limit: '5',
  });

  try {
    const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'WeatherHub App',
      },
    });

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    searchCache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error('Geocoding search error:', error);
    return [];
  }
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeocodingResult | null> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    format: 'json',
    addressdetails: '1',
  });

  try {
    const response = await fetch(`${NOMINATIM_BASE_URL}/reverse?${params}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'WeatherHub App',
      },
    });

    if (!response.ok) {
      throw new Error(`Reverse geocoding error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}

export function getLocationName(result: GeocodingResult): string {
  const { address } = result;
  if (!address) return result.display_name.split(',')[0];

  return address.city || address.town || address.village || result.display_name.split(',')[0];
}

export function getTimezoneFromCoords(lat: number, lon: number): string {
  // Simple timezone estimation based on longitude
  // This is a rough estimate - for production, use a proper timezone API
  const offset = Math.round(lon / 15);

  // Common timezones for different regions
  if (lat >= 5 && lat <= 21 && lon >= 97 && lon <= 106) {
    return 'Asia/Bangkok'; // Thailand region
  }
  if (lat >= -45 && lat <= -10 && lon >= 110 && lon <= 155) {
    return 'Australia/Sydney';
  }
  if (lat >= 24 && lat <= 50 && lon >= -125 && lon <= -66) {
    return 'America/New_York';
  }
  if (lat >= 36 && lat <= 71 && lon >= -10 && lon <= 40) {
    return 'Europe/London';
  }
  if (lat >= 20 && lat <= 45 && lon >= 73 && lon <= 135) {
    return 'Asia/Shanghai';
  }

  // Default fallback based on UTC offset
  return `Etc/GMT${offset >= 0 ? '-' : '+'}${Math.abs(offset)}`;
}
