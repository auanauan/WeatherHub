import styled from 'styled-components';
import type { WeatherTrend } from '@/utils/weatherInsights';

const TrendContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
`;

interface TrendIconProps {
  $direction: 'rising' | 'falling' | 'stable';
}

const TrendIcon = styled.span<TrendIconProps>`
  font-size: 1.2rem;
  color: ${({ theme, $direction }) => {
    switch ($direction) {
      case 'rising':
        return theme.colors.error;
      case 'falling':
        return theme.colors.info;
      default:
        return theme.colors.textSecondary;
    }
  }};
`;

const TrendText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

interface TrendIndicatorProps {
  trend: WeatherTrend;
  showDescription?: boolean;
}

export const TrendIndicator = ({ trend, showDescription = false }: TrendIndicatorProps) => {
  const getIcon = () => {
    switch (trend.direction) {
      case 'rising':
        return '📈';
      case 'falling':
        return '📉';
      default:
        return '➡️';
    }
  };

  return (
    <TrendContainer>
      <TrendIcon $direction={trend.direction}>{getIcon()}</TrendIcon>
      <TrendText>
        {showDescription ? trend.description : `${trend.direction === 'rising' ? '+' : trend.direction === 'falling' ? '' : '±'}${Math.abs(Math.round(trend.change * 10) / 10)}°C`}
      </TrendText>
    </TrendContainer>
  );
};
