import styled from 'styled-components';
import { WeatherWidget } from './WeatherWidget';
import { useTranslation } from '@/hooks/useTranslation';

interface WindWidgetProps {
  speed: number;
  direction?: number;
}

const WindContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const WindCompass = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  border: ${({ theme }) => theme.glass.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.glass.shadow};
`;

const WindArrow = styled.div<{ $rotation: number }>`
  width: 4px;
  height: 40px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  border-radius: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${({ $rotation }) => $rotation}deg);
  transform-origin: center 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid ${({ theme }) => theme.colors.primary};
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const CompassDirection = styled.div<{ $position: 'N' | 'E' | 'S' | 'W'; $angle: number }>`
  position: absolute;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme, $position }) => $position === 'N' ? theme.colors.primary : theme.colors.textSecondary};
  transform: rotate(${({ $angle }) => $angle}deg) translate(0, -38px) rotate(-${({ $angle }) => $angle}deg);
`;

const DirectionText = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

const getWindScale = (speed: number): { level: string; color: string } => {
  if (speed < 1) return { level: 'Calm', color: '#10b981' };
  if (speed < 5) return { level: 'Light Air', color: '#10b981' };
  if (speed < 11) return { level: 'Light Breeze', color: '#3b82f6' };
  if (speed < 19) return { level: 'Moderate', color: '#f59e0b' };
  if (speed < 28) return { level: 'Strong', color: '#f97316' };
  return { level: 'Very Strong', color: '#ef4444' };
};

export const WindWidget = ({ speed, direction = 0 }: WindWidgetProps) => {
  const { t } = useTranslation();
  const windScale = getWindScale(speed);
  const directionText = getWindDirection(direction);

  return (
    <WeatherWidget
      icon="💨"
      title={t.weather.wind || 'Wind'}
      value={`${speed.toFixed(1)} m/s`}
      subtitle={windScale.level}
    >
      <WindContainer>
        <WindCompass>
          <CompassDirection $position="N" $angle={0}>N</CompassDirection>
          <CompassDirection $position="E" $angle={90}>E</CompassDirection>
          <CompassDirection $position="S" $angle={180}>S</CompassDirection>
          <CompassDirection $position="W" $angle={270}>W</CompassDirection>
          <WindArrow $rotation={direction} />
        </WindCompass>
        <DirectionText>{directionText}</DirectionText>
      </WindContainer>
    </WeatherWidget>
  );
};
