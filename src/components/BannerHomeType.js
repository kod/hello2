import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from "../common/constants";

export default ({ data, style, ...restProps }) => {
  const width = WINDOW_WIDTH;

  const itemIntervalWidth = width * 0.02;
  const itemWidth = (width - itemIntervalWidth * 2) / 3;
  const itemHeight = itemWidth * 2.083;

  const { items } = data;

  return (
    <View style={[{ width, backgroundColor: '#fff' }, style]} {...restProps}>
      {items && (
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: items[0] }} style={{ width: itemWidth, height: itemHeight }} />
          <View style={{ height: itemHeight, width: itemIntervalWidth, }} />
          <Image source={{ uri: items[1] }} style={{ width: itemWidth, height: itemHeight }} />
          <View style={{ height: itemHeight, width: itemIntervalWidth, }} />
          <Image source={{ uri: items[2] }} style={{ width: itemWidth, height: itemHeight }} />
        </View>
      )}
    </View>
  );
};
