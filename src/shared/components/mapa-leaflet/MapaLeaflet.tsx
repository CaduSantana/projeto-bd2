import { useTheme } from '@mui/system';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

export interface IMapaLeafletProps {
  lat: number;
  lng: number;
  width: number;
  height: number;
}

export const MapaLeaflet: React.FC<IMapaLeafletProps> = ({ lat, lng, width, height }) => {
  const theme = useTheme();

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: theme.spacing(width), width: theme.spacing(height) }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[lat, lng]} icon={new Icon({ iconUrl: markerIconPng })} />
    </MapContainer>
  );
};
