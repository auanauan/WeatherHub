import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.backdropBlur};
  border: ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(124, 58, 237, 0.4);

    svg {
      color: #ffffff;
      animation: ${bounce} 0.6s ease infinite;
    }
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 1rem;
    right: 1rem;
    width: 48px;
    height: 48px;
  }
`;

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
`;

const ProgressRing = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const ProgressCircle = styled.circle<{ $progress: number }>`
  fill: none;
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 3;
  stroke-dasharray: ${2 * Math.PI * 26};
  stroke-dashoffset: ${({ $progress }) => 2 * Math.PI * 26 * (1 - $progress)};
  transition: stroke-dashoffset 0.1s ease;
  opacity: 0.6;
`;

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show button after scrolling down 300px
      setIsVisible(scrolled > 300);

      // Calculate scroll progress (0 to 1)
      const totalScrollable = documentHeight - windowHeight;
      const progress = scrolled / totalScrollable;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Check on mount

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ScrollButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          aria-label="Scroll to top"
        >
          <ProgressRing>
            <ProgressCircle
              cx="28"
              cy="28"
              r="26"
              $progress={scrollProgress}
            />
          </ProgressRing>
          <ArrowIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </ArrowIcon>
        </ScrollButton>
      )}
    </AnimatePresence>
  );
};
