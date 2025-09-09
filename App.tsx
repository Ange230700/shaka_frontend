// App.tsx

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme as NavLight,
  DarkTheme as NavDark,
  Theme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Buffer } from 'buffer';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { useColorScheme } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AllSpotsMapScreen from './src/screens/AllSpotsMapScreen';
import DetailScreen from './src/screens/DetailScreen';

global.Buffer = Buffer;

export type RootStackParamList = {
  HomeTab: undefined;
  Detail: { surfSpotId: string };
  AllSpotsMap: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

/** Customize both themes */
const MyLightTheme: Theme = {
  ...NavLight,
  colors: {
    ...NavLight.colors,
    primary: '#1e90ff',
    background: '#ffffff',
    card: '#f8f8f8',
    text: '#1f2937',
    border: '#e5e7eb',
    notification: '#ff3b30',
  },
};

const MyDarkTheme: Theme = {
  ...NavDark,
  colors: {
    ...NavDark.colors,
    primary: '#60a5fa',
    background: '#0b0f14',
    card: '#111827',
    text: '#e5e7eb',
    border: '#1f2937',
    notification: '#f87171',
  },
};

function renderTabBarIcon(routeName: string) {
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    Home: 'home',
    Favorites: 'heart',
    Map: 'map',
  };

  return ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={iconMap[routeName] || 'home'} size={size} color={color} />
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: renderTabBarIcon(route.name),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Map" component={AllSpotsMapScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme(); // 'light' | 'dark' | null
  const theme = scheme === 'dark' ? MyDarkTheme : MyLightTheme;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          style={scheme === 'dark' ? 'light' : 'dark'}
          backgroundColor={theme.colors.background}
          translucent={false}
        />
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeTab"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{ title: 'Surf Spot Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
