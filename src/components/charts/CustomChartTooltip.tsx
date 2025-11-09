import styled from 'styled-components';
import { TooltipProps } from 'recharts';

const TooltipContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  min-width: 180px;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const TooltipLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  box-shadow: 0 0 4px ${({ color }) => color};
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
