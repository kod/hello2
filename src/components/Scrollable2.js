import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SwiperFlatList from './SwiperFlatList';
// import FeaturedGoodsItem from './FeaturedGoodsItem';
import BrandList from './BrandList';
import PhoneAdBaner from './PhoneAdBaner';
import FloorTitle from './FloorTitle';
import ProductItem4 from './ProductItem4';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
// import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as adPhoneActionCreators from '../common/actions/adPhone';

class Scrollable2 extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { bannerSwiperFetch, adPhoneFetch } = this.props;
    bannerSwiperFetch('two');
    adPhoneFetch();
  }

  render() {
    const { bannerSwiper, adPhone, i18n } = this.props;
    const { classfyinfo, phoneAdList, phoneAdBanerList } = adPhone;
    const bannerSwiperList = bannerSwiper.items;
    return (
      <View>
        {bannerSwiperList &&
          bannerSwiperList.length > 0 && (
            <SwiperFlatList data={bannerSwiperList} />
          )}

        <BrandList data={classfyinfo} style={{ marginBottom: 5 }} />

        <PhoneAdBaner data={phoneAdBanerList} />

        <FloorTitle
          title={`- ${i18n.goodOnesRecommendation} -`}
          isMore={false}
          style={{ paddingTop: 10, backgroundColor: '#fff' }}
        />

        <ProductItem4 data={phoneAdList} style={{ backgroundColor: '#fff' }} />

        {/* <FeaturedGoodsItem data={bannerHomeRecommend} /> */}
      </View>
    );
  }
}

export default connect(
  state => {
    const { bannerSwiper, adPhone } = state;

    // const {

    // } = props;

    return {
      bannerSwiper: bannerSwiper.two,
      adPhone,
      // promotionInfo: promotionInfo || {},
      // bannerHomeRecommend: bannerHomeRecommend || {},
    };
  },
  {
    ...bannerSwiperActionCreators,
    // ...bannerHomeRecommendActionCreators,
    ...adPhoneActionCreators,
  },
)(Scrollable2);
