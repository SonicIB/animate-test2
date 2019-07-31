import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  // Easing,
} from 'react-native'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width

export default class AnimateScreen9 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: this.props.navigation.getParam('height', 0),
    }
    this.animateValue = new Animated.Value(0)
    this.animateValue2 = new Animated.Value(0)
  }

  playAnimation = () => {
    const height = this.state.height - 100 - Layout.statusBarHeight
    const width = WINDOW_WIDTH - 100
    // this.animateValue.setValue(0)
    // this.animateValue2.setValue(0)
    Animated.sequence([
      Animated.spring(this.animateValue2, {
        toValue: height,
        tension: 40,
        friction: 3,
      }),
      Animated.spring(this.animateValue, {
        toValue: width,
        tension: 40,
        friction: 5,
      }),
      Animated.spring(this.animateValue2, {
        toValue: 0,
        tension: 20,
        friction: 3,
      }),
      Animated.spring(this.animateValue, {
        toValue: 0,
        tension: 20,
        friction: 5,
      }),
    ]).start()
  }

  render() {
    const animateStyle = {
      transform: [
        { translateX: this.animateValue },
        { translateY: this.animateValue2 },
      ]
    }

    return (
      <View style={styles.contain}>
        <TouchableWithoutFeedback
          onPress={this.playAnimation}
        >
          <Animated.View style={[styles.animateObject, animateStyle]} />
        </TouchableWithoutFeedback>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: Layout.statusBarHeight,
    backgroundColor: Colors.white,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  animateObject: {
    width: 100,
    height: 100,
    backgroundColor: Colors.black,
  }
})