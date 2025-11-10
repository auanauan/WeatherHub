import styled, { keyframes } from 'styled-components';
import { WeatherWidget } from './WeatherWidget';
import { useTranslation } from '@/hooks/useTranslation';

interface VisibilityWidgetProps {
  visibility: number; // in meters
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const VisibilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const VisibilityVisual = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  border: ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FogLayer = styled.div<{ $opacity: number; $delay: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(203, 213, 225, ${({ $opacity }) => $opacity}) 50%,
    transparent 100%
  );
  animation: fogMove 4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  @keyframes fogMove {
    0%, 100% {
      transform: translateX(-20%);
    }
    50% {
      transform: translateX(20%);
    }
  }
`;

const EyeIcon = styled.div<{ $visible: boolean }>`
  font-size: 2.5rem;
  position: relative;
  z-index: 1;
  filter: ${({ $visible }) => $visible ? 'none' : 'blur(4px)'};
  opacity: ${({ $visible }) => $visible ? 1 : 0.3};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
`;

const DistanceBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const DistanceBarFill = styled.div<{ $percentage: number; $color: string }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  background: linear-gradient(90deg, ${({ $color }) => $color}80 0%, ${({ $color }) => $color} 100%);
  border-radius: 10px;
  transition: width 0.5s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${({ $color }) => $color});
    border-radius: 0 10px 10px 0;
  }
`;

const StatusText = styled.div<{ $color: string }>`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ $color }) => $color};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const getVisibilityStatus = (visibility: number): { status: string; color: string; fogOpacity: number } => {
  const km = visibility / 1000;

  if (km < 0.2) return { status: 'Very Poor', color: '#ef4444', fogOpacity: 0.8 };
  if (km < 1) return { status: 'Poor', color: '#f97316', fogOpacity: 0.6 };
  if (km < 4) return { status: 'Moderate', color: '#f59e0b', fogOpacity: 0.4 };
  if (km < 10) return { status: 'Good', color: '#3b82f6', fogOpacity: 0.2 };
  return { status: 'Excellent', color: '#10b981', fogOpacity: 0 };
};

const formatVisibility = (meters: number): string => {
  const km = meters / 1000;
  if (km < 1) return `${meters.toFixed(0)} m`;
  return `${km.toFixed(1)} km`;
};

export const VisibilityWidget = ({ visibility }: VisibilityWidgetProps) => {
  const { t } = useTranslation();
  const visibilityStatus = getVisibilityStatus(visibility);

  // Calculate percentage (max 20km = 100%)
  const percentage = Math.min((visibility / 20000) * 100, 100);
  const isVisible = visibility > 1000;

  return (
    <WeatherWidget
      icon="👁️"
      title={t.weather.visibility || 'Visibility'}
      value={formatVisibility(visibility)}
      subtitle={visibilityStatus.status}
    >
      <VisibilityContainer>
        <VisibilityVisual>
          {visibilityStatus.fogOpacity > 0 && (
            <>
              <FogLayer $opacity={visibilityStatus.fogOpacity} $delay={0} />
              <FogLayer $opacity={visibilityStatus.fogOpacity * 0.7} $delay={1} />
              <FogLayer $opacity={visibilityStatus.fogOpacity * 0.5} $delay={2} />
            </>
          )}
          <EyeIcon $visible={isVisible}>👁️</EyeIcon>
        </VisibilityVisual>
        <DistanceBar>
          <DistanceBarFill $percentage={percentage} $color={visibilityStatus.color} />
        </DistanceBar>
        <StatusText $color={visibilityStatus.color}>
          {visibilityStatus.status}
        </StatusText>
      </VisibilityContainer>
    </WeatherWidget>
  );
};
