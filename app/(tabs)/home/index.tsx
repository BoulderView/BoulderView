import * as React from 'react';
import { View, StyleSheet, Alert } from "react-native";
import LocationsComponent from '../../../components/homeComponents/LocationsComponent';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { selectSession, updateProfile, updateSession } from '../../../features/profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { profileModel } from '../../../models/profileModel';

export const HomeScreen = () => {

  const dispatch = useDispatch();
  const session = useSelector(selectSession);

  const [isLoading, setIsLoading] = useState(false);

  async function getProfile() {
    try {
      if (!session) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        const updatedData = data as profileModel;
        dispatch(updateProfile(updatedData));
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (!session) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        dispatch(updateSession(session));
      })
    }
    if (!isLoading && session) {
      setIsLoading(true);
      getProfile();
    }
  }, [session])

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
