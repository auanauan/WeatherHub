import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
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

interface CompareChartProps {
  data1: DailySummary[];
  data2: DailySummary[];
  location1Name: string;
  location2Name: string;
}

export const CompareChart = ({
  data1,
  data2,
  location1Name,
  location2Name,
}: CompareChartProps) => {
  const theme = useStyledTheme();

  // Merge data by date (store ISO date for correct sorting)
  const dateMap = new Map<string, any>();

  data1.forEach((item) => {
    dateMap.set(item.date, {
      dateISO: item.date,
      date: formatDate(item.date, 'MM/dd'),
      [`${location1Name}_temp`]: Math.round(item.tempMax * 10) / 10,
      [`${location1Name}_rain`]: Math.round(item.rainTotal * 10) / 10,
    });
  });

  data2.forEach((item) => {
    const existing = dateMap.get(item.date);
    if (existing) {
      existing[`${location2Name}_temp`] = Math.round(item.tempMax * 10) / 10;
      existing[`${location2Name}_rain`] = Math.round(item.rainTotal * 10) / 10;
    } else {
      dateMap.set(item.date, {
        dateISO: item.date,
        date: formatDate(item.date, 'MM/dd'),
        [`${location2Name}_temp`]: Math.round(item.tempMax * 10) / 10,
        [`${location2Name}_rain`]: Math.round(item.rainTotal * 10) / 10,
      });
    }
  });

  // Sort by ISO date to avoid issues with formatted strings (e.g. 1/2 vs 10/1)
  const chartData = Array.from(dateMap.values())
    .sort((a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare: {location1Name} vs {location2Name}</CardTitle>
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
              dataKey="date"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
            />
            {/* Left Y for temperature */}
            <YAxis
              yAxisId="temp"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            {/* Right Y for rain */}
            <YAxis
              yAxisId="rain"
              orientation="right"
              stroke={theme.colors.textSecondary}
              tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
              domain={[0, 'dataMax + 5']}
            />
            <Tooltip content={<CustomChartTooltip />} />
            <Legend
              wrapperStyle={{
                color: theme.colors.text,
              }}
            />

            {/* Temperature lines (use temp Y axis) */}
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey={`${location1Name}_temp`}
              stroke={theme.colors.error}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 0, fill: theme.colors.error }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: theme.colors.error, fill: theme.colors.error }}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-in-out"
              name={`${location1Name} Temp (°C)`}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey={`${location2Name}_temp`}
              stroke={theme.colors.info}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 0, fill: theme.colors.info }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: theme.colors.info, fill: theme.colors.info }}
              animationBegin={200}
              animationDuration={1500}
              animationEasing="ease-in-out"
              name={`${location2Name} Temp (°C)`}
            />

            {/* Rain lines (use rain Y axis, dashed) */}
            <Line
              yAxisId="rain"
              type="monotone"
              dataKey={`${location1Name}_rain`}
              stroke={theme.colors.primary || theme.colors.info}
              strokeWidth={2}
              dot={false}
              strokeDasharray="4 2"
              name={`${location1Name} Rain (mm)`}
              animationBegin={400}
              animationDuration={1200}
            />
            <Line
              yAxisId="rain"
              type="monotone"
              dataKey={`${location2Name}_rain`}
              stroke={theme.colors.success || theme.colors.info}
              strokeWidth={2}
              dot={false}
              strokeDasharray="4 2"
              name={`${location2Name} Rain (mm)`}
              animationBegin={600}
              animationDuration={1200}
            />

            {/* Brush to select range */}
            <Brush dataKey="date" height={24} stroke={theme.colors.border} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};
