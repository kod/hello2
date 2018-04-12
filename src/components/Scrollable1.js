import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { SCREENS } from '../common/constants';

import SwiperFlatList from '../components/SwiperFlatList';
import BannerHomeType from '../components/BannerHomeType';
import DiscountsItem from '../components/DiscountsItem';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeTypeActionCreators from '../common/actions/bannerHomeType';
import * as promotionInfoActionCreators from '../common/actions/promotionInfo';
import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const styles = StyleSheet.create({
  subNav: {
    flexDirection: 'row',
  }
})

class Scrollable1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerSwiperClear, bannerSwiperFetch, bannerHomeTypeFetch, promotionInfoFetch, bannerHomeRecommendFetch } = this.props;
    // bannerSwiperClear();
    bannerSwiperFetch('one');
    bannerHomeTypeFetch();
    promotionInfoFetch();
    bannerHomeRecommendFetch();
  }

  render() {
    const { bannerSwiper, bannerHomeType, promotionInfo, bannerHomeRecommend, navigation: { navigate } } = this.props;

    return (
      <View>
        <SwiperFlatList data={bannerSwiper} />

        {/* <View style={subNav} >
        
        </View> */}

        <View style={{ height: 40, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#333' }} onPress={() => navigate(SCREENS.ProductDetail)}>
            Brand on sale
          </Text>
        </View>

        <BannerHomeType data={bannerHomeType} />

        <View style={{ height: 8, backgroundColor: '#eee' }} />

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
  const { bannerSwiper, bannerHomeType, promotionInfo, bannerHomeRecommend } = state;
  return {
    bannerSwiper: bannerSwiper['one'] || {},
    bannerHomeType: bannerHomeType || {},
    promotionInfo: promotionInfo || {},
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...bannerHomeTypeActionCreators, ...promotionInfoActionCreators, ...bannerHomeRecommendActionCreators })(Scrollable1);
