import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS, BILLMY_TABNAVIGATOR_MAP } from '../common/constants';

import { connectLocalization } from './Localization';
import Loader from './Loader';
import BillItem from './BillItem';
// import BYTouchable from './BYTouchable';
import EmptyState from './EmptyState';

// import { RED_COLOR, PRIMARY_COLOR } from '../styles/variables';

import * as getVoucherListActionCreators from '../common/actions/getVoucherList';
import * as receiveVoucherActionCreators from '../common/actions/receiveVoucher';

const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class BillMyItem extends Component {
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

  handlerOnPress(val) {
    const {
      isAuthUser,
      mainNavigation: { navigate },
      // screenProps,
      periodIndex,
    } = this.props;
    if (isAuthUser) {
      navigate(SCREENS.BillDetailOld, {
        orderNo: val.orderId,
        tradeNo: val.transactionId,
        periods: val.periods,
        periodIndex,
      });
    } else {
      navigate(SCREENS.Login);
    }
  }

  renderContent() {
    const {
      items,
      // navigation: { navigate },
      i18n,
    } = this.props;
    return (
      <ScrollView>
        <BillItem
          data={items}
          i18n={i18n}
          onPress={val => this.handlerOnPress(val)}
        />
      </ScrollView>
    );
  }

  render() {
    const {
      items,
      // navigation: { navigate },
      i18n,
      loading,
      loaded,
    } = this.props;

    return (
      <View style={styles.container}>
        {loading && <Loader absolutePosition />}
        {loaded && this.renderContent()}
        {loaded &&
          items.length === 0 && (
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
    () => (state, props) => {
      const { queryBillList, login } = state;

      const {
        navigation: {
          state: {
            routeName,
            // routeName,
          },
        },
        screenProps: { mainNavigation },
        // navigation,
      } = props;
      const periodIndex = BILLMY_TABNAVIGATOR_MAP[routeName];
      return {
        mainNavigation,
        periodIndex,
        items: queryBillList[`bill${periodIndex}`].items,
        loading: queryBillList[`bill${periodIndex}`].loading,
        loaded: queryBillList[`bill${periodIndex}`].loaded,
        isAuthUser: !!login.user,
        routeName,
      };
    },
    {
      ...getVoucherListActionCreators,
      ...receiveVoucherActionCreators,
    },
  )(BillMyItem),
);
