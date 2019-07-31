import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Ionicons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons'

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/star_sky.jpg'),
        require('./assets/images/scenery/scenery01.jpg'),
        require('./assets/images/scenery/scenery02.jpg'),
        require('./assets/images/scenery/scenery03.jpg'),
        require('./assets/images/scenery/scenery04.jpg'),
        require('./assets/images/scenery/scenery05.jpg'),
        require('./assets/images/scenery/scenery06.jpg'),
        require('./assets/images/scenery/scenery07.jpg'),
        require('./assets/images/scenery/scenery08.jpg'),
        require('./assets/images/scenery/scenery09.jpg'),
        require('./assets/images/scenery/scenery10.jpg'),
        require('./assets/images/scenery/scenery11.jpg'),
        require('./assets/images/scenery/scenery12.jpg'),
        require('./assets/images/computer.png'),
        require('./assets/images/tablet.png'),
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        ...Foundation.font,
        ...MaterialCommunityIcons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
