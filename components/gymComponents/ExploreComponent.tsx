import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostList, selectPostList } from '../../features/post/postListSlice';

import PostOverviewComponent from '../postComponents/PostOverviewComponent';
import { supabase } from '../../lib/supabase';
import { postModel } from '../../models/postModel';
import NoContentComponent from '../NoContentComponent';


interface Props {
  gymId: string | string[] | undefined;
}

const ExploreComponent: React.FC<Props> = ({ gymId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const postList = useSelector(selectPostList);

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
        dispatch(updatePostList(updatedData));
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

  const handleEmpty = () => {
    return <NoContentComponent />
  }

  const renderItem = ({item}: ListRenderItemInfo<postModel>) => {
    return <PostOverviewComponent postInfo={item}/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={postList}
          numColumns={2}
          keyExtractor={(item) => item.id as string}
          ListEmptyComponent={handleEmpty}
          onRefresh={fetchData}
          refreshing={false}
          maxToRenderPerBatch={4}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default ExploreComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    alignItems: "center",
    flex: 1
  }
})
