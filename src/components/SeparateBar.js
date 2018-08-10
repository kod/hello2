import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  separateBar: {
    backgroundColor: '#f5f5f5',
    height: 5,
  },
});

export default ({ ...restProps }) => (
  <View style={styles.separateBar} {...restProps} />
);
