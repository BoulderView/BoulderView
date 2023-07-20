import { PortalProvider } from "@gorhom/portal";
import { render } from "@testing-library/react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { setupStore } from "../store";

/*
This is a wrapper for provider for jest
*/
export function renderWithProviders(ui: React.ReactElement) {
  const preloadedState = {};
  const store = setupStore(preloadedState);

  return render(
    // Missing auth provider
    <Provider store={store}>
      <PortalProvider>
        <SafeAreaProvider>
          {ui}
        </SafeAreaProvider>
      </PortalProvider>
    </Provider>
  );
}
