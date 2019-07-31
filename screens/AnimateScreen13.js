import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  // TouchableWithoutFeedback,
  View,
  // Easing,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_HEIGHT = Layout.window.height

export default class AnimateScreen13 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false,
    }
    this.animateValue = new Animated.Value(0)
  }

  playAnimation = () => {
    if (!this.state.opened) {
      Animated.timing(this.animateValue, {
        toValue: 1,
        duration: 300
      }).start()
      this.setState({ opened: true })
    } else {
      Animated.timing(this.animateValue, {
        toValue: 0,
        duration: 300
      }).start()
      this.setState({ opened: false })
    }
  }

  render() {
    const animateStyleButton = {
      height: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 70],
      }),
      width: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 70],
      }),
      opacity: this.animateValue,
    }

    const animateStyleButton1 = {
      position: 'absolute',
      bottom: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 200],
      }),
      right: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 20],
      }),
    }

    const animateStyleButton2 = {
      position: 'absolute',
      bottom: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 110],
      }),
      right: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 20],
      }),
    }

    const animateStyleText = {
      height: 30,
      width: 90,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: this.animateValue.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0, 0, 1],
      }),
    }

    const animateStyleText1 = {
      position: 'absolute',
      bottom: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 225],
      }),
      right: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 100],
      }),
    }

    const animateStyleText2 = {
      position: 'absolute',
      bottom: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 135],
      }),
      right: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 100],
      }),
    }

    const animateStyleText3 = {
      position: 'absolute',
      bottom: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 45],
      }),
      right: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [55, 100],
      }),
    }

    const animateStyleCircle = {
      height: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, WINDOW_HEIGHT * 2],
      }),
      width: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, WINDOW_HEIGHT * 2],
      }),
      borderRadius: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, WINDOW_HEIGHT],
      }),
    }


    return (
      <View style={styles.contain}>
        <View style={styles.menuContain}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.playAnimation}
          >
            <Text style={styles.buttonText}>$ 5.00</Text>
          </TouchableOpacity>

          <Animated.View style={animateStyleButton1}>
            <TouchableOpacity>
              <Animated.View style={[styles.button2, animateStyleButton]}>
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={30}
                  color={Colors.darkGrey}
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={animateStyleButton2}>
            <TouchableOpacity>
              <Animated.View style={[styles.button2, animateStyleButton]}>
                <MaterialCommunityIcons
                  name="reload"
                  size={30}
                  color={Colors.darkGrey}
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[animateStyleText, animateStyleText1]}>
            <Text style={styles.sortText}>Order</Text>
          </Animated.View>

          <Animated.View style={[animateStyleText, animateStyleText2]}>
            <Text style={styles.sortText}>Reload</Text>
          </Animated.View>

          <Animated.View style={[animateStyleText, animateStyleText3]}>
            <Text style={styles.sortText}>Pay</Text>
          </Animated.View>

        </View>

        <Animated.View style={[styles.circle, animateStyleCircle]} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: Layout.statusBarHeight,
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  circle: {
    position: 'absolute',
    bottom: -WINDOW_HEIGHT + 150,
    right: -WINDOW_HEIGHT + 150,
    backgroundColor: Colors.grey,
    zIndex: -1,
  },
  menuContain: {
    height: 300,
    width: 200,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    height: 70,
    width: 70,
    backgroundColor: Colors.green13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    marginRight: 20,
    marginBottom: 20,
    zIndex: 2,
  },
  button2: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    zIndex: 1,
  },
  buttonText: {
    color: Colors.white,
  },
  sortContain: {
    alignItems: 'center',
    marginTop: 20,
  },
  sortText: {
    color: Colors.white,
    fontSize: 20,
  },
})