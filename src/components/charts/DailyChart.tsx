import {
  Bar,
  Line,
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
import { formatDate } from '@/utils/date';
import type { DailySummary } from '@/types';

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

interface DailyChartProps {
  data: DailySummary[];
  title?: string;
}

export const DailyChart = ({ data, title = 'Daily Summary' }: DailyChartProps) => {
  const theme = useStyledTheme();

  const chartData = data.map((item) => ({
    date: formatDate(item.date, 'MM/dd'),
    tempMin: Math.round(item.tempMin * 10) / 10,
    tempMax: Math.round(item.tempMax * 10) / 10,
    rainTotal: Math.round(item.rainTotal * 10) / 10,
    windMax: Math.round(item.windMax * 10) / 10,
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
              <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="tempMaxStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
              <linearGradient id="tempMinStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
              <linearGradient id="tempMaxGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="tempMinGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="5 5"
              stroke={theme.colors.border}
              opacity={0.2}
              strokeWidth={1}
            />
            <XAxis
              dataKey="date"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 11 }}
              tickLine={{ stroke: theme.colors.border }}
              axisLine={{ stroke: theme.colors.border, strokeWidth: 1 }}
            />
            <YAxis
              yAxisId="temp"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 11 }}
              tickLine={{ stroke: theme.colors.border }}
              axisLine={{ stroke: theme.colors.border, strokeWidth: 1 }}
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: theme.colors.textSecondary }}
            />
            <YAxis
              yAxisId="rain"
              orientation="right"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 11 }}
              tickLine={{ stroke: theme.colors.border }}
              axisLine={{ stroke: theme.colors.border, strokeWidth: 1 }}
              label={{ value: 'Rain (mm)', angle: 90, position: 'insideRight', fill: theme.colors.textSecondary }}
            />
            <Tooltip content={<CustomChartTooltip />} cursor={{ stroke: theme.colors.primary, strokeWidth: 2, strokeDasharray: '5 5' }} />
            <Legend
              wrapperStyle={{
                color: theme.colors.text,
                paddingTop: '20px',
              }}
              iconType="circle"
            />
            <Bar
              yAxisId="rain"
              dataKey="rainTotal"
              fill="url(#rainGradient)"
              radius={[10, 10, 0, 0]}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
              name="Rain Total (mm)"
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="tempMax"
              stroke="url(#tempMaxStroke)"
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
              animationBegin={200}
              animationDuration={1200}
              animationEasing="ease-out"
              name="Max Temp (°C)"
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="tempMin"
              stroke="url(#tempMinStroke)"
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
              animationBegin={400}
              animationDuration={1200}
              animationEasing="ease-out"
              name="Min Temp (°C)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};
