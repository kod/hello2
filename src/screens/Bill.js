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
import {
  billInitDate,
  payWayArray,
  submitDuplicateFreeze,
} from '../common/helpers';
import { getBillMonthItem } from '../common/selectors';

import Loader from '../components/Loader';
import BYHeader from '../components/BYHeader';
import BYModal from '../components/BYModal';
import BYTouchable from '../components/BYTouchable';
import BYTextInput from '../components/BYTextInput';
import BYButton from '../components/BYButton';
import EmptyState from '../components/EmptyState';
import NavBar2 from '../components/NavBar2';
import SeparateBar from '../components/SeparateBar';
import { connectLocalization } from '../components/Localization';

import {
  RED_COLOR,
  PRIMARY_COLOR,
  BORDER_COLOR,
  FONT_COLOR_FOURTH,
  FONT_SIZE_FIRST,
  FONT_COLOR_THIRD,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SCREENS,
  MODAL_TYPES,
  MINIMUM_PAYMENT_AMOUNT,
  MONETARY,
  INTERNET_BANK_PAYWAY,
  OFFLINE_PAYWAY,
  CREDIT_PAYWAY,
} from '../common/constants';

import * as searchMonthActionCreators from '../common/actions/searchMonth';
import * as billActionCreators from '../common/actions/bill';
import * as billByYearActionCreators from '../common/actions/billByYear';
import * as orderCreateActionCreators from '../common/actions/orderCreate';
import * as orderPayActionCreators from '../common/actions/orderPay';
import * as billDetailsActionCreators from '../common/actions/billDetails';
import * as modalActionCreators from '../common/actions/modal';

const jafsdbufnlPng = require('../images/jafsdbufnl.png');
const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
      operateButtons: [i18n.repaymentRecord],
      totalPrice: '0',
      payWayButtons: payWayArray(i18n),
      submitfreeze: false,
    };
    this.actionSheetCallback = this.actionSheetCallback.bind(this);
  }

  componentDidMount() {
    let { activeMonth } = this.props;
    const {
      // queryGoodsFetch,
      orderPayClear,
      billByYearFetch,
      activeYear,
      isAuthUser,
      navigation: { navigate },
      // price,
    } = this.props;
    if (!isAuthUser) {
      navigate(SCREENS.Login);
    } else {
      // let nowTimeStr = moment().format('YYYY-MM-DD HH:mm:ss');
      orderPayClear();
      if (activeMonth < 10) activeMonth = `0${activeMonth}`;
      billByYearFetch({
        year: activeYear,
        init: true,
      });
      this.billPayResult_addListener = DeviceEventEmitter.addListener(
        SCREENS.Bill,
        ret => {
          navigate(SCREENS.PaymentCode, {
            code: ret.ret,
            advance: ret.payvalue,
          });
        },
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      // orderCreateLoading: prevOrderCreateLoading,
      activeYear: prevActiveYear,
      activeMonth: prevActiveMonth,
      billByYearLoaded: prevBillByYearLoaded,
    } = this.props;
    const { billByYearLoaded, activeMonth } = nextProps;
    const {
      activeYear,
      // queryGoodsFetch,
      // orderCreateLoading,
      // openModal,
      // closeModal,
      billMonthItem,
      billDetailsFetch,
    } = nextProps;

    if (
      billByYearLoaded !== prevBillByYearLoaded &&
      billByYearLoaded === true
    ) {
      billDetailsFetch({
        summaryid: billMonthItem.id,
      });
    }

    if (prevActiveYear !== activeYear || prevActiveMonth !== activeMonth) {
      // if (activeMonth < 10) activeMonth = `0${activeMonth}`;
      if (billMonthItem.id) {
        billDetailsFetch({
          summaryid: billMonthItem.id,
        });
      }
      // queryGoodsFetch({
      //   createtime: `${activeYear}-${activeMonth}-26 11:11:11`,
      // });
    }

    // if (orderCreateLoading !== prevOrderCreateLoading) {
    //   if (orderCreateLoading === true) {
    //     openModal(MODAL_TYPES.LOADER);
    //   } else {
    //     closeModal();
    //   }
    // }
  }

  componentWillUnmount() {
    const {
      searchMonthClear,
      billByYearClear,
      billMonthFetch,
      billYearFetch,
    } = this.props;
    searchMonthClear();
    billByYearClear();
    // <<< 初始化年份和月份
    const billInitDateResult = billInitDate();
    billMonthFetch(billInitDateResult.month);
    billYearFetch(billInitDateResult.year);
    // 初始化年份和月份 >>>
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
      // i18n,
      openModal,
      activeMonth,
      activeYear,
      // activeMonth,
    } = this.props;

    return (
      <BYTouchable
        style={stylesX.container}
        backgroundColor="transparent"
        onPress={() => openModal(MODAL_TYPES.BILLSELECT)}
      >
        <Text style={stylesX.title}>{`${activeMonth}/${activeYear}`}</Text>
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

    const { operateButtons } = this.state;
    const { openModal } = this.props;
    return (
      <BYTouchable
        style={stylesX.container}
        backgroundColor="transparent"
        onPress={() =>
          openModal(MODAL_TYPES.ACTIONSHEET, {
            callback: ret => this.actionSheetCallback(ret),
            data: operateButtons,
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
    const { payWayButtons, submitfreeze } = this.state;
    const {
      i18n,
      price,
      totalPrice,
      orderCreateFetch,
      isAuthUser,
      navigation: { navigate },
      openModal,
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    const paymentCallback = ret => {
      let payway = INTERNET_BANK_PAYWAY;
      if (ret.buttonIndex === 0) {
        // 网银付首付
        payway = INTERNET_BANK_PAYWAY;
      } else {
        // 线下付首付
        payway = OFFLINE_PAYWAY;
      }
      submitDuplicateFreeze(submitfreeze, this, () =>
        orderCreateFetch({
          // BYPayPassword: ret.val,
          screen: SCREENS.Bill,
          BYpayway: payway,
          payvalue: price,
          goodsdetail: JSON.stringify([
            {
              number: 0,
              cartitemid: 0,
              productid: 0,
              rechargeaccount: '',
              rechargecode: '',
              repaymentamount: 0,
            },
          ]),
        }),
      );
    };

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

    openModal(MODAL_TYPES.ACTIONSHEET, {
      // title: i18n.downPaymentMethod,
      callback: ret => paymentCallback(ret),
      data: payWayButtons
        .filter(val => val.key !== CREDIT_PAYWAY)
        .map(val => val.value),
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
          {`${i18n.havenPaidAmount}: ${priceFormat(totalPrice)} ${MONETARY}`}
        </Text>
        <BYButton
          text={i18n.payment}
          styleWrap={{ marginBottom: SIDEINTERVAL }}
          onPress={() => this.handleOnPressPaySubmit()}
        />
      </View>
    );
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
      },
      main: {
        backgroundColor: '#fff',
        marginBottom: 15,
      },
      topOne: {
        paddingTop: 60,
      },
      topOneTips: {
        textAlign: 'center',
        fontSize: FONT_SIZE_FIRST,
        color: FONT_COLOR_THIRD,
        marginBottom: 5,
      },
      price: {
        fontSize: 30,
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
      },
      detailWrap: {
        alignItems: 'center',
        marginBottom: 30,
      },
      detail: {
        fontSize: 12,
        color: PRIMARY_COLOR,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      button: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: 20,
      },
      tips: {
        fontSize: 11,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 40,
      },
      bottom: {
        marginBottom: 0,
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
        paddingTop: 15,
      },
      image: {
        width: 230,
        height: 230,
      },
      topTwoTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
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
        fontSize: 12,
        color: '#ccc',
        marginRight: 5,
      },
      topTwoTextTwo: {
        color: PRIMARY_COLOR,
        fontSize: 12,
      },
      cool: {
        textAlign: 'center',
        color: FONT_COLOR_FOURTH,
        fontSize: FONT_SIZE_FIRST,
        marginBottom: 15,
      },
    });

    const {
      i18n,
      billMonthItem,
      billDetailsItem,
      navigation: { navigate },
      orderPayLoading,
      orderCreateLoading,
    } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          {(orderPayLoading || orderCreateLoading) && (
            <Loader absolutePosition />
          )}
          {billMonthItem.status !== 10002 && (
            <View style={stylesX.topOne}>
              <Text style={stylesX.topOneTips}>
                {`${i18n.remainingReturned}(${MONETARY})`}
              </Text>
              <Text style={stylesX.price}>
                {`${priceFormat(billMonthItem.waitingAmount)} ${MONETARY}`}
              </Text>
              <View style={stylesX.detailWrap}>
                <Text
                  style={stylesX.detail}
                  onPress={() =>
                    navigate(SCREENS.BillDetail, {
                      expireDate: billDetailsItem.expireDate,
                    })
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
                {/* <Text style={stylesX.topTwoTextOne}>
                  {`${i18n.hasAlso} ${priceFormat(
                    billMonthItem.waitingAmount,
                  )} ${MONETARY}`}
                </Text> */}
                <Text
                  style={stylesX.topTwoTextTwo}
                  onPress={() =>
                    navigate(SCREENS.BillDetail, {
                      expireDate: billDetailsItem.expireDate,
                    })
                  }
                >
                  {i18n.seeDetails}
                </Text>
              </View>
            </View>
          )}
          <SeparateBar />
          {!!billDetailsItem.expireDate && (
            <View style={stylesX.bottom}>
              <NavBar2
                valueLeft={i18n.billingAmount}
                valueMiddle={`${priceFormat(
                  billDetailsItem.principal + billDetailsItem.interest,
                )} ${MONETARY}`}
                isShowRight={false}
              />
              <NavBar2
                valueLeft={i18n.principal}
                valueMiddle={`${priceFormat(
                  billDetailsItem.principal,
                )} ${MONETARY}`}
                isShowRight={false}
              />
              <NavBar2
                valueLeft={i18n.interest}
                valueMiddle={`${priceFormat(
                  billDetailsItem.interest,
                )} ${MONETARY}`}
                isShowRight={false}
              />
              <NavBar2
                valueLeft={i18n.billingDate}
                valueMiddle={`${moment(billDetailsItem.billData).format(
                  'DD-MM-YYYY',
                )}`}
                isShowRight={false}
              />
              <NavBar2
                valueLeft={i18n.finalRepaymentDate}
                valueMiddle={`${moment(billDetailsItem.expireDate).format(
                  'DD-MM-YYYY',
                )}`}
                isShowRight={false}
              />
            </View>
          )}
        </View>
        <Text style={stylesX.cool}>Buyoo provides security</Text>
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
        orderPay,
        orderCreate,
        billDetails,
      } = state;
      return {
        orderCreateLoading: orderCreate.loading,
        orderPayLoading: orderPay.loading,
        billMonthItem: getBillMonthItem(state, props),
        searchMonthItem: searchMonth.item,
        searchMonthLoading: searchMonth.loading,
        price: bill.price,
        totalPrice: bill.totalPrice,
        activeYear: bill.activeYear,
        activeMonth: bill.activeMonth,
        isOverdue: billByYear.isOverdue,
        billByYearItems: billByYear.items,
        billByYearLoaded: billByYear.loaded,
        queryGoodsItems: queryGoods.items,
        isAuthUser: !!state.login.user,
        billDetailsItem: billDetails.item,
      };
    },
    {
      ...billActionCreators,
      ...billByYearActionCreators,
      ...orderCreateActionCreators,
      ...orderPayActionCreators,
      ...billDetailsActionCreators,
      ...searchMonthActionCreators,
      ...modalActionCreators,
    },
  )(Bill),
);
