import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { globalStyleVariables } from '../styles';
import priceFormat from '../common/helpers/priceFormat';

const marginWidth = globalStyleVariables.WINDOW_WIDTH * 0.015;
const width = (globalStyleVariables.WINDOW_WIDTH - marginWidth * 2 * 4 - marginWidth * 2) / 4;

const styles = StyleSheet.create({
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    paddingLeft: marginWidth,
    paddingRight: marginWidth
  },
  itemImg: {
    height: width,
    width: width,
    marginLeft: marginWidth,
    marginRight: marginWidth
  }
});

export default ({ data, style, ...restProps }) => {
  return (
    <View style={[styles.itemWrap, style]} {...restProps}>
      {data.map((val, key) => {
        return <Image source={{ uri: val.imageUrl }} style={styles.itemImg} key={key} />;
      })}
    </View>
  );
};