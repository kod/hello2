import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import { billStatusCodes } from '../common/helpers';
// import SeparateBar from '../components/SeparateBar';

import {
  // PRIMARY_COLOR,
  FONT_SIZE_THIRD,
  FONT_COLOR_SECOND,
  FONT_COLOR_FIRST,
  FONT_SIZE_FIRST,
  BORDER_COLOR_FIRST,
  FONT_COLOR_THIRD,
  BACKGROUND_COLOR_SECOND,
  FONT_SIZE_SECOND,
  FONT_COLOR_FOURTH,
  FONT_COLOR_SIXTH,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  SCREENS,
  MONETARY,
  MODAL_TYPES,
} from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';

import * as getBillDetailActionCreators from '../common/actions/getBillDetail';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const stylesX = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: BORDER_COLOR_FIRST,
    borderBottomWidth: 1,
  },
  itemLeft: {
    width: WINDOW_WIDTH * 0.1,
    color: FONT_COLOR_FIRST,
    textAlign: 'center',
    fontSize: FONT_SIZE_THIRD,
  },
  itemMiddle: {
    flex: 1,
  },
  itemMiddleTop: {
    color: FONT_COLOR_FIRST,
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  itemMiddleBottom: {
    flexDirection: 'row',
  },
  itemMiddleBottomLeft: {
    flex: 1,
    fontSize: FONT_SIZE_THIRD,
    color: FONT_COLOR_THIRD,
  },
  itemMiddleBottomRight: {
    flex: 1,
    fontSize: FONT_SIZE_FIRST,
    color: FONT_COLOR_THIRD,
    textAlign: 'right',
    paddingTop: 5,
  },
  itemRight: {
    width: WINDOW_WIDTH * 0.1,
    color: FONT_COLOR_SECOND,
    fontSize: FONT_SIZE_THIRD,
    textAlign: 'center',
  },
  main: {
    backgroundColor: BACKGROUND_COLOR_SECOND,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  mainLeft: {
    flex: 1,
    paddingLeft: SIDEINTERVAL,
  },
  mainLeftTop: {
    color: FONT_COLOR_FIRST,
    marginBottom: 5,
  },
  mainLeftBottom: {
    color: FONT_COLOR_THIRD,
    fontSize: FONT_SIZE_SECOND,
  },
  mainRight: {
    width: WINDOW_WIDTH * 0.1,
    color: FONT_COLOR_FIRST,
    textAlign: 'center',
  },
  itemPrice: {},
  itemAlready: {
    color: FONT_COLOR_FOURTH,
  },
  itemOverdue: {
    color: FONT_COLOR_SIXTH,
  },
});

class StagingDetails extends Component {
  componentDidMount() {
    const {
      getBillDetailFetch,
      isAuthUser,
      navigation: { navigate },
      // openModal,
      tradeno,
      orderno,
    } = this.props;
    if (!isAuthUser) {
      navigate(SCREENS.Login);
    } else {
      getBillDetailFetch({
        tradeno,
        orderno,
      });
    }
  }

  getStyleForStatus(status) {
    switch (status) {
      case 10001:
        // 未还清
        return {};
      case 10002:
        // 已还清
        return stylesX.itemAlready;
      case 10007:
        // 逾期
        return stylesX.itemOverdue;

      default:
        return {};
    }
  }

  renderContent() {
    const {
      items,
      i18n,
      productName,
      createDate,
      orderno,
      tradeno,
      openModal,
      navigation: { navigate },
    } = this.props;

    return (
      <View style={stylesX.container}>
        <BYTouchable
          style={stylesX.main}
          onPress={() =>
            navigate(SCREENS.OrderDetail, {
              tradeNo: tradeno,
              orderNo: orderno,
            })
          }
        >
          <View style={stylesX.mainLeft}>
            <Text style={stylesX.mainLeftTop}>{productName}</Text>
            <Text style={stylesX.mainLeftBottom}>
              {`${i18n.orderTime}: ${moment(createDate).format('DD-MM-YYYY')}`}
            </Text>
          </View>
          <Ionicons style={stylesX.mainRight} name="ios-arrow-forward" />
        </BYTouchable>
        {items.map(val => (
          <BYTouchable
            style={stylesX.item}
            key={val.id}
            onPress={() =>
              openModal(MODAL_TYPES.STAGINGDETAILS, {
                periods: val.periods,
                status: val.status,
                interest: val.interest,
                principal: val.principal,
                expireDate: val.expireDate,
              })
            }
          >
            <Entypo
              style={[stylesX.itemLeft, this.getStyleForStatus(val.status)]}
              name="dot-single"
            />
            <View style={stylesX.itemMiddle}>
              <Text
                style={[
                  stylesX.itemMiddleTop,
                  this.getStyleForStatus(val.status),
                ]}
              >
                {`${val.periods} ${i18n.period}`}
              </Text>
              <Text
                style={[
                  stylesX.itemMiddleBottom,
                  this.getStyleForStatus(val.status),
                ]}
              >
                {billStatusCodes(val.status, i18n)}
              </Text>
            </View>
            <Text style={stylesX.itemPrice}>
              {`${priceFormat(val.interest + val.principal)} ${MONETARY}`}
            </Text>
            <Ionicons style={stylesX.itemRight} name="ios-arrow-forward" />
          </BYTouchable>
        ))}
      </View>
    );
  }

  render() {
    const {
      // navigation: { goBack },
      i18n,
      // billDetailsItem,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader title={i18n.stagingDetails} />
        <ScrollView>{this.renderContent()}</ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => (state, props) => {
      const { getBillDetail, bill } = state;
      const {
        navigation: {
          state: {
            params: { tradeno, orderno, productName, createDate },
          },
        },
      } = props;
      return {
        isAuthUser: !!state.login.user,
        tradeno,
        orderno,
        productName,
        createDate,
        items: getBillDetail.items,
        activeMonth: bill.activeMonth,
      };
    },
    {
      ...getBillDetailActionCreators,
      ...modalActionCreators,
    },
  )(StagingDetails),
);
