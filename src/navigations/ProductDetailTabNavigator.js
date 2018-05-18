import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import ProductDetailMain from '../screens/ProductDetailMain';
import ProductDetailParam from '../screens/ProductDetailParam';
import ProductDetailComment from '../screens/ProductDetailComment';

import { SCREENS } from '../common/constants';
import CustomIcon from '../components/CustomIcon.js';
import { WINDOW_WIDTH, WINDOW_HEIGHT, PRIMARY_COLOR, STATUSBAR_HEIGHT, SIDEINTERVAL } from '../styles/variables';

const opacity_tcy = 0.8;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    bottom: WINDOW_HEIGHT - STATUSBAR_HEIGHT - 90,
    left: 0,
    zIndex: 400,
    flexDirection: 'row',
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#fff',
  },
  header1: {
    position: 'absolute',
    bottom: WINDOW_HEIGHT - STATUSBAR_HEIGHT - 90,
    left: 0,
    zIndex: 350,
    flexDirection: 'row',
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#fff',
  },
  headerLeft: {
    fontSize: 16,
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
  },
  headerMiddle: {
    flex: 1,
    height: 40,
  },
  headerRight: {
    fontSize: 16,
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
  },
});

class CustomTabBarComponent extends React.Component {

  renderMain(style, opacity, type) {
    const {
      navigation: {goBack},
      screenProps: {handleOnPressToggleMenuBottomSheet}
    } = this.props;
    console.log(this.props);
    console.log(this.props.navigation);
    console.log(goBack);
    
    if (type === 'main') {
      return (
        <Animated.View style={[style,]} >
          <CustomIcon name="back" 
            onPress={() => goBack()} 
            style={[styles.headerLeft, { opacity: 1 }]} 
          />
          <View style={[styles.headerMiddle, { opacity }]} ></View>
          <TabBarTop 
            {...this.props} 
            style={{
              ...this.props.style,
              opacity: opacity,
            }}
          />
          <SimpleLineIcons 
            name="share" 
            onPress={() => handleOnPressToggleMenuBottomSheet('share')} 
            style={[styles.headerRight, { opacity: 1 }]} 
          />
        </Animated.View>
      );
    }
    
    return (
      <Animated.View style={[style, {opacity: opacity}]} >
        <CustomIcon name="back" style={styles.headerLeft} onPress={() => goBack()} />
        <View style={styles.headerMiddle} ></View>
        <TabBarTop {...this.props} />
        <SimpleLineIcons name="share" style={styles.headerRight} onPress={() => handleOnPressToggleMenuBottomSheet('share')} />
      </Animated.View>
    );
  }
  
  render() {
    const { BYopacity = 1 } = this.props.screenProps;

    const {
      position,
      navigation,
    } = this.props;

    const { routes } = navigation.state;
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const activeOpacity = position.interpolate({
      inputRange,
      outputRange: [1, 0, 1, 1],
    });

    return (
      <View>
        {this.renderMain(styles.header, activeOpacity, 'all')}
        {this.renderMain(styles.header1, BYopacity, 'main')}
      </View>
    );
  }
}

const RouteConfigs = {
  [SCREENS.ProductDetailMain]: {
    screen: ProductDetailMain,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.product,
      // tabBarIcon: ({ tintColor }) => <CustomIcon name="home" size={16} color={tintColor} />
    })
  },
  [SCREENS.ProductDetailParam]: {
    screen: ProductDetailParam,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.parameter,
      // tabBarIcon: ({ tintColor }) => <CustomIcon name="user" size={16} color={tintColor} />
    })
  },
  [SCREENS.ProductDetailComment]: {
    screen: ProductDetailComment,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.comment,
      // tabBarIcon: ({ tintColor }) => <CustomIcon name="user" size={16} color={tintColor} />
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
      // position: 'absolute',
      // zIndex: 401,
      // bottom: WINDOW_HEIGHT - STATUSBAR_HEIGHT - 90,
      // left: 40,
      width: WINDOW_WIDTH - 80,
      height: 40,
      backgroundColor: 'transparent',
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
