import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ButtonSelect from "../components/ButtonSelect";
import CustomIcon from '../components/CustomIcon';
import BYTextInput from '../components/BYTextInput';
import BYButton from '../components/BYButton';
import BYTouchable from '../components/BYTouchable';
import ActionSheet from '../components/ActionSheet';
import Loader from '../components/Loader';
import { connectLocalization } from '../components/Localization';

import priceFormat from '../common/helpers/priceFormat';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';

import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR, } from '../styles/variables';


import * as prepaidActionCreators from '../common/actions/prepaid';
import * as orderCreateActionCreators from '../common/actions/orderCreate';
import * as getPhoneRechargeActionCreators from '../common/actions/getPhoneRecharge';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
  },
});

class PrepaidRecharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenActionSheet: false,
      // payWayButtons: ['信用卡', '网银'],
      payWayIndex: 0,
      phoneNumber: '',
      buttonIndex: 0,
      telNumberJudgeSetTimeoutId: null,
    }

    this.actionSheetCallback = this.actionSheetCallback.bind(this);
    this.buttonSelectPriceCallback = this.buttonSelectPriceCallback.bind(this);
  }
  
  componentDidMount() {
    const { bannerSwiperFetch } = this.props;
    
  }

  buttonSelectPriceCallback(val, key) {
    this.setState({
      buttonIndex: key,
    })
  }
  
  handleOnPressToggleModal = (key, val) => {
    this.setState({
      [key]: typeof val !== 'boolean' ? !this.state[key] : val,
    });
  };

  actionSheetCallback(ret) {
    if (ret.buttonIndex < 0) return false;
    this.setState({
      payWayIndex: ret.buttonIndex
    });
  }

  isProcessSubmit() {
    const {
      payWayIndex,
      buttonIndex,
      phoneNumber,
    } = this.state;
    
    const {
      loading,
      items,
      errorText,
      payWayButtons,
    } = this.props;

    if (
      loading === false && 
      payWayButtons[payWayIndex] &&
      errorText === '' && 
      phoneNumber.length > 0 &&
      items[buttonIndex] &&
      items[buttonIndex].price > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleOnPressSubmit() {
    const {
      payWayIndex,
      buttonIndex,
      phoneNumber,
    } = this.state;
    
    const {
      items,
      orderCreateFetch,
      providerCode,
      payWayButtons,
    } = this.props;
    
    if (this.isProcessSubmit()) {

      orderCreateFetch({
        BYtype: 'Prepaid',
        BYpayway: payWayButtons[payWayIndex].payway,
        ordertype: '7',
        goodsdetail: JSON.stringify([{
          number: 1,
          cartitemid: 0,
          productid: items[buttonIndex].id,
          rechargeaccount: phoneNumber,
          rechargecode: providerCode,
          repaymentamount: '',
        }])
      });
  
    }
  }

  handleOnChangeText(text) {
    const {
      prepaidFetch,
      getPhoneRechargeFetch,
    } = this.props;
    
    if (text.length > 0 && text[0] !== '0') text = '0' + text;

    const judge = (text) => {
      if (text.length === 10 && text.slice(0, 2) === '09') {
        
        prepaidFetch({
          errorText: '',
          providerIcon: '',
        });

        getPhoneRechargeFetch({
          msisdn: text,
        })
        
      } else if (text.length === 11 && text.slice(0, 2) === '01') {
        prepaidFetch({
          errorText: '',
          providerIcon: '',
        });

        getPhoneRechargeFetch({
          msisdn: text,
        })

      } else if (text.length === 10 || text.length === 11) {
        prepaidFetch({
          errorText: 'Invalid phone number',
          providerIcon: '',
        });
      }
    }

    this.setState({ phoneNumber: text });
    judge(text);

    // window.clearTimeout(this.state.telNumberJudgeSetTimeoutId);
    // this.state.telNumberJudgeSetTimeoutId = window.setTimeout(() => {
    //   judge(text);
    // }, 700);

  }
  
  renderContent() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      title: {
        fontSize: 11,
        color: '#666',
        paddingLeft: SIDEINTERVAL,
        marginBottom: 10,
      },
      payMethod: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        marginBottom: 20
      },
      payMethodLeft: {
        flex: 1,
        fontSize: 11,
        color: '#666',
      },
      payMethodMiddle: {
        fontSize: 11,
        color: '#333',
        marginRight: 3,
      },
      payMethodRight: {
        fontSize: 8,
        color: '#333',
      },
      price: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: 25,
      },
      priceTitle: {
        fontSize: 10,
        lineHeight: 10 * 1.618,
        color: '#333',
      },
      priceMain: {
        flexDirection: 'row',
      },
      priceRed: {
        color: RED_COLOR,
        fontSize: 18,
        lineHeight: 18 * 1.618,
        marginRight: 5,
      },
      priceGrey: {
        color: '#ccc',
        fontSize: 10,
        paddingTop: 9,
      },
      phoneNumberWrap: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: 15,
      },
      phoneNumber: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
      },
      phoneInput: {
        flex: 1,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
      },
      phoneImg: {
        height: 35,
        width: 80,
        marginRight: SIDEINTERVAL,
        resizeMode: 'contain',
      },
      phoneTips: {
        fontSize: 10,
        lineHeight: 10 * 1.618,
        color: '#ccc',
        marginBottom: 5,
        paddingRight: SIDEINTERVAL,
      },
      phoneError: {
        flexDirection: 'row',
        paddingRight: SIDEINTERVAL,
      },
      phoneErrorIcon: {
        fontSize: 14,
        color: RED_COLOR,
        marginRight: 8,
        paddingTop: 2,
      },
      phoneErrorText: {
        fontSize: 11,
        lineHeight: 11 * 1.618,
        color: RED_COLOR,
      },
      byButton: {
        backgroundColor: 'rgba(0, 118, 247, 0.5)',
      },
    });

    const {
      phoneNumber,
      buttonIndex,
      payWayIndex,
    } = this.state;
    
    const {
      errorText,
      providerIcon,
      payWayButtons,
      items,
    } = this.props;
    
    return (
      <View style={styles.container}>
        <View style={{ height: 20 }} />
        <Text style={styles.title}>Chọn nhà mạng</Text>
        <View style={styles.phoneNumberWrap}>
          <View style={styles.phoneNumber}>
            <BYTextInput
              style={styles.phoneInput} 
              onChangeText={text => this.handleOnChangeText(text)} 
              value={phoneNumber} 
              placeholder={'Số điện thoại'} 
              placeholderTextColor="#ccc" 
              keyboardType="numeric"
            />
            {
              providerIcon.length > 0 &&
              <Image style={styles.phoneImg} source={{ uri: providerIcon }} />
            }
          </View>
          <Text style={styles.phoneTips}>Lưu ý: Thuê bao bị khóa chiều nạp tiền (sim bị khóa 2 chiều, sim bị khóa do nhập sai mã thẻ điện thoại trước đó nhiều lần, ...) sẽ không thể thực hiện được dịch vụ này.</Text>
          {
            errorText.length > 0 &&
            <View style={styles.phoneError}>
              <Ionicons name={'md-alert'} style={styles.phoneErrorIcon} />
              <Text style={styles.phoneErrorText}>{errorText}</Text>
            </View>
          }
        </View>
        <Text style={styles.title}>Chọn nhà mạng</Text>
        <ButtonSelect data={items} callback={this.buttonSelectPriceCallback} />
        <BYTouchable style={styles.payMethod} onPress={() => this.handleOnPressToggleModal('isOpenActionSheet')}>
          <Text style={styles.payMethodLeft}>Payment method</Text>
          <Text style={styles.payMethodMiddle}>{payWayButtons[payWayIndex].text || ''}</Text>
          <CustomIcon style={styles.payMethodRight} name="arrowright" />
        </BYTouchable>
        <View style={styles.price}>
          <Text style={styles.priceTitle}>金额</Text>
          <View style={styles.priceMain}>
            <Text style={styles.priceRed}>{priceFormat(items[buttonIndex].price)} ₫</Text>
            {
              (items[buttonIndex].price - items[buttonIndex].orgPrice) !== 0 &&
              <Text style={styles.priceGrey}>(已优惠{priceFormat(items[buttonIndex].orgPrice - items[buttonIndex].price)} ₫)</Text>
            }
          </View>
        </View>
        <BYButton 
          text={'支付'} 
          styleWrap={{ marginBottom: 50 }} 
          style={!this.isProcessSubmit() && styles.byButton} 
          onPress={() => this.handleOnPressSubmit()} 
        />
      </View>
    )
  }
  
  render() {
    const {
      isOpenActionSheet,
    } = this.state;
    
    const {
      loading,
      orderCreateLoading,
      payWayButtons,
      screenProps: {i18n},
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
        <ActionSheet 
          visible={isOpenActionSheet}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenActionSheet')}
          buttons={payWayButtons.map((val,key) => val.text)}
          callback={this.actionSheetCallback}
        />
        {(loading || orderCreateLoading) && <Loader absolutePosition />}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          prepaid,
          orderCreate,
          getPhoneRecharge,
        } = state;

        // const {

        // } = props;

        return {
          errorText: prepaid.errorText,
          providerIcon: prepaid.providerIcon,
          payWayButtons: getPhoneRecharge.payWayButtons,
          providerCode: getPhoneRecharge.providerCode,
          items: getPhoneRecharge.items,
          loading: getPhoneRecharge.loading,
          orderCreateLoading: orderCreate.loading,
        }
      }
    },
    {
      ...prepaidActionCreators,
      ...orderCreateActionCreators,
      ...getPhoneRechargeActionCreators,
    }
  )(PrepaidRecharge),
);
