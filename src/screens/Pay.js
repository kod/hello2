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
import { NavigationActions } from 'react-navigation';
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

import * as queryOrderActionCreators from '../common/actions/queryOrder';
import * as cardQueryActionCreators from '../common/actions/cardQuery';
import * as modalActionCreators from '../common/actions/modal';

const ppp = 1000000;

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
      payWayIndex: CREDIT_PAYWAY,
      firstPaymentRateArray: [],
      firstPaymentRateIndex: 0,
      repaymentMonthArray: REPAYMENT_MONTH,
      repaymentMonthIndex: 0,
      payWayButtons: payWayArray(i18n),
      paypassword: '',
    };
    this.actionSheetCallback = this.actionSheetCallback.bind(this);
    this.enterPasswordCallback = this.enterPasswordCallback.bind(this);
  }

  componentDidMount() {
    const {
      isAuthUser,
      i18n,
      // addressFetch,
      orderNo,
      tradeNo,
      queryOrderFetch,
      cardQueryFetch,
      // getUserInfoByIdFetch,
      navigation,
      navigation: { navigate },
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);

    this.screenListener = DeviceEventEmitter.addListener(SCREENS.Pay, () => {
      cardQueryFetch();
      queryOrderFetch({
        orderNo,
        tradeNo,
      });
      Alert.alert('', i18n.successfulCopy, [
        // { text: i18n.cancel },
        {
          text: i18n.confirm,
          onPress: () => {
            navigation.dispatch(
              NavigationActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({ routeName: SCREENS.Index }),
                  NavigationActions.navigate({
                    routeName: SCREENS.Pay,
                    params: {
                      orderNo,
                      tradeNo,
                    },
                  }),
                ],
              }),
            );
          },
        },
      ]);
    });

    this.initArrayForFirstPaymentRate();

    // addressFetch();
    // getUserInfoByIdFetch();
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

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     loading: prevLoading,
  //     queryOrderItem: prevQueryOrderItem,
  //   } = this.props;
  //   const { loading, openModal, closeModal, queryOrderItem } = nextProps;

  //   if (
  //     prevQueryOrderItem.payWay !== queryOrderItem.payWay &&
  //     queryOrderItem.payWay !== 0
  //   ) {
  //     this.setState({
  //       payWayIndex: queryOrderItem.payWay,
  //     });
  //   }

  //   if (prevLoading !== loading) {
  //     if (loading === false) {
  //       closeModal();
  //     } else {
  //       openModal(MODAL_TYPES.LOADER);
  //     }
  //   }
  // }

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
    if (ret.buttonIndex === -1) return false;
    return this.setState({
      payWayIndex: ret.buttonIndex,
    });
  }

  async enterPasswordCallback(ret) {
    // const {
    //   orderNo,
    //   tradeNo,
    // } = this.props;

    await this.setState({
      paypassword: ret.val,
    });
    this.handleOnPressSubmit();
  }

  handleOnPressToggleModal = (key, val) => {
    const {
      key: [key1],
      // [key],
    } = this.state;
    this.setState({
      [key]: typeof val !== 'boolean' ? !key1 : val,
    });
  };

  handleOnPressSubmit = () => {
    const {
      submitfreeze,
      payWayIndex,
      paypassword,
      // paypassword,
    } = this.state;
    const {
      i18n,
      isAuthUser,
      initPassword,
      userType,
      orderNo,
      tradeNo,
      getUserInfoByIdFetch,
      // cardSubmitFetch,
      orderPayFetch,
      navigation: { navigate },
      cardQuery,
      queryOrderItem: {
        advance,
        // advance,
      },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);
    if (!userType) return getUserInfoByIdFetch();

    const payway = payWayIndex;

    const creditCard = () => {
      let paywayNow = 1;
      // 判断额度是否充足，来选择支付方式
      if (cardQuery.item.availableBalance) {
        paywayNow = cardQuery.item.availableBalance < advance ? 5 : 1;
      }

      const alreadyPaypassword = () => {
        // const { payWayButtons } = this.state;
        const { openModal } = this.props;
        if (paypassword.length === 0) {
          openModal(MODAL_TYPES.ENTERPASSWORD, {
            callback: ret => this.enterPasswordCallback(ret),
            navigate,
          });
          return true;
        }
        if (paywayNow === 5) {
          // 提示额度不足
          Alert.alert('', i18n.amountNotEnoughWillPaidOnlineBanking, [
            { text: i18n.cancel },
            {
              text: i18n.confirm,
              onPress: () => {
                submitDuplicateFreeze(submitfreeze, this, () =>
                  orderPayFetch({
                    orderno: orderNo,
                    tradeno: tradeNo,
                    payway: '2', // 如果额度不足，目前默认使用网银支付剩余的钱
                    paypassword,
                    payvalue: advance - cardQuery.item.availableBalance,
                    screen: SCREENS.Pay,
                  }),
                );
                this.setState({ paypassword: '' });
              },
            },
          ]);
        } else {
          submitDuplicateFreeze(submitfreeze, this, () =>
            orderPayFetch({
              orderno: orderNo,
              tradeno: tradeNo,
              payway: paywayNow,
              paypassword,
              screen: SCREENS.Pay,
            }),
          );
          this.setState({ paypassword: '' });
        }
        return false;
      };
      // const paywayNow = cardQuery.item.availableBalance
      if (userType === 3) {
        // 已开通信用卡
        if (initPassword !== 1) {
          // 未设置支付密码
          Alert.alert('', i18n.youHaveNotSetCardPasswordYet, [
            { text: i18n.cancel },
            {
              text: i18n.goToSet,
              onPress: () => navigate(SCREENS.TransactionPasswordStepOne),
            },
          ]);
        } else {
          alreadyPaypassword();
        }
      } else {
        Alert.alert('', `${i18n.didYouOpenYourCreditCardNow}?`, [
          {
            text: i18n.cancel,
          },
          {
            text: i18n.join,
            onPress: () => navigate(SCREENS.Card),
          },
        ]);
      }
    };

    const internetBank = () => {
      orderPayFetch({
        orderno: orderNo,
        tradeno: tradeNo,
        payway,
        screen: SCREENS.Pay,
      });
    };

    switch (payway) {
      case 1:
        creditCard();
        break;

      case 2:
        internetBank();
        break;

      // case 5:
      //   creditCard();
      //   break;

      default:
        break;
    }
    return true;
  };

  initArrayForFirstPaymentRate = () => {
    const firstPaymentRateArray = FIRST_PAYMENT_RATE;
    this.setState({
      firstPaymentRateArray: firstPaymentRateArray.map(val => ({
        key: val === 0 ? 1 : val,
        value: ppp * val,
      })),
    });
  };

  makeFirstPaymentText() {
    const {
      firstPaymentRateArray: rateArray,
      firstPaymentRateIndex: rateIndex,
    } = this.state;
    const { i18n } = this.props;
    let result = '';
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
        height: 55,
        lineHeight: 55,
        textAlign: 'center',
        backgroundColor: BACKGROUND_COLOR_PRIMARY,
        color: FONT_COLOR_FIFTH,
        fontSize: FONT_SIZE_THIRD,
      },
    });

    const { i18n } = this.props;

    return (
      <View style={stylesX.container}>
        <Text
          style={stylesX.text}
          onPress={() => this.handleOnPressSubmit()}
        >
          银行卡支付 3.000.000 ￥
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
    } = this.state;
    const { i18n } = this.props;

    const rate = rateArray[rateIndex] ? rateArray[rateIndex].key : 1;

    const price = ppp * rate;

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
                {`${val} kỳ`}
              </Text>
              <Text
                style={[
                  stylesX.repaymentMonthItemBottom,
                  repaymentMonthIndex === key &&
                    stylesX.repaymentMonthItemBottomActive,
                ]}
              >
                {`${parseInt(
                  price / val,
                  10,
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

    const { payWayIndex, payWayButtons, firstPaymentRateArray } = this.state;
    const {
      // navigation: { navigate },
      i18n,
      openModal,
      queryOrderItem: { advance },
      queryOrderLoaded,
    } = this.props;

    if (!queryOrderLoaded) return <Loader />;

    return (
      <View style={stylesX.container}>
        <ScrollView>
          <NavBar2
            valueLeft={i18n.totalMoney}
            valueMiddle={`${priceFormat(advance)} ${MONETARY}`}
            isShowRight={false}
          />
          <SeparateBar />
          <View style={stylesX.funCard}>
            <Text style={stylesX.funCardTop}>{i18n.funCard}</Text>
            <Text style={stylesX.funCardBottom}>
              {`${i18n.availableQuota}: 950.000.000 ${MONETARY}`}
            </Text>
          </View>
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
          <NavBar2
            onPress={() =>
              openModal(MODAL_TYPES.ACTIONSHEET, {
                data: firstPaymentRateArray.map(val => ({
                  key: val.value === 0 ? i18n.fullPayment : `${val.key * 100}%`,
                  value: `${val.value} ${MONETARY}`,
                })),
                title: i18n.firstPayment,
                renderItem: this.renderFirstPaymentRateItem,
                keyExtractor: 'key',
              })
            }
            valueLeft={i18n.installment}
            valueMiddle={this.makeFirstPaymentText()}
            // valueMiddle={`3.763.500 ${MONETARY}`}
            styleMiddle={{ color: FONT_COLOR_PRIMARY }}
            isShowRight={false}
          />
          {this.renderRepaymentMonth()}
          <NavBar2
            valueLeft={i18n.monthlyPayment}
            valueMiddle={`3.763.500 ${MONETARY}`}
            componentRight={
              <MaterialCommunityIcons
                name="alert-circle-outline"
                style={stylesX.alert}
              />
            }
          />
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
        queryOrderItem: queryOrder.item,
        queryOrderLoaded: queryOrder.loaded,
      };
    },
    {
      ...queryOrderActionCreators,
      ...cardQueryActionCreators,
      ...modalActionCreators,
    },
  )(OrderWrite),
);
