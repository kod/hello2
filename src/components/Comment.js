/* eslint-disable react/no-array-index-key */
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BORDER_COLOR, PRIMARY_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  // OSS_IMAGE_QUALITY,
} from '../common/constants';

const imageItemWidth = (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3;

const styles = StyleSheet.create({
  componentWrap: {
    // paddingLeft: SIDEINTERVAL,
    // paddingRight: SIDEINTERVAL
  },
  // component: {
  //   backgroundColor: PRIMARY_COLOR,
  // },
  component: {
    backgroundColor: '#fff',
    paddingLeft: SIDEINTERVAL,
  },
  componentTitle: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  componentAcount: {
    fontSize: 11,
    color: '#333',
    paddingRight: 15,
  },
  componentStar: {
    flexDirection: 'row',
    flex: 1,
  },
  componentStarIcon: {
    color: '#ccc',
    marginRight: 3,
  },
  componentStarIconActive: {
    color: PRIMARY_COLOR,
    marginRight: 3,
  },
  componentTime: {
    fontSize: 11,
    color: '#CCCCCC',
    paddingRight: SIDEINTERVAL,
  },
  componentDesc: {
    color: '#999',
    fontSize: 14,
    lineHeight: 22.65,
    marginBottom: WINDOW_WIDTH * 0.03,
    paddingRight: SIDEINTERVAL,
  },
  componentimageWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  componentimageItem: {
    width: imageItemWidth,
    height: imageItemWidth,
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    resizeMode: 'cover',
  },
});

export default ({ data, styleWrap, style, ...restProps }) => (
  <View style={[styles.componentWrap, styleWrap]} {...restProps}>
    {data &&
      !!data.length &&
      data.map((val, key) => (
        <View style={[styles.component, style]} key={key}>
          <View style={styles.componentTitle}>
            <Text style={styles.componentAcount}>{val.username}</Text>
            <View style={styles.componentStar}>
              {[0, 1, 2, 3, 4].map(val1 => (
                <FontAwesome
                  style={
                    val.score > val1
                      ? styles.componentStarIconActive
                      : styles.componentStarIcon
                  }
                  name="star"
                  key={val1}
                />
              ))}
            </View>
            <Text style={styles.componentTime}>{val.updateTime}</Text>
          </View>
          <Text style={styles.componentDesc} numberOfLines={3}>
            {val.content}
          </Text>
          <View style={styles.componentimageWrap}>
            {val.imageUrls.length > 0 &&
              val.imageUrls.map((val1, key1) => (
                <Image
                  style={styles.componentimageItem}
                  key={key1}
                  source={{
                    uri: `${val1}?x-oss-process=image/resize,w_${parseInt(
                      imageItemWidth,
                      10,
                    ) * 2}`,
                  }}
                />
              ))}
          </View>
        </View>
      ))}
  </View>
);
