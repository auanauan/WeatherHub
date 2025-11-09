import type { WeatherResponse, WeatherData, DailySummary, DailyForecast, DailyForecastResponse } from '@/types';

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1';
const CACHE_DURATION = 60 * 1000; // 60 seconds

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new ApiCache();

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithRetry<T>(
  url: string,
  options?: RequestInit,
  retries = 2
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (retries > 0 && error instanceof ApiError && error.statusCode !== 404) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry<T>(url, options, retries - 1);
    }
    throw error;
  }
}

export async function getWeatherData(
  lat: number,
  lon: number,
  startDate?: string,
  endDate?: string
): Promise<WeatherData[]> {
  const cacheKey = `weather-${lat}-${lon}-${startDate}-${endDate}`;
  const cached = cache.get<WeatherData[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code',
    timezone: 'auto',
  });

  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);

  try {
    const data = await fetchWithRetry<WeatherResponse>(
      `${OPEN_METEO_BASE_URL}/forecast?${params}`
    );

    const weatherData: WeatherData[] = data.hourly.time.map((time, index) => ({
      time,
      temperature: data.hourly.temperature_2m[index],
      humidity: data.hourly.relative_humidity_2m[index],
      windSpeed: data.hourly.wind_speed_10m[index],
      precipitation: data.hourly.precipitation[index],
      weatherCode: data.hourly.weather_code[index],
    }));

    cache.set(cacheKey, weatherData);
    return weatherData;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to fetch weather data',
      undefined,
      error as Error
    );
  }
}

export async function getLatestWeather(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  const data = await getWeatherData(lat, lon);
  return data.length > 0 ? data[data.length - 1] : null;
}

export function calculateDailySummary(
  weatherData: WeatherData[]
): DailySummary[] {
  const dailyMap = new Map<string, WeatherData[]>();

  weatherData.forEach((data) => {
    const date = data.time.split('T')[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, []);
    }
    dailyMap.get(date)!.push(data);
  });

  const summaries: DailySummary[] = [];

  dailyMap.forEach((dayData, date) => {
    const temps = dayData.map((d) => d.temperature);
    const winds = dayData.map((d) => d.windSpeed);
    const rains = dayData.map((d) => d.precipitation);

    summaries.push({
      date,
      tempMin: Math.min(...temps),
      tempMax: Math.max(...temps),
      rainTotal: rains.reduce((sum, val) => sum + val, 0),
      windMax: Math.max(...winds),
    });
  });

  return summaries.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getDailySummary(
  lat: number,
  lon: number,
  startDate?: string,
  endDate?: string
): Promise<DailySummary[]> {
  const weatherData = await getWeatherData(lat, lon, startDate, endDate);
  return calculateDailySummary(weatherData);
}

export function clearCache(): void {
  cache.clear();
}

export async function getDailyForecast(
  lat: number,
  lon: number,
  forecastDays: number = 7
): Promise<DailyForecast[]> {
  const cacheKey = `forecast-${lat}-${lon}-${forecastDays}`;
  const cached = cache.get<DailyForecast[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,wind_speed_10m_max',
    timezone: 'auto',
    forecast_days: forecastDays.toString(),
  });

  try {
    const data = await fetchWithRetry<DailyForecastResponse>(
      `${OPEN_METEO_BASE_URL}/forecast?${params}`
    );

    const forecasts: DailyForecast[] = data.daily.time.map((time, index) => ({
      date: time,
      tempMin: data.daily.temperature_2m_min[index],
      tempMax: data.daily.temperature_2m_max[index],
      weatherCode: data.daily.weather_code[index],
      precipitationSum: data.daily.precipitation_sum[index],
      windSpeedMax: data.daily.wind_speed_10m_max[index],
    }));

    cache.set(cacheKey, forecasts);
    return forecasts;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to fetch weather forecast',
      undefined,
      error as Error
    );
  }
}
