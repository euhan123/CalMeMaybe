import React, { Component } from 'react';
import { render } from 'react-dom';
import { Platform, View, SafeAreaView, Text, Button, TouchableOpacity, PermissionsAndroid, StyleSheet, Dimensions } from 'react-native';
import MapView, { AnimatedRegion, Circle, Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { ConsoleLogger, Reachability } from '@aws-amplify/core';

import { useEffect, useState } from "react";


export default function MapScreen() {
  // Define position state: {latitude: number, longitude: number}
  const [position, setPosition] = React.useState({
    latitude: 19.89,
    longitude: 155.58,
  });
  const [destination, setDestination] = React.useState({
    latitude: null,
    longitude: null,
  });

  React.useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  async function startWalk() {
    console.log(destination);
  }

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
        onPress = {(e) => {
          setDestination({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      />
      <Button title="Start" onPress = {startWalk} style = {styles.button}/>
    </SafeAreaView>
  )
}

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
  button: {
    marginTop: 15,
  },
  separator: {
    marginVertical: 8,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})