/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Animated } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    animation: new Animated.Value(0)
  }

  render() {
    const styles = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 3000],
        outputRange: ['rgb(111, 23, 43)', 'rgb(255, 255, 255)']
      })
    }
    return (
      <ScrollView
      scrollEventThrottle={16}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: {
              y: this.state.animation
            }
          }
        }])}
      >
        <Animated.View style={[{height: 3000 }, styles]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
