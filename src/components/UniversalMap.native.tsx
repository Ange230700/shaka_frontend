// src\components\UniversalMap.native.tsx

import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

export default function UniversalMap({ latitude, longitude, label = "Surf Spot" }: Readonly<{ latitude: number; longitude: number; label?: string }>) {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker coordinate={{ latitude, longitude }} title={label} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { width: width - 32, height: 220, marginVertical: 12, borderRadius: 12, overflow: "hidden", alignSelf: "center" },
  map: { width: "100%", height: "100%", borderRadius: 12 },
});
