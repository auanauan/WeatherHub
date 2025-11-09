import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapCard = styled(Card)`
  padding: 0;
  overflow: hidden;
  height: 500px;
  position: relative;
  z-index: 1;

  .leaflet-container {
    height: 100%;
    width: 100%;
    z-index: 1;
  }
`;

interface LocationMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{ lat: number; lon: number; name: string }>;
  onMapClick?: (lat: number, lon: number) => void;
}

function MapClickHandler({ onClick }: { onClick: (lat: number, lon: number) => void }) {
  useMapEvents({
    click: (e) => {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export const LocationMap = ({
  center = [13.7563, 100.5018], // Bangkok
  zoom = 6,
  markers = [],
  onMapClick,
}: LocationMapProps) => {
  const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);

  const handleMapClick = (lat: number, lon: number) => {
    setClickedPosition([lat, lon]);
    onMapClick?.(lat, lon);
  };

  return (
    <MapCard>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {onMapClick && <MapClickHandler onClick={handleMapClick} />}

        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lon]}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}

        {clickedPosition && (
          <Marker position={clickedPosition}>
            <Popup>
              Selected location
              <br />
              Lat: {clickedPosition[0].toFixed(4)}
              <br />
              Lon: {clickedPosition[1].toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </MapCard>
  );
};
