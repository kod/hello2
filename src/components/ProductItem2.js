import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import priceFormat from '../common/helpers/priceFormat';
import BYTouchable from './BYTouchable';

import { RED_COLOR, BORDER_COLOR } from '../styles/variables';
import { SIDEINTERVAL, SCREENS } from '../common/constants';

// import BYTextInput from './BYTextInput';
import { connectLocalization } from './Localization';
import * as cartActionCreators from '../common/actions/cart';

// const itemIntervalWidth = SIDEINTERVAL;
// const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

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
    // width: WINDOW_WIDTH * 0.25,
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingTop: 18,
    paddingBottom: 18,
  },
  itemImage: {
    width: 60,
    height: 60,
    // backgroundColor: '#0f0',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  },
  itemRight: {
    flex: 1,
    paddingTop: 18,
    // paddingBottom: 18,
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
    color: '#999',
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
    flex: 1,
    textAlign: 'right',
  },
});

class ProductItem2 extends Component {
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
      navigation: { navigate },
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
              onPress={() =>
                navigate(SCREENS.ProductDetail, {
                  brandId: val.brandId,
                  propertiesIds: val.propertiesIds,
                })
              }
            >
              <View style={[styles.itemLeft, styleItemLeft]}>
                <Image
                  style={styles.itemImage}
                  source={{
                    uri: `${val.imageUrl}?x-oss-process=image/quality,Q_70`,
                  }}
                />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {val.name}
                </Text>
                <Text style={styles.itemPrice}>
                  {`${priceFormat(val.price)} ₫`}
                </Text>
                <View style={styles.itemRightRow3}>
                  <Text style={[styles.itemRightRow3Price, stylePricePrice]}>
                    {`${priceFormat(parseInt(val.price / 12, 10))} ₫`}
                  </Text>
                  <Text
                    style={[styles.itemRightRow3Periods, stylePricePeriods]}
                  >
                    x12 {i18n.month}
                  </Text>
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
        console.log();
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
