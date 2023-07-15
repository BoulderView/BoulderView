import { Stack, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import TabNavigation from "../../../components/TabNavigation";
import ExploreComponent from "../../../components/gymComponents/ExploreComponent";
import LeaderboardComponent from "../../../components/gymComponents/LeaderboardComponent";
import MapComponent from "../../../components/gymComponents/MapComponent";
import { supabase } from "../../../lib/supabase";
import { TabObject } from "../../../models/TabObject";
import { gymModel } from "../../../models/gymModel";

const GymDetailsPage = () => {
  const { id } = useSearchParams();

  const [gymData, setGymData] = useState<gymModel>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchGymData = async () => {
    try {
      let { data, error, status } = await supabase
        .from("gym")
        .select()
        .eq("id", id)
        .single();

      // If there is any form of error
      if (error || status !== 200) {
        throw error;
      }

      if (data) {
        // Casting data to gymModel
        const updatedData = data as gymModel;
        setGymData(updatedData);
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      fetchGymData();
    }
  }, []);

  // Define the tab object
  const tabObject: TabObject = {
    MapComponent: {
      title: "Map",
      component: <MapComponent />,
    },
    ExploreComponent: {
      title: "Explore",
      component: <ExploreComponent gymId={id} />,
    },
    LeaderboardComponent: {
      title: "Leaderboard",
      component: <LeaderboardComponent />,
    },
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: gymData ? gymData.name : "",
          headerStyle: {
            backgroundColor: "#19376D", // Replace with your desired color
          },
          headerTintColor: "white", // Replace with your desired color for the button
        }}
      />
      <TabNavigation tabObject={tabObject} />
    </View>
  );
};

export default GymDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
