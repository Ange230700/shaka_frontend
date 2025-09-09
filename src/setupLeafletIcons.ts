// src/setupLeafletIcons.ts
import L from 'leaflet';

// These are the default marker icon URLs in leaflet 1.x
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});
