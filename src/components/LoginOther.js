import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';

import BYTextInput from "../components/BYTextInput";

import { SIDEINTERVAL, BORDER_COLOR } from "../styles/variables";

const styles = StyleSheet.create({
  componentWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 5,
  },
  componentInput: {
    flex: 1,
    marginLeft: SIDEINTERVAL,
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
