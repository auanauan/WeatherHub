import styled from 'styled-components';
import { ForecastCardSkeleton } from './ForecastCardSkeleton';
import { Skeleton } from '@/components/common/Skeleton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ForecastGridSkeleton = () => {
  return (
    <Container>
      <Skeleton width="180px" height="28px" />
      <Grid>
        {Array.from({ length: 7 }).map((_, index) => (
          <ForecastCardSkeleton key={index} />
        ))}
      </Grid>
    </Container>
  );
};
