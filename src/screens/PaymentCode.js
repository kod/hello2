/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  Clipboard,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

import BYHeader from '../components/BYHeader';
import SmallButton from '../components/SmallButton';
import {
  BACKGROUND_COLOR_THIRD,
  BACKGROUND_COLOR_PRIMARY,
  FONT_SIZE_SIXTH,
  FONT_COLOR_FIFTH,
  FONT_SIZE_FIRST,
  FONT_COLOR_PRIMARY,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  PAYOO_STORE_MAP,
  SCREENS,
  MONETARY,
} from '../common/constants';
import { connectLocalization } from '../components/Localization';
import Loader from '../components/Loader';
import priceFormat from '../common/helpers/priceFormat';

import * as orderPayActionCreators from '../common/actions/orderPay';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_THIRD,
  },
  row1: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    marginBottom: 10,
  },
  row2: {
    backgroundColor: BACKGROUND_COLOR_PRIMARY,
    paddingTop: 20,
    marginBottom: 15,
  },
  row2Top: {
    fontSize: FONT_SIZE_SIXTH,
    color: FONT_COLOR_FIFTH,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
  },
  row2Bottom: {
    fontSize: FONT_SIZE_FIRST,
    color: FONT_COLOR_FIFTH,
    textAlign: 'center',
    marginBottom: 35,
  },
  row3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
  },
  row3Image: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 45,
    marginRight: SIDEINTERVAL,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  row4: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    marginBottom: 15,
    color: FONT_COLOR_PRIMARY,
  },
});

const icStore1 = require('../images/offlinestore/ic_store1.jpg');
const icStore2 = require('../images/offlinestore/ic_store2.jpg');
const icStore3 = require('../images/offlinestore/ic_store3.jpg');
const icStore4 = require('../images/offlinestore/ic_store4.jpg');
const icStore5 = require('../images/offlinestore/ic_store5.jpg');
const icStore6 = require('../images/offlinestore/ic_store6.jpg');
const icStore7 = require('../images/offlinestore/ic_store7.jpg');
const icStore8 = require('../images/offlinestore/ic_store8.jpg');
const icStore9 = require('../images/offlinestore/ic_store9.jpg');
const icStore10 = require('../images/offlinestore/ic_store10.jpg');
const icStore11 = require('../images/offlinestore/ic_store11.jpg');
const icStore12 = require('../images/offlinestore/ic_store12.jpg');
const icStore13 = require('../images/offlinestore/ic_store13.jpg');
const icStore14 = require('../images/offlinestore/ic_store14.jpg');
const icStore15 = require('../images/offlinestore/ic_store15.jpg');
const icStore16 = require('../images/offlinestore/ic_store16.jpg');
const icStore17 = require('../images/offlinestore/ic_store17.jpg');
const icStore18 = require('../images/offlinestore/ic_store18.jpg');

class PaymentCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        icStore1,
        icStore2,
        icStore3,
        icStore4,
        icStore5,
        icStore6,
        icStore7,
        icStore8,
        icStore9,
        icStore10,
        icStore11,
        icStore12,
        icStore13,
        icStore14,
        icStore15,
        icStore16,
        icStore17,
        icStore18,
      ],
    };
  }

  componentDidMount() {
    const {
      orderPayFetch,
      orderPayClear,
      orderno,
      tradeno,
      payway,
      payrate,
      repaymentmonth,
      payvalue,
    } = this.props;
    if (orderno && tradeno) {
      orderPayClear();
      orderPayFetch({
        orderno,
        tradeno,
        payway,
        paypassword: '',
        payrate,
        repaymentmonth,
        payvalue,
        screen: SCREENS.PaymentCode,
      });
    }
  }

  async handleOnPressCopy(val) {
    const { i18n, isAuthUser } = this.props;

    if (isAuthUser) {
      Clipboard.setString(val);
      Alert.alert(
        '',
        i18n.successfulCopy,
        [
          {
            text: i18n.confirm,
            onPress: () => {},
          },
        ],
        // { cancelable: false },
      );
    }
  }

  renderContent() {
    const { images } = this.state;
    const { i18n, code, payvalue, loaded } = this.props;

    if (loaded === false) return <Loader />;

    return (
      <ScrollView>
        <View style={styles.row1}>
          <Text style={styles.row1Left}>{i18n.payooPaymentCode}</Text>
          <SmallButton
            text={i18n.copy}
            onPress={() => this.handleOnPressCopy(code)}
          />
        </View>
        <View style={styles.row2}>
          <Text style={styles.row2Top}>{code}</Text>
          <Text style={styles.row2Bottom}>
            {`${i18n.orderAmount} ${priceFormat(payvalue)} ${MONETARY}`}
          </Text>
        </View>
        <Text
          style={styles.row4}
          onPress={() => Linking.openURL(PAYOO_STORE_MAP)}
        >
          {i18n.visitPayooStoreClickHere}
        </Text>
        <View style={styles.row3}>
          {images.map((val, key) => (
            <Image style={styles.row3Image} source={val} key={key} />
          ))}
        </View>
      </ScrollView>
    );
  }

  render() {
    const { i18n } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader title={i18n.payooPaymentCode} />
        {this.renderContent()}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => (state, props) => {
      const { orderPay, login } = state;

      const {
        navigation: {
          state: {
            params: {
              orderNo,
              tradeNo,
              payway,
              payrate,
              repaymentmonth,
              totalAmount,
              code,
            },
          },
        },
      } = props;

      return {
        orderno: orderNo,
        tradeno: tradeNo,
        payway,
        payrate,
        repaymentmonth,
        code: code || orderPay.ret,
        loaded: orderPay.loaded,
        payvalue: totalAmount,
        isAuthUser: !!login.user,
      };
    },
    {
      ...orderPayActionCreators,
    },
  )(PaymentCode),
);
