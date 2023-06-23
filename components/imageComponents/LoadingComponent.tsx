import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Props {
  text?:string;
}

const LoadingComponent:React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={"#A5D7E8"} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  text: {
    textAlign:"center",
    color:"white"
  }
})
