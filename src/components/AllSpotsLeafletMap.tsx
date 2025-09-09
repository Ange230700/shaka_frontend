// src/components/AllSpotsLeafletMap.tsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

type Spot = {
  surfSpotId: string;
  destination: string;
  address: string;
  geocodeRaw?: string | null;
};

function parseGeocodeRaw(geocodeRaw?: string | null): { lat: number, lng: number } {
  if (!geocodeRaw) return { lat: 0, lng: 0 };
  try {
    const json = Buffer.from(geocodeRaw, "base64").toString("utf-8");
    const data = JSON.parse(json);
    return { lat: Number(data?.o?.lat ?? 0), lng: Number(data?.o?.lng ?? 0) };
  } catch {
    return { lat: 0, lng: 0 };
  }
}

export default function AllSpotsLeafletMap({ spots }: { readonly spots: Spot[] }) {
  const first = spots[0] ? parseGeocodeRaw(spots[0].geocodeRaw) : { lat: 0, lng: 0 };
  const center: [number, number] = [first.lat, first.lng];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapContainer
        center={center}
        zoom={3}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {spots.map(spot => {
          const { lat, lng } = parseGeocodeRaw(spot.geocodeRaw);
          return (
            <Marker position={[lat, lng]} key={spot.surfSpotId}>
              <Popup>
                <b>{spot.destination}</b><br />
                {spot.address}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
