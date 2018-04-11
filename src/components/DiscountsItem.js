import React from 'react';
import { View, Text, Image, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');
const width3_interval = width * 0.03 * 4;
const width3_item = (width - width3_interval) / 3;

export default ({ data }) => {
  const { items } = data;
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5 }}>
      {items &&
        items.details.map((val, key) => {
          return (
            <View style={{ marginLeft: '3%', width: width3_item, marginBottom: 15 }} key={key}>
              <Image source={{ uri: val.image }} style={{ width: 'auto', height: 100, marginBottom: 10 }} />
              <Text numberOfLines={2} style={{ fontSize: 11, color: '#333', marginBottom: 2, height: 26 }}>{ val.name }</Text>
              <Text style={{ fontSize: 11, color: '#999', marginBottom: 0, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>3,690,000 VND</Text>
              <View style={{ position: 'relative', zIndex: 55, paddingTop: 5, paddingBottom: 15 }}>
                <ImageBackground style={{ width: width3_item, height: 25, flexDirection: 'row', alignItems: 'center' }} source={{ uri: 'http://119.28.177.175:89/img/sale_bar-2.png' }}>
                  <Text style={{ color: '#fff', fontSize: 11, marginRight: 3, marginLeft: 8 }}>{ val.price }</Text>
                  <Text style={{ color: '#fff', fontSize: 8, marginTop: 2 }}>VND</Text>
                </ImageBackground>
                <ImageBackground style={{ position: 'absolute', zIndex: 60, top: 1, right: 0, width: width3_item / 3, height: 40 }} source={{ uri: 'http://119.28.177.175:89/img/sale_barge-2.png' }}>
                  <Text style={{ color: '#fff', fontSize: 8, textAlign: 'center', marginTop: 2 }}>GIẢM</Text>
                  <Text style={{ color: '#fff', fontSize: 14, lineHeight: 15, textAlign: 'center' }}>{ 100 - val.discount }</Text>
                  <Text style={{ color: '#fff', fontSize: 8, lineHeight: 8, textAlign: 'right', paddingRight: 6 }}>%</Text>
                </ImageBackground>
              </View>
            </View>
          );
        })}
    </View>
  );
};
