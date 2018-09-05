import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';

import {
  PRIMARY_COLOR,
  FONT_SIZE_THIRD,
  FONT_COLOR_SECOND,
  FONT_COLOR_FIRST,
  FONT_SIZE_FIRST,
  BORDER_COLOR_FIRST,
  FONT_COLOR_THIRD,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  STATUSBAR_HEIGHT,
  APPBAR_HEIGHT,
  SCREENS,
  MONETARY,
} from '../common/constants';

import * as searchMonthDetailActionCreators from '../common/actions/searchMonthDetail';
import Loader from '../components/Loader';
import priceFormat from '../common/helpers/priceFormat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: PRIMARY_COLOR,
  },
  headerBack: {
    height: APPBAR_HEIGHT,
    lineHeight: APPBAR_HEIGHT,
    paddingLeft: WINDOW_WIDTH * 0.03,
    paddingRight: SIDEINTERVAL,
    fontSize: 15,
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    // backgroundColor: '#ff0',
    flex: 1,
    paddingRight: 40,
  },
});

class BillDetail extends Component {
  componentDidMount() {
    const {
      searchMonthDetailFetch,
      isAuthUser,
      expireDate,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) {
      navigate(SCREENS.Login);
    } else {
      searchMonthDetailFetch({
        expiredate: expireDate,
      });
    }
  }

  renderContent() {
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
    });

    const {
      loaded,
      items,
      navigation: { navigate },
    } = this.props;

    if (loaded === false) return <Loader />;

    return (
      <ScrollView>
        <View style={stylesX.container}>
          {items.map((val, index) => (
            <BYTouchable
              style={stylesX.item}
              key={val.billId}
              onPress={() =>
                navigate(SCREENS.StagingDetails, {
                  orderno: val.orderNo,
                  tradeno: val.tradeNo,
                  productName: val.productName,
                  createDate: val.createDate,
                })
              }
            >
              <Text style={stylesX.itemLeft}>{index + 1}</Text>
              <View style={stylesX.itemMiddle}>
                <Text style={stylesX.itemMiddleTop} numberOfLines={2}>
                  {`[${val.currPeriod}/${val.totalPeriod}] ${val.productName}`}
                </Text>
                <View style={stylesX.itemMiddleBottom}>
                  <Text style={stylesX.itemMiddleBottomLeft}>
                    {`${priceFormat(val.amount)} ${MONETARY}`}
                  </Text>
                  <Text style={stylesX.itemMiddleBottomRight}>
                    {moment(val.createDate).format('DD-MM-YYYY')}
                  </Text>
                </View>
              </View>
              <Ionicons style={stylesX.itemRight} name="ios-arrow-forward" />
            </BYTouchable>
          ))}
        </View>
      </ScrollView>
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
        <BYHeader title={i18n.billingDetails} />
        {this.renderContent()}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => (state, props) => {
      const { searchMonthDetail, login } = state;
      const { navigation } = props;
      return {
        isAuthUser: !!login.user,
        expireDate: navigation.state.params.expireDate,
        items: searchMonthDetail.items,
        loaded: searchMonthDetail.loaded,
      };
    },
    {
      ...searchMonthDetailActionCreators,
    },
  )(BillDetail),
);
