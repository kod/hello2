import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, StatusBar, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { HEADER_BACKGROUND_COLOR, BORDER_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
} from '../common/constants';
import CustomIcon from './CustomIcon';
import BYTouchable from './BYTouchable';

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: HEADER_BACKGROUND_COLOR,
  },
  containerShadow: {
    ...Platform.select({
      ios: {
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: 'rgba(0, 0, 0, .3)',
      },
      android: {
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: 'rgba(0, 0, 0, .3)',
        // shadowColor: 'black',
        // shadowOpacity: 0.1,
        // shadowRadius: StyleSheet.hairlineWidth,
        // shadowOffset: {
        //   height: StyleSheet.hairlineWidth,
        // },
        // elevation: 4,
      },
    }),
  },
  absolutePosition: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0, // android only for use with translucent status bar
    left: 0,
    right: 0,
    bottom: 0,
    height: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: BORDER_COLOR,
    // justifyContent: 'space-between',
  },
  headerBack: {
    height: APPBAR_HEIGHT,
    lineHeight: APPBAR_HEIGHT,
    paddingLeft: WINDOW_WIDTH * 0.03,
    paddingRight: SIDEINTERVAL,
    fontSize: 15,
    color: '#333',
  },
  headerLine: {
    position: 'absolute',
    bottom: 0,
    left: SIDEINTERVAL,
    right: 0,
    height: 1,
    backgroundColor: BORDER_COLOR,
  },
});

class BYHeader extends Component {
  // static propTypes = {
  //   onPressBackButton: PropTypes.func,
  //   showBackButton: PropTypes.bool,
  //   headerTitle: PropTypes.element,
  //   headerRight: PropTypes.element,
  // };

  static defaultProps = {
    onPressBackButton: null,
    showBackButton: true,
    headerTitle: null,
    headerRight: null,
  };

  handleOnPressBackButton = () => {
    const {
      onPressBackButton,
      navigation: { goBack },
    } = this.props;
    if (onPressBackButton) {
      onPressBackButton();
    } else {
      goBack();
    }
  };

  renderHeaderLeft = () => <View />;

  // renderHeaderTitle = () => <View style={{ flex: 1 }} />;

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40,
        flexDirection: 'row',
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    });

    const { title = '' } = this.props;

    return (
      <View style={stylesX.container}>
        <Text style={stylesX.title}>{title}</Text>
      </View>
    );
  };

  render() {
    const {
      showBackButton,
      headerTitle,
      headerRight,
      headerLeft,
      absolutePosition,
      isShowHeaderLine = true,
    } = this.props;

    return (
      <View
        style={[
          styles.container,
          absolutePosition ? styles.absolutePosition : styles.containerShadow,
        ]}
      >
        <View style={styles.subContainer}>
          <BYTouchable
            onPress={() => this.handleOnPressBackButton()}
            // onPress={() => this.handleOnPressBackButton()}
          >
            {showBackButton ? (
              <CustomIcon name="back" style={styles.headerBack} />
            ) : (
              headerLeft || this.renderHeaderLeft()
            )}
          </BYTouchable>
          {headerTitle || this.renderHeaderTitle()}
          {headerRight}
        </View>
        {isShowHeaderLine && <View style={styles.headerLine} />}
      </View>
    );
  }
}

export default withNavigation(BYHeader);
