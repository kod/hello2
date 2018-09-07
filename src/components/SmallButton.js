import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { WINDOW_WIDTH } from '../common/constants';
// import { PRIMARY_COLOR } from '../styles/variables';
import BYTouchable from './BYTouchable';

const styles = StyleSheet.create({
  component: {
    height: 25,
    minWidth: WINDOW_WIDTH * 0.1,
    paddingLeft: WINDOW_WIDTH * 0.03,
    paddingRight: WINDOW_WIDTH * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0076F7',
    marginRight: 1,
  },
  componentText: {
    color: '#0076F7',
    fontSize: 11,
  },
});

export default ({ text, onPress = () => {}, ...restProps }) => (
  <BYTouchable
    style={styles.component}
    onPress={() => onPress()}
    {...restProps}
  >
    <Text style={styles.componentText}>{text}</Text>
  </BYTouchable>
);
