import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: ${({ size = 'md', theme }) => {
    if (size === 'sm') return `${theme.spacing.sm} ${theme.spacing.md}`;
    if (size === 'lg') return `${theme.spacing.md} ${theme.spacing.xl}`;
    return `${theme.spacing.sm} ${theme.spacing.lg}`;
  }};
  font-size: ${({ size = 'md' }) => {
    if (size === 'sm') return '0.875rem';
    if (size === 'lg') return '1.125rem';
    return '1rem';
  }};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid transparent;
  background-color: ${({ variant = 'primary', theme }) => {
    if (variant === 'outline') return 'transparent';
    if (variant === 'secondary') return theme.colors.secondary;
    return theme.colors.primary;
  }};
  color: ${({ variant = 'primary', theme }) => {
    if (variant === 'outline') return theme.colors.primary;
    return '#ffffff';
  }};
  border-color: ${({ variant = 'primary', theme }) => {
    if (variant === 'outline') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.secondary;
    return theme.colors.primary;
  }};
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${({ variant = 'primary', theme }) => {
      if (variant === 'outline') return theme.colors.primary;
      if (variant === 'secondary') return theme.colors.secondary;
      return theme.colors.primaryHover;
    }};
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
