import * as React from 'react';
import { View, StyleSheet } from "react-native";

import LocationsComponent from '../../../components/homeComponents/LocationsComponent';
import { TabObject } from '../../../models/TabObject';
import FavouritesComponent from '../../../components/homeComponents/FavouritesComponent';
import TabNavigation from '../../../components/TabNavigation';
import { useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { updateSession } from '../../../features/profile/profileSlice';
import { useDispatch } from 'react-redux';

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

  const dispatch = useDispatch();
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(updateSession(session));
      console.log("hello");
    })
  }, [])

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