import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, ActivityIndicator } from 'react-native-paper';
import { gymModel } from '../../models/gymModel';
import { useSelector } from 'react-redux';
import { selectGymImageWithName } from '../../features/gyms/gymImageSlice';
import { RootState } from '../../store';

interface Props {
  gym:gymModel,
}

const BottomSheetComponent:React.FC<Props> = ({gym}) => {

  const gymImage = useSelector((state:RootState)=> selectGymImageWithName(state, gym.name));

  if (!gymImage) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Avatar.Image size={60} source={{uri:gymImage}} style={{
          margin:5
        }} />
        <View style={{width:"80%"}}>
          <Text style={styles.title}>
            {gym.name}
          </Text>
          <Text style={styles.text}>
            {gym.description}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentComponentContainer}>
          <Avatar.Icon 
            size={60} 
            color="black" 
            icon={"map-marker"}
            style={{
              backgroundColor:"#A5D7E8"
            }}
          />
          <View style={{marginHorizontal:5, width:"80%"}}>
            <Text style={styles.subtitle}>Address</Text>
            <Text style={styles.text}>{gym.address}</Text>
          </View>
        </View>
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
    width:'100%',
    flexDirection:"row",
    margin: 5,
    alignItems:"center",
    marginBottom: 20
  },
  title: {
    fontSize: 25,
    marginHorizontal:10
  },
  subtitle: {
    fontSize: 15,
    width:"50%",
    marginHorizontal:10
  },
  contentContainer: {
    height:'65%',
    width: '100%',
    margin: 5
  },
  text: {
    fontSize: 12,
    marginHorizontal:10
  },
  contentComponentContainer: {
    flexDirection:'row',
    margin:5,
    alignItems:"center"
  }
});
