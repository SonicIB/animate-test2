import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  // TouchableWithoutFeedback,
  View,
  ScrollView,
  Image,
  Easing,
} from 'react-native'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width
const WINDOW_HEIGHT = Layout.window.height

export default class AnimateScreen11 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: require('../assets/images/scenery/scenery01.jpg'),
      startX: 0,
      startY: 0,
      scrollY: 0,
    }
    this.animateValue = new Animated.Value(0)
  }

  playAnimation = () => {
    Animated.timing(this.animateValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.elastic(1),
    }).start()
  }

  openImage = (x, y, image) => {
    this.setState({
      startX: x,
      startY: y - this.state.scrollY + Layout.statusBarHeight,
      image: image,
    }, () => this.playAnimation())
  }

  closeImage = () => {
    Animated.timing(this.animateValue, {
      toValue: 0,
      duration: 250 * (1 + (Math.abs(this.state.startY - Layout.statusBarHeight)) / this.props.navigation.getParam('height', 0)),
    }).start()
  }


  render() {
    const {
      startX,
      startY,
    } = this.state

    const animateStyle = {
      position: 'absolute',
      width: this.animateValue.interpolate({
        inputRange: [0, 0.01, 1],
        outputRange: [0, WINDOW_WIDTH / 3, WINDOW_WIDTH],
      }),
      height: this.animateValue.interpolate({
        inputRange: [0, 0.01, 1],
        outputRange: [0, WINDOW_WIDTH / 3, WINDOW_HEIGHT / 3],
      }),
      opacity: this.animateValue.interpolate({
        inputRange: [0, 0.01, 1],
        outputRange: [0, 1, 1],
      }),
      left: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [startX, 0],
      }),
      top: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [startY, Layout.statusBarHeight],
      }),
    }

    const animateStyle2 = {
      opacity: this.animateValue.interpolate({
        inputRange: [0, 0.99, 1],
        outputRange: [0, 0, 1],
      })
    }

    const animateStyle3 = {
      position: 'absolute',
      height: this.props.navigation.getParam('height', 0) - Layout.statusBarHeight - WINDOW_HEIGHT / 3,
      width: WINDOW_WIDTH,
      backgroundColor: Colors.white,
      opacity: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      top: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [this.props.navigation.getParam('height', 0), Layout.statusBarHeight + WINDOW_HEIGHT / 3],
      }),
    }

    return (
      <View style={styles.contain}>
        <ScrollView
          onScrollEndDrag={(e) => this.setState({ scrollY: e.nativeEvent.contentOffset.y })}
          onMomentumScrollEnd={(e) => this.setState({ scrollY: e.nativeEvent.contentOffset.y })}
        >
          <Images
            image1={require('../assets/images/scenery/scenery01.jpg')}
            image2={require('../assets/images/scenery/scenery02.jpg')}
            image3={require('../assets/images/scenery/scenery03.jpg')}
            openImage={this.openImage}
          />
          <Images
            image1={require('../assets/images/scenery/scenery04.jpg')}
            image2={require('../assets/images/scenery/scenery05.jpg')}
            image3={require('../assets/images/scenery/scenery06.jpg')}
            openImage={this.openImage}
          />
          <Images
            image1={require('../assets/images/scenery/scenery07.jpg')}
            image2={require('../assets/images/scenery/scenery08.jpg')}
            image3={require('../assets/images/scenery/scenery09.jpg')}
            openImage={this.openImage}
          />
          <Images
            image1={require('../assets/images/scenery/scenery10.jpg')}
            image2={require('../assets/images/scenery/scenery11.jpg')}
            image3={require('../assets/images/scenery/scenery12.jpg')}
            openImage={this.openImage}
          />
          <Images
            image1={require('../assets/images/scenery/scenery01.jpg')}
            image2={require('../assets/images/scenery/scenery02.jpg')}
            image3={require('../assets/images/scenery/scenery03.jpg')}
            openImage={this.openImage}
          />
          <Images
            image1={require('../assets/images/scenery/scenery04.jpg')}
            image2={require('../assets/images/scenery/scenery05.jpg')}
            image3={require('../assets/images/scenery/scenery06.jpg')}
            openImage={this.openImage}
          />
        </ScrollView>
        <Animated.Image
          style={animateStyle}
          source={this.state.image}
          resizeMethod="scale"
        />

        <TouchableOpacity
          style={styles.close}
          onPress={this.closeImage}
        >
          <Animated.View style={animateStyle2}>
            <Text style={styles.closeText}>X</Text>
          </Animated.View>
        </TouchableOpacity>

        <Animated.View style={animateStyle3}>
          <Text style={styles.articleTitle}>Shared Element Photo Grid</Text>
          <Text style={{ fontSize: 16 }}>We'll use the concept of shared elements to build a photo grid using dynamic measurements, and our pointer events technique. We'll also show how to make it work on both iOS and Android</Text>
          <Text style={{ fontSize: 16 }}>We'll use the concept of shared elements to build a photo grid using dynamic measurements, and our pointer events technique. We'll also show how to make it work on both iOS and Android</Text>
        </Animated.View>
      </View>
    )
  }
}

class Images extends Component {
  constructor(props) {
    super(props)
    this.state = {
      y: 0,
    }
  }

  render() {
    return (
      <View
        style={styles.imageRow}
        onLayout={(e) => this.setState({ y: e.nativeEvent.layout.y })}
      >
        <TouchableOpacity
          onPress={() => this.props.openImage(0, this.state.y, this.props.image1)}
        >
          <Image
            style={styles.image}
            source={this.props.image1}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.openImage(WINDOW_WIDTH / 3, this.state.y, this.props.image2)}
        >
          <Image
            style={styles.image}
            source={this.props.image2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.openImage(WINDOW_WIDTH * 2 / 3, this.state.y, this.props.image3)}
        >
          <Image
            style={styles.image}
            source={this.props.image3}
          />
        </TouchableOpacity>
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
  imageRow: {
    flexDirection: 'row',
  },
  image: {
    height: WINDOW_WIDTH / 3,
    width: WINDOW_WIDTH / 3,
  },
  close: {
    position: 'absolute',
    top: Layout.statusBarHeight + 20,
    right: 30,
  },
  closeText: {
    color: Colors.white,
    fontSize: 30,
  },
  articleTitle: {
    fontSize: 30,
  },
})