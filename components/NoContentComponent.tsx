import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoContentComponent = () => {
  return (
    <View style={styles.container}>
      <Text>
        Nothing to see here...
      </Text>
    </View>
  )
}

export default NoContentComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  }
})
