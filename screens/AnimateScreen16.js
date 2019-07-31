import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'


import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width
const WINDOW_HEIGHT = Layout.window.height

const numberRange = Array(10).fill().map((v, i) => i)

export default class AnimateScreen16 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      measured: false,
      height: 0,
    }
  }

  measure = (e) => {
    this.setState({
      measured: true,
      height: e.nativeEvent.layout.height,
    })
  }

  render() {
    const {
      height,
      measured,
    } = this.state

    const wrapStyle = measured ? { height: height } : { opacity: 0 }

    return (
      <View style={styles.contain}>
        <View style={[styles.tickContain, wrapStyle]}>
          <Tick
            height={height}
          />
          <Tick
            height={height}
          />
          <Tick
            height={height}
          />
        </View>
        <Text style={[styles.number, { opacity: 0 }]} onLayout={this.measure}>0</Text>
      </View>
    )
  }
}

class Tick extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
    this.animateValue = new Animated.Value(this.getPosition(this.state.value, this.props.height))
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        value: this.getRandom(0, 9),
      }, () => {
        Animated.timing(this.animateValue, {
          toValue: this.getPosition(this.state.value, this.props.height),
        }).start()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getPosition = (value, height) => {
    let position = parseInt(value, 10) * height * -1
    if (Platform.OS === 'ios') position = parseInt(value, 10) * (height - 2) * -1
    // console.log(position)
    return position
  }

  getTranslateStyle = (position) => ({
    transform: [
      {
        translateY: position,
      }
    ]
  })

  getRandom = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  render() {
    const transformStyle = this.getTranslateStyle(this.animateValue)

    return (
      <Animated.View style={transformStyle}>
        {
          numberRange.map((v, i) => {
            return (
              <View key={i}>
                <Text style={styles.number}>{v}</Text>
              </View>
            )
          })
        }
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: Layout.statusBarHeight,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickContain: {
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'flex-start',
  },
  number: {
    fontSize: 80,
    color: Colors.darkGrey,
  },
})