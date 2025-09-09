// src\components\SurfSpotCard.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SurfSpot } from 'shakafront/models/SurfSpot';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  spot: SurfSpot;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onPress?: () => void;
};

const SurfSpotCard: React.FC<Props> = ({
  spot,
  isFavorite,
  onFavoriteToggle,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image
      source={{
        uri:
          spot.photoUrls[0] ??
          'https://via.placeholder.com/200x120.png?text=No+Image',
      }}
      style={styles.image}
    />
    <View style={styles.info}>
      <Text style={styles.title}>{spot.destination}</Text>
      <Text>{spot.address}</Text>
      <Text>Difficulty: {spot.difficultyLevel}</Text>
      <TouchableOpacity
        onPress={onFavoriteToggle}
        style={{ position: 'absolute', right: 8, top: 8 }}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 120 },
  info: { padding: 10, position: 'relative' },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 2 },
});

export default SurfSpotCard;
