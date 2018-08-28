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
import { ShareDialog, ShareApi } from 'react-native-fbsdk';

import {
  // SCREENS,
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SHARE_URL,
  ZALO,
  GOOGLE_PLUS,
  FACEBOOK,
} from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import SeparateBar from '../components/SeparateBar';
import BYTouchable from '../components/BYTouchable';

import {
  // RED_COLOR,
  PRIMARY_COLOR,
} from '../styles/variables';

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as authActionCreators from '../common/actions/auth';
import { capitalizeTool } from '../common/helpers';

// const zalofunPng = require('../images/zalofun.png');
// const googleplusPng = require('../images/googleplus.png');
const oifasPng = require('../images/oifas.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Invite extends Component {
  constructor(props) {
    super(props);
    const { isAuthUser, user } = this.props;
    this.state = {
      qrText: SHARE_URL.replace('XXX', isAuthUser ? user.result : ''),
      shareLinkContent: {
        contentType: 'link',
        contentUrl: 'https://facebook.com',
        // contentDescription: 'Wow, check out this great site!',
      },
    };
  }

  // componentDidMount() {
  //   const { bannerHomeRecommendFetch } = this.props;
  //   // bannerHomeRecommendFetch();
  // }

  shareLinkWithShareDialog() {
    // var tmp = this;
    // ShareApi.canShare(this.state.shareLinkContent).then(
    //   function(canShare) {
    //     if (canShare) {
    //       return ShareApi.share(tmp.state.shareLinkContent, '/me', 'Some message.');
    //     }
    //   }
    // ).then(
    //   function(result) {
    //     console.log(result);
    //     console.log('Share with ShareApi success.');
    //   },
    //   function(error) {
    //     console.log('Share with ShareApi failed with error: ' + error);
    //   }
    // );

    console.log(this.state.shareLinkContent);
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          console.log(tmp.state.shareLinkContent);
          console.log(tmp.state.shareLinkContent);
          console.log(tmp.state.shareLinkContent);
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
        } else {
          console.log('Share success with postId: '
            + result.postId);
        }
      },
      function(error) {
        console.log('Share fail with error: ' + error);
      }
    );
  }

  async handleOnPressCopy() {
    const { i18n, isAuthUser, user } = this.props;

    if (isAuthUser) {
      // console.log(i18n.invitationCodeText.replace('XXX', user.result));
      Clipboard.setString(i18n.invitationCodeText.replace('XXX', user.result));
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
  }

  handleOnPressShare(type) {
    switch (type) {
      case FACEBOOK:
        this.shareLinkWithShareDialog();
        console.log('FACEBOOK');
        break;

      case ZALO:
        console.log('ZALO');
        break;

      case GOOGLE_PLUS:
        console.log('GOOGLE_PLUS');
        break;

      default:
        break;
    }
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
        // backgroundColor: '#ff0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      itemImage: {
        height: 40,
        width: 40,
        marginBottom: 5,
      },
      itemText: {
        textAlign: 'center',
        color: '#fff',
      },
    });

    const { i18n } = this.props;

    return (
      <View style={stylesX.contanier}>
        <View style={stylesX.title}>
          <Ionicons style={stylesX.titleIcon} name="ios-paper-plane" />
          <Text style={stylesX.titleText}>{i18n.share}</Text>
        </View>
        <View style={stylesX.main}>
          {/* <BYTouchable style={stylesX.item}>
            <Image style={stylesX.itemImage} source={zalofunPng} />
            <Text style={stylesX.itemText}>
              {capitalizeTool().capitalize(ZALO)}
            </Text>
          </BYTouchable>
          <BYTouchable style={stylesX.item}>
            <Image style={stylesX.itemImage} source={googleplusPng} />
            <Text style={stylesX.itemText}>
              {capitalizeTool().capitalize(GOOGLE_PLUS)}
            </Text>
          </BYTouchable> */}
          <BYTouchable
            style={stylesX.item}
            onPress={() => this.handleOnPressShare(FACEBOOK)}
          >
            <Image style={stylesX.itemImage} source={oifasPng} />
            <Text style={stylesX.itemText}>
              {capitalizeTool().capitalize(FACEBOOK)}
            </Text>
          </BYTouchable>
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
        position: 'relative',
        flex: 1,
        // backgroundColor: '#0f0',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 60,
      },
      row1Title: {
        fontSize: 11,
        color: '#666',
        paddingTop: 20,
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
      row2Tips: {
        textAlign: 'center',
      },
    });

    const { qrText } = this.state;
    const { i18n, isAuthUser, user } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.row1}>
          <QRCode value={qrText} size={200} />
          <Text style={stylesX.row1Title}>
            {i18n.showQRCodeShareInvitationCodeYourFriends}
          </Text>
        </View>
        <SeparateBar />
        {isAuthUser ? (
          <View style={stylesX.row2}>
            <Text style={stylesX.row2Left}>{i18n.myInviationCode}</Text>
            <Text style={stylesX.row2Middle}>{isAuthUser && user.result}</Text>
            <Text
              style={stylesX.row2Right}
              onPress={() => this.handleOnPressCopy()}
            >
              {i18n.copy}
            </Text>
          </View>
        ) : (
          <View style={stylesX.row2}>
            <Text style={stylesX.row2Tips}>{i18n.shareTip}</Text>
          </View>
        )}
        {this.renderMenuBottomShare()}
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
        {this.renderContent()}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    state => {
      const { login } = state;

      // const {

      // } = props;
      return {
        user: login.user,
        isAuthUser: !!login.user,
      };
    },
    {
      ...bannerHomeRecommendActionCreators,
      ...authActionCreators,
    },
  )(Invite),
);
