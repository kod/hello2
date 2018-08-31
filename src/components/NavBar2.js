import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SIDEINTERVAL } from '../common/constants';
import CustomIcon from './CustomIcon';
import BYTouchable from './BYTouchable';

const styles = StyleSheet.create({
  component: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  componentLeft: {
    fontSize: 14,
    color: '#333',
  },
  componentMiddle: {
    flex: 1,
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
    paddingRight: 5,
  },
  componentRight: {
    color: '#999',
    fontSize: 16,
  },
});

export default (
  {
    style,
    styleLeft,
    styleMiddle,
    styleRight,
    valueLeft,
    valueMiddle,
    componentMiddle,
    componentRight,
    isShowLeft = true,
    isShowMiddle = true,
    isShowRight = true,
    ...restProps
  }
) => {
  return (
    <BYTouchable delayPressIn={0} style={[styles.component, style]} {...restProps}>
      {
        isShowLeft && 
        <Text style={[styles.componentLeft, styleLeft]}>{valueLeft}</Text>
      }
      {
        isShowMiddle &&
        (componentMiddle ? 
        componentMiddle : 
        <Text style={[styles.componentMiddle, styleMiddle]} numberOfLines={1}>{valueMiddle}</Text>)
      }
      {
        isShowRight &&
        (componentRight ?
        componentRight :
        <Ionicons name="ios-arrow-forward" style={[styles.componentRight, styleRight]} />)
      }
    </BYTouchable>
  )
};
