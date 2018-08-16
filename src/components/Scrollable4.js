import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SwiperFlatList from './SwiperFlatList';
import BrandList from './BrandList';
import PhoneAdBaner from './PhoneAdBaner';
import FloorTitle from './FloorTitle';
import ProductItem1 from './ProductItem1';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as adDigitalActionCreators from '../common/actions/adDigital';

class Scrollable4 extends Component {
  componentDidMount() {
    const { bannerSwiperFetch, adDigitalFetch } = this.props;
    bannerSwiperFetch('four');
    adDigitalFetch();
  }

  render() {
    const { bannerSwiper, adDigital, i18n } = this.props;
    const { adDigitalBanerList, adDigitalList, classfyinfo } = adDigital;
    const bannerSwiperList = bannerSwiper.items;
    return (
      <View>
        {bannerSwiperList &&
          bannerSwiperList.length > 0 && (
            <SwiperFlatList data={bannerSwiperList} />
          )}

        <BrandList data={classfyinfo} style={{ marginBottom: 5 }} />

        <PhoneAdBaner data={adDigitalBanerList} />

        <FloorTitle
          title={`/${i18n.goodOnesRecommendation}/`}
          isMore
          style={{ paddingTop: 10, backgroundColor: '#fff' }}
        />

        <ProductItem1
          data={adDigitalList}
          style={{ backgroundColor: '#fff' }}
        />
      </View>
    );
  }
}

export default connect(
  () => state => {
    const { bannerSwiper, adDigital } = state;

    // const {

    // } = props;

    return {
      bannerSwiper: bannerSwiper.four || {},
      adDigital,
    };
  },
  {
    ...bannerSwiperActionCreators,
    ...adDigitalActionCreators,
  },
)(Scrollable4);
