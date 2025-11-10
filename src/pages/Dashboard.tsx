import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useLocations } from '@/contexts/LocationContext';
import { useWeather, useDailySummary, useForecast } from '@/hooks/useWeather';
import { useTranslation } from '@/hooks/useTranslation';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { WeatherCardSkeleton } from '@/components/weather/WeatherCardSkeleton';
import { ForecastGrid } from '@/components/weather/ForecastGrid';
import { ForecastGridSkeleton } from '@/components/weather/ForecastGridSkeleton';
import { InsightsCard } from '@/components/weather/InsightsCard';
import { TrendIndicator } from '@/components/weather/TrendIndicator';
import { UVIndexWidget } from '@/components/weather/UVIndexWidget';
import { SunriseSunsetWidget } from '@/components/weather/SunriseSunsetWidget';
import { HourlyChart } from '@/components/charts/HourlyChart';
import { DailyChart } from '@/components/charts/DailyChart';
import { ChartSkeleton } from '@/components/common/ChartSkeleton';
import { Select, FormGroup, Label } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { DateRangeSelector, type DateRange } from '@/components/common/DateRangeSelector';
import { ErrorMessage, EmptyState } from '@/components/common/ErrorMessage';
import { PageTransition } from '@/components/common/PageTransition';
import { getLastNDays, getDaysBetween } from '@/utils/date';
import { exportHourlyWeatherCSV, exportDailySummaryCSV } from '@/utils/csvExport';
import { generateWeatherInsights, analyzeTemperatureTrend } from '@/utils/weatherInsights';
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

const TitleWithTrend = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
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

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
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
  const { t, translate } = useTranslation();
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const range = getLastNDays(7);
    return {
      start: range.start,
      end: range.end,
      label: 'Last 7 Days', // Will be updated on mount
    };
  });

  // Update dateRange label when language changes
  useEffect(() => {
    setDateRange((prev) => {
      const days = getDaysBetween(prev.start, prev.end);
      if (days === 7) return { ...prev, label: t.dateRange.last7Days };
      if (days === 14) return { ...prev, label: t.dateRange.last14Days };
      if (days === 30) return { ...prev, label: t.dateRange.last30Days };
      return { ...prev, label: translate(t.dateRange.lastDays, { days: days?.toString() || '7' }) };
    });
  }, [t, translate]);

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
      toast.success(translate(t.alerts.exportSuccess, { type: t.alerts.hourlyData }));
    }
  };

  const handleExportDaily = () => {
    if (dailyData && selectedLocation) {
      exportDailySummaryCSV(dailyData, selectedLocation.name);
      toast.success(translate(t.alerts.exportSuccess, { type: t.alerts.dailyData }));
    }
  };

  const {
    data: forecastData,
    loading: forecastLoading,
    error: forecastError,
  } = useForecast(selectedLocation, forecastDays);

  // Generate weather insights
  const insights = useMemo(() => {
    if (!latest) return [];
    return generateWeatherInsights(latest, t, forecastData || undefined);
  }, [latest, t, forecastData]);

  // Analyze temperature trend
  const temperatureTrend = useMemo(() => {
    if (!dailyData || dailyData.length < 2) return null;
    return analyzeTemperatureTrend(dailyData, t);
  }, [dailyData, t]);

  if (locations.length === 0) {
    return (
      <PageTransition>
        <DashboardContainer>
          <EmptyState
            message={t.dashboard.noLocations}
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
          <TitleWithTrend>
            <PageTitle>{t.dashboard.title}</PageTitle>
            {temperatureTrend && <TrendIndicator trend={temperatureTrend} />}
          </TitleWithTrend>
        </HeaderTop>
        <Controls>
          <LocationSelector>
            <FormGroup>
              <Label>{t.dashboard.selectLocation}</Label>
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

      {/* Weather Widgets */}
      {!weatherLoading && latest && (
        <WidgetsGrid>
          {latest.uvIndex !== undefined && (
            <UVIndexWidget uvIndex={latest.uvIndex} />
          )}
          {latest.sunrise && latest.sunset && (
            <SunriseSunsetWidget
              sunrise={latest.sunrise.split('T')[1] || latest.sunrise}
              sunset={latest.sunset.split('T')[1] || latest.sunset}
            />
          )}
        </WidgetsGrid>
      )}

      {/* Weather Insights */}
      {!weatherLoading && insights.length > 0 && (
        <InsightsCard insights={insights} />
      )}

      {forecastLoading && <ForecastGridSkeleton />}
      {!forecastLoading && forecastError && <ErrorMessage message={forecastError} />}
      {!forecastLoading && forecastData && forecastData.length > 0 && (
        <ForecastGrid
          forecasts={forecastData}
          title={translate(t.dashboard.dayForecast, { days: forecastDays.toString() })}
        />
      )}

      <ChartsGrid>
        {hourlyLoading && <ChartSkeleton />}
        {!hourlyLoading && hourlyError && <ErrorMessage message={hourlyError} />}
        {!hourlyLoading && hourlyData && hourlyData.length > 0 && selectedLocation && (
          <ChartSection>
            <HourlyChart data={hourlyData} title={`${t.dashboard.hourlyWeather} (${dateRange.label})`} />
            <ChartActions>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportHourly}
              >
                📥 {t.dashboard.exportHourly}
              </Button>
            </ChartActions>
          </ChartSection>
        )}

        {dailyLoading && <ChartSkeleton />}
        {!dailyLoading && dailyError && <ErrorMessage message={dailyError} />}
        {!dailyLoading && dailyData && dailyData.length > 0 && selectedLocation && (
          <ChartSection>
            <DailyChart data={dailyData} title={`${t.dashboard.dailySummary} (${dateRange.label})`} />
            <ChartActions>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportDaily}
              >
                📥 {t.dashboard.exportDaily}
              </Button>
            </ChartActions>
          </ChartSection>
        )}
      </ChartsGrid>
    </DashboardContainer>
    </PageTransition>
  );
};
