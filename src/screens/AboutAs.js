import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
// import { PRIMARY_COLOR, RED_COLOR } from '../styles/variables';
// import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from "../common/constants";
import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
// import BYTouchable from "../components/BYTouchable";
// import EmptyState from "../components/EmptyState";
// import Loader from "../components/Loader";

import SeparateBar from "../components/SeparateBar";
import NavBar1 from "../components/NavBar1";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  WrapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  appMsgWrap2: {
    flex: 0.35,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  appMsgWrap: {
    height: 80,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  appVersion: {
    color: '#666',
    fontSize: 14
  },
  appIcon: {
    height: 50,
    width: 50,
  },
  copyright: {
    textAlign: 'center',
    color: '#CCCCCC',//#f5f5f5
    marginBottom: '9%',
    fontSize: 12,
  }
});

// 我_关于我们
class AboutAs extends React.Component {

  componentDidMount() {

  }

  render() {
    const {
      navigation: { navigate },
      i18n,
    } = this.props

    const navBar1List = [
      {
        name: 'Support center',
        navigate: SCREENS.Login,
        tips: '',
      },
      {
        name: 'How to buy',
        navigate: SCREENS.Login,
        tips: '',
      },
      {
        name: 'Business E-mail',
        navigate: SCREENS.Login,
        tips: 'business.vn@buyoo.aisa',
      },
      {
        name: 'Service E-mail',
        navigate: SCREENS.Login,
        tips: 'service@buyoo.aisa',
      },
      {
        name: 'Online service',
        navigate: SCREENS.Login,
        tips: '',
      },
      {
        name: 'Hotline',
        navigate: SCREENS.Login,
        tips: '1900-5555-06',
      },
    ];

    return (
      <View style={styles.WrapContainer}>
        <View style={{ flex:1 }}>
          <BYHeader/>
          <View style={styles.appMsgWrap2}>
            <View style={styles.appMsgWrap}>
              <Image style={styles.appIcon} source={require('../images/ic_avatar.png')}/>
              <Text style={styles.appVersion}>buyoo.vn V1.07Beta4</Text>
            </View>
          </View>
          <SeparateBar />
          <ScrollView style={styles.container}>
            <NavBar1 list={navBar1List} navigate={navigate} style={{marginBottom: 30}} styleItemLeft={{flex: 3}}/>
          </ScrollView>
        </View>
        <Text style={styles.copyright}>Copyright 2017BUYoo.vn ALL Rights REserved</Text>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {

        } = state;

        // const {

        // } = props;

        return {
          isAuthUser: !!state.auth.user,

        }
      }
    },
    {

    }
  )(AboutAs)
);