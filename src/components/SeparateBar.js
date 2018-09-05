import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  separateBar: {
    backgroundColor: '#f5f5f5',
    height: 10,
  },
});

export default ({ ...restProps }) => (
  <View style={styles.separateBar} {...restProps} />
);
