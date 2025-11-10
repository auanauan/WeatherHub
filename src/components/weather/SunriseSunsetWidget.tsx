import styled from 'styled-components';
import { WeatherWidget } from './WeatherWidget';
import { useTranslation } from '@/hooks/useTranslation';

interface SunriseSunsetWidgetProps {
  sunrise: string;
  sunset: string;
}

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TimeBlock = styled.div`
  flex: 1;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.03)'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TimeIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TimeLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TimeValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const SunPath = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  height: 60px;
  position: relative;
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.03)'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const SunArc = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  border-top: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 50% 50% 0 0;
  opacity: 0.5;
`;

const Sun = styled.div<{ $position: number }>`
  position: absolute;
  bottom: ${({ $position }) => $position}%;
  left: ${({ $position }) => $position}%;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
  transform: translate(-50%, 50%);
  animation: glow 2s ease-in-out infinite;

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
    }
  }
`;

const calculateSunPosition = (sunrise: string, sunset: string): number => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [sunriseHours, sunriseMinutes] = sunrise.split(':').map(Number);
  const [sunsetHours, sunsetMinutes] = sunset.split(':').map(Number);

  const sunriseMinutesTotal = sunriseHours * 60 + sunriseMinutes;
  const sunsetMinutesTotal = sunsetHours * 60 + sunsetMinutes;

  if (currentMinutes < sunriseMinutesTotal) {
    return 0;
  } else if (currentMinutes > sunsetMinutesTotal) {
    return 100;
  } else {
    const dayLength = sunsetMinutesTotal - sunriseMinutesTotal;
    const elapsed = currentMinutes - sunriseMinutesTotal;
    return (elapsed / dayLength) * 100;
  }
};

export const SunriseSunsetWidget = ({ sunrise, sunset }: SunriseSunsetWidgetProps) => {
  const { t } = useTranslation();
  const sunPosition = calculateSunPosition(sunrise, sunset);

  return (
    <WeatherWidget
      icon="🌅"
      title={t.weather.sunrise + ' / ' + t.weather.sunset}
      value=""
    >
      <TimeContainer>
        <TimeBlock>
          <TimeIcon>🌅</TimeIcon>
          <TimeLabel>{t.weather.sunrise}</TimeLabel>
          <TimeValue>{sunrise}</TimeValue>
        </TimeBlock>
        <TimeBlock>
          <TimeIcon>🌇</TimeIcon>
          <TimeLabel>{t.weather.sunset}</TimeLabel>
          <TimeValue>{sunset}</TimeValue>
        </TimeBlock>
      </TimeContainer>
      <SunPath>
        <SunArc />
        <Sun $position={sunPosition} />
      </SunPath>
    </WeatherWidget>
  );
};
