import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Easing,
} from 'react-native';
import Constants from 'expo-constants'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const counter = () => {
  const [count, setCount] = useState(0)
  // useEffect(() => {
  //   let interval = setInterval(() => setCount(c => c + 1), 500)
  //   return () => clearInterval(interval)
  // }, [])
  useInterval(() => setCount(count + 1), 1000)

  return count
}

export default function AnimateScreen2(props) {
  const animateValue1 = useRef(new Animated.Value(1)).current
  const playAnimation = () => {
    Animated.sequence([
      Animated.timing(animateValue1, { toValue: 1.2 }),
      Animated.timing(animateValue1, { toValue: 0.8 }),
    ]).start(() => playAnimation())
  }
  useEffect(() => {
    setTimeout(playAnimation, 500)
  }, [])

  const animateStyle1 = {
    transform: [{ scale: animateValue1 }]
  }
  const count = counter()

  return (
    <View style={styles.contain}>
      <Text>{count}</Text>

      <Animated.View style={[styles.animateObject, animateStyle1]}>
        <Text style={styles.buttonText}>1</Text>
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.buttonText}>back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  animateObject: {
    height: 200,
    width: 200,
    backgroundColor: Colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 50,
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