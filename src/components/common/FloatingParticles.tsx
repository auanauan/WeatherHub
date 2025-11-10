import styled, { keyframes } from 'styled-components';
import { useMemo } from 'react';

interface FloatingParticlesProps {
  count?: number;
  theme?: 'light' | 'dark' | 'auto';
}

const float = (startX: number, startY: number, endX: number, endY: number) => keyframes`
  0% {
    transform: translate(${startX}px, ${startY}px) scale(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translate(${endX}px, ${endY}px) scale(1) rotate(360deg);
    opacity: 0;
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

interface ParticleProps {
  $size: number;
  $startX: number;
  $startY: number;
  $endX: number;
  $endY: number;
  $duration: number;
  $delay: number;
  $color: string;
}

const Particle = styled.div<ParticleProps>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ $color }) => $color};
  border-radius: 50%;
  box-shadow: 0 0 ${({ $size }) => $size * 2}px ${({ $color }) => $color};
  animation: ${({ $startX, $startY, $endX, $endY }) => float($startX, $startY, $endX, $endY)}
    ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  opacity: 0;
  filter: blur(1px);
`;

const generateParticles = (count: number, isDark: boolean) => {
  const particles = [];

  const colors = isDark
    ? [
        'rgba(139, 92, 246, 0.5)', // Vibrant purple
        'rgba(167, 139, 250, 0.4)', // Light purple
        'rgba(192, 132, 252, 0.45)', // Lighter purple
        'rgba(124, 58, 237, 0.5)', // Deep purple
        'rgba(168, 85, 247, 0.4)', // Medium purple
      ]
    : [
        'rgba(124, 58, 237, 0.4)', // Violet
        'rgba(139, 92, 246, 0.35)', // Purple
        'rgba(168, 85, 247, 0.4)', // Medium purple
        'rgba(109, 40, 217, 0.45)', // Deep violet
        'rgba(147, 51, 234, 0.35)', // Purple variant
      ];

  for (let i = 0; i < count; i++) {
    const size = Math.random() * 6 + 2; // 2-8px
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const endX = startX + (Math.random() - 0.5) * 400; // Random horizontal movement
    const endY = startY - Math.random() * 600 - 200; // Move upward
    const duration = Math.random() * 10 + 15; // 15-25s
    const delay = Math.random() * 5; // 0-5s
    const color = colors[Math.floor(Math.random() * colors.length)];

    particles.push({
      id: i,
      size,
      startX,
      startY,
      endX,
      endY,
      duration,
      delay,
      color,
    });
  }

  return particles;
};

export const FloatingParticles = ({ count = 20, theme = 'auto' }: FloatingParticlesProps) => {
  const isDark = useMemo(() => {
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme === 'dark';
  }, [theme]);

  const particles = useMemo(() => generateParticles(count, isDark), [count, isDark]);

  return (
    <ParticlesContainer>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          $size={particle.size}
          $startX={particle.startX}
          $startY={particle.startY}
          $endX={particle.endX}
          $endY={particle.endY}
          $duration={particle.duration}
          $delay={particle.delay}
          $color={particle.color}
        />
      ))}
    </ParticlesContainer>
  );
};
