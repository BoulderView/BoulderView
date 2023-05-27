import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from "react-native";
import { supabase } from '../../../lib/supabase';
import { Button } from 'react-native-paper';

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState();

  return (
    <View style={styles.container}>
      <Text
        onPress={() => alert("This is the profile screen")}
        style={styles.text}>Profile Screen</Text>
      <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
    </View>
  );
};

export default ProfileScreen;

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
