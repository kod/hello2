import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const width3_interval = width * 0.03 * 4;
const width3_item = (width - width3_interval) / 3;

export default ({ data }) => {
  const { items } = data;
  return (
    <View style={{ backgroundColor: '#fff', paddingTop: 15 }} >
      {items &&
        items.map((val, key) => {
          return (
            <View style={{ flexDirection: 'row', marginBottom: 15, borderBottomColor: '#f2f2f2', borderBottomWidth: StyleSheet.hairlineWidth, }} key={key}>
              <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10 }}>
                <Image source={{ uri: val.imageUrl }} style={{ width: 'auto', height: 120 }} />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={{ color: '#333', marginBottom: 60 }}>{ val.name }</Text>
                <Text style={{ color: '#aaa' }}>{ val.minprice } ₫起</Text>
                <Text style={{ color: '#4f9ff1', marginBottom: 15 }}>月供: { (val.minprice/2/12).toFixed(0) } ₫起</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};
