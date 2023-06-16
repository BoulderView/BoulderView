import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { HomeCard } from '../HomeCard';
import { SearchBar } from '../SearchBar';
import { supabase } from '../../lib/supabase';
import { Alert } from 'react-native';
import { gymModel } from '../../models/gymModel';

const LocationsComponent = () => {
  // Do something on submit
  const onSubmitSearch = (query: string) => {
    console.log("hello");
  }

  const [gymData, setGymData] = useState<gymModel[]>();

  useEffect(() => {
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
          setGymData(updatedData);
        }
  
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
      <SearchBar searchFunction={onSubmitSearch} placeholder='search'/>
      <FlatList
        data={gymData}
        renderItem={({ item }) =>
          <HomeCard
            id={item.id}
            title={item.name}
            coverImage={item.cover_image_url.trim()}
            content={item.description}
          />}
      />
    </>
  )
}

export default LocationsComponent;
