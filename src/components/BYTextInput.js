import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  component: {
    padding: 0,
    margin: 0,
  },
});

export default ({ style, ...restProps }) => {
  return <TextInput style={[styles.component, style]} underlineColorAndroid={'rgba(0,0,0,.0)'} {...restProps} />;
};
