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
            backgroundColor: '#576CBC'
          },
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          headerTitle: "Explore",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: '#576CBC'
          },
        }}
      />
    </Stack>
  )
};

export default HomeLayout;
