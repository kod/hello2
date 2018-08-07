import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS, WINDOW_WIDTH, COUPONMY_TABNAVIGATOR_MAP } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import Loader from '../components/Loader';
import CouponItem from "../components/CouponItem";
import BYTouchable from '../components/BYTouchable';
import EmptyState from '../components/EmptyState';

import { RED_COLOR, PRIMARY_COLOR } from '../styles/variables';
import { SIDEINTERVAL } from '../common/constants';

import * as getVoucherListActionCreators from '../common/actions/getVoucherList';
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
    const {
      routeName,
      getVoucherListFetch,
    } = this.props;

    // this.didFocusSubscription = this.props.navigation.addListener(
    //   'didFocus',
    //   payload => {
    //     getVoucherListIndexFetch(COUPONMY_TABNAVIGATOR_MAP[payload.state.routeName])
    //   }
    // );

    // getVoucherListFetch({
    //   status: COUPONMY_TABNAVIGATOR_MAP[routeName],
    // });
  }

  componentWillUnmount() {
    // this.didFocusSubscription.remove();
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
      i18n, 
      loading, 
    } = this.props;

    return (
      <View style={styles.container} >
        {loading && <Loader absolutePosition />}
        {
          items.length > 0 
          ?
          <ScrollView>
            <CouponItem data={items} />
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
        getVoucherList,
      } = state;

      const {
        navigation,
      } = props;

      const routeName = navigation.state.routeName;
      return {
        items: getVoucherList[routeName],
        loading: getVoucherList.loading,
        isAuthUser: !!state.auth.user,
        routeName,
      }
    }
  },
  {
    ...getVoucherListActionCreators,
    ...receiveVoucherActionCreators,
  }
)(Coupon));
