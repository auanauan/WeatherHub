import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const sway = keyframes`
  0%, 100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
`;

const twinkle = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.8);
  }
`;

const IllustrationContainer = styled.div`
  width: 100%;
  max-width: 300px;
  height: 300px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0 auto;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

// House Container
const HouseWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 240px;
  animation: ${float} 6s ease-in-out infinite;
  transform-style: preserve-3d;
`;

// House Base
const HouseBase = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 140px;
  background: linear-gradient(135deg, #c026d3 0%, #9333ea 100%);
  border-radius: 8px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 -4px 8px rgba(0, 0, 0, 0.2),
    inset 0 4px 8px rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(135deg, #7c3aed 0%, #6b21a8 100%);
    border-radius: 8px;
  }
`;

// Roof
const Roof = styled.div`
  position: absolute;
  bottom: 140px;
  width: 100%;
  height: 80px;
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  box-shadow:
    0 -4px 8px rgba(0, 0, 0, 0.15),
    inset 0 -4px 8px rgba(139, 92, 246, 0.2);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 40px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

// Window
const Window = styled.div<{ $top: string; $left: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: 35px;
  height: 45px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 6px;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(139, 92, 246, 0.5);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    background: rgba(139, 92, 246, 0.5);
  }
`;

// Door
const Door = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 60px;
  background: linear-gradient(135deg, #7c3aed 0%, #6b21a8 100%);
  border-radius: 8px 8px 0 0;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 8px;
    width: 4px;
    height: 4px;
    background: #fbbf24;
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(251, 191, 36, 0.8);
  }
`;

// Chimney
const Chimney = styled.div`
  position: absolute;
  top: 80px;
  right: 30px;
  width: 20px;
  height: 50px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border-radius: 4px 4px 0 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -4px;
    width: 28px;
    height: 12px;
    background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

// Smoke
const Smoke = styled.div<{ $delay: number }>`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: rgba(203, 213, 225, 0.6);
  border-radius: 50%;
  animation: smoke 3s ease-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  @keyframes smoke {
    0% {
      transform: translateX(-50%) translateY(0) scale(0.8);
      opacity: 0.8;
    }
    100% {
      transform: translateX(-50%) translateY(-60px) scale(1.5);
      opacity: 0;
    }
  }
`;

// Tree
const Tree = styled.div<{ $left: string; $delay: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ $left }) => $left};
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 60px solid #4b5563;
  animation: ${sway} 4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  &::before {
    content: '';
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 20px;
    background: #374151;
    border-radius: 4px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 50px solid #374151;
  }
`;

// Stars
const Star = styled.div<{ $top: string; $left: string; $delay: number }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: 4px;
  height: 4px;
  background: #fbbf24;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.8);
  animation: ${twinkle} 2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 1px;
    background: rgba(251, 191, 36, 0.6);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;

// Snow on roof
const Snow = styled.div`
  position: absolute;
  bottom: 138px;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #e0f2fe 100%);
  border-radius: 50% 50% 0 0;
  box-shadow:
    0 -2px 4px rgba(255, 255, 255, 0.8),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

// Pulse animation for window glow
const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

// Light glow from windows
const WindowGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: ${pulseGlow} 2s ease-in-out infinite;
`;

export const HeroIllustration = () => {
  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour >= 18;

  return (
    <IllustrationContainer>
      {isNight && (
        <>
          <Star $top="10%" $left="20%" $delay={0} />
          <Star $top="15%" $left="80%" $delay={0.5} />
          <Star $top="25%" $left="15%" $delay={1} />
          <Star $top="20%" $left="85%" $delay={1.5} />
        </>
      )}

      <Tree $left="-20px" $delay={0} />
      <Tree $left="auto" $delay={0.5} style={{ right: '-20px' }} />

      <HouseWrapper>
        <Chimney>
          <Smoke $delay={0} />
          <Smoke $delay={1} />
          <Smoke $delay={2} />
        </Chimney>
        <Roof />
        <Snow />
        <HouseBase>
          <Window $top="30px" $left="25px">
            <WindowGlow />
          </Window>
          <Window $top="30px" $left="140px">
            <WindowGlow />
          </Window>
          <Window $top="110px" $left="25px">
            <WindowGlow />
          </Window>
          <Window $top="110px" $left="140px">
            <WindowGlow />
          </Window>
          <Door />
        </HouseBase>
      </HouseWrapper>
    </IllustrationContainer>
  );
};
