// src/screens/AllSpotsMapScreen.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { fetchSurfSpots } from 'shakafront/api/surfspotApi';
import { SurfSpot } from 'shakafront/models/SurfSpot';
import AllSpotsMap from 'shakafront/components/AllSpotsMap';

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { marginTop: 32, textAlign: 'center' },
});
const AllSpotsMapScreen = () => {
  const [spots, setSpots] = useState<SurfSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurfSpots()
      .then(setSpots)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (spots.length === 0) {
    return <Text style={styles.empty}>No spots available.</Text>;
  }

  return <AllSpotsMap spots={spots} />;
};

export default AllSpotsMapScreen;
