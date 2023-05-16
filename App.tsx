import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenNavigation } from './screens/bottomTabNavigation/ScreenNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ScreenNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
