import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';
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
import BYModal from "../components/BYModal";
import Address from "../components/Address";

import { SIDEINTERVAL, RED_COLOR, PRIMARY_COLOR, WINDOW_WIDTH, WINDOW_HEIGHT } from "../styles/variables";

import * as addressActionCreators from '../common/actions/address';
import * as authActionCreators from '../common/actions/auth';
import * as returnMoneyActionCreators from '../common/actions/returnMoney';
import * as orderCreateActionCreators from '../common/actions/orderCreate';

import { getAddressSelectedItem } from "../common/selectors";
import { addressJoin } from "../common/helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bar: {
    backgroundColor: '#f5f5f5',
    height: 5,
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
  paymentItemDisable: {
    opacity: 0.5,
  },
  alertIcon: {
    color: RED_COLOR,
    // backgroundColor: RED_COLOR,
    fontSize: 16,
  },
});

class OrderWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBottomSheet: false,
      // paymentPercentageIndex: 0,
      // paymentMonthsIndex: 0,
      // paymentPercentageList: [0.1, 0.2, 0.3, 0.4, 0.5, 1],
      // paymentMonthsList: [3, 6, 9, 12],
    };
  }

  componentDidMount() {
    const {
      authUser,
      addressFetch,
      detailItem,
      returnMoneyFetch,
      returnMoneyItems,
      returnMoneyPayrateValue,
      returnMoneyRepaymentmonthsValue,
    } = this.props;
    if (authUser) {
      addressFetch();
    }

    const totalamounts = detailItem.price * detailItem.productDetailNumber;
    returnMoneyFetch({
      totalamounts,
      repaymentmonths: returnMoneyRepaymentmonthsValue,
      payrate: returnMoneyPayrateValue,
    });

  }

  handleOnPressToggleBottomSheet = (type) => {
    const {
      isOpenBottomSheet,
    } = this.state;

    this.setState({
      isOpenBottomSheet: typeof type !== 'boolean' ? !isOpenBottomSheet : type,
    });
  };

  handleOnPressSubmit() {
    const {
      addressSelectedId,
      authUser,
      detailItem,
      funid,
      isCart,
      returnMoneyPayrateValue,
      returnMoneyRepaymentmonthsValue,
      orderCreateFetch,
    } = this.props;

    let ordertype;
    
    if (isCart) {
      ordertype = returnMoneyPayrateValue === 1 ? '3': '4';
    } else {
      ordertype = returnMoneyPayrateValue === 1 ? '2': '0';
    }
    console.log(funid);
    const object = {
      ordertype: ordertype,
      addrid: addressSelectedId,
      goodsdetail: [{
        number: '',
        cartitemid: '',
        productid: '',
        rechargeaccount: '',
        rechargecode: '',
        repaymentamount: '',
      }],
      mergedetail: [{
        mergeorderid: '',
        mergemasterid: '',
        mergename: '',
        mergepersonnum: '',
        mergeheadimage: '',
        mergedesc: '',
        mergeusername: '',
      }],
      coupondetail: [{
        couponcard: '',
        couponpassword: '',
        couponbrandid: '',
        coupontypeid: '',
        couponproductid: '',
        coupontype: '',
        couponvalue: '',
      }],
      subject: '',
      remark: '',
      // orderdetails: [{
      //     payRate: returnMoneyPayrateValue,
      //     orderNo: createOrderno(funid),
      //     totalAmount: detailItem.price * detailItem.productDetailNumber,
      //     orgAmount: detailItem.orgPrice * detailItem.productDetailNumber,
      //     advance: detailItem.price * detailItem.productDetailNumber * returnMoneyPayrateValue,
      //     subject: detailItem.name,
      //     goodsDetail: JSON.stringify([{
      //         number: detailItem.productDetailNumber,
      //         cartitemid: '',
      //         productInfoId: detailItem.id
      //     }]),
      //     repaymentMonth: returnMoneyRepaymentmonthsValue,
      //     couponCard: '',
      //     couponPassword: '',
      //     couponType: 0,
      //     couponValue: 0,
      //     couponBrandId: 0,
      //     couponTypeId: 0,
      //     couponProductInfoId: 0,
      // }],
    }
    console.log(object);
    // orderCreateFetch(object);
  }

  renderBottom() {
    const styles = StyleSheet.create({
      nav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
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

    const {
      detailItem,
      returnMoneyPayrateValue,
    } = this.props;
    const payAmounts = detailItem.price * detailItem.productDetailNumber * returnMoneyPayrateValue;
    return (
      <View style={styles.nav} >
        <View style={styles.navLeft} >
          <Text style={styles.navLeftTop} >Trà lần đầu</Text>
          <Text style={styles.navLeftBottom} >{priceFormat(payAmounts)} VND</Text>
        </View>
        <Text style={styles.navRight} onPress={() => this.handleOnPressSubmit()} >Submit</Text>
      </View>
    )
  }

  renderBottomSheet() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
      },
      closeWrap: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      close: {
        paddingTop: SIDEINTERVAL,
        fontSize: 24,
        color: '#666',
      },
      scrollview: {
        height: WINDOW_HEIGHT * 0.5,
      },
      title: {
        flexDirection: 'row',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
      },
      titleItem: {
        color: '#333',
        width: WINDOW_WIDTH / 3,
        paddingTop: 10,
        paddingBottom: 10,
        // height: 45,
        // lineHeight: 45,
        textAlign: 'center',
      },
      item: {
        flexDirection: 'row',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
      },
      itemText: {
        color: '#666',
        width: WINDOW_WIDTH / 3,
        height: 45,
        lineHeight: 45,
        textAlign: 'center',
      },
    });

    const {
      detailItem,
      returnMoneyItems,
      returnMoneyRepaymentmonthsValue,
      returnMoneyRepaymentmonthsList,
      returnMoneyPayrateValue,
      returnMoneyPayrateList,
    } = this.props;
    const totalamounts = detailItem.price * detailItem.productDetailNumber;
    const items = returnMoneyItems[`${totalamounts}_${returnMoneyRepaymentmonthsValue}_${returnMoneyPayrateValue}`]
    return (
      <View style={styles.container} >
        <BYTouchable style={styles.closeWrap} onPress={() => this.handleOnPressToggleBottomSheet()} >
          <EvilIcons style={styles.close} name="close" />
        </BYTouchable>
        <View style={styles.title} >
          <Text style={styles.titleItem} >periods</Text>
          <Text style={styles.titleItem} >supply(vnd)</Text>
          <Text style={styles.titleItem} >principalprincipal(vnd)</Text>
        </View>
        <ScrollView style={styles.scrollview} >
          {
            !!items &&
            items.map((val, key) => 
              <View style={styles.item} key={key} >
                <Text style={styles.itemText} >{key + 1}st periods</Text>
                <Text style={styles.itemText} >{priceFormat(val.interest)}</Text>
                <Text style={styles.itemText} >{priceFormat(val.principal)}</Text>
              </View>
            )
          }
        </ScrollView>
      </View>
    )
  }
  
  handleOnPressPaymentPercentage(val) {
    console.log(val);
    const {
      isOpenBottomSheet,
    } = this.state;

    const {
      detailItem,
      returnMoneyFetch,
      returnMoneyItems,
      returnMoneyRepaymentmonthsValue,
      returnMoneyRepaymentmonthsList,
      returnMoneyPayrateValue,
      returnMoneyPayrateList,
    } = this.props;
    const totalamounts = detailItem.price * detailItem.productDetailNumber;
    returnMoneyFetch({
      totalamounts,
      repaymentmonths: returnMoneyRepaymentmonthsValue,
      payrate: returnMoneyPayrateValue,
      key: 'payrateValue',
      value: val,
    });
  }
  
  renderPaymentPercentage() {
    const {
      returnMoneyPayrateValue,
      returnMoneyPayrateList,
      returnMoneyRepaymentmonthsValue,
      returnMoneyRepaymentmonthsList,
    } = this.props;
    
    return (
      <View style={styles.payment} >
        {
          returnMoneyPayrateList.map(
            (val, key) => 
            <Text 
              style={[styles.paymentItem, returnMoneyPayrateValue === val && styles.paymentItemActive]}
              onPress={() => this.handleOnPressPaymentPercentage(val)}
              key={key}
            >
              {`${val * 100}%`}
            </Text>
          )
        }
      </View>
    )
  }

  handleOnPressPaymentMonths(val) {
    const {
      isOpenBottomSheet,
    } = this.state;

    const {
      detailItem,
      returnMoneyFetch,
      returnMoneyItems,
      returnMoneyRepaymentmonthsValue,
      returnMoneyRepaymentmonthsList,
      returnMoneyPayrateValue,
      returnMoneyPayrateList,
    } = this.props;
    const totalamounts = detailItem.price * detailItem.productDetailNumber;
    returnMoneyFetch({
      totalamounts,
      repaymentmonths: returnMoneyRepaymentmonthsValue,
      payrate: returnMoneyPayrateValue,
      key: 'repaymentmonthsValue',
      value: val,
    });
  }

  renderPaymentMonths() {
    const {
      returnMoneyRepaymentmonthsValue,
      returnMoneyRepaymentmonthsList,
      returnMoneyPayrateValue,
      returnMoneyPayrateList,
    } = this.props;
    console.log('xxxxxxxxxx');
    console.log(this.props);
    return (
      <View style={styles.payment} >
        {
          returnMoneyRepaymentmonthsList.map(
            (val, key) => 
            <Text 
              style={[
                styles.paymentItem, 
                returnMoneyPayrateValue === 1 ? styles.paymentItemDisable : (returnMoneyRepaymentmonthsValue === val && styles.paymentItemActive)
              ]}
              onPress={() => this.handleOnPressPaymentMonths(val)}
              key={key}
            >
              {`${val} tháng`}
            </Text>
          )
        }
      </View>
    )
  }
  
  render() {
    const {
      isOpenBottomSheet,
    } = this.state;
    
    const {
      navigation: { navigate },
      i18n,
      addressItems,
      addressSelectedItem,
      returnMoneyItems,
      returnMoneyRepaymentmonthsValue,
      returnMoneyRepaymentmonthsList,
      returnMoneyPayrateValue,
      returnMoneyPayrateList,
      detailItem,
    } = this.props;
    const adverstInfo = [{
      brandId: detailItem.brandId,
      propertiesIds: detailItem.propertiesIds,
      imageUrl: detailItem.imageUrls[0],
      name: detailItem.name,
      price: detailItem.price,
      number: detailItem.productDetailNumber,
    }];

    const totalamounts = detailItem.price * detailItem.productDetailNumber;
    const items = returnMoneyItems[`${totalamounts}_${returnMoneyRepaymentmonthsValue}_${returnMoneyPayrateValue}`]
    const itemsValue = items ? items[0] : '';
    return (
      <View style={styles.container} >
        <BYHeader />
        <ScrollView>
          <Address
            addressSelectedItem={addressSelectedItem} 
            onPress={() => navigate(SCREENS.Address, { isSelect: true })} 
          />
          <View style={styles.bar} ></View>
          <ProductItem2 
            data={adverstInfo}
            stylePricePrice={{ color: '#666' }}
            isShowNumber={true}
          />
          <Text style={styles.totalPrice} >{priceFormat(detailItem.price * detailItem.productDetailNumber)} ₫</Text>
          <View style={styles.bar} ></View>
          <NavBar2 
            onPress={() => navigate(SCREENS.Settings)} 
            valueLeft={'Sử dụng voucher'} 
            valueMiddle={'không thể sử dụng voucher'} 
          />
          <Text style={styles.title} >Trà lần đầu</Text>
          {this.renderPaymentPercentage()}
          <Text style={styles.title} >Số kỳ trả góp</Text>
          {this.renderPaymentMonths()}
          <NavBar2 
            onPress={() => this.handleOnPressToggleBottomSheet()}
            valueLeft={'Total need to return'} 
            valueMiddle={priceFormat(itemsValue.interest + itemsValue.principal) + ' vnd'} 
            componentRight={<Ionicons name={'md-alert'} style={styles.alertIcon} />}
          />
          <NavBar2 
            // onPress={() => navigate(SCREENS.Settings)} 
            valueLeft={'Monthly payment'} 
            valueMiddle={'3.763.500 VND'} 
            styleMiddle={{color: PRIMARY_COLOR}}
            isShowRight={false}
            backgroundColor={'transparent'}
          />

        </ScrollView>
        {this.renderBottom()}
        <BYModal
          visible={isOpenBottomSheet}
          onRequestClose={this.handleOnPressToggleBottomSheet}
        >
          {this.renderBottomSheet()}
        </BYModal>
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
          returnMoney,
          mergeGetDetail,
          productDetailInfo,
        } = state;
        const groupon = props.navigation.state.params.groupon;
        const isCart = props.navigation.state.params.isCart;
        const detailItem = groupon ? mergeGetDetail.item : productDetailInfo.item;
        return {
          isCart,
          detailItem,
          addressSelectedItem: getAddressSelectedItem(state, props),
          addressItems: address.items,
          addressSelectedId: address.addressSelectedId,
          funid: state.auth.user.result,
          authUser: !!state.auth.user,
          returnMoneyItems: returnMoney.items,
          returnMoneyPayrateValue: returnMoney.payrateValue,
          returnMoneyRepaymentmonthsValue: returnMoney.repaymentmonthsValue,
          returnMoneyPayrateList: returnMoney.payrateList,
          returnMoneyRepaymentmonthsList: returnMoney.repaymentmonthsList,
        }
      }
    },
    {
      ...addressActionCreators,
      ...authActionCreators,
      ...returnMoneyActionCreators,
      ...orderCreateActionCreators,
    }
  )(OrderWrite)
);
