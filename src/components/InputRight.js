import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';
import Error from '../components/Error';

import { BORDER_COLOR } from '../styles/variables';

import BYTextInput from '../components/BYTextInput';

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
    paddingTop: 10,
    paddingBottom: 10,
  }
});

export default (
  { inputRight,
    style,
    styleWrap,
    styleInput,
    input,
    meta: { touched, dirty, error },
    ...inputProps
  }
) => {
  return (
    <View style={[styles.componentWrap, styleWrap]} >
      <View style={[styles.component, style]}>
        <BYTextInput 
          style={[styles.componentInput, styleInput]} 
          placeholderTextColor={'#ccc'} 
          onChangeText={input.onChange}
          value={input.value}
          {...input}
          {...inputProps} 
        />
        {inputRight}
      </View>
      {touched && error && <Error text={error} styleWrap={{ marginTop: 5, marginBottom: 0 }} />}
    </View>
  );
};
