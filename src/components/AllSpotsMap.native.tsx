// src\components\AllSpotsMap.native.tsx

import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SurfSpot } from 'shakafront/models/SurfSpot';
import { Buffer } from 'buffer';

function parseGeocodeRaw(geocodeRaw?: string | null): {
  lat: number;
  lng: number;
} {
  if (!geocodeRaw) return { lat: 0, lng: 0 };
  try {
    const json = Buffer.from(geocodeRaw, 'base64').toString('utf-8');
    const data = JSON.parse(json);
    return { lat: Number(data?.o?.lat ?? 0), lng: Number(data?.o?.lng ?? 0) };
  } catch {
    return { lat: 0, lng: 0 };
  }
}

export default function AllSpotsMap({ spots }: { readonly spots: SurfSpot[] }) {
  const { lat, lng } = spots[0]
    ? parseGeocodeRaw(spots[0].geocodeRaw)
    : { lat: 0, lng: 0 };

  return (
    <MapView
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
      initialRegion={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }}
    >
      {spots.map((spot) => {
        return (
          <Marker
            key={spot.surfSpotId}
            coordinate={{ latitude: lat, longitude: lng }}
            title={spot.destination}
            description={spot.address}
          />
        );
      })}
    </MapView>
  );
}
