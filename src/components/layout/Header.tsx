import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '@/contexts/ThemeContext';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  text-decoration: none;
  transition: all 0.2s ease;
  background-color: ${({ theme, $active }) =>
    $active ? `${theme.colors.primary}15` : 'transparent'};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}10`};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          🌤️ WeatherHub
        </Logo>

        <NavLinks>
          <NavLink to="/" $active={location.pathname === '/'}>
            Dashboard
          </NavLink>
          <NavLink to="/locations" $active={location.pathname === '/locations'}>
            Locations
          </NavLink>
          <NavLink to="/compare" $active={location.pathname === '/compare'}>
            Compare
          </NavLink>
        </NavLinks>

        <Actions>
          <ThemeToggle onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggle>
        </Actions>
      </Nav>
    </HeaderContainer>
  );
};
