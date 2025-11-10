import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface WeatherWidgetProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  children?: ReactNode;
}

const WidgetContainer = styled(motion.div)`
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'rgba(30, 41, 59, 0.6)'
      : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) =>
    theme.name === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.05)'};
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.shadow};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const Title = styled.h4`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1;
`;

const Subtitle = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Content = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const WeatherWidget = ({ icon, title, value, subtitle, children }: WeatherWidgetProps) => {
  return (
    <WidgetContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -4,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.2 }
      }}
    >
      <Header>
        <IconWrapper>{icon}</IconWrapper>
        <Title>{title}</Title>
      </Header>
      <Value>{value}</Value>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children && <Content>{children}</Content>}
    </WidgetContainer>
  );
};
