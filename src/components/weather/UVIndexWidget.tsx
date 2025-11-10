import styled from 'styled-components';
import { WeatherWidget } from './WeatherWidget';
import { useTranslation } from '@/hooks/useTranslation';
import type { TranslationKeys } from '@/locales/en';

interface UVIndexWidgetProps {
  uvIndex: number;
}

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

interface ProgressFillProps {
  $percentage: number;
  $color: string;
}

const ProgressFill = styled.div<ProgressFillProps>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  background: ${({ $color }) => $color};
  border-radius: 10px;
  transition: width 0.5s ease, background 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const LevelText = styled.div<{ $color: string }>`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ $color }) => $color};
`;

const getUVLevel = (uv: number, t: TranslationKeys): { level: string, color: string, percentage: number } => {
  if (uv <= 2) {
    return { level: t.uvLevels.low, color: '#10b981', percentage: (uv / 11) * 100 };
  } else if (uv <= 5) {
    return { level: t.uvLevels.moderate, color: '#f59e0b', percentage: (uv / 11) * 100 };
  } else if (uv <= 7) {
    return { level: t.uvLevels.high, color: '#f97316', percentage: (uv / 11) * 100 };
  } else if (uv <= 10) {
    return { level: t.uvLevels.veryHigh, color: '#ef4444', percentage: (uv / 11) * 100 };
  } else {
    return { level: t.uvLevels.extreme, color: '#dc2626', percentage: 100 };
  }
};

export const UVIndexWidget = ({ uvIndex }: UVIndexWidgetProps) => {
  const { t } = useTranslation();
  const { level, color, percentage } = getUVLevel(uvIndex, t);

  return (
    <WeatherWidget
      icon="🔆"
      title={t.weather.uvIndex}
      value={uvIndex}
      subtitle={level}
    >
      <ProgressBar>
        <ProgressFill $percentage={percentage} $color={color} />
      </ProgressBar>
      <LevelText $color={color}>{level}</LevelText>
    </WeatherWidget>
  );
};
