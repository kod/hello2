import React, { Component } from 'react';
import {
  // StyleSheet,
  View,
  // Text,
  // Image,
} from 'react-native';
import { connect } from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import { RED_COLOR } from '../styles/variables';

import {
  HTML_REGEX,
  BRANDID_REGEX,
  CLASSIFYID_REGEX,
  SUBCLASSFYID_REGEX,
  THIRDCLASSFYID_REGEX,
  SCREENS,
} from '../common/constants';

import SwiperFlatList from './SwiperFlatList';
import BannerHomeType from './BannerHomeType';
// import DiscountsItem from './DiscountsItem';
// import FeaturedGoodsItem from './FeaturedGoodsItem';
// import CustomIcon from './CustomIcon';
// import ProductItem1 from './ProductItem1';
import ProductItem2 from './ProductItem2';
import FloorTitle from './FloorTitle';
import NavImg1 from './NavImg1';
import SeparateBar from './SeparateBar';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeTypeActionCreators from '../common/actions/bannerHomeType';
import * as promotionInfoActionCreators from '../common/actions/promotionInfo';
import * as adverstInfoActionCreators from '../common/actions/adverstInfo';
import * as mergeGetInfoActionCreators from '../common/actions/mergeGetInfo';
import * as getSquaresInfoActionCreators from '../common/actions/getSquaresInfo';

import { BORDER_COLOR } from '../styles/variables';

// const itemIntervalWidth = SIDEINTERVAL;
// const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

// const styles = StyleSheet.create({
//   groupBuy: {
//     position: 'relative',
//     zIndex: -2,
//     paddingTop: 20,
//     backgroundColor: '#fff',
//     marginBottom: 5,
//   },
//   groupBuyBackground: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     left: 0,
//     zIndex: -1,
//     height: itemWidth + 60,
//     backgroundColor: '#fa534d',
//   },
//   groupBuyImageBackground: {
//     height: WINDOW_WIDTH * 0.2976,
//     width: WINDOW_WIDTH,
//   },
//   groupBuyTitle: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: SIDEINTERVAL,
//     paddingRight: WINDOW_WIDTH * 0.03,
//     marginBottom: 20
//   },
//   groupBuyTitleText: {
//     color: '#fff',
//     fontSize: 16
//   },
//   groupBuyTitleRight: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   groupBuyTitleMore: {
//     color: '#fff',
//     fontSize: 11,
//     marginRight: 1
//   },
//   groupBuyTitleMoreIcon: {
//     color: '#fff',
//     fontSize: 8,
//     paddingTop: 2
//   },
// });

class Scrollable1 extends Component {
  constructor(props) {
    super(props);
    this.handleOnPressNavImg1 = this.handleOnPressNavImg1.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   const { adverstInfo } = this.props;
  //   const { adverstInfo: prevAdverstInfo } = nextProps;
  //   // const { isBookmark } = this.state;
  //   console.log(this.props);
  //   console.log(nextProps);
  //   console.log('==========');
  //   console.log(adverstInfo);
  //   console.log(prevAdverstInfo);
  // }

  componentDidMount() {
    const {
      bannerSwiperFetch,
      bannerHomeTypeFetch,
      promotionInfoFetch,
      adverstInfoFetch,
      getSquaresInfoFetch,
      // mergeGetInfoFetch,
    } = this.props;
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

  navImg1More(linkUrl) {
    const {
      navigation: { navigate },
    } = this.props;
    const brandIdRegexResult = linkUrl.match(BRANDID_REGEX);
    const classifyIdRegexResult = linkUrl.match(CLASSIFYID_REGEX);
    const subClassfyIdRegexResult = linkUrl.match(SUBCLASSFYID_REGEX);
    const thirdClassfyIdRegexResult = linkUrl.match(THIRDCLASSFYID_REGEX);
    navigate(SCREENS.CateList, {
      parent_id: brandIdRegexResult ? brandIdRegexResult[1] : '0',
      classfy_id: classifyIdRegexResult ? classifyIdRegexResult[1] : '0',
      sub_classfy_id: subClassfyIdRegexResult
        ? subClassfyIdRegexResult[1]
        : '0',
      third_classfy_id: thirdClassfyIdRegexResult
        ? thirdClassfyIdRegexResult[1]
        : '0',
    });
  }

  handleOnPressNavImg1(val) {
    const {
      navigation: { navigate },
    } = this.props;
    const { linkUrl } = val;
    const htmlRegexResult = linkUrl.match(HTML_REGEX);
    switch (htmlRegexResult[1]) {
      case 'more':
        this.navImg1More(linkUrl);
        break;

      case 'order':
        navigate(SCREENS.Order, { index: 0 });
        break;

      case 'couponcenter':
        navigate(SCREENS.CouponMy);
        break;

      case 'prepaid':
        navigate(SCREENS.Prepaid);
        break;

      default:
        console.warn('error');
        break;
    }
  }

  render() {
    const {
      bannerSwiper,
      bannerHomeType,
      // promotionInfo,
      // mergeGetInfo,
      adverstInfo,
      // navigation: { navigate },
      i18n,
      getSquaresInfoItems,
    } = this.props;
    // const mergeGetInfoList = mergeGetInfo.items;
    const bannerSwiperList = bannerSwiper.items;
    const adverstInfoList = adverstInfo.items;

    return (
      <View>
        {bannerSwiperList &&
          bannerSwiperList.length > 0 && (
            <SwiperFlatList data={bannerSwiperList} />
          )}

        <NavImg1
          data={getSquaresInfoItems}
          style={{ paddingTop: 5, paddingBottom: 5 }}
          onPress={this.handleOnPressNavImg1}
        />

        <SeparateBar />

        {/* 暂时屏蔽拼单功能 */}
        {/* <View style={styles.groupBuy}>
          <View style={styles.groupBuyBackground}>
            <Image style={styles.groupBuyImageBackground} source={require('../images/group23423.png')} />
          </View>
          <View style={styles.groupBuyTitle}>
            <Text style={styles.groupBuyTitleText}>{i18n.groupBuy}</Text>
            <View style={styles.groupBuyTitleRight}>
              <Text style={styles.groupBuyTitleMore} onPress={() => navigate(SCREENS.GroupBuyList)}>{i18n.more}</Text>
              <CustomIcon name="arrowright" style={styles.groupBuyTitleMoreIcon} />
            </View>
          </View>
          <ProductItem1 data={mergeGetInfoList} groupon={true} />
        </View> */}

        <FloorTitle
          title={`/${i18n.brandOnSale}/`}
          isMore={false}
          style={{ paddingTop: 0, backgroundColor: '#fff' }}
        />

        <BannerHomeType data={bannerHomeType} style={{ paddingBottom: 15 }} />

        <FloorTitle
          title={`/${i18n.featuredEvents}/`}
          isMore={false}
          style={{ borderBottomColor: BORDER_COLOR, borderBottomWidth: 1 }}
        />

        <ProductItem2 data={adverstInfoList} />
      </View>
    );
  }
}

export default connect(
  state => {
    const {
      bannerSwiper,
      bannerHomeType,
      promotionInfo,
      adverstInfo,
      mergeGetInfo,
      getSquaresInfo,
    } = state;

    // const {

    // } = props;

    return {
      bannerSwiper: bannerSwiper.one || {},
      bannerHomeType: bannerHomeType || {},
      promotionInfo: promotionInfo || {},
      adverstInfo: adverstInfo || {},
      mergeGetInfo: mergeGetInfo || {},
      getSquaresInfoItems: getSquaresInfo.items,
    };
  },
  {
    ...bannerSwiperActionCreators,
    ...bannerHomeTypeActionCreators,
    ...promotionInfoActionCreators,
    ...mergeGetInfoActionCreators,
    ...adverstInfoActionCreators,
    ...getSquaresInfoActionCreators,
  },
)(Scrollable1);
