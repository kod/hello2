import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { HeaderBackButton, withNavigation } from 'react-navigation';
import { globalStyleVariables } from '../styles';

const styles = StyleSheet.create({
  container: {
    paddingTop: globalStyleVariables.STATUSBAR_HEIGHT,
  },
  containerShadow: {
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0, 0, 0, .3)',
      },
      android: {
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
          height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
      },
    }),
  },
  containerDark: {
    backgroundColor: globalStyleVariables.HEADER_BACKGROUND_COLOR,
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
    // justifyContent: 'space-between',
  },
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
    return (
      <View
        style={[
          styles.container,
          darkTheme && styles.containerDark,
          absolutePosition ? styles.absolutePosition : styles.containerShadow,
        ]}
      >
        <View style={styles.subContainer}>
          {showBackButton ?
            <HeaderBackButton
              onPress={this.handleOnPressBackButton}
              tintColor={darkTheme && '#fff'}
            /> :
            headerLeft}
          {headerTitle}
          {headerRight}
        </View>
      </View>
    );
  }
}

export default withNavigation(PXHeader);