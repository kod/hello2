import React from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { globalStyleVariables } from '../styles';
import priceFormat from '../common/helpers/priceFormat';

const styles = StyleSheet.create({
  componentWrap: {
    paddingLeft: globalStyleVariables.SIDEINTERVAL,
    paddingRight: globalStyleVariables.SIDEINTERVAL,
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 5,
    // marginBottom: 10,
  },
  componentFlag: {
    width: 18,
    resizeMode: Image.resizeMode.contain,
    marginLeft: globalStyleVariables.SIDEINTERVAL
  },
  componentCode: {
    marginLeft: 5,
    color: '#ccc',
    paddingRight: 5,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  componentInput: {
    flex: 1,
    marginLeft: 10,
  }
});

export default ({ data, style, ...restProps }) => {
  return (
    <View style={[styles.componentWrap, style]} {...restProps}>
      <View style={styles.component}>
        <Image source={require('../images/viemnam.png')} style={styles.componentFlag} />
        <Text style={styles.componentCode}>+84</Text>
        <TextInput style={styles.componentInput} underlineColorAndroid={'rgba(0,0,0,.0)'} placeholder={'please input your phone number'} placeholderTextColor={'#ccc'} />
      </View>
    </View>
  );
};
