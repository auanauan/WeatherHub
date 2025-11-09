import { formatDateTime, formatDate } from './date';
import type { WeatherData, DailySummary } from '@/types';

/**
 * Convert array of objects to CSV string
 */
function arrayToCSV<T extends Record<string, any>>(
  data: T[],
  headers: { key: keyof T; label: string }[]
): string {
  // Create header row
  const headerRow = headers.map((h) => h.label).join(',');

  // Create data rows
  const dataRows = data.map((row) => {
    return headers
      .map((header) => {
        const value = row[header.key];
        // Handle null/undefined
        if (value === null || value === undefined) return '';
        // Wrap strings containing commas in quotes
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      })
      .join(',');
  });

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Trigger browser download of CSV file
 */
function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Export hourly weather data to CSV
 */
export function exportHourlyWeatherCSV(
  data: WeatherData[],
  locationName: string
): void {
  const headers = [
    { key: 'time' as keyof WeatherData, label: 'Date Time' },
    { key: 'temperature' as keyof WeatherData, label: 'Temperature (°C)' },
    { key: 'humidity' as keyof WeatherData, label: 'Humidity (%)' },
    { key: 'windSpeed' as keyof WeatherData, label: 'Wind Speed (m/s)' },
    { key: 'precipitation' as keyof WeatherData, label: 'Precipitation (mm)' },
    { key: 'weatherCode' as keyof WeatherData, label: 'Weather Code' },
  ];

  const formattedData = data.map((item) => ({
    ...item,
    time: formatDateTime(item.time, 'yyyy-MM-dd HH:mm:ss'),
    temperature: item.temperature.toFixed(2),
    humidity: item.humidity.toFixed(1),
    windSpeed: item.windSpeed.toFixed(2),
    precipitation: item.precipitation.toFixed(2),
  }));

  const csv = arrayToCSV(formattedData, headers);
  const filename = `${locationName}_hourly_${formatDate(new Date())}.csv`;

  downloadCSV(csv, filename);
}

/**
 * Export daily summary data to CSV
 */
export function exportDailySummaryCSV(
  data: DailySummary[],
  locationName: string
): void {
  const headers = [
    { key: 'date' as keyof DailySummary, label: 'Date' },
    { key: 'tempMin' as keyof DailySummary, label: 'Min Temperature (°C)' },
    { key: 'tempMax' as keyof DailySummary, label: 'Max Temperature (°C)' },
    { key: 'rainTotal' as keyof DailySummary, label: 'Total Rain (mm)' },
    { key: 'windMax' as keyof DailySummary, label: 'Max Wind Speed (m/s)' },
  ];

  const formattedData = data.map((item) => ({
    ...item,
    tempMin: item.tempMin.toFixed(2),
    tempMax: item.tempMax.toFixed(2),
    rainTotal: item.rainTotal.toFixed(2),
    windMax: item.windMax.toFixed(2),
  }));

  const csv = arrayToCSV(formattedData, headers);
  const filename = `${locationName}_daily_${formatDate(new Date())}.csv`;

  downloadCSV(csv, filename);
}

/**
 * Export comparison data to CSV (two locations)
 */
export function exportComparisonCSV(
  data1: DailySummary[],
  data2: DailySummary[],
  location1Name: string,
  location2Name: string
): void {
  // Merge data by date
  const dateMap = new Map<string, any>();

  data1.forEach((item) => {
    dateMap.set(item.date, {
      date: item.date,
      [`${location1Name}_tempMin`]: item.tempMin.toFixed(2),
      [`${location1Name}_tempMax`]: item.tempMax.toFixed(2),
      [`${location1Name}_rain`]: item.rainTotal.toFixed(2),
      [`${location1Name}_windMax`]: item.windMax.toFixed(2),
    });
  });

  data2.forEach((item) => {
    const existing = dateMap.get(item.date);
    if (existing) {
      existing[`${location2Name}_tempMin`] = item.tempMin.toFixed(2);
      existing[`${location2Name}_tempMax`] = item.tempMax.toFixed(2);
      existing[`${location2Name}_rain`] = item.rainTotal.toFixed(2);
      existing[`${location2Name}_windMax`] = item.windMax.toFixed(2);
    } else {
      dateMap.set(item.date, {
        date: item.date,
        [`${location2Name}_tempMin`]: item.tempMin.toFixed(2),
        [`${location2Name}_tempMax`]: item.tempMax.toFixed(2),
        [`${location2Name}_rain`]: item.rainTotal.toFixed(2),
        [`${location2Name}_windMax`]: item.windMax.toFixed(2),
      });
    }
  });

  const mergedData = Array.from(dateMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const headers = [
    { key: 'date', label: 'Date' },
    { key: `${location1Name}_tempMin`, label: `${location1Name} Min Temp (°C)` },
    { key: `${location1Name}_tempMax`, label: `${location1Name} Max Temp (°C)` },
    { key: `${location1Name}_rain`, label: `${location1Name} Rain (mm)` },
    { key: `${location1Name}_windMax`, label: `${location1Name} Max Wind (m/s)` },
    { key: `${location2Name}_tempMin`, label: `${location2Name} Min Temp (°C)` },
    { key: `${location2Name}_tempMax`, label: `${location2Name} Max Temp (°C)` },
    { key: `${location2Name}_rain`, label: `${location2Name} Rain (mm)` },
    { key: `${location2Name}_windMax`, label: `${location2Name} Max Wind (m/s)` },
  ];

  const csv = arrayToCSV(mergedData, headers);
  const filename = `comparison_${location1Name}_vs_${location2Name}_${formatDate(
    new Date()
  )}.csv`;

  downloadCSV(csv, filename);
}
