import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, TextInput, Button } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";


import Amplify, { Auth } from "aws-amplify";
import awsmobile from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { ConsoleLogger } from '@aws-amplify/core';


Amplify.configure({
    ...awsmobile,
    Analytics: {
      disabled: true,
    },
});

function Profile ({vars}) {
    //console.log(vars)
    const [state, setState] = React.useState({
        userId: "",
        userEmail: vars.Email,
    })

    React.useEffect(() => {
        (async () => {
          const response = await Auth.currentUserInfo();
          setState({
              userId: response.username,
              userEmail: vars.Email,
          })
        })();
    }, []);


    return (
        <View style={styles.container}>
            <Text style = {styles.item}>
                <Text style = {styles.heading}>Profile Information{"\n"}</Text>
                <Text style = {{fontWeight: "bold"}}>ID: </Text>
                <Text>{state.userId}{"\n"}</Text>
                <Text style = {{fontWeight: "bold"}}>Email: </Text>
                <Text>{state.userEmail}{"\n"}</Text>
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        marginLeft: 20,
        marginRight: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderWidth:1,
        padding: 10,
    },
    heading: {
        fontsize: 30,
        height: 66,
        fontWeight: "bold",
    },
})


export default Profile
