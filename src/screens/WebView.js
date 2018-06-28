import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import NavBar1 from '../components/NavBar1';
import BYWebView from '../components/BYWebView';
import { SIDEINTERVAL, RED_COLOR } from '../styles/variables';

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logout: {
    paddingRight: SIDEINTERVAL,
    paddingLeft: SIDEINTERVAL
  },
  logoutText: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    color: RED_COLOR,
    fontSize: 14
  }
});

class WebView extends React.Component {
  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  handleOnPressLogout() {
    const {
      i18n,
      logout,
      navigation: { goBack }
    } = this.props;
    Alert.alert('', i18n.doYouWantToSignOut, [
      {
        text: i18n.cancel
      },
      {
        text: i18n.signOut,
        onPress: () => {
          logout();
          goBack();
        }
      }
    ]);
  }

  render() {
    const {
      navigation: { navigate, state },
      i18n,
    } = this.props;
    return <BYWebView source={{ uri: state.params.source }} />;
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          bannerHomeRecommend,
        } = state;

        const {

        } = props;

        return {
          bannerHomeRecommend: bannerHomeRecommend || {}
        }
      }
    },
    {
      ...bannerHomeRecommendActionCreators,
      ...authActionCreators,
    }
  )(WebView)
);

// function mapStateToProps(state, props) {
//   const { bannerHomeRecommend } = state;
//   return {
//     bannerHomeRecommend: bannerHomeRecommend || {}
//   };
// }

// export default connectLocalization(
//   connect(
//     mapStateToProps,
//     { ...bannerHomeRecommendActionCreators, ...authActionCreators }
//   )(WebView)
// );
