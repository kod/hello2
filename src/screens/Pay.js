import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NavBar2 from '../components/NavBar2';
import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import Loader from '../components/Loader';
import SeparateBar from '../components/SeparateBar';

import {
  RED_COLOR,
  PRIMARY_COLOR,
  FONT_COLOR_FIFTH,
  BACKGROUND_COLOR_PRIMARY,
  FONT_SIZE_THIRD,
  FONT_COLOR_PRIMARY,
  FONT_SIZE_SECOND,
  FONT_COLOR_THIRD,
  FONT_COLOR_SECOND,
  FONT_SIZE_FIRST,
  BORDER_COLOR_FIRST,
  FONT_COLOR_FIRST,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  MODAL_TYPES,
  SCREENS,
  LINE_HEIGHT_RATIO,
  CREDIT_PAYWAY,
  INTERNET_BANK_PAYWAY,
  OFFLINE_PAYWAY,
  MONETARY,
  FIRST_PAYMENT_RATE,
  REPAYMENT_MONTH,
} from '../common/constants';

// import { getAddressSelectedItem } from '../common/selectors';

import {
  submitDuplicateFreeze,
  payWayToText,
  payWayArray,
} from '../common/helpers';
import priceFormat from '../common/helpers/priceFormat';

import * as orderPayActionCreators from '../common/actions/orderPay';
import * as returnMoneyActionCreators from '../common/actions/returnMoney';
import * as queryOrderActionCreators from '../common/actions/queryOrder';
import * as cardQueryActionCreators from '../common/actions/cardQuery';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  totalPrice: {
    height: 40,
    lineHeight: 40,
    textAlign: 'right',
    color: RED_COLOR,
    fontSize: 14,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  title: {
    height: 40,
    lineHeight: 40,
    paddingLeft: SIDEINTERVAL,
    color: '#333',
  },
  payment: {
    flexDirection: 'row',
    paddingLeft: SIDEINTERVAL,
    flexWrap: 'wrap',
  },
  paymentItem: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    borderColor: '#eee',
    borderWidth: 1,
  },
  paymentItemActive: {
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 0,
  },
  alertIcon: {
    color: RED_COLOR,
    // backgroundColor: RED_COLOR,
    fontSize: 16,
  },
  status: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL,
    backgroundColor: '#E0E3EF',
    color: '#666',
    lineHeight: 24,
  },
});

class OrderWrite extends Component {
  constructor(props) {
    super(props);

    const { i18n } = this.props;

    this.state = {
      submitfreeze: false,
      payWayButtons: payWayArray(i18n),
      payWayIndex: CREDIT_PAYWAY,
      firstPaymentRateArray: [],
      firstPaymentRateIndex: 0,
      repaymentMonthArray: REPAYMENT_MONTH,
      repaymentMonthIndex: 0,
      paypassword: '',
      isUseFirstPay: false, // 是否可选择首付
      firstPayType: 'A', // 首付类型。A: 可以额度大于等于支付金额(可选择首付); B: 可以额度小于支付金额，并且2倍的额度大于等于支付金额(可以选择首付); C: 2倍的额度小于支付金额(不可选择首付)
      // isEnoughUseCredit: true, // 额度是否达到分期要求（暂时不启用）
    };
    this.actionSheetCallback = this.actionSheetCallback.bind(this);
    this.enterPasswordCallback = this.enterPasswordCallback.bind(this);
  }

  componentDidMount() {
    const {
      isAuthUser,
      i18n,
      orderNo,
      tradeNo,
      queryOrderFetch,
      cardQueryFetch,
      cardQueryClear,
      queryOrderClear,
      // navigation,
      navigation: { navigate, pop },
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);

    this.screenListener = DeviceEventEmitter.addListener(SCREENS.Pay, () => {
      cardQueryClear();
      cardQueryFetch();
      queryOrderClear();
      queryOrderFetch({
        orderNo,
        tradeNo,
      });
      Alert.alert('', i18n.successfulCopy, [
        // { text: i18n.cancel },
        {
          text: i18n.confirm,
          onPress: () => {
            pop(1);
            // navigation.dispatch(
            //   NavigationActions.reset({
            //     index: 1,
            //     actions: [
            //       NavigationActions.navigate({ routeName: SCREENS.Index }),
            //       NavigationActions.navigate({
            //         routeName: SCREENS.Pay,
            //         params: {
            //           orderNo,
            //           tradeNo,
            //         },
            //       }),
            //     ],
            //   }),
            // );
          },
        },
      ]);
    });
    cardQueryFetch();

    queryOrderFetch({
      orderNo,
      tradeNo,
    });

    // setTimeout(() => {
    // navigate(SCREENS.TransactionPasswordStepOne);
    // this.handleOnPressToggleBottomSheet();
    // }, 300);
    return true;
  }

  componentWillUnmount() {
    this.screenListener.remove();
  }

  componentWillReceiveProps(nextProps) {
    // const { isUseFirstPay } = this.state;
    const {
      queryOrderLoaded: prevQueryOrderLoaded,
      cardQueryLoaded: prevCardQueryLoaded,
      orderPayLoading: prevOrderPayLoading,
    } = this.props;
    const {
      queryOrderLoaded,
      cardQueryLoaded,
      queryOrderItem,
      cardQueryItem,
      orderPayLoading,
      closeModal,
      openModal,
    } = nextProps;

    if (prevOrderPayLoading !== orderPayLoading) {
      if (orderPayLoading === false) {
        closeModal();
      } else {
        openModal(MODAL_TYPES.LOADER);
      }
    }

    if (
      prevQueryOrderLoaded !== queryOrderLoaded &&
      queryOrderLoaded === true &&
      cardQueryLoaded === true
    ) {
      this.initArrayForFirstPaymentRate(queryOrderItem, cardQueryItem, () => {
        const { isUseFirstPay: isUseFirstPay1 } = this.state;
        if (isUseFirstPay1)
          this.initFirstPaymentRateIndex(queryOrderItem, cardQueryItem);
      });
    }

    if (
      prevCardQueryLoaded !== cardQueryLoaded &&
      cardQueryLoaded === true &&
      queryOrderLoaded === true
    ) {
      this.initArrayForFirstPaymentRate(queryOrderItem, cardQueryItem, () => {
        const { isUseFirstPay: isUseFirstPay1 } = this.state;
        if (isUseFirstPay1)
          this.initFirstPaymentRateIndex(queryOrderItem, cardQueryItem);
      });
    }
  }

  initArrayForFirstPaymentRate(queryOrderItem, cardQueryItem, callback) {
    const { repaymentMonthArray } = this.state;
    const { returnMoneyFetch, returnMoneyClear } = this.props;
    const { advance } = queryOrderItem;
    const { availableBalance } = cardQueryItem;
    const firstPaymentRateArray = FIRST_PAYMENT_RATE;

    // 判断是否可以选择首付
    const setIsUseFirstPay = callback1 => {
      let isUseFirstPay = false;
      let firstPayType = 'A';

      returnMoneyClear();
      if (availableBalance >= advance) {
        // 可以额度大于等于支付金额
        // 可选择首付
        isUseFirstPay = true;
        firstPayType = 'A';
        returnMoneyFetch(
          advance.toString(),
          repaymentMonthArray.join(','),
          firstPaymentRateArray.join(','),
        );
      } else if (
        availableBalance < advance &&
        availableBalance * 2 >= advance
      ) {
        // 可以额度小于支付金额，并且2倍的额度大于等于支付金额
        // 可以选择首付
        isUseFirstPay = true;
        firstPayType = 'B';
        returnMoneyFetch(
          advance.toString(),
          repaymentMonthArray.join(','),
          firstPaymentRateArray.join(','),
        );
      } else {
        // 2倍的额度小于支付金额
        // 不可选择首付
        isUseFirstPay = false;
        firstPayType = 'C';
        returnMoneyFetch(
          availableBalance.toString(),
          repaymentMonthArray.join(','),
          firstPaymentRateArray.join(','),
        );
      }
      this.setState(
        {
          isUseFirstPay,
          firstPayType,
        },
        callback1,
      );
    };

    setIsUseFirstPay(() => {
      this.setState(
        {
          firstPaymentRateArray: firstPaymentRateArray.map(val => ({
            key: val,
            value: advance * val,
          })),
        },
        callback,
      );
    });
  }

  initFirstPaymentRateIndex(queryOrderItem, cardQueryItem) {
    const {
      firstPaymentRateArray,
      // firstPaymentRateIndex,
      // repaymentMonthArray,
      // repaymentMonthIndex,
    } = this.state;
    const { advance } = queryOrderItem;
    const { status, availableBalance } = cardQueryItem;

    const notEnough = () => {
      const result = [];
      // 如果支付金额，大于可用额度 + 最大首付金额；则不能使用分期
      if (
        advance >
        availableBalance +
          firstPaymentRateArray[firstPaymentRateArray.length - 1].value
      ) {
        console.log('不能使用分期');
        // 不能使用分期(暂时不启用)
        // this.setState({
        //   isEnoughUseCredit: false,
        // });
      } else {
        // 首付 + 分期
        console.log('首付 + 分期');
        firstPaymentRateArray.forEach(val => {
          if (availableBalance + val.value >= advance) {
            result.push(val);
          }
        });
        this.setState(
          {
            firstPaymentRateArray: result,
          },
          () => {
            // const {
            //   firstPaymentRateArray: newFirstPaymentRateArray,
            // } = this.state;
            // returnMoneyFetch(
            //   advance.toString(),
            //   repaymentMonthArray.join(','),
            //   newFirstPaymentRateArray.map(val => val.key).join(','),
            // );
          },
        );
      }
    };

    if (status === 3) {
      // 已激活信用卡
      if (availableBalance >= advance) {
        // 卡额度充足
        console.log('卡额度充足');
      } else {
        // 卡额度充不足
        console.log('卡额度充不足');
        notEnough();
      }
    }
  }

  initPayWayIndex(callback) {
    const {
      cardQueryItem: { status },
    } = this.props;
    this.setState(
      {
        payWayIndex: status === 3 ? CREDIT_PAYWAY : INTERNET_BANK_PAYWAY,
      },
      callback,
    );
  }

  actionSheetFirstPaymentRateCallback(buttonIndex) {
    // const { payWayButtons } = this.state;
    const { closeModal } = this.props;
    closeModal();
    if (buttonIndex === -1) return false;
    return this.setState({
      firstPaymentRateIndex: buttonIndex,
    });
  }

  actionSheetCallback(ret) {
    const { payWayButtons } = this.state;
    if (ret.buttonIndex === -1) return false;
    return this.setState({
      payWayIndex: payWayButtons[ret.buttonIndex].key,
    });
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

  handleOnPressToggleModal(key, val) {
    const {
      key: [key1],
      // [key],
    } = this.state;
    this.setState({
      [key]: typeof val !== 'boolean' ? !key1 : val,
    });
  }

  handleOnPressSubmit() {
    const {
      submitfreeze,
      payWayIndex,
      paypassword,
      payWayButtons,
      isUseFirstPay,
      firstPaymentRateArray: rateArray,
      firstPaymentRateIndex: rateIndex,
      repaymentMonthIndex: monthIndex,
      repaymentMonthArray: monthArray,
    } = this.state;
    const {
      i18n,
      isAuthUser,
      orderPayFetch,
      navigation: { navigate },
      queryOrderItem: { advance, orderNo, tradeNo },
      cardQueryItem: { status, initPassword, availableBalance },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    // 组合支付
    const mixedPaymentCallback = ret => {
      let payway = INTERNET_BANK_PAYWAY;
      let payvalue = advance;
      if (isUseFirstPay === true) {
        // 在2倍范围内，可以选择首付比例
        payvalue = rateArray[rateIndex].value;
      } else {
        payvalue = advance - availableBalance;
      }
      if (ret.buttonIndex === 0) {
        // 网银付首付
        payway = INTERNET_BANK_PAYWAY;
      } else {
        // 线下付首付
        payway = OFFLINE_PAYWAY;
      }
      submitDuplicateFreeze(submitfreeze, this, () =>
        orderPayFetch({
          orderno: orderNo,
          tradeno: tradeNo,
          payway,
          paypassword,
          payrate: parseInt((payvalue / advance) * 100, 10),
          repaymentmonth: monthArray[monthIndex],
          payvalue,
          screen: SCREENS.Pay,
        }),
      );
      this.setState({ paypassword: '' });
    };

    const creditCard = () => {
      const alreadyPaypassword = () => {
        const { openModal } = this.props;
        if (paypassword.length === 0) {
          openModal(MODAL_TYPES.ENTERPASSWORD, {
            callback: ret => this.enterPasswordCallback(ret),
            navigate,
          });
          return false;
        }
        // const calcPayrate = () => {
        //   const payvalue = 0; // 首付
        //   let payrate = 100; // 首付比例
        //   if (advance > availableBalance) {
        //     // 额度不足
        //     // payvalue = advance - availableBalance;
        //     payrate = parseInt(payvalue / advance, 10);
        //   }
        //   return payrate;
        // };

        // 是否使用了首付
        if (rateArray[rateIndex].value > 0 || advance > availableBalance) {
          // 组合支付（使用了首付）
          openModal(MODAL_TYPES.ACTIONSHEET, {
            title: i18n.downPaymentMethod,
            callback: ret => mixedPaymentCallback(ret),
            data: payWayButtons
              .filter(val => val.key !== CREDIT_PAYWAY)
              .map(val => val.value),
          });
        } else {
          // 直接支付（没有使用首付）
          submitDuplicateFreeze(submitfreeze, this, () =>
            orderPayFetch({
              orderno: orderNo,
              tradeno: tradeNo,
              payway: payWayIndex,
              paypassword,
              payrate: 0,
              repaymentmonth: monthArray[monthIndex],
              payvalue: advance,
              screen: SCREENS.Pay,
            }),
          );
          this.setState({ paypassword: '' });
        }
        return true;
      };

      if (status === 3 && initPassword === 0) {
        Alert.alert('', i18n.funCardApplicationSuccessfulPleaseActivate, [
          { text: i18n.cancel },
          {
            text: i18n.activation,
            onPress: () => navigate(SCREENS.TransactionPasswordStepOne),
          },
        ]);
        return false;
      }

      if (status !== 3) {
        Alert.alert('', `${i18n.didYouOpenYourCreditCardNow}?`, [
          {
            text: i18n.cancel,
          },
          {
            text: i18n.join,
            onPress: () => navigate(SCREENS.Card),
          },
        ]);
        return false;
      }

      return alreadyPaypassword();
    };

    switch (payWayIndex) {
      case CREDIT_PAYWAY:
        creditCard();
        break;

      case INTERNET_BANK_PAYWAY: // 网银
      case OFFLINE_PAYWAY: // 线下支付
        submitDuplicateFreeze(submitfreeze, this, () =>
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            payway: payWayIndex,
            paypassword: '',
            payrate: 0,
            repaymentmonth: 0,
            payvalue: advance,
            screen: SCREENS.Pay,
          }),
        );
        break;

      default:
        break;
    }
    return true;
  }

  makeFirstPaymentText() {
    const {
      isUseFirstPay,
      firstPaymentRateArray: rateArray,
      firstPaymentRateIndex: rateIndex,
    } = this.state;
    const { i18n } = this.props;
    let result = '';
    if (isUseFirstPay === false) return result;
    if (rateArray[rateIndex]) {
      result =
        rateArray[rateIndex].value === 0
          ? i18n.useDownPayment
          : `${i18n.firstPayment} ${rateArray[rateIndex].value} ${MONETARY}`;
    } else {
      result = i18n.useDownPayment;
    }
    return result;
  }

  makePayButtonText() {
    const {
      payWayIndex,
      firstPaymentRateArray: rateArray,
      firstPaymentRateIndex: rateIndex,
    } = this.state;
    const {
      i18n,
      queryOrderItem: { advance },
      cardQueryItem: { availableBalance },
    } = this.props;
    let result = '';

    switch (payWayIndex) {
      case CREDIT_PAYWAY:
        // if (advance > availableBalance) {
        if (
          (rateArray.length > 0 && rateArray[rateIndex].value > 0) ||
          advance > availableBalance
        ) {
          // 组合支付
          result = `组合支付 ${priceFormat(advance)} ${MONETARY}`;
        } else {
          // 全部金额用信用卡支付
          result = `func card 支付 ${priceFormat(advance)} ${MONETARY}`;
        }
        break;

      case INTERNET_BANK_PAYWAY:
        result = `网银支付 ${priceFormat(advance)} ${MONETARY}`;
        break;

      case OFFLINE_PAYWAY:
        result = `${i18n.paymentCollectingShop} ${priceFormat(
          advance,
        )} ${MONETARY}`;
        break;

      default:
        break;
    }
    return result;
  }

  getPerMonthPrice2() {
    const {
      repaymentMonthIndex: monthIndex,
      repaymentMonthArray: monthArray,
      firstPaymentRateArray: rateArray,
      firstPaymentRateIndex: rateIndex,
      firstPayType,
    } = this.state;
    const {
      queryOrderItem: { advance = 0 },
      cardQueryItem: { availableBalance },
      returnMoneyItems,
    } = this.props;

    const price = firstPayType === 'C' ? availableBalance : advance;
    const month = monthArray[monthIndex];
    const rate = rateArray[rateIndex]
      ? rateArray[rateIndex].key || '0.0'
      : '0.0';

    let result = 0;
    if (returnMoneyItems[`${price}_${month}_${rate}`]) {
      result =
        returnMoneyItems[`${price}_${month}_${rate}`][0].principal +
        returnMoneyItems[`${price}_${month}_${rate}`][0].interest;
    }
    return result;
  }

  getPerMonthPriceArray() {
    const {
      repaymentMonthIndex: monthIndex,
      repaymentMonthArray: monthArray,
      firstPaymentRateArray: rateArray,
      firstPaymentRateIndex: rateIndex,
      firstPayType,
    } = this.state;
    const {
      queryOrderItem: { advance = 0 },
      cardQueryItem: { availableBalance },
      returnMoneyItems,
    } = this.props;

    const price = firstPayType === 'C' ? availableBalance : advance;
    const rate = rateArray[rateIndex]
      ? rateArray[rateIndex].key || '0.0'
      : '0.0';
    const month = monthArray[monthIndex];

    let result = [];
    if (returnMoneyItems[`${price}_${month}_${rate}`]) {
      result = returnMoneyItems[`${price}_${month}_${rate}`];
    }
    return result;
  }

  renderFirstPaymentRateItem = ({ item, index }) => {
    const { firstPaymentRateIndex } = this.state;
    const stylesX = StyleSheet.create({
      item: {
        paddingLeft: SIDEINTERVAL,
      },
      main: {
        paddingRight: SIDEINTERVAL,
        borderBottomColor: BORDER_COLOR_FIRST,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      buttonItem: {
        height: 45,
        lineHeight: 45,
      },
      firstPaymentRateActive: {
        color: FONT_COLOR_PRIMARY,
      },
    });
    return (
      <BYTouchable
        style={stylesX.item}
        onPress={() => this.actionSheetFirstPaymentRateCallback(index)}
      >
        <View style={stylesX.main}>
          <Text
            style={[
              stylesX.buttonItem,
              index === firstPaymentRateIndex && stylesX.firstPaymentRateActive,
            ]}
          >
            {item.key}
          </Text>
          <Text
            style={[
              stylesX.buttonItem,
              index === firstPaymentRateIndex && stylesX.firstPaymentRateActive,
            ]}
          >
            {item.value}
          </Text>
        </View>
      </BYTouchable>
    );
  };

  renderBottom() {
    const stylesX = StyleSheet.create({
      container: {},
      text: {
        // minHeight: 55,
        // lineHeight: 55,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: SIDEINTERVAL * 0.5,
        paddingRight: SIDEINTERVAL * 0.5,
        flexWrap: 'wrap',
        textAlign: 'center',
        backgroundColor: BACKGROUND_COLOR_PRIMARY,
        color: FONT_COLOR_FIFTH,
        fontSize: FONT_SIZE_THIRD,
      },
    });

    return (
      <View style={stylesX.container}>
        <Text style={stylesX.text} onPress={() => this.handleOnPressSubmit()}>
          {this.makePayButtonText()}
        </Text>
      </View>
    );
  }

  renderRepaymentMonth() {
    const stylesX = StyleSheet.create({
      repaymentMonth: {
        paddingLeft: SIDEINTERVAL,
      },
      repaymentMonthMain: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomColor: BORDER_COLOR_FIRST,
        borderBottomWidth: 1,
      },
      repaymentMonthItem: {
        width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
        marginRight: SIDEINTERVAL,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: BORDER_COLOR_FIRST,
      },
      repaymentMonthItemActive: {
        backgroundColor: BACKGROUND_COLOR_PRIMARY,
        borderColor: BACKGROUND_COLOR_PRIMARY,
      },
      repaymentMonthItemTop: {
        color: FONT_COLOR_FIRST,
        fontSize: FONT_SIZE_SECOND,
        lineHeight: FONT_SIZE_SECOND * LINE_HEIGHT_RATIO,
        textAlign: 'center',
        paddingTop: 5,
      },
      repaymentMonthItemTopActive: {
        color: FONT_COLOR_FIFTH,
      },
      repaymentMonthItemBottom: {
        color: FONT_COLOR_THIRD,
        fontSize: FONT_SIZE_FIRST,
        lineHeight: FONT_COLOR_THIRD * LINE_HEIGHT_RATIO,
        textAlign: 'center',
        marginBottom: 10,
      },
      repaymentMonthItemBottomActive: {
        color: FONT_COLOR_FIFTH,
        opacity: 0.5,
      },
    });

    const {
      repaymentMonthIndex,
      repaymentMonthArray,
      firstPaymentRateArray: rateArray,
      firstPaymentRateIndex: rateIndex,
      firstPayType,
    } = this.state;
    const {
      i18n,
      queryOrderItem: { advance = 0 },
      cardQueryItem: { availableBalance },
    } = this.props;

    const price = firstPayType === 'C' ? availableBalance : advance;
    const rate = rateArray[rateIndex]
      ? rateArray[rateIndex].key || '0.0'
      : '0.0';
    const getPerMonthPrice = month => {
      const { returnMoneyItems } = this.props;
      let result = 0;
      if (returnMoneyItems[`${price}_${month}_${rate}`]) {
        result =
          returnMoneyItems[`${price}_${month}_${rate}`][0].principal +
          returnMoneyItems[`${price}_${month}_${rate}`][0].interest;
      }
      return result;
    };

    return (
      <View style={stylesX.repaymentMonth}>
        <View style={stylesX.repaymentMonthMain}>
          {repaymentMonthArray.map((val, key) => (
            <BYTouchable
              style={[
                stylesX.repaymentMonthItem,
                repaymentMonthIndex === key && stylesX.repaymentMonthItemActive,
              ]}
              key={val}
              onPress={() =>
                this.setState({
                  repaymentMonthIndex: key,
                })
              }
            >
              <Text
                style={[
                  stylesX.repaymentMonthItemTop,
                  repaymentMonthIndex === key &&
                    stylesX.repaymentMonthItemTopActive,
                ]}
              >
                {`${val} ${i18n.period}`}
              </Text>
              <Text
                style={[
                  stylesX.repaymentMonthItemBottom,
                  repaymentMonthIndex === key &&
                    stylesX.repaymentMonthItemBottomActive,
                ]}
              >
                {`${getPerMonthPrice(
                  val,
                )} ${MONETARY}/${i18n.month.toLowerCase()}`}
              </Text>
            </BYTouchable>
          ))}
        </View>
      </View>
    );
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
      },
      funCard: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 8,
        paddingBottom: 8,
      },
      funCardTop: {
        fontSize: FONT_SIZE_SECOND,
        lineHeight: FONT_SIZE_SECOND * LINE_HEIGHT_RATIO,
        color: FONT_COLOR_SECOND,
      },
      funCardBottom: {
        fontSize: FONT_SIZE_FIRST,
        lineHeight: FONT_SIZE_SECOND * LINE_HEIGHT_RATIO,
        color: FONT_COLOR_THIRD,
      },
      alert: {
        color: FONT_COLOR_THIRD,
        fontSize: 20,
      },
    });

    const {
      payWayIndex,
      payWayButtons,
      firstPaymentRateArray,
      isUseFirstPay,
      firstPayType,
    } = this.state;
    const {
      // navigation: { navigate },
      i18n,
      openModal,
      queryOrderItem: { advance },
      cardQueryItem: { status: cardStatus, availableBalance },
      queryOrderLoaded,
      cardQueryLoaded,
    } = this.props;

    if (queryOrderLoaded === false || cardQueryLoaded === false)
      return <Loader />;

    return (
      <View style={stylesX.container}>
        <ScrollView>
          <NavBar2
            valueLeft={i18n.totalMoney}
            valueMiddle={`${priceFormat(advance)} ${MONETARY}`}
            isShowRight={false}
          />
          <SeparateBar />
          {cardStatus === 3 && (
            <View style={stylesX.funCard}>
              <Text style={stylesX.funCardTop}>{i18n.funCard}</Text>
              <Text style={stylesX.funCardBottom}>
                {`${i18n.availableQuota}: ${priceFormat(
                  availableBalance,
                )} ${MONETARY}`}
              </Text>
            </View>
          )}
          <SeparateBar />
          <NavBar2
            onPress={() =>
              openModal(MODAL_TYPES.ACTIONSHEET, {
                callback: ret => this.actionSheetCallback(ret),
                data: payWayButtons.map(val => val.value),
              })
            }
            valueLeft={i18n.paymentMethod}
            valueMiddle={payWayToText(payWayIndex, i18n)}
            isShowBorderBottom
          />
          {payWayIndex === CREDIT_PAYWAY && (
            <View style={{ flex: 1 }}>
              {isUseFirstPay === true && (
                <NavBar2
                  onPress={() =>
                    isUseFirstPay &&
                    openModal(MODAL_TYPES.ACTIONSHEET, {
                      data: firstPaymentRateArray.map(val => ({
                        key:
                          val.value === 0
                            ? i18n.fullPayment
                            : `${val.key * 100}%`,
                        value: `${val.value} ${MONETARY}`,
                      })),
                      title: i18n.firstPayment,
                      renderItem: this.renderFirstPaymentRateItem,
                      keyExtractor: 'key',
                    })
                  }
                  valueLeft={i18n.installment}
                  valueMiddle={this.makeFirstPaymentText()}
                  styleMiddle={{ color: FONT_COLOR_PRIMARY }}
                  isShowRight={false}
                />
              )}
              <NavBar2
                valueLeft={i18n.installment}
                valueMiddle={`${i18n.firstPayment} ${priceFormat(
                  advance - availableBalance,
                )} ${MONETARY}`}
                isShowMiddle={firstPayType === 'C'}
                isShowRight={false}
              />
              {this.renderRepaymentMonth()}
              <NavBar2
                onPress={() =>
                  openModal(MODAL_TYPES.PERMONTHPRICE, {
                    data: this.getPerMonthPriceArray(),
                  })
                }
                valueLeft={i18n.monthlyPayment}
                valueMiddle={`${priceFormat(
                  this.getPerMonthPrice2(),
                )} ${MONETARY}`}
                componentRight={
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    style={stylesX.alert}
                  />
                }
              />
              {/* {cardStatus === 3 &&
                advance > availableBalance &&
                isUseFirstPay === false && (
                  <NavBar2
                    valueLeft={i18n.firstPayment}
                    valueMiddle={`${priceFormat(
                      advance - availableBalance,
                    )} ${MONETARY}`}
                    isShowRight={false}
                  />
                )} */}
            </View>
          )}
        </ScrollView>
        {this.renderBottom()}
      </View>
    );
  }

  render() {
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
    () => (state, props) => {
      const {
        // address,
        login,
        queryOrder,
        cardQuery,
        returnMoney,
        orderPay,
      } = state;

      const {
        navigation: {
          state: {
            params: {
              orderNo,
              tradeNo,
              // tradeNo,
            },
          },
        },
      } = props;

      return {
        isAuthUser: !!login.user,
        orderNo,
        tradeNo,
        returnMoneyItems: returnMoney.items,
        queryOrderItem: queryOrder.item,
        cardQueryItem: cardQuery.item,
        queryOrderLoaded: queryOrder.loaded,
        cardQueryLoaded: cardQuery.loaded,
        orderPayLoading: orderPay.loading,
      };
    },
    {
      ...orderPayActionCreators,
      ...returnMoneyActionCreators,
      ...queryOrderActionCreators,
      ...cardQueryActionCreators,
      ...modalActionCreators,
    },
  )(OrderWrite),
);
