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
import { Dimensions } from 'react-native-web';


Amplify.configure({
    ...awsmobile,
    Analytics: {
      disabled: true,
    },
});

class Alerts extends React.Component {
    state = { alerts: []}

    async componentDidMount() {
        const response = await Auth.currentUserInfo()
        const userId = response.username
        console.log(userId)
        const selfData = await API.graphql(graphqlOperation(queries.listAlerts, { filter: {to: {eq: userId}} }))
        this.setState({ alerts: selfData.data.listAlerts.items})
    }

    deleteAlert = async (id) => {
        try {
            await API.graphql(graphqlOperation(mutations.deleteAlerts, { input: { id: id} }))
            this.getFriendsList()
        } catch (err) {
            console.error(err);
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text>
                    <Text style = {styles.heading}>List of Alerts:</Text>
                </Text>
                <FlatList
                    data={this.state.alerts}
                    renderItem={({ item }) => (
                        <View style = {styles.container2}>
                            <Text style = {{textAlign: 'left'}}>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}> Name: </Text>
                                <Text style = {styles.name}> {item.nickname} {'\n'} </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20, textAlign: 'left'}}> Time: </Text>
                                <Text style = {styles.item}> {item.createdAt} {'\n'} </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}> Message: {'\n'}</Text>
                                <Text style = {styles.item}> {item.message} </Text>
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
        flexShrink: 1,
    },
    container2: {
        flex: 1,
        flexShrink: 1,
        borderWidth: 1, 
        marginTop: 22,
    },
    name: {
        padding: 5,
        fontSize: 18,
        height: 44,
        marginBottom: 2,
    },
    item: {
        padding: 5,
        fontSize: 18,
        height: 44,
        flexWrap: 'wrap',
        marginBottom: 2,
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