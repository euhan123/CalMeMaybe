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

const ConfirmScreen = ({ LogIn, route}) => {
    const [confirm, onChangeConfirm] = React.useState("");
    const fields = route.params.paramKey;

    async function handleConfirmSubmit() {
        try {   
            await Auth.confirmSignUp(fields.email, confirm);
            await Auth.signIn(fields.email, fields.password);

            LogIn(true);
        } catch (e) {

        }

    }

    return (
        <SafeAreaView style = {styles.container}>
            <Text> Check your email for verification code. </Text>
            <TextInput 
                style = {styles.input}
                onChangeText = {onChangeConfirm}
                value = {confirm}
                placeholder = "Enter verification code."
            />
            <Button 
                title = "Verify and Sign In" onPress = {handleConfirmSubmit}
            />
        </SafeAreaView>

    )
}

export default ConfirmScreen;