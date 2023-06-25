import React from "react";
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
          headerTitle: "Climbs",
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
