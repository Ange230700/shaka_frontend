// app.config.ts
import 'dotenv/config';
export default {
  expo: {
    name: 'shaka_frontend',
    slug: 'shaka_frontend',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'We use your location to show nearby surf spots.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: ['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION'],
      config: {
        googleMaps: { apiKey: process.env.GOOGLE_MAPS_API_KEY },
      },
    },
    web: { favicon: './assets/favicon.png' },
    plugins: [
      [
        'react-native-maps',
        { config: { googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY } },
      ],
    ],
  },
} as const;
