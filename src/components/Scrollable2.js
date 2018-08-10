import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SwiperFlatList from './SwiperFlatList';
import FeaturedGoodsItem from './FeaturedGoodsItem';
import BrandList from "./BrandList";
import PhoneAdBaner from "./PhoneAdBaner";
import FloorTitle from './FloorTitle';
import ProductItem1 from './ProductItem1';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as adPhoneActionCreators from '../common/actions/adPhone';

const { width, height } = Dimensions.get('window');

class Scrollable2 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerSwiperFetch, bannerHomeRecommendFetch, adPhoneFetch } = this.props;
    bannerSwiperFetch('two');
    // bannerHomeRecommendFetch();
    adPhoneFetch();
  }

  render() {
    const { bannerSwiper, bannerHomeRecommend, adPhone, i18n } = this.props;
    const { classfyinfo, phoneAdList, phoneAdBanerList } = adPhone;
    const bannerSwiperList = bannerSwiper.items;
    return (
      <View>
        
        <SwiperFlatList data={bannerSwiperList} />

        <BrandList data={classfyinfo} style={{ marginBottom: 5 }} />

        <PhoneAdBaner data={phoneAdBanerList}  />

        <FloorTitle title={`/${i18n.goodOnesRecommendation}/`} isMore={false} style={{ paddingTop: 10, backgroundColor: '#fff', }} />

        <ProductItem1 data={phoneAdList} style={{ backgroundColor: '#fff' }} />

        {/* <FeaturedGoodsItem data={bannerHomeRecommend} /> */}
      </View>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        bannerSwiper,
        bannerHomeRecommend,
        adPhone
      } = state;

      // const {

      // } = props;

      return {
        bannerSwiper: bannerSwiper['two'] || {},
        adPhone: adPhone,
        // promotionInfo: promotionInfo || {},
        bannerHomeRecommend: bannerHomeRecommend || {}
      }
    }
  },
  {
    ...bannerSwiperActionCreators,
    ...bannerHomeRecommendActionCreators,
    ...adPhoneActionCreators
  }
)(Scrollable2);

// function mapStateToProps(state, props) {
//   const { bannerSwiper, bannerHomeRecommend, adPhone } = state;
//   return {
//     bannerSwiper: bannerSwiper['two'] || {},
//     adPhone: adPhone,
//     // promotionInfo: promotionInfo || {},
//     bannerHomeRecommend: bannerHomeRecommend || {}
//   };
// }

// export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...bannerHomeRecommendActionCreators, ...adPhoneActionCreators })(Scrollable2);
