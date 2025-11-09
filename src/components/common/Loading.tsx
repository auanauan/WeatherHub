import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Loading = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

const FullPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
`;

interface LoadingFullPageProps {
  message?: string;
}

export const LoadingFullPage = ({ message = 'Loading...' }: LoadingFullPageProps) => {
  return (
    <FullPageContainer>
      <Spinner style={{ width: '60px', height: '60px' }} />
      <LoadingText>{message}</LoadingText>
    </FullPageContainer>
  );
};
