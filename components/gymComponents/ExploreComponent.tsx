import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';

import { SearchBar } from '../SearchBar';
import PostOverviewComponent from '../postComponents/PostOverviewComponent';
import { supabase } from '../../lib/supabase';
import { postModel } from '../../models/postModel';

const POST_DATA = [
  {
    id: 1,
    image: require("./../../assets/postImages/climbing-sample.jpg"),
    caption: "Climbing is cool",
    name: "Alex Honnold",
    likes: 1500
  },
  {
    id: 2,
    image: require("./../../assets/postImages/climbing-sample.jpg"),
    caption: "Climbing is hot",
    name: "Alex Honnold",
    likes: 1500
  },
  {
    id: 3,
    image: require("./../../assets/postImages/climbing-sample.jpg"),
    caption: "Climbing is sexy",
    name: "Alex Honnold",
    likes: 1500
  },
  {
    id: 4,
    image: require("./../../assets/postImages/climbing-sample.jpg"),
    caption: "Climbing is life",
    name: "Alex Honnold",
    likes: 1500
  },
  {
    id: 5,
    image: require("./../../assets/postImages/climbing-sample.jpg"),
    caption: "Climbing is everything",
    name: "Alex Honnold",
    likes: 1500
  }
]

const ExploreComponent: React.FC = () => {
  // Do something on submit
  const onSubmitSearch = (query: string) => {
    console.log("hello");
  }

  const [postData, setPostData] = useState<postModel[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data, error, status } = await supabase
          .from('post')
          .select();
  
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
      }
    };
  
    fetchData();
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
              imageUrl={item.post_image_url}
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
    alignItems:"center"
  }
})
