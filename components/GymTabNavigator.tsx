import React from 'react';
import { View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function Home() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

function Content() {
  return (
    <View>
        <Text>Home</Text>
    </View>
  )
}

function Profile() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home"
        }}
      />
      <Tab.Screen
        name="Content"
        component={Content}
        options={{
          tabBarLabel: "Content"
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile"
        }}
      />
    </Tab.Navigator>
  )
}

const GymTabNavigation = () => {
  return (
    <MyTabs />
  )
}

export default GymTabNavigation;
