import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS, WINDOW_WIDTH } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import CouponItem from "../components/CouponItem";
import BYTouchable from '../components/BYTouchable';

import CouponMyTabNavigator from "../navigations/CouponMyTabNavigator";

import { RED_COLOR, PRIMARY_COLOR } from '../styles/variables';
import { SIDEINTERVAL } from '../common/constants';

import * as getVoucherActionCreators from '../common/actions/getVoucher';
import * as receiveVoucherActionCreators from '../common/actions/receiveVoucher';
import * as getVoucherListActionCreators from '../common/actions/getVoucherList';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

class Coupon extends React.Component {
  constructor(props) {
    super(props);

    this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  componentDidMount() {
    const {
      getVoucherListFetch,
    } = this.props;
    getVoucherListFetch({
      status: 0,
    });
    getVoucherListFetch({
      status: 1,
    });
    getVoucherListFetch({
      status: 2,
    });

  }

  handlerOnPress(val) {
    const {
      receiveVoucherFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    if (val.status !== 1) {
      const title = val.status === 0 ? '已领取' : '已领完';
      Alert.alert(
        '',
        title,
        [{ 
            text: '确定', 
            onPress: () => {}
        }]
      )
      return false;
    }

    receiveVoucherFetch({
      voucherid: val.id
    });
  }
  
  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40,
        flexDirection: 'row',
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    });
    return (
      <BYTouchable 
        style={styles.container}
        backgroundColor="transparent"
      >
        <Text style={styles.title}>my coupon</Text>
      </BYTouchable>
    )
  }

  render() {
    const {
      items,
      navigation,
      i18n,
      couponMyPast,
      couponMyUnused,
      couponMyUsed,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        <CouponMyTabNavigator  
          screenProps={{
            mainNavigation: navigation,
            couponMyPast,
            couponMyUnused,
            couponMyUsed,      
          }}
        />
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    return (state, props) => {
      const {
        getVoucher,
        getVoucherList,
      } = state;

      // const {

      // } = props;

      return {
        couponMyPast: getVoucherList.CouponMyPast.length,
        couponMyUnused: getVoucherList.CouponMyUnused.length,
        couponMyUsed: getVoucherList.CouponMyUsed.length,
        items: getVoucher.items,
        isAuthUser: !!state.auth.user,
      }
    }
  },
  {
    ...getVoucherActionCreators,
    ...receiveVoucherActionCreators,
    ...getVoucherListActionCreators,
  }
)(Coupon));
