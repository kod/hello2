import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import priceFormat from '../common/helpers/priceFormat';
import { billInitDate } from '../common/helpers';
import { getBillMonthItem } from '../common/selectors';

import Loader from '../components/Loader';
import BYHeader from '../components/BYHeader';
import BYModal from '../components/BYModal';
import BYTouchable from '../components/BYTouchable';
import BYTextInput from '../components/BYTextInput';
import BYButton from '../components/BYButton';
import EmptyState from '../components/EmptyState';
import { connectLocalization } from '../components/Localization';

import { RED_COLOR, PRIMARY_COLOR, BORDER_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SCREENS,
  MODAL_TYPES,
  MINIMUM_PAYMENT_AMOUNT,
} from '../common/constants';

import * as searchMonthActionCreators from '../common/actions/searchMonth';
import * as billActionCreators from '../common/actions/bill';
import * as billByYearActionCreators from '../common/actions/billByYear';
import * as orderCreateActionCreators from '../common/actions/orderCreate';
import * as queryGoodsActionCreators from '../common/actions/queryGoods';
import * as modalActionCreators from '../common/actions/modal';

const jafsdbufnlPng = require('../images/jafsdbufnl.png');
const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  alert: {
    position: 'absolute',
    top: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
    left: 0,
    right: 0,
    height: 30,
    lineHeight: 30,
    backgroundColor: RED_COLOR,
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
});

class Bill extends Component {
  constructor(props) {
    super(props);

    const { i18n } = this.props;

    this.state = {
      isOpenPay: false,
      isShowGoods: false,
      payWayButtons: [i18n.repaymentRecord],
      totalPrice: '0',
    };
    this.actionSheetCallback = this.actionSheetCallback.bind(this);
  }

  componentDidMount() {
    let { activeMonth } = this.props;
    const {
      queryGoodsFetch,
      billByYearFetch,
      activeYear,
      billMonthFetch,
      // isAuthUser,
      // navigation: { navigate },
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);

    // let nowTimeStr = moment().format('YYYY-MM-DD HH:mm:ss');
    if (activeMonth < 10) activeMonth = `0${activeMonth}`;
    const billInitDateResult = billInitDate();
    billMonthFetch(billInitDateResult.month);
    queryGoodsFetch({
      createtime: `${activeYear}-${activeMonth}-26 11:11:11`,
    });

    billByYearFetch({
      year: activeYear,
      init: true,
    });

    this.billPayResult_addListener = DeviceEventEmitter.addListener(
      SCREENS.Bill,
      () => {},
    );
  }

  componentWillReceiveProps(nextProps) {
    const {
      orderCreateLoading: prevOrderCreateLoading,
      activeYear: prevActiveYear,
      activeMonth: prevActiveMonth,
    } = this.props;
    let { activeMonth } = nextProps;
    const {
      activeYear,
      queryGoodsFetch,
      orderCreateLoading,
      openModal,
      closeModal,
    } = nextProps;

    if (prevActiveYear !== activeYear || prevActiveMonth !== activeMonth) {
      if (activeMonth < 10) activeMonth = `0${activeMonth}`;
      queryGoodsFetch({
        createtime: `${activeYear}-${activeMonth}-26 11:11:11`,
      });
    }

    if (orderCreateLoading !== prevOrderCreateLoading) {
      if (orderCreateLoading === true) {
        openModal(MODAL_TYPES.LOADER);
      } else {
        closeModal();
      }
    }
  }

  componentWillUnmount() {
    this.billPayResult_addListener.remove();
  }

  actionSheetCallback(ret) {
    const {
      navigation: { navigate },
    } = this.props;

    if (ret.buttonIndex === -1) return false;
    if (ret.buttonIndex === 0) navigate(SCREENS.RepaymentRecord);
    return true;
  }

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingRight: 40,
        flexDirection: 'row',
        // backgroundColor: '#f00',
        height: 40,
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
      arrow: {
        fontSize: 18,
        color: '#333',
        paddingTop: 2,
      },
    });

    const {
      i18n,
      openModal,
      activeMonth,
      // activeMonth,
    } = this.props;

    return (
      <BYTouchable
        style={stylesX.container}
        backgroundColor="transparent"
        onPress={() => openModal(MODAL_TYPES.BILLSELECT)}
      >
        <Text style={stylesX.title}>{`${i18n.month} ${activeMonth}`}</Text>
        <Ionicons style={stylesX.arrow} name="ios-arrow-down" />
      </BYTouchable>
    );
  };

  renderHeaderRight = () => {
    const stylesX = StyleSheet.create({
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        // backgroundColor: '#ff0',
      },
      arrow: {
        fontSize: 16,
        color: '#333',
        paddingTop: 2,
      },
    });

    const { payWayButtons } = this.state;
    const { openModal } = this.props;
    return (
      <BYTouchable
        style={stylesX.container}
        backgroundColor="transparent"
        onPress={() =>
          openModal(MODAL_TYPES.ACTIONSHEET, {
            callback: ret => this.actionSheetCallback(ret),
            buttons: payWayButtons,
          })
        }
      >
        <Entypo style={stylesX.arrow} name="dots-three-vertical" />
      </BYTouchable>
    );
  };

  handleOnPressToggleModal = (key, val) => {
    this.setState({
      [key]: typeof val !== 'boolean' ? !this.state[key] : val,
    });
  };

  handleOnPressPaySubmit() {
    const {
      i18n,
      price,
      totalPrice,
      orderCreateFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    if (totalPrice >= MINIMUM_PAYMENT_AMOUNT) {
      if (~~price < MINIMUM_PAYMENT_AMOUNT) {
        Alert.alert(
          '',
          i18n.minimumRepaymentAmount.replace(
            'MINIMUM_PAYMENT_AMOUNT',
            MINIMUM_PAYMENT_AMOUNT,
          ),
          [
            {
              text: i18n.confirm,
              onPress: () => {},
            },
          ],
          // { cancelable: false },
        );
        return false;
      }

      if (
        parseInt(totalPrice, 10) - parseInt(price, 10) !== 0 &&
        parseInt(totalPrice, 10) - parseInt(price, 10) < MINIMUM_PAYMENT_AMOUNT
      ) {
        Alert.alert(
          '',
          i18n.repaymentAmountEqualOrLess
            .replace('AAA', totalPrice)
            .replace('BBB', MINIMUM_PAYMENT_AMOUNT),
          [
            {
              text: i18n.confirm,
              onPress: () => {},
            },
          ],
          // { cancelable: false },
        );
        return false;
      }
    }

    this.handleOnPressToggleModal('isOpenPay');

    orderCreateFetch({
      // BYPayPassword: ret.val,
      BYtype: 'billPay',
      goodsdetail: JSON.stringify([
        {
          number: 0,
          cartitemid: 0,
          productid: 0,
          rechargeaccount: '',
          rechargecode: '',
          repaymentamount: price,
        },
      ]),
    });

    return true;
  }

  handleOnPressPay() {
    const {
      billMonthItem,
      searchMonthFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    if (billMonthItem.status === 10002) return false;

    searchMonthFetch({
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
    });

    this.handleOnPressToggleModal('isOpenPay');
    return true;
  }

  renderPay() {
    const stylesX = StyleSheet.create({
      container: {
        position: 'relative',
        backgroundColor: '#fff',
        zIndex: 66,
      },
      mask: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#fff',
        zIndex: 88,
      },
      close: {
        paddingTop: WINDOW_WIDTH * 0.03,
        paddingRight: WINDOW_WIDTH * 0.03,
        marginBottom: 30,
      },
      closeIcon: {
        color: '#ccc',
        fontSize: 24,
        textAlign: 'right',
      },
      title: {
        paddingLeft: SIDEINTERVAL,
        fontSize: 16,
        color: '#999',
        marginBottom: 15,
      },
      wrap: {
        paddingLeft: SIDEINTERVAL,
      },
      enterPrice: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        marginBottom: 15,
      },
      textInput: {
        position: 'relative',
        flex: 1,
        fontSize: 30,
        color: '#333',
        zIndex: 88,
      },
      enterPriceText: {
        position: 'absolute',
        top: 5,
        right: 0,
        zIndex: 66,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        color: PRIMARY_COLOR,
      },
      tips: {
        paddingLeft: SIDEINTERVAL,
        color: '#ccc',
        fontSize: 11,
        marginBottom: 150,
      },
    });

    // const {
    //   price,
    // } = this.state;

    const {
      i18n,
      price,
      totalPrice,
      billPriceFetch,
      searchMonthLoading,
      // searchMonthLoading,
    } = this.props;

    return (
      <View style={stylesX.container}>
        {searchMonthLoading && (
          <View style={stylesX.mask}>
            <Loader absolutePosition />
          </View>
        )}
        <View style={stylesX.close}>
          <EvilIcons
            style={stylesX.closeIcon}
            name="close"
            onPress={() => this.handleOnPressToggleModal('isOpenPay')}
          />
        </View>
        <Text style={stylesX.title}>{i18n.repayment}</Text>
        <View style={stylesX.wrap}>
          <View style={stylesX.enterPrice}>
            <BYTextInput
              style={stylesX.textInput}
              keyboardType="numeric"
              value={price}
              onChangeText={text => billPriceFetch(text)}
            />
            <Text style={stylesX.enterPriceText}>{i18n.changeAmount}</Text>
          </View>
        </View>
        <Text style={stylesX.tips}>
          {`${i18n.havenPaidAmount}: ${priceFormat(totalPrice)} ₫`}
        </Text>
        <BYButton
          text={i18n.payment}
          styleWrap={{ marginBottom: SIDEINTERVAL * 2 }}
          onPress={() => this.handleOnPressPaySubmit()}
        />
      </View>
    );
  }

  renderGoods() {
    const stylesX = StyleSheet.create({
      goods: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      item: {
        marginBottom: 20,
      },
      title: {
        fontSize: 14,
        color: '#ccc',
        lineHeight: 14 * 1.618,
        marginBottom: 5,
      },
      bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      price: {
        fontSize: 16,
        color: '#999',
      },
      date: {
        fontSize: 11,
        color: '#ccc',
      },
      arrow: {
        backgroundColor: '#f5f5f5',
        height: 40,
        lineHeight: 40,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
      },
    });

    const { queryGoodsItems } = this.props;
    return (
      <View style={stylesX.goods}>
        {queryGoodsItems.map((val, key) => (
          <View style={stylesX.item} key={key}>
            <Text style={stylesX.title}>{`${key + 1}. ${val.name}`}</Text>
            <View style={stylesX.bottom}>
              <Text style={stylesX.price}>
                {`${priceFormat(val.totalAmount)} ₫`}
              </Text>
              <Text style={stylesX.date}>
                {moment(val.createTime).format('DD-MM')}
              </Text>
            </View>
          </View>
        ))}
        <Ionicons
          style={stylesX.arrow}
          name="ios-arrow-up"
          onPress={() => this.setState({ isShowGoods: false })}
        />
      </View>
    );
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        paddingLeft: SIDEINTERVAL * 2,
        paddingRight: SIDEINTERVAL * 2,
        paddingTop: SIDEINTERVAL * 2,
        paddingBottom: SIDEINTERVAL * 2,
      },
      main: {
        flex: 1,
        backgroundColor: '#fff',
      },
      topOne: {
        paddingTop: 60,
      },
      price: {
        fontSize: 30,
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
      },
      detailWrap: {
        alignItems: 'center',
        marginBottom: 60,
      },
      detail: {
        fontSize: 11,
        color: PRIMARY_COLOR,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_COLOR,
      },
      button: {
        paddingLeft: SIDEINTERVAL * 2,
        paddingRight: SIDEINTERVAL * 2,
        marginBottom: 10,
      },
      tips: {
        fontSize: 11,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 60,
      },
      bottom: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      bottomText: {
        fontSize: 14,
        color: '#999',
        height: 50,
        lineHeight: 50,
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
        textAlign: 'center',
      },
      topTwo: {
        alignItems: 'center',
      },
      image: {
        width: 230,
        height: 230,
      },
      topTwoTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 25,
        paddingLeft: SIDEINTERVAL * 4,
        paddingRight: SIDEINTERVAL * 4,
        flexWrap: 'wrap',
        alignItems: 'center',
      },
      topTwoTextWrap: {
        flexDirection: 'row',
        marginBottom: 25,
      },
      topTwoTextOne: {
        fontSize: 11,
        color: '#ccc',
        marginRight: 5,
      },
      topTwoTextTwo: {
        color: PRIMARY_COLOR,
        fontSize: 11,
      },
    });

    const { isShowGoods } = this.state;

    const {
      i18n,
      billMonthItem,
      navigation: { navigate },
    } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          {billMonthItem.status !== 10002 && (
            <View style={stylesX.topOne}>
              <Text style={stylesX.price}>
                {`${priceFormat(billMonthItem.waitingAmount)} ₫`}
              </Text>
              <View style={stylesX.detailWrap}>
                <Text
                  style={stylesX.detail}
                  onPress={() =>
                    navigate(SCREENS.BillDetail, { id: billMonthItem.id })
                  }
                >
                  {i18n.seeDetails}
                </Text>
              </View>
              {billMonthItem.status !== 10002 &&
                billMonthItem.status !== 10000 && (
                  <BYButton
                    text={i18n.payment}
                    styleWrap={stylesX.button}
                    onPress={() => this.handleOnPressPay()}
                  />
                )}
              <Text style={stylesX.tips}>
                {i18n.theFinalRepaymentDate5thEachMonth}
              </Text>
            </View>
          )}
          {billMonthItem.status === 10002 && (
            <View style={stylesX.topTwo}>
              <Image style={stylesX.image} source={jafsdbufnlPng} />
              <Text style={stylesX.topTwoTitle}>
                {i18n.thisMonthBillPaidOff}
              </Text>
              <View style={stylesX.topTwoTextWrap}>
                <Text style={stylesX.topTwoTextOne}>
                  {`${i18n.hasAlso} ${priceFormat(
                    billMonthItem.waitingAmount,
                  )} ₫`}
                </Text>
                <Text
                  style={stylesX.topTwoTextTwo}
                  onPress={() =>
                    navigate(SCREENS.BillDetail, { id: billMonthItem.id })
                  }
                >
                  {i18n.seeDetails}
                </Text>
              </View>
            </View>
          )}
          <View style={stylesX.bottom}>
            <Text
              style={stylesX.bottomText}
              onPress={() => this.setState({ isShowGoods: !isShowGoods })}
            >
              {`${i18n.expensesRecord} >`}
            </Text>
          </View>
          {isShowGoods && this.renderGoods()}
        </View>
      </View>
    );
  }

  render() {
    const { isOpenPay } = this.state;
    const {
      isOverdue,
      openModal,
      // navigation: { navigate },
      i18n,
      billMonthItem,
      // billByYearLoading,
      billByYearLoaded,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={this.renderHeaderRight()}
        />

        {billByYearLoaded === false && <Loader />}

        {/* 当前月份是否存在账单 */}
        {billByYearLoaded === true &&
          (billMonthItem.month ? (
            <ScrollView>{this.renderContent()}</ScrollView>
          ) : (
            <EmptyState
              source={ouhrigdfnjsoeijehrJpg}
              text={i18n.noBill}
              styleText={{ marginBottom: 0 }}
            />
          ))}

        {/* 是否有逾期，有则提示还款 */}
        {isOverdue && (
          <Text
            style={styles.alert}
            onPress={() => openModal(MODAL_TYPES.BILLSELECT)}
          >
            {i18n.youBillsExpiredPleaseRepayPossible}
          </Text>
        )}
        <BYModal
          visible={isOpenPay}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenPay')}
        >
          {this.renderPay()}
        </BYModal>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => (state, props) => {
      const {
        bill,
        billByYear,
        queryGoods,
        searchMonth,
        orderCreate,
        // searchMonth,
      } = state;
      return {
        orderCreateLoading: orderCreate.loading,
        billMonthItem: getBillMonthItem(state, props),
        // billTotalMoney: getBillTotalMoney(state, props),
        searchMonthItem: searchMonth.item,
        searchMonthLoading: searchMonth.loading,
        price: bill.price,
        totalPrice: bill.totalPrice,
        activeYear: bill.activeYear,
        activeMonth: bill.activeMonth,
        isOverdue: billByYear.isOverdue,
        billByYearItems: billByYear.items,
        // billByYearLoading: billByYear.loading,
        billByYearLoaded: billByYear.loaded,
        queryGoodsItems: queryGoods.items,
        isAuthUser: !!state.login.user,
      };
    },
    {
      ...billActionCreators,
      ...billByYearActionCreators,
      ...orderCreateActionCreators,
      ...queryGoodsActionCreators,
      ...searchMonthActionCreators,
      ...modalActionCreators,
    },
  )(Bill),
);
