import * as React from 'react';
import { Text, View, StyleSheet, Button } from "react-native";

export const VenueScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => alert("This is the venue screen")}
        style={styles.text}>Venue Screen</Text>
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
