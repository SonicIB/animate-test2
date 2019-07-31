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
import Constants from 'expo-constants'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width
const WINDOW_HEIGHT = Layout.window.height

export default class AnimateScreen10 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0,
      answers: [],
    }
    this.animateValue = new Animated.Value(0)
  }

  // componentDidMount() {
  //   this.animateValue.addListener(e => console.log(e.value))
  // }

  // componentWillUnmount() {
  //   this.animateValue.removeAllListeners()
  // }

  playAnimation = () => {
    let number = this.state.number + 1
    Animated.timing(this.animateValue, {
      toValue: number,
    }).start()
    this.setState({ number })
    // console.log(number)
  }

  answer = (ans) => {
    let answers = this.state.answers
    answers.push(ans)
    this.setState({ answers })
  }

  render() {
    const animateStyle = {
      width: this.animateValue.interpolate({
        inputRange: [0, 1], // , 2, 3, 4],
        outputRange: [0, WINDOW_WIDTH / 4], //, WINDOW_WIDTH / 2, WINDOW_WIDTH * 3 / 4, WINDOW_WIDTH],
      })
    }

    const animateStyle2 = {
      transform: [
        {
          translateX: this.animateValue.interpolate({
            inputRange: [0, 4],//, 2, 3, 4],
            outputRange: [0, -WINDOW_WIDTH * 4],//, -WINDOW_WIDTH * 2, -WINDOW_WIDTH * 3, -WINDOW_WIDTH * 4],
            extrapolate: 'clamp',
          })
        }
      ]
    }

    return (
      <View style={styles.contain}>
        <View style={styles.buttonContain}>
          <View style={styles.buttonBackground}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.playAnimation()
                this.answer('No')
              }}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonBackground, { backgroundColor: Colors.DARK_CERULEAN }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.playAnimation()
                this.answer('Yes')
              }}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.exit}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.exitText}>X</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.question, animateStyle2]}>
          <View style={styles.questionContain}>
            <Text style={styles.questionText}>111111111111111111111111111111111</Text>
          </View>
          <View style={styles.questionContain}>
            <Text style={styles.questionText}>222222222222222222222222222222222</Text>
          </View>
          <View style={styles.questionContain}>
            <Text style={styles.questionText}>3333333333333333333333333333333333</Text>
          </View>
          <View style={styles.questionContain}>
            <Text style={styles.questionText}>4444444444444444444444444444444444444</Text>
          </View>
          <View style={styles.questionContain}>
            <Text style={styles.questionText}>
              {`1.${this.state.answers[0]}  2.${this.state.answers[1]}  3.${this.state.answers[2]}  4.${this.state.answers[3]}`}
            </Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.bar, animateStyle]} />

      </View >
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    // backgroundColor: Colors.white,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonContain: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonBackground: {
    flex: 1,
    backgroundColor: Colors.SPACE_CADET,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 30,
  },
  exit: {
    position: 'absolute',
    top: Constants.statusBarHeight + 20,
    right: 30,
  },
  exitText: {
    color: Colors.white,
    fontSize: 30,
  },
  question: {
    flexDirection: 'row',
    position: 'absolute',
    top: WINDOW_HEIGHT / 3,
  },
  questionContain: {
    width: WINDOW_WIDTH,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    color: Colors.white,
    fontSize: 30,
  },
  bar: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    height: 5,
    backgroundColor: Colors.white,
  },
})