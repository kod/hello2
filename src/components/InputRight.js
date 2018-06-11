import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { globalStyleVariables } from '../styles';
import priceFormat from '../common/helpers/priceFormat';
import Error from '../components/Error';

import BYTextInput from "../components/BYTextInput";

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
  },
  componentInput: {
    flex: 1,
    marginLeft: globalStyleVariables.SIDEINTERVAL,
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
