import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PlayerProvider } from './src/player/PlayerProvider';
import { ToastProvider } from './src/components/Toast';
import { MiniPlayer } from './src/components/MiniPlayer';
import { HomeScreen } from './src/screens/HomeScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { AIScreen } from './src/screens/AIScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { CollectionScreen } from './src/screens/CollectionScreen';
import { PlaylistScreen } from './src/screens/PlaylistScreen';
import { StatsScreen } from './src/screens/StatsScreen';
import { PlayerScreen } from './src/screens/PlayerScreen';
import type { RootStackParamList, TabParamList } from './src/screens/navigation';
import { colors } from './src/theme';

const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accentBright,
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
              AI: focused ? 'sparkles' : 'sparkles-outline',
              Library: focused ? 'library' : 'library-outline',
            };
            return <Ionicons name={icons[route.name] ?? 'home'} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Search' }} />
        <Tab.Screen name="AI" component={AIScreen} options={{ tabBarLabel: 'TSF AI' }} />
        <Tab.Screen name="Library" component={LibraryScreen} options={{ tabBarLabel: 'Your Library' }} />
      </Tab.Navigator>
      <View style={styles.miniWrap} pointerEvents="box-none">
        <MiniPlayer />
      </View>
    </View>
  );
}

export default function App() {
  const [fontsReady, setFontsReady] = React.useState(false);

  React.useEffect(() => {
    Font.loadAsync({
      'Figtree-400': require('./assets/fonts/Figtree-400.ttf'),
      'Figtree-500': require('./assets/fonts/Figtree-500.ttf'),
      'Figtree-600': require('./assets/fonts/Figtree-600.ttf'),
      'Figtree-700': require('./assets/fonts/Figtree-700.ttf'),
      'Figtree-800': require('./assets/fonts/Figtree-800.ttf'),
      'Figtree-900': require('./assets/fonts/Figtree-900.ttf'),
    })
      .then(() => setFontsReady(true))
      .catch(() => setFontsReady(true)); // render with system font if load fails
  }, []);

  if (!fontsReady) return null;

  return (
    <SafeAreaProvider>
      <ToastProvider>
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
                name="Playlist"
                component={PlaylistScreen}
                options={{ animation: 'slide_from_right' }}
              />
              <Stack.Screen
                name="Stats"
                component={StatsScreen}
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
      </ToastProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabsWrap: { flex: 1, backgroundColor: colors.bg },
  tabBar: {
    backgroundColor: '#0C0C0E',
    borderTopColor: '#1F1F22',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 60,
    paddingTop: 7,
  },
  tabLabel: { fontSize: 10, fontWeight: '700' },
  miniWrap: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 66,
    zIndex: 20,
    elevation: 12,
  },
});
