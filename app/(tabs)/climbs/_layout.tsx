import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    // AuthProvider goes here
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Climbs",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#19376D",
          },
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
