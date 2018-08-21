import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS, SIDEINTERVAL } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import NavBar1 from '../components/NavBar1';
import BYTouchable from '../components/BYTouchable';
import { RED_COLOR } from '../styles/variables';
// import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as loginActionCreators from '../common/actions/login';

const personPng = require('../images/person.png');
// const osindfaofisPng = require('../images/osindfaofis.png');
// const ufifhiufaisfudPng = require('../images/ufifhiufaisfud.png');
const aboutPng = require('../images/about.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logout: {
    paddingRight: SIDEINTERVAL,
    paddingLeft: SIDEINTERVAL,
  },
  logoutText: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    color: RED_COLOR,
    fontSize: 14,
  },
});

class Settings extends Component {
  handleOnPressLogout() {
    const {
      i18n,
      logout,
      navigation: { goBack },
    } = this.props;
    Alert.alert('', `${i18n.doYouWantToSignOut}?`, [
      {
        text: i18n.cancel,
      },
      {
        text: i18n.signOut,
        onPress: () => {
          logout();
          goBack();
        },
      },
    ]);
  }

  render() {
    const {
      // bannerHomeRecommend,
      navigation: { navigate },
      i18n,
      isAuthUser,
    } = this.props;

    const navBar1List = [
      // {
      //   iconImg: personPng,
      //   name: i18n.personalInformation,
      //   navigate: SCREENS.Login,
      //   tips: '',
      // },
      // {
      //   iconImg: osindfaofisPng,
      //   name: i18n.securityCenter,
      //   navigate: SCREENS.SecurityCenter,
      //   callback: () =>
      //   tips: '',
      // },
      // {
      //   iconImg: ufifhiufaisfudPng,
      //   name: i18n.clearCache,
      //   navigate: SCREENS.Login,
      //   tips: '',
      // },
      {
        iconImg: aboutPng,
        name: i18n.aboutAs,
        func: () => navigate(SCREENS.AboutAs),
        tips: '',
      },
      {
        iconImg: personPng,
        name: i18n.language,
        func: () => navigate(SCREENS.Language),
        tips: '',
      },
    ];

    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView style={styles.container}>
          <NavBar1
            list={navBar1List}
            style={{ marginBottom: 30 }}
            styleItemLeft={{ flex: 3 }}
          />
          {isAuthUser && (
            <BYTouchable
              style={styles.logout}
              onPress={() => this.handleOnPressLogout()}
            >
              <Text style={styles.logoutText}>{i18n.signOut}</Text>
            </BYTouchable>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    state => {
      const {
        bannerHomeRecommend,
        // bannerHomeRecommend,
        login,
      } = state;

      // const {

      // } = props;

      return {
        isAuthUser: !!login.user,
        bannerHomeRecommend: bannerHomeRecommend || {},
      };
    },
    {
      // ...bannerHomeRecommendActionCreators,
      ...loginActionCreators,
    },
  )(Settings),
);
