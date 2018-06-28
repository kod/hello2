import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS, WINDOW_WIDTH } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import CouponItem from "../components/CouponItem";
import BYTouchable from "../components/BYTouchable";

import { RED_COLOR, PRIMARY_COLOR } from "../styles/variables";
import { SIDEINTERVAL } from "../common/constants";

import * as getVoucherActionCreators from '../common/actions/getVoucher';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

class Coupon extends React.Component {

  componentDidMount() {
    const { getVoucherFetch } = this.props;
    getVoucherFetch();
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
        <ScrollView>
          <CouponItem data={items} />
        </ScrollView>
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

      const {

      } = props;

      return {
        items: getVoucher.items,
      }
    }
  },
  {
    ...getVoucherActionCreators,
    ...authActionCreators,
  }
)(Coupon));
