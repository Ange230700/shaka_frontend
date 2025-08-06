// src\screens\FavoritesScreen.tsx

import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import { fetchSurfSpots } from 'shakafront/api/surfspotApi';
import { SurfSpot } from 'shakafront/models/SurfSpot';
import SurfSpotCard from 'shakafront/components/SurfSpotCard';

const FavoritesScreen = () => {
  const [spots, setSpots] = useState<SurfSpot[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurfSpots()
      .then(setSpots)
      .finally(() => setLoading(false));
  }, []);

  const favoriteSpots = spots.filter(s => favorites.has(s.surfSpotId));

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (favoriteSpots.length === 0) return <Text style={{ textAlign: 'center', marginTop: 40 }}>No favorites yet.</Text>;

  return (
    <FlatList
      data={favoriteSpots}
      keyExtractor={item => item.surfSpotId}
      renderItem={({ item }) => (
        <SurfSpotCard
          spot={item}
          isFavorite={true}
          onFavoriteToggle={() => setFavorites(prev => {
            const copy = new Set(prev);
            copy.delete(item.surfSpotId);
            return copy;
          })}
        />
      )}
    />
  );
};

export default FavoritesScreen;
