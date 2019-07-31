import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native'
import Constants from 'expo-constants'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const DATA = [
  { id: '1', title: 'title 1' },
  { id: '2', title: 'title 2' },
  { id: '3', title: 'title 3' },
  { id: '4', title: 'title 4' },
  { id: '5', title: 'title 5' },
  { id: '6', title: 'title 6' },
]

export default class AnimateScreen21 extends Component {

  listSeparator = () => (
    <View style={styles.separator} />
  )

  listItem = ({ item }) => (
    <Swipeable
      renderLeftActions={this.leftAction}
      renderRightActions={this.rightAction}
    >
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    </Swipeable>
  )

  leftAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })

    const animateStyle = {
      transform: [
        { scale }
      ]
    }
    return (
      <View style={styles.leftAction}>
        <Animated.Text style={[styles.actionText, animateStyle]}>left test</Animated.Text>
      </View>
    )
  }

  rightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    const animateStyle = {
      transform: [
        { scale }
      ]
    }
    return (
      <TouchableOpacity>
        <View style={styles.rightAction}>
          <Animated.Text style={[styles.actionText, animateStyle]}>right test</Animated.Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.contain}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={this.listItem}
          ItemSeparatorComponent={this.listSeparator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Constants.statusBarHeight,
  },
  item: {
    minHeight: 50,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    // borderBottomWidth: 1,
    paddingLeft: 10,
  },
  separator: {
    opacity: 0.3,
    borderTopWidth: 1,
    marginHorizontal: 5,
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#388E3C',
    justifyContent: 'center',
  },
  rightAction: {
    // flex: 1,
    backgroundColor: '#DD2C00',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#FFF',
    fontWeight: 'bold',
    padding: 20,
  }
})