import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, TextInput, Button } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";

import Amplify, { Auth } from "aws-amplify";
import awsmobile from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure({
    ...awsmobile,
    Analytics: {
      disabled: true,
    },
});

class Friend extends React.Component {
    state = {}

    async componentDidMount() {
        //FIX THIS SECTION
        const selfData = await API.graphql(graphqlOperation(queries.listFriends))
    }

    getFriendsList = async () => {
        try {
            //FIX THIS SECTION
            const response = await API.graphql(graphqlOperation(queries.listFriends))
        } catch (err) {
            console.error(err);
        }
    }

    addFriend = async () => {
        try {
            const response = await Auth.currentUserInfo()
            const userId = response.username //gets the userID of the current app user
            await API.graphql(graphqlOperation(mutations.createFriend, { input: {} }))
        } catch (err) {
            console.error(err);
        }
    }

    deleteFriend = async (id) => {
        try {
            await API.graphql(graphqlOperation(mutations.deleteFriend, { input: { id: id} }))
        } catch (err) {
            console.error(err);
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={this.state.input}
                    placeholder="Type your friend's id!"
                    onChangeText={(text) => this.setState({ input: text })}
                />
                <TextInput
                    style = {styles.input}
                    value = {this.state.nickname}
                    placeholder= "Type your friend's name!"
                    onChangeText = {(text) => this.setState({ nickname: text })}
                />
                <Button title="Add Friend" onPress={this.addFriend} />
                <Text style = {styles.item}>
                    <Text style = {styles.heading}>List of Friends:</Text>
                </Text>
                <FlatList
                    data={}
                    renderItem={({ item }) => (
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


export default withAuthenticator(Friend, { includeGreeetings: false})