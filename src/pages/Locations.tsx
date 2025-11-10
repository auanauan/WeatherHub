import { useState } from 'react';
import styled from 'styled-components';
import { useLocations } from '@/contexts/LocationContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input, Label, FormGroup } from '@/components/common/Input';
import { LocationMap } from '@/components/map/LocationMap';
import { LocationSearch } from '@/components/common/LocationSearch';
import { EmptyState } from '@/components/common/ErrorMessage';
import { PageTransition } from '@/components/common/PageTransition';
import { getLocationName, getTimezoneFromCoords } from '@/services/geocoding';
import { toast, showDeleteConfirm } from '@/utils/alert';
import type { GeocodingResult } from '@/types';

const LocationsContainer = styled.div`
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const LocationCard = styled(Card)`
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  }
`;

const LocationInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LocationName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const LocationDetail = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const AddLocationForm = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MapInstruction = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Locations = () => {
  const { locations, addLocation, removeLocation } = useLocations();
  const { t, translate } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lat: '',
    lon: '',
    timezone: 'Asia/Bangkok',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.lat || !formData.lon) return;

    addLocation({
      name: formData.name,
      lat: parseFloat(formData.lat),
      lon: parseFloat(formData.lon),
      timezone: formData.timezone,
    });

    toast.success(t.locations.addSuccess);
    setFormData({ name: '', lat: '', lon: '', timezone: 'Asia/Bangkok' });
    setShowForm(false);
  };

  const handleRemove = async (id: string, name: string) => {
    const confirmed = await showDeleteConfirm(name, t.locations.deleteConfirm);
    if (confirmed) {
      removeLocation(id);
      toast.success(t.locations.deleteSuccess);
    }
  };

  const handleMapClick = (lat: number, lon: number) => {
    setFormData((prev) => ({
      ...prev,
      lat: lat.toFixed(4),
      lon: lon.toFixed(4),
    }));
  };

  const handleLocationSelect = (result: GeocodingResult) => {
    const locationName = getLocationName(result);
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const timezone = getTimezoneFromCoords(lat, lon);

    setFormData({
      name: locationName,
      lat: result.lat,
      lon: result.lon,
      timezone,
    });
  };

  return (
    <PageTransition>
      <LocationsContainer>
      <div>
        <PageTitle>{t.locations.title}</PageTitle>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.locations.addLocation}</CardTitle>
          <Button onClick={() => setShowForm(!showForm)} size="sm">
            {showForm ? t.common.cancel : `+ ${t.locations.addLocation}`}
          </Button>
        </CardHeader>

        {showForm && (
          <CardContent>
            <AddLocationForm onSubmit={handleSubmit}>
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                placeholder={t.locations.searchPlaceholder}
                label={t.common.search}
              />

              <MapInstruction>
                💡 {t.locations.selectFromMap}
              </MapInstruction>
              <LocationMap
                markers={locations.map((loc) => ({
                  lat: loc.lat,
                  lon: loc.lon,
                  name: loc.name,
                }))}
                onMapClick={handleMapClick}
              />

              <FormGroup>
                <Label>{t.locations.addLocation}</Label>
                <Input
                  type="text"
                  placeholder="e.g., Bangkok"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>Latitude</Label>
                  <Input
                    type="number"
                    step="0.0001"
                    placeholder="e.g., 13.7563"
                    value={formData.lat}
                    onChange={(e) =>
                      setFormData({ ...formData, lat: e.target.value })
                    }
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Longitude</Label>
                  <Input
                    type="number"
                    step="0.0001"
                    placeholder="e.g., 100.5018"
                    value={formData.lon}
                    onChange={(e) =>
                      setFormData({ ...formData, lon: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Timezone</Label>
                <Input
                  type="text"
                  placeholder="e.g., Asia/Bangkok"
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData({ ...formData, timezone: e.target.value })
                  }
                  required
                />
              </FormGroup>

              <Button type="submit" fullWidth>
                {t.locations.addLocation}
              </Button>
            </AddLocationForm>
          </CardContent>
        )}
      </Card>

      {locations.length === 0 ? (
        <EmptyState
          message={t.dashboard.noLocations}
          icon="🌍"
        />
      ) : (
        <>
          <CardTitle>{translate(t.locations.title, {})} ({locations.length})</CardTitle>
          <Grid>
            {locations.map((location) => (
              <LocationCard key={location.id}>
                <LocationInfo>
                  <LocationName>{location.name}</LocationName>
                  <LocationDetail>
                    📍 {t.locations.coordinates}: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                  </LocationDetail>
                  <LocationDetail>🕒 {location.timezone}</LocationDetail>
                </LocationInfo>
                <Actions>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(location.id, location.name)}
                  >
                    {t.common.delete}
                  </Button>
                </Actions>
              </LocationCard>
            ))}
          </Grid>
        </>
      )}
    </LocationsContainer>
    </PageTransition>
  );
};
