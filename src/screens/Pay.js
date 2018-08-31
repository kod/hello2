import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  DeviceEventEmitter,
  Clipboard,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';

import ProductItem2 from '../components/ProductItem2';
import NavBar2 from '../components/NavBar2';
import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import Address from '../components/Address';
import Loader from '../components/Loader';
import SeparateBar from '../components/SeparateBar';

import { BORDER_COLOR, RED_COLOR, PRIMARY_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  MODAL_TYPES,
  SCREENS,
} from '../common/constants';

import { getAddressSelectedItem } from '../common/selectors';

import { tradeStatusCodes, submitDuplicateFreeze } from '../common/helpers';
import priceFormat from '../common/helpers/priceFormat';

import * as addressActionCreators from '../common/actions/address';
import * as authActionCreators from '../common/actions/auth';
import * as queryOrderActionCreators from '../common/actions/queryOrder';
import * as orderPayActionCreators from '../common/actions/orderPay';
import * as getUserInfoByIdActionCreators from '../common/actions/getUserInfoById';
import * as cardSubmitActionCreators from '../common/actions/cardSubmit';
import * as cardQueryActionCreators from '../common/actions/cardQuery';
import * as orderCancelActionCreators from '../common/actions/orderCancel';
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
      payWayButtons: [i18n.funCard, i18n.internetBanking],
      payWayIndex: 0,
      paypassword: '',
    };
    this.actionSheetCallback = this.actionSheetCallback.bind(this);
    this.enterPasswordCallback = this.enterPasswordCallback.bind(this);
  }

  componentDidMount() {
    const {
      // isAuthUser,
      i18n,
      addressFetch,
      orderNo,
      tradeNo,
      queryOrderFetch,
      cardQueryFetch,
      getUserInfoByIdFetch,
      navigation,
      // navigation: { pop },
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);

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

    addressFetch();
    getUserInfoByIdFetch();
    cardQueryFetch();

    queryOrderFetch({
      orderNo,
      tradeNo,
    });

    // setTimeout(() => {
    // navigate(SCREENS.TransactionPasswordStepOne);
    // this.handleOnPressToggleBottomSheet();
    // }, 300);
  }

  componentWillUnmount() {
    this.screenListener.remove();
  }

  componentWillReceiveProps(nextProps) {
    const {
      loading: prevLoading,
      queryOrderItem: prevQueryOrderItem,
    } = this.props;
    const { loading, openModal, closeModal, queryOrderItem } = nextProps;

    if (
      prevQueryOrderItem.payWay !== queryOrderItem.payWay &&
      queryOrderItem.payWay !== 0
    ) {
      this.setState({
        payWayIndex: queryOrderItem.payWay - 1,
      });
    }

    if (prevLoading !== loading) {
      if (loading === false) {
        closeModal();
      } else {
        openModal(MODAL_TYPES.LOADER);
      }
    }
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

    const payway = payWayIndex === 0 ? 1 : 2;

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

  handleOnPressCancel() {
    const {
      i18n,
      orderCancelFetch,
      orderNo,
      tradeNo,
      // tradeNo,
    } = this.props;

    Alert.alert('', `${i18n.confirm}?`, [
      {
        text: i18n.cancel,
        onPress: () => {},
      },
      {
        text: i18n.confirm,
        onPress: () => {
          orderCancelFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            status: '40000',
          });
        },
      },
    ]);
  }

  async handleOnPressCopy(val) {
    const { i18n, isAuthUser } = this.props;

    if (isAuthUser) {
      Clipboard.setString(val);
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

  renderBottom() {
    const stylesX = StyleSheet.create({
      nav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
      },
      navLeft: {
        flex: 1,
      },
      navLeftTop: {
        color: RED_COLOR,
        fontSize: 11,
        textAlign: 'center',
        paddingTop: 10,
      },
      navLeftBottom: {
        color: RED_COLOR,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
      },
      navCancel: {
        flex: 1,
        height: 55,
        lineHeight: 55,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#ccc',
      },
      navRight: {
        flex: 1,
        height: 55,
        lineHeight: 55,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
    });

    // const handleOnPressSubmit = () => {
    //   const {
    //     payWayIndex,
    //   } = this.state;
    //   const {
    //     orderNo,
    //     tradeNo,
    //   } = this.props;
    //   this.goPay();
    // }

    const {
      i18n,
      queryOrderItem: {
        tradeStatus,
        advance = 0,
        // advance,
      },
    } = this.props;

    return (
      <View style={stylesX.nav}>
        <View style={stylesX.navLeft}>
          <Text style={stylesX.navLeftTop}>{i18n.subtotal}</Text>
          <Text style={stylesX.navLeftBottom}>{priceFormat(advance)} ₫</Text>
        </View>
        {tradeStatus === '10000' && (
          <Text
            style={stylesX.navCancel}
            onPress={() => this.handleOnPressCancel()}
          >
            {i18n.cancelOrder}
          </Text>
        )}
        {tradeStatus === '10000' && (
          <Text
            style={stylesX.navRight}
            onPress={() => this.handleOnPressSubmit()}
          >
            {i18n.payment}
          </Text>
        )}
      </View>
    );
  }

  renderContent() {
    const { payWayButtons, payWayIndex } = this.state;

    const {
      // navigation: { navigate },
      i18n,
      openModal,
      // addressItems,
      getUserInfoById,
      cardQuery,
      queryOrderItem: {
        advance,
        goodsDetail,
        address,
        couponValue,
        username,
        msisdn,
        division1stName,
        division2ndName,
        division3rdName,
        division4thName,
        tradeStatus,
        sourceOrderType,
        rechargeCard,
      },
    } = this.props;

    const addressSelectedItem = {
      id: 1,
      address,
      username,
      msisdn,
      division1stName,
      division2ndName,
      division3rdName,
      division4thName,
    };

    if (getUserInfoById.loading || cardQuery.loading) return <Loader />;

    const stylesX = StyleSheet.create({
      card: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: 15,
      },
      cardMain: {
        backgroundColor: '#f5f6f7',
      },
      cardItem: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 10,
        paddingBottom: 5,
      },
      cardItemText: {
        fontSize: 12,
      },
      cardItemValue: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      cardItemNumber: {
        flex: 1,
        height: 25,
        lineHeight: 25,
        color: '#333',
        fontWeight: '700',
      },
      cardItemCopy: {
        height: 25,
        minWidth: WINDOW_WIDTH * 0.1,
        paddingLeft: WINDOW_WIDTH * 0.03,
        paddingRight: WINDOW_WIDTH * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#0076F7',
        marginRight: 1,
      },
      cardItemCopyText: {
        color: '#0076F7',
        fontSize: 11,
      },
      cardItemTime: {
        color: '#aaa',
        fontSize: 12,
        marginBottom: 10,
      },
    });

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.status}>
            {tradeStatusCodes(tradeStatus, i18n)}
          </Text>
          {sourceOrderType !== 3 && (
            <Address
              addressSelectedItem={addressSelectedItem}
              // onPress={() => navigate(SCREENS.Address, { isSelect: true })}
            />
          )}
          <SeparateBar />
          <ProductItem2
            data={goodsDetail}
            stylePricePrice={{ color: '#666' }}
            isShowNumber
            isPress={sourceOrderType !== 3}
          />
          <Text style={styles.totalPrice}>
            {priceFormat(advance + couponValue)} ₫
          </Text>
          <SeparateBar />
          <NavBar2
            onPress={() =>
              tradeStatus === '10000' &&
              openModal(MODAL_TYPES.ACTIONSHEET, {
                callback: ret => this.actionSheetCallback(ret),
                buttons: payWayButtons,
              })
            }
            valueLeft={i18n.paymentMethod}
            valueMiddle={payWayButtons[payWayIndex]}
          />
          <NavBar2
            // onPress={() => this.handleOnPressToggleBottomSheet()}
            valueLeft={i18n.couponValue}
            valueMiddle={couponValue}
            isShowRight={false}
          />
          <View style={{ height: 5 }} />
          <View style={stylesX.card}>
            <View style={stylesX.cardMain}>
              {rechargeCard &&
                rechargeCard.map(val => (
                  <View style={stylesX.cardItem} key={val.cardCode}>
                    <Text style={stylesX.cardItemText}>{i18n.cardNum}</Text>
                    <View style={stylesX.cardItemValue}>
                      <Text style={stylesX.cardItemNumber}>{val.cardCode}</Text>
                      <View style={stylesX.cardItemCopy}>
                        <Text
                          style={stylesX.cardItemCopyText}
                          onPress={() => this.handleOnPressCopy(val.cardCode)}
                        >
                          {i18n.copy}
                        </Text>
                      </View>
                    </View>
                    <Text style={stylesX.cardItemText}>{i18n.password}</Text>
                    <View style={stylesX.cardItemValue}>
                      <Text style={stylesX.cardItemNumber}>
                        {val.cardPassword}
                      </Text>
                      <View style={stylesX.cardItemCopy}>
                        <Text
                          style={stylesX.cardItemCopyText}
                          onPress={() =>
                            this.handleOnPressCopy(val.cardPassword)
                          }
                        >
                          {i18n.copy}
                        </Text>
                      </View>
                    </View>
                    <Text style={stylesX.cardItemTime}>
                      {`${i18n.usefulDate}: ${moment().format('DD-MM-YYYY')}`}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
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
    () => {
      console.log();
      return (state, props) => {
        const {
          address,
          queryOrder,
          getUserInfoById,
          cardQuery,
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
          loading: orderPay.loading,
          addressSelectedItem: getAddressSelectedItem(state, props),
          addressItems: address.items,
          isAuthUser: !!state.login.user,
          queryOrderItem: queryOrder.item,
          orderNo,
          tradeNo,
          cardQuery,
          getUserInfoById,
          initPassword: getUserInfoById.item.initPassword || null,
          userType: getUserInfoById.item.userType || null,
        };
      };
    },
    {
      ...addressActionCreators,
      ...authActionCreators,
      ...queryOrderActionCreators,
      ...orderPayActionCreators,
      ...getUserInfoByIdActionCreators,
      ...cardSubmitActionCreators,
      ...cardQueryActionCreators,
      ...orderCancelActionCreators,
      ...modalActionCreators,
    },
  )(OrderWrite),
);
