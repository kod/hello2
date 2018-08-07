import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { SIDEINTERVAL } from '../common/constants';
import CustomIcon from '../components/CustomIcon';
import BYTouchable from '../components/BYTouchable';

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
    fontSize: 9,
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
    ...restProps,
  }
) => {
  return (
    <BYTouchable delayPressIn={0} style={[styles.component, style]} {...restProps} >
      {
        isShowLeft && 
        <Text style={[styles.componentLeft, styleLeft]}>{valueLeft}</Text>
      }
      {
        isShowMiddle &&
        (componentMiddle ? 
        componentMiddle : 
        <Text style={[styles.componentMiddle, styleMiddle]} numberOfLines={1} >{valueMiddle}</Text>)
      }
      {
        isShowRight &&
        (componentRight ?
        componentRight :
        <CustomIcon style={[styles.componentRight, styleRight]} name="arrowright"></CustomIcon>)
      }
    </BYTouchable>
  )
};
