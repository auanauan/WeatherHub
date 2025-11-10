import styled from 'styled-components';
import { WeatherWidget } from './WeatherWidget';
import { useTranslation } from '@/hooks/useTranslation';

interface PressureWidgetProps {
  pressure: number;
}

const PressureContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PressureGauge = styled.div`
  position: relative;
  width: 120px;
  height: 60px;
  margin: 0 auto;
  overflow: hidden;
`;

const GaugeBackground = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  border: ${({ theme }) => theme.glass.border};
  position: absolute;
  bottom: 0;
  box-shadow: ${({ theme }) => theme.glass.shadow};
`;

const GaugeArc = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 120px;
  height: 60px;
`;

const GaugeNeedle = styled.div<{ $rotation: number }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 3px;
  height: 50px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(${({ $rotation }) => $rotation}deg);
  border-radius: 2px;
  transition: transform 0.5s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const PressureLabel = styled.div<{ $left: number }>`
  position: absolute;
  bottom: 5px;
  left: ${({ $left }) => $left}%;
  font-size: 0.65rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  transform: translateX(-50%);
`;

const StatusText = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const getPressureStatus = (pressure: number): { status: string; color: string } => {
  if (pressure < 980) return { status: 'Very Low', color: '#ef4444' };
  if (pressure < 1000) return { status: 'Low', color: '#f59e0b' };
  if (pressure < 1020) return { status: 'Normal', color: '#10b981' };
  if (pressure < 1040) return { status: 'High', color: '#3b82f6' };
  return { status: 'Very High', color: '#8b5cf6' };
};

// Convert pressure (960-1040 hPa) to rotation angle (-90 to 90 degrees)
const getPressureRotation = (pressure: number): number => {
  const minPressure = 960;
  const maxPressure = 1040;
  const clampedPressure = Math.max(minPressure, Math.min(maxPressure, pressure));
  const percentage = (clampedPressure - minPressure) / (maxPressure - minPressure);
  return -90 + (percentage * 180);
};

export const PressureWidget = ({ pressure }: PressureWidgetProps) => {
  const { t } = useTranslation();
  const pressureStatus = getPressureStatus(pressure);
  const rotation = getPressureRotation(pressure);

  return (
    <WeatherWidget
      icon="📊"
      title={t.weather.pressure || 'Pressure'}
      value={`${pressure.toFixed(0)} hPa`}
      subtitle={pressureStatus.status}
    >
      <PressureContainer>
        <PressureGauge>
          <GaugeBackground />
          <GaugeArc viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 10 60 A 50 50 0 0 1 110 60"
              fill="none"
              stroke="url(#pressureGradient)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="pressureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="25%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="75%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </GaugeArc>
          <GaugeNeedle $rotation={rotation} />
          <PressureLabel $left={10}>960</PressureLabel>
          <PressureLabel $left={50}>1000</PressureLabel>
          <PressureLabel $left={90}>1040</PressureLabel>
        </PressureGauge>
        <StatusText>{pressureStatus.status}</StatusText>
      </PressureContainer>
    </WeatherWidget>
  );
};
