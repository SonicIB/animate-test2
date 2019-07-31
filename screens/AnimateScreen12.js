import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  // TouchableWithoutFeedback,
  View,
  ScrollView,
  // Easing,
  Alert,
} from 'react-native'
import { Foundation } from '@expo/vector-icons'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width

export default class AnimateScreen12 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: this.props.navigation.getParam('height', 0), // this.props.navigation.state.params.height,
      startY: 0,
      showControl: false,
      showType: true,
      colorCode: '000000',
      colorShow: '#000000',
    }
    this.animateValue1 = new Animated.Value(0)
    this.animateValue2 = new Animated.Value(0)
  }

  toggleControl = () => {
    if (!this.state.showControl) {
      this.playAnimation1()
      this.setState({ showControl: true })
    } else {
      if (!this.state.showType) this.toggleType()
      this.backAnimation1()
      this.setState({ showControl: false })
    }
  }

  playAnimation1 = () => {
    Animated.spring(this.animateValue1, {
      toValue: 1,
      friction: 5,
    }).start()
  }

  backAnimation1 = () => {
    Animated.timing(this.animateValue1, {
      toValue: 0,
      duration: 250,
    }).start()
  }

  toggleType = () => {
    if (this.state.showType) {
      this.setState({ showType: false }, () => this.playAnimation2())
      this.colorInput.focus()
    } else {
      this.colorInput.blur()
      this.backAnimation2()
      setTimeout(() => this.setState({ showType: true }), 300)
    }
  }

  playAnimation2 = () => {
    Animated.timing(this.animateValue2, {
      toValue: 1,
      duration: 300,
    }).start()
  }

  backAnimation2 = () => {
    Animated.timing(this.animateValue2, {
      toValue: 0,
      duration: 300,
    }).start()
  }

  setColor = () => {
    let { colorCode } = this.state
    if (colorCode.length === 6 || colorCode.length === 3) {
      this.toggleType()
      colorCode = colorCode.toUpperCase()
      this.setState({
        colorShow: `#${colorCode}`,
        colorCode,
      })
    } else {
      Alert.alert(
        'Input Error',
        'Must be 3 or 6 characters.',
        [{ text: 'OK', onPress: () => this.colorInput.focus() }],
      )
    }
  }

  render() {
    const {
      showControl,
      showType,
      colorCode,
      colorShow,
    } = this.state

    const animateStyle1 = {
      top: this.animateValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [this.state.startY, this.state.startY - 90],
      }),
      left: this.animateValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [WINDOW_WIDTH / 2, WINDOW_WIDTH / 2 - 125],
      }),
      height: this.animateValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 60],
      }),
      width: this.animateValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 250],
      }),
    }

    const animateStyle2 = {
      opacity: this.animateValue2.interpolate({
        inputRange: [0, 0.99, 1],
        outputRange: [0, 0, 1],
      }),
    }

    const animateStyle3 = {
      position: 'absolute',
      top: this.animateValue2.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 10],
      }),
      left: this.animateValue2.interpolate({
        inputRange: [0, 1],
        outputRange: [32, 170],
      }),
    }

    const animateStyle4 = {
      height: this.animateValue2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 40],
      }),
      width: this.animateValue2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 60],
      })
    }

    return (
      <ScrollView
        contentContainerStyle={styles.contain}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={[styles.controlBar, animateStyle1]}>
          {showControl &&
            <TouchableOpacity
              style={[styles.colorChange, { backgroundColor: colorShow }]}
              onPress={this.toggleType}
            />
          }

          <Animated.View style={[styles.colorInputContain, animateStyle2]}>
            <Text style={{ fontSize: 24, color: Colors.darkGrey }}>#</Text>
            <TextInput
              ref={(ref) => this.colorInput = ref}
              style={styles.colorInput}
              value={colorCode}
              onChangeText={(colorCode) => {
                arr = colorCode.match(/[0-9A-F]/gi)
                colorCode = arr ? arr.join('') : ''
                this.setState({ colorCode })
              }}
              onSubmitEditing={this.setColor}
              autoCapitalize="characters"
              autoCorrect={false}
              blurOnSubmit={false}
              keyboardType="visible-password"
              maxLength={6}
              returnKeyType="done"
              selectionColor={Colors.cartoonBlue}
              selectTextOnFocus={true}
              underlineColorAndroid="transparent"
            />
          </Animated.View>

          <Animated.View style={animateStyle3}>
            <TouchableOpacity onPress={this.setColor}>
              <Animated.View style={[styles.colorConfirm, animateStyle4]}>
                <Text style={styles.colorConfirmText}>OK</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.typeContain}>
            <TouchableOpacity
              style={[styles.typeButton, { display: showControl && showType ? 'flex' : 'none' }]}
            >
              <Foundation
                name="bold"
                size={40}
                color={Colors.darkGrey}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeButton, { display: showControl && showType ? 'flex' : 'none' }]}
            >
              <Foundation
                name="italic"
                size={40}
                color={Colors.darkGrey}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeButton, { display: showControl && showType ? 'flex' : 'none' }]}
            >
              <Foundation
                name="align-center"
                size={40}
                color={Colors.darkGrey}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeButton, { display: showControl && showType ? 'flex' : 'none' }]}
            >
              <Foundation
                name="link"
                size={40}
                color={Colors.darkGrey}
              />
            </TouchableOpacity>
          </View>

        </Animated.View>

        <TouchableOpacity
          style={styles.button}
          onLayout={(e) => this.setState({ startY: e.nativeEvent.layout.y })}
          onPress={this.toggleControl}
        >
          <Text style={styles.buttonText}>toggle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>back</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBar: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    // shadowRadius: 5,
  },
  colorChange: {
    position: 'absolute',
    top: 18,
    left: 20,
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.darkGrey,
  },
  colorInputContain: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 14,
    left: 52,
  },
  colorInput: {
    width: 100,
    fontSize: 24,
    color: Colors.darkGrey,
  },
  colorConfirmContain: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  colorConfirm: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.cartoonBlue,
    borderRadius: 20,
  },
  colorConfirmText: {
    color: Colors.white,
    fontSize: 20,
  },
  typeContain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 10,
  },
  typeButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 24,
  }
})