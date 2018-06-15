import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, RefreshControl, Image, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import BYTouchable from "../components/BYTouchable";
import ProductItem2 from "../components/ProductItem2";
import ScrollableTabView from '../components/ScrollableTabView';
import SeparateBar from '../components/SeparateBar';
import { SIDEINTERVAL, RED_COLOR, PRIMARY_COLOR, WINDOW_WIDTH } from "../styles/variables";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

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
  totalPrice: {
    paddingLeft: SIDEINTERVAL,
  },
  price: {
    height: 40,
    lineHeight: 40,
    textAlign: 'right',
    borderBottomColor: '#f5f5f5',
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

    return (
      <View style={stylesScrollable.container} >
        {/* <ProductItem2 
          data={adverstInfo}
          stylePricePrice={{ color: '#666' }}
          isShowNumber={true}
        /> */}
        <View style={stylesScrollable.totalPrice} >
          <Text style={stylesScrollable.price} >total: 1.082.500 VND</Text>
        </View>
        <View style={stylesScrollable.pay} >
          <Text style={stylesScrollable.payText} >Pending payment</Text>
          <Text style={stylesScrollable.payButton} >Pay</Text>
        </View>
        <SeparateBar />
        <SeparateBar />
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
  }

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  _onRefresh() {
    // const { 
    //   scrollTabIndex,
    //   bannerSwiperFetch,
    //   bannerHomeTypeFetch,
    //   promotionInfoFetch,
    //   adverstInfoFetch,
    //   mergeGetInfoFetch,
    //   adPhoneFetch,
    //   topComputerFetch,
    //   newComputerFetch,
    //   adDigitalFetch,
    //  } = this.props;
    // switch (scrollTabIndex) {
    //   case 0:
    //     bannerSwiperFetch('one');
    //     bannerHomeTypeFetch();
    //     promotionInfoFetch();
    //     adverstInfoFetch({
    //       type_id: '1'
    //     });
    //     adverstInfoFetch({
    //       type_id: '2'
    //     });
    //     adverstInfoFetch({
    //       type_id: '5'
    //     });
    //     mergeGetInfoFetch();

    //     break;

    //   case 1:
    //     bannerSwiperFetch('two');
    //     adPhoneFetch();

    //     break;

    //   case 2:
    //     topComputerFetch();
    //     newComputerFetch();
  
    //     break;

    //   case 3:
    //     bannerSwiperFetch('four');
    //     adDigitalFetch();
    //     break;

    //   default:
    //     break;
    // }

    // this.setState({ refreshing: true });
    // setTimeout(() => {
    //   this._onDataArrived();
    //   this.setState({ refreshing: false });
    // }, 1000);
  }

  onChangeTab(res) {
    // const { scrollableTabViewIndex, scrollTabIndex } = this.props;
    // if (res.i !== res.from) scrollableTabViewIndex(res.i);
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
        backgroundColor={'transparent'} 
        onPress={() => this.handleOnPressToggleModal('isOpenPay')}
      >
        <Text style={styles.title}>my order</Text>
      </BYTouchable>
    )
  }

  render() {
    const {
      bannerHomeRecommend,
      navigation: { navigate },
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
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>
            <Scrollable {...this.props} />
          </ScrollView>
        </View>
      );
    });

    return (
      <View style={styles.container} >
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        <ScrollableTabView content={content} onChangeTab={this.onChangeTab} styleTab={styles.tab} />
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  const { bannerHomeRecommend } = state;
  return {
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connectLocalization(
  connect(mapStateToProps, { ...bannerHomeRecommendActionCreators, })(Order)
);
