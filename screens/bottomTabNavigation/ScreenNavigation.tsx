import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from './HomeScreen';
import { VenueScreen } from './VenueScreen';
import { ProfileScreen } from './ProfileScreen';
import { ClimbsScreen } from './ClimbsScreen';
import { SavedScreen } from './SavedScreen';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

// Screen navigation with bottom tab bar
export const ScreenNavigation: React.FC = () => {
  return (
    <Tab.Navigator 
      initialRouteName='Home' 
      screenOptions={{
        tabBarActiveTintColor:"black",
        tabBarInactiveTintColor:"white",
        tabBarInactiveBackgroundColor:"#0B2447",
        tabBarActiveBackgroundColor:"#A5D7E8",
        tabBarLabelStyle:{
          fontSize:15,
          fontFamily:"notoserif"
        },
        headerStyle: {
          backgroundColor: '#fff'
        },
        headerTintColor: '#0B2447',
        headerTitleStyle: {
          fontSize: 30
        },
        headerTitleAlign: 'center',
        tabBarHideOnKeyboard: Platform.OS!== 'ios'  // disabled for ios
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home-outline" color={color} size={size} />
        )
      }}/>
      <Tab.Screen name="Venue" component={VenueScreen} options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="location-outline" color={color} size={size} />
        ),
        headerShown:false
      }}/>
      <Tab.Screen name="Climbs" component={ClimbsScreen} options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="stats-chart-outline" color={color} size={size} />
        )
      }}/>
      <Tab.Screen name="Saved" component={SavedScreen} options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="bookmark-outline" color={color} size={size} />
        )
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="person-circle-outline" color={color} size={size} />
        )
      }}/>
    </Tab.Navigator>
  );
};