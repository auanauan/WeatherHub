import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  margin?: string;
}

export const Skeleton = styled.div<SkeletonProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '20px'};
  margin: ${({ margin }) => margin || '0'};
  border-radius: ${({ borderRadius, theme }) => borderRadius || theme.borderRadius.md};
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'linear-gradient(to right, #2a2d3a 0%, #35384a 20%, #2a2d3a 40%, #2a2d3a 100%)'
      : 'linear-gradient(to right, #f0f0f0 0%, #e0e0e0 20%, #f0f0f0 40%, #f0f0f0 100%)'
  };
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const SkeletonCircle = styled(Skeleton)`
  border-radius: 50%;
`;

export const SkeletonText = styled(Skeleton)`
  height: ${({ height }) => height || '16px'};
  margin-bottom: 8px;
`;

export const SkeletonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;
