/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import { WINDOW_WIDTH, SCREENS, OSS_IMAGE_QUALITY } from '../common/constants';

import BYTouchable from './BYTouchable';
import ImageGetSize from './ImageGetSize';
import SeparateBar from './SeparateBar';

const styles = StyleSheet.create({
  itemWrap: {
    backgroundColor: '#fff',
  },
  itemImg: {
    height: WINDOW_WIDTH * 0.3625,
    width: WINDOW_WIDTH,
    marginBottom: 5,
    resizeMode: Image.resizeMode.overflow,
  },
});

class PhoneAdBaner extends Component {
  render() {
    const {
      groupon = false,
      data,
      style,
      navigation: { navigate },
      ...restProps
    } = this.props;

    return (
      <View style={[styles.itemWrap, style]} {...restProps}>
        {data.map((val, key) => (
          <BYTouchable
            style={styles.touchable}
            backgroundColor="transparent"
            key={key}
            onPress={() =>
              navigate(SCREENS.ProductDetail, { brandId: val.brandId, groupon })
            }
          >
            <ImageGetSize
              uri={`${
                val.imageUrl
              }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
              key={key}
            />
            <SeparateBar />
            {/* <Image
              source={{
                uri: `${val.imageUrl}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`,
              }}
              style={styles.itemImg}
            /> */}
          </BYTouchable>
        ))}
      </View>
    );
  }
}

export default withNavigation(PhoneAdBaner);
