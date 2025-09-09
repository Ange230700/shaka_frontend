// src/screens/FavoritesScreen.tsx
import React, { useEffect, useState, useMemo } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { fetchSurfSpots } from 'shakafront/api/surfspotApi';
import { SurfSpot } from 'shakafront/models/SurfSpot';
import SurfSpotCard from 'shakafront/components/SurfSpotCard';
import { useAppDispatch, useAppSelector } from 'shakafront/store/hooks';
import { toggleFavorite } from 'shakafront/store/favoritesSlice';

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { textAlign: 'center', marginTop: 40 },
});

const FavoritesScreen = () => {
  const [spots, setSpots] = useState<SurfSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const favoriteIds = useAppSelector((s) => s.favorites.ids);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchSurfSpots()
      .then(setSpots)
      .finally(() => setLoading(false));
  }, []);

  const favoriteSpots = useMemo(
    () => spots.filter((s) => favoriteIds.includes(s.surfSpotId)),
    [spots, favoriteIds],
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (favoriteSpots.length === 0) {
    return <Text style={styles.emptyText}>No favorites yet.</Text>;
  }

  return (
    <FlatList
      initialNumToRender={10}
      windowSize={5}
      removeClippedSubviews
      data={favoriteSpots}
      keyExtractor={(item) => item.surfSpotId}
      renderItem={({ item }) => (
        <SurfSpotCard
          spot={item}
          isFavorite
          onFavoriteToggle={() => dispatch(toggleFavorite(item.surfSpotId))}
        />
      )}
    />
  );
};

export default FavoritesScreen;
