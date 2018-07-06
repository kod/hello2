import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS, WINDOW_WIDTH } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import CouponItem from "../components/CouponItem";
import BYTouchable from "../components/BYTouchable";
import EmptyState from "../components/EmptyState";

import { RED_COLOR, PRIMARY_COLOR } from "../styles/variables";
import { SIDEINTERVAL } from "../common/constants";

import * as getVoucherActionCreators from '../common/actions/getVoucher';
import * as receiveVoucherActionCreators from '../common/actions/receiveVoucher';

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
    const { getVoucherFetch } = this.props;
    getVoucherFetch();
  }

  handlerOnPress(val) {
    const {
      receiveVoucherFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    console.log(val);
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
        backgroundColor={'transparent'} 
      >
        <Text style={styles.title}>coupon center</Text>
      </BYTouchable>
    )
  }

  render() {
    const {
      items,
      navigation: { navigate },
      i18n 
    } = this.props;

    return (
      <View style={styles.container} >
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        {
          items.length > 0 
          ?
          <ScrollView>
            <CouponItem data={items} onPress={this.handlerOnPress} />
          </ScrollView>
          :
          <EmptyState source={require('../images/ouhrigdfnjsoeijehr.jpg')} text={'爱生活，就不要空空荡荡'} styleText={{marginBottom: 0}} />
        }
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    return (state, props) => {
      const {
        getVoucher,
      } = state;

      // const {

      // } = props;

      return {
        items: getVoucher.items,
        isAuthUser: !!state.auth.user,
      }
    }
  },
  {
    ...getVoucherActionCreators,
    ...receiveVoucherActionCreators,
  }
)(Coupon));
