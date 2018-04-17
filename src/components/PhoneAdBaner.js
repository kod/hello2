import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { globalStyleVariables } from '../styles';
import priceFormat from '../common/helpers/priceFormat';

// const marginWidth = globalStyleVariables.WINDOW_WIDTH * 0.015;
// const width = (globalStyleVariables.WINDOW_WIDTH - marginWidth * 2 * 4 - marginWidth * 2) / 4;

const styles = StyleSheet.create({
  itemWrap: {
    backgroundColor: '#fff'
  },
  itemImg: {
    height: globalStyleVariables.WINDOW_WIDTH * 0.3625,
    width: globalStyleVariables.WINDOW_WIDTH,
    marginBottom: 5,
    resizeMode: Image.resizeMode.overflow
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
