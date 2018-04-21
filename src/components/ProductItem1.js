import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, } from 'react-native';
import { globalStyleVariables } from "../styles";
import priceFormat from "../common/helpers/priceFormat";

const itemIntervalWidth = globalStyleVariables.SIDEINTERVAL;
const itemWidth = (globalStyleVariables.WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

const styles = StyleSheet.create({
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: globalStyleVariables.SIDEINTERVAL,
    marginBottom: 5,
  },
  item: {
    width: itemWidth,
    marginRight: globalStyleVariables.SIDEINTERVAL,
    paddingTop: 4,
    backgroundColor: '#fff',
    borderColor: '#f5f5f5',
    borderWidth: 1,
    marginBottom: itemIntervalWidth,
  },
  itemImg: {
    width: itemWidth - 2,
    height: itemWidth - 2,
    marginBottom: 5,
  },
  itemText: {
    paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.02,
    paddingRight: globalStyleVariables.WINDOW_WIDTH * 0.02,
    color: '#666',
    fontSize: 11,
    marginBottom: 6,
    height: 28.8,
  },
  itemOrgPrice: {
    color: '#999',
    fontSize: 11,
    paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.02,
    paddingRight: globalStyleVariables.WINDOW_WIDTH * 0.02,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemPrice: {
    color: '#FD5147',
    fontSize: 14,
    paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.02,
    paddingRight: globalStyleVariables.WINDOW_WIDTH * 0.02,
    fontWeight: "700",
    marginBottom: 10,
  }
});

export default ({ data, style, ...restProps }) => {
  return (
    <View style={[styles.itemWrap, style]} {...restProps}>
        {data.map((val, key) => {
          return (
            <View style={styles.item} key={key}>
              <Image style={styles.itemImg} source={{ uri: val.imageUrl }} />
              <Text numberOfLines={2} style={styles.itemText}>{val.name}</Text>
              {!!val.orgPrice && <Text style={styles.itemOrgPrice}>{priceFormat(val.orgPrice) + ' ₫'}</Text>}
              <Text style={styles.itemPrice}>{priceFormat(val.price) + ' ₫'}</Text>
            </View>
          );
        })}
    </View>
  );
};
