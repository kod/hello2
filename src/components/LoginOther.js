import React from 'react';
import { StyleSheet, View } from 'react-native';
import BYTextInput from './BYTextInput';
import { BORDER_COLOR } from '../styles/variables';
import { SIDEINTERVAL } from '../common/constants';

const styles = StyleSheet.create({
  componentWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
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
  },
});

export default ({
  i18n,
  inputRight,
  style,
  styleWrap,
  styleInput,
  textInputProps,
  ...restProps
}) => (
  <View style={[styles.componentWrap, styleWrap]} {...restProps}>
    <View style={[styles.component, style]}>
      <BYTextInput
        style={[styles.componentInput, styleInput]}
        underlineColorAndroid="rgba(0,0,0,.0)"
        placeholder={i18n.pleaseEnterPasswordAgain}
        placeholderTextColor="#ccc"
        secureTextEntry
        {...textInputProps}
      />
      {inputRight}
    </View>
  </View>
);
