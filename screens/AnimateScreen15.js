import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Easing,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width
const WINDOW_HEIGHT = Layout.window.height


export default class AnimateScreen15 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // height: this.props.navigation.state.params.height,
    }
    this.animateValue = new Animated.Value(0)
  }

  playAnimation = () => {
    Animated.timing(this.animateValue, {
      toValue: 2,
      duration: 800,
    }).start()
    this.input.focus()
  }

  backAnimation = () => {
    this.input.blur()
    Animated.timing(this.animateValue, {
      toValue: 0,
      duration: 800,
    }).start()
  }

  render() {
    const animateStyle1 = {
      height: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [60, 0],
        extrapolate: 'clamp',
      }),
      width: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
        extrapolate: 'clamp',
      }),
      opacity: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
    }

    const animateStyle2 = {
      top: this.animateValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [WINDOW_HEIGHT / 3, WINDOW_HEIGHT / 3, 50],
      }),
      width: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [50, WINDOW_WIDTH / 2 - 10],
        extrapolate: 'clamp',
      }),
    }

    const animateStyle3 = {
      opacity: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    }

    const animateStyle4 = {
      height: this.animateValue.interpolate({
        inputRange: [1, 2],
        outputRange: [0, 200],
        extrapolate: 'clamp',
      }),
      width: this.animateValue.interpolate({
        inputRange: [0.99, 1, 2],
        outputRange: [0, WINDOW_WIDTH - 20, WINDOW_WIDTH - 20],
        extrapolate: 'clamp',
      }),
      top: this.animateValue.interpolate({
        inputRange: [1, 2],
        outputRange: [WINDOW_HEIGHT / 3 + 60, 50 + 60],
        extrapolate: 'clamp',
      }),
      opacity: this.animateValue.interpolate({
        inputRange: [0.99, 1, 2],
        outputRange: [0, 1, 1],
        extrapolate: 'clamp',
      }),
    }

    const animateStyle5 = {
      position: 'absolute',
      alignSelf: 'center',
      top: this.animateValue.interpolate({
        inputRange: [1, 2],
        outputRange: [WINDOW_HEIGHT / 3 + 70, 50 + 60 + 200 + 10],
        extrapolate: 'clamp',
      }),
      opacity: this.animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    }


    return (
      <ScrollView
        contentContainerStyle={styles.contain}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={[styles.write, animateStyle1]}>
          <TouchableOpacity
            onPress={this.playAnimation}
          >
            <Animated.View style={styles.writeContain}>
              <Text style={styles.writeText}>Write</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.leftBar, animateStyle2]}>
          <Animated.View style={[styles.leftBarContain, animateStyle3]}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="format-bold"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name="format-italic"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name="format-underline"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name="format-list-numbers"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.rightBar, animateStyle2]}>
          <Animated.View style={[styles.rightBarContain, animateStyle3]}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="link"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name="image"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name="arrow-down-bold-box"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.inputContain, animateStyle4]}>
          <TextInput
            ref={(ref) => this.input = ref}
            style={styles.input}
            placeholder="Start writing..."
            underlineColorAndroid="transparent"
            multiline={true}
          />
        </Animated.View>

        <Animated.View style={animateStyle5}>
          <TouchableOpacity
            style={styles.close}
            onPress={this.backAnimation}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

      </ScrollView>
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
  write: {
    position: 'absolute',
    top: WINDOW_HEIGHT / 3,
    alignSelf: 'center',
    backgroundColor: Colors.green,
    zIndex: 2,
  },
  writeContain: {
    height: 60,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writeText: {
    color: Colors.white,
    fontSize: 24,
  },
  leftBar: {
    position: 'absolute',
    right: WINDOW_WIDTH / 2,
    height: 60,
    backgroundColor: Colors.green,
    zIndex: 1,
  },
  leftBarContain: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  rightBar: {
    position: 'absolute',
    left: WINDOW_WIDTH / 2,
    height: 60,
    backgroundColor: Colors.green,
    zIndex: 1,
  },
  rightBarContain: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 24,
  },
  inputContain: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: Colors.grey,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 24,
    color: Colors.darkGrey,
  },
  close: {
    // borderWidth: 1,
    // height: 30,
    // width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: Colors.green,
    fontSize: 24,
  }
})