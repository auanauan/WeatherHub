import styled, { keyframes } from 'styled-components';
import { useMemo } from 'react';

interface Weather3DIconProps {
  weatherCode: number;
  size?: number;
}

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotateX(0deg);
  }
  50% {
    transform: translateY(-10px) rotateX(5deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const IconContainer = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: ${float} 3s ease-in-out infinite;
`;

// Cloud Component
const Cloud = styled.div<{ $size: number; $position?: string }>`
  width: ${({ $size }) => $size * 0.7}px;
  height: ${({ $size }) => $size * 0.4}px;
  background: linear-gradient(180deg, #ffffff 0%, #e0e7ff 100%);
  border-radius: 50%;
  position: ${({ $position }) => $position || 'relative'};
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.15),
    inset 0 -4px 8px rgba(0, 0, 0, 0.1),
    inset 0 4px 8px rgba(255, 255, 255, 0.5);

  &::before {
    content: '';
    position: absolute;
    width: ${({ $size }) => $size * 0.4}px;
    height: ${({ $size }) => $size * 0.4}px;
    background: linear-gradient(180deg, #ffffff 0%, #e0e7ff 100%);
    border-radius: 50%;
    top: -${({ $size }) => $size * 0.15}px;
    left: ${({ $size }) => $size * 0.15}px;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.1),
      inset 0 -2px 4px rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    width: ${({ $size }) => $size * 0.5}px;
    height: ${({ $size }) => $size * 0.5}px;
    background: linear-gradient(180deg, #ffffff 0%, #e0e7ff 100%);
    border-radius: 50%;
    top: -${({ $size }) => $size * 0.2}px;
    right: ${({ $size }) => $size * 0.1}px;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.1),
      inset 0 -2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Sun Component
const Sun = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size * 0.5}px;
  height: ${({ $size }) => $size * 0.5}px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffa500 100%);
  border-radius: 50%;
  position: absolute;
  top: 10%;
  right: 10%;
  box-shadow:
    0 0 20px rgba(255, 215, 0, 0.6),
    0 0 40px rgba(255, 215, 0, 0.4),
    inset 0 -4px 8px rgba(255, 165, 0, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%);
  }
`;

// Rain Drop
const RainDrop = styled.div<{ $size: number; $delay: number; $left: number }>`
  width: ${({ $size }) => $size * 0.06}px;
  height: ${({ $size }) => $size * 0.15}px;
  background: linear-gradient(180deg, #64b5f6 0%, #1e88e5 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: absolute;
  top: 60%;
  left: ${({ $left }) => $left}%;
  opacity: 0.7;
  animation: fall 1s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  box-shadow: 0 2px 4px rgba(30, 136, 229, 0.3);

  @keyframes fall {
    0% {
      transform: translateY(0);
      opacity: 0.7;
    }
    100% {
      transform: translateY(${({ $size }) => $size * 0.4}px);
      opacity: 0;
    }
  }
`;

// Moon Component
const Moon = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size * 0.5}px;
  height: ${({ $size }) => $size * 0.5}px;
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  border-radius: 50%;
  position: absolute;
  top: 10%;
  right: 10%;
  box-shadow:
    0 0 20px rgba(167, 139, 250, 0.4),
    inset -4px -4px 8px rgba(139, 92, 246, 0.2);

  &::before {
    content: '';
    position: absolute;
    width: ${({ $size }) => $size * 0.15}px;
    height: ${({ $size }) => $size * 0.15}px;
    background: rgba(139, 92, 246, 0.15);
    border-radius: 50%;
    top: 20%;
    left: 25%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Snowflake Component
const Snowflake = styled.div<{ $size: number; $delay: number; $left: number }>`
  width: ${({ $size }) => $size * 0.08}px;
  height: ${({ $size }) => $size * 0.08}px;
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
  border-radius: 50%;
  position: absolute;
  top: 60%;
  left: ${({ $left }) => $left}%;
  opacity: 0.9;
  animation: snowfall 2s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  box-shadow:
    0 0 4px rgba(255, 255, 255, 0.8),
    0 2px 4px rgba(0, 0, 0, 0.1);

  @keyframes snowfall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.9;
    }
    100% {
      transform: translateY(${({ $size }) => $size * 0.5}px) rotate(360deg);
      opacity: 0;
    }
  }
`;

// Fog Component
const FogLayer = styled.div<{ $size: number; $delay: number }>`
  width: ${({ $size }) => $size * 0.8}px;
  height: ${({ $size }) => $size * 0.15}px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(203, 213, 225, 0.6) 50%,
    transparent 100%
  );
  border-radius: 50%;
  position: absolute;
  animation: fogMove 4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  opacity: 0.7;

  @keyframes fogMove {
    0%, 100% {
      transform: translateX(-10%);
    }
    50% {
      transform: translateX(10%);
    }
  }
`;

export const Weather3DIcon = ({ weatherCode, size = 120 }: Weather3DIconProps) => {
  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour >= 18;

  const renderIcon = useMemo(() => {
    // Clear sky
    if (weatherCode === 0 || weatherCode === 1) {
      return (
        <IconContainer $size={size}>
          {isNight ? <Moon $size={size} /> : <Sun $size={size} />}
        </IconContainer>
      );
    }

    // Partly cloudy
    if (weatherCode === 2) {
      return (
        <IconContainer $size={size}>
          {isNight ? <Moon $size={size} /> : <Sun $size={size} />}
          <Cloud $size={size} />
        </IconContainer>
      );
    }

    // Overcast
    if (weatherCode === 3) {
      return (
        <IconContainer $size={size}>
          <Cloud $size={size} />
        </IconContainer>
      );
    }

    // Fog
    if (weatherCode === 45 || weatherCode === 48) {
      return (
        <IconContainer $size={size}>
          <Cloud $size={size} />
          <FogLayer $size={size} $delay={0} />
          <FogLayer $size={size} $delay={1} style={{ top: '40%' }} />
          <FogLayer $size={size} $delay={2} style={{ top: '60%' }} />
        </IconContainer>
      );
    }

    // Rain
    if ((weatherCode >= 51 && weatherCode <= 65) || (weatherCode >= 80 && weatherCode <= 82) || (weatherCode >= 95 && weatherCode <= 99)) {
      return (
        <IconContainer $size={size}>
          <Cloud $size={size} />
          <RainDrop $size={size} $delay={0} $left={30} />
          <RainDrop $size={size} $delay={0.2} $left={50} />
          <RainDrop $size={size} $delay={0.4} $left={70} />
        </IconContainer>
      );
    }

    // Snow
    if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) {
      return (
        <IconContainer $size={size}>
          <Cloud $size={size} />
          <Snowflake $size={size} $delay={0} $left={30} />
          <Snowflake $size={size} $delay={0.4} $left={50} />
          <Snowflake $size={size} $delay={0.8} $left={70} />
        </IconContainer>
      );
    }

    // Default: Cloud
    return (
      <IconContainer $size={size}>
        <Cloud $size={size} />
      </IconContainer>
    );
  }, [weatherCode, size, isNight]);

  return renderIcon;
};
