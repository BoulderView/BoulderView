import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { supabase } from '../../lib/supabase';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { HomeCard } from '../HomeCard';
import { SearchBar } from '../SearchBar';
import { gymModel } from '../../models/gymModel';
import { selectGymList, updateGymList } from '../../features/gyms/gymListSlice';
import LoadingComponent from '../imageComponents/LoadingComponent';

const LocationsComponent = () => {
  // Do something on submit
  const onSubmitSearch = (query: string) => {
    console.log("hello");
  }

  const gymListState = useSelector(selectGymList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
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
    if (gymListState.gymList === undefined && !isLoading) {
      setIsLoading(true);
      fetchData();
    }
  }, []);

  return (
    <>
      <SearchBar searchFunction={onSubmitSearch} placeholder='Search'/>
      {gymListState.gymList === undefined
        ? <LoadingComponent />
        : <FlatList
            data={gymListState.gymList}
            renderItem={({ item }) =>
              <HomeCard
                id={item.id}
                name={item.name}
                coverImage={item.cover_image_url.trim()}
                description={item.description}
              />}
          />
      }
    </>
  )
}

export default LocationsComponent;
