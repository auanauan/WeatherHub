import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { useTheme as useStyledTheme } from 'styled-components';
import styled from 'styled-components';
import { Card, CardTitle, CardHeader } from '@/components/common/Card';
import { CustomChartTooltip } from './CustomChartTooltip';
import { formatDateTime } from '@/utils/date';
import type { WeatherData } from '@/types';

const ChartContainer = styled.div`
  width: 100%;
  height: 450px;
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 320px;
  }

  .recharts-surface {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }
`;

interface HourlyChartProps {
  data: WeatherData[];
  title?: string;
}

export const HourlyChart = ({ data, title = 'Hourly Weather' }: HourlyChartProps) => {
  const theme = useStyledTheme();

  const chartData = data.map((item) => ({
    time: formatDateTime(item.time, 'MM/dd HH:mm'),
    temperature: Math.round(item.temperature * 10) / 10,
    humidity: item.humidity,
    windSpeed: Math.round(item.windSpeed * 10) / 10,
    precipitation: Math.round(item.precipitation * 10) / 10,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="tempStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
              <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="humidityStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="5 5"
              stroke={theme.colors.border}
              opacity={0.2}
              strokeWidth={1}
            />
            <XAxis
              dataKey="time"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 11 }}
              tickLine={{ stroke: theme.colors.border }}
              axisLine={{ stroke: theme.colors.border, strokeWidth: 1 }}
            />
            <YAxis
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 11 }}
              tickLine={{ stroke: theme.colors.border }}
              axisLine={{ stroke: theme.colors.border, strokeWidth: 1 }}
            />
            <Tooltip content={<CustomChartTooltip />} cursor={{ stroke: theme.colors.primary, strokeWidth: 2, strokeDasharray: '5 5' }} />
            <Legend
              wrapperStyle={{
                color: theme.colors.text,
                paddingTop: '20px',
              }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="temperature"
              fill="url(#tempGradient)"
              stroke="none"
              animationBegin={0}
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="url(#tempStroke)"
              strokeWidth={3}
              dot={{
                r: 5,
                strokeWidth: 2,
                stroke: '#ffffff',
                fill: '#f97316'
              }}
              activeDot={{
                r: 7,
                strokeWidth: 3,
                stroke: '#ffffff',
                fill: '#f97316'
              }}
              animationBegin={0}
              animationDuration={1000}
              animationEasing="ease-out"
              name="Temperature (°C)"
            />
            <Area
              type="monotone"
              dataKey="humidity"
              fill="url(#humidityGradient)"
              stroke="none"
              animationBegin={150}
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="url(#humidityStroke)"
              strokeWidth={3}
              dot={{
                r: 5,
                strokeWidth: 2,
                stroke: '#ffffff',
                fill: '#3b82f6'
              }}
              activeDot={{
                r: 7,
                strokeWidth: 3,
                stroke: '#ffffff',
                fill: '#3b82f6'
              }}
              animationBegin={150}
              animationDuration={1000}
              animationEasing="ease-out"
              name="Humidity (%)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};
