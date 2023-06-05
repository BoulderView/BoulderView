import * as React from 'react';
import { Text, View, StyleSheet, Button } from "react-native";

import { MonthlyBarChart } from '../../../components/MonthlyBarChart';

// Still a work in progress
const ClimbsScreen = () => {
  return (
    <View style={styles.container}>
      <MonthlyBarChart />
      <Text
        onPress={() => alert("This is the climbs screen")}
        style={styles.text}>Climbs Screen</Text>
    </View>
  );
};

export default ClimbsScreen;

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
