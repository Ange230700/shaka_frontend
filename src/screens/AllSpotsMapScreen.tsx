// src\screens\AllSpotsMapScreen.tsx

import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { fetchSurfSpots } from 'shakafront/api/surfspotApi';
import { SurfSpot } from 'shakafront/models/SurfSpot';

const AllSpotsMapScreen = () => {
  const [spots, setSpots] = useState<SurfSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurfSpots()
      .then(setSpots)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  // Center map to first spot or (0,0)
  const initialRegion = spots[0]
    ? {
        latitude: parseFloat(spots[0].geocodeRaw?.split(',')[0] || '0'),
        longitude: parseFloat(spots[0].geocodeRaw?.split(',')[1] || '0'),
        latitudeDelta: 10,
        longitudeDelta: 10,
      }
    : {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 100,
        longitudeDelta: 100,
      };

  return (
    <MapView style={styles.map} initialRegion={initialRegion}>
      {spots.map(spot => {
        const [lat, lng] = (spot.geocodeRaw ?? '0,0').split(',').map(Number);
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
};

const styles = StyleSheet.create({
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
});

export default AllSpotsMapScreen;
