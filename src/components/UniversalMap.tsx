// src/components/UniversalMap.tsx

import React from "react";
import { Platform, View, Text, StyleSheet, Dimensions } from "react-native";

// Import MapView only for native (prevents bundling issues)
const MapView = Platform.OS !== "web" ? require("react-native-maps").default : null;

const { width } = Dimensions.get("window");

type Props = {
  latitude: number;
  longitude: number;
  label?: string;
};

export default function UniversalMap({ latitude, longitude, label = "Surf Spot" }: Readonly<Props>) {
  // Native (iOS/Android)
  if (MapView) {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <MapView.Marker
            coordinate={{ latitude, longitude }}
            title={label}
          />
        </MapView>
      </View>
    );
  }

  // If something goes wrong (should never hit here)
  return <Text>Map not available.</Text>;
}

const styles = StyleSheet.create({
  mapContainer: {
    width: width - 32,
    height: 220,
    marginVertical: 12,
    borderRadius: 12,
    overflow: "hidden",
    alignSelf: "center",
  },
  webView: {
    flex: 1,
    borderRadius: 12,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
