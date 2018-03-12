import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export default ({ source }) => {
  // const { data } = this.props;
  // console.log(source);
  return (
    <View style={{ width }}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: 'http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg' }} style={{ flex: 1, height: 250 }} />
        <View style={{ height: 250, flexBasis: 5, backgroundColor: '#fff' }} />
        <Image source={{ uri: 'http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg' }} style={{ flex: 1, height: 250 }} />
        <View style={{ height: 250, flexBasis: 5, backgroundColor: '#fff' }} />
        <Image source={{ uri: 'http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg' }} style={{ flex: 1, height: 250 }} />
      </View>
    </View>
  );
};
