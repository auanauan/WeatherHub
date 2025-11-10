import { useState } from 'react';
import styled from 'styled-components';
import { useLocations } from '@/contexts/LocationContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useDailySummary } from '@/hooks/useWeather';
import { CompareChart } from '@/components/charts/CompareChart';
import { Select, FormGroup, Label } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { ChartSkeleton } from '@/components/common/ChartSkeleton';
import { ErrorMessage, EmptyState } from '@/components/common/ErrorMessage';
import { Card, CardContent } from '@/components/common/Card';
import { PageTransition } from '@/components/common/PageTransition';
import { getLastNDays } from '@/utils/date';
import { exportComparisonCSV } from '@/utils/csvExport';
import { toast } from '@/utils/alert';

const CompareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const SelectionCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.surface};
`;

const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ChartActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Compare = () => {
  const { locations } = useLocations();
  const { t } = useTranslation();
  const [location1Id, setLocation1Id] = useState<string>('');
  const [location2Id, setLocation2Id] = useState<string>('');
  const [showComparison, setShowComparison] = useState(false);
  const [days] = useState(7);

  const dateRange = getLastNDays(days);

  const location1 = locations.find((loc) => loc.id === location1Id);
  const location2 = locations.find((loc) => loc.id === location2Id);

  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useDailySummary(
    showComparison ? location1 || null : null,
    dateRange.start,
    dateRange.end
  );

  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useDailySummary(
    showComparison ? location2 || null : null,
    dateRange.start,
    dateRange.end
  );

  const handleExportComparison = () => {
    if (data1 && data2 && location1 && location2) {
      exportComparisonCSV(data1, data2, location1.name, location2.name);
      toast.success(t.alerts.exportSuccess.replace('{{type}}', 'Comparison'));
    }
  };

  const handleCompare = () => {
    if (location1Id && location2Id && location1Id !== location2Id) {
      setShowComparison(true);
    }
  };

  if (locations.length < 2) {
    return (
      <PageTransition>
        <CompareContainer>
          <PageTitle>{t.compare.title}</PageTitle>
          <EmptyState
            message={t.compare.selectTwoLocations}
            icon="📊"
          />
        </CompareContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <CompareContainer>
      <PageTitle>{t.compare.title}</PageTitle>

      <SelectionCard>
        <CardContent>
          <SelectionGrid>
            <FormGroup>
              <Label>{t.compare.selectLocation1}</Label>
              <Select
                value={location1Id}
                onChange={(e) => {
                  setLocation1Id(e.target.value);
                  setShowComparison(false);
                }}
              >
                <option value="">{t.compare.selectLocation1}...</option>
                {locations.map((location) => (
                  <option
                    key={location.id}
                    value={location.id}
                    disabled={location.id === location2Id}
                  >
                    {location.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>{t.compare.selectLocation2}</Label>
              <Select
                value={location2Id}
                onChange={(e) => {
                  setLocation2Id(e.target.value);
                  setShowComparison(false);
                }}
              >
                <option value="">{t.compare.selectLocation2}...</option>
                {locations.map((location) => (
                  <option
                    key={location.id}
                    value={location.id}
                    disabled={location.id === location1Id}
                  >
                    {location.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Button
                onClick={handleCompare}
                disabled={!location1Id || !location2Id || location1Id === location2Id}
                fullWidth
              >
                {t.compare.title}
              </Button>
            </FormGroup>
          </SelectionGrid>
        </CardContent>
      </SelectionCard>

      {showComparison && (
        <>
          {(loading1 || loading2) && <ChartSkeleton />}
          {!(loading1 || loading2) && (error1 || error2) && (
            <ErrorMessage message={error1 || error2 || t.common.error} />
          )}
          {!(loading1 || loading2) && data1 && data2 && location1 && location2 && (
            <ChartSection>
              <CompareChart
                data1={data1}
                data2={data2}
                location1Name={location1.name}
                location2Name={location2.name}
              />
              <ChartActions>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleExportComparison}
                >
                  📥 {t.compare.title}
                </Button>
              </ChartActions>
            </ChartSection>
          )}
        </>
      )}
    </CompareContainer>
    </PageTransition>
  );
};
