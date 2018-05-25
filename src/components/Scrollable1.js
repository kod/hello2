import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SCREENS } from '../common/constants';
import { SIDEINTERVAL, WINDOW_WIDTH, RED_COLOR } from "../styles/variables";

import SwiperFlatList from '../components/SwiperFlatList';
import BannerHomeType from '../components/BannerHomeType';
import DiscountsItem from '../components/DiscountsItem';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';
import CustomIcon from '../components/CustomIcon.js';
import ProductItem1 from "../components/ProductItem1";
import ProductItem2 from "../components/ProductItem2";
import FloorTitle from "../components/FloorTitle";
import NavImg1 from "../components/NavImg1";
// import BYTextInput from "../components/BYTextInput";
// import BYTouchable from "../components/BYTouchable";

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeTypeActionCreators from '../common/actions/bannerHomeType';
import * as promotionInfoActionCreators from '../common/actions/promotionInfo';
import * as adverstInfoActionCreators from '../common/actions/adverstInfo';
import * as mergeGetInfoActionCreators from '../common/actions/mergeGetInfo';
// import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

const styles = StyleSheet.create({
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
    height: WINDOW_WIDTH * 0.2976,
    width: WINDOW_WIDTH,
  },
  groupBuyTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: SIDEINTERVAL,
    paddingRight: WINDOW_WIDTH * 0.03,
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
});

class Scrollable1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerSwiperFetch, bannerHomeTypeFetch, promotionInfoFetch, adverstInfoFetch, mergeGetInfoFetch } = this.props;
    bannerSwiperFetch('one');
    bannerHomeTypeFetch();
    promotionInfoFetch();
    adverstInfoFetch({
      type_id: '1',
    });
    adverstInfoFetch({
      type_id: '2',
    });
    adverstInfoFetch({
      type_id: '5',
    });
    mergeGetInfoFetch({
      pagesize: 20
    });
  }

  render() {
    const { bannerSwiper, bannerHomeType, promotionInfo, mergeGetInfo, adverstInfo, navigation: { navigate }, i18n } = this.props;
    const mergeGetInfoList = mergeGetInfo.items;
    const bannerSwiperList = bannerSwiper.items;

    
    const nav1Data = [
      {
        imageSource: require('../images/coupon.png'), 
        text: i18n.coupon,
      },
      {
        imageSource: require('../images/recharge.png'), 
        text: i18n.recharge,
      },
      {
        imageSource: require('../images/buyhelp.png'), 
        text: i18n.howToBuy,
        styleImg: {
          height: 32,
          width: 32,
          marginBottom: 8
        },      
      },
      {
        imageSource: require('../images/grouphelp.png'), 
        text: i18n.groupBuyHelp,
      },
    ]
    
    return (
      <View>
        {/* <SwiperFlatList data={bannerSwiperList} /> */}
        
        {/* <NavImg1 data={nav1Data} /> */}

        <View style={styles.groupBuy}>
          <View style={styles.groupBuyBackground} >
            <Image style={styles.groupBuyImageBackground} source={require('../images/group23423.png')} />
          </View>
          <View style={styles.groupBuyTitle}>
            <Text style={styles.groupBuyTitleText}>{i18n.groupBuy}</Text>
            <View style={styles.groupBuyTitleRight}>
              <Text style={styles.groupBuyTitleMore}>{i18n.more}</Text>
              <CustomIcon name="arrowright" style={styles.groupBuyTitleMoreIcon} />
            </View>
          </View>
          <ProductItem1 data={mergeGetInfoList} />
        </View>

        <FloorTitle title={`/${i18n.brandOnSale}/`} isMore={true} style={{ paddingTop: 15, backgroundColor: '#fff', }} />

        <BannerHomeType data={bannerHomeType} style={{ paddingBottom: 15 }} />

        <FloorTitle title={`/${i18n.featuredEvents}/`} isMore={false} style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1 }} />

        <ProductItem2 data={adverstInfo} />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { bannerSwiper, bannerHomeType, promotionInfo, adverstInfo, mergeGetInfo } = state;
  return {
    bannerSwiper: bannerSwiper['one'] || {},
    bannerHomeType: bannerHomeType || {},
    promotionInfo: promotionInfo || {},
    adverstInfo: adverstInfo || {},
    mergeGetInfo: mergeGetInfo || {},
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...bannerHomeTypeActionCreators, ...promotionInfoActionCreators, ...mergeGetInfoActionCreators, ...adverstInfoActionCreators })(Scrollable1);
