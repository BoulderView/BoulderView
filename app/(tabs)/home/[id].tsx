import { Stack, useSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GymDetailsPage = () => {
  const { id } = useSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: `News #${id}` }} />
      <Text style={styles.text}>Id: {id}</Text>
    </View>
  )
};

export default GymDetailsPage;

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
