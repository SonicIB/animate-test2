import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native'
import Constants from 'expo-constants'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

export default class AnimateScreen20 extends Component {
  state = {
    buttonX: 300,
    buttonY: 300,
  }

  // componentDidMount() {
  //   const x = Animated.diffClamp(this.translateXY.x, 50, 200)
  //   console.log(x)
  // }

  translateXY = new Animated.ValueXY({ x: 0, y: 0 })
  lastOffset = { x: 0, y: 0 }
  gestureEvent = Animated.event(
    [{
      nativeEvent: {
        translationX: this.translateXY.x,
        translationY: this.translateXY.y,
      }
    }], { useNativeDriver: true })

  handlerStateChange = ({ nativeEvent }) => {
    // console.log(nativeEvent)
    if (nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += nativeEvent.translationX
      this.lastOffset.y += nativeEvent.translationY
      this.translateXY.setOffset({ x: this.lastOffset.x, y: this.lastOffset.y })
      this.translateXY.setValue({ x: 0, y: 0 })
    }
  }

  render() {
    const { buttonX, buttonY } = this.state
    const opacityY = buttonY - Constants.statusBarHeight

    const animateStyle = {
      transform: this.translateXY.getTranslateTransform(),
      opacity: this.translateXY.x.interpolate({
        inputRange: [buttonX - 50.0001, buttonX - 50, buttonX + 200, buttonX + 200.0001],
        outputRange: [1, 0, 0, 1],
      })
    }

    const animateStyle2 = {
      opacity: this.translateXY.y.interpolate({
        inputRange: [opacityY - 50.0001, opacityY - 50, opacityY + 50, opacityY + 50.0001],
        outputRange: [1, 0.2, 0.2, 1],
      })
    }

    return (
      <View style={styles.contain}>
        <PanGestureHandler
          onGestureEvent={this.gestureEvent}
          onHandlerStateChange={this.handlerStateChange}
        >
          <Animated.View
            style={[styles.circle, animateStyle]}
          >
            <Animated.View
              style={[styles.circle, animateStyle2]}
            />
          </Animated.View>
        </PanGestureHandler>
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
    backgroundColor: '#000',
    borderRadius: 25,
  }
})