import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { globalStyleVariables } from '../styles';
import priceFormat from '../common/helpers/priceFormat';

import BYTextInput from "../components/BYTextInput";

const styles = StyleSheet.create({
  componentWrap: {
    paddingLeft: globalStyleVariables.SIDEINTERVAL,
    paddingRight: globalStyleVariables.SIDEINTERVAL
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 5,
  },
  componentInput: {
    flex: 1,
    marginLeft: globalStyleVariables.SIDEINTERVAL,
  }
});

export default ({ inputRight, style, styleWrap, styleInput, textInputProps, ...restProps }) => {
  return (
    <View style={[styles.componentWrap, styleWrap]} {...restProps}>
      <View style={[styles.component, style]}>
        <BYTextInput style={[styles.componentInput, styleInput]} underlineColorAndroid={'rgba(0,0,0,.0)'} placeholder={'confirm password'} placeholderTextColor={'#ccc'} secureTextEntry={true} {...textInputProps} />
        {inputRight}
      </View>
    </View>
  );
};
