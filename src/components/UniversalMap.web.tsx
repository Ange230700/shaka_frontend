// src\components\UniversalMap.web.tsx

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "shakafront/setupLeafletIcons";

type Props = Readonly<{ latitude: number; longitude: number; label?: string }>;

export default function UniversalMap({ latitude, longitude, label = "Surf Spot" }: Props) {
  const center: [number, number] = [latitude, longitude];
  return (
    <div style={{ width: "100%", height: 220, margin: "12px 0", borderRadius: 12, overflow: "hidden" }}>
      <MapContainer center={center} zoom={15} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>{label}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
