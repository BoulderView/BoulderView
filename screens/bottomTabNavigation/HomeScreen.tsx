import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

import { SearchBar } from '../../components/SearchBar';
import { HomeCard } from '../../components/HomeCard';



export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.buttons}>
        <Button>Locations</Button>
        <Button>Favourited Places</Button>
      </View>
      <ScrollView>
        <HomeCard title="Boruda" coverImage={require('../../assets/borudaclimbing.jpg')} content='boruda - a concept boulder gym inspired by the Japanese climbing scene.' ></HomeCard>
        <HomeCard title="Lighthouse Climbing" coverImage={require("../../assets/lighthouse.jpg")} content="Opened in August 2020, Lighthouse is Singapore’s first crowdfunded climbing gym."></HomeCard>
        <HomeCard title="Fitbloc" coverImage={require("../../assets/fitbloc2.png")} content="Singapore's largest indoor fitness and bouldering gym, equipped with 3 rock climbing walls, a weights room, studio and a swimming pool."></HomeCard>
        <HomeCard title="Boulder Planet - Tai Seng" coverImage={require('../../assets/boulderplanet.png')} content='At Boulder Planet, we live by a simple motto: Nothing Out Of Reach.'></HomeCard>
        <HomeCard title="Boulder+ Chevrons" coverImage={require('../../assets/boulderplus.jpg')} content="Aperia Mall is home to boulder+, Singapore's newest bouldering gym. Come see what the fuss is about."></HomeCard>
      </ScrollView>
    </View >
  );
}

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
