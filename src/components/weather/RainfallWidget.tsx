import styled, { keyframes } from 'styled-components';
import { WeatherWidget } from './WeatherWidget';
import { useTranslation } from '@/hooks/useTranslation';

interface RainfallWidgetProps {
  amount: number;
  label?: string;
}

const drop = keyframes`
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(60px);
    opacity: 0;
  }
`;

const RainfallContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const RainfallVisual = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  border: ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const RainfallBar = styled.div<{ $percentage: number }>`
  width: 100%;
  height: ${({ $percentage }) => Math.min($percentage, 100)}%;
  background: linear-gradient(180deg, #3b82f6 0%, #1e40af 100%);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  position: relative;
  transition: height 0.5s ease;
  box-shadow:
    0 -2px 8px rgba(59, 130, 246, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(147, 197, 253, 0.8);
    border-radius: ${({ theme }) => theme.borderRadius.sm} ${({ theme }) => theme.borderRadius.sm} 0 0;
  }
`;

const RainDrop = styled.div<{ $delay: number; $left: number }>`
  position: absolute;
  top: -10px;
  left: ${({ $left }) => $left}%;
  width: 3px;
  height: 12px;
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  opacity: 0;
  animation: ${drop} 1.5s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const AmountLabel = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const getRainfallLevel = (amount: number): { level: string; color: string } => {
  if (amount === 0) return { level: 'No Rain', color: '#10b981' };
  if (amount < 2.5) return { level: 'Light', color: '#3b82f6' };
  if (amount < 10) return { level: 'Moderate', color: '#f59e0b' };
  if (amount < 50) return { level: 'Heavy', color: '#f97316' };
  return { level: 'Very Heavy', color: '#ef4444' };
};

export const RainfallWidget = ({ amount, label = 'In last hour' }: RainfallWidgetProps) => {
  const { t } = useTranslation();
  const rainfallLevel = getRainfallLevel(amount);
  // Calculate percentage (max 50mm = 100%)
  const percentage = (amount / 50) * 100;

  return (
    <WeatherWidget
      icon="🌧️"
      title={t.weather.precipitation || 'Rainfall'}
      value={`${amount.toFixed(1)} mm`}
      subtitle={rainfallLevel.level}
    >
      <RainfallContainer>
        <RainfallVisual>
          {amount > 0 && (
            <>
              <RainDrop $delay={0} $left={20} />
              <RainDrop $delay={0.3} $left={40} />
              <RainDrop $delay={0.6} $left={60} />
              <RainDrop $delay={0.9} $left={80} />
            </>
          )}
          <RainfallBar $percentage={percentage} />
        </RainfallVisual>
        <AmountLabel>{label}</AmountLabel>
      </RainfallContainer>
    </WeatherWidget>
  );
};
