import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { WeatherData } from '@/types';
import { getWeatherIcon } from '@/utils/weatherCodes';

interface HourlyPillsProps {
  data: WeatherData[];
  title?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.name === 'dark'
        ? 'rgba(167, 139, 250, 0.1)'
        : 'rgba(139, 92, 246, 0.1)'};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`;

const PillsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  min-width: min-content;
`;

const Pill = styled(motion.div)<{ $isNow?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 70px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  border-radius: 50px;
  background: ${({ theme, $isNow }) =>
    $isNow
      ? theme.name === 'dark'
        ? 'linear-gradient(180deg, #7c3aed 0%, #6d28d9 100%)'
        : 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)'
      : theme.name === 'dark'
        ? 'rgba(167, 139, 250, 0.1)'
        : 'rgba(255, 255, 255, 0.6)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme, $isNow }) =>
    $isNow
      ? 'rgba(167, 139, 250, 0.3)'
      : theme.colors.border};
  box-shadow: ${({ $isNow }) =>
    $isNow
      ? '0 8px 16px rgba(124, 58, 237, 0.3)'
      : '0 4px 6px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $isNow }) =>
      $isNow
        ? '0 12px 24px rgba(124, 58, 237, 0.4)'
        : '0 8px 12px rgba(0, 0, 0, 0.1)'};
  }
`;

const Time = styled.div<{ $isNow?: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme, $isNow }) =>
    $isNow
      ? '#ffffff'
      : theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const NowBadge = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin: ${({ theme }) => theme.spacing.xs} 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const Temperature = styled.div<{ $isNow?: boolean }>`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme, $isNow }) =>
    $isNow
      ? '#ffffff'
      : theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours} ${ampm}`;
};

const isCurrentHour = (timeString: string): boolean => {
  const itemDate = new Date(timeString);
  const now = new Date();
  return itemDate.getHours() === now.getHours() &&
         itemDate.getDate() === now.getDate();
};

export const HourlyPills = ({ data, title = 'Hourly Forecast' }: HourlyPillsProps) => {
  // Get next 24 hours
  const hourlyData = data.slice(0, 24);

  return (
    <Container>
      <Title>{title}</Title>
      <ScrollContainer>
        <PillsRow>
          {hourlyData.map((item, index) => {
            const isNow = isCurrentHour(item.time);
            return (
              <Pill
                key={item.time}
                $isNow={isNow}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isNow ? (
                  <NowBadge>Now</NowBadge>
                ) : (
                  <Time $isNow={isNow}>{formatTime(item.time)}</Time>
                )}
                <IconWrapper>
                  {getWeatherIcon(item.weatherCode)}
                </IconWrapper>
                <Temperature $isNow={isNow}>
                  {Math.round(item.temperature)}°
                </Temperature>
              </Pill>
            );
          })}
        </PillsRow>
      </ScrollContainer>
    </Container>
  );
};
