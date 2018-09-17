import React from 'react';
import {
  StyleSheet,
  Image,
  // View,
  // Text,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { SIDEINTERVAL, WINDOW_WIDTH } from '../common/constants';
import {
  BACKGROUND_COLOR_THIRD,
  FONT_SIZE_SIXTH,
  FONT_COLOR_PRIMARY,
  FONT_SIZE_FIRST,
  FONT_COLOR_SECOND,
} from '../styles/variables';
import BYTouchable from './BYTouchable';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR_THIRD,
    height: 200,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  image: {
    width: WINDOW_WIDTH - SIDEINTERVAL * 2,
    height: 200,
    resizeMode: 'cover',
  },
  camera: {
    fontSize: FONT_SIZE_SIXTH,
    color: FONT_COLOR_PRIMARY,
  },
  title: {
    color: FONT_COLOR_PRIMARY,
    marginBottom: 6,
  },
  desc: {
    fontSize: FONT_SIZE_FIRST,
    color: FONT_COLOR_SECOND,
    lineHeight: FONT_SIZE_FIRST * 1.618,
    textAlign: 'center',
  },
});

export default ({
  // title = '',
  // desc = '',
  url = '',
  defaultUrl = '',
  onPress = () => {},
  ...restProps
}) => (
  <BYTouchable
    style={styles.container}
    onPress={() => onPress()}
    {...restProps}
  >
    {url === '' ? (
      // <View style={styles.main}>
      //   <Ionicons name="ios-camera" style={styles.camera} />
      //   <Text style={styles.title}>{title}</Text>
      //   <Text style={styles.desc} numberOfLines={2}>
      //     {desc}
      //   </Text>
      // </View>
      <Image
        style={styles.image}
        source={{
          uri: defaultUrl,
        }}
      />
    ) : (
      <Image
        style={styles.image}
        source={{
          uri: url,
        }}
      />
    )}
  </BYTouchable>
);
