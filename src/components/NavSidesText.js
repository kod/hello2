import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SIDEINTERVAL } from '../common/constants';
import BYTouchable from './BYTouchable';

const styles = StyleSheet.create({
  component: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  componentText: {
    fontSize: 11,
    color: '#0076F7',
    borderBottomColor: '#0076F7',
    borderBottomWidth: 1,
  },
  touchable: {
    paddingTop: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL,
  },
});

export default ({
  style,
  textLeft,
  textRight,
  navigateLeft,
  navigateRight,
  ...restProps
}) => (
  <View style={styles.component} {...restProps}>
    <BYTouchable style={styles.touchable} onPress={navigateLeft}>
      <Text style={styles.componentText}>{textLeft}</Text>
    </BYTouchable>
    <BYTouchable style={styles.touchable} onPress={navigateRight}>
      <Text style={styles.componentText}>{textRight}</Text>
    </BYTouchable>
  </View>
);
