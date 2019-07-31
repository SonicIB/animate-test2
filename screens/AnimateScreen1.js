import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import randomcolor from 'randomcolor'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width


export default class AnimateScreen1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.generateData()
    this.generateInterval = setInterval(() => {
      this.generateData()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.generateInterval)
  }

  generateData = () => {
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push(Math.floor(Math.random() * WINDOW_WIDTH))
    }
    this.setState({ data })
    // console.log(data)
  }

  render() {
    return (
      <View style={styles.contain}>
        <View>
          {
            this.state.data.map((value, i) => {
              return (
                <Bar
                  key={i}
                  value={value}
                  delay={100 * i}
                  navigation={this.props.navigation}
                />
              )
            })
          }
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

class Bar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: randomcolor(),
      // width: new Animated.Value(0),
    }
    this.width = new Animated.Value(0)
  }

  componentDidMount() {
    this.listener = this.props.navigation.addListener('willFocus', () => {
      this.setState({ color: randomcolor() })
      this.width.setValue(0)
    })
    this.playAnimate(this.props.value, this.props.delay)
  }

  componentWillReceiveProps(nextProps) {
    this.playAnimate(nextProps.value, nextProps.delay)
  }

  componentWillUnmount() {
    this.listener.remove()
  }

  playAnimate = (value, delay) => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(this.width, { toValue: value }),
    ]).start()
  }

  render() {
    const barStyle = {
      backgroundColor: this.state.color,
      height: 40,
      width: this.width,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    }

    return (
      <Animated.View style={barStyle} />
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
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