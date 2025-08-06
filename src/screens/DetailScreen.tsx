// src\screens\DetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { Text, Image, ScrollView, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { fetchSurfSpotById } from 'shakafront/api/surfspotApi';
import { SurfSpot } from 'shakafront/models/SurfSpot';

type DetailScreenRouteProp = RouteProp<{ params: { surfSpotId: string } }, 'params'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { surfSpotId } = route.params;
  const [spot, setSpot] = useState<SurfSpot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurfSpotById(surfSpotId)
      .then(setSpot)
      .finally(() => setLoading(false));
  }, [surfSpotId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (!spot) return <Text>Not found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: spot.photoUrls[0] ?? 'https://via.placeholder.com/400x300.png?text=No+Image' }} style={styles.image} />
      <Text style={styles.title}>{spot.destination}</Text>
      <Text style={styles.info}>Address: {spot.address}</Text>
      <Text style={styles.info}>Difficulty: {spot.difficultyLevel} / 5</Text>
      <Text style={styles.info}>Break Types: {spot.breakTypes.join(', ') || 'N/A'}</Text>
      <Text style={styles.info}>
        Season: {spot.peakSeasonBegin?.slice(0, 10) ?? 'N/A'} - {spot.peakSeasonEnd?.slice(0, 10) ?? 'N/A'}
      </Text>
      {spot.magicSeaweedLink && (
        <Text
          style={{ color: 'blue', marginTop: 10 }}
          onPress={() => spot.magicSeaweedLink && Linking.openURL(spot.magicSeaweedLink)}
        >
          View Surf Report
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 16 },
  image: { width: 320, height: 200, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  info: { fontSize: 16, marginBottom: 4 },
});

export default DetailScreen;
