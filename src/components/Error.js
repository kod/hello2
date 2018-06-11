import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SIDEINTERVAL, RED_COLOR, WINDOW_WIDTH, } from "../styles/variables";

const styles = StyleSheet.create({
  tipsWrap: {
  },
  tips: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL
  },
  tipsIcon: {
    color: RED_COLOR,
    fontSize: 12,
    marginRight: WINDOW_WIDTH * 0.01,
    paddingTop: 1
  },
  tipsText: {
    color: RED_COLOR,
    fontSize: 12
  }
});

export default ({ style, styleWrap, text, ...restProps }) => {
  return (
    <View style={[styles.tipsWrap, styleWrap]}>
      <View style={[styles.tips, style]}>
        <MaterialIcons name={'error'} style={styles.tipsIcon} />
        <Text style={styles.tipsText}>{text}</Text>
      </View>
    </View>
  );
};
