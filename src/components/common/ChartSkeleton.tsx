import styled from 'styled-components';
import { Skeleton } from './Skeleton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ChartArea = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 250px;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkeletonBar = styled(Skeleton)<{ barHeight: string }>`
  flex: 1;
  height: ${({ barHeight }) => barHeight};
  max-width: 40px;
`;

export const ChartSkeleton = () => {
  const barHeights = ['60%', '80%', '45%', '90%', '70%', '55%', '75%'];

  return (
    <Container>
      <ChartArea>
        <Skeleton width="200px" height="24px" />
        <BarsContainer>
          {barHeights.map((height, index) => (
            <SkeletonBar key={index} barHeight={height} />
          ))}
        </BarsContainer>
        <Skeleton width="100%" height="20px" />
      </ChartArea>
    </Container>
  );
};
