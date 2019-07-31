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

import Colors from '../constants/Colors'

export default class AnimateScreen7 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
    }
    this.animateValue = new Animated.Value(0)
    this.animateValue2 = new Animated.Value(0)
  }

  playAnimation = () => {
    if (!this.state.playing) {
      // this.animateValue.setValue(0)
      this.setState({ playing: true })
      Animated.timing(this.animateValue, {
        toValue: 1,
        duration: 2500,
      }).start((e) => {
        if (e.finished) this.setState({ playing: false })
      })
    } else {
      this.animateValue.stopAnimation((v) => {
        Animated.timing(this.animateValue, {
          toValue: 0,
          duration: v * 2500,
          easing: Easing.bounce,
        }).start()
      })
      this.setState({ playing: false })
    }
  }

  playAnimation2 = () => {
    Animated.timing(this.animateValue2, {
      toValue: 1,
      duration: 2500,
    }).start()
    setTimeout(() => {
      // Animated.timing(this.animateValue2).stop()
      this.animateValue2.stopAnimation((v) => {
        Animated.timing(this.animateValue2, {
          toValue: 0,
          duration: v * 2500,
        }).start()
      })
    }, 500)
  }



  render() {
    const animateStyle = {
      opacity: this.animateValue.interpolate({
        inputRange: [0, 0.85, 1],
        outputRange: [1, 0, 0],
      }),
      transform: [
        {
          translateY: this.animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 650],
          })
        },
      ]
    }

    const animateStyle2 = {
      opacity: this.animateValue2.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 0],
      }),
      transform: [
        {
          translateY: this.animateValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 500],
          })
        },
      ]
    }

    return (
      <View style={styles.contain}>
        <TouchableWithoutFeedback
          onPress={this.playAnimation}
        >
          <Animated.View style={[styles.animateObject, animateStyle]}>
            <Text style={{ color: '#FFF' }}>{this.state.playing.toString()}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={this.playAnimation2}
        >
          <Animated.View style={[styles.animateObject, animateStyle2]}>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.animateValue.setValue(0)
            this.animateValue2.setValue(0)
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
    height: 100,
    width: 100,
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
    marginTop: 150,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.white,
  },
})