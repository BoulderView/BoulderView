import { Stack } from 'expo-router';
import React, { createRef, forwardRef, useRef } from 'react';
import { 
  StyleSheet, 
  View  } from 'react-native';
import { Button } from 'react-native-paper';
import Router from '../../../components/Router';

const GYM_DATA = [
  {
    id: 1,
    title: "Boruda Climbing", 
    coverImage: require("../../../assets/borudaclimbing.jpg"), 
    content: "boruda - a concept boulder gym inspired by the Japanese climbing scene.",
    rating: 4.7,
    followerCount: 150
  },
  { 
    id: 2,
    title: "Lighthouse Climbing", 
    coverImage: require("../../../assets/lighthouse.jpg"), 
    content: "Opened in August 2020, Lighthouse is Singapore’s first crowdfunded climbing gym.",
    rating: 4.7,
    followerCount: 150
  },
  { 
    id: 3,
    title: "Fitbloc", 
    coverImage: require("../../../assets/fitbloc2.png"), 
    content: "Singapore's largest indoor fitness and bouldering gym, equipped with 3 rock climbing walls, a weights room, studio and a swimming pool.",
    rating: 4.7,
    followerCount: 150
  },
  { 
    id: 4,
    title: "BoulderPlanet - Tai Seng", 
    coverImage: require("../../../assets/boulderplanet.png"), 
    content: "At Boulder Planet, we live by a simple motto: Nothing Out Of Reach.",
    rating: 4.7,
    followerCount: 150
  },
  { 
    id: 5,
    title: "Boulder+ Chevrons", 
    coverImage: require("../../../assets/boulderplus.jpg"), 
    content: "Aperia Mall is home to boulder+, Singapore's newest bouldering gym. Come see what the fuss is about.",
    rating: 4.7,
    followerCount: 150
  },
]

const GymDetailsPage = () => {
  // does not work for some reason
  // const { id } = useSearchParams();

  const id = 1
  const data = GYM_DATA[0]

  const handleButtonPress = () => {
    console.log("Pressed")
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        headerTitle:data.title,
        headerRight: () => (
          <Button icon="bookmark-outline" mode="contained" onPress={handleButtonPress}>
            {data.followerCount}
          </Button>
        ),
        headerStyle: {
          backgroundColor: '#576CBC', // Replace with your desired color
        },
        headerTintColor: 'white', // Replace with your desired color for the button
      }} />
      <Router />
    </View>
  )
};

export default GymDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:"center",
  }
});
