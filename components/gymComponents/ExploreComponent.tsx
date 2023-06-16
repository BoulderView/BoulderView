import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { SearchBar } from '../SearchBar';
import PostOverviewComponent from '../postComponents/PostOverviewComponent';

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

  return (
    <View style={styles.container}>
      <SearchBar searchFunction={onSubmitSearch} placeholder='Search posts' />
      <View style={styles.flatListContainer}>
        <FlatList
          data={POST_DATA}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <PostOverviewComponent
              image={item.image}
              caption={item.caption}
              name={item.name}
              likes={item.likes}
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
