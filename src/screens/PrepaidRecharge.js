import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ButtonSelect from "../components/ButtonSelect";
import CustomIcon from "../components/CustomIcon";
import BYTextInput from "../components/BYTextInput";
import BYButton from "../components/BYButton";
import BYTouchable from "../components/BYTouchable";
import ActionSheet from "../components/ActionSheet";

import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR, } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from "../common/constants";


import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
  },
});

class PrepaidRecharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenActionSheet: false,
      payWayButtons: ['信用卡', '网银'],
      phoneNumber: '',
    }

    this.actionSheetCallback = this.actionSheetCallback.bind(this);
  }
  
  componentDidMount() {
    const { bannerSwiperFetch } = this.props;
    
  }

  buttonSelectPriceCallback(val, key) {
    console.log(val);
    console.log(key);
  }
  
  handleOnPressToggleModal = (key, val) => {
    this.setState({
      [key]: typeof val !== 'boolean' ? !this.state[key] : val,
    });
  };

  actionSheetCallback(ret) {
    console.log(ret);
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
        height: 25,
        width: 45,
        marginRight: SIDEINTERVAL,
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
    });

    const buttonSelectPrice = [
      {
        text: '50,000 vnd',
      },
      {
        text: '60,000 vnd',
      },
      {
        text: '70,000 vnd',
      },
      {
        text: '80,000 vnd',
      },
    ]

    const {
      phoneNumber,
    } = this.state;
    
    return (
      <View style={styles.container} >
        <View style={{ height: 20 }} ></View>
        <Text style={styles.title} >Chọn nhà mạng</Text>
        <View style={styles.phoneNumberWrap} >
          <View style={styles.phoneNumber} >
            <BYTextInput 
              style={styles.phoneInput} 
              onChangeText={(text) => this.setState({ phoneNumber: text })} 
              value={phoneNumber} 
              placeholder={'Số điện thoại'} 
              placeholderTextColor={'#ccc'} 
              keyboardType={'numeric'} 
            />
            <Image style={styles.phoneImg} source={{ uri: 'https://vnoss.buyoo.club/commodity/img/provider/card/viettel.jpg' }} />
          </View>
          <Text style={styles.phoneTips} >Lưu ý: Thuê bao bị khóa chiều nạp tiền (sim bị khóa 2 chiều, sim bị khóa do nhập sai mã thẻ điện thoại trước đó nhiều lần, ...) sẽ không thể thực hiện được dịch vụ này.</Text>
          <View style={styles.phoneError} >
            <Ionicons name={'md-alert'} style={styles.phoneErrorIcon} />
            <Text style={styles.phoneErrorText} >您所填入的手机号的手机号不支持直冲，请选择充值卡充值/请输入正确的手机号</Text>
          </View>
        </View>
        <Text style={styles.title} >Chọn nhà mạng</Text>
        <ButtonSelect data={buttonSelectPrice} callback={this.buttonSelectPriceCallback} />
        <BYTouchable style={styles.payMethod} onPress={() => this.handleOnPressToggleModal('isOpenActionSheet')} >
          <Text style={styles.payMethodLeft} >Payment method</Text>
          <Text style={styles.payMethodMiddle} >Balance</Text>
          <CustomIcon style={styles.payMethodRight} name={'arrowright'} />
        </BYTouchable>
        <View style={styles.price} >
          <Text style={styles.priceTitle} >金额</Text>
          <View style={styles.priceMain} >
            <Text style={styles.priceRed} >49.000 VND</Text>
            <Text style={styles.priceGrey} >(已优惠1000VND)</Text>
          </View>
        </View>
        <BYButton text={'支付'} styleWrap={{ marginBottom: 50 }} />
      </View>
    )
  }
  
  render() {
    const {
      isOpenActionSheet,
      payWayButtons,
    } = this.state;
    
    const {
      screenProps: {i18n},
    } = this.props;

    return (
      <View style={styles.container} >
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
        <ActionSheet 
          visible={isOpenActionSheet}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenActionSheet')}
          buttons={payWayButtons}
          callback={this.actionSheetCallback}
        />
      </View>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        comment,
      } = state;

      // const {

      // } = props;

      return {
        comment: comment.items.detail ? comment.items.detail : [],
      }
    }
  },
  {
    ...productDetailInfoActionCreators,
  }
)(PrepaidRecharge);
