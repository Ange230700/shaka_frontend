// src\screens\HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { fetchSurfSpots } from 'shakafront/api/surfspotApi';
import { SurfSpot } from 'shakafront/models/SurfSpot';
import SurfSpotCard from 'shakafront/components/SurfSpotCard';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [spots, setSpots] = useState<SurfSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchSurfSpots()
      .then(setSpots)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <FlatList
      data={spots}
      keyExtractor={item => item.surfSpotId}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <SurfSpotCard
          spot={item}
          isFavorite={favorites.has(item.surfSpotId)}
          onFavoriteToggle={() => {
            setFavorites(prev => {
              const copy = new Set(prev);
              copy.has(item.surfSpotId) ? copy.delete(item.surfSpotId) : copy.add(item.surfSpotId);
              return copy;
            });
          }}
          onPress={() => navigation.navigate('Detail', { surfSpotId: item.surfSpotId })}
        />
      )}
    />
  );
};

export default HomeScreen;
