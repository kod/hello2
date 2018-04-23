import React from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { globalStyleVariables } from '../styles';
import priceFormat from '../common/helpers/priceFormat';
import Error from '../components/Error';

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
        <TextInput 
          style={[styles.componentInput, styleInput]} 
          underlineColorAndroid={'rgba(0,0,0,.0)'} 
          placeholder={'confirm password'} 
          placeholderTextColor={'#ccc'} 
          secureTextEntry={true} 
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
