import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from "../common/constants";

const marginWidth = WINDOW_WIDTH * 0.015;
const width = (WINDOW_WIDTH - marginWidth * 2 * 4 - marginWidth * 2) / 4;

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
        return <Image source={{ uri: `${val.imageUrl}?x-oss-process=image/quality,Q_70` }} style={styles.itemImg} key={key} />;
      })}
    </View>
  );
};
