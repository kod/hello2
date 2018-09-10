import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import BYButton from '../components/BYButton';

import {
  FONT_SIZE_THIRD,
  FONT_COLOR_SECOND,
  FONT_SIZE_FIRST,
  FONT_COLOR_THIRD,
  BACKGROUND_COLOR_SECOND,
  FONT_SIZE_SECOND,
  FONT_COLOR_FOURTH,
  FONT_COLOR_PRIMARY,
  BACKGROUND_COLOR_THIRD,
  FONT_SIZE_FIFTH,
  BACKGROUND_COLOR,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  // SIDEINTERVAL,
  SCREENS,
  MONETARY,
  MODAL_TYPES,
  INTERNET_BANK_PAYWAY,
  CREDIT_PAYWAY,
  // OFFLINE_PAYWAY,
} from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';

import * as orderPayActionCreators from '../common/actions/orderPay';
import * as modalActionCreators from '../common/actions/modal';
import { payWayArray, submitDuplicateFreeze } from '../common/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_SECOND,
  },
});

const u84743493Png = require('../images/u84743493.png');
const u8877434Png = require('../images/u8877434.png');

class CombinationPayment extends Component {
  constructor(props) {
    super(props);
    const { i18n } = this.props;
    this.state = {
      submitfreeze: false,
      paypassword: '',
      payWayButtons: payWayArray(i18n).filter(val => val.key !== CREDIT_PAYWAY),
      payWayIndex: 0,
    };
  }

  enterPasswordCallback(ret) {
    this.setState(
      {
        paypassword: ret.val,
      },
      () => {
        this.handleOnPressSubmit();
      },
    );
  }

  mixedPaymentCallback(ret) {
    // let payway = INTERNET_BANK_PAYWAY;
    // if (ret.buttonIndex === 0) {
    //   // 网银付首付
    //   payway = INTERNET_BANK_PAYWAY;
    // } else {
    //   // 线下付首付
    //   payway = OFFLINE_PAYWAY;
    // }
    this.setState({
      payWayIndex: ret.buttonIndex,
    });
  }

  handleOnPressSubmit() {
    const {
      paypassword,
      submitfreeze,
      payWayButtons,
      payWayIndex,
    } = this.state;
    const {
      openModal,
      navigation: { navigate },
      orderPayFetch,
      orderno,
      tradeno,
      payrate,
      repaymentmonth,
      payvalue,
    } = this.props;

    if (paypassword.length === 0) {
      openModal(MODAL_TYPES.ENTERPASSWORD, {
        callback: ret => this.enterPasswordCallback(ret),
        navigate,
      });
      return false;
    }

    // console.log({
    //   orderno,
    //   tradeno,
    //   payway: payWayButtons[payWayIndex].key,
    //   paypassword,
    //   payrate,
    //   repaymentmonth,
    //   payvalue,
    //   screen: SCREENS.Pay,
    // });
    // return false;
    submitDuplicateFreeze(submitfreeze, this, () =>
      orderPayFetch({
        orderno,
        tradeno,
        payway: payWayButtons[payWayIndex].key,
        paypassword,
        payrate,
        repaymentmonth,
        payvalue,
        screen: SCREENS.Pay,
        pop: payWayButtons[payWayIndex].key === INTERNET_BANK_PAYWAY ? 3 : 2,
      }),
    );
    this.setState({ paypassword: '' });
    return true;
  }

  renderContent() {
    const { payWayButtons, payWayIndex } = this.state;
    const {
      i18n,
      openModal,
      payvalue,
      availableBalance,
      totalAmount,
    } = this.props;
    const stylesX = StyleSheet.create({
      container: {},
      main: {
        position: 'relative',
        zIndex: 10,
        marginBottom: 15,
      },
      top: {
        flexDirection: 'row',
        paddingTop: 25,
        paddingBottom: 25,
        marginBottom: 7,
        backgroundColor: BACKGROUND_COLOR_THIRD,
      },
      topLeft: {
        width: WINDOW_WIDTH * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: WINDOW_WIDTH * 0.02,
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      topLeftImage: {
        width: WINDOW_WIDTH * 0.08,
        height: WINDOW_WIDTH * 0.08,
        resizeMode: 'contain',
      },
      topRight: {
        width: WINDOW_WIDTH * 0.8,
      },
      topRightRow1: {
        fontSize: FONT_SIZE_SECOND,
        color: FONT_COLOR_SECOND,
      },
      topRightRow2: {
        fontSize: FONT_SIZE_FIFTH,
        color: FONT_COLOR_PRIMARY,
      },
      topRightRow3: {
        fontSize: FONT_SIZE_FIRST,
        color: FONT_COLOR_FOURTH,
      },
      bottom: {
        backgroundColor: BACKGROUND_COLOR_THIRD,
      },
      bottomMain: {
        flexDirection: 'row',
        paddingTop: 25,
        marginBottom: 15,
        backgroundColor: BACKGROUND_COLOR_THIRD,
      },
      bottomLeft: {
        width: WINDOW_WIDTH * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: WINDOW_WIDTH * 0.02,
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      bottomLeftImage: {
        width: WINDOW_WIDTH * 0.08,
        height: WINDOW_WIDTH * 0.08,
        resizeMode: 'contain',
      },
      bottomRight: {
        width: WINDOW_WIDTH * 0.8,
      },
      bottomRightRow1: {
        fontSize: FONT_SIZE_SECOND,
        color: FONT_COLOR_SECOND,
      },
      bottomRightRow2: {
        fontSize: FONT_SIZE_FIFTH,
        color: FONT_COLOR_PRIMARY,
      },
      bottomChange: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
      },
      bottomChangeText: {
        color: FONT_COLOR_PRIMARY,
        marginRight: 5,
      },
      bottomChangeIcon: {
        color: FONT_COLOR_PRIMARY,
        fontSize: FONT_SIZE_THIRD,
        paddingTop: 2,
      },
      add: {
        position: 'absolute',
        top: 118,
        zIndex: 30,
        left: WINDOW_WIDTH / 2 - 15,
        fontSize: FONT_SIZE_FIFTH,
        color: FONT_COLOR_THIRD,
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: 14,
      },
      buttonText: {
        fontWeight: '700',
        fontSize: FONT_SIZE_THIRD,
      },
    });

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          <View style={stylesX.top}>
            <View style={stylesX.topLeft}>
              <Image style={stylesX.topLeftImage} source={u84743493Png} />
            </View>
            <View style={stylesX.topRight}>
              <Text style={stylesX.topRightRow1}>{i18n.funCard}</Text>
              <Text style={stylesX.topRightRow2}>{`${priceFormat(
                totalAmount - payvalue,
              )} ${MONETARY}`}</Text>
              <Text style={stylesX.bottomRightRow3}>
                {`${i18n.availableQuota} ${priceFormat(
                  availableBalance,
                )} ${MONETARY}`}
              </Text>
            </View>
          </View>
          <View style={stylesX.bottom}>
            <View style={stylesX.bottomMain}>
              <View style={stylesX.bottomLeft}>
                <Image style={stylesX.bottomLeftImage} source={u8877434Png} />
              </View>
              <View style={stylesX.bottomRight}>
                <Text style={stylesX.bottomRightRow1}>
                  {payWayButtons[payWayIndex].value}
                </Text>
                <Text style={stylesX.bottomRightRow2}>
                  {`${priceFormat(payvalue)} ${MONETARY}`}
                </Text>
              </View>
            </View>
            <BYTouchable
              style={stylesX.bottomChange}
              onPress={() =>
                openModal(MODAL_TYPES.ACTIONSHEET, {
                  title: i18n.downPaymentMethod,
                  callback: ret => this.mixedPaymentCallback(ret),
                  data: payWayButtons.map(val => val.value),
                })
              }
            >
              <Text style={stylesX.bottomChangeText}>Change payment combination</Text>
              <Ionicons
                name="ios-arrow-forward"
                style={stylesX.bottomChangeIcon}
              />
            </BYTouchable>
          </View>
          <MaterialIcons name="add" style={stylesX.add} />
        </View>
        <BYButton
          text={`${i18n.payment} ${priceFormat(totalAmount)} ${MONETARY}`}
          styleText={stylesX.buttonText}
          onPress={() => this.handleOnPressSubmit()}
        />
      </View>
    );
  }

  render() {
    const { i18n } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader title={i18n.combinationPayment} />
        <ScrollView>{this.renderContent()}</ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => (state, props) => {
      const { login } = state;
      const {
        navigation: {
          state: {
            params: {
              orderno,
              tradeno,
              payrate,
              repaymentmonth,
              payvalue,
              totalAmount,
              availableBalance,
            },
          },
        },
      } = props;
      return {
        orderno,
        tradeno,
        payrate,
        repaymentmonth,
        payvalue,
        totalAmount,
        availableBalance,
        isAuthUser: !!login.user,
      };
    },
    {
      ...orderPayActionCreators,
      ...modalActionCreators,
    },
  )(CombinationPayment),
);
