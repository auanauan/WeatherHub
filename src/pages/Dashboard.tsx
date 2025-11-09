import { useState } from 'react';
import styled from 'styled-components';
import { useLocations } from '@/contexts/LocationContext';
import { useWeather, useDailySummary, useForecast } from '@/hooks/useWeather';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { WeatherCardSkeleton } from '@/components/weather/WeatherCardSkeleton';
import { ForecastGrid } from '@/components/weather/ForecastGrid';
import { ForecastGridSkeleton } from '@/components/weather/ForecastGridSkeleton';
import { HourlyChart } from '@/components/charts/HourlyChart';
import { DailyChart } from '@/components/charts/DailyChart';
import { ChartSkeleton } from '@/components/common/ChartSkeleton';
import { Select, FormGroup, Label } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { DateRangeSelector, type DateRange } from '@/components/common/DateRangeSelector';
import { ErrorMessage, EmptyState } from '@/components/common/ErrorMessage';
import { PageTransition } from '@/components/common/PageTransition';
import { FadeIn } from '@/components/common/FadeIn';
import { getLastNDays, getDaysBetween } from '@/utils/date';
import { exportHourlyWeatherCSV, exportDailySummaryCSV } from '@/utils/csvExport';
import { toast } from '@/utils/alert';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Controls = styled.div`
  display: flex;
  align-items: end;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const LocationSelector = styled.div`
  min-width: 250px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ChartActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Dashboard = () => {
  const { locations, selectedLocation, selectLocation } = useLocations();
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const range = getLastNDays(7);
    return {
      start: range.start,
      end: range.end,
      label: 'Last 7 Days',
    };
  });

  const { latest, loading: weatherLoading, error: weatherError } = useWeather(selectedLocation);
  const {
    data: hourlyData,
    loading: hourlyLoading,
    error: hourlyError,
  } = useWeather(selectedLocation, dateRange.start, dateRange.end);
  const {
    data: dailyData,
    loading: dailyLoading,
    error: dailyError,
  } = useDailySummary(selectedLocation, dateRange.start, dateRange.end);
  // Calculate forecast days from date range, max 16 days (API limit)
  const forecastDays = Math.min(
    getDaysBetween(dateRange.start, dateRange.end) || 7,
    16
  );

  const handleExportHourly = () => {
    if (hourlyData && selectedLocation) {
      exportHourlyWeatherCSV(hourlyData, selectedLocation.name);
      toast.success('Hourly weather data exported successfully!');
    }
  };

  const handleExportDaily = () => {
    if (dailyData && selectedLocation) {
      exportDailySummaryCSV(dailyData, selectedLocation.name);
      toast.success('Daily summary data exported successfully!');
    }
  };

  const {
    data: forecastData,
    loading: forecastLoading,
    error: forecastError,
  } = useForecast(selectedLocation, forecastDays);

  if (locations.length === 0) {
    return (
      <PageTransition>
        <DashboardContainer>
          <EmptyState
            message="No locations added yet. Add your first location to get started!"
            icon="🌍"
          />
        </DashboardContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <DashboardContainer>
      <PageHeader>
        <HeaderTop>
          <PageTitle>Weather Dashboard</PageTitle>
        </HeaderTop>
        <Controls>
          <LocationSelector>
            <FormGroup>
              <Label>Select Location</Label>
              <Select
                value={selectedLocation?.id || ''}
                onChange={(e) => selectLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </LocationSelector>
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
        </Controls>
      </PageHeader>

      {weatherLoading && <WeatherCardSkeleton />}
      {!weatherLoading && weatherError && <ErrorMessage message={weatherError} />}
      {!weatherLoading && latest && selectedLocation && (
        <WeatherCard data={latest} locationName={selectedLocation.name} />
      )}

      {forecastLoading && <ForecastGridSkeleton />}
      {!forecastLoading && forecastError && <ErrorMessage message={forecastError} />}
      {!forecastLoading && forecastData && forecastData.length > 0 && (
        <ForecastGrid
          forecasts={forecastData}
          title={`${forecastDays}-Day Forecast`}
        />
      )}

      <ChartsGrid>
        {hourlyLoading && <ChartSkeleton />}
        {!hourlyLoading && hourlyError && <ErrorMessage message={hourlyError} />}
        {!hourlyLoading && hourlyData && hourlyData.length > 0 && selectedLocation && (
          <ChartSection>
            <HourlyChart data={hourlyData} title={`Hourly Weather (${dateRange.label})`} />
            <ChartActions>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportHourly}
              >
                📥 Export Hourly Data
              </Button>
            </ChartActions>
          </ChartSection>
        )}

        {dailyLoading && <ChartSkeleton />}
        {!dailyLoading && dailyError && <ErrorMessage message={dailyError} />}
        {!dailyLoading && dailyData && dailyData.length > 0 && selectedLocation && (
          <ChartSection>
            <DailyChart data={dailyData} title={`Daily Summary (${dateRange.label})`} />
            <ChartActions>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportDaily}
              >
                📥 Export Daily Summary
              </Button>
            </ChartActions>
          </ChartSection>
        )}
      </ChartsGrid>
    </DashboardContainer>
    </PageTransition>
  );
};
