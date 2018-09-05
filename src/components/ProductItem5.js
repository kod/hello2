import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import BYTouchable from './BYTouchable';

import { RED_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  SCREENS,
  OSS_IMAGE_QUALITY,
  MONETARY,
} from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = parseInt(
  (WINDOW_WIDTH - itemIntervalWidth * 4) / 3 - WINDOW_WIDTH * 0.03,
  10,
);

const styles = StyleSheet.create({
  itemWrap: {
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
    marginBottom: 5,
  },
  item: {
    width: itemWidth,
    marginRight: SIDEINTERVAL,
    paddingTop: 4,
    backgroundColor: '#fff',
    // borderColor: BORDER_COLOR,
    // borderWidth: 1,
    marginBottom: itemIntervalWidth,
  },
  itemImg: {
    width: itemWidth,
    height: itemWidth,
    marginBottom: 5,
  },
  itemText: {
    // paddingLeft: paddingInerval,
    // paddingRight: paddingInerval,
    color: '#666',
    fontSize: 10,
    lineHeight: 10 * 1.5,
    // height: 30,
    marginBottom: 3,
    // backgroundColor: '#f00',
  },
  itemOrgPrice: {
    color: '#999',
    fontSize: 11,
    // paddingLeft: paddingInerval,
    // paddingRight: paddingInerval,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemPrice: {
    color: RED_COLOR,
    fontSize: 10,
    // paddingLeft: paddingInerval,
    // paddingRight: paddingInerval,
    fontWeight: '700',
    // marginBottom: 15,
  },
});

class ProductItem5 extends Component {
  render() {
    const {
      groupon = false,
      data,
      style,
      navigation: { navigate },
      ...restProps
    } = this.props;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.itemWrap, style]}
        {...restProps}
      >
        {data.map((val, key) => (
          <BYTouchable
            style={styles.item}
            key={key}
            onPress={() =>
              navigate(SCREENS.ProductDetail, { brandId: val.brandId, groupon })
            }
          >
            <Image
              style={styles.itemImg}
              source={{
                uri: `${
                  val.imageUrl
                }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`,
              }}
            />
            <Text numberOfLines={2} style={styles.itemText}>
              {val.name}
            </Text>
            {/* {!!val.orgPrice && (
              <Text style={styles.itemOrgPrice}>
                {`${priceFormat(val.orgPrice)} ${MONETARY}`}
              </Text>
            )} */}
            <Text style={styles.itemPrice}>
              {`${priceFormat(val.price)} ${MONETARY}`}
            </Text>
          </BYTouchable>
        ))}
      </ScrollView>
    );
  }
}

export default withNavigation(ProductItem5);
