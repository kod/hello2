import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';
import Error from './Error';
import BYTextInput from './BYTextInput';
import { BORDER_COLOR } from '../styles/variables';

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
  componentFlag: {
    width: 18,
    resizeMode: Image.resizeMode.contain,
    marginLeft: SIDEINTERVAL
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

export default (
  { 
    data,
    style,
    input,
    meta: { touched, dirty, error },
    ...inputProps 
  }
) => {
  return (
    <View style={[styles.componentWrap, style]}>
      <View style={styles.component}>
        <Image source={require('../images/viemnam.png')} style={styles.componentFlag} />
        <Text style={styles.componentCode}>+84</Text>
        <BYTextInput
          style={styles.componentInput} 
          underlineColorAndroid="rgba(0,0,0,.0)"
          placeholder={'please input your phone number'} 
          placeholderTextColor="#ccc" 
          onChangeText={input.onChange}
          value={input.value}
          {...input}
          {...inputProps}
        />
      </View>
      {touched && error && <Error text={error} styleWrap={{ marginTop: 5, marginBottom: 0 }} />}
    </View>
  );
};
