import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AnimateScreen1 from '../screens/AnimateScreen1'
import AnimateScreen2 from '../screens/AnimateScreen2'
import AnimateScreen3 from '../screens/AnimateScreen3'
import AnimateScreen4 from '../screens/AnimateScreen4'
import AnimateScreen5 from '../screens/AnimateScreen5'
import AnimateScreen6 from '../screens/AnimateScreen6'
import AnimateScreen7 from '../screens/AnimateScreen7'
import AnimateScreen8 from '../screens/AnimateScreen8'
import AnimateScreen9 from '../screens/AnimateScreen9'
import AnimateScreen10 from '../screens/AnimateScreen10'
import AnimateScreen11 from '../screens/AnimateScreen11'
import AnimateScreen12 from '../screens/AnimateScreen12'
import AnimateScreen13 from '../screens/AnimateScreen13'
import AnimateScreen14 from '../screens/AnimateScreen14'
import AnimateScreen15 from '../screens/AnimateScreen15'
import AnimateScreen16 from '../screens/AnimateScreen16'
import AnimateScreen17 from '../screens/AnimateScreen17'
import AnimateScreen18 from '../screens/AnimateScreen18'
import AnimateScreen19 from '../screens/AnimateScreen19'
import AnimateScreen20 from '../screens/AnimateScreen20'
import AnimateScreen21 from '../screens/AnimateScreen21'
import AnimateScreen22 from '../screens/AnimateScreen22'
import AnimateScreen23 from '../screens/AnimateScreen23'
import AnimateHome from '../screens/AnimateHome'

const AnimateStack = createStackNavigator({
  Home: {
    screen: AnimateHome,
    navigationOptions: {
      header: null,
    },
  },
  Animate1: {
    screen: AnimateScreen1,
    navigationOptions: {
      header: null,
    },
  },
  Animate2: {
    screen: AnimateScreen2,
    navigationOptions: {
      header: null,
    },
  },
  Animate3: {
    screen: AnimateScreen3,
    navigationOptions: {
      header: null,
    },
  },
  Animate4: {
    screen: AnimateScreen4,
    navigationOptions: {
      header: null,
    },
  },
  Animate5: {
    screen: AnimateScreen5,
    navigationOptions: {
      header: null,
    },
  },
  Animate6: {
    screen: AnimateScreen6,
    navigationOptions: {
      header: null,
    },
  },
  Animate7: {
    screen: AnimateScreen7,
    navigationOptions: {
      header: null,
    },
  },
  Animate8: {
    screen: AnimateScreen8,
    navigationOptions: {
      header: null,
    },
  },
  Animate9: {
    screen: AnimateScreen9,
    navigationOptions: {
      header: null,
    },
  },
  Animate10: {
    screen: AnimateScreen10,
    navigationOptions: {
      header: null,
    },
  },
  Animate11: {
    screen: AnimateScreen11,
    navigationOptions: {
      header: null,
    },
  },
  Animate12: {
    screen: AnimateScreen12,
    navigationOptions: {
      header: null,
    },
  },
  Animate13: {
    screen: AnimateScreen13,
    navigationOptions: {
      header: null,
    },
  },
  Animate14: {
    screen: AnimateScreen14,
    navigationOptions: {
      header: null,
    },
  },
  Animate15: {
    screen: AnimateScreen15,
    navigationOptions: {
      header: null,
    },
  },
  Animate16: {
    screen: AnimateScreen16,
    navigationOptions: {
      header: null,
    },
  },
  Animate17: {
    screen: AnimateScreen17,
    navigationOptions: {
      header: null,
    },
  },
  Animate18: {
    screen: AnimateScreen18,
    navigationOptions: {
      header: null,
    },
  },
  Animate19: {
    screen: AnimateScreen19,
    navigationOptions: {
      header: null,
    },
  },
  Animate20: {
    screen: AnimateScreen20,
    navigationOptions: {
      header: null,
    },
  },
  Animate21: {
    screen: AnimateScreen21,
    navigationOptions: {
      header: null,
    },
  },
  Animate22: {
    screen: AnimateScreen22,
    navigationOptions: {
      header: null,
    },
  },
  Animate23: {
    screen: AnimateScreen23,
    navigationOptions: {
      header: null,
    },
  },
});

AnimateStack.navigationOptions = {
  tabBarLabel: 'Animate',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-film`
          : 'md-film'
      }
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default createMaterialTopTabNavigator(
  {
    AnimateStack,
    // HomeStack,
  },
  {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
      pressColor: 'transparent',
      activeTintColor: '#3478f6',//focus顏色
      inactiveTintColor: '#929292',//blur顏色
      indicatorStyle: { backgroundColor: 'transparent' },//tab按鈕的底線，android才有
      style: { backgroundColor: '#f7f7f7', borderTopWidth: 0.2, borderTopColor: 'rgba(0, 0, 0, 0.3)' },
      tabStyle: { padding: 0, opacity: 1 },
      labelStyle: { margin: 0, marginTop: 4, marginBottom: 1, fontSize: 10 },
      iconStyle: { marginTop: -5, width: 26, height: 26 },//預設的icon框架為24*24
    },
  }
);
