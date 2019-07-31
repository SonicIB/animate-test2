import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Image,
  PanResponder,
  Easing,
} from 'react-native'


import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width
const WINDOW_HEIGHT = Layout.window.height


export default class AnimateScreen14 extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.animateValue = new Animated.Value(0)
    // this.animateValue.addListener((obj) => console.log(obj.value))
  }


  render() {
    const animateStyle1 = {
      top: this.animateValue.interpolate({
        inputRange: [0, WINDOW_WIDTH, WINDOW_WIDTH * 2],
        outputRange: [110 - Layout.statusBarHeight, 80 - Layout.statusBarHeight, 50 - Layout.statusBarHeight],
      }),
      opacity: this.animateValue.interpolate({
        inputRange: [0, WINDOW_WIDTH, WINDOW_WIDTH * 2],
        outputRange: [0, 1, 0],
      })
    }

    const animateStyle2 = {
      transform: [
        {
          rotate: this.animateValue.interpolate({
            inputRange: [0, WINDOW_WIDTH, WINDOW_WIDTH * 2],
            outputRange: ['90deg', '90deg', '0deg'],
          })
        }
      ]
    }

    return (
      <ScrollView
        contentContainerStyle={styles.contain}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animateValue } } }])}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.page}>
          <Image
            source={require('../assets/images/computer.png')}
            style={styles.computer}
          />
          <Animated.Image
            source={require('../assets/images/tablet.png')}
            style={styles.tablet}
          />
          <View>
            <Text>Screen1</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Image
            source={require('../assets/images/computer.png')}
            style={styles.computer}
          />
          <Animated.Image
            source={require('../assets/images/tablet.png')}
            style={[styles.tablet, animateStyle1]}
          />
          <View>
            <Text>Screen2</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Image
            source={require('../assets/images/computer.png')}
            style={styles.computer}
          />
          <Animated.Image
            source={require('../assets/images/tablet.png')}
            style={[styles.tablet, animateStyle2]}
          />
          <View>
            <Text>Screen3</Text>
          </View>
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    paddingTop: Layout.statusBarHeight,
    backgroundColor: Colors.yellow14,
  },
  page: {
    width: WINDOW_WIDTH,
  },
  computer: {
    // borderWidth: 1,
    // borderColor: Colors.black,
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: -Layout.statusBarHeight,
  },
  tablet: {
    // borderWidth: 1,
    // borderColor: Colors.black,
    position: 'absolute',
    top: 80 - Layout.statusBarHeight,
    left: 20,
    height: 150,
    width: 150,
  },
})