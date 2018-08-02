/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity, PanResponder } from 'react-native';

export default class App extends Component {
  state = {
    animation: new Animated.ValueXY(0)
  }

  componentWillMount() {
    this._x = 0;
    this._y = 0;

    this.state.animation.addListener((value) => {
      this._x = value.x;
      this._y = value.y;
    })
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.animation.setOffset({
          x: this._x,
          y: this._y
        });

        this.state.animation.setValue({
          x: 0,
          y: 0
        });
      },
      onPanResponderMove: Animated.event([
        null, {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }
      ]),
      onPanResponderRelease: (e, { vx, vy }) => {
        Animated.decay(this.state.animation, {
          velocity: { x: vx, y: vy },
          deceleration: 0.995
        }).start();
      },
    })
  }

  render() {
    const animatedStyle = {
      transform:
        this.state.animation.getTranslateTransform(),
    }

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.box, animatedStyle]}
          {...this._panResponder.panHandlers}
        />
      </View>
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
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'skyblue'
  }
});
