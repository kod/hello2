import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import { connect } from 'react-redux';
// import { withNavigation } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import BYTouchable from './BYTouchable';
import { connectLocalization } from './Localization';
import { addressJoin } from '../common/helpers';
// import { RED_COLOR, PRIMARY_COLOR } from '../styles/variables';
import { SIDEINTERVAL } from '../common/constants';

// import * as cartActionCreators from '../common/actions/cart';

const styles = StyleSheet.create({
  address: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  addressLeft: {
    flex: 1,
  },
  addressTips: {
    flex: 1,
    height: 40,
    lineHeight: 40,
  },
  addressTop: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  addressName: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  addressText: {
    fontSize: 11,
    color: '#666',
  },
  addressPhone: {
    fontSize: 14,
    color: '#333',
  },
  addressRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressPin: {
    color: '#999',
    fontSize: 18,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  addressForward: {
    color: '#999',
    fontSize: 16,
  },
});

class ProductItem2 extends Component {
  render() {
    const { addressSelectedItem, onPress, i18n, ...restProps } = this.props;

    return (
      <BYTouchable style={styles.address} onPress={onPress} {...restProps}>
        {addressSelectedItem.id > 0 ? (
          <View style={styles.addressLeft}>
            <View style={styles.addressTop}>
              <Text style={styles.addressName}>
                {addressSelectedItem.username}
              </Text>
              <Text style={styles.addressPhone}>
                {addressSelectedItem.msisdn}
              </Text>
            </View>
            <Text style={styles.addressText}>
              {addressJoin(addressSelectedItem)}
            </Text>
          </View>
        ) : (
          <Text style={styles.addressTips}>
            {i18n.pleaseSelectShippingAddress}
          </Text>
        )}
        <View style={styles.addressRight}>
          <Ionicons name="ios-pin-outline" style={styles.addressPin} />
          {onPress && (
            <Ionicons name="ios-arrow-forward" style={styles.addressForward} />
          )}
        </View>
      </BYTouchable>
    );
  }
}

export default connectLocalization(ProductItem2);
