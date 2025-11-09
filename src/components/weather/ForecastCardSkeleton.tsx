import styled from 'styled-components';
import { Skeleton, SkeletonCircle } from '@/components/common/Skeleton';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 140px;
`;

export const ForecastCardSkeleton = () => {
  return (
    <Card>
      <Skeleton width="80px" height="14px" />
      <Skeleton width="60px" height="12px" />

      <SkeletonCircle width="64px" height="64px" margin="8px 0" />

      <Skeleton width="100px" height="12px" />

      <Skeleton width="90px" height="32px" margin="4px 0" />

      <Skeleton width="100%" height="1px" margin="4px 0" />

      <Skeleton width="100%" height="16px" />
      <Skeleton width="100%" height="16px" />
    </Card>
  );
};
