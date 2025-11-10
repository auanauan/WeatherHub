import styled from 'styled-components';
import { TooltipProps } from 'recharts';

const TooltipContainer = styled.div`
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  border: ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  min-width: 200px;
  animation: fadeInScale 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const TooltipLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.3px;
`;

const TooltipItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing.xs} 0;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ItemLabel = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ItemValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ColorDot = styled.span<{ color: string }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.8),
    0 0 6px ${({ color }) => color}60;
`;

interface CustomTooltipProps extends TooltipProps<number, string> {
  labelFormatter?: (label: string) => string;
}

const getIconForMetric = (name: string): string => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('temp')) return '🌡️';
  if (nameLower.includes('humidity')) return '💧';
  if (nameLower.includes('wind')) return '💨';
  if (nameLower.includes('rain') || nameLower.includes('precipitation')) return '🌧️';
  return '📊';
};

export const CustomChartTooltip = ({
  active,
  payload,
  label,
  labelFormatter,
}: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <TooltipContainer>
      <TooltipLabel>
        {labelFormatter ? labelFormatter(label) : label}
      </TooltipLabel>
      {payload.map((entry, index) => (
        <TooltipItem key={index}>
          <ItemLabel>
            <ColorDot color={entry.color || '#999'} />
            <span>{getIconForMetric(entry.name || '')}</span>
            <span>{entry.name}</span>
          </ItemLabel>
          <ItemValue>
            {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
          </ItemValue>
        </TooltipItem>
      ))}
    </TooltipContainer>
  );
};
