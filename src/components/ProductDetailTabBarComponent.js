import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { TabBarTop } from 'react-navigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { PRIMARY_COLOR, } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, STATUSBAR_HEIGHT, } from '../common/constants';

import CustomIcon from '../components/CustomIcon';

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
    // flexDirection: 'row',
    paddingTop: 0,
    // paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: 'transparent',
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
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#ff0',
  },
  headerRight: {
    fontSize: 0,
    // fontSize: 16,
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
  },
});

export default class ProductDetailTabBarComponent extends Component {

  renderMain(style, opacity, type) {
    const {
      // navigation: { goBack },
      screenProps: { mainNavigation, handleOnPressToggleMenuBottomSheet },
    } = this.props;
    const { goBack } = mainNavigation;
    
    if (type === 'main') {
      return (
        <Animated.View style={[style,]}>
          <View style={[styles.headerMiddle, { opacity, backgroundColor: '#fff', }]}></View>
          <View style={{flexDirection: 'row'}}>
            <CustomIcon name="back" 
              onPress={() => goBack()} 
              style={[styles.headerLeft, { opacity: 1, backgroundColor: `rgba(255,255,255,${opacity})`, }]} 
            />
            <TabBarTop 
              {...this.props} 
              style={{
                ...this.props.style,
                opacity: opacity,
                backgroundColor: '#fff',
              }}
            />
            <SimpleLineIcons 
              name="share" 
              onPress={() => handleOnPressToggleMenuBottomSheet('share')} 
              style={[styles.headerRight, { opacity: 1, backgroundColor: `rgba(255,255,255,${opacity})`, }]} 
            />
          </View>
        </Animated.View>
      );
    }
    
    return (
      <Animated.View style={[style, {opacity: opacity}]}>
        <CustomIcon name="back" style={styles.headerLeft} onPress={() => goBack()} />
        <TabBarTop {...this.props} />
        <SimpleLineIcons name="share" style={styles.headerRight} onPress={() => handleOnPressToggleMenuBottomSheet()} />
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
      outputRange: [1, ...routes.map((x, i) => i)],
    });

    return (
      <View>
        {this.renderMain(styles.header, activeOpacity, 'all')}
        {this.renderMain(styles.header1, BYopacity, 'main')}
      </View>
    );
  }
}