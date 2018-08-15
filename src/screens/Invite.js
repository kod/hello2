import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // ScrollView,
  Image,
  Clipboard,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode';

import {
  // SCREENS,
  SIDEINTERVAL,
  WINDOW_WIDTH,
} from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import SeparateBar from '../components/SeparateBar';
// import BYTouchable from '../components/BYTouchable';

import {
  // RED_COLOR,
  PRIMARY_COLOR,
} from '../styles/variables';

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as authActionCreators from '../common/actions/auth';
// import priceFormat from '../common/helpers/priceFormat';

const zalofunPng = require('../images/zalofun.png');
const googleplusPng = require('../images/googleplus.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrText: 'https://buyoo.vn/',
    };
  }

  // componentDidMount() {
  //   const { bannerHomeRecommendFetch } = this.props;
  //   // bannerHomeRecommendFetch();
  // }

  async handleOnPressCopy() {
    const { i18n } = this.props;
    Clipboard.setString('hello world');
    Alert.alert(
      '',
      i18n.successfulCopy,
      [
        {
          text: i18n.confirm,
          onPress: () => {},
        },
      ],
      // { cancelable: false },
    );
  }

  renderMenuBottomShare() {
    const stylesX = StyleSheet.create({
      contanier: {
        paddingTop: 20,
        backgroundColor: PRIMARY_COLOR,
      },
      title: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 30,
      },
      titleIcon: {
        fontSize: 16,
        color: '#fff',
        paddingTop: 2,
        paddingRight: 4,
      },
      titleText: {
        fontSize: 14,
        color: '#fff',
      },
      main: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40,
        paddingLeft: SIDEINTERVAL * 3,
        paddingRight: SIDEINTERVAL * 3,
      },
      item: {
        height: 40,
        width: 40,
      },
    });
    return (
      <View style={stylesX.contanier}>
        <View style={stylesX.title}>
          <Ionicons style={stylesX.titleIcon} name="ios-paper-plane" />
          <Text style={stylesX.titleText}>tap to share</Text>
        </View>
        <View style={stylesX.main}>
          <Image style={stylesX.item} source={zalofunPng} />
          <Image style={stylesX.item} source={googleplusPng} />
        </View>
      </View>
    );
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        // position: 'relative',
        flex: 1,
        // backgroundColor: '#f00',
      },
      row1: {
        flex: 1,
        // backgroundColor: '#0f0',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 60,
      },
      row1Title: {
        fontSize: 11,
        color: '#666',
        paddingTop: 15,
      },
      wrap: {
        // position: 'absolute',
        // bottom: 0,
      },
      row2: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      row2Left: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      row2Middle: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      row2Right: {
        height: 25,
        lineHeight: 25,
        textAlign: 'center',
        color: '#fff',
        fontSize: 11,
        backgroundColor: PRIMARY_COLOR,
        paddingLeft: WINDOW_WIDTH * 0.04,
        paddingRight: WINDOW_WIDTH * 0.04,
        borderRadius: 14,
      },
    });

    const { qrText } = this.state;
    const { i18n } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.row1}>
          <QRCode value={qrText} size={200} />
          <Text style={stylesX.row1Title}>
            {i18n.showQRCodeShareInvitationCodeYourFriends}
          </Text>
        </View>
        <SeparateBar />
        <View style={stylesX.row2}>
          <Text style={stylesX.row2Left}>{i18n.myInviationCode}</Text>
          <Text style={stylesX.row2Middle}>123456789123</Text>
          <Text
            style={stylesX.row2Right}
            onPress={() => this.handleOnPressCopy()}
          >
            {i18n.copy}
          </Text>
        </View>
        {this.renderMenuBottomShare()}
        {/* <View style={stylesX.wrap}>
        </View> */}
      </View>
    );
  }

  render() {
    // const {
    //   // bannerHomeRecommend,
    //   // navigation: { navigate },
    //   i18n,
    // } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        {/* <ScrollView> */}
        {this.renderContent()}
        {/* </ScrollView> */}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      // const {
      // } = state;

      // const {

      // } = props;
      console.log();
      return {};
    },
    {
      ...bannerHomeRecommendActionCreators,
      ...authActionCreators,
    },
  )(Invite),
);
