import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  // Dimensions,
} from 'react-native';
import BYTouchable from './BYTouchable';
import { WINDOW_WIDTH } from '../common/constants';

const styles = StyleSheet.create({
  nav1: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
  },
  nav1Item: {
    width: WINDOW_WIDTH / 5,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  nav1ItemImg: {
    height: 30,
    width: 30,
    marginBottom: 5,
  },
  nav1ItemText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});

export default ({ data, style, onPress, ...restProps }) => (
  <View style={[styles.nav1, style]} {...restProps}>
    {data.map(val => (
      <BYTouchable
        style={[styles.nav1Item, val.styleItem]}
        key={val.id}
        onPress={() => onPress(val)}
      >
        <Image
          style={[styles.nav1ItemImg, val.styleImg]}
          source={{ uri: val.iconUrl }}
        />
        <Text style={[styles.nav1ItemText, val.styleText]}>{val.name}</Text>
      </BYTouchable>
    ))}
  </View>
);
