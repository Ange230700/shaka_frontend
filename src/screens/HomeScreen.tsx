// src\screens\HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { fetchSurfSpots } from 'shakafront/api/surfspotApi';
import { SurfSpot } from 'shakafront/models/SurfSpot';
import SurfSpotCard from 'shakafront/components/SurfSpotCard';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'shakafront/store/hooks';
import { toggleFavorite } from 'shakafront/store/favoritesSlice';

const HomeScreen = () => {
  const [spots, setSpots] = useState<SurfSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const favorites = useAppSelector((s) => s.favorites.ids); // array of ids
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchSurfSpots().then(setSpots).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <FlatList
      data={spots}
      keyExtractor={(item) => item.surfSpotId}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <SurfSpotCard
          spot={item}
          isFavorite={favorites.includes(item.surfSpotId)}
          onFavoriteToggle={() => dispatch(toggleFavorite(item.surfSpotId))}
          onPress={() => navigation.navigate('Detail', { surfSpotId: item.surfSpotId })}
        />
      )}
    />
  );
};

export default HomeScreen;
