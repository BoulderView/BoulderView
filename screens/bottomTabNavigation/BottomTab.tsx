import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { VenueScreen } from './VenueScreen';
import { ProfileScreen } from './ProfileScreen';
import { ClimbsScreen } from './ClimbsScreen';
import { SavedScreen } from './SavedScreen';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Venue" component={VenueScreen} />
      <Tab.Screen name="Climbs" component={ClimbsScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
