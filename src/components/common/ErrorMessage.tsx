import styled from 'styled-components';
import { Button } from './Button';

const ErrorContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ErrorTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorMessageProps) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorText>{message}</ErrorText>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </ErrorContainer>
  );
};

const EmptyContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 1.125rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

interface EmptyStateProps {
  icon?: string;
  message: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ icon = '📭', message, action }: EmptyStateProps) => {
  return (
    <EmptyContainer>
      <EmptyIcon>{icon}</EmptyIcon>
      <EmptyText>{message}</EmptyText>
      {action}
    </EmptyContainer>
  );
};
