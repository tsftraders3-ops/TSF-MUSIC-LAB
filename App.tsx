import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PlayerProvider } from './src/player/PlayerProvider';
import { MiniPlayer } from './src/components/MiniPlayer';
import { HomeScreen } from './src/screens/HomeScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { CollectionScreen } from './src/screens/CollectionScreen';
import { PlayerScreen } from './src/screens/PlayerScreen';
import type { RootStackParamList, TabParamList } from './src/screens/navigation';
import { colors } from './src/theme';

const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accent,
    background: colors.bg,
    card: colors.bg,
    text: colors.text,
    border: colors.border,
    notification: colors.accent,
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabsScreen() {
  return (
    <View style={styles.tabsWrap}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.textFaint,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ color, focused }) => {
            const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
              Home: focused ? 'home' : 'home-outline',
              Search: focused ? 'search' : 'search-outline',
              Library: focused ? 'library' : 'library-outline',
            };
            return <Ionicons name={icons[route.name] ?? 'home'} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Search' }} />
        <Tab.Screen name="Library" component={LibraryScreen} options={{ tabBarLabel: 'Library' }} />
      </Tab.Navigator>
      <View style={styles.miniWrap} pointerEvents="box-none">
        <MiniPlayer />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PlayerProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" backgroundColor={colors.bg} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.bg },
            }}
          >
            <Stack.Screen name="Tabs" component={TabsScreen} />
            <Stack.Screen
              name="Collection"
              component={CollectionScreen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Player"
              component={PlayerScreen}
              options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PlayerProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabsWrap: { flex: 1, backgroundColor: colors.bg },
  tabBar: {
    backgroundColor: '#0D0D10',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 58,
    paddingTop: 6,
  },
  tabLabel: { fontSize: 10, fontWeight: '700' },
  miniWrap: {
    position: 'absolute',
    left: 6,
    right: 6,
    bottom: 60,
    zIndex: 20,
    elevation: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
});
