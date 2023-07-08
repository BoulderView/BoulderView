import * as React from 'react';
import { View, StyleSheet } from "react-native";

import LocationsComponent from '../../../components/homeComponents/LocationsComponent';
import { useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { updateSession } from '../../../features/profile/profileSlice';
import { useDispatch } from 'react-redux';

export const HomeScreen = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(updateSession(session));
    })
  }, [])

  return (
    <View style={styles.container}>
      <LocationsComponent />
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