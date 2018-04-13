import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, } from 'react-native';
import { globalStyleVariables } from "../styles";

const itemIntervalWidth = globalStyleVariables.WINDOW_WIDTH * 0.04;
const itemWidth = (globalStyleVariables.WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

const styles = StyleSheet.create({
  item: {
    width: itemWidth,
    marginRight: globalStyleVariables.WINDOW_WIDTH * 0.04,
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

export default ({ data }) => {
  const { items } = data;
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5 }}>
      {items &&
        items.details.map((val, key) => {
          return (
            <View style={styles.item} key={key}>
              <Image style={styles.itemImg} source={{ uri: val.imageUrl }} />
              <Text style={styles.itemText}>{val.name}</Text>
              <Text style={styles.itemOrgPrice}>{val.price}</Text>
              <Text style={styles.itemPrice}>{val.mergePrice}</Text>
            </View>
          );
        })}
    </View>
  );
};
