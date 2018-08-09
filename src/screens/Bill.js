import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { SCREENS } from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';
import moment from 'moment';
import { getBillMonthItem, getBillTotalMoney } from '../common/selectors';

import { connectLocalization } from '../components/Localization';
import Loader from '../components/Loader';
import BYHeader from '../components/BYHeader';
import BYModal from "../components/BYModal";
import BYTouchable from '../components/BYTouchable';
import BYTextInput from '../components/BYTextInput';
import BYButton from '../components/BYButton';
import BillSelect from "../components/BillSelect";
import ActionSheet from "../components/ActionSheet";
// import EnterPassword from "../components/EnterPassword";

import { RED_COLOR, PRIMARY_COLOR, BORDER_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';

import * as searchMonthActionCreators from '../common/actions/searchMonth';
import * as billActionCreators from '../common/actions/bill';
import * as billByYearActionCreators from '../common/actions/billByYear';
import * as orderCreateActionCreators from '../common/actions/orderCreate';
import * as queryGoodsActionCreators from '../common/actions/queryGoods';

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
})

class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBillSelect: false,
      isOpenPay: false,
      isOpenActionSheet: false,
      // isOpenEnterPassword: false,
      isShowGoods: false,
      payWayButtons: ['Repayment records'],
      // price: '1082500',
    }
    this.actionSheetCallback = this.actionSheetCallback.bind(this);
    // this.enterPasswordCallback = this.enterPasswordCallback.bind(this);
  }

  componentDidMount() {
    let {
      queryGoodsFetch,
      activeMonth,
      activeYear,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);

    // let nowTimeStr = moment().format('YYYY-MM-DD HH:mm:ss');
    if (activeMonth < 10) activeMonth = '0' + activeMonth;

    queryGoodsFetch({
      createtime: `${activeYear}-${activeMonth}-26 11:11:11`,
    });
    
    
    this.billPayResult_addListener = DeviceEventEmitter.addListener(
      'billPayResult',
      (parmas) => {
        // goBack()
      },
    );

  }

  componentWillUnmount() {
    this.billPayResult_addListener.remove();
  }

  // async enterPasswordCallback(ret) {
  //   const {
  //     price,
  //     orderCreateFetch,
  //   } = this.props;
  //   orderCreateFetch({
  //     BYPayPassword: ret.val,
  //     BYtype: 'billPay',
  //     goodsdetail: JSON.stringify([{
  //       number: 0,
  //       cartitemid: 0,
  //       productid: 0,
  //       rechargeaccount: '',
  //       rechargecode: '',
  //       repaymentamount: price,
  //     }])
  //   });
  // }

  actionSheetCallback(ret) {
    const {
      navigation: { navigate }
    } = this.props;

    if (ret.buttonIndex === -1) return false;
    if (ret.buttonIndex === 0) navigate(SCREENS.RepaymentRecord);
  }

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
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
      activeMonth,
    } = this.props;
    
    return (
      <BYTouchable 
        style={styles.container} 
        backgroundColor="transparent" 
        onPress={() => this.handleOnPressToggleModal('isOpenBillSelect')}
      >
        <Text style={styles.title}>tháng {activeMonth}</Text>
        <Ionicons style={styles.arrow} name={'ios-arrow-down'} />
      </BYTouchable>
    )
  }

  renderHeaderRight = () => {
    const styles = StyleSheet.create({
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
    return (
      <BYTouchable 
        style={styles.container} 
        backgroundColor="transparent" 
        onPress={() => this.handleOnPressToggleModal('isOpenActionSheet')}
      >
        <Entypo style={styles.arrow} name={'dots-three-vertical'} />
      </BYTouchable>
    )
  }

  handleOnPressToggleModal = (key, val) => {
    this.setState({
      [key]: typeof val !== 'boolean' ? !this.state[key] : val,
    });
  };

  handleOnPressPaySubmit() {
    const {
      price,
      orderCreateFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    this.handleOnPressToggleModal('isOpenPay')

    orderCreateFetch({
      // BYPayPassword: ret.val,
      BYtype: 'billPay',
      goodsdetail: JSON.stringify([{
        number: 0,
        cartitemid: 0,
        productid: 0,
        rechargeaccount: '',
        rechargecode: '',
        repaymentamount: price,
      }])
    });

    // this.handleOnPressToggleModal('isOpenEnterPassword');
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

    this.handleOnPressToggleModal('isOpenPay')
  }
  
  renderPay() {    
    const styles = StyleSheet.create({
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
      price,
      billPriceFetch,
      searchMonthLoading,
    } = this.props;
    
    return (
      <View style={styles.container}>
        {
          searchMonthLoading && 
          <View style={styles.mask}>
            <Loader absolutePosition />
          </View>
        }
        <View style={styles.close}>
          <EvilIcons style={styles.closeIcon} name={'close'} onPress={() => this.handleOnPressToggleModal('isOpenPay')} />
        </View>
        <Text style={styles.title}>Repayment</Text>
        <View style={styles.wrap}>
          <View style={styles.enterPrice}>
            <BYTextInput 
              style={styles.textInput} 
              keyboardType="numeric" 
              value={price} 
              onChangeText={(text) => billPriceFetch(text)}
            />
            <Text style={styles.enterPriceText}>change amount</Text>
          </View>
        </View>
        <Text style={styles.tips}>remaining in this period {priceFormat(price)} VND</Text>
        <BYButton 
          text={'pay'} 
          styleWrap={{ marginBottom: SIDEINTERVAL * 2 }} 
          onPress={() => this.handleOnPressPaySubmit()}
        />
      </View>
    )
  }

  renderGoods() {
    const styles = StyleSheet.create({
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

    const {
      queryGoodsItems,
    } = this.props;
    
    return (
      <View style={styles.goods}>
        {
          queryGoodsItems.map((val, key) => {
            return (
              <View style={styles.item} key={key}>
                <Text style={styles.title}>{key + 1}. {val.name}</Text>
                <View style={styles.bottom}>
                  <Text style={styles.price}>{priceFormat(val.totalAmount)} VND</Text>
                  <Text style={styles.date}>{moment(val.createTime).format('DD-MM')}</Text>
                </View>
              </View>
            )
          })
        }
        {/* <View style={styles.item}>
          <Text style={styles.title}>1. [buyoo] apple iPhone 6 tthree kinds of goods for you.</Text>
           <View style={styles.bottom}>
            <Text style={styles.price}>666.000 VND</Text>
            <Text style={styles.date}>16-05</Text>
           </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>1. [buyoo] apple iPhone 6 tthree kinds of goods for you.</Text>
           <View style={styles.bottom}>
            <Text style={styles.price}>666.000 VND</Text>
            <Text style={styles.date}>16-05</Text>
           </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>1. [buyoo] apple iPhone 6 tthree kinds of goods for you.</Text>
           <View style={styles.bottom}>
            <Text style={styles.price}>666.000 VND</Text>
            <Text style={styles.date}>16-05</Text>
           </View>
        </View> */}
        <Ionicons style={styles.arrow} name={'ios-arrow-up'} onPress={() => this.setState({ isShowGoods: false })} />
      </View>
    )
  }
  
  renderContent() {
    const styles = StyleSheet.create({
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

    const {
      isShowGoods,
    } = this.state;
    
    const {
      billMonthItem,
      navigation: { navigate }
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {
            billMonthItem.status !== 10002 &&
            <View style={styles.topOne}>
              <Text style={styles.price}>{priceFormat(billMonthItem.waitingAmount)} VND</Text>
              <View style={styles.detailWrap}>
                <Text style={styles.detail} onPress={() => navigate(SCREENS.BillDetail, { id: billMonthItem.id })}>query the detail</Text>
              </View>
              {
                billMonthItem.status !== 10002 && billMonthItem.status !== 10000 &&
                <BYButton text={'pay'} styleWrap={styles.button} onPress={() => this.handleOnPressPay()} />
              }
              <Text style={styles.tips}>latest repayment date 5th</Text>
            </View>
          }
          {
            billMonthItem.status === 10002 &&
            <View style={styles.topTwo}>
              <Image style={styles.image} source={require('../images/jafsdbufnl.png')} />
              <Text style={styles.topTwoTitle}>The bill has been paid off this month.</Text>
              <View style={styles.topTwoTextWrap}>
                <Text style={styles.topTwoTextOne}>Has also {priceFormat(billMonthItem.waitingAmount)} VND</Text>
                <Text style={styles.topTwoTextTwo} onPress={() => navigate(SCREENS.BillDetail, { id: billMonthItem.id })}>query the detail</Text>
              </View>
            </View>
          }
          <View style={styles.bottom}>
            <Text style={styles.bottomText} onPress={() => this.setState({ isShowGoods: !this.state.isShowGoods })}>Expenses record ></Text>
          </View>
          {
            isShowGoods && 
            this.renderGoods()
          }
        </View>
      </View>
    )
  }

  render() {
    const {
      isOpenBillSelect,
      isOpenActionSheet,
      // isOpenEnterPassword,
      isOpenPay,
      payWayButtons,
    } = this.state;
    const {
      isOverdue,
      navigation: { navigate },
      i18n,
      billMonthItem,
    } = this.props;
    
    return (
      <View style={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={this.renderHeaderRight()}
        />
        <ScrollView>
          {
            !!billMonthItem.month &&
            this.renderContent()
          }
        </ScrollView>
        {
          isOverdue && 
          <Text style={styles.alert} onPress={() => this.handleOnPressToggleModal('isOpenBillSelect')}>您有账单已逾期，请尽快还款!</Text>
        }
        <BillSelect 
          visible={isOpenBillSelect}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenBillSelect')}
        />
        <BYModal
          visible={isOpenPay}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenPay')}
        >
          {this.renderPay()}
        </BYModal>
        <ActionSheet 
          visible={isOpenActionSheet}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenActionSheet')}
          buttons={payWayButtons}
          callback={this.actionSheetCallback}
        />
        {/* <EnterPassword 
          visible={isOpenEnterPassword}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenEnterPassword')}
          callback={this.enterPasswordCallback}
        /> */}
      </View>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        bill,
        billByYear,
        queryGoods,
        searchMonth,
      } = state;
      return {
        billMonthItem: getBillMonthItem(state, props),
        // billTotalMoney: getBillTotalMoney(state, props),
        searchMonthItem: searchMonth.item,
        searchMonthLoading: searchMonth.loading,
        price: bill.price,
        activeYear: bill.activeYear,
        activeMonth: bill.activeMonth,
        isOverdue: billByYear.isOverdue,
        billByYearItems: billByYear.items,
        queryGoodsItems: queryGoods.items,
        isAuthUser: !!state.auth.user,
      }
    }
  },
  {
    ...billActionCreators,
    ...billByYearActionCreators,
    ...orderCreateActionCreators,
    ...queryGoodsActionCreators,
    ...searchMonthActionCreators,
  }
)(Bill);
