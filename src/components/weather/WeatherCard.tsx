import styled from 'styled-components';
import { Card, CardTitle, CardHeader } from '@/components/common/Card';
import { getWeatherDescription } from '@/utils/weatherCodes';
import { formatDateTime } from '@/utils/date';
import { Weather3DIcon } from './Weather3DIcon';
import { HeroIllustration } from './HeroIllustration';
import type { WeatherData } from '@/types';

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const MainWeather = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const WeatherIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const Temperature = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Condition = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Timestamp = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const WeatherStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  border: ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px 0 ${({ theme }) => theme.colors.shadow};
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface WeatherCardProps {
  data: WeatherData;
  locationName: string;
}

export const WeatherCard = ({ data, locationName }: WeatherCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{locationName}</CardTitle>
      </CardHeader>

      <MainWeather>
        <HeroSection>
          <WeatherIconContainer>
            <Weather3DIcon weatherCode={data.weatherCode} size={140} />
          </WeatherIconContainer>
          <HeroIllustration />
        </HeroSection>
        <Temperature>{Math.round(data.temperature)}°C</Temperature>
        <Condition>{getWeatherDescription(data.weatherCode)}</Condition>
        <Timestamp>Last updated: {formatDateTime(data.time)}</Timestamp>
      </MainWeather>

      <WeatherGrid>
        <WeatherStat>
          <StatIcon>💧</StatIcon>
          <StatValue>{data.humidity}%</StatValue>
          <StatLabel>Humidity</StatLabel>
        </WeatherStat>

        <WeatherStat>
          <StatIcon>💨</StatIcon>
          <StatValue>{data.windSpeed.toFixed(1)} m/s</StatValue>
          <StatLabel>Wind Speed</StatLabel>
        </WeatherStat>

        <WeatherStat>
          <StatIcon>🌧️</StatIcon>
          <StatValue>{data.precipitation.toFixed(1)} mm</StatValue>
          <StatLabel>Precipitation</StatLabel>
        </WeatherStat>
      </WeatherGrid>
    </Card>
  );
};
