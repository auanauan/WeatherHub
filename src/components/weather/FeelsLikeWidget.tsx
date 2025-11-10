import styled from 'styled-components';
import { WeatherWidget } from './WeatherWidget';
import { useTranslation } from '@/hooks/useTranslation';

interface FeelsLikeWidgetProps {
  feelsLike: number;
  actual: number;
}

const FeelsLikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ThermometerContainer = styled.div`
  position: relative;
  width: 60px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ThermometerBulb = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${({ $color }) => $color}80 0%, ${({ $color }) => $color} 100%);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: ${({ $color }) => $color};
    border-radius: 50%;
    box-shadow: 0 0 10px ${({ $color }) => $color}80;
  }
`;

const ThermometerTube = styled.div`
  width: 16px;
  height: 80px;
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  border: ${({ theme }) => theme.glass.border};
  border-radius: 8px 8px 0 0;
  position: absolute;
  bottom: 20px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const MercuryLevel = styled.div<{ $percentage: number; $color: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ $percentage }) => $percentage}%;
  background: linear-gradient(180deg, ${({ $color }) => $color}60 0%, ${({ $color }) => $color} 100%);
  transition: height 0.5s ease;
  box-shadow: 0 0 8px ${({ $color }) => $color}40;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ $color }) => $color};
    box-shadow: 0 0 6px ${({ $color }) => $color};
  }
`;

const ComparisonText = styled.div<{ $warmer: boolean }>`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme, $warmer }) => $warmer ? '#f97316' : '#3b82f6'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const DifferenceLabel = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

const getTemperatureColor = (temp: number): string => {
  if (temp < 0) return '#60a5fa';
  if (temp < 10) return '#3b82f6';
  if (temp < 20) return '#10b981';
  if (temp < 30) return '#f59e0b';
  return '#ef4444';
};

const getTemperaturePercentage = (temp: number): number => {
  // Map -20°C to 50°C range to 0-100%
  const minTemp = -20;
  const maxTemp = 50;
  const clamped = Math.max(minTemp, Math.min(maxTemp, temp));
  return ((clamped - minTemp) / (maxTemp - minTemp)) * 100;
};

const getComparisonText = (difference: number): string => {
  const absDiff = Math.abs(difference);
  if (absDiff < 1) return 'Similar to actual';
  if (absDiff < 3) return `Feels ${difference > 0 ? 'warmer' : 'cooler'}`;
  if (absDiff < 5) return `Feels much ${difference > 0 ? 'warmer' : 'cooler'}`;
  return `Feels significantly ${difference > 0 ? 'warmer' : 'cooler'}`;
};

export const FeelsLikeWidget = ({ feelsLike, actual }: FeelsLikeWidgetProps) => {
  const { t } = useTranslation();
  const difference = feelsLike - actual;
  const color = getTemperatureColor(feelsLike);
  const percentage = getTemperaturePercentage(feelsLike);
  const comparisonText = getComparisonText(difference);
  const isWarmer = difference > 0;

  return (
    <WeatherWidget
      icon="🌡️"
      title={t.weather.feelsLike || 'Feels Like'}
      value={`${Math.round(feelsLike)}°C`}
      subtitle={comparisonText}
    >
      <FeelsLikeContainer>
        <ThermometerContainer>
          <ThermometerTube>
            <MercuryLevel $percentage={percentage} $color={color} />
          </ThermometerTube>
          <ThermometerBulb $color={color} />
        </ThermometerContainer>
        {Math.abs(difference) >= 1 && (
          <ComparisonText $warmer={isWarmer}>
            {isWarmer ? '🔥' : '❄️'}
            <DifferenceLabel>
              {isWarmer ? '+' : ''}{difference.toFixed(1)}°
            </DifferenceLabel>
          </ComparisonText>
        )}
      </FeelsLikeContainer>
    </WeatherWidget>
  );
};
