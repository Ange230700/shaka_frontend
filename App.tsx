// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'shakafront/screens/HomeScreen';
import FavoritesScreen from 'shakafront/screens/FavoritesScreen';
import DetailScreen from 'shakafront/screens/DetailScreen';
import AllSpotsMapScreen from 'shakafront/screens/AllSpotsMapScreen';
import { Ionicons } from '@expo/vector-icons';

export type RootStackParamList = {
  HomeTab: undefined;
  Detail: { surfSpotId: string };
  AllSpotsMap: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function renderTabBarIcon(routeName: string) {
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    Home: 'home',
    Favorites: 'heart',
    Map: 'map',
  };

  return ({ color, size }: { color: string; size: number }) => (
    <Ionicons
      name={iconMap[routeName] || 'home'}
      size={size}
      color={color}
    />
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
  return (
    <NavigationContainer>
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
  );
}
