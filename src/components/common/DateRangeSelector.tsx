import styled from 'styled-components';
import { Select, FormGroup, Label } from './Input';
import { getLastNDays, getDaysAgo, getToday } from '@/utils/date';

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

const SelectGroup = styled(FormGroup)`
  min-width: 150px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export interface DateRange {
  start: string;
  end: string;
  label: string;
}

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const PRESET_RANGES = [
  { value: '3', label: 'Last 3 Days' },
  { value: '7', label: 'Last 7 Days' },
  { value: '14', label: 'Last 14 Days' },
  { value: '30', label: 'Last 30 Days' },
  { value: '60', label: 'Last 60 Days' },
  { value: '90', label: 'Last 90 Days' },
];

export const DateRangeSelector = ({ value, onChange }: DateRangeSelectorProps) => {
  const handlePresetChange = (days: string) => {
    const range = getLastNDays(parseInt(days));
    onChange({
      start: range.start,
      end: range.end,
      label: PRESET_RANGES.find((r) => r.value === days)?.label || `Last ${days} Days`,
    });
  };

  // Determine current preset value
  const getCurrentPreset = () => {
    const today = getToday();
    if (value.end !== today) return 'custom';

    for (const preset of PRESET_RANGES) {
      const days = parseInt(preset.value);
      const testRange = getLastNDays(days);
      if (testRange.start === value.start) {
        return preset.value;
      }
    }
    return 'custom';
  };

  return (
    <Container>
      <SelectGroup>
        <Label>Date Range</Label>
        <Select
          value={getCurrentPreset()}
          onChange={(e) => handlePresetChange(e.target.value)}
        >
          {PRESET_RANGES.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </Select>
      </SelectGroup>
    </Container>
  );
};
