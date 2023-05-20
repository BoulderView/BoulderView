import * as React from 'react';
import { Text, View, StyleSheet } from "react-native";

import { SearchBar } from '../../components/SearchBar';

export const HomeScreen = () => {
  const onSubmitSearch = (query:string) => {
    console.log("hello");
  }

  return (
    <View style={styles.container}> 
      <SearchBar searchFunction={onSubmitSearch}/>
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
