import styled from 'styled-components';
import { Card, CardHeader } from '@/components/common/Card';
import { Skeleton, SkeletonCircle, SkeletonText } from '@/components/common/Skeleton';

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const MainWeather = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const WeatherStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const WeatherCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton width="150px" height="28px" />
      </CardHeader>

      <MainWeather>
        <SkeletonCircle width="120px" height="120px" />
        <Skeleton width="120px" height="56px" />
        <Skeleton width="180px" height="24px" />
        <Skeleton width="200px" height="16px" />
      </MainWeather>

      <WeatherGrid>
        <WeatherStat>
          <Skeleton width="40px" height="40px" margin="0 0 8px 0" borderRadius="8px" />
          <Skeleton width="60px" height="28px" margin="0 0 4px 0" />
          <Skeleton width="80px" height="16px" />
        </WeatherStat>

        <WeatherStat>
          <Skeleton width="40px" height="40px" margin="0 0 8px 0" borderRadius="8px" />
          <Skeleton width="60px" height="28px" margin="0 0 4px 0" />
          <Skeleton width="80px" height="16px" />
        </WeatherStat>

        <WeatherStat>
          <Skeleton width="40px" height="40px" margin="0 0 8px 0" borderRadius="8px" />
          <Skeleton width="60px" height="28px" margin="0 0 4px 0" />
          <Skeleton width="80px" height="16px" />
        </WeatherStat>
      </WeatherGrid>
    </Card>
  );
};
