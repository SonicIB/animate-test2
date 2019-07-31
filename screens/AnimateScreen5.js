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


export default class AnimateScreen5 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      length: 100,
    }

    this.animateValue = new Animated.Value(100)
    this.animateValue.addListener((obj) => {
      this.setState({ length: obj.value })
    })
  }

  componentWillMount() {
    this.slide = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.animateValue.setOffset(this.state.length)
        this.animateValue.setValue(0)
      },
      onPanResponderMove: Animated.event([
        null,
        { dy: this.animateValue },
      ]),
      // onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.animateValue.flattenOffset()
      }
    })
  }


  render() {
    const {
      length
    } = this.state

    const animateStyle = {
      width: this.animateValue.interpolate({
        inputRange: [(length > -50 ? -50 : length), -50, 50, 245],
        outputRange: [(Math.abs(length) / 2 > 50 ? Math.abs(length) / 2 : 50), 50, 50, 245 / 2],
        extrapolateRight: 'clamp',
      }),
      height: this.animateValue.interpolate({
        inputRange: [(length > -50 ? -50 : length), -50, 50, 245],
        outputRange: [(Math.abs(length) / 2 > 50 ? Math.abs(length) / 2 : 50), 50, 50, 245 / 2],
        extrapolateRight: 'clamp',
      }),
      transform: [
        {
          rotateX: this.animateValue.interpolate({
            inputRange: [-100, 0, 50],
            outputRange: ['180deg', '90deg', '0deg'],
            extrapolate: 'clamp',
          }),
        }
      ]
    }

    const animateTextStyle = {
      fontSize: this.animateValue.interpolate({
        inputRange: [(length > -50 ? -50 : length), -50, 50, 245],
        outputRange: [(Math.abs(length) / 2 > 50 ? 24 * Math.abs(length) / 245 : 12), 12, 12, 24],
        extrapolateRight: 'clamp',
      }),
      transform: [
        {
          rotateY: this.animateValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ['180deg', '90deg', '0deg'],
            extrapolate: 'clamp',
          }),
        }
      ]
    }

    return (
      <View style={styles.contain}>

        <View style={styles.animateContain} {...this.slide.panHandlers}>
          <Animated.View style={[styles.animateObject, animateStyle]}>
            <Animated.Text style={[styles.animateText, animateTextStyle]}>{Math.round(length)}/245</Animated.Text>
          </Animated.View>

          <View style={styles.exampleContain}>
            <View style={styles.animateObject}>
              <Text style={styles.buttonText}>50</Text>
            </View>

            <View style={[styles.animateObject, { width: 75, height: 75 }]}>
              <Text style={styles.buttonText}>75</Text>
            </View>

            <View style={[styles.animateObject, { width: 100, height: 100 }]}>
              <Text style={styles.buttonText}>100</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.white,
    zIndex: -1,
  },
  animateContain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  animateObject: {
    height: 50,
    width: 50,
    backgroundColor: Colors.black,
    alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 10,
    zIndex: 3,
  },
  animateText: {
    fontSize: 14,
    color: Colors.white,
  },
  exampleContain: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 100,
    zIndex: 1,
  },
  button: {
    position: 'absolute',
    height: 50,
    width: 200,
    backgroundColor: Colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    bottom: 30,
    zIndex: 2,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.white,
  },
})