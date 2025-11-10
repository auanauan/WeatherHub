import styled from 'styled-components';
import { useTranslation } from '@/hooks/useTranslation';
import { Select, FormGroup, Label } from './Input';
import { getLastNDays, getToday } from '@/utils/date';

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

export const DateRangeSelector = ({ value, onChange }: DateRangeSelectorProps) => {
  const { t, translate } = useTranslation();

  const PRESET_RANGES = [
    { value: '3', label: translate(t.dateRange.lastDays, { days: '3' }) },
    { value: '7', label: t.dateRange.last7Days },
    { value: '14', label: t.dateRange.last14Days },
    { value: '30', label: t.dateRange.last30Days },
    { value: '60', label: translate(t.dateRange.lastDays, { days: '60' }) },
    { value: '90', label: translate(t.dateRange.lastDays, { days: '90' }) },
  ];

  const handlePresetChange = (days: string) => {
    const range = getLastNDays(parseInt(days));
    const preset = PRESET_RANGES.find((r) => r.value === days);
    onChange({
      start: range.start,
      end: range.end,
      label: preset?.label || translate(t.dateRange.lastDays, { days }),
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
        <Label>{t.dateRange.customRange}</Label>
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
