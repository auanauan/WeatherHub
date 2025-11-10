import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './Header';
import { FloatingParticles } from '@/components/common/FloatingParticles';
import { ScrollToTop } from '@/components/common/ScrollToTop';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const Layout = () => {
  return (
    <LayoutContainer>
      <FloatingParticles count={30} />
      <Header />
      <Main>
        <Outlet />
      </Main>
      <ScrollToTop />
    </LayoutContainer>
  );
};
