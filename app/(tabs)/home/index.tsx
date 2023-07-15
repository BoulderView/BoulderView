import * as React from "react";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LocationsComponent from "../../../components/homeComponents/LocationsComponent";
import {
  selectSession,
  updateProfile,
  updateSession,
} from "../../../features/profile/profileSlice";
import { supabase } from "../../../lib/supabase";
import { profileModel } from "../../../models/profileModel";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);

  const [isLoading, setIsLoading] = useState(false);

  async function getProfile() {
    try {
      if (!session) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select()
        .eq("id", session?.user.id)
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
      });
    }
    if (!isLoading && session) {
      setIsLoading(true);
      getProfile();
    }
  }, [session]);

  return (
    <View style={styles.container}>
      <LocationsComponent />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttons: {
    alignContent: "center",
    flexDirection: "row",
  },
});
