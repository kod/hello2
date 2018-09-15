import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { BORDER_COLOR } from '../styles/variables';
import { SIDEINTERVAL } from '../common/constants';

const fbPng = require('../images/fb.png');
const zaloPng = require('../images/zalo.png');
const GooglePng = require('../images/Google.png');

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
    marginBottom: 10,
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
    alignItems: 'center',
  },
  otherFbImg: {
    height: 25,
    width: 25,
  },
  otherGo: {
    flex: 1,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherGoImg: {
    height: 25,
    width: 25,
  },
  otherZl: {
    flex: 1,
    backgroundColor: '#2988E4',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherZlImg: {
    height: 25,
    width: 26.75,
  },
});

export default ({ style, i18n, ...restProps }) => (
  <View style={[styles.other, style]} {...restProps}>
    <Text style={styles.otherTitle}>{i18n.signInWith}</Text>
    <View style={styles.otherMain}>
      <View style={styles.otherFb}>
        <Image style={styles.otherFbImg} source={fbPng} />
      </View>
      <View style={styles.otherZl}>
        <Image style={styles.otherZlImg} source={zaloPng} />
      </View>
      <View style={styles.otherGo}>
        <Image style={styles.otherGoImg} source={GooglePng} />
      </View>
    </View>
  </View>
);
