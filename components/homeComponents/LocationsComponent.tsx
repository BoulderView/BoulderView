import React, { useEffect, useState } from "react";
import { Alert, ListRenderItem, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../lib/supabase";

import { selectGymList, updateGymList } from "../../features/gyms/gymListSlice";
import { gymModel } from "../../models/gymModel";
import HomeCard from "./HomeCard";
import { SearchBar } from "../miscComponents/SearchBar";
import LoadingComponent from "../imageComponents/LoadingComponent";

const LocationsComponent = () => {
  // Do something on submit
  const onSubmitSearch = (query: string) => {
    console.log("hello");
  };

  const gymList = useSelector(selectGymList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      let { data, error, status } = await supabase.from("gym").select();

      // If there is any form of error
      if (error || status !== 200) {
        throw error;
      }

      if (data) {
        // Casting data to gymModel
        const updatedData = data as gymModel[];
        // Updating the state in store
        dispatch(updateGymList(updatedData));
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (gymList.length === 0 && !isLoading) {
      setIsLoading(true);
      fetchData();
    }
  }, []);

  const handleEmpty = () => {
    return <LoadingComponent />;
  };

  const renderItem: ListRenderItem<gymModel> = ({ item }) => {
    return (
      <HomeCard
        id={item.id}
        name={item.name}
        coverImage={item.cover_image_url.trim()}
        description={item.description}
      />
    );
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <SearchBar searchFunction={onSubmitSearch} placeholder="Search" />
      </View>
      <FlatList
        data={gymList}
        ListEmptyComponent={handleEmpty}
        renderItem={renderItem}
        onRefresh={fetchData}
        refreshing={false}
      />
    </>
  );
};

export default LocationsComponent;

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
  },
});
