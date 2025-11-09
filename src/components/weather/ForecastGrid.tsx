import styled from 'styled-components';
import { ForecastCard } from './ForecastCard';
import type { DailyForecast } from '@/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface ForecastGridProps {
  forecasts: DailyForecast[];
  title?: string;
}

export const ForecastGrid = ({ forecasts, title = '7-Day Forecast' }: ForecastGridProps) => {
  if (!forecasts || forecasts.length === 0) {
    return null;
  }

  return (
    <Container>
      <Title>{title}</Title>
      <Grid>
        {forecasts.map((forecast) => (
          <ForecastCard key={forecast.date} forecast={forecast} />
        ))}
      </Grid>
    </Container>
  );
};
