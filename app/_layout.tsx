import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth";
import { Provider } from "react-redux";
import { store } from "../store";
import { PortalProvider } from '@gorhom/portal';

const MainLayout = () => {
  return (
    <Provider store={store}>
      <PortalProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </AuthProvider>
      </PortalProvider>
    </Provider>
  );
};

export default MainLayout;
