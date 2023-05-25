import * as React from 'react';
import { Text, View, StyleSheet } from "react-native";

const PostScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => alert("This is the saved screen")}
        style={styles.text}>Post videos and images here</Text>
    </View>
  );
};

export default PostScreen;

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
