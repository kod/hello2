import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';

import ProductDetailMain from '../screens/ProductDetailMain';
import Me from '../screens/Me';

import { SCREENS } from '../common/constants';
import CustomIcon from '../components/CustomIcon.js';
import { WINDOW_WIDTH, WINDOW_HEIGHT, PRIMARY_COLOR, STATUSBAR_HEIGHT } from '../styles/variables';

const opacity_tcy = 0.8;

class CustomTabBarComponent extends React.Component {
  handleOnScroll = event => {
    console.log(event);
    // const { productdetailOpacityFetch } = this.props;
    // let opacity = 0;
    // const opacity_height = event.nativeEvent.layoutMeasurement.width * 0.8;
    // if (event.nativeEvent.contentOffset.y < opacity_height) {
    //   opacity = event.nativeEvent.contentOffset.y / opacity_height;
    // } else {
    //   opacity = 1;
    // }
    // productdetailOpacityFetch(opacity);
  };
  
  render() {
    const { BYopacity = 1 } = this.props.screenProps;
    return (
      <TabBarTop
        onScroll={this.handleOnScroll}
        {...this.props}
        style={{
          ...this.props.style,
          opacity: BYopacity,
        }}
      />
    );
  }
}

const RouteConfigs = {
  [SCREENS.ProductDetailMain]: {
    screen: ProductDetailMain,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.product,
      tabBarIcon: ({ tintColor }) => <CustomIcon name="home" size={16} color={tintColor} />
    })
  },
  [SCREENS.Me]: {
    screen: Me,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.parameter,
      tabBarIcon: ({ tintColor }) => <CustomIcon name="user" size={16} color={tintColor} />
    })
  },
  ['hhhhh']: {
    screen: Me,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.comment,
      tabBarIcon: ({ tintColor }) => <CustomIcon name="user" size={16} color={tintColor} />
    })
  }
};

const TabNavigatorConfig = {
  tabBarComponent: CustomTabBarComponent,
  lazy: true,
  swipeEnabled: true,
  animationEnabled: false,
  initialRouteName: SCREENS.ProductDetailMain,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: PRIMARY_COLOR,
    inactiveTintColor: '#666',
    showIcon: false,
    upperCaseLabel: false,
    style: {
      position: 'absolute',
      zIndex: 201,
      bottom: WINDOW_HEIGHT - STATUSBAR_HEIGHT - 40,
      left: 40,
      width: WINDOW_WIDTH - 80,
      height: 40,
      backgroundColor: '#fff',
      elevation: 0,
      shadowOpacity: 0,
      padding: 0,
      margin: 0,
      borderTopWidth: 0,
    },
    indicatorStyle: {
      width: (WINDOW_WIDTH - 80) / 3,
      backgroundColor: PRIMARY_COLOR,
      padding: 0,
      margin: 0
    },
    tabStyle: {
      padding: 0,
      margin: 0,
      height: 40,
      width: (WINDOW_WIDTH - 80) / 3
    },
    labelStyle: {
      fontSize: 14,
      padding: 0,
      margin: 0
    },
    iconStyle: {
      padding: 0,
      margin: 0
    }
  }
};

const TabContainer = TabNavigator(RouteConfigs, TabNavigatorConfig);

export default TabContainer;
