import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  // TouchableOpacity,
  Animated,
} from 'react-native'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {
  PanGestureHandler,
  State as GestureState,
  TouchableOpacity,
} from 'react-native-gesture-handler'

import Layout from '../constants/Layout'

const DATA = [
  { id: '1', title: 'title 1' },
  { id: '2', title: 'title 2' },
  { id: '3', title: 'title 3' },
  { id: '4', title: 'title 4' },
  { id: '5', title: 'title 5' },
  { id: '6', title: 'title 6' },
]

export default class AnimateScreen21 extends Component {
  state = {
    shadowTitle: 'shadow',
    data: DATA,
  }

  panOnGentureEvent = (nativeEvent, item, index) => {
    if (nativeEvent.state === GestureState.ACTIVE) {
      this.shadow.setNativeProps({
        top: nativeEvent.absoluteY,
      })
      const indexNow = this.positionToIndex(nativeEvent.absoluteY)
      if (indexNow < this.state.data.length) {
        this.separatorRef[indexNow].setNativeProps({
          height: 50,
        })
      }
      if (this.indexPast !== indexNow) {
        if (this.indexPast < this.state.data.length) {
          this.separatorRef[this.indexPast].setNativeProps({
            height: 0,
          })
        }
        this.indexPast = indexNow
      }
    }
  }

  panOnHandlerStateChange = (nativeEvent, item, index) => {
    if (nativeEvent.state === GestureState.BEGAN) {
      this.setState({ shadowTitle: item.title })
    }
    if (nativeEvent.state === GestureState.ACTIVE) {
      this.shadow.setNativeProps({
        display: 'flex',
        position: 'absolute',
        top: nativeEvent.absoluteY,
      })
      this.itemRef[index].setNativeProps({
        opacity: 0,
        height: 1,
      })
      this.indexPast = index
    }
    if (nativeEvent.oldState === GestureState.ACTIVE) {
      const { data } = this.state
      this.shadow.setNativeProps({
        display: 'none',
        position: 'relative',
      })
      this.itemRef[index].setNativeProps({
        opacity: 1,
        height: 50,
      })
      let indexNow = this.positionToIndex(nativeEvent.absoluteY)
      if (indexNow < data.length) {
        this.separatorRef[indexNow].setNativeProps({
          height: 0,
        })
      }
      if (index > indexNow) {
        const arr = [...data.slice(0, indexNow), data[index], ...data.slice(indexNow, index), ...data.slice(index + 1)]
        this.setState({ data: arr })
      } else if (index < indexNow) {
        const arr = [...data.slice(0, index), ...data.slice(index + 1, indexNow), data[index], ...data.slice(indexNow)]
        this.setState({ data: arr })
      }
    }
  }

  itemsHeight = {}

  setItemHeight = (event, id) => {
    this.itemsHeight[id] = event.layout.height
  }

  positionToIndex = (position) => {
    const { data } = this.state
    let p = position - Constants.statusBarHeight
    let i = 0
    let h = 0
    for (i; i < data.length; i += 1) {
      h += this.itemsHeight[data[i].id]
      if (h > p) return i
    }
    return i
  }

  // separatorRef = {}

  // listSeparator = ({ leadingItem }) => (
  //   <View
  //     ref={ref => this.separatorRef[leadingItem.id] = ref}
  //     style={styles.separator}
  //   />
  // )

  itemRef = {}
  separatorRef = {}

  listItem = ({ item, index }) => (
    <View>
      <View ref={ref => this.separatorRef[index] = ref} />
      <Swipeable
        renderLeftActions={this.leftAction}
        renderRightActions={this.rightAction}
      >
        <View
          ref={ref => (this.itemRef[index] = ref)}
          style={{ flexDirection: 'row', backgroundColor: '#FFF' }}
          onLayout={({ nativeEvent }) => this.setItemHeight(nativeEvent, item.id)}
        >
          <TouchableOpacity
            style={styles.leftItem}
          // onPress={() => separators.highlight()}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
          <PanGestureHandler
            onGestureEvent={({ nativeEvent }) => this.panOnGentureEvent(nativeEvent, item, index)}
            onHandlerStateChange={({ nativeEvent }) => this.panOnHandlerStateChange(nativeEvent, item, index)}
            activeOffsetY={[-3, 3]}
          >
            <View style={styles.rightItem}>
              <Ionicons
                name="ios-menu"
                size={20}
              />
            </View>
          </PanGestureHandler>
        </View>
      </Swipeable>
    </View>
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
    const {
      shadowTitle,
      data
    } = this.state

    return (
      <View style={styles.contain}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={this.listItem}
        // ItemSeparatorComponent={this.listSeparator}
        // ListHeaderComponent={this.listHeader}
        />
        <View
          ref={ref => this.shadow = ref}
          style={styles.shadow}
        >
          <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{shadowTitle}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons
              name="ios-menu"
              size={20}
            />
          </View>
        </View>
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
  leftItem: {
    minHeight: 50,
    width: Layout.window.width * 5 / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightItem: {
    minHeight: 50,
    width: Layout.window.width / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    opacity: 0.3,
    borderWidth: 1,
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
  },
  shadow: {
    display: 'none',
    position: 'relative',
    height: 50,
    width: Layout.window.width,
    flexDirection: 'row',
    backgroundColor: '#999',
    opacity: 0.5,
    // justifyContent: 'center',
    // alignItems: 'center',
  }
})