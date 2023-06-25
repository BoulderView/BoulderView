import React from "react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, ActivityIndicator } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async () => {
    if (email == '') {
      setErrMsg("email cannot be empty")
      return;
    }
    if (password == '') {
      setErrMsg("password cannot be empty")
      return;
    }
    if (username == '') {
      setErrMsg("username cannot be empty")
      return;
    }
    if (fullName == '') {
      setErrMsg("Name cannot be empty")
      return;
    }

    setLoading(true);
    const error1 = await signUp();
    setLoading(false);
    const error2 = await insertProfile();

    if (error1) {
      setErrMsg(error1.message);
      return;
    }
    if (error2) {
      setErrMsg(error2.message);
      return;
    }
  }

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    return error
  }

  const insertProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .insert({ username: username, full_name: fullName, like_post_id: [] })
    return error;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ marginBottom: 150, marginTop: 150 }}>
        <Text style={{ textAlign: "center", fontSize: 28, fontWeight: '500', color: "#333", marginBottom: 30 }}>Register</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="alternate-email" size={25} color="#666" style={styles.iconStyle}></MaterialIcons>
          <TextInput
            style={styles.input}
            placeholder="Username"
            mode="flat"
            autoCapitalize='none'
            value={username}
            onChangeText={setUsername} />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="alternate-email" size={25} color="#666" style={styles.iconStyle}></MaterialIcons>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            mode="flat"
            autoCapitalize='none'
            value={fullName}
            onChangeText={setFullName} />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="alternate-email" size={25} color="#666" style={styles.iconStyle}></MaterialIcons>
          <TextInput
            style={styles.input}
            placeholder="Email"
            mode="flat"
            autoCapitalize='none'
            textContentType='emailAddress'
            value={email}
            onChangeText={setEmail} />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={25} color="#666" style={styles.iconStyle}></MaterialIcons>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            autoCapitalize='none'
            textContentType='password'
            value={password}
            onChangeText={setPassword} />
        </View>
        <View style={{ marginTop: 100 }}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
            <Text style={styles.buttonTextStyle}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
      {errMsg !== "" && <Text>{errMsg}</Text>}
      {loading && <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "hidden",
    borderWidth: 0.1,
    borderColor: '#000',
    borderRadius: 20,
    height: 50,
    margin: 5,
  },
  input: {
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flex: 1,
    backgroundColor: '#fff',
    overflow: "hidden",
  },
  iconStyle: {
    height: 25,
    width: 25,
  },
  buttonStyle: {
    backgroundColor: '#19376D',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff'
  },
});
