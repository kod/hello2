import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  // DeviceEventEmitter,
  Clipboard,
} from 'react-native';
import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation';
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
  MONETARY,
} from '../common/constants';

import { getAddressSelectedItem } from '../common/selectors';

import {
  tradeStatusCodes,
  // submitDuplicateFreeze,
  payWayToText,
} from '../common/helpers';
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

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // submitfreeze: false,
      payWayIndex: 0,
      // paypassword: '',
    };
    // this.actionSheetCallback = this.actionSheetCallback.bind(this);
    // this.enterPasswordCallback = this.enterPasswordCallback.bind(this);
  }

  componentDidMount() {
    const {
      // i18n,
      addressFetch,
      orderNo,
      tradeNo,
      queryOrderFetch,
      queryOrderClear,
      cardQueryFetch,
      getUserInfoByIdFetch,
      // navigation,
    } = this.props;
    queryOrderClear();

    // 1分钟请求一次，刷新订单信息
    this.setIntervalId = setInterval(() => {
      queryOrderFetch({
        orderNo,
        tradeNo,
      });
    }, 60 * 1000);

    addressFetch();
    getUserInfoByIdFetch();
    cardQueryFetch();

    queryOrderFetch({
      orderNo,
      tradeNo,
    });
  }

  componentWillUnmount() {
    clearInterval(this.setIntervalId);
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
        payWayIndex: queryOrderItem.payWay,
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

  makeRemainTimeText(val) {
    const { i18n } = this.props;
    let result = '';
    const remainAllSeconds = (Date.parse(val) - Date.now()) / 1000; // 剩余的秒数
    if (remainAllSeconds > 0) {
      const remainDays = ~~(remainAllSeconds / (3600 * 24)); // 剩余天数
      const remainHours = ~~((remainAllSeconds % (3600 * 24)) / 3600); // 剩余小时数
      const remainMinutes = ~~(((remainAllSeconds % (3600 * 24)) % 3600) / 60); // 剩余分钟数
      if (remainDays > 0) {
        result = i18n.remainTime1
          .replace('$days$', remainDays)
          .replace('$hours$', remainHours)
          .replace('$minutes$', remainMinutes);
      } else if (remainHours > 0) {
        result = i18n.remainTime2
          .replace('$hours$', remainHours)
          .replace('$minutes$', remainMinutes);
      } else if (remainMinutes > 0) {
        result = i18n.remainTime3.replace('$minutes$', remainMinutes);
      } else {
        // 小于60秒
        result = i18n.remainTime3.replace('$minutes$', 1);
      }
    } else {
      // 已过期
    }
    return result;
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
        paddingTop: 5,
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

    const {
      i18n,
      queryOrderItem: {
        tradeStatus,
        payWay,
        totalAmount = 0,
        payRate,
        repaymentMonth,
      },
      tradeNo,
      orderNo,
      navigation: { navigate },
    } = this.props;

    return (
      <View style={stylesX.nav}>
        <View style={stylesX.navLeft}>
          <Text style={stylesX.navLeftTop}>{i18n.subtotal}</Text>
          <Text style={stylesX.navLeftBottom}>{`${priceFormat(
            totalAmount,
          )} ${MONETARY}`}</Text>
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
            onPress={() =>
              payWay === 5
                ? navigate(SCREENS.PaymentCode, {
                    orderNo,
                    tradeNo,
                    payway: payWay,
                    payrate: payRate,
                    repaymentmonth: repaymentMonth,
                    totalAmount,
                  })
                : navigate(SCREENS.Pay, {
                    tradeNo,
                    orderNo,
                  })
            }
          >
            {payWay === 5 ? i18n.viewPaymentCode : i18n.payment}
          </Text>
        )}
      </View>
    );
  }

  renderCard() {
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

    const {
      i18n,
      queryOrderItem: { rechargeCard },
    } = this.props;

    return (
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
                  <Text style={stylesX.cardItemNumber}>{val.cardPassword}</Text>
                  <View style={stylesX.cardItemCopy}>
                    <Text
                      style={stylesX.cardItemCopyText}
                      onPress={() => this.handleOnPressCopy(val.cardPassword)}
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
    );
  }

  renderContent() {
    const { payWayIndex } = this.state;

    const {
      // navigation: { navigate },
      i18n,
      // addressItems,
      getUserInfoById,
      cardQuery,
      queryOrderItem: {
        totalAmount,
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
        timeoutExpress,
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
      status: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
        backgroundColor: '#E0E3EF',
      },
      statusText: {
        color: '#333',
        marginBottom: 5,
      },
      statusTime: {
        color: '#666',
      },
    });

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={stylesX.status}>
            <Text style={stylesX.statusText}>
              {tradeStatusCodes(tradeStatus, i18n)}
            </Text>
            {parseInt(tradeStatus, 10) === 10000 && (
              <Text style={stylesX.statusTime}>
                {this.makeRemainTimeText(timeoutExpress)}
              </Text>
            )}
          </View>
          {sourceOrderType !== 3 && (
            <Address addressSelectedItem={addressSelectedItem} />
          )}
          <SeparateBar />
          <ProductItem2
            data={goodsDetail}
            stylePricePrice={{ color: '#666' }}
            isShowNumber
            isPress={sourceOrderType !== 3}
          />
          <Text style={styles.totalPrice}>
            {`${priceFormat(totalAmount + couponValue)} ${MONETARY}`}
          </Text>
          <SeparateBar />
          {tradeStatus !== '10000' && (
            <NavBar2
              isShowRight={false}
              valueLeft={i18n.paymentMethod}
              valueMiddle={payWayToText(payWayIndex, i18n)}
            />
          )}
          <NavBar2
            // onPress={() => this.handleOnPressToggleBottomSheet()}
            valueLeft={i18n.couponValue}
            valueMiddle={couponValue}
            isShowRight={false}
          />
          <View style={{ height: 5 }} />
          {this.renderCard()}
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
  )(OrderDetail),
);
