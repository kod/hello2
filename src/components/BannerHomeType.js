import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../common/constants';
import BYTouchable from './BYTouchable';

const width = WINDOW_WIDTH;

const itemIntervalWidth = width * 0.02;
const itemWidth = (width - itemIntervalWidth * 2) / 3;
const itemHeight = itemWidth * 2.083;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  wrap: {
    flexDirection: 'row',
  },
  item: {
    width: itemWidth,
    height: itemHeight,
  },
  // itemWrap: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   backgroundColor: '#fff',
  //   paddingLeft: marginWidth,
  //   paddingRight: marginWidth
  // },
  // touchable: {
  //   height: width,
  //   width: width,
  //   marginLeft: marginWidth,
  //   marginRight: marginWidth
  // },
  // itemImg: {
  //   height: width,
  //   width: width,
  // }
});

export default ({ data, callback = () => {}, ...restProps }) => {
  const { items } = data;

  return (
    <View style={[{ width }, styles.container]} {...restProps}>
      {items && (
        <View style={styles.wrap}>
          <BYTouchable style={styles.item} onPress={() => callback(items[0])}>
            <Image
              source={{ uri: items[0].imageUrl }}
              style={{ width: itemWidth, height: itemHeight }}
            />
          </BYTouchable>
          <View style={{ height: itemHeight, width: itemIntervalWidth }} />
          <BYTouchable style={styles.item} onPress={() => callback(items[1])}>
            <Image
              source={{ uri: items[1].imageUrl }}
              style={{ width: itemWidth, height: itemHeight }}
            />
          </BYTouchable>
          <View style={{ height: itemHeight, width: itemIntervalWidth }} />
          <BYTouchable style={styles.item} onPress={() => callback(items[2])}>
            <Image
              source={{ uri: items[2].imageUrl }}
              style={{ width: itemWidth, height: itemHeight }}
            />
          </BYTouchable>
        </View>
      )}
    </View>
  );
};
