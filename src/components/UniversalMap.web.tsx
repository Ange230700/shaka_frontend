// src\components\UniversalMap.web.tsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'shakafront/setupLeafletIcons';
import styles from './UniversalMap.web.module.css';

type Props = Readonly<{ latitude: number; longitude: number; label?: string }>;

export default function UniversalMap({
  latitude,
  longitude,
  label = 'Surf Spot',
}: Props) {
  const center: [number, number] = [latitude, longitude];
  return (
    <div className={styles.container}>
      <MapContainer center={center} zoom={15} className={styles.map}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>{label}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
