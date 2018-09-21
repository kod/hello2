/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import { WINDOW_WIDTH, SIDEINTERVAL, MONETARY } from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';

import {
  BACKGROUND_COLOR_SECOND,
  BACKGROUND_COLOR_THIRD,
  FONT_COLOR_PRIMARY,
} from '../styles/variables';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR_SECOND,
  },
  item: {
    marginBottom: 10,
    backgroundColor: BACKGROUND_COLOR_THIRD,
  },
  itemRow1: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: 10,
    paddingBottom: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  itemRow2: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: BACKGROUND_COLOR_SECOND,
  },
  itemRow2Text: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemRow3: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemRow3Button: {
    height: 30,
    lineHeight: 30,
    width: 100,
    fontSize: 11,
    color: FONT_COLOR_PRIMARY,
    paddingLeft: WINDOW_WIDTH * 0.05,
    paddingRight: WINDOW_WIDTH * 0.05,
    marginLeft: SIDEINTERVAL,
    borderRadius: 14,
    borderColor: FONT_COLOR_PRIMARY,
    borderWidth: 1,
    textAlign: 'center',
  },
});

class BillItem extends Component {
  render() {
    const { i18n, data, onPress = () => {}, ...restProps } = this.props;

    return (
      <View style={[styles.container]} {...restProps}>
        {data.map((val, key) => (
          <View style={styles.item} key={key}>
            <Text style={styles.itemRow1}>
              {`${i18n.orderNumber}: ${val.orderId}`}
            </Text>
            <View style={styles.itemRow2}>
              <Text style={styles.itemRow2Text}>
                {`${i18n.repaymentPeriod}: ${val.periods}`}
              </Text>
              <Text style={styles.itemRow2Text}>
                {`${i18n.repaymentAmount}: ${priceFormat(
                  val.interest + val.principal,
                )} ${MONETARY}`}
              </Text>
            </View>
            <View style={styles.itemRow3}>
              <Text style={styles.itemRow3Button} onPress={() => onPress(val)}>
                {i18n.seeDetails}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

export default withNavigation(BillItem);
