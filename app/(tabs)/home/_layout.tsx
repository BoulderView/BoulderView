import React from 'react';
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    // AuthProvider goes here
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Discover",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: '#19376D'
          },
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          headerTitle: "Explore",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTransparent: true
        }}
      />
    </Stack>
  )
};

export default HomeLayout;
