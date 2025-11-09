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
  height: 400px;
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 300px;
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
                <stop offset="0%" stopColor={theme.colors.primary} stopOpacity={0.8} />
                <stop offset="100%" stopColor={theme.colors.primary} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.colors.border}
              opacity={0.3}
            />
            <XAxis
              dataKey="date"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
            />
            <YAxis
              yAxisId="temp"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
            />
            <YAxis
              yAxisId="rain"
              orientation="right"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
            />
            <Tooltip content={<CustomChartTooltip />} />
            <Legend
              wrapperStyle={{
                color: theme.colors.text,
              }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="tempMax"
              stroke={theme.colors.error}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 0 }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: theme.colors.error }}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-in-out"
              name="Max Temp (°C)"
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="tempMin"
              stroke={theme.colors.info}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 0 }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: theme.colors.info }}
              animationBegin={200}
              animationDuration={1500}
              animationEasing="ease-in-out"
              name="Min Temp (°C)"
            />
            <Bar
              yAxisId="rain"
              dataKey="rainTotal"
              fill="url(#rainGradient)"
              radius={[8, 8, 0, 0]}
              animationBegin={400}
              animationDuration={1500}
              animationEasing="ease-in-out"
              name="Rain Total (mm)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};
