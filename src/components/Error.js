import React from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyleVariables } from '../styles';

const styles = StyleSheet.create({
  tipsWrap: {
  },
  tips: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: globalStyleVariables.SIDEINTERVAL,
    paddingRight: globalStyleVariables.SIDEINTERVAL
  },
  tipsIcon: {
    color: '#FD5147',
    fontSize: 12,
    marginRight: globalStyleVariables.WINDOW_WIDTH * 0.01,
    paddingTop: 1
  },
  tipsText: {
    color: '#FD5147',
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
