import React, { Component } from 'react';
import { StatusBar } from 'react-native';

export default ({ ...restProps }) => (
  <StatusBar
    backgroundColor="transparent"
    barStyle="dark-content"
    translucent
    {...restProps}
  />
);
