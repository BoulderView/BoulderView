import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { HomeCard } from '../HomeCard';
import { SearchBar } from '../SearchBar';

const GYM_DATA = [
  {
    id: 1,
    title: "Boruda Climbing",
    coverImage: require("../../assets/borudaclimbing.jpg"),
    content: "boruda - a concept boulder gym inspired by the Japanese climbing scene."
  },
  {
    id: 2,
    title: "Lighthouse Climbing",
    coverImage: require("../../assets/lighthouse.jpg"),
    content: "Opened in August 2020, Lighthouse is Singapore’s first crowdfunded climbing gym."
  },
  {
    id: 3,
    title: "Fitbloc",
    coverImage: require("../../assets/fitbloc2.png"),
    content: "Singapore's largest indoor fitness and bouldering gym, equipped with 3 rock climbing walls, a weights room, studio and a swimming pool."
  },
  {
    id: 4,
    title: "BoulderPlanet - Tai Seng",
    coverImage: require("../../assets/boulderplanet.png"),
    content: "At Boulder Planet, we live by a simple motto: Nothing Out Of Reach."
  },
  {
    id: 5,
    title: "Boulder+ Chevrons",
    coverImage: require("../../assets/boulderplus.jpg"),
    content: "Aperia Mall is home to boulder+, Singapore's newest bouldering gym. Come see what the fuss is about."
  },
]

const LocationsComponent = () => {
  // Do something on submit
  const onSubmitSearch = (query: string) => {
    console.log("hello");
  }

  return (
    <>
      <SearchBar searchFunction={onSubmitSearch} />
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
    </>
  )
}

export default LocationsComponent;
