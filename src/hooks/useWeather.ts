import { useState, useEffect } from 'react';
import {
  getWeatherData,
  getLatestWeather,
  getDailySummary,
  getDailyForecast,
  ApiError,
} from '@/services/api';
import type { WeatherData, DailySummary, DailyForecast, Location } from '@/types';

interface UseWeatherResult {
  data: WeatherData[] | null;
  latest: WeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useWeather = (
  location: Location | null,
  startDate?: string,
  endDate?: string
): UseWeatherResult => {
  const [data, setData] = useState<WeatherData[] | null>(null);
  const [latest, setLatest] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!location) {
      setData(null);
      setLatest(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [weatherData, latestData] = await Promise.all([
        getWeatherData(location.lat, location.lon, startDate, endDate),
        getLatestWeather(location.lat, location.lon),
      ]);

      setData(weatherData);
      setLatest(latestData);
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : 'Failed to fetch weather data. Please try again.';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location?.id, startDate, endDate]);

  return {
    data,
    latest,
    loading,
    error,
    refetch: fetchWeather,
  };
};

interface UseDailySummaryResult {
  data: DailySummary[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDailySummary = (
  location: Location | null,
  startDate?: string,
  endDate?: string
): UseDailySummaryResult => {
  const [data, setData] = useState<DailySummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDailySummary = async () => {
    if (!location) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const summaryData = await getDailySummary(
        location.lat,
        location.lon,
        startDate,
        endDate
      );
      setData(summaryData);
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : 'Failed to fetch daily summary. Please try again.';
      setError(errorMessage);
      console.error('Daily summary fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailySummary();
  }, [location?.id, startDate, endDate]);

  return {
    data,
    loading,
    error,
    refetch: fetchDailySummary,
  };
};

interface UseForecastResult {
  data: DailyForecast[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useForecast = (
  location: Location | null,
  forecastDays: number = 7
): UseForecastResult => {
  const [data, setData] = useState<DailyForecast[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = async () => {
    if (!location) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const forecastData = await getDailyForecast(
        location.lat,
        location.lon,
        forecastDays
      );
      setData(forecastData);
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : 'Failed to fetch weather forecast. Please try again.';
      setError(errorMessage);
      console.error('Forecast fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [location?.id, forecastDays]);

  return {
    data,
    loading,
    error,
    refetch: fetchForecast,
  };
};
