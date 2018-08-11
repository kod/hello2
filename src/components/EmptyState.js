import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImg: {
    width: WINDOW_WIDTH * 0.5,
    height: WINDOW_WIDTH * 0.5,
    marginBottom: WINDOW_HEIGHT * 0.04,
  },
  emptyText: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: WINDOW_HEIGHT * 0.1,
  },
});

export default ({ style, styleImage, styleText, source, text, ...restProps }) => {
  return (
    <View style={[styles.empty, style]} {...restProps}>
      <Image style={[styles.emptyImg, styleImage]} source={source} />
      <Text style={[styles.emptyText, styleText]}>{text}</Text>
    </View>
  );
};
