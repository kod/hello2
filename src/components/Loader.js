import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // absolutePosition: {
  //   position: 'absolute',
  //   top: '50%',
  //   bottom: '50%',
  //   left: '50%',
  //   right: '50%',
  //   zIndex: 999,
  // },
  absolutePositionModalTrue: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  absolutePositionModalFalse: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    left: '50%',
    right: '50%',
  },
});

/**
 * modal false: 页面可交互；true: 页面不可交互
 */
const Loader = ({ absolutePosition, modal = false, style, color }) => (
  <View
    style={[
      styles.container,
      style,
      absolutePosition &&
        (modal
          ? styles.absolutePositionModalTrue
          : styles.absolutePositionModalFalse),
    ]}
  >
    <Spinner type="ThreeBounce" color={color} />
  </View>
);

export default Loader;
