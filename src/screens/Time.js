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

const TimeScreen = ({ navigation, route }) => {
    const [time, onChangeTime] = React.useState(null);
    const temp = route.params.paramKey;

    const fields = {
        positionLatitude: temp.positionLatitude,
        positionLongitude: temp.positionLongitude,
        destinationLatitude: temp.destinationLatitude,
        destinationLongitude: temp.destinationLongitude,
        time: time,
    }

    async function handleConfirmSubmit() {
        fields.time = time;
        navigation.navigate('Walk Screen', {
            paramKey: fields,
        })
    }


    return (
        <SafeAreaView style = {styles.container}>
            <Text> Check your email for verification code. </Text>
            <TextInput 
                style = {styles.input}
                onChangeText = {onChangeTime}
                value = {time}
                placeholder = "Enter your ETA"
            />
            <Button 
                title = "Submit Time" onPress = {handleConfirmSubmit}
            />
        </SafeAreaView>

    )
}

export default TimeScreen;