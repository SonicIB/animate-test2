import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native'
import Constants from 'expo-constants'

export default class AnimateScreen23 extends Component {

  componentDidMount() {
    // this.animateValue.addListener(({ value }) => console.log(value) )
  }

  items = [0, 1, 2, 3, 4, 5, 6, 7]
  animateValue = new Animated.Value(0)
  animation = (i) => {
    Animated.timing(this.animateValue, {
      toValue: i,
      duration: 500,
    }).start()
  }

  render() {
    return (
      <View style={styles.contain}>
        <View style={styles.itemsContain}>
          {this.items.map(i => {
            const animateStyle = {
              transform: [
                { translateX: Animated.multiply(Animated.subtract(this.animateValue, new Animated.Value(i)), new Animated.Value(30)) }
              ]
            }
            return (
              <TouchableOpacity
                key={i}
                style={styles.circle}
                onPress={() => this.animation(i)}
              >
                <Animated.View style={[styles.mover, animateStyle]} />
              </TouchableOpacity>
            )
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
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
  itemsContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  circle: {
    height: 24,
    width: 24,
    backgroundColor: '#AAA',
    borderRadius: 12,
    marginRight: 6,
    overflow: 'hidden',
  },
  mover: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 24,
    width: 24,
    backgroundColor: '#FF8D00',
    borderRadius: 12,
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
})