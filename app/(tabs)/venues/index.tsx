import "react-native-gesture-handler";
import * as React from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { SearchBar } from '../../../components/SearchBar';
import Constants from "expo-constants";
import { useCallback, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { BottomSheetComponent } from "../../../components/BottomSheet/BottomSheetComponent";

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

// Dummy data
const data: { [key : string] : {position : Region }} = {
  "boruda" : {
    "position" : {
      latitude: 1.2741,
      longitude: 103.8037,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  },
  "Fit Bloc" : {
    "position" : {
      latitude: 1.287825,
      longitude: 103.790536,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  }
}

const VenueScreen = () => {
  const [region, setRegion] = useState(INITIAL_POSITION);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);

  const snapPoints = ['30%'];

  const handleSnapPress = useCallback((index:number) => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, [])

  // Do something on submit
  const onSubmitSearch = (query:string) => {
    console.log("hello");
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        initialRegion={INITIAL_POSITION}
        onRegionChange={setRegion}
      >
      {Object.keys(data).map((key) => { // iterating through the dummy data
          const item = data[key];
          const position = item.position;
          return (
            <Marker
              key={key}
              coordinate={position}
              title={key}
              onPress={() => handleSnapPress(0)}
            />
          );
        })}
      </MapView>
      <View style={styles.searchBarContainer}>
        <SearchBar searchFunction={onSubmitSearch}/>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
      >
        <BottomSheetView>
          <BottomSheetComponent />
        </BottomSheetView>
      </BottomSheet>  
    </View>
  );
};

export default VenueScreen;

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
  secondaryView : {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  }
});
