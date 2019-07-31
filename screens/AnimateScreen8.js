import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  // TouchableWithoutFeedback,
  View,
  ScrollView,
  Image,
  // Easing,
} from 'react-native';

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width
const WINDOW_HEIGHT = Layout.window.height

export default class AnimateScreen8 extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.animateValue1 = new Animated.Value(0)
    this.animateValue2 = new Animated.Value(0)
    this.animateValue3 = new Animated.Value(0)
  }

  componentDidMount() {
    // Animated.sequence([
    //   Animated.delay(200),
    //   Animated.timing(this.animateValue1, {
    //     toValue: 1,
    //     duration: 100,
    //   }),
    //   Animated.timing(this.animateValue2, {
    //     toValue: 1,
    //     duration: 100,
    //   }),
    //   Animated.timing(this.animateValue3, {
    //     toValue: 1,
    //     duration: 100,
    //   }),
    // ]).start()
    const playAnimation = () => (
      Animated.stagger(200, [
        Animated.delay(),
        Animated.timing(this.animateValue1, {
          toValue: 1,
          duration: 500,
        }),
        Animated.timing(this.animateValue2, {
          toValue: 1,
          duration: 500,
        }),
        Animated.timing(this.animateValue3, {
          toValue: 1,
          duration: 500,
        }),
      ]).start(() => this.EmailInput.focus())
    )
    setTimeout(() => playAnimation(), 300)
  }

  render() {
    const animateStyle1 = {
      opacity: this.animateValue1
    }

    const animateStyle2 = {
      opacity: this.animateValue2
    }

    const animateStyle3 = {
      opacity: this.animateValue3
    }

    return (
      <ScrollView
        contentContainerStyle={styles.contain}

      >
        <Image
          style={styles.bgImage}
          source={require('../assets/images/star_sky.jpg')}
          resizeMode="cover"
        />

        <View style={{ flex: 1 }} />

        <View style={styles.bgShadow}>
          <View style={styles.titleContain}>
            <Text style={styles.title}>Login</Text>
          </View>

          <Animated.View style={[styles.inputContain, animateStyle1]}>
            <TextInput
              style={styles.input}
              ref={(ref) => this.EmailInput = ref}
              placeholder="Email"
              underlineColorAndroid="transparent"
            />
          </Animated.View>

          <Animated.View style={[styles.inputContain, animateStyle2]}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              underlineColorAndroid="transparent"
            />
          </Animated.View>

          <TouchableOpacity>
            <Animated.View style={[styles.button, animateStyle3]}>
              <Text style={styles.buttonText}>Login</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>


      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: Layout.statusBarHeight,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bgImage: {
    position: 'absolute',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    zIndex: -1,
  },
  bgShadow: {
    flex: 4,
    alignItems: 'center',
    backgroundColor: Colors.shadow,
  },
  titleContain: {
    marginVertical: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 30,
  },
  inputContain: {
    marginTop: 10,
  },
  input: {
    backgroundColor: Colors.white,
    height: 40,
    width: 250,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.buttonRed,
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
})