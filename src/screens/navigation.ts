import type { Collection, Track } from '../types';
import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Player: undefined;
  Collection: { collection: Collection; tracks: Track[] };
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
};
