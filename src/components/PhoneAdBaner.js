import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from "../common/constants";

const styles = StyleSheet.create({
  itemWrap: {
    backgroundColor: '#fff'
  },
  itemImg: {
    height: WINDOW_WIDTH * 0.3625,
    width: WINDOW_WIDTH,
    marginBottom: 5,
    resizeMode: Image.resizeMode.overflow
  }
});

export default ({ data, style, ...restProps }) => {
  return (
    <View style={[styles.itemWrap, style]} {...restProps}>
      {data.map((val, key) => {
        return <Image source={{ uri: `${val.imageUrl}?x-oss-process=image/quality,Q_70` }} style={styles.itemImg} key={key} />;
      })}
    </View>
  );
};
