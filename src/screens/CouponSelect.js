import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS, WINDOW_WIDTH } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import CouponItem from "../components/CouponItem";
import BYTouchable from "../components/BYTouchable";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

import { RED_COLOR, PRIMARY_COLOR } from "../styles/variables";
import { SIDEINTERVAL } from "../common/constants";

import * as judgeVoucherActionCreators from '../common/actions/judgeVoucher';
import * as couponSelectActionCreators from '../common/actions/couponSelect';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

class CouponSelect extends React.Component {
  constructor(props) {
    super(props);

    this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  componentDidMount() {
    const {
      judgeVoucherFetch,
      products,
    } = this.props;
    judgeVoucherFetch({
      products,
    });
  }

  handlerOnPress(val) {
    const {
      couponSelectFetch,
      isAuthUser,
      navigation: { navigate, goBack },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);
    if (val.status === 0) return false;
    couponSelectFetch(val)
    goBack();
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
        <Text style={styles.title}>Choose a coupon</Text>
      </BYTouchable>
    )
  }

  renderContent() {
    const {
      items,
      navigation: { navigate },
      i18n,
      loading,
    } = this.props;

    return (
      <CouponItem data={items} onPress={this.handlerOnPress} />
    )
  }
  
  render() {
    const {
      items,
      navigation: { navigate },
      i18n,
      loading,
    } = this.props;

    if (loading) return <Loader />;
    
    return (
      <View style={styles.container} >
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        {
          items.length > 0 
          ?
          this.renderContent()
          :
          <EmptyState source={require('../images/ouhrigdfnjsoeijehr.jpg')} text={'暂无优惠券可领'} styleText={{marginBottom: 0}} />
        }
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    return (state, props) => {
      const {
        judgeVoucher,
      } = state;

      // const {

      // } = props;

      const products = props.navigation.state.params.products;

      return {
        products,
        loading: judgeVoucher.loading,
        items: judgeVoucher.items,
        isAuthUser: !!state.auth.user,
      }
    }
  },
  {
    ...judgeVoucherActionCreators,
    ...couponSelectActionCreators,
  }
)(CouponSelect));
