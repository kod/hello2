import React from 'react';
import { StyleSheet, Text, View, ScrollView, DeviceEventEmitter, ToastAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { SCREENS } from "../common/constants";
import priceFormat from '../common/helpers/priceFormat';
import { createOrderno } from '../common/helpers';

import ProductItem2 from "../components/ProductItem2";
import NavBar2 from "../components/NavBar2";
import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import BYTouchable from "../components/BYTouchable";
import Address from "../components/Address";
import Loader from "../components/Loader";

import { SIDEINTERVAL, RED_COLOR, PRIMARY_COLOR, BORDER_COLOR, WINDOW_HEIGHT } from "../styles/variables";

import * as addressActionCreators from '../common/actions/address';
import * as authActionCreators from '../common/actions/auth';
import * as getUserInfoByIdActionCreators from '../common/actions/getUserInfoById';
import * as orderCreateActionCreators from '../common/actions/orderCreate';
import * as couponSelectActionCreators from '../common/actions/couponSelect';

import { getAddressSelectedItem } from "../common/selectors";
import { addressJoin } from "../common/helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  bar: {
    backgroundColor: '#f5f5f5',
    height: 5,
  },
});

class OrderWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const {
      isAuthUser,
      addressFetch,
      getUserInfoByIdFetch,
      navigation: { navigate },
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);

    addressFetch();
    getUserInfoByIdFetch();

    this.orderWriteCallBack = DeviceEventEmitter.addListener(
      'orderWriteCallBack',
      ({ type = '', params = {} }) => {
        switch (type) {
          case 'orderCreateSuccess':
            const resetAction = NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: SCREENS.Index }),
                NavigationActions.navigate({ routeName: SCREENS.Pay, params })
              ]
            })

            this.props.navigation.dispatch(resetAction);
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

    navigate(SCREENS.Address, { isSelect: true })
  }

  handleOnPressCoupon() {
    const {
      isCart,
      isAuthUser,
      detailItem,
      navigation: { navigate },
    } = this.props;
    
    if (!isAuthUser) return navigate(SCREENS.Login);

    let products; // 请求judgeVoucher接口所需参数

    if (isCart) {

    } else {
      products = [{
        id: detailItem.id,
        // typeId: detailItem.typeId,
        // brandId: detailItem.brandId,
        // classfyId: detailItem.classfyId,
        amount: detailItem.price * detailItem.productDetailNumber,
      }]
    }

    navigate(SCREENS.CouponSelect, { products: JSON.stringify(products) })
  }
  
  handleOnPressSubmit() {
    const {
      addressSelectedId,
      isAuthUser,
      detailItem,
      funid,
      isCart,
      orderCreateFetch,
      navigation: { navigate },
      userType,
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);
    
    if (userType === 3) {
      // 已开通信用卡

    } else {
      
    }
    
    const getGoodsdetail = (isCart) => {
      if (isCart) {
        // return [{
        //   number: '',
        //   cartitemid: '',
        //   productid: detailItem.id,
        //   rechargeaccount: '',
        //   rechargecode: '',
        //   repaymentamount: 0,
        // }]
      } else {
        return [{
          number: detailItem.productDetailNumber,
          cartitemid: 0,
          productid: detailItem.id,
          rechargeaccount: '',
          rechargecode: '',
          repaymentamount: 0,
        }];
      }
    }

    const getCoupondetail = () => {
      const {
        couponSelectItem,
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
    }
    
    if (addressSelectedId === 0) {
      if(Platform.OS === 'android') return ToastAndroid.show('请选择收货地址', ToastAndroid.SHORT);
    }
    
    const object = {
      ordertype: isCart ? '3' : '2',
      addrid: addressSelectedId + '',
      goodsdetail: JSON.stringify(getGoodsdetail(false)),
      mergedetail: '',
      coupondetail: getCoupondetail(),
      subject: detailItem.name,
    }

    orderCreateFetch(object);
  }

  calcMoney() {
    const {
      detailItem: { price, productDetailNumber },
      couponSelectItem,
    } = this.props;
    let money = productDetailNumber * price;

    if (couponSelectItem.id) {
      if (couponSelectItem.voucherType === 0) {
        // 打折券
        money = money * couponSelectItem.voucherValue * 0.01
      } else {
        money = money - couponSelectItem.voucherValue
      }
    }

    return priceFormat(money)
  }

  renderBottom() {
    const styles = StyleSheet.create({
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
      navRight: {
        flex: 1,
        height: 55,
        lineHeight: 55,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
    });

    // const {
    //   detailItem: { price, productDetailNumber },
    //   couponSelectItem,
    // } = this.props;
    
    return (
      <View style={styles.nav} >
        <View style={styles.navLeft} >
          <Text style={styles.navLeftTop} >Trà lần đầu</Text>
          <Text style={styles.navLeftBottom} >{this.calcMoney()} VND</Text>
        </View>
        <Text style={styles.navRight} onPress={() => this.handleOnPressSubmit()} >Submit</Text>
      </View>
    )
  }
  
  render() {
    const {
      navigation: { navigate },
      i18n,
      addressItems,
      addressSelectedItem,
      detailItem,
      getUserInfoById,
      orderCreate,
      couponSelectItem,
    } = this.props;

    const adverstInfo = [{
      brandId: detailItem.brandId,
      propertiesIds: detailItem.propertiesIds,
      imageUrl: detailItem.imageUrls[0] && detailItem.imageUrls[0].imageUrl,
      name: detailItem.name,
      price: detailItem.price,
      number: detailItem.productDetailNumber,
    }];

    return (
      <View style={styles.container} >
        {(getUserInfoById.loading || orderCreate.loading) && <Loader absolutePosition />}
        <BYHeader />
        <ScrollView>
          <Address
            addressSelectedItem={addressSelectedItem} 
            onPress={() => this.handleOnPressAddress()} 
          />
          <View style={styles.bar} ></View>
          <ProductItem2 
            data={adverstInfo}
            stylePricePrice={{ color: '#666' }}
            isShowNumber={true}
          />
          <NavBar2 
            onPress={() => this.handleOnPressCoupon()} 
            valueLeft={'Sử dụng voucher'} 
            valueMiddle={ couponSelectItem.id ? couponSelectItem.voucherName : 'không thể sử dụng voucher'} 
          />
        </ScrollView>
        {this.renderBottom()}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          address,
          getUserInfoById,
          mergeGetDetail,
          orderCreate,
          productDetailInfo,
          couponSelect,
        } = state;
        const groupon = props.navigation.state.params.groupon;
        const isCart = props.navigation.state.params.isCart;
        const detailItem = groupon ? mergeGetDetail.item : productDetailInfo.item;
        return {
          couponSelectItem: couponSelect.item,
          isCart,
          detailItem,
          orderCreate,
          addressSelectedItem: getAddressSelectedItem(state, props),
          addressItems: address.items,
          addressSelectedId: address.addressSelectedId,
          funid: state.auth.user ? state.auth.user.result : null,
          isAuthUser: !!state.auth.user,
          getUserInfoById,
          userType: getUserInfoById.item.userType || null,
        }
      }
    },
    {
      ...addressActionCreators,
      ...authActionCreators,
      ...getUserInfoByIdActionCreators,
      ...orderCreateActionCreators,
      ...couponSelectActionCreators,
    }
  )(OrderWrite)
);
