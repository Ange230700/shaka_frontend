// src\components\AllSpotsMap.web.tsx

import React from 'react';
import AllSpotsLeafletMap from 'shakafront/components/AllSpotsLeafletMap';
import { SurfSpot } from 'shakafront/models/SurfSpot';

export default function AllSpotsMap({ spots }: { readonly spots: SurfSpot[] }) {
  return <AllSpotsLeafletMap spots={spots} />;
}
