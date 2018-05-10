import React from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import BYTouchable from '../components/BYTouchable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SIDEINTERVAL,
  RED_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
} from "../styles/variables";

const styles = StyleSheet.create({
  componentWrap: {
    // paddingLeft: SIDEINTERVAL,
    // paddingRight: SIDEINTERVAL
  },
  component: {
    backgroundColor: PRIMARY_COLOR
  },
  component: {
    backgroundColor: '#fff',
    paddingLeft: SIDEINTERVAL
  },
  componentTitle: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    marginBottom: 10
  },
  componentAcount: {
    fontSize: 11,
    color: '#333',
    paddingRight: 15
  },
  componentStar: {
    flexDirection: 'row',
    flex: 1
  },
  componentStarIcon: {
    color: '#ccc',
    marginRight: 3
  },
  componentStarIconActive: {
    color: PRIMARY_COLOR,
    marginRight: 3
  },
  componentTime: {
    fontSize: 11,
    color: '#CCCCCC',
    paddingRight: SIDEINTERVAL
  },
  componentDesc: {
    color: '#999',
    fontSize: 14,
    lineHeight: 22.65,
    marginBottom: WINDOW_WIDTH * 0.03
  },
  componentimageWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  componentimageItem: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    resizeMode: 'cover'
  }
});

export default ({ data, styleWrap, style, styleText, text, ...restProps }) => {
  return (
    <View style={[styles.componentWrap, styleWrap]}>
      <View style={styles.component}>
        <View style={styles.componentTitle}>
          <Text style={styles.componentAcount}>Ng*******u</Text>
          <View style={styles.componentStar}>
            <FontAwesome style={styles.componentStarIconActive} name="star" />
            <FontAwesome style={styles.componentStarIconActive} name="star" />
            <FontAwesome style={styles.componentStarIcon} name="star" />
            <FontAwesome style={styles.componentStarIcon} name="star" />
            <FontAwesome style={styles.componentStarIcon} name="star" />
          </View>
          <Text style={styles.componentTime}>2018-05-03</Text>
        </View>
        <Text style={styles.componentDesc}>Điện thoại đẹp :D Dịch vụ đángyêu. Một chiếc Click nhanh mà điện thoại không phanh bay về túi Thích quớ :* Từ giwof cố gắng tiết kiemj đi làm</Text>
        <View style={styles.componentimageWrap}>
          <Image style={styles.componentimageItem} source={require('../images/viemnam.png')} />
          <Image style={styles.componentimageItem} source={require('../images/viemnam.png')} />
          <Image style={styles.componentimageItem} source={require('../images/viemnam.png')} />
        </View>
      </View>
    </View>
  );
};
