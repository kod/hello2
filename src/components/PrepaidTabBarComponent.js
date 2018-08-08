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
    bottom: WINDOW_HEIGHT - STATUSBAR_HEIGHT - 40,
    left: 0,
    zIndex: 400,
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
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#ff0',
  },
  headerRight: {
    fontSize: 0,
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
  },
});

export default class PrepaidTabBarComponent extends Component {

  renderMain() {
    const {
      screenProps: { mainNavigation, handleOnPressToggleMenuBottomSheet },
    } = this.props;
    const { goBack } = mainNavigation;

    return (
      <Animated.View style={[styles.header]}>
        <CustomIcon name="back" style={styles.headerLeft} onPress={() => goBack()} />
        <TabBarTop {...this.props} />
        <SimpleLineIcons name="share" style={styles.headerRight} onPress={() => handleOnPressToggleMenuBottomSheet()} />
      </Animated.View>
    );
  }
  
  render() {

    const {
      position,
      navigation,
    } = this.props;

    return (
      <View>
        {this.renderMain()}
      </View>
    );
  }
}