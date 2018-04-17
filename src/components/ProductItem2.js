import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { globalStyleVariables } from '../styles';
import priceFormat from '../common/helpers/priceFormat';

const itemIntervalWidth = globalStyleVariables.WINDOW_WIDTH * 0.04;
const itemWidth = (globalStyleVariables.WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

const styles = StyleSheet.create({
  itemWrap: {
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  itemLeft: {
    width: globalStyleVariables.WINDOW_WIDTH * 0.25,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: '#0f0',
  },
  itemRight: {
    width: globalStyleVariables.WINDOW_WIDTH * 0.75,
    paddingRight: globalStyleVariables.WINDOW_WIDTH * 0.04,
  },
  itemTitle: {
    fontSize: 11,
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  itemRightRow3: {
    flexDirection: 'row',
  },
  itemRightRow3Price: {
    fontSize: 14,
    color: '#FD5147',
    marginRight: 9,
  },
  itemRightRow3Number: {
    fontSize: 11,
    color: '#666',
    paddingTop: 2,
  },
});

export default ({ data, style, ...restProps }) => {
  const { items } = data;
  return (
    <View style={[styles.itemWrap, style]} {...restProps}>
      {items &&
        items.map((val, key) => {
          return (
            <View style={styles.item} key={key}>
              <View style={styles.itemLeft}>
                <Image style={styles.itemImage} source={{ uri: val.imageUrl }} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle} numberOfLines={2}>{val.name}</Text>
                <Text style={styles.itemPrice}>{priceFormat(val.minprice) + ' ₫'}</Text>
                <View style={styles.itemRightRow3}>
                  <Text style={styles.itemRightRow3Price}>{priceFormat(val.minprice) + ' ₫'}</Text>
                  <Text style={styles.itemRightRow3Number}>x12 Tháng</Text>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};
