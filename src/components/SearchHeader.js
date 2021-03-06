import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  // Platform,
  // StatusBar,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { BORDER_COLOR, HEADER_BACKGROUND_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  // APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  // SCREENS,
} from '../common/constants';

import CustomIcon from './CustomIcon';
import BYTouchable from './BYTouchable';

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40 + STATUSBAR_HEIGHT,
    backgroundColor: HEADER_BACKGROUND_COLOR,
    paddingTop: STATUSBAR_HEIGHT,
    paddingLeft: SIDEINTERVAL,
  },
  headerMiddle: {
    flex: 8,
  },
  headerMiddleMain: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: WINDOW_WIDTH * 0.03,
    height: 30,
    backgroundColor: BORDER_COLOR,
    borderRadius: 1,
  },
  headerMiddleIcon: {
    fontSize: 12,
    color: '#ccc',
    marginRight: WINDOW_WIDTH * 0.02,
  },
  headerMiddleText: {
    fontSize: 13,
    color: '#ccc',
  },
  headerIcon: {
    height: 40,
    lineHeight: 40,
    paddingLeft: WINDOW_HEIGHT * 0.03,
    paddingRight: WINDOW_HEIGHT * 0.03,
    color: '#999',
    fontSize: 18,
  },
});

class SearchHeader extends Component {
  render() {
    const {
      headerRight,
      // headerLeft,
      text,
      middleOnPress = () => {},
      leftOnPress = () => {},
    } = this.props;

    return (
      <View style={styles.headerContainer}>
        {/* {
          headerLeft 
          ?
          headerLeft
          :
          <BYTouchable>
            <CustomIcon name="notice" style={styles.headerIcon} />
          </BYTouchable>
        } */}
        <BYTouchable style={styles.headerMiddle} onPress={middleOnPress}>
          <View style={styles.headerMiddleMain}>
            <CustomIcon name="search" style={styles.headerMiddleIcon} />
            <Text style={styles.headerMiddleText}>{text}</Text>
          </View>
        </BYTouchable>
        {headerRight ? (
          { headerRight }
        ) : (
          <CustomIcon
            name="qrcode"
            style={styles.headerIcon}
            onPress={leftOnPress}
          />
        )}
      </View>
    );
  }
}

export default withNavigation(SearchHeader);
