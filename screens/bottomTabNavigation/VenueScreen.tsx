import * as React from 'react';
import { Text, View, StyleSheet, Button, Dimensions, Platform, StatusBar } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SearchBar } from '../../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {  // boruda climb's location
  latitude: 1.2741,
  longitude: 103.8037,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

export const VenueScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        initialRegion={INITIAL_POSITION}/>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: Constants.statusBarHeight + 10,
  },
});
