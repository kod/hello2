/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  // Alert,
  RefreshControl,
  // Image,
  InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';

import { getOrderItem } from '../common/selectors';
import * as queryOrderListActionCreators from '../common/actions/queryOrderList';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import ProductItem2 from '../components/ProductItem2';
import ScrollableTabView from '../components/ScrollableTabView';
import SeparateBar from '../components/SeparateBar';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';

import { BORDER_COLOR, PRIMARY_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  // APPBAR_HEIGHT,
  // STATUSBAR_HEIGHT,
  SCREENS,
} from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';
import {
  tradeStatusCodes,
  buttonTextForTradeStatusCodes,
} from '../common/helpers';

const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tab: {
    height: 40,
  },
  base: {
    flex: 1,
  },
});

const stylesScrollable = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalPrice: {
    paddingLeft: SIDEINTERVAL,
  },
  price: {
    height: 40,
    lineHeight: 40,
    textAlign: 'right',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    paddingRight: SIDEINTERVAL,
    color: '#666',
  },
  pay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    height: 50,
  },
  payButton: {
    height: 25,
    lineHeight: 25,
    fontSize: 11,
    color: PRIMARY_COLOR,
    paddingLeft: WINDOW_WIDTH * 0.05,
    paddingRight: WINDOW_WIDTH * 0.05,
    borderRadius: 14,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },
});

class Scrollable extends Component {
  handleOnPressOperate(val) {
    const {
      // i18n,
      // itemKey,
      // queryOrderListItem,
      // orderItem: { items },
      navigation: { navigate },
    } = this.props;

    switch (parseInt(val.tradeStatus, 10)) {
      case 10000:
        navigate(SCREENS.Pay, {
          tradeNo: val.tradeNo,
          orderNo: val.orderNo,
        });
        break;

      case 30001:
        navigate(SCREENS.Evalution, {
          tradeNo: val.tradeNo,
          orderNo: val.orderNo,
          brandId: val.goodList[0].brandId,
        });
        break;

      default:
        navigate(SCREENS.Pay, {
          tradeNo: val.tradeNo,
          orderNo: val.orderNo,
        });
        break;
    }
  }

  handleOnPressGoods(val) {
    const {
      navigation: { navigate },
    } = this.props;

    navigate(SCREENS.OrderDetail, {
      tradeNo: val.tradeNo,
      orderNo: val.orderNo,
    });
  }

  render() {
    // const adverstInfo = [{
    //   brandId: detailItem.brandId,
    //   propertiesIds: detailItem.propertiesIds,
    //   imageUrl: 'detailItem.imageUrls[0]',
    //   name: detailItem.name,
    //   price: detailItem.price,
    //   number: detailItem.productDetailNumber,
    // }];

    const {
      i18n,
      itemKey,
      queryOrderListItem,
      // orderItem: { items },
      // navigation: { navigate },
    } = this.props;

    const module = queryOrderListItem[itemKey];
    const { items } = module;

    if (items.length === 0 && module.loading === false)
      return (
        <EmptyState
          source={ouhrigdfnjsoeijehrJpg}
          text={i18n.noData}
          style={{ paddingTop: WINDOW_HEIGHT * 0.1 }}
        />
      );

    return (
      <View style={stylesScrollable.container}>
        {items.map(val => (
          <View style={styles.item} key={val.tradeNo}>
            <ProductItem2
              data={val.goodList}
              stylePricePrice={{ color: '#666' }}
              stylePricePeriods={{ color: '#666' }}
              isShowNumber
              onPress={() => this.handleOnPressGoods(val)}
            />
            <View style={stylesScrollable.totalPrice}>
              <Text style={stylesScrollable.price}>{`${
                i18n.subtotal
              }: ${priceFormat(val.totalAmount)} ₫`}</Text>
            </View>
            <View style={stylesScrollable.pay}>
              <Text style={stylesScrollable.payText}>
                {tradeStatusCodes(val.tradeStatus, i18n)}
              </Text>
              <Text
                style={stylesScrollable.payButton}
                onPress={() => this.handleOnPressOperate(val)}
              >
                {buttonTextForTradeStatusCodes(val.tradeStatus, i18n)}
              </Text>
            </View>
            <SeparateBar />
            <SeparateBar />
          </View>
        ))}
      </View>
    );
  }
}

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };

    this.onChangeTab = this.onChangeTab.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    // const {
    //   queryOrderListFetch,
    //   isAuthUser,
    //   navigation: { navigate },
    // } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);
    // queryOrderListFetch();

    this.onRefresh();
  }

  onRefresh(index) {
    const {
      scrollTabIndex: scrollTabIndexX,
      queryOrderListFetch,
      // queryOrderListFetch,
    } = this.props;
    const scrollTabIndex = index || scrollTabIndexX;
    switch (scrollTabIndex) {
      case 0:
        queryOrderListFetch({
          index: scrollTabIndex,
          status: '99999',
        });
        break;

      case 1:
        queryOrderListFetch({
          index: scrollTabIndex,
          status: '10000',
        });
        break;

      case 2:
        queryOrderListFetch({
          index: scrollTabIndex,
          status: '30000',
        });
        break;

      case 3:
        queryOrderListFetch({
          index: scrollTabIndex,
          status: '30001',
        });
        break;

      default:
        break;
    }

    // this.setState({ refreshing: true });
    // setTimeout(() => {
    //   this._onDataArrived();
    //   this.setState({ refreshing: false });
    // }, 1000);
  }

  onChangeTab(res) {
    const { queryOrderListIndexFetch } = this.props;
    InteractionManager.runAfterInteractions(() => {
      if (res.i !== res.from) {
        queryOrderListIndexFetch({
          scrollTabIndex: res.i,
        });
        this.onRefresh(res.i);
      }
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
      <BYTouchable
        style={stylesX.container}
        backgroundColor="transparent"
        onPress={() => this.handleOnPressToggleModal('isOpenPay')}
      >
        <Text style={stylesX.title}>{i18n.myOrder}</Text>
      </BYTouchable>
    );
  };

  render() {
    const { refreshing } = this.state;
    const {
      // navigation: { navigate },
      initIndex,
      i18n,
      queryOrderListItem,
    } = this.props;
    const scrollableTabKeys = [
      {
        tabLabel: i18n.all,
      },
      {
        tabLabel: i18n.pendingPayment,
      },
      {
        tabLabel: i18n.pendingDelivery,
      },
      {
        tabLabel: i18n.pendingEvaluation,
      },
    ];

    const content = scrollableTabKeys.map((val, key) => (
      <View tabLabel={val.tabLabel} style={styles.base} key={key}>
        {queryOrderListItem[key].loading && <Loader absolutePosition />}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <Scrollable {...this.props} itemKey={key} />
        </ScrollView>
      </View>
    ));

    return (
      <View style={styles.container}>
        <BYHeader headerTitle={this.renderHeaderTitle()} />
        <ScrollableTabView
          content={content}
          onChangeTab={this.onChangeTab}
          styleTab={styles.tab}
          initialPage={initIndex}
        />
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => (state, props) => {
      const {
        queryOrderList,
        // queryOrderList,
      } = state;
      const {
        navigation: {
          state: {
            params,
            // params,
          },
        },
      } = props;
      return {
        initIndex: params ? params.index : 0,
        orderItem: getOrderItem(state, props),
        queryOrderListItem: queryOrderList.item,
        scrollTabIndex: queryOrderList.scrollTabIndex,
        isAuthUser: !!state.login.user,
      };
    },
    {
      ...queryOrderListActionCreators,
    },
  )(Order),
);
