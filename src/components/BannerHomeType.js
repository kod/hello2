import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default ({ data }) => {
  const { items } = data;

  return (
    <View style={{ width }}>
      {items && (
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: items[0] }} style={{ flex: 1, height: 250 }} />
          <View style={{ height: 250, flexBasis: 5, backgroundColor: '#fff' }} />
          <Image source={{ uri: items[1] }} style={{ flex: 1, height: 250 }} />
          <View style={{ height: 250, flexBasis: 5, backgroundColor: '#fff' }} />
          <Image source={{ uri: items[2] }} style={{ flex: 1, height: 250 }} />
        </View>
      )}
    </View>
  );
};
