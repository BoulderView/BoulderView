import * as React from 'react';
import { Text, View, StyleSheet, Button } from "react-native";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => alert("This is the home screen")}
        style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26
  }
});
