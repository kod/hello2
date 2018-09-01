import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SIDEINTERVAL } from '../common/constants';
import BYTouchable from './BYTouchable';
import { BORDER_COLOR_FIRST } from '../styles/variables';

const styles = StyleSheet.create({
  component: {
    paddingLeft: SIDEINTERVAL,
  },
  componentMain: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    paddingRight: SIDEINTERVAL,
  },
  componentBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR_FIRST,
  },
  componentLeft: {
    fontSize: 14,
    color: '#666',
  },
  componentMiddle: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    paddingRight: 5,
  },
  componentRight: {
    color: '#666',
    fontSize: 16,
  },
});

export default ({
  style,
  styleLeft,
  styleMiddle,
  styleRight,
  valueLeft,
  valueMiddle,
  componentMiddle,
  componentRight,
  isShowLeft = true,
  isShowMiddle = true,
  isShowRight = true,
  isShowBorderBottom = false,
  ...restProps
}) => (
  <BYTouchable
    delayPressIn={0}
    style={[styles.component, style]}
    {...restProps}
  >
    <View
      style={[
        styles.componentMain,
        isShowBorderBottom && styles.componentBorderBottom,
      ]}
    >
      {isShowLeft && (
        <Text style={[styles.componentLeft, styleLeft]}>{valueLeft}</Text>
      )}
      {isShowMiddle &&
        (componentMiddle ? (
          { componentMiddle }
        ) : (
          <Text style={[styles.componentMiddle, styleMiddle]} numberOfLines={1}>
            {valueMiddle}
          </Text>
        ))}
      {isShowRight &&
        (componentRight ? (
          { componentRight }
        ) : (
          <Ionicons
            name="ios-arrow-forward"
            style={[styles.componentRight, styleRight]}
          />
        ))}
    </View>
  </BYTouchable>
);
