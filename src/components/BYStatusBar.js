import React from 'react';
import { StatusBar } from 'react-native';

export default ({ ...restProps }) => {
  return <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent {...restProps} />;
};
