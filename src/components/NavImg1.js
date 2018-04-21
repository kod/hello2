import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, } from 'react-native';
import { globalStyleVariables } from "../styles";
import priceFormat from "../common/helpers/priceFormat";

const styles = StyleSheet.create({
  nav1: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  nav1Item: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  nav1ItemImg: {
    height: 30,
    width: 30,
    marginBottom: 10
  },
  nav1ItemText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center'
  },
});

export default ({ data, style, propsItem, ...restProps }) => {
  return (
    <View style={[styles.nav1, style]} {...restProps} >
      {data.map((val, key) => 
        <View style={[styles.nav1Item, val.styleItem]} key={key} >
          <Image style={[styles.nav1ItemImg, val.styleImg]} source={val.imageSource} />
          <Text style={[styles.nav1ItemText, val.styleText]} >{val.text}</Text>
        </View>
      )}
    </View>
  );
};
