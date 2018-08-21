import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';

import {
  SCREENS,
  // WINDOW_WIDTH,
  // COUPONMY_TABNAVIGATOR_MAP,
  // SIDEINTERVAL,
} from '../common/constants';

import { connectLocalization } from '../components/Localization';
import Loader from '../components/Loader';
import CouponItem from '../components/CouponItem';
// import BYTouchable from '../components/BYTouchable';
import EmptyState from '../components/EmptyState';

// import { RED_COLOR, PRIMARY_COLOR } from '../styles/variables';

import * as getVoucherListActionCreators from '../common/actions/getVoucherList';
import * as receiveVoucherActionCreators from '../common/actions/receiveVoucher';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

class Coupon extends Component {
  constructor(props) {
    super(props);

    this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  // componentDidMount() {
  //   // const {
  //   //   routeName,
  //   //   getVoucherListFetch,
  //   // } = this.props;

  //   // this.didFocusSubscription = this.props.navigation.addListener(
  //   //   'didFocus',
  //   //   payload => {
  //   //     getVoucherListIndexFetch(COUPONMY_TABNAVIGATOR_MAP[payload.state.routeName])
  //   //   }
  //   // );

  //   // getVoucherListFetch({
  //   //   status: COUPONMY_TABNAVIGATOR_MAP[routeName],
  //   // });
  // }

  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }

  handlerOnPress(val) {
    const {
      receiveVoucherFetch,
      isAuthUser,
      i18n,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    if (val.status !== 1) {
      const title = val.status === 0 ? i18n.received : i18n.haveFinished;
      Alert.alert('', title, [
        {
          text: i18n.confirm,
          onPress: () => {},
        },
      ]);
      return false;
    }

    return receiveVoucherFetch({
      voucherid: val.id,
    });
  }

  // renderHeaderTitle = () => {
  //   const stylesX = StyleSheet.create({
  //     container: {
  //       flex: 1,
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       paddingRight: 40,
  //       flexDirection: 'row',
  //     },
  //     title: {
  //       fontSize: 16,
  //       color: '#333',
  //       marginRight: 5,
  //     },
  //   });
  //   return (
  //     <BYTouchable style={stylesX.container} backgroundColor="transparent">
  //       <Text style={stylesX.title}>coupon center</Text>
  //     </BYTouchable>
  //   );
  // };

  render() {
    const {
      items,
      // navigation: { navigate },
      i18n,
      loading,
    } = this.props;

    return (
      <View style={styles.container}>
        {loading && <Loader absolutePosition />}
        {items.length > 0 ? (
          <ScrollView>
            <CouponItem data={items} />
          </ScrollView>
        ) : (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={i18n.noData}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      console.log();
      return (state, props) => {
        const {
          getVoucherList,
          // getVoucherList,
        } = state;

        const {
          navigation: {
            state: {
              routeName,
              // routeName,
            },
          },
          // navigation,
        } = props;

        return {
          items: getVoucherList[routeName],
          loading: getVoucherList.loading,
          isAuthUser: !!state.login.user,
          routeName,
        };
      };
    },
    {
      ...getVoucherListActionCreators,
      ...receiveVoucherActionCreators,
    },
  )(Coupon),
);
