import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  PanResponder,
} from 'react-native';

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width


export default class AnimateScreen4 extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

    this.animateValue = new Animated.ValueXY()
    this.position = { x: 0, y: 0 }
    this.animateValue.addListener((value) => this.position = value)
  }

  componentWillMount() {
    this.drag = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.animateValue.setOffset({
          x: this.position.x,
          y: this.position.y,
        })
        this.animateValue.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.animateValue.x, dy: this.animateValue.y },
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.animateValue.flattenOffset()
        Animated.decay(this.animateValue, {
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start()
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  }


  render() {
    const animateStyle = {
      transform: this.animateValue.getTranslateTransform()
    }

    return (
      <View style={styles.contain}>
        <Animated.View
          style={[styles.animateObject, animateStyle]}
          {...this.drag.panHandlers}
        >
          <Text style={styles.buttonText}>drag</Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.animateValue.setOffset({ x: 0, y: 0 })
            this.animateValue.setValue({ x: 0, y: 0 })
          }}
        >
          <Text style={styles.buttonText}>reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  animateObject: {
    height: 50,
    width: 50,
    backgroundColor: Colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: Colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderRadius: 5,
    marginTop: 200,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.white,
  },
})