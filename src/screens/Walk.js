import React, { Component } from 'react';
import { render } from 'react-dom';
import { Platform, View, SafeAreaView, Text, Button, TouchableOpacity, PermissionsAndroid, StyleSheet, Dimensions } from 'react-native';
import MapView, { AnimatedRegion, Circle, Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { ConsoleLogger, Reachability } from '@aws-amplify/core';

import { useEffect, useState } from "react";

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

function WalkScreen({navigation, route}) {
  // Define position state: {latitude: number, longitude: number}
  const distance = 100;
  const fields = route.params.paramKey;
  const [position, setPosition] = React.useState({
    latitude: fields.positionLatitude,
    longitude: fields.positionLongitude,
  });
  const minutes = fields.time;
  const [timerCount, setTimer] = React.useState(fields.time*60);

  React.useEffect(() => {

    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      let latDiff = location.coords.latitude - fields.destinationLatitude;
      let longDiff = location.coords.longitude - fields.destinationLongitude;
      let squared = Math.pow(latDiff * latDiff + longDiff * longDiff, 0.5)
      let distAway = squared * 10000 * 3280.4 * (1/90);
      if (distAway <= distance) {
        navigation.navigate("Completed Screen");
      }
    })();
  }, []);

  async function failed() {
    const response = await Auth.currentUserInfo();
    const userId = response.username;
    const selfData = await API.graphql(graphqlOperation(queries.listFriends, { filter: {selfPostsId: {eq: userId}} }));
    const friends = selfData.data.listFriends.items;
    const msg = `ALERT: ${userId} failed to reach their destination in ${minutes} minutes.`;
    console.log(friends.length)
    for (let i = 0; i < friends.length; i++ ) {
      await API.graphql(graphqlOperation(mutations.createAlerts, 
      { input: {from: userId, to: friends[i].username, message: msg}}))
    }
    navigation.navigate("Home");
  }

  React.useEffect(() => {
      
    const interval = setInterval(() => {
        let time = timerCount;
        if (time > 0){
          setTimer(time - 1);
        } else if (time == 0) {
          failed();
          setTimer(time - 1);
        }
      }, 1000);
      
    return () => clearInterval(interval);
  }, [timerCount])

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style = {styles.map}
        provider = {PROVIDER_GOOGLE} 
        initialRegion = {{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }}
        showsUserLocation = {true}
        followsUserLocation = {true}
        onUserLocationChange = {(e) => {
          setPosition({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Marker
          coordinate = {{
            latitude: fields.destinationLatitude,
            longitude: fields.destinationLongitude,
          }}
          pinColor = "red"
        >
          <Callout>
            <Text> Destination. </Text>
          </Callout>
        </Marker>
      </MapView>
      <View style = {styles.separator}>
          <Text style = {styles.time}>{Math.floor(timerCount/60)} : {("0" + timerCount % 60).slice(-2)}</Text>
      </View>
    </SafeAreaView>
  )
}

export default withAuthenticator(WalkScreen, { includeGreeetings: false})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    position: "absolute",
    marginVertical: 8,
    bottom: 0,
  },
  time: {
      color: "#000",
      textAlign: 'center',
      fontSize: 30,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})