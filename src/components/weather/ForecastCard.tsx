import styled from 'styled-components';
import { getWeatherDescription } from '@/utils/weatherCodes';
import { AnimatedWeatherIcon } from './AnimatedWeatherIcon';
import type { DailyForecast } from '@/types';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all 0.2s ease;
  min-width: 140px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DayLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
`;

const DateLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const WeatherIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const Condition = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  min-height: 32px;
`;

const TempRange = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const TempMax = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const TempMin = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StatLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

interface ForecastCardProps {
  forecast: DailyForecast;
}

const formatDate = (dateString: string): { day: string; date: string } => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  if (isToday) {
    return { day: 'Today', date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
  } else if (isTomorrow) {
    return { day: 'Tomorrow', date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
  } else {
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  }
};

export const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const { day, date } = formatDate(forecast.date);

  return (
    <Card>
      <DayLabel>{day}</DayLabel>
      <DateLabel>{date}</DateLabel>

      <WeatherIconContainer>
        <AnimatedWeatherIcon weatherCode={forecast.weatherCode} size={64} />
      </WeatherIconContainer>
      <Condition>{getWeatherDescription(forecast.weatherCode)}</Condition>

      <TempRange>
        <TempMax>{Math.round(forecast.tempMax)}°</TempMax>
        <TempMin>{Math.round(forecast.tempMin)}°</TempMin>
      </TempRange>

      <Divider />

      <Stats>
        <Stat>
          <StatLabel>
            <span>🌧️</span>
            <span>Rain</span>
          </StatLabel>
          <StatValue>{forecast.precipitationSum.toFixed(1)} mm</StatValue>
        </Stat>
        <Stat>
          <StatLabel>
            <span>💨</span>
            <span>Wind</span>
          </StatLabel>
          <StatValue>{forecast.windSpeedMax.toFixed(1)} m/s</StatValue>
        </Stat>
      </Stats>
    </Card>
  );
};
