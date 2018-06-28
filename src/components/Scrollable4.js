import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SwiperFlatList from '../components/SwiperFlatList';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';
import BrandList from "../components/BrandList";
import PhoneAdBaner from "../components/PhoneAdBaner";
import FloorTitle from "../components/FloorTitle";
import ProductItem1 from "../components/ProductItem1";

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as adDigitalActionCreators from '../common/actions/adDigital';

const { width, height } = Dimensions.get('window');

class Scrollable4 extends React.Component {
  constructor(props) {
    super(props);
  }

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
        <SwiperFlatList data={bannerSwiperList} />
        
        <BrandList data={classfyinfo} style={{ marginBottom: 5 }} />

        <PhoneAdBaner data={adDigitalBanerList}  />

        <FloorTitle title={`/${i18n.goodOnesRecommendation}/`} isMore={true} style={{ paddingTop: 10, backgroundColor: '#fff', }} />

        <ProductItem1 data={adDigitalList} style={{ backgroundColor: '#fff' }} />

      </View>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        bannerSwiper,
        adDigital
      } = state;

      const {

      } = props;

      return {
        bannerSwiper: bannerSwiper['four'] || {},
        adDigital,
      }
    }
  },
  {
    ...bannerSwiperActionCreators,
    ...adDigitalActionCreators
  }
)(Scrollable4);


// function mapStateToProps(state, props) {
//   const { bannerSwiper, adDigital } = state;
//   return {
//     bannerSwiper: bannerSwiper['four'] || {},
//     adDigital,
//   };
// }

// export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...adDigitalActionCreators })(Scrollable4);
