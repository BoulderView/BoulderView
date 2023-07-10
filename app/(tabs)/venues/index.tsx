import "react-native-gesture-handler";
import * as React from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from "expo-constants";
import { useCallback, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useSelector } from 'react-redux';

import BottomSheetComponent from "../../../components/BottomSheet/BottomSheetComponent";
import { selectGymList } from "../../../features/gyms/gymListSlice";
import { gymModel } from "../../../models/gymModel";
import { selectGymImageWithName } from "../../../features/gyms/gymImageSlice";
import { RootState } from "../../../store";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {  // boruda climb's location
  latitude: 1.2741,
  longitude: 103.8037,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

const VenueScreen = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const gymListState = useSelector(selectGymList);
  const snapPoints = ['25%'];

  const [selectedGym, setSelectedGym] = useState<gymModel>();

  const handleSnapPress = useCallback((index:number, gym:gymModel) => {
    bottomSheetRef.current?.snapToIndex(index);
    setSelectedGym(gym);
  }, [])

  const router = useRouter();

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        initialRegion={INITIAL_POSITION}
      >
        {gymListState.gymList && gymListState.gymList.map((gym) => {
          const position = {
            latitude: gym.latitude,
            longitude: gym.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
          const gymImage = useSelector((state:RootState)=> selectGymImageWithName(state, gym.name));
          return (
            <Marker
              key={gym.id}
              coordinate={position}
              onPress={() => handleSnapPress(0, gym)}
            >
              <View style={styles.markerIconStyle}>
                <Image
                  source={{ uri: gymImage }} // Replace with the avatar image URL or require the image locally
                  style={styles.markerImageStyle}
                />
              </View>
            </Marker>
          )
        })}
      </MapView>
      {selectedGym && 
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setSelectedGym(undefined)}
        >
          <BottomSheetView>
            <TouchableOpacity onPress={() => router.push({pathname: `/home/${selectedGym.id}`})}>
              <BottomSheetComponent gym={selectedGym}/>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>  
      }
      
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
  },
  markerIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    borderWidth:1,
    borderColor:"#19376D"
  },
  markerImageStyle: {
    width: '100%',
    height: '100%',
  }
});
