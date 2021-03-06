import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import BYTouchable from './BYTouchable';

import { RED_COLOR, BORDER_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  OSS_IMAGE_QUALITY,
  SIDEINTERVAL,
  SCREENS,
  MONETARY,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
} from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 4) / 3;
const paddingInerval = SIDEINTERVAL / 2;

const styles = StyleSheet.create({
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
    marginBottom: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
  },
  item: {
    width: itemWidth,
    marginRight: SIDEINTERVAL,
    paddingTop: 4,
    backgroundColor: '#fff',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    marginBottom: itemIntervalWidth,
  },
  itemImg: {
    width: itemWidth - 2,
    height: itemWidth - 2,
    marginBottom: 5,
  },
  itemText: {
    paddingLeft: paddingInerval,
    paddingRight: paddingInerval,
    color: '#666',
    fontSize: 11,
    marginBottom: 6,
    height: 28.8,
  },
  itemOrgPrice: {
    color: '#999',
    fontSize: 11,
    paddingLeft: paddingInerval,
    paddingRight: paddingInerval,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemPrice: {
    color: RED_COLOR,
    fontSize: 14,
    paddingLeft: paddingInerval,
    paddingRight: paddingInerval,
    fontWeight: '700',
    marginBottom: 10,
  },
});

class ProductItem3 extends Component {
  renderItem = ({ item }) => {
    const {
      groupon = false,
      navigation: { navigate },
    } = this.props;

    return (
      <BYTouchable
        style={styles.item}
        onPress={() =>
          navigate(SCREENS.ProductDetail, { brandId: item.brandId, groupon })
        }
      >
        <Image
          style={styles.itemImg}
          source={{
            uri: `${
              item.imageUrl
            }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`,
          }}
        />
        <Text numberOfLines={2} style={styles.itemText}>
          {item.name}
        </Text>
        {!!item.orgPrice && (
          <Text style={styles.itemOrgPrice}>
            {`${priceFormat(item.orgPrice)} ${MONETARY}`}
          </Text>
        )}
        <Text style={styles.itemPrice}>
          {`${priceFormat(item.price)} ${MONETARY}`}
        </Text>
      </BYTouchable>
    );
  };

  render() {
    const { data, style, ...restProps } = this.props;
    return (
      <View style={[styles.itemWrap, style]} {...restProps}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.brandId || item.id}`}
          numColumns={3}
          initialNumToRender={6}
        />
      </View>
    );
  }
}

export default withNavigation(ProductItem3);
