import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageSourcePropType } from 'react-native';

// Calculating the screen and maintaining an aspect ratio
const { width } = Dimensions.get('window');
const containerWidth = width * 0.45;
const containerHeight = containerWidth * (16 / 9);

interface Props {
  image:ImageSourcePropType;
  caption:string;
  name:string;
  likes:number;
}

const PostOverviewComponent = (props:Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Image 
          source={props.image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text>{props.caption}</Text>
        <View style={styles.bottomView}>
          <Text style={styles.title}>{props.name}</Text>
          <Text>❤️{props.likes}</Text>
        </View>
      </View>
    </View>
  )
};

export default PostOverviewComponent;

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    width:containerWidth,
    height:containerHeight,
    padding:5,
    margin:5
  },
  bottomView: {
    flexDirection:"row",
    flex:0,
    justifyContent:"space-between",
  },
  bottomContainer: {
    width:"100%",
    height:"20%",
    margin:5,
    justifyContent: 'space-between',
    padding:5
  },
  postContainer: {
    width:"100%",
    height:"80%",
    alignItems:"center"
  },
  image: {
    width:"100%",
    height:"100%",
    borderRadius:8
  },
  title: {
    fontWeight:"bold"
  }
})
