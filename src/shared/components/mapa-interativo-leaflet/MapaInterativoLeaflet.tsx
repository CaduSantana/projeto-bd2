import { useTheme } from '@mui/system';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import { useMemo, useRef, useState } from 'react';

export interface IMapaInterativoLeafletProps {
  latInicial: number;
  lngInicial: number;
  width: number;
  height: number;
  getPosition: () => { lat: number; lng: number };
}

export const MapaInterativoLeaflet: React.FC<IMapaInterativoLeafletProps> = ({ latInicial, lngInicial, width, height }) => {
  const theme = useTheme();

  const [position, setPosition] = useState({ lat: latInicial, lng: lngInicial });

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: theme.spacing(width), width: theme.spacing(height) }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker draggable position={position} eventHandlers={eventHandlers} icon={new Icon({ iconUrl: markerIconPng })} ref={markerRef} />
    </MapContainer>
  );
};
