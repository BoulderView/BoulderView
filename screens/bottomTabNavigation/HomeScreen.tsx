import * as React from 'react';
import { Text, View, StyleSheet, Button } from "react-native";

import { SearchBar } from '../../components/SearchBar';

export const HomeScreen = () => {
  return (
    <View style={styles.container}> 
      <SearchBar />
      <Text>This is bottom text.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "white"
  }
});
