import type { WeatherData, DailyForecast, DailySummary } from '@/types';
import type { TranslationKeys } from '@/locales/en';

export interface WeatherInsight {
  id: string;
  type: 'info' | 'warning' | 'success' | 'tip';
  icon: string;
  title: string;
  description: string;
  priority: number; // Higher = more important
}

export interface WeatherTrend {
  direction: 'rising' | 'falling' | 'stable';
  change: number;
  description: string;
}

/**
 * Generate weather insights and recommendations based on current weather
 */
export const generateWeatherInsights = (
  current: WeatherData,
  t: TranslationKeys,
  forecast?: DailyForecast[]
): WeatherInsight[] => {
  const insights: WeatherInsight[] = [];
  let priority = 100;

  // Temperature insights
  if (current.temperature > 35) {
    insights.push({
      id: 'extreme-heat',
      type: 'warning',
      icon: '🔥',
      title: t.insights.extremeHeat,
      description: t.insights.extremeHeatDesc,
      priority: priority--,
    });
  } else if (current.temperature > 30) {
    insights.push({
      id: 'hot-weather',
      type: 'warning',
      icon: '☀️',
      title: t.insights.hotWeather,
      description: t.insights.hotWeatherDesc,
      priority: priority--,
    });
  } else if (current.temperature < 10) {
    insights.push({
      id: 'cold-weather',
      type: 'warning',
      icon: '🥶',
      title: t.insights.coldWeather,
      description: t.insights.coldWeatherDesc,
      priority: priority--,
    });
  } else if (current.temperature >= 20 && current.temperature <= 28) {
    insights.push({
      id: 'perfect-weather',
      type: 'success',
      icon: '🌤️',
      title: t.insights.perfectWeather,
      description: t.insights.perfectWeatherDesc,
      priority: priority--,
    });
  }

  // Precipitation insights
  if (current.precipitation > 10) {
    insights.push({
      id: 'heavy-rain',
      type: 'warning',
      icon: '⛈️',
      title: t.insights.heavyRain,
      description: t.insights.heavyRainDesc,
      priority: priority--,
    });
  } else if (current.precipitation > 2) {
    insights.push({
      id: 'light-rain',
      type: 'info',
      icon: '🌧️',
      title: t.insights.lightRain,
      description: t.insights.lightRainDesc,
      priority: priority--,
    });
  }

  // Humidity insights
  if (current.humidity > 80) {
    insights.push({
      id: 'high-humidity',
      type: 'info',
      icon: '💧',
      title: t.insights.highHumidity,
      description: t.insights.highHumidityDesc,
      priority: priority--,
    });
  } else if (current.humidity < 30) {
    insights.push({
      id: 'low-humidity',
      type: 'info',
      icon: '🏜️',
      title: t.insights.lowHumidity,
      description: t.insights.lowHumidityDesc,
      priority: priority--,
    });
  }

  // Wind insights
  if (current.windSpeed > 40) {
    insights.push({
      id: 'strong-wind',
      type: 'warning',
      icon: '💨',
      title: t.insights.strongWind,
      description: t.insights.strongWindDesc,
      priority: priority--,
    });
  } else if (current.windSpeed > 20) {
    insights.push({
      id: 'moderate-wind',
      type: 'info',
      icon: '🌬️',
      title: t.insights.moderateWind,
      description: t.insights.moderateWindDesc,
      priority: priority--,
    });
  }

  // Activity recommendations based on combined conditions
  const isGoodForOutdoor =
    current.temperature >= 15 &&
    current.temperature <= 30 &&
    current.precipitation < 1 &&
    current.windSpeed < 25;

  if (isGoodForOutdoor) {
    insights.push({
      id: 'outdoor-activities',
      type: 'tip',
      icon: '🏃',
      title: t.insights.outdoorActivities,
      description: t.insights.outdoorActivitiesDesc,
      priority: priority--,
    });
  }

  // Weather code specific insights
  if (current.weatherCode >= 95) {
    insights.push({
      id: 'thunderstorm',
      type: 'warning',
      icon: '⚡',
      title: t.insights.thunderstormAlert,
      description: t.insights.thunderstormAlertDesc,
      priority: priority--,
    });
  }

  // Forecast-based insights
  if (forecast && forecast.length > 0) {
    const tomorrow = forecast[0];
    const tempDiff = tomorrow.tempMax - current.temperature;

    if (Math.abs(tempDiff) > 5) {
      const direction = tempDiff > 0 ? t.insights.tempChangeRise : t.insights.tempChangeDrop;
      const amount = Math.abs(Math.round(tempDiff)).toString();
      insights.push({
        id: 'temp-change',
        type: 'info',
        icon: tempDiff > 0 ? '📈' : '📉',
        title: tempDiff > 0 ? t.insights.gettingWarmer : t.insights.gettingCooler,
        description: t.insights.tempChange.replace('{{direction}}', direction).replace('{{amount}}', amount),
        priority: priority--,
      });
    }

    // Check for rain in forecast
    const rainySoon = forecast.slice(0, 3).some((day) => day.precipitationSum > 5);
    if (rainySoon && current.precipitation < 1) {
      insights.push({
        id: 'rain-coming',
        type: 'info',
        icon: '☔',
        title: t.insights.rainComing,
        description: t.insights.rainComingDesc,
        priority: priority--,
      });
    }
  }

  // Sort by priority (higher first)
  return insights.sort((a, b) => b.priority - a.priority);
};

/**
 * Analyze temperature trend from historical data
 */
export const analyzeTemperatureTrend = (
  data: WeatherData[] | DailySummary[],
  t: TranslationKeys
): WeatherTrend => {
  if (data.length < 2) {
    return {
      direction: 'stable',
      change: 0,
      description: t.trend.stable,
    };
  }

  // Get temperatures based on data type
  const temperatures = data.map((item) => {
    if ('tempMax' in item) {
      return (item.tempMax + item.tempMin) / 2; // Average for daily data
    }
    return item.temperature;
  });

  // Calculate trend using linear regression (simple approach)
  const n = temperatures.length;
  const recent = temperatures.slice(-Math.min(7, n)); // Last 7 days or available
  const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
  const secondHalf = recent.slice(Math.floor(recent.length / 2));

  const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const change = avgSecond - avgFirst;

  let direction: 'rising' | 'falling' | 'stable';
  let description: string;
  const amount = Math.abs(Math.round(change * 10) / 10).toString();

  if (Math.abs(change) < 1) {
    direction = 'stable';
    description = t.trend.stable;
  } else if (change > 0) {
    direction = 'rising';
    description = t.trend.rising.replace('{{amount}}', amount);
  } else {
    direction = 'falling';
    description = t.trend.falling.replace('{{amount}}', amount);
  }

  return { direction, change, description };
};

/**
 * Get comfort level description based on temperature and humidity
 */
export const getComfortLevel = (temperature: number, humidity: number): string => {
  // Heat index calculation (simplified)
  const heatIndex = temperature + (0.5555 * (humidity / 100 - 0.1) * (temperature - 14.5));

  if (heatIndex < 15) return 'Cold';
  if (heatIndex < 20) return 'Cool';
  if (heatIndex < 25) return 'Comfortable';
  if (heatIndex < 30) return 'Warm';
  if (heatIndex < 35) return 'Hot';
  return 'Very Hot';
};
