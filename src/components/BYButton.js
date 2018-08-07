import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';
import { PRIMARY_COLOR } from '../styles/variables';
import BYTouchable from '../components/BYTouchable';

const styles = StyleSheet.create({
  componentWrap: {
    paddingLeft: SIDEINTERVAL, 
    paddingRight: SIDEINTERVAL,
  },
  component: {
    backgroundColor: PRIMARY_COLOR
  },
  componentText: {
    textAlign: 'center',
    height: 50,
    lineHeight: 50,
    color: '#fff',
    fontSize: 14
  }
});

export default ({ data, styleWrap, style, styleText, text, ...restProps }) => {
  return (
    <View style={[styles.componentWrap, styleWrap]} >
      <BYTouchable delayPressIn={0} style={[styles.component, style]} {...restProps} >
        <Text style={[styles.componentText, styleText]}>{text}</Text>
      </BYTouchable>
    </View>
  );
};
