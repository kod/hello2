import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, RefreshControl, Image, InteractionManager, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from '../common/constants';
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
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';
import { tradeStatusCodes, buttonTextForTradeStatusCodes } from '../common/helpers';

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

class Scrollable extends React.Component {  

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
      itemKey,
      queryOrderListItem,
      // orderItem: { items },
      navigation: { navigate },
    } = this.props;
    const module = queryOrderListItem[itemKey];
    const items = module.items;

    if (items.length === 0 && module.loading === false) return (
      <EmptyState source={require('../images/ouhrigdfnjsoeijehr.jpg')} text={'暂无相关订单'} style={{ paddingTop: WINDOW_HEIGHT * 0.1 }} />
    ) 

    return (
      <View style={stylesScrollable.container}>
        {
          items.map((val, key) => {
            return (
              <View style={styles.item} key={key}>
                <ProductItem2 
                  data={val.goodList}
                  stylePricePrice={{ color: '#fff' }}
                  stylePricePeriods={{ color: '#fff' }}
                  isShowNumber={true}
                />
                <View style={stylesScrollable.totalPrice}>
                  <Text style={stylesScrollable.price}>total: {priceFormat(val.totalAmount)} ₫</Text>
                </View>
                <View style={stylesScrollable.pay}>
                  <Text style={stylesScrollable.payText}>{tradeStatusCodes(val.tradeStatus)}</Text>
                  <Text 
                    style={stylesScrollable.payButton} 
                    onPress={() => navigate(SCREENS.Pay, { tradeNo: val.tradeNo, orderNo: val.orderNo, })}
                  >
                    {buttonTextForTradeStatusCodes(val.tradeStatus)}
                  </Text>
                </View>
                <SeparateBar />
                <SeparateBar />
              </View>
            )
          })
        }
      </View>
    )
  }
}

class Order extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      refreshing: false
    };

    this.onChangeTab = this.onChangeTab.bind(this);
  }

  componentDidMount() {
    const {
      queryOrderListFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);
    // queryOrderListFetch();

   this._onRefresh();
  }

  _onRefresh(index) {
    const { 
      // scrollTabIndex,
      queryOrderListFetch,
     } = this.props;
    const scrollTabIndex = index || this.props.scrollTabIndex;
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
        this._onRefresh(res.i);
      }
    });
  }

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
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
    return (
      <BYTouchable 
        style={styles.container}
        backgroundColor="transparent"
        onPress={() => this.handleOnPressToggleModal('isOpenPay')}
      >
        <Text style={styles.title}>my order</Text>
      </BYTouchable>
    )
  }

  render() {
    const {
      navigation: { navigate },
      initIndex,
      i18n,
    } = this.props;
    const scrollableTabKeys = [
      {
        tabLabel: 'ALL',
      },
      {
        tabLabel: 'Pending payment',
      },
      {
        tabLabel: 'Pending delivery',
      },
      {
        tabLabel: 'Pending evaluation',
      }
    ];

    const content = scrollableTabKeys.map((val, key) => {
      return (
        <View tabLabel={val.tabLabel} style={styles.base} key={key}>
          {this.props.queryOrderListItem[key].loading && <Loader absolutePosition />}
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>
            <Scrollable {...this.props} itemKey={key} />
          </ScrollView>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
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
    () => {
      return (state, props) => {
        const {
          queryOrderList,
        } = state;
        return {
          initIndex: props.navigation.state.params ? props.navigation.state.params.index : 0,
          orderItem: getOrderItem(state, props),
          queryOrderListItem: queryOrderList.item,
          scrollTabIndex: queryOrderList.scrollTabIndex,
          isAuthUser: !!state.auth.user,
        }
      }
    },
    {
      ...queryOrderListActionCreators,
    }
  )(Order),
);
