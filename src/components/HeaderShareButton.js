import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BYTouchable from './BYTouchable';

const styles = StyleSheet.create({
  icon: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
  },
});

const HeaderShareButton = ({ onPress, color, style, ...restProps }) =>
  <BYTouchable onPress={onPress} style={style} {...restProps}>
    <Icon
      name="share"
      size={20}
      style={styles.icon}
      color={color || '#fff'}
    />
  </BYTouchable>;

export default HeaderShareButton;
