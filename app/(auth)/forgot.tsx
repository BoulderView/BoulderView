import React from "react";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Linking from "expo-linking";

const ForgotPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const resetPasswordURL = Linking.createURL("/ResetPassword");
    const handleSubmit = async () => {
        setErrMsg('');
        if (email == '') {
            setErrMsg("email cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: resetPasswordURL,
        });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }

        const { error2 } = await supabase.auth.updateUser({ password: "A12323958FG" });
        if (error2) {
            setErrMsg(error2.message);
            return;
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ marginBottom: 150 }}>
                <Text style={{ textAlign: "center", fontSize: 28, fontWeight: '500', color: "#333", marginBottom: 30 }}>Please enter your email</Text>
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
            </View>
            {errMsg !== "" && <Text>{errMsg}</Text>}
            {loading && <ActivityIndicator />}
            <View style={{ marginTop: 100 }}>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
                    <Text style={styles.buttonTextStyle}>Send recovery email</Text>
                </TouchableOpacity>
            </View>
        </View >

    )
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

export default ForgotPage;