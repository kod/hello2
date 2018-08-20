import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  Alert,
  // DeviceEventEmitter,
} from 'react-native';
import {
  SCREENS,
  SUPPORT_CENTER_URL,
  HOW_TO_BUY_URL,
  BUSINESS_EMAIL,
  SERVICE_EMAIL,
  SERVICE_PHONE,
  BUYOO_VN,
  BUYOO,
} from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';

import SeparateBar from '../components/SeparateBar';
import NavBar1 from '../components/NavBar1';

const icAvatarPng = require('../images/ic_avatar.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  WrapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    alignItems: 'center',
  },
  appVersion: {
    color: '#666',
    fontSize: 14,
  },
  appIcon: {
    height: 50,
    width: 50,
  },
  copyright: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: '9%',
    fontSize: 12,
  },
});

// 我_关于我们
class AboutAs extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {

  // }

  // 打开手机上对应邮箱的应用
  // url: 邮箱链接
  handleOpenPhoneMailFunc(url) {
    const {
      i18n,
      // i18n,
    } = this.props;

    // 启动一个链接相对应的应用（打开浏览器、邮箱或者其它的应用）
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          // console.log('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url);
        }
        return '';
      })
      .catch(err =>
        Alert.alert(i18n.anErrorOccurred, err, [
          {
            text: i18n.confirm,
          },
        ]),
      );
  }

  render() {
    const {
      navigation: { navigate },
      i18n,
      // i18n,
    } = this.props;

    const navBar1List = [
      {
        name: i18n.helpingCenter,
        func: () =>
          navigate(SCREENS.WebView, {
            source: SUPPORT_CENTER_URL,
          }),
        tips: '',
      },
      {
        name: i18n.howToBuy,
        func: () =>
          navigate(SCREENS.WebView, {
            source: HOW_TO_BUY_URL,
          }),
        tips: '',
      },
      {
        name: i18n.businessEmail,
        func: () => this.handleOpenPhoneMailFunc(`mailto:${BUSINESS_EMAIL}`),
        tips: BUSINESS_EMAIL,
      },
      {
        name: i18n.serviceEmail,
        func: () => this.handleOpenPhoneMailFunc(`mailto:${SERVICE_EMAIL}`),
        tips: SERVICE_EMAIL,
      },
      {
        name: i18n.hotline,
        func: () => this.handleOpenPhoneMailFunc(`tel:${SERVICE_PHONE}`),
        tips: SERVICE_PHONE,
      },
    ];
    // navigate(SCREENS.WebView, { source: 'https://buyoo.vn/html/paystepM.html' })
    return (
      <View style={styles.WrapContainer}>
        <View style={{ flex: 1 }}>
          <BYHeader />
          <View style={styles.appMsgWrap2}>
            <View style={styles.appMsgWrap}>
              <Image style={styles.appIcon} source={icAvatarPng} />
              <Text style={styles.appVersion}>
                {BUYOO_VN} v{DeviceInfo.getVersion()}
              </Text>
            </View>
          </View>
          <SeparateBar />
          <ScrollView style={styles.container}>
            <NavBar1
              list={navBar1List}
              navigate={navigate}
              style={{ marginBottom: 30 }}
              styleItemLeft={{ flex: 2 }}
            />
          </ScrollView>
        </View>
        <Text style={styles.copyright}>
          &copy; {`${new Date().getFullYear()} - `}
          {i18n.copyright.replace('CompanyName', BUYOO)} - {BUYOO_VN}
        </Text>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    state => {
      const {
        login,
        // login,
      } = state;

      // const {

      // } = props;

      return {
        isAuthUser: !!login.user,
      };
    },
    // {

    // }
  )(AboutAs),
);
