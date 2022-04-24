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

class Alerts extends React.Component {
    state = { alerts: []}

    async componentDidMount() {
        //Fix this to get the alerts for this specific user.
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style = {styles.item}>
                    <Text style = {styles.heading}>List of Alerts:</Text>
                </Text>
                <FlatList
                    data={this.state.alerts}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.item}>
                                <Text style = {{fontWeight: "bold"}}> Name: </Text>
                                <Text> {item.from}{'\n'}</Text>
                                <Text style = {{fontWeight: "bold"}}> Message: </Text>
                                <Text> {item.message} </Text>
                            </Text>
                        </View>

                    )}
                />
            </View>
        )

    }
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
        margin: 10,
    },
    input: {
        height: 40,
        borderWidth:1,
        padding: 10,
    },
    heading: {
        fontSize: 30,
        height: 66,
        fontWeight: "bold",
    },
})

export default withAuthenticator(Alerts, { includeGreeetings: false})