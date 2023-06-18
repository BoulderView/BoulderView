import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const PermissionsLoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={"#A5D7E8"} />
      <Text style={styles.text}>
        Getting permissions...
      </Text>
    </View>
  )
}

export default PermissionsLoadingComponent;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  text: {
    textAlign:"center",
    color:"white"
  }
})
