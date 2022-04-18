import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";


import Amplify, { Auth } from "aws-amplify";
import awsmobile from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';


Amplify.configure({
    ...awsmobile,
    Analytics: {
      disabled: true,
    },
});

class HomeScreen extends React.Component {
    state = { valid: [], userPresent: false}

    async componentDidMount() {
        const response = await Auth.currentUserInfo()
        //console.log(response)
        const userId = response.username.replace("\n", "")
        //console.log(userId)
        const allData = await API.graphql(graphqlOperation(queries.listSelves, {filter: {name: {eq: userId}}}))
        this.setState({ valid: allData.data.listSelves.items })
        //console.log(this.state.valid)
        for(let i = 0; i < this.state.valid.length; i += 1){
            if (userId == this.state.valid[i].name) {
                this.setState({userPresent: true})
            }
        }
        //console.log(this.state.userPresent)
        if(this.state.userPresent == false) {
            try {   
                await API.graphql(graphqlOperation(mutations.createSelf, {input: {name: userId}}))
            } catch(err) {
            }
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text> Welcome to Cal Me Maybe!! </Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default withAuthenticator(HomeScreen, { includeGreeetings: false})