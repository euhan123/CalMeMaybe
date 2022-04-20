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

const CompletedScreen = ({ navigation }) => {
    return (
        <View style = {styles.container}>
            <Text> You've (hopefully) Safely Copmleted Your Walk! </Text>
            <Button title = "Go Back to Home" onPress = {() => navigation.navigate("Home")}/>
        </View>
    )
};

export default CompletedScreen