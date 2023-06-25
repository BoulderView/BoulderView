import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { selectPostList, updatePostList } from '../../features/post/postListSlice';

import { supabase } from '../../lib/supabase';
import { postModel } from '../../models/postModel';
import PostOverviewComponent from '../postComponents/PostOverviewComponent';

const HistoryComponent = () => {
  const [postData, setPostData] = useState<postModel[]>();

  const dispatch = useDispatch();
  const postList = useSelector(selectPostList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        let { data, error, status } = await supabase
          .from('post')
          .select()
          .eq('profile_id', user?.id);

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
      }
    };

    fetchData();
  }, []);
  return (
    <View>
      <FlatList
        data={postList}
        numColumns={2}
        keyExtractor={(item) => item.id as string}
        renderItem={({ item }) =>
          <PostOverviewComponent
            postInfo={item}
          />
        }
      />
    </View >
  )
}

export default HistoryComponent;
