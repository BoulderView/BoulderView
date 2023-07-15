import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator, Text, TextInput } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { supabase } from "../../lib/supabase";

const ResetPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async () => {
    try {
      setErrMsg("");
      if (password == "") {
        setErrMsg("password cannot be empty");
        return;
      }
      setLoading(true);

      const error1 = await updatePassword();
      setLoading(false);
      if (error1) {
        alert(error1.message);
        return;
      }
      alert("Password updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const updatePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({ password });
    return error;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ marginBottom: 150 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Please update your password
        </Text>
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="alternate-email"
            size={25}
            color="#666"
            style={styles.iconStyle}
          ></MaterialIcons>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            mode="flat"
            autoCapitalize="none"
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      {errMsg !== "" && <Text>{errMsg}</Text>}
      {loading && <ActivityIndicator />}
      <View style={{ marginTop: 100 }}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
          <Text style={styles.buttonTextStyle}>Update password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 0.1,
    borderColor: "#000",
    borderRadius: 20,
    height: 50,
    margin: 5,
  },
  input: {
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  iconStyle: {
    height: 25,
    width: 25,
  },
  buttonStyle: {
    backgroundColor: "#19376D",
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonTextStyle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
});

export default ResetPage;
