import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { HeaderBackButton, withNavigation } from 'react-navigation';
import { globalStyleVariables } from '../styles';
import CustomIcon from "../components/CustomIcon";
import BYTouchable from "../components/BYTouchable";

const styles = StyleSheet.create({
  container: {
    paddingTop: globalStyleVariables.STATUSBAR_HEIGHT,
    // paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.04,
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
  containerDark: {
    // backgroundColor: '#f00',
    // backgroundColor: globalStyleVariables.HEADER_BACKGROUND_COLOR,
  },
  absolutePosition: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0, // android only for use with translucent status bar
    left: 0,
    right: 0,
    bottom: 0,
    height:
      globalStyleVariables.APPBAR_HEIGHT +
      globalStyleVariables.STATUSBAR_HEIGHT,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#f5f5f5',
    // justifyContent: 'space-between',
  },
  headerBack: {
    height: 44,
    lineHeight: 44,
    paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.03,
    paddingRight: globalStyleVariables.WINDOW_WIDTH * 0.04,
    fontSize: 15,
    color: '#333',
  },
  headerLine: {
    position: 'absolute',
    bottom: 0,
    left: globalStyleVariables.WINDOW_WIDTH * 0.04,
    right: 0,
    height: 1,
    backgroundColor: '#f5f5f5',
  }
});

class PXHeader extends Component {
  // static propTypes = {
  //   onPressBackButton: PropTypes.func,
  //   showBackButton: PropTypes.bool,
  //   headerTitle: PropTypes.element,
  //   headerRight: PropTypes.element,
  //   darkTheme: PropTypes.bool,
  // };

  static defaultProps = {
    onPressBackButton: null,
    showBackButton: false,
    headerTitle: null,
    headerRight: null,
    darkTheme: false,
  };

  handleOnPressBackButton = () => {
    const { onPressBackButton, navigation: { goBack } } = this.props;
    if (onPressBackButton) {
      onPressBackButton();
    } else {
      goBack();
    }
  };

  render() {
    const {
      showBackButton,
      headerTitle,
      headerRight,
      headerLeft,
      darkTheme,
      absolutePosition,
    } = this.props;
    console.log(this.props);
    return (
      <View
        style={[
          styles.container,
          darkTheme && styles.containerDark,
          absolutePosition ? styles.absolutePosition : styles.containerShadow,
        ]}
      >
        <View style={styles.subContainer}>
          <BYTouchable onPress={() => this.handleOnPressBackButton()} >
            {showBackButton ?
              <CustomIcon
                name="back"
                style={styles.headerBack}
                /> :
              headerLeft}
          </BYTouchable>
          {headerTitle}
          {headerRight}
        </View>
        <View style={styles.headerLine}></View>
      </View>
    );
  }
}

export default withNavigation(PXHeader);
