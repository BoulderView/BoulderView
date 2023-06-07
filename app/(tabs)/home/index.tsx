import * as React from 'react';
import { View, StyleSheet, FlatList } from "react-native";
import { useRoute } from '@react-navigation/native';

import { SearchBar } from '../../../components/SearchBar';
import LocationsComponent from '../../../components/homeComponents/LocationsComponent';
import { TabObject } from '../../../models/TabObject';
import FavouritesComponent from '../../../components/homeComponents/FavouritesComponent';
import TabNavigation from '../../../components/TabNavigation';
import { HomeCard } from '../../../components/HomeCard';
import { useEffect } from 'react';

const GYM_DATA = [
  {
    id: 1,
    title: "Boruda Climbing",
    coverImage: require("../../../assets/borudaclimbing.jpg"),
    content: "boruda - a concept boulder gym inspired by the Japanese climbing scene."
  },
  {
    id: 2,
    title: "Lighthouse Climbing",
    coverImage: require("../../../assets/lighthouse.jpg"),
    content: "Opened in August 2020, Lighthouse is Singapore’s first crowdfunded climbing gym."
  },
  {
    id: 3,
    title: "Fitbloc",
    coverImage: require("../../../assets/fitbloc2.png"),
    content: "Singapore's largest indoor fitness and bouldering gym, equipped with 3 rock climbing walls, a weights room, studio and a swimming pool."
  },
  {
    id: 4,
    title: "BoulderPlanet - Tai Seng",
    coverImage: require("../../../assets/boulderplanet.png"),
    content: "At Boulder Planet, we live by a simple motto: Nothing Out Of Reach."
  },
  {
    id: 5,
    title: "Boulder+ Chevrons",
    coverImage: require("../../../assets/boulderplus.jpg"),
    content: "Aperia Mall is home to boulder+, Singapore's newest bouldering gym. Come see what the fuss is about."
  },
]

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
      <TabNavigation tabObject={tabObject}/>
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