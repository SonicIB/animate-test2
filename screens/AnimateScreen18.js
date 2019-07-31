import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Lottie from 'lottie-react-native'

import Colors from '../constants/Colors'

export default class AnimateScreen18 extends React.Component {
  state = {
    animation: null,
  };

  componentWillMount() {
    this._playAnimation();
  }

  componentDidMount() {
    this.animation2.play()
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        {this.state.animation &&
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#eee',
            }}
            source={this.state.animation}
          />}
        <Lottie
          ref={ref => this.animation2 = ref}
          style={{ width: 100, height: 100, backgroundColor: '#ddd' }}
          source={require('../assets/lottie/lottie-test.json')}
          speed={2}
          loop={false}
        />
        <View style={styles.buttonContainer}>
          <Button title="Restart Animation" onPress={this._playAnimation} />
          <TouchableOpacity
            style={styles.button}
            onPress={this.playAnimation2}
          >
            <Text style={styles.buttonText}>Restart Animation2</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  playAnimation2 = () => {
    this.animation2.reset()
    this.animation2.play()
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result = await fetch(
      'https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/Watermelon.json'
    )
      .then(data => {
        return data.json();
      })
      .catch(error => {
        console.error(error);
      });
    this.setState({ animation: result }, this._playAnimation);
  };
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
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
});
