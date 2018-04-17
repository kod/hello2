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
    return (
      <View>

        {/* <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../images/1512372670238_mobile_Android.png')} style={{ width: 60, height: 60, marginBottom: 5 }} />
            <Text style={{ textAlign: 'center', fontSize: 12 }}>Android</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../images/1512372658062_mobile_IOS.png')} style={{ width: 60, height: 60, marginBottom: 5 }} />
            <Text style={{ textAlign: 'center', fontSize: 12 }}>IOS</Text>
          </View>
        </View> */}

        {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>
          <View style={{ width: width / 2, flexDirection: 'row', paddingLeft: width * 0.03, paddingBottom: 10 }}>
            <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 70, width: 70 }} />
            <View>
              <Image source={require('../images/1509607385148_oppo.jpg')} style={{ height: 50, width: 50 }} />
              <Text style={{ color: '#999', lineHeight: 16, width: width / 2 - 80 }} numberOfLines={1}>
                OPPO F5
              </Text>
            </View>
          </View>
          <View style={{ width: width / 2, flexDirection: 'row', paddingLeft: width * 0.03, paddingBottom: 10 }}>
            <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 70, width: 70 }} />
            <View>
              <Image source={require('../images/1509607385148_oppo.jpg')} style={{ height: 50, width: 50 }} />
              <Text style={{ color: '#999', lineHeight: 16, width: width / 2 - 80 }} numberOfLines={1}>
                OPPO F5
              </Text>
            </View>
          </View>
          <View style={{ width: width / 2, flexDirection: 'row', paddingLeft: width * 0.03, paddingBottom: 10 }}>
            <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 70, width: 70 }} />
            <View>
              <Image source={require('../images/1509607385148_oppo.jpg')} style={{ height: 50, width: 50 }} />
              <Text style={{ color: '#999', lineHeight: 16, width: width / 2 - 80 }} numberOfLines={1}>
                OPPO F5
              </Text>
            </View>
          </View>
          <View style={{ width: width / 2, flexDirection: 'row', paddingLeft: width * 0.03, paddingBottom: 10 }}>
            <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 70, width: 70 }} />
            <View>
              <Image source={require('../images/1509607385148_oppo.jpg')} style={{ height: 50, width: 50 }} />
              <Text style={{ color: '#999', lineHeight: 16, width: width / 2 - 80 }} numberOfLines={1}>
                OPPO F5OPPO F5OPPO F5
              </Text>
            </View>
          </View>
        </View> */}
        
        <SwiperFlatList data={bannerSwiper} />

        <BrandList data={classfyinfo} style={{ marginBottom: 5 }} />

        <PhoneAdBaner data={phoneAdBanerList}  />

        <FloorTitle title={`/${i18n.goodOnesRecommendation}/`} isMore={true} style={{ paddingTop: 10, backgroundColor: '#fff', }} />

        <ProductItem1 data={phoneAdList} style={{ backgroundColor: '#fff' }} />

        {/* <FeaturedGoodsItem data={bannerHomeRecommend} /> */}
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { bannerSwiper, bannerHomeRecommend, adPhone } = state;
  return {
    bannerSwiper: bannerSwiper['two'] || {},
    adPhone: adPhone,
    // promotionInfo: promotionInfo || {},
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...bannerHomeRecommendActionCreators, ...adPhoneActionCreators })(Scrollable2);
