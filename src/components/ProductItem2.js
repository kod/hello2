/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import priceFormat from '../common/helpers/priceFormat';
import BYTouchable from './BYTouchable';

import { RED_COLOR, BORDER_COLOR } from '../styles/variables';
import {
  SIDEINTERVAL,
  SCREENS,
  OSS_IMAGE_QUALITY,
  MONETARY,
} from '../common/constants';

import { connectLocalization } from './Localization';
import * as cartActionCreators from '../common/actions/cart';

const styles = StyleSheet.create({
  itemWrap: {
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  itemLeft: {
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingTop: 18,
    paddingBottom: 18,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  },
  itemRight: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  itemTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 11,
    marginBottom: 6,
  },
  itemRightRow3: {
    flexDirection: 'row',
  },
  itemRightRow3Price: {
    fontSize: 14,
    color: RED_COLOR,
    marginRight: 9,
  },
  itemRightRow3Periods: {
    fontSize: 11,
    color: '#666',
    paddingTop: 2,
  },
  itemRightRow3Number: {
    fontSize: 11,
    color: '#666',
    paddingTop: 2,
    textAlign: 'right',
    flex: 1,
  },
});

class ProductItem2 extends Component {
  onPressHandle(val) {
    const {
      navigation: { navigate, goBack },
      isPress = true,
      onPress,
    } = this.props;
    if (onPress) {
      onPress();
    } else if (val.isOnPress === false) {
      goBack(null);
    } else if (val.tradeStatus === '32' || val.tradeStatus === '33') {
      navigate(SCREENS.Prepaid);
    } else if (isPress) {
      navigate(SCREENS.ProductDetail, {
        brandId: val.brandId,
        propertiesIds: val.propertiesIds,
      });
    }
  }

  render() {
    const {
      i18n,
      data,
      style,
      styleItem,
      styleItemOpacity,
      styleItemLeft,
      stylePricePrice,
      stylePricePeriods,
      itemLeft,
      itemRight,
      cartNumberRequest,
      isShowNumber = false,
      ...restProps
    } = this.props;

    return (
      <View style={[styles.itemWrap, style]} {...restProps}>
        {data &&
          data.map((val, key) => (
            <BYTouchable
              style={[styles.item, styleItem]}
              key={key}
              onPress={() => this.onPressHandle(val)}
            >
              <View style={[styles.itemLeft, styleItemLeft]}>
                <Image
                  style={styles.itemImage}
                  source={{
                    uri: `${
                      val.imageUrl
                    }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`,
                  }}
                />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {val.name}
                </Text>
                {/* <Text style={styles.itemPrice}>
                  {`${priceFormat(val.price)} ${MONETARY}`}
                </Text> */}
                <View style={styles.itemRightRow3}>
                  <Text style={[styles.itemRightRow3Price, stylePricePrice]}>
                    {`${priceFormat(val.price)} ${MONETARY}`}
                  </Text>
                  {/* <Text
                    style={[styles.itemRightRow3Periods, stylePricePeriods]}
                  >
                    x12 {i18n.month}
                  </Text> */}
                  {isShowNumber && (
                    <Text style={styles.itemRightRow3Number}>
                      x{val.number}
                    </Text>
                  )}
                </View>
              </View>
            </BYTouchable>
          ))}
      </View>
    );
  }
}

export default withNavigation(
  connectLocalization(
    connect(
      state => {
        const { login } = state;
        return {
          authUser: login.user,
        };
      },
      {
        ...cartActionCreators,
      },
    )(ProductItem2),
  ),
);
