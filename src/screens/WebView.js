import React, { Component } from 'react';
import {
  BackHandler,
  // BackHandler,
} from 'react-native';
import { connect } from 'react-redux';

import { connectLocalization } from '../components/Localization';
import BYWebView from '../components/BYWebView';
// import { SIDEINTERVAL, RED_COLOR } from '../styles/variables';

import * as authActionCreators from '../common/actions/auth';
import { SCREENS } from '../common/constants';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   logout: {
//     paddingRight: SIDEINTERVAL,
//     paddingLeft: SIDEINTERVAL,
//   },
//   logoutText: {
//     height: 50,
//     lineHeight: 50,
//     textAlign: 'center',
//     backgroundColor: '#F5F5F5',
//     color: RED_COLOR,
//     fontSize: 14,
//   },
// });

class WebView extends Component {
  componentDidMount() {
    const {
      navigation: { pop },
      from,
      pop: popLevel,
    } = this.props;

    switch (from) {
      case SCREENS.Pay:
        this.backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          () => pop(popLevel),
        );
        break;

      default:
        break;
    }
  }

  componentWillUnmount() {
    const { from } = this.props;
    switch (from) {
      case SCREENS.Pay:
        this.backHandler.remove();
        break;

      default:
        break;
    }
  }

  render() {
    const {
      navigation: { state },
      i18n,
    } = this.props;
    return (
      <BYWebView
        {...this.props}
        source={{ uri: state.params.source }}
        from={state.params.from}
        i18n={i18n}
      />
    );
  }
}

export default connectLocalization(
  connect(
    (state, props) => {
      const {
        login,
        // login,
      } = state;

      const {
        navigation: {
          state: { params = {} },
        },
      } = props;
      console.log(props);

      return {
        from: params.from || '',
        pop: params.pop || 1,
        auth: login || {},
      };
    },
    {
      ...authActionCreators,
    },
  )(WebView),
);
