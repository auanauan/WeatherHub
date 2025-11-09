import { format, subDays, startOfDay, differenceInDays } from 'date-fns';

export function formatDate(date: Date | string, formatStr = 'yyyy-MM-dd'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
}

export function formatDateTime(
  date: Date | string,
  formatStr = 'MMM dd, yyyy HH:mm'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
}

export function getLastNDays(n: number): { start: string; end: string } {
  const end = startOfDay(new Date());
  const start = startOfDay(subDays(end, n));

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
}

export function getDaysAgo(days: number): string {
  return formatDate(subDays(new Date(), days));
}

export function getToday(): string {
  return formatDate(new Date());
}

export function getDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.abs(differenceInDays(end, start));
}
