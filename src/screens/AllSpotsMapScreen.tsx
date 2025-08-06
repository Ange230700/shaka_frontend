// src\screens\AllSpotsMapScreen.tsx

import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { fetchSurfSpots } from "shakafront/api/surfspotApi";
import { SurfSpot } from "shakafront/models/SurfSpot";
import AllSpotsMap from "shakafront/components/AllSpotsMap";

const AllSpotsMapScreen = () => {
  const [spots, setSpots] = useState<SurfSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurfSpots()
      .then(setSpots)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return <AllSpotsMap spots={spots} />;
};

export default AllSpotsMapScreen;
