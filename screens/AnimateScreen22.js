import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  PanResponder,
  Easing,
} from 'react-native'
import Constants from 'expo-constants'

export default class AnimateScreen22 extends Component {
  state = {
    buttonX: 300,
    buttonY: 300,
  }

  translateXY = new Animated.ValueXY()
  drag = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      this.changeScale()
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: this.translateXY.x, dy: this.translateXY.y },
    ]),
    onPanResponderRelease: (evt, gestureState) => {
      this.translateXY.extractOffset()
      this.recoverScale()
    }
  })

  scale = new Animated.Value(1)
  changeScale = () => {
    Animated.spring(this.scale, {
      toValue: 1.5,
      tension: 40,
      friction: 3,
    }).start()
  }
  recoverScale = () => {
    Animated.spring(this.scale, {
      toValue: 1,
      tension: 40,
      friction: 3,
    }).start()
  }

  render() {
    const { buttonX, buttonY } = this.state
    const opacityY = buttonY - Constants.statusBarHeight

    const animateStyle = {
      transform: [
        ...this.translateXY.getTranslateTransform(),
        { scale: this.scale },
      ],
      backgroundColor: this.translateXY.x.interpolate({
        inputRange: [buttonX - 50.0001, buttonX - 50, buttonX + 200, buttonX + 200.0001],
        outputRange: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'],
      }),
    }

    const animateStyle2 = {
      opacity: this.translateXY.y.interpolate({
        inputRange: [opacityY - 50.0001, opacityY - 50, opacityY + 50, opacityY + 50.0001],
        outputRange: [1, 0.2, 0.2, 1],
      }),
    }

    return (
      <View style={styles.contain}>
        <Animated.View
          {...this.drag.panHandlers}
          style={[styles.circle, animateStyle]}
        >
          <Animated.View
            {...this.drag.panHandlers}
            style={[styles.circle, { backgroundColor: '#000' }, animateStyle2]}
          />
        </Animated.View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
          onLayout={({ nativeEvent }) => this.setState({ buttonX: nativeEvent.layout.x, buttonY: nativeEvent.layout.y })}
        >
          <Text>BACK</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  button: {
    position: 'absolute',
    bottom: 100,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
  },
  circle: {
    height: 50,
    width: 50,
    // backgroundColor: '#000',
    borderRadius: 25,
  }
})