import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { Avatar } from 'react-native-paper';

interface Props{
  title: string,
  rating: number,
  followerCount: number,
  image: ImageSourcePropType
}

const GymHeader = (props:Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarView}>
        <Avatar.Image size={60} source={props.image} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.title}</Text>
          <Text style={styles.text}>{props.rating} / 5.0</Text>
          <Text style={styles.text}>{props.followerCount} Followers</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Follow</Text>
          <Text style={styles.text}>Share</Text>
          <Text style={styles.text}>Chat</Text>
        </View>
      </View>
    </View>
  );
};

export default GymHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    backgroundColor: '#576CBC',
    height:80,
    width:"100%"
  },
  contentContainer: {
    flex:0.75,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    margin: 10
  },
  avatarView: {
    justifyContent:"center",
    margin:5
  },
  textContainer: {
    justifyContent:"space-evenly",
    height:"100%"
  },
  text: {
    color:"white"
  }
});
