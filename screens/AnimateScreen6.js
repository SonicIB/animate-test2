import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  // TouchableWithoutFeedback,
  View,
  PanResponder,
} from 'react-native'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

export default class AnimateScreen6 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: new Animated.ValueXY(),
      height: this.props.navigation.getParam('height', 0), // this.props.navigation.state.params.height,
    }
  }

  componentWillMount() {
    this.drag = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.state.position.extractOffset()
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.position.x, dy: this.state.position.y },
      ]),
    })
  }


  render() {
    const inputRange = [
      0,
      ((this.state.height - Layout.statusBarHeight) / 2) - 50.01,
      ((this.state.height - Layout.statusBarHeight) / 2) - 50,
      this.state.height,
    ]
    // console.log(inputRange)

    const flipInterpolate = this.state.position.y.interpolate({
      inputRange,
      outputRange: [1, 1, -1, -1],
    })

    const animateStyle = {
      transform: [
        ...this.state.position.getTranslateTransform(),
        {
          scale: flipInterpolate,
        }
      ],
      backgroundColor: this.state.position.y.interpolate({
        inputRange,
        outputRange: [Colors.black, Colors.black, Colors.green, Colors.green],
      }),
    }



    return (
      <View style={styles.contain}>
        <View style={[styles.halfContain, { borderBottomWidth: 1 }]}>
          <Text>Good</Text>
        </View>
        <View style={styles.halfContain}>
          <Text>Bad</Text>
        </View>

        <Animated.View
          style={[styles.animateObject, animateStyle]}
          {...this.drag.panHandlers}
        >
          <Text style={styles.animateText}>Box</Text>
        </Animated.View>

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
    backgroundColor: Colors.white,
    paddingTop: Layout.statusBarHeight,
  },
  halfContain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animateObject: {
    position: 'absolute',
    height: 50,
    width: 50,
    top: Layout.statusBarHeight,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 2,
  },
  animateText: {
    fontSize: 16,
    color: Colors.white,
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
    bottom: 20,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.white,
  },
})