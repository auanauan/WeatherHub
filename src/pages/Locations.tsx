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
import type { GeocodingResult, Location } from '@/types';

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

const EditMapContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  & > div {
    height: 400px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: hidden;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & > div {
      height: 300px;
    }
  }
`;

export const Locations = () => {
  const { locations, addLocation, removeLocation, updateLocation } = useLocations();
  const { t, translate } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    lat: '',
    lon: '',
    timezone: 'Asia/Bangkok',
  });
  const [editData, setEditData] = useState({
    name: '',
    lat: '',
    lon: '',
    timezone: '',
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

  const handleEdit = (location: Location) => {
    setEditingId(location.id);
    setEditData({
      name: location.name,
      lat: location.lat.toString(),
      lon: location.lon.toString(),
      timezone: location.timezone,
    });
  };

  const handleEditSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!editData.name || !editData.lat || !editData.lon) return;

    updateLocation(id, {
      name: editData.name,
      lat: parseFloat(editData.lat),
      lon: parseFloat(editData.lon),
      timezone: editData.timezone,
    });

    toast.success(t.locations.updateSuccess);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ name: '', lat: '', lon: '', timezone: '' });
  };

  const handleEditMapClick = (lat: number, lon: number) => {
    setEditData((prev) => ({
      ...prev,
      lat: lat.toFixed(4),
      lon: lon.toFixed(4),
    }));
  };

  const handleEditLocationSelect = (result: GeocodingResult) => {
    const locationName = getLocationName(result);
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const timezone = getTimezoneFromCoords(lat, lon);

    setEditData({
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
                {editingId === location.id ? (
                  <form onSubmit={(e) => handleEditSubmit(e, location.id)}>
                    <LocationSearch
                      onLocationSelect={handleEditLocationSelect}
                      placeholder={t.locations.searchPlaceholder}
                      label={t.common.search}
                    />

                    <MapInstruction>
                      💡 {t.locations.selectFromMap}
                    </MapInstruction>
                    <EditMapContainer>
                      <LocationMap
                        markers={[{
                          lat: parseFloat(editData.lat) || location.lat,
                          lon: parseFloat(editData.lon) || location.lon,
                          name: editData.name || location.name,
                        }]}
                        onMapClick={handleEditMapClick}
                      />
                    </EditMapContainer>

                    <FormGroup>
                      <Label>{t.locations.addLocation}</Label>
                      <Input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
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
                          value={editData.lat}
                          onChange={(e) =>
                            setEditData({ ...editData, lat: e.target.value })
                          }
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Longitude</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={editData.lon}
                          onChange={(e) =>
                            setEditData({ ...editData, lon: e.target.value })
                          }
                          required
                        />
                      </FormGroup>
                    </FormRow>

                    <FormGroup>
                      <Label>Timezone</Label>
                      <Input
                        type="text"
                        value={editData.timezone}
                        onChange={(e) =>
                          setEditData({ ...editData, timezone: e.target.value })
                        }
                        required
                      />
                    </FormGroup>

                    <Actions>
                      <Button type="submit" size="sm">
                        {t.common.save}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        {t.common.cancel}
                      </Button>
                    </Actions>
                  </form>
                ) : (
                  <>
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
                        onClick={() => handleEdit(location)}
                      >
                        {t.common.edit}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(location.id, location.name)}
                      >
                        {t.common.delete}
                      </Button>
                    </Actions>
                  </>
                )}
              </LocationCard>
            ))}
          </Grid>
        </>
      )}
    </LocationsContainer>
    </PageTransition>
  );
};
