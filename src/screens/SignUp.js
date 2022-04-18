import React from 'react';
import { SafeAreaView, TextInput, Text, View, StyleSheet, Button } from 'react-native';
import { Auth } from "aws-amplify";
import { NavigationContainer } from '@react-navigation/native';

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        //backgroundColor: 
    },
    input: {
        height: 40,
        margin: 5,
        borderWidth: 2,
        alignSelf: 'stretch',
        padding: 10,
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 30, 
        fontWeight: 'bold', 
        alignSelf: 'center',
    },
});

const SignUpScreen = ({ navigation, params }) => {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePass] = React.useState("");
    const [confirmPass, onChangeConfirm] = React.useState("");

    const fields = {
        email: params.Email,
        password: params.Password,
    }
    

    function validateForm() {
        return (
          email.length > 0 &&
          password.length > 0 &&
          password === confirmPass
        );
    }

    async function handleSubmit() {
        if(validateForm){
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
                alert("Error!");
            }
        }        
    }

    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.text}> Sign Up </Text>
            <TextInput
                style = {styles.input}
                onChangeText = {onChangeEmail}
                value = {email}
                placeholder = "Enter your email."
                keyboardType = "email-address"
            />
            <TextInput 
                style = {styles.input}
                onChangeText = {onChangePass}
                value = {password}
                placeholder = "Enter your password."
                secureTextEntry
            />
            <TextInput 
                style = {styles.input}
                onChangeText = {onChangeConfirm}
                value = {confirmPass}
                placeholder = "Enter your password AGAIN."
                secureTextEntry
            />
            <Button 
                title = "Sign Up" onPress = {handleSubmit}
            />
        </SafeAreaView>

    );
}

export default SignUpScreen; 