import React, { Component } from 'react';
import {
  Animated,
  // Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const WINDOW_WIDTH = Layout.window.width


export default class AnimateHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
    }
  }

  render() {
    return (
      <View
        style={styles.contain}
        onLayout={(e) => this.setState({ height: e.nativeEvent.layout.height })}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          overScrollMode="never"
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate1')}
          >
            <Text style={styles.buttonText}>bar animation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate2')}
          >
            <Text style={styles.buttonText}>animation2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate3')}
          >
            <Text style={styles.buttonText}>animation3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate4')}
          >
            <Text style={styles.buttonText}>animation4</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate5')}
          >
            <Text style={styles.buttonText}>animation5</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate6', { height: this.state.height })}
          >
            <Text style={styles.buttonText}>animation6</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate7')}
          >
            <Text style={styles.buttonText}>animation7</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate8')}
          >
            <Text style={styles.buttonText}>login animation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate9', { height: this.state.height })}
          >
            <Text style={styles.buttonText}>animation9</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate10')}
          >
            <Text style={styles.buttonText}>questionnaire</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate11', { height: this.state.height })}
          >
            <Text style={styles.buttonText}>scenery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate12', { height: this.state.height })}
          >
            <Text style={styles.buttonText}>color picker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate13')}
          >
            <Text style={styles.buttonText}>floating button</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate14')}
          >
            <Text style={styles.buttonText}>scroll view</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate15')}
          >
            <Text style={styles.buttonText}>animation15</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate16')}
          >
            <Text style={styles.buttonText}>number ticker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate17')}
          >
            <Text style={styles.buttonText}>animation17</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate18')}
          >
            <Text style={styles.buttonText}>Lottie</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate19')}
          >
            <Text style={styles.buttonText}>Hooks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate20')}
          >
            <Text style={styles.buttonText}>Gesture Handler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate21')}
          >
            <Text style={styles.buttonText}>Swipeable</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate22')}
          >
            <Text style={styles.buttonText}>Animate22</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Animate23')}
          >
            <Text style={styles.buttonText}>Animate23</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: Colors.white,
    paddingTop: Layout.statusBarHeight,
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.white,
  },
})