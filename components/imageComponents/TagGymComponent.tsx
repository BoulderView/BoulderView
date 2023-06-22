import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { List, Divider, IconButton, Searchbar } from 'react-native-paper';

import { supabase } from '../../lib/supabase';
import { gymModel } from '../../models/gymModel';
import LoadingComponent from './LoadingComponent';

interface Props {
  setIsSelectingGym: Dispatch<SetStateAction<boolean>>;
  setSelectedGym: Dispatch<SetStateAction<gymModel | undefined>>;
}

const TagGymComponent:React.FC<Props> = ({ setIsSelectingGym, setSelectedGym }) => {

  const [displayGyms, setDisplayGyms] = useState<gymModel[]>();
  const [searchGyms, setSearchGyms] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Do something on submit
  const fetchGyms = async () => {
    try {
      let { data, error, status } = await supabase
        .from('gym')
        .select();

      // If there is any form of error
      if (error || status !== 200) {
        throw error;
      }

      if (data) {
        // Casting data to gymModel
        const updatedData = data as gymModel[];
        let filteredData = updatedData
        if (searchGyms !== "") {
          filteredData = filteredData?.filter((gym) =>
            gym.name.toLowerCase().includes(searchGyms.toLowerCase())
          );
        }
        setDisplayGyms(filteredData);
      }

    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGyms();
  }, [searchGyms])

  const selectGym = (selectedGym:gymModel) => {
    setSelectedGym(selectedGym);
    setIsSelectingGym(false);
  }

  const renderGym = ({ item }: { item: gymModel }) => (
    <>
      <List.Item
        title={item.name}
        description={item.description}
        left={(props) => <List.Icon {...props} icon="folder" />}
        onPress={() => selectGym(item)}
      />
      <Divider />
    </>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingComponent />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <IconButton
          icon="arrow-left"
          iconColor="white"
          containerColor="#576CBC"
          size={25}
          mode="contained"
          onPress={() => setIsSelectingGym(false)}
        />
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchGyms}
          value={searchGyms}
          style={styles.searchBar}
        />
      </View>
      <View style={styles.scrollView}>
        <Divider />
        <FlatList
          data={displayGyms}
          renderItem={renderGym}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  )
}

export default TagGymComponent;

const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchContainer:{
    flexDirection:"row",
    width:"100%",
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  searchBar: {
    width:"80%",
    margin:10
  },
  scrollView:{
    width:"100%",
    flex:1
  }
})
