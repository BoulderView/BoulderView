import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { BottomSheetContentComponent } from './BottomSheetContentComponent';

const data = {
  "name": "Boruda Climb",
  "desc": "Movement beyond boundaries",
  "distance": "8 mins away",
  "address": "991A Alexandra Rd, Singapore 119969",
  "opening": "Thursday, 11.30am - 10.30pm"
}

const BottomSheetComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Avatar.Image size={60} source={require('../../assets/gymIcons/boruda.jpg')} />
        <View>
          <Text style={styles.title}>
            {data.name}
          </Text>
          <Text style={styles.subtitle}>
            {data.desc}
          </Text>
        </View>
        <Text>
          {data.distance}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <BottomSheetContentComponent icon="map-marker" content={data.address} name="Address"/>
        <BottomSheetContentComponent icon="clock-time-four-outline" content={data.opening} name="Opening hours"/>
      </View>
    </View>
  )
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleContainer: {
    height:'35%',
    width: '100%',
    flexDirection:"row",
    margin: 5
  },
  title: {
    fontSize: 30
  },
  subtitle: {
    fontSize: 20
  },
  contentContainer: {
    height:'65%',
    width: '100%',
    margin: 5
  }
});
