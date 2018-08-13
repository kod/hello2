import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  // Alert,
} from 'react-native';
import { connect } from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';

import ProductItem2 from '../components/ProductItem2';
import NavBar2 from '../components/NavBar2';
import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
// import BYTouchable from '../components/BYTouchable';
// import BYModal from '../components/BYModal';
import ActionSheet from '../components/ActionSheet';
import EnterPassword from '../components/EnterPassword';
import Address from '../components/Address';
import Loader from '../components/Loader';
import SeparateBar from '../components/SeparateBar';

import { BORDER_COLOR, RED_COLOR, PRIMARY_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  // WINDOW_HEIGHT,
  SIDEINTERVAL,
  // APPBAR_HEIGHT,
  // STATUSBAR_HEIGHT,
  SCREENS,
} from '../common/constants';

import { getAddressSelectedItem } from '../common/selectors';

import * as addressActionCreators from '../common/actions/address';
import * as authActionCreators from '../common/actions/auth';
import * as queryOrderActionCreators from '../common/actions/queryOrder';
import * as orderPayActionCreators from '../common/actions/orderPay';
import * as getUserInfoByIdActionCreators from '../common/actions/getUserInfoById';
import * as cardSubmitActionCreators from '../common/actions/cardSubmit';
import * as cardQueryActionCreators from '../common/actions/cardQuery';
import * as orderCancelActionCreators from '../common/actions/orderCancel';

import { tradeStatusCodes } from '../common/helpers';
import priceFormat from '../common/helpers/priceFormat';

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
    this.state = {
      isOpenActionSheet: false,
      // isOpenBottomSheet: false,
      isOpenEnterPassword: false,
      payWayButtons: ['Buyoo Card', 'Internet Banking'],
      payWayIndex: 0,
      paypassword: '',
    };
    this.actionSheetCallback = this.actionSheetCallback.bind(this);
    this.enterPasswordCallback = this.enterPasswordCallback.bind(this);
  }

  componentDidMount() {
    const {
      // isAuthUser,
      addressFetch,
      orderNo,
      tradeNo,
      queryOrderFetch,
      cardQueryFetch,
      getUserInfoByIdFetch,
      // navigation: { navigate },
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);

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
      if (cardQuery.item.availableBalance) {
        paywayNow = cardQuery.item.availableBalance < advance ? 5 : 1;
      }

      const alreadyPaypassword = () => {
        if (paypassword.length === 0)
          return this.handleOnPressToggleModal('isOpenEnterPassword');

        if (paywayNow === 5) {
          Alert.alert('', '当前可用额度不够, 其余金额将通过网银支付', [
            { text: i18n.cancel },
            {
              text: i18n.confirm,
              onPress: () => {
                orderPayFetch({
                  orderno: orderNo,
                  tradeno: tradeNo,
                  payway: paywayNow,
                  paypassword,
                  payvalue: advance - cardQuery.item.availableBalance,
                });
              },
            },
          ]);
        } else {
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            payway: paywayNow,
            paypassword,
          });
        }
        return false;
      };
      // const paywayNow = cardQuery.item.availableBalance
      if (userType === 3) {
        // 已开通信用卡
        if (initPassword !== 1) {
          // 未设置支付密码
          Alert.alert('', '您尚未设置交易密码?', [
            { text: i18n.cancel },
            {
              text: '去设置',
              onPress: () => navigate(SCREENS.TransactionPasswordStepOne),
            },
          ]);
        } else {
          alreadyPaypassword();
        }
      } else {
        Alert.alert('', '您尚未开通信用卡是否现在去开通?', [
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
      orderCancelFetch,
      orderNo,
      tradeNo,
      // tradeNo,
    } = this.props;

    Alert.alert('', 'Xác nhận？', [
      {
        text: 'Hủy',
        onPress: () => {},
      },
      {
        text: 'Xác nhận',
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
      queryOrderItem: {
        tradeStatus,
        advance,
        // advance,
      },
    } = this.props;

    return (
      <View style={stylesX.nav}>
        <View style={stylesX.navLeft}>
          <Text style={stylesX.navLeftTop}>Trà lần đầu</Text>
          <Text style={stylesX.navLeftBottom}>{priceFormat(advance)} ₫</Text>
        </View>
        {tradeStatus === '10000' && (
          <Text
            style={stylesX.navCancel}
            onPress={() => this.handleOnPressCancel()}
          >
            Cancel Order
          </Text>
        )}
        {tradeStatus === '10000' && (
          <Text
            style={stylesX.navRight}
            onPress={() => this.handleOnPressSubmit()}
          >
            Pay
          </Text>
        )}
      </View>
    );
  }

  // renderBottomSheet() {
  //   const styles = StyleSheet.create({
  //     container: {
  //       backgroundColor: '#fff',
  //     },
  //     closeWrap: {
  //       alignItems: 'flex-end',
  //       justifyContent: 'center',
  //       paddingRight: WINDOW_WIDTH * 0.02,
  //     },
  //     close: {
  //       paddingTop: SIDEINTERVAL,
  //       fontSize: 24,
  //       color: '#666',
  //     },
  //     scrollview: {
  //       height: WINDOW_HEIGHT * 0.5,
  //     },
  //     title: {
  //       flexDirection: 'row',
  //       borderBottomColor: BORDER_COLOR,
  //       borderBottomWidth: 1,
  //     },
  //     titleItem: {
  //       color: '#333',
  //       width: WINDOW_WIDTH / 3,
  //       height: 45,
  //       lineHeight: 45,
  //       textAlign: 'center',
  //     },
  //     item: {
  //       flexDirection: 'row',
  //       borderBottomColor: BORDER_COLOR,
  //       borderBottomWidth: 1,
  //     },
  //     itemText: {
  //       color: '#666',
  //       width: WINDOW_WIDTH / 3,
  //       height: 45,
  //       lineHeight: 45,
  //       textAlign: 'center',
  //     },
  //   });

  //   return (
  //     <View style={styles.container}>
  //       <BYTouchable style={styles.closeWrap} onPress={() => this.handleOnPressToggleBottomSheet()}>
  //         <EvilIcons style={styles.close} name="close" />
  //       </BYTouchable>
  //       <View style={styles.title}>
  //         <Text style={styles.titleItem}>periods</Text>
  //         <Text style={styles.titleItem}>supply</Text>
  //         <Text style={styles.titleItem}>principalprincipal</Text>
  //       </View>
  //       <ScrollView style={styles.scrollview}>
  //         <View style={styles.item}>
  //           <Text style={styles.itemText}>1st periods</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //         </View>
  //         <View style={styles.item}>
  //           <Text style={styles.itemText}>1st periods</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //         </View>
  //         <View style={styles.item}>
  //           <Text style={styles.itemText}>1st periods</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //         </View>
  //         <View style={styles.item}>
  //           <Text style={styles.itemText}>1st periods</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //         </View>
  //         <View style={styles.item}>
  //           <Text style={styles.itemText}>1st periods</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //         </View>
  //         <View style={styles.item}>
  //           <Text style={styles.itemText}>1st periods</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //         </View>
  //         <View style={styles.item}>
  //           <Text style={styles.itemText}>1st periods</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //         </View>
  //         <View style={styles.item}>
  //           <Text style={styles.itemText}>1st periods</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //         </View>
  //         <View style={styles.item}>
  //           <Text style={styles.itemText}>1st periods</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //           <Text style={styles.itemText}>4349.230.43</Text>
  //         </View>
  //       </ScrollView>
  //     </View>
  //   )
  // }

  renderContent() {
    const {
      // isOpenActionSheet,
      // isOpenBottomSheet,
      // isOpenEnterPassword,
      payWayButtons,
      payWayIndex,
    } = this.state;

    const {
      // navigation: { navigate },
      // i18n,
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

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.status}>{tradeStatusCodes(tradeStatus)}</Text>
          <Address
            addressSelectedItem={addressSelectedItem}
            // onPress={() => navigate(SCREENS.Address, { isSelect: true })}
          />
          <SeparateBar />
          <ProductItem2
            data={goodsDetail}
            stylePricePrice={{ color: '#666' }}
            isShowNumber
          />
          <Text style={styles.totalPrice}>
            {priceFormat(advance + couponValue)} ₫
          </Text>
          <SeparateBar />
          <NavBar2
            onPress={() =>
              tradeStatus === '10000' &&
              this.handleOnPressToggleModal('isOpenActionSheet')
            }
            valueLeft="Order amount"
            valueMiddle={payWayButtons[payWayIndex]}
          />
          <NavBar2
            // onPress={() => this.handleOnPressToggleBottomSheet()}
            valueLeft="Coupon value"
            valueMiddle={couponValue}
            isShowRight={false}
          />
        </ScrollView>
        {this.renderBottom()}
      </View>
    );
  }

  render() {
    const {
      isOpenActionSheet,
      // isOpenBottomSheet,
      isOpenEnterPassword,
      payWayButtons,
      // payWayIndex,
    } = this.state;

    // const {
    //   navigation: { navigate },
    //   i18n,
    //   addressItems,
    //   queryOrderItem: {
    //     goodsDetail,
    //     address,
    //     couponValue,
    //     username,
    //     msisdn,
    //     division1stName,
    //     division2ndName,
    //     division3rdName,
    //     division4thName,
    //     tradeStatus,
    //   },
    // } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        {this.renderContent()}
        {/* <BYModal
          visible={isOpenBottomSheet}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenBottomSheet')}
        >
          {this.renderBottomSheet()}
        </BYModal> */}
        <ActionSheet
          visible={isOpenActionSheet}
          onRequestClose={() =>
            this.handleOnPressToggleModal('isOpenActionSheet')
          }
          buttons={payWayButtons}
          callback={this.actionSheetCallback}
        />
        <EnterPassword
          visible={isOpenEnterPassword}
          onRequestClose={() =>
            this.handleOnPressToggleModal('isOpenEnterPassword')
          }
          callback={this.enterPasswordCallback}
        />
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
          // cardQuery,
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

        // const {
        //   orderNo,
        //   tradeNo,
        // } = props.navigation.state.params;

        return {
          addressSelectedItem: getAddressSelectedItem(state, props),
          addressItems: address.items,
          isAuthUser: !!state.auth.user,
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
    },
  )(OrderWrite),
);
