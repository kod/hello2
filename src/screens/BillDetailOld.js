import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import NavBar2 from '../components/NavBar2';
import ProductItem2 from '../components/ProductItem2';
import { billStatusCodes } from '../common/helpers';
import Loader from '../components/Loader';

import * as createNormalOrderActionCreators from '../common/actions/createNormalOrder';
import * as payNormalOrderActionCreators from '../common/actions/payNormalOrder';
import * as loginActionCreators from '../common/actions/login';
import * as queryOrderActionCreators from '../common/actions/queryOrder';
import * as inquiryBillActionCreators from '../common/actions/inquiryBill';
import * as modalActionCreators from '../common/actions/modal';
import priceFormat from '../common/helpers/priceFormat';
import { MONETARY, MODAL_TYPES } from '../common/constants';
import BYButton from '../components/BYButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class BillDetailOld extends Component {
  constructor(props) {
    super(props);
    const { i18n } = this.props;
    this.state = {
      payWayButtons: ['ATM/Visa/Master', i18n.balance],
      payWayIndex: 0,
      isFocus: true, // 页面是否显示在前端
    };

    this.actionSheetCallback = this.actionSheetCallback.bind(this);
  }

  componentDidMount() {
    const {
      orderNo,
      tradeNo,
      queryOrderFetch,
      inquiryBillFetch,
      navigation,
    } = this.props;
    this.didFocusSubscription = navigation.addListener('didFocus', () => {
      this.setState({
        isFocus: true,
      });
      queryOrderFetch({
        orderNo,
        tradeNo,
      });
      inquiryBillFetch({
        orderNo,
        tradeNo,
      });
    });
    this.willBlurSubscription = navigation.addListener('willBlur', () => {
      this.setState({
        isFocus: false,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isFocus, payWayIndex } = this.state;
    const {
      // loading: prevLoading,
      createNormalOrderLoaded: prevCreateNormalOrderLoaded,
    } = this.props;
    const {
      // loading,
      // openModal,
      // closeModal,
      createNormalOrderLoaded,
      createNormalOrderTradeNo,
      createNormalOrderOrderNo,
      payNormalOrderFetch,
      inquiryBillItem: { interest, principal },
      // navigate,
      periods,
    } = nextProps;

    if (
      prevCreateNormalOrderLoaded !== createNormalOrderLoaded &&
      createNormalOrderLoaded === true &&
      isFocus === true
    ) {
      // 创建订单完成
      if (createNormalOrderTradeNo !== '' && createNormalOrderOrderNo !== '') {
        // 创建订单成功

        console.log('创建订单成功');
        console.log(payWayIndex);

        if (payWayIndex === 0) {
          // 网银
          payNormalOrderFetch({
            orderNo: createNormalOrderOrderNo,
            tradeNo: createNormalOrderTradeNo,
            totalAmount: interest + principal,
            repaymentMonth: periods,
            payway: '2',
            paypassword: '',
          });
        } else {
          // 余额
          payNormalOrderFetch({
            orderNo: createNormalOrderOrderNo,
            tradeNo: createNormalOrderTradeNo,
            totalAmount: interest + principal,
            repaymentMonth: periods,
            payway: '1',
            paypassword: '123456',
          });
        }
      } else {
        // 创建订单失败
      }
    }
  }

  handleOnPressSelectPics() {
    const { payWayButtons } = this.state;
    const { openModal } = this.props;
    openModal(MODAL_TYPES.ACTIONSHEET, {
      callback: ret => this.actionSheetCallback(ret),
      data: payWayButtons,
    });
  }

  actionSheetCallback(ret) {
    // const {
    //   navigation: { navigate },
    // } = this.props;
    if (ret.buttonIndex === -1) return false;

    this.setState({
      payWayIndex: ret.buttonIndex,
    });
    return true;
  }

  handleSubmit() {
    const {
      createNormalOrderClear,
      createNormalOrderFetch,
      inquiryBillItem: { status, interest, principal },
      periodIndex,
      queryOrderItem: { orderNo, tradeNo, goodsDetail },
      periods,
    } = this.props;
    const isPay = status === '10002' || status === '20001';

    console.log(isPay);
    console.log(periodIndex);
    console.log(status);

    const isShow =
      (status === '10001' && periodIndex === 1 && !isPay) ||
      (status === '10007' && periodIndex === 5 && !isPay);

    if (!isShow) return false;

    console.log('handleSubmit');
    createNormalOrderClear();
    return createNormalOrderFetch({
      totalAmount: interest + principal,
      goodsDetail: JSON.stringify(goodsDetail),
      orderNo1: orderNo,
      tradeNo1: tradeNo,
      repaymentMonth: periods,
    });
  }

  renderContent() {
    const { payWayIndex, payWayButtons } = this.state;
    const {
      // navigation: { navigate },
      i18n,
      queryOrderLoaded,
      queryOrderLoading,
      createNormalOrderLoading,
      inquiryBillLoaded,
      inquiryBillLoading,
      inquiryBillItem: {
        periods,
        alreadyPay,
        expireDate,
        interest,
        principal,
        status,
      },
      periodIndex,
      queryOrderItem: { goodsDetail },
    } = this.props;

    const isPay = status === '10002' || status === '20001';

    console.log(isPay);
    console.log(periodIndex);
    console.log(status);

    const isShow =
      (status === '10001' && periodIndex === 1 && !isPay) ||
      (status === '10007' && periodIndex === 5 && !isPay);

    if (
      queryOrderLoaded === false ||
      inquiryBillLoaded === false ||
      queryOrderLoading ||
      inquiryBillLoading
    )
      return <Loader absolutePosition />;

    return (
      <ScrollView>
        {createNormalOrderLoading && <Loader absolutePosition modal />}
        <NavBar2
          isShowRight={false}
          valueLeft={i18n.orderStatus}
          valueMiddle={billStatusCodes(status, i18n)}
          isShowBorderBottom
        />
        <NavBar2
          isShowRight={false}
          valueLeft={i18n.repaymentPeriod}
          valueMiddle={periods}
          isShowBorderBottom
        />
        <NavBar2
          isShowRight={false}
          valueLeft={i18n.alreadyPaid}
          valueMiddle={`${priceFormat(alreadyPay)} ${MONETARY}`}
          isShowBorderBottom
        />
        <NavBar2
          isShowRight={false}
          valueLeft={i18n.overdueTime}
          valueMiddle={`${moment(expireDate).format('DD-MM-YYYY HH:mm:ss')}`}
          isShowBorderBottom
        />
        <ProductItem2
          data={goodsDetail}
          // stylePricePrice={{ color: '#666' }}
          // isShowNumber
        />
        <NavBar2
          isShowRight={false}
          valueLeft={i18n.repaymentAmount}
          valueMiddle={`${priceFormat(interest + principal)} ${MONETARY}`}
          isShowBorderBottom
        />
        {isShow && (
          <NavBar2
            // isShowRight={false}
            valueLeft={i18n.paymentMethod}
            valueMiddle={payWayButtons[payWayIndex]}
            isShowRight={false}
            isShowBorderBottom
            // onPress={() => this.handleOnPressSelectPics()}
          />
        )}
        {isShow && (
          <BYButton
            text={i18n.payment}
            style={{ marginTop: 15, marginBottom: 30 }}
            onPress={() => this.handleSubmit()}
          />
        )}
      </ScrollView>
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
    (state, props) => {
      const { login, queryOrder, inquiryBill, createNormalOrder } = state;

      const {
        navigation: {
          state: {
            params: { orderNo, tradeNo, periods, periodIndex },
          },
        },
      } = props;
      console.log('propspropspropspropsprops');
      console.log(props);
      console.log(inquiryBill.items);
      console.log(periods);
      console.log(inquiryBill.items[periods - 1]);

      return {
        inquiryBillItem: inquiryBill.items[periods - 1] || {},
        inquiryBillLoading: inquiryBill.loading,
        inquiryBillLoaded: inquiryBill.loaded,
        queryOrderItem: queryOrder.item,
        queryOrderLoading: queryOrder.loading,
        queryOrderLoaded: queryOrder.loaded,
        createNormalOrderLoading: createNormalOrder.loading,
        createNormalOrderLoaded: createNormalOrder.loaded,
        createNormalOrderTradeNo: createNormalOrder.tradeNo,
        createNormalOrderOrderNo: createNormalOrder.orderNo,
        orderNo,
        tradeNo,
        periods,
        periodIndex,
        isAuthUser: !!login.user,
      };
    },
    {
      ...createNormalOrderActionCreators,
      ...payNormalOrderActionCreators,
      ...queryOrderActionCreators,
      ...inquiryBillActionCreators,
      ...loginActionCreators,
      ...modalActionCreators,
    },
  )(BillDetailOld),
);
