import React from 'react';
import { NativeRouter, Routes, Route } from 'react-router-native';
import TabNavigation from './TabNavigation';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import { View } from 'react-native';

const Router: React.FC = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route
          path="/"
          element={
            <View style={{ flex: 1 }}>
              <TabNavigation />
              <Routes>
                <Route path="/" element={<Tab1 />} />
                <Route path="/tab1" element={<Tab1 />} />
                <Route path="/tab2" element={<Tab2 />} />
                <Route path="/tab3" element={<Tab3 />} />
              </Routes>
            </View>
          }
        />
      </Routes>
    </NativeRouter>
  );
};

export default Router;