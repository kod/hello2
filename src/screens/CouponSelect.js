import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import CouponItem from '../components/CouponItem';
import BYTouchable from '../components/BYTouchable';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';

// import { RED_COLOR, PRIMARY_COLOR } from '../styles/variables';

import * as judgeVoucherActionCreators from '../common/actions/judgeVoucher';
import * as couponSelectActionCreators from '../common/actions/couponSelect';

const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class CouponSelect extends Component {
  constructor(props) {
    super(props);

    this.handlerOnPress = this.handlerOnPress.bind(this);
  }

  componentDidMount() {
    const {
      judgeVoucherFetch,
      products,
      // products,
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
    couponSelectFetch(val);
    return goBack();
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
        <Text style={stylesX.title}>{i18n.chooseCoupon}</Text>
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
    } = this.props;

    if (loading) return <Loader />;

    return (
      <View style={styles.container}>
        <BYHeader headerTitle={this.renderHeaderTitle()} />
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
    () => (state, props) => {
      const {
        judgeVoucher,
        // judgeVoucher,
      } = state;

      const {
        navigation: {
          state: {
            params: { products },
          },
        },
      } = props;

      // const products = props.navigation.state.params.products;

      return {
        products,
        loading: judgeVoucher.loading,
        items: judgeVoucher.items,
        isAuthUser: !!state.login.user,
      };
    },
    {
      ...judgeVoucherActionCreators,
      ...couponSelectActionCreators,
    },
  )(CouponSelect),
);
