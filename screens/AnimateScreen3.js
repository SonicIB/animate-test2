import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width


export default class AnimateScreen3 extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

    this.animateValue1 = new Animated.Value(0)
    this.animateValue2 = new Animated.Value(0)
    this.animateValue3 = new Animated.Value(0)
  }

  playAnimation = () => {
    this.animateValue1.setValue(0)
    Animated.timing(this.animateValue1, {
      toValue: 1,
      duration: 2000,
    }).start()
  }

  playAnimation2 = () => {
    this.animateValue2.setValue(0)
    Animated.timing(this.animateValue2, {
      toValue: 1,
      duration: 2000,
    }).start()
  }

  playAnimation3 = () => {
    this.animateValue3.setValue(0)
    Animated.timing(this.animateValue3, {
      toValue: 1,
      duration: 2000,
    }).start()
  }



  render() {
    const animateStyle1 = {
      opacity: this.animateValue1.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: [1, 0.3, 1],
      }),
      transform: [
        {
          translateX: this.animateValue1.interpolate({
            inputRange: [0, 0.1, 0.15, 0.2, 0.25, 0.35, 0.8, 0.85, 0.9, 0.95, 1],
            outputRange: [0, -50, 50, -50, 50, 80, 0, -50, 50, -50, 0],
          })
        },
        {
          translateY: this.animateValue1.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 100, 0],
          })
        },
      ]
    }

    const animateStyle2 = {
      backgroundColor: this.animateValue2.interpolate({
        inputRange: [0, 0.2, 1],
        outputRange: [Colors.black, Colors.green, Colors.black],
      })
    }

    const animateStyle2_2 = {
      backgroundColor: this.animateValue2.interpolate({
        inputRange: [0, 0.2, 1],
        outputRange: [Colors.white, Colors.black, Colors.white],
      })
    }

    const animateStyle3 = {
      transform: [
        {
          rotateX: this.animateValue3.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '180deg', '360deg'],
          })
        },
        {
          rotateY: this.animateValue3.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '0deg', '180deg'],
          })
        },
      ]
    }

    return (
      <Animated.View style={[styles.contain, animateStyle2_2]}>
        <TouchableWithoutFeedback
          onPress={this.playAnimation}
        >
          <Animated.View style={[styles.animateObject, animateStyle1]}>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={this.playAnimation2}
        >
          <Animated.View style={[styles.animateObject, animateStyle2]}>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={this.playAnimation3}
        >
          <Animated.View style={[styles.animateObject, animateStyle3]}>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>back</Text>
        </TouchableOpacity>
      </Animated.View>
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
    borderRadius: 5,
    marginTop: 200,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.white,
  },
})