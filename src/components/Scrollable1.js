import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { SCREENS } from '../common/constants';
import { globalStyleVariables } from '../styles';

import SwiperFlatList from '../components/SwiperFlatList';
import BannerHomeType from '../components/BannerHomeType';
import DiscountsItem from '../components/DiscountsItem';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';
import CustomIcon from '../components/CustomIcon.js';
import ProductItem1 from "../components/ProductItem1";

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeTypeActionCreators from '../common/actions/bannerHomeType';
import * as promotionInfoActionCreators from '../common/actions/promotionInfo';
import * as mergeGetInfoActionCreators from '../common/actions/mergeGetInfo';
import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const itemIntervalWidth = globalStyleVariables.WINDOW_WIDTH * 0.04;
const itemWidth = (globalStyleVariables.WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

const styles = StyleSheet.create({
  imgNav: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  imgNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  imgNavItemImg: {
    height: 30,
    width: 30,
    marginBottom: 10
  },
  imgNavItemImgCoupon: {
    height: 32,
    width: 32,
    marginBottom: 8
  },
  imgNavItemText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center'
  },
  groupBuy: {
    position: 'relative',
    zIndex: -2,
    paddingTop: 20,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  groupBuyBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    height: itemWidth + 60,
    backgroundColor: '#fa534d',
  },
  groupBuyImageBackground: {
    height: globalStyleVariables.WINDOW_WIDTH * 0.2976,
    width: globalStyleVariables.WINDOW_WIDTH,
  },
  groupBuyTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.04,
    paddingRight: globalStyleVariables.WINDOW_WIDTH * 0.03,
    marginBottom: 20
  },
  groupBuyTitleText: {
    color: '#fff',
    fontSize: 16
  },
  groupBuyTitleRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupBuyTitleMore: {
    color: '#fff',
    fontSize: 11,
    marginRight: 1
  },
  groupBuyTitleMoreIcon: {
    color: '#fff',
    fontSize: 8,
    paddingTop: 2
  },
  groupBuyMain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.04,
    marginBottom: 20,
  },
});

class Scrollable1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerSwiperClear, bannerSwiperFetch, bannerHomeTypeFetch, promotionInfoFetch, mergeGetInfoFetch, bannerHomeRecommendFetch } = this.props;
    // bannerSwiperClear();
    bannerSwiperFetch('one');
    bannerHomeTypeFetch();
    promotionInfoFetch();
    mergeGetInfoFetch();
    bannerHomeRecommendFetch();
  }

  render() {
    const { bannerSwiper, bannerHomeType, promotionInfo, mergeGetInfo, bannerHomeRecommend, navigation: { navigate }, i18n } = this.props;

    return (
      <View>
        {/* <SwiperFlatList data={bannerSwiper} /> */}

        <View style={styles.imgNav}>
          <View style={styles.imgNavItem}>
            <Image style={styles.imgNavItemImg} source={require('../images/coupon.png')} />
            <Text style={styles.imgNavItemText}>{i18n.coupon}</Text>
          </View>
          <View style={styles.imgNavItem}>
            <Image style={styles.imgNavItemImg} source={require('../images/recharge.png')} />
            <Text style={styles.imgNavItemText}>{i18n.recharge}</Text>
          </View>
          <View style={styles.imgNavItem}>
            <Image style={[styles.imgNavItemImg, styles.imgNavItemImgCoupon]} source={require('../images/buyhelp.png')} />
            <Text style={styles.imgNavItemText}>{i18n.howToBuy}</Text>
          </View>
          <View style={styles.imgNavItem}>
            <Image style={styles.imgNavItemImg} source={require('../images/grouphelp.png')} />
            <Text style={styles.imgNavItemText}>{i18n.groupBuyHelp}</Text>
          </View>
        </View>

        <View style={styles.groupBuy}>
          <View style={styles.groupBuyBackground} >
            <Image style={styles.groupBuyImageBackground} source={require('../images/group23423.png')} />
          </View>
          <View style={styles.groupBuyTitle}>
            <Text style={styles.groupBuyTitleText}>{i18n.groupBuy}</Text>
            <View style={styles.groupBuyTitleRight}>
              <Text style={styles.groupBuyTitleMore}>{i18n.seeMore}</Text>
              <CustomIcon name="arrowright" style={styles.groupBuyTitleMoreIcon} />
            </View>
          </View>
          <View style={styles.groupBuyMain}>
            <ProductItem1 data={mergeGetInfo} />
          </View>
        </View>

        <View style={{ height: 40, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#333' }} onPress={() => navigate(SCREENS.ProductDetail)}>
            Brand on sale
          </Text>
        </View>

        <BannerHomeType data={bannerHomeType} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 10, color: '#000', fontSize: 16 }}>Big Sale</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: 2 }}>more</Text>
            <Icon name="keyboard-arrow-right" size={24} color="#ddd" style={{}} />
          </View>
        </View>

        <DiscountsItem data={promotionInfo} />

        <View style={{ height: 8, backgroundColor: '#eee' }} />

        <View style={{}}>
          <View style={{}}>
            <Text style={{ textAlign: 'center', paddingTop: 10, color: '#333', fontSize: 16 }}>Featured Events</Text>
          </View>

          <FeaturedGoodsItem data={bannerHomeRecommend} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { bannerSwiper, bannerHomeType, promotionInfo, mergeGetInfo, bannerHomeRecommend } = state;
  return {
    bannerSwiper: bannerSwiper['one'] || {},
    bannerHomeType: bannerHomeType || {},
    promotionInfo: promotionInfo || {},
    mergeGetInfo: mergeGetInfo || {},
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...bannerHomeTypeActionCreators, ...promotionInfoActionCreators, ...bannerHomeRecommendActionCreators, ...mergeGetInfoActionCreators })(Scrollable1);
