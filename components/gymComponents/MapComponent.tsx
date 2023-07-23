import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { gymModel } from "../../models/gymModel";
import { supabase } from "../../lib/supabase";
import { ActivityIndicator } from "react-native-paper";

interface Props {
  gymData: gymModel | undefined;
}

const MapComponent: React.FC<Props> = ({ gymData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gymMapImage, setGymMapImage] = useState<string | undefined>();

  const fetchData = async () => {
    try {
      if (!gymData || !gymData.map_url) {
        console.log(gymData);
        console.log(gymData?.map_url);
        return Alert.alert("failed to load gym map");
      }
      const { data, error } = await supabase.storage
        .from("mapImages")
        .download(gymData.map_url);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        const result = fr.result as string;
        setGymMapImage(result);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading map image: ", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && gymData) {
      fetchData();
    }
  }, [gymData]);

  return (
    <View
      style={{ borderWidth: 5, flexShrink: 1, height: "100%", width: "100%" }}
    >
      {isLoading ? (
        <ActivityIndicator style={{width:"100%", height:"100%"}}/>
      ) : (
        <ReactNativeZoomableView maxZoom={30} initialZoom={1.0} minZoom={1.0}>
          <Image
            style={{
              borderWidth: 20,
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            source={{ uri: gymMapImage }}
          />
        </ReactNativeZoomableView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export default MapComponent;
