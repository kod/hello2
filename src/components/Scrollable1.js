import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  // Image,
} from 'react-native';
import { connect } from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  // HTML_REGEX,
  SIDEINTERVAL,
  SCREENS,
} from '../common/constants';

import SwiperFlatList from './SwiperFlatList';
import BannerHomeType from './BannerHomeType';
// import FeaturedGoodsItem from './FeaturedGoodsItem';
// import CustomIcon from './CustomIcon';
// import ProductItem1 from './ProductItem1';
// import ProductItem2 from './ProductItem2';
import ProductItem4 from './ProductItem4';
import ProductItem5 from './ProductItem5';
import FloorTitle from './FloorTitle';
import NavImg1 from './NavImg1';
import SeparateBar from './SeparateBar';
import PhoneAdBaner from './PhoneAdBaner';
import { analyzeUrlNavigate } from '../common/helpers';

import { BORDER_COLOR, RED_COLOR } from '../styles/variables';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeTypeActionCreators from '../common/actions/bannerHomeType';
import * as promotionInfoActionCreators from '../common/actions/promotionInfo';
import * as adverstInfoActionCreators from '../common/actions/adverstInfo';
import * as mergeGetInfoActionCreators from '../common/actions/mergeGetInfo';
import * as getSquaresInfoActionCreators from '../common/actions/getSquaresInfo';
import * as getNewestInfoActionCreators from '../common/actions/getNewestInfo';
import * as getAdverstTopInfoActionCreators from '../common/actions/getAdverstTopInfo';

// const itemIntervalWidth = SIDEINTERVAL;
// const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

const styles = StyleSheet.create({
  // groupBuy: {
  //   position: 'relative',
  //   zIndex: -2,
  //   paddingTop: 20,
  //   backgroundColor: '#fff',
  //   marginBottom: 5,
  // },
  // groupBuyBackground: {
  //   position: 'absolute',
  //   top: 0,
  //   right: 0,
  //   left: 0,
  //   zIndex: -1,
  //   height: itemWidth + 60,
  //   backgroundColor: '#fa534d',
  // },
  // groupBuyImageBackground: {
  //   height: WINDOW_WIDTH * 0.2976,
  //   width: WINDOW_WIDTH,
  // },
  // groupBuyTitle: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingLeft: SIDEINTERVAL,
  //   paddingRight: WINDOW_WIDTH * 0.03,
  //   marginBottom: 20
  // },
  // groupBuyTitleText: {
  //   color: '#fff',
  //   fontSize: 16
  // },
  // groupBuyTitleRight: {
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // },
  // groupBuyTitleMore: {
  //   color: '#fff',
  //   fontSize: 11,
  //   marginRight: 1
  // },
  // groupBuyTitleMoreIcon: {
  //   color: '#fff',
  //   fontSize: 8,
  //   paddingTop: 2
  // },
  hotTittle: {
    color: RED_COLOR,
    paddingLeft: SIDEINTERVAL,
    paddingTop: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL,
    backgroundColor: '#fff',
  },
});

class Scrollable1 extends Component {
  constructor(props) {
    super(props);
    this.handleOnBannerHomeType = this.handleOnBannerHomeType.bind(this);
  }

  componentDidMount() {
    const {
      bannerSwiperFetch,
      getAdverstTopInfoFetch,
      bannerHomeTypeFetch,
      promotionInfoFetch,
      adverstInfoFetch,
      getSquaresInfoFetch,
      getNewestInfoFetch,
      // mergeGetInfoFetch,
    } = this.props;
    getNewestInfoFetch();
    getAdverstTopInfoFetch();
    bannerSwiperFetch('one');
    bannerHomeTypeFetch();
    promotionInfoFetch();
    getSquaresInfoFetch();
    adverstInfoFetch({
      type_id: '1',
    });
    adverstInfoFetch({
      type_id: '2',
    });
    adverstInfoFetch({
      type_id: '5',
    });
    // mergeGetInfoFetch({
    //   pagesize: 4
    // });
  }

  handleOnBannerHomeType(val) {
    const {
      navigation: { navigate },
    } = this.props;
    navigate(SCREENS.CateList, {
      parent_id: '0',
      classfy_id: val.classfyId || '0',
      sub_classfy_id: val.subClassfyId || '0',
      third_classfy_id: val.thirdClassfyId || '0',
    });
  }

  render() {
    const {
      isAuthUser,
      bannerSwiper,
      getAdverstTopInfoItems,
      bannerHomeType,
      // promotionInfo,
      // mergeGetInfo,
      adverstInfo,
      navigation,
      // navigation: { navigate },
      i18n,
      getSquaresInfoItems,
      getNewestInfoItems,
    } = this.props;
    // const mergeGetInfoList = mergeGetInfo.items;
    const bannerSwiperList = bannerSwiper.items;
    const adverstInfoList = adverstInfo.items;
    return (
      <View>
        {getAdverstTopInfoItems &&
          getAdverstTopInfoItems.length > 0 && (
            <SwiperFlatList data={getAdverstTopInfoItems} />
          )}

        <NavImg1
          data={getSquaresInfoItems}
          style={{ paddingTop: 5, paddingBottom: 5 }}
          onPress={analyzeUrlNavigate}
          navigation={navigation}
          isAuthUser={isAuthUser}
          i18n={i18n}
        />

        <SeparateBar />
        {/* <SeparateBar /> */}

        <Text style={styles.hotTittle}>{i18n.hotNewProduct}</Text>
        <ProductItem5
          data={getNewestInfoItems}
          style={{ backgroundColor: '#fff' }}
        />
        <SeparateBar />

        <PhoneAdBaner data={bannerSwiperList} />

        {/* 暂时屏蔽拼单功能 */}
        {/* <View style={styles.groupBuy}>
          <View style={styles.groupBuyBackground}>
            <Image style={styles.groupBuyImageBackground} source={require('../images/group23423.png')} />
          </View>
          <View style={styles.groupBuyTitle}>
            <Text style={styles.groupBuyTitleText}>{i18n.groupBuy}</Text>
            <View style={styles.groupBuyTitleRight}>
              <Text style={styles.groupBuyTitleMore} onPress={() => navigate(SCREENS.GroupBuyList)}>{i18n.more}</Text>
              <Ionicons name="ios-arrow-forward" style={styles.groupBuyTitleMoreIcon} />
            </View>
          </View>
          <ProductItem4 data={mergeGetInfoList} groupon={true} />
        </View> */}

        <FloorTitle
          title={`- ${i18n.brandOnSale} -`}
          isMore={false}
          style={{ paddingTop: 0, backgroundColor: '#fff' }}
        />

        <BannerHomeType
          data={bannerHomeType}
          style={{ paddingBottom: 15 }}
          callback={this.handleOnBannerHomeType}
        />

        <FloorTitle
          title={`- ${i18n.featuredEvents} -`}
          isMore={false}
          style={{ borderBottomColor: BORDER_COLOR, borderBottomWidth: 1 }}
        />

        {/* <ProductItem2 data={adverstInfoList} /> */}
        <ProductItem4
          data={adverstInfoList}
          style={{ backgroundColor: '#fff' }}
        />
      </View>
    );
  }
}

export default connect(
  state => {
    const {
      bannerSwiper,
      getAdverstTopInfo,
      bannerHomeType,
      promotionInfo,
      adverstInfo,
      mergeGetInfo,
      getSquaresInfo,
      getNewestInfo,
      login,
    } = state;

    // const {

    // } = props;

    return {
      getNewestInfoItems: getNewestInfo.items,
      bannerSwiper: bannerSwiper.one || {},
      getAdverstTopInfoItems: getAdverstTopInfo.items,
      bannerHomeType: bannerHomeType || {},
      promotionInfo: promotionInfo || {},
      adverstInfo: adverstInfo || {},
      mergeGetInfo: mergeGetInfo || {},
      getSquaresInfoItems: getSquaresInfo.items,
      isAuthUser: !!login.user,
    };
  },
  {
    ...bannerSwiperActionCreators,
    ...bannerHomeTypeActionCreators,
    ...promotionInfoActionCreators,
    ...mergeGetInfoActionCreators,
    ...adverstInfoActionCreators,
    ...getSquaresInfoActionCreators,
    ...getNewestInfoActionCreators,
    ...getAdverstTopInfoActionCreators,
  },
)(Scrollable1);
