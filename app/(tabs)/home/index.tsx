import * as React from 'react';
import { View, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";

import { SearchBar } from '../../../components/SearchBar';
import { HomeCard } from '../../../components/HomeCard';
import { AuthProvider } from '../../../contexts/auth';

const GYM_DATA = [
  {
    id: 1,
    title: "Boruda",
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
  // Do something on submit
  const onSubmitSearch = (query: string) => {
    console.log("hello");
  }

  return (
    <View style={styles.container}>
      <SearchBar searchFunction={onSubmitSearch} />
      <View style={styles.buttons}>
        <Button>Locations</Button>
        <Button>Favourited Places</Button>
      </View>
      <FlatList
        data={GYM_DATA}
        renderItem={({ item }) =>
          <HomeCard
            id={item.id}
            title={item.title}
            coverImage={item.coverImage}
            content={item.content}
          />}
      />
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