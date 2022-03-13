import React from 'react';
import { SafeAreaView, TextInput, Text, View, StyleSheet, Button } from 'react-native';
//import { showMessage, FlashMessage } from "react-native-flash-message";
import { Auth } from "aws-amplify";
import { NavigationContainer } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },

});

const SignUpScreen = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [confirmPass, onChangeConfirm] = React.useState("");

    const fields = {
        email: "",
        password: "",
    }

    function validateForm() {
        return (
            email.length > 0 &&
            password.length > 0 &&
            password == confirmPass
        )
    }

    async function handleSubmit() {
        if(validateForm) {
            try {
                await Auth.signUp({
                    username: email,
                    password: password,
                    attributes: {
                        email: email
                    }
                });
                fields.email = email;
                fields.password = password;
                navigation.navigate('Confirm Screen', {
                    paramKey: fields,
                });
            } catch (e) {
                
            }
        } 
    }

    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {{ fontSize: 30, fontWeight: 'bold'}}> Sign Up </Text>
            <TextInput
                style = {styles.input}
                onChangeText = {onChangeEmail}
                value = {email}
                placeholder = "Enter your email"
                keyboardType = "email-address"
            />
            <TextInput
                style = {styles.input}
                onChangeText = {onChangePassword}
                value = {password}
                placeholder = "Enter your password"
            />
            <TextInput
                style = {styles.input}
                onChangeText = {onChangeConfirm}
                value = {confirmPass}
                placeholder = "Enter your password again"
            />
            <Button 
                title = "Sign Up" onPress = {handleSubmit}
            />
        </SafeAreaView>

    )
}

export default SignUpScreen;