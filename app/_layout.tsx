import React from 'react';
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth";  // AuthProvider not finished

const MainLayout = () => {
  return (
    // AuthProvider goes here
    <AuthProvider>
      <Stack screenOptions={{
        headerShown: false
      }} />
    </AuthProvider>
  );
};

export default MainLayout;
