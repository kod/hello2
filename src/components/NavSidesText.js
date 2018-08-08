import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';

const styles = StyleSheet.create({
  component: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL
  },
  componentText: {
    fontSize: 11,
    color: '#0076F7',
    borderBottomColor: '#0076F7',
    borderBottomWidth: 1,
  }
});

export default ({ style, textLeft, textRight, navigateLeft, navigateRight, ...restProps }) => {
  return (
    <View style={styles.component} {...restProps}>
      <Text style={styles.componentText} onPress={navigateLeft}>{textLeft}</Text>
      <Text style={styles.componentText} onPress={navigateRight}>{textRight}</Text>
    </View>
  );
};
