import * as React from 'react';
import { View, StyleSheet } from "react-native";

import LocationsComponent from '../../../components/homeComponents/LocationsComponent';
import { TabObject } from '../../../models/TabObject';
import FavouritesComponent from '../../../components/homeComponents/FavouritesComponent';
import TabNavigation from '../../../components/TabNavigation';

export const HomeScreen = () => {
  // Define the tab object
  const tabObject: TabObject = {
    LocationsComponent: {
      title: 'Locations',
      component: <LocationsComponent />,
    },
    FavouritesComponent: {
      title: 'Favourites',
      component: <FavouritesComponent />,
    },
  };

  return (
    <View style={styles.container}>
      <TabNavigation tabObject={tabObject} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttons: {
    alignContent: 'center',
    flexDirection: 'row',
  }
});