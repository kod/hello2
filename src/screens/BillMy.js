import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';

import BillMyTabNavigator from '../navigations/BillMyTabNavigator';

import * as getVoucherActionCreators from '../common/actions/getVoucher';
import * as receiveVoucherActionCreators from '../common/actions/receiveVoucher';
import * as queryBillListActionCreators from '../common/actions/queryBillList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class BillMy extends Component {
  constructor(props) {
    super(props);

    this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  componentDidMount() {
    const {
      isAuthUser,
      queryBillListClear,
      queryBillListFetch,
      navigation: { navigate },
    } = this.props;

    if (isAuthUser) {
      queryBillListClear();
      queryBillListFetch({
        period: 1,
      });
      queryBillListFetch({
        period: 3,
      });
      queryBillListFetch({
        period: 5,
      });
    } else {
      navigate(SCREENS.Login);
    }
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

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
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

    const { i18n } = this.props;

    return (
      <BYTouchable style={stylesX.container} backgroundColor="transparent">
        <Text style={stylesX.title}>{i18n.myCoupon}</Text>
      </BYTouchable>
    );
  };

  render() {
    const {
      // items,
      navigation,
      i18n,
      bill1,
      bill3,
      bill5,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader title={i18n.myBill} />
        <BillMyTabNavigator
          screenProps={{
            mainNavigation: navigation,
            i18n,
            bill1,
            bill3,
            bill5,
          }}
        />
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const { queryBillList, login } = state;

      return {
        bill1: queryBillList.bill1.items,
        bill3: queryBillList.bill3.items,
        bill5: queryBillList.bill5.items,
        isAuthUser: !!login.user,
      };
    },
    {
      ...getVoucherActionCreators,
      ...receiveVoucherActionCreators,
      ...queryBillListActionCreators,
    },
  )(BillMy),
);
