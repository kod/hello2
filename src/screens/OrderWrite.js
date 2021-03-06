import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { SCREENS, SIDEINTERVAL, MONETARY } from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';
// import { createOrderno } from '../common/helpers';

import ProductItem2 from '../components/ProductItem2';
import NavBar2 from '../components/NavBar2';
import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
// import BYTouchable from '../components/BYTouchable';
import Address from '../components/Address';
import Loader from '../components/Loader';
import SeparateBar from '../components/SeparateBar';

import {
  RED_COLOR,
  PRIMARY_COLOR,
  BORDER_COLOR,
  // WINDOW_HEIGHT,
} from '../styles/variables';

import * as addressActionCreators from '../common/actions/address';
import * as authActionCreators from '../common/actions/auth';
import * as getUserInfoByIdActionCreators from '../common/actions/getUserInfoById';
import * as orderCreateActionCreators from '../common/actions/orderCreate';
import * as couponSelectActionCreators from '../common/actions/couponSelect';
import * as modalActionCreators from '../common/actions/modal';

import { getAddressSelectedItem } from '../common/selectors';
// import { addressJoin } from '../common/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
});

class OrderWrite extends Component {
  // constructor(props) {
  //   super(props);

  //   const { i18n } = this.props;
  //   this.state = {
  //     payWayButtons: [
  //       {
  //         key: i18n.onlinePay,
  //         value: 1, // 在线支付默认为信用卡
  //       },
  //       {
  //         key: i18n.paymentCollectingShop,
  //         value: 5,
  //       },
  //     ],
  //     payWayIndex: 0,
  //   };
  //   this.actionSheetCallback = this.actionSheetCallback.bind(this);
  // }

  componentDidMount() {
    const {
      // isAuthUser,
      addressFetch,
      getUserInfoByIdFetch,
      // navigation: { navigate },
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);

    addressFetch();
    getUserInfoByIdFetch();

    this.orderWriteCallBack = DeviceEventEmitter.addListener(
      SCREENS.OrderWrite,
      ({ type = '', params = {} }) => {
        let resetAction = null;
        const { navigation } = this.props;
        switch (type) {
          case 'orderCreateSuccess':
            resetAction = NavigationActions.reset({
              index: 2,
              actions: [
                NavigationActions.navigate({ routeName: SCREENS.Index }),
                NavigationActions.navigate({
                  routeName: SCREENS.OrderDetail,
                  params,
                }),
                NavigationActions.navigate({ routeName: SCREENS.Pay, params }),
              ],
            });

            navigation.dispatch(resetAction);
            break;

          default:
            break;
        }
      },
    );
  }

  componentWillUnmount() {
    const {
      couponSelectClear,
      // couponSelectClear,
    } = this.props;

    couponSelectClear();

    this.orderWriteCallBack.remove();
  }

  handleOnPressAddress() {
    const {
      isAuthUser,
      navigation: { navigate },
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);

    return navigate(SCREENS.Address, { isSelect: true });
  }

  handleOnPressCoupon() {
    const {
      isCart,
      cartProducts,
      isAuthUser,
      detailItem,
      navigation: { navigate },
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);

    let products; // 请求judgeVoucher接口所需参数

    if (isCart) {
      products = cartProducts;
    } else {
      products = [
        {
          id: detailItem.id,
          amount: detailItem.price * detailItem.productDetailNumber,
        },
      ];
    }

    return navigate(SCREENS.CouponSelect, {
      products: JSON.stringify(products),
    });
  }

  handleOnPressSubmit() {
    // const { payWayIndex, payWayButtons } = this.state;
    const {
      addressSelectedId,
      isAuthUser,
      detailItem,
      cartAdverstInfo,
      isCart,
      orderCreateFetch,
      navigation: { navigate },
      // userType,
      groupon,
      i18n,
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);

    const getGoodsdetail = () => {
      if (isCart) {
        return cartAdverstInfo.map(val => {
          // val.number = val.number
          val.rechargeaccount = '';
          val.rechargecode = '';
          val.repaymentamount = 0;
          return {
            number: val.number,
            cartitemid: val.cartitemid,
            productid: val.productid,
            rechargeaccount: '',
            rechargecode: '',
            repaymentamount: 0,
          };
        });
      }
      return [
        {
          number: detailItem.productDetailNumber,
          cartitemid: 0,
          productid: detailItem.id,
          rechargeaccount: '',
          rechargecode: '',
          repaymentamount: 0,
        },
      ];
    };

    const getSubject = () => {
      let result = '';
      if (isCart) {
        result = cartAdverstInfo.map(val => val.name).join('_');
      } else {
        result = detailItem.name;
      }
      return result;
    };

    const getCoupondetail = () => {
      const {
        couponSelectItem,
        // couponSelectItem,
      } = this.props;

      if (!couponSelectItem.id) return '';
      return JSON.stringify({
        couponcard: couponSelectItem.cardno,
        couponpassword: couponSelectItem.pincode,
        couponbrandid: couponSelectItem.brandId,
        coupontypeid: couponSelectItem.typeId,
        couponproductid: couponSelectItem.productId,
        coupontype: couponSelectItem.voucherType,
        couponvalue: couponSelectItem.voucherValue,
      });
    };

    const getObject = () => {
      let result;
      if (groupon) {
        result = {
          screen: SCREENS.OrderWrite,
          ordertype: isCart ? '3' : '2',
          addrid: addressSelectedId.toString(),
          goodsdetail: '',
          mergedetail: JSON.stringify({
            mergeorderid: '',
            mergemasterid: '',
            mergename: '',
            mergepersonnum: '',
            mergeheadimage: '',
            mergedesc: '',
            mergeusername: '',
          }),
          coupondetail: getCoupondetail(),
          subject: getSubject(isCart),
        };
      } else {
        result = {
          screen: SCREENS.OrderWrite,
          ordertype: isCart ? '3' : '2',
          addrid: addressSelectedId.toString(),
          goodsdetail: JSON.stringify(getGoodsdetail()),
          mergedetail: '',
          coupondetail: getCoupondetail(),
          subject: getSubject(isCart),
        };
      }
      return result;
    };

    if (addressSelectedId === 0) {
      Alert.alert(
        '',
        i18n.pleaseSelectourShippingAddress,
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

    return orderCreateFetch(getObject());
  }

  calcMoney() {
    const {
      isCart,
      cartAdverstInfo,
      detailItem: { price, productDetailNumber },
      couponSelectItem,
    } = this.props;
    let money = 0;

    if (isCart) {
      // money
      if (cartAdverstInfo.length === 1) {
        money = cartAdverstInfo[0].price * cartAdverstInfo[0].number;
      } else {
        money = cartAdverstInfo.reduce((a, b, index) => {
          let result;
          if (index === 1) {
            const aTotalMoney = a.price * a.number;
            const bTotalMoney = b.price * b.number;
            result = aTotalMoney + bTotalMoney;
          } else {
            const bTotalMoney = b.price * b.number;
            result = a + bTotalMoney;
          }
          return result;
        });
      }
    } else {
      money = productDetailNumber * price;
    }

    if (couponSelectItem.id) {
      if (couponSelectItem.voucherType === 0) {
        // 打折券
        money *= couponSelectItem.voucherValue * 0.01;
      } else {
        money -= couponSelectItem.voucherValue;
      }
    }

    return priceFormat(money);
  }

  // actionSheetCallback(ret) {
  //   if (ret.buttonIndex === -1) return false;
  //   return this.setState({
  //     payWayIndex: ret.buttonIndex,
  //   });
  // }

  renderBottom() {
    const stylesX = StyleSheet.create({
      nav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
      },
      navLeft: {
        flex: 2,
      },
      navLeftBottom: {
        color: RED_COLOR,
        fontSize: 18,
        paddingLeft: SIDEINTERVAL,
        fontWeight: '700',
        height: 50,
        lineHeight: 50,
      },
      navRight: {
        flex: 1,
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
    });

    const { i18n } = this.props;

    return (
      <View style={stylesX.nav}>
        <View style={stylesX.navLeft}>
          <Text style={stylesX.navLeftBottom}>
            {`${this.calcMoney()} ${MONETARY}`}
          </Text>
        </View>
        <Text
          style={stylesX.navRight}
          onPress={() => this.handleOnPressSubmit()}
        >
          {i18n.submitOrder}
        </Text>
      </View>
    );
  }

  renderContent() {
    // const { payWayButtons, payWayIndex } = this.state;
    const {
      // navigation: { navigate },
      i18n,
      isCart,
      cartAdverstInfo,
      addressSelectedItem,
      detailItem,
      getUserInfoById,
      orderCreate,
      couponSelectItem,
      // openModal,
      addressLoaded,
      getUserInfoByIdLoaded,
    } = this.props;
    const adverstInfo = isCart
      ? cartAdverstInfo
      : [
          {
            brandId: detailItem.brandId,
            propertiesIds: detailItem.propertiesIds,
            imageUrl:
              detailItem.imageUrls[0] && detailItem.imageUrls[0].imageUrl,
            name: detailItem.name,
            price: detailItem.price,
            number: detailItem.productDetailNumber,
            isOnPress: false,
          },
        ];

    if (addressLoaded === false || getUserInfoByIdLoaded === false)
      return <Loader />;

    return (
      <View style={styles.container}>
        {(getUserInfoById.loading || orderCreate.loading) && (
          <Loader absolutePosition />
        )}
        <ScrollView>
          <Address
            addressSelectedItem={addressSelectedItem}
            onPress={() => this.handleOnPressAddress()}
          />
          <SeparateBar />
          <ProductItem2
            data={adverstInfo}
            stylePricePrice={{ color: '#666' }}
            isShowNumber
          />
          <SeparateBar />
          {/* <NavBar2
            onPress={() =>
              openModal(MODAL_TYPES.ACTIONSHEET, {
                callback: ret => this.actionSheetCallback(ret),
                buttons: payWayButtons.map(val => val.key),
              })
            }
            valueLeft={i18n.paymentMethod}
            valueMiddle={payWayButtons[payWayIndex].key}
          /> */}
          <NavBar2
            onPress={() => this.handleOnPressCoupon()}
            valueLeft={i18n.coupon}
            valueMiddle={
              couponSelectItem.id
                ? couponSelectItem.voucherName
                : i18n.useVoucher
            }
          />
        </ScrollView>
        {this.renderBottom()}
      </View>
    );
  }

  render() {
    const { i18n } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader title={i18n.fillOrder} />
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
        getUserInfoById,
        mergeGetDetail,
        orderCreate,
        productDetailInfo,
        couponSelect,
      } = state;
      const {
        navigation: {
          state: {
            params: {
              groupon,
              mergeMasterInfo,
              isCart,
              products,
              adverstInfo,
              // adverstInfo,
            },
          },
        },
      } = props;
      // const groupon = props.navigation.state.params.groupon;
      // const mergeMasterInfo = props.navigation.state.params.mergeMasterInfo;
      const detailItem = groupon ? mergeGetDetail.item : productDetailInfo.item;
      // const isCart = props.navigation.state.params.isCart;
      // const cartProducts = props.navigation.state.params.products;
      // const cartAdverstInfo = props.navigation.state.params.adverstInfo;
      return {
        couponSelectItem: couponSelect.item,
        groupon,
        mergeMasterInfo,
        isCart,
        cartProducts: products,
        cartAdverstInfo: adverstInfo,
        detailItem,
        orderCreate,
        addressSelectedItem: getAddressSelectedItem(state, props),
        addressItems: address.items,
        addressLoaded: address.loaded,
        addressSelectedId: address.addressSelectedId,
        funid: state.login.user ? state.login.user.result : null,
        isAuthUser: !!state.login.user,
        getUserInfoById,
        getUserInfoByIdLoaded: getUserInfoById.loaded,
        userType: getUserInfoById.item.userType || null,
      };
    },
    {
      ...addressActionCreators,
      ...authActionCreators,
      ...getUserInfoByIdActionCreators,
      ...orderCreateActionCreators,
      ...couponSelectActionCreators,
      ...modalActionCreators,
    },
  )(OrderWrite),
);
