import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Easing,
} from 'react-native';

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width


export default class AnimateScreen2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value7: 0,
    }

    this.animateValue1 = new Animated.Value(0)
    this.animateValue2 = new Animated.Value(0)
    this.animateValue3 = new Animated.Value(0)
    this.animateValue4 = new Animated.Value(0)
    this.animateValue5 = new Animated.Value(0)
    this.animateValue6 = new Animated.Value(0)
    this.animateValue7 = new Animated.Value(0)
  }


  playAnimation = (animate) => {
    Animated.timing(animate, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(0.5),
    }).start(() => animate.setValue(0))
  }

  playAnimation7 = () => {
    if (this.state.value7 === 0) {
      Animated.timing(this.animateValue7, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(0.5),
      }).start()
      this.setState({ value7: 1 })
    } else {
      this.animateValue7.setValue(-1)
      Animated.timing(this.animateValue7, {
        toValue: 0,
        duration: 1000,
        easing: Easing.elastic(0.5),
      }).start()
      this.setState({ value7: 0 })
    }

  }


  render() {
    const animateStyle1 = {
      opacity: this.animateValue1.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 1],
      }),
    }

    const animateStyle2 = {
      transform: [
        {
          scale: this.animateValue2.interpolate({
            inputRange: [0, 0.9, 1],
            outputRange: [1, 5, 1],
          })
        }
      ]
    }

    const animateStyle3 = {
      transform: [
        {
          translateX: this.animateValue3.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 100, 0],
          })
        }
      ]
    }

    const animateStyle4 = {
      width: this.animateValue4.interpolate({
        inputRange: [0, 0.9, 1],
        outputRange: [50, 200, 50],
      }),
      height: this.animateValue4.interpolate({
        inputRange: [0, 0.9, 1],
        outputRange: [50, 200, 50],
      }),
    }

    const animateStyle5 = {
      top: this.animateValue5.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [24, 150, 24],
      }),
      left: this.animateValue5.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 150, 0],
      }),
    }

    const animateStyle6 = {
      backgroundColor: this.animateValue6.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.black, Colors.white],
      }),
    }

    const animateStyle6_2 = {
      color: this.animateValue6.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.white, Colors.black],
      }),
    }

    const animateStyle7 = {
      transform: [
        {
          rotate: this.animateValue7.interpolate(
            {
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg'],
            },
            {
              inputRange: [-1, 0],
              outputRange: ['180deg', '360deg'],
            }
          )
        }
      ]
    }


    return (
      <View style={styles.contain}>
        <TouchableWithoutFeedback
          onPress={() => this.playAnimation(this.animateValue1)}
        >
          <Animated.View style={[styles.animateObject, animateStyle1]}>
            <Text style={styles.buttonText}>1</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.playAnimation(this.animateValue2)}
        >
          <Animated.View style={[styles.animateObject, animateStyle2]}>
            <Text style={styles.buttonText}>2</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.playAnimation(this.animateValue3)}
        >
          <Animated.View style={[styles.animateObject, animateStyle3]}>
            <Text style={styles.buttonText}>3</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.playAnimation(this.animateValue4)}
        >
          <Animated.View style={[styles.animateObject, animateStyle4]}>
            <Text style={styles.buttonText}>4</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.playAnimation(this.animateValue5)}
        >
          <Animated.View style={[styles.animateObject, animateStyle5, { position: 'absolute' }]}>
            <Text style={styles.buttonText}>5</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.playAnimation(this.animateValue6)}
        >
          <Animated.View style={[styles.animateObject, animateStyle6]}>
            <Animated.Text style={[styles.buttonText, animateStyle6_2]}>6</Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={this.playAnimation7}
        >
          <Animated.View style={[styles.animateObject, animateStyle7]}>
            <Text style={styles.buttonText}>7</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

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
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 50,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.white,
  },
})