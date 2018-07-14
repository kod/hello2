import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { BORDER_COLOR } from "../styles/variables";
import { SIDEINTERVAL } from "../common/constants";

const styles = StyleSheet.create({
  other: {
    paddingBottom: 30,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  otherTitle: {
    textAlign: 'center',
    fontSize: 11,
    color: '#999',
    marginBottom: 10
  },
  otherMain: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  otherFb: {
    flex: 1,
    backgroundColor: '#305CA5',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherFbImg: {
    height: 25,
    width: 25
  },
  otherGo: {
    flex: 1,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherGoImg: {
    height: 25,
    width: 25
  },
  otherZl: {
    flex: 1,
    backgroundColor: '#2988E4',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherZlImg: {
    height: 25,
    width: 26.75
  }
});

export default ({ style, ...restProps }) => {
  return (
    <View style={[styles.other, style]} {...restProps} >
      <Text style={styles.otherTitle}>第三方登录</Text>
      <View style={styles.otherMain}>
        <View style={styles.otherFb}>
          <Image style={styles.otherFbImg} source={require('../images/fb.png')} />
        </View>
        <View style={styles.otherZl}>
          <Image style={styles.otherZlImg} source={require('../images/zalo.png')} />
        </View>
        <View style={styles.otherGo}>
          <Image style={styles.otherGoImg} source={require('../images/Google.png')} />
        </View>
      </View>
    </View>
  );
};
