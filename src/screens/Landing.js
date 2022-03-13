import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

const LandingScreen = ({ navigation }) => {
    return (
        <View style = {styles.container}>
            <Text> Landing Screen </Text>
            <Button title = "Go to Sign In" onPress = {() => navigation.navigate("Sign In")}/>
            <Button title = "Go to Sign Up" onPress = {() => navigation.navigate("Sign Up")}/>
        </View>
    )
};

export default LandingScreen