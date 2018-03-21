import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SwiperFlatList from '../components/SwiperFlatList';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

export const { width, height } = Dimensions.get('window');

class Scrollable2 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerSwiperFetch, bannerHomeRecommendFetch } = this.props;
    bannerSwiperFetch('four');
    bannerHomeRecommendFetch();
  }

  render() {
    const { bannerSwiper, bannerHomeRecommend } = this.props;
    return (
      <View>
        <SwiperFlatList data={bannerSwiper} />
        <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../images/1512377300192_smpj_yyyl.png')} style={{ width: 60, height: 60, marginBottom: 5 }} />
            <Text style={{ textAlign: 'center', fontSize: 11, paddingLeft: width * 0.01, paddingRight: width * 0.01 }}>Giải trí truyền thông</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../images/1512377276688_smpj_wscp.png')} style={{ width: 60, height: 60, marginBottom: 5 }} />
            <Text style={{ textAlign: 'center', fontSize: 11, paddingLeft: width * 0.01, paddingRight: width * 0.01 }}>Thiết bị ngoại vi</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../images/1512377300192_smpj_yyyl.png')} style={{ width: 60, height: 60, marginBottom: 5 }} />
            <Text style={{ textAlign: 'center', fontSize: 11, paddingLeft: width * 0.01, paddingRight: width * 0.01 }}>Giải trí truyền thông</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../images/1512377276688_smpj_wscp.png')} style={{ width: 60, height: 60, marginBottom: 5 }} />
            <Text style={{ textAlign: 'center', fontSize: 11, paddingLeft: width * 0.01, paddingRight: width * 0.01 }}>Thiết bị ngoại vi</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../images/1512377276688_smpj_wscp.png')} style={{ width: 60, height: 60, marginBottom: 5 }} />
            <Text style={{ textAlign: 'center', fontSize: 11, paddingLeft: width * 0.01, paddingRight: width * 0.01 }}>Thiết bị ngoại vi</Text>
          </View>
        </View>
        <View style={{ height: 8, backgroundColor: '#eee' }} />
        <View>
          <Text style={{ lineHeight: 35, textAlign: 'center' }}>Rave reviews</Text>
          <View>
            <Image source={require('../images/1509693155359_sumsung_galaxy-J7-Pro.jpg')} style={{ height: 150, width, marginBottom: 5, resizeMode: Image.resizeMode.overflow }} />
            <Image source={require('../images/1509693155359_sumsung_galaxy-J7-Pro.jpg')} style={{ height: 150, width, marginBottom: 5, resizeMode: Image.resizeMode.overflow }} />
          </View>
        </View>
        <View style={{ height: 8, backgroundColor: '#eee' }} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Image source={require('../images/1509607385148_oppo.jpg')} style={{ height: width / 4 - width * 0.03, width: width / 4 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
          <Image source={require('../images/1509607377302_mi.jpg')} style={{ height: width / 4 - width * 0.03, width: width / 4 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
        </View>
        <View style={{ height: 8, backgroundColor: '#eee' }} />
        <View>
          <Text style={{ lineHeight: 35, textAlign: 'center' }}>Good Ones recommendation</Text>
          <FeaturedGoodsItem data={bannerHomeRecommend} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { bannerSwiper, bannerHomeRecommend } = state;
  return {
    bannerSwiper: bannerSwiper['four'] || {},
    // bannerHomeType: bannerHomeType || {},
    // promotionInfo: promotionInfo || {},
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...bannerHomeRecommendActionCreators })(Scrollable2);
