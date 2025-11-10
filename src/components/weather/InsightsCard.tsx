import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardHeader, CardTitle } from '@/components/common/Card';
import type { WeatherInsight } from '@/utils/weatherInsights';

const InsightsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

interface InsightItemProps {
  $type: 'info' | 'warning' | 'success' | 'tip';
}

const InsightItem = styled(motion.div)<InsightItemProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, $type }) => {
    switch ($type) {
      case 'warning':
        return theme.colors.warning + '15';
      case 'success':
        return theme.colors.success + '15';
      case 'tip':
        return theme.colors.info + '15';
      default:
        return theme.colors.backgroundSecondary;
    }
  }};
  border-left: 4px solid ${({ theme, $type }) => {
    switch ($type) {
      case 'warning':
        return theme.colors.warning;
      case 'success':
        return theme.colors.success;
      case 'tip':
        return theme.colors.info;
      default:
        return theme.colors.primary;
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  overflow: hidden;
  position: relative;

  /* Pulse animation for warnings */
  ${({ $type }) =>
    $type === 'warning' &&
    `
    animation: pulse 2s ease-in-out infinite;

    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(245, 158, 11, 0);
      }
    }
  `}
`;

const InsightIcon = styled(motion.div)`
  font-size: 2.5rem;
  flex-shrink: 0;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const InsightContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const InsightTitle = styled(motion.h4)`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const InsightDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface InsightsCardProps {
  insights: WeatherInsight[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.5,
    },
  },
};

const titleVariants = {
  initial: { x: 0 },
  hover: {
    x: [0, 3, 0],
    transition: {
      duration: 0.3,
    },
  },
};

export const InsightsCard = ({ insights }: InsightsCardProps) => {
  const { t } = useTranslation();

  if (insights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.insights.title}</CardTitle>
        </CardHeader>
        <EmptyState>
          {t.common.noData}
        </EmptyState>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.insights.title}</CardTitle>
      </CardHeader>
      <InsightsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {insights.map((insight) => (
          <InsightItem
            key={insight.id}
            $type={insight.type}
            variants={itemVariants}
            whileHover={{
              y: -4,
              scale: 1.02,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <InsightIcon
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
            >
              {insight.icon}
            </InsightIcon>
            <InsightContent>
              <InsightTitle
                variants={titleVariants}
                initial="initial"
                whileHover="hover"
              >
                {insight.title}
              </InsightTitle>
              <InsightDescription>{insight.description}</InsightDescription>
            </InsightContent>
          </InsightItem>
        ))}
      </InsightsGrid>
    </Card>
  );
};
