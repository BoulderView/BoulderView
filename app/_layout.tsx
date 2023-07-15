import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth";
import { Provider } from "react-redux";
import { store } from "../store";

const MainLayout = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthProvider>
    </Provider>
  );
};

export default MainLayout;
