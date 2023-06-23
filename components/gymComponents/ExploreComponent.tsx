import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';

import { SearchBar } from '../SearchBar';
import PostOverviewComponent from '../postComponents/PostOverviewComponent';
import { supabase } from '../../lib/supabase';
import { postModel } from '../../models/postModel';

interface Props {
  gymId:string|string[]|undefined;
  postData?:postModel[]
}

const ExploreComponent: React.FC<Props> = ({ gymId }) => {
  // Do something on submit
  const onSubmitSearch = (query: string) => {
    console.log("hello");
  }

  const [postData, setPostData] = useState<postModel[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      let { data, error, status } = await supabase
        .from('post')
        .select()
        .eq('gym_id', gymId);

      // If there is any form of error
      if (error || status !== 200) {
        throw error;
      }

      if (data) {
        // Casting data to gymModel
        const updatedData = data as postModel[];
        setPostData(updatedData);
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
      fetchData();
    }
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar searchFunction={onSubmitSearch} placeholder='Search posts' />
      <View style={styles.flatListContainer}>
        <FlatList
          data={postData}
          numColumns={2}
          keyExtractor={(item) => item.id as string}
          renderItem={({ item }) =>
            <PostOverviewComponent
              videoUrl={item.post_video_url}
              thumbnailUrl={item.post_thumbnail_url}
              caption={item.caption}
              profileId={item.profile_id}
              likes={item.likes}
              selectedGrade={item.selected_grade}
              createdAt={item.created_at}
            />}
        />
      </View>
    </View>
  );
};

export default ExploreComponent;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  flatListContainer: {
    alignItems:"center",
    flex:1
  }
})
