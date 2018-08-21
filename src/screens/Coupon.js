import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import CouponItem from '../components/CouponItem';
import BYTouchable from '../components/BYTouchable';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';

// import { RED_COLOR, PRIMARY_COLOR } from '../styles/variables';
import { SCREENS } from '../common/constants';

import * as getVoucherActionCreators from '../common/actions/getVoucher';
import * as receiveVoucherActionCreators from '../common/actions/receiveVoucher';

const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Coupon extends Component {
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
        <Text style={stylesX.title}>{i18n.discountCode}</Text>
      </BYTouchable>
    );
  };

  renderContent() {
    const {
      items,
      // navigation: { navigate },
      // i18n,
      // loading,
    } = this.props;

    return <CouponItem data={items} onPress={this.handlerOnPress} />;
  }

  render() {
    const {
      items,
      // navigation: { navigate },
      i18n,
      loading,
      receiveVoucherLoading,
    } = this.props;

    if (loading) return <Loader />;

    return (
      <View style={styles.container}>
        <BYHeader headerTitle={this.renderHeaderTitle()} />
        {receiveVoucherLoading && <Loader absolutePosition />}
        {items.length > 0 ? (
          this.renderContent()
        ) : (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={i18n.temporarilyUnableReceiveVoucher}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const {
        getVoucher,
        receiveVoucher,
        // receiveVoucher,
      } = state;

      // const {

      // } = props;

      return {
        receiveVoucherLoading: receiveVoucher.loading,
        loading: getVoucher.loading,
        items: getVoucher.items,
        isAuthUser: !!state.login.user,
      };
    },
    {
      ...getVoucherActionCreators,
      ...receiveVoucherActionCreators,
    },
  )(Coupon),
);
