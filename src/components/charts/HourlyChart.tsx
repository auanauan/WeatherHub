import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme as useStyledTheme } from 'styled-components';
import styled from 'styled-components';
import { Card, CardTitle, CardHeader } from '@/components/common/Card';
import { CustomChartTooltip } from './CustomChartTooltip';
import { formatDateTime } from '@/utils/date';
import type { WeatherData } from '@/types';

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 300px;
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
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.colors.border}
              opacity={0.3}
            />
            <XAxis
              dataKey="time"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
            />
            <YAxis
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
              type="monotone"
              dataKey="temperature"
              stroke={theme.colors.error}
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 0, fill: theme.colors.error }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: theme.colors.error, fill: theme.colors.error }}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-in-out"
              name="Temperature (°C)"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke={theme.colors.info}
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 0, fill: theme.colors.info }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: theme.colors.info, fill: theme.colors.info }}
              animationBegin={200}
              animationDuration={1500}
              animationEasing="ease-in-out"
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};
