import React from 'react';
import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth";  // AuthProvider not finished

const MainLayout = () => {
  return (
    // AuthProvider goes here
    <Stack>
      {/* removing the (tabs) header */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
};

export default MainLayout;
