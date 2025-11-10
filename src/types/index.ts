export interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
  timezone: string;
  isTracking?: boolean;
}

export interface WeatherData {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection?: number;
  precipitation: number;
  weatherCode: number;
  uvIndex?: number;
  sunrise?: string;
  sunset?: string;
  pressure?: number;
  visibility?: number;
  apparentTemperature?: number;
}

export interface DailySummary {
  date: string;
  tempMin: number;
  tempMax: number;
  rainTotal: number;
  windMax: number;
}

export interface DailyForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  weatherCode: number;
  precipitationSum: number;
  windSpeedMax: number;
}

export interface DailyForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    precipitation: number[];
    weather_code: number[];
  };
  daily?: {
    time: string[];
    uv_index_max?: number[];
    sunrise?: string[];
    sunset?: string[];
  };
}

export type ThemeMode = 'light' | 'dark';

export interface GeocodingResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}
