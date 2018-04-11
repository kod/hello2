import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SwiperFlatList from '../components/SwiperFlatList';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const { width, height } = Dimensions.get('window');

class Scrollable2 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerSwiperFetch, bannerHomeRecommendFetch } = this.props;
    bannerSwiperFetch('three');
    bannerHomeRecommendFetch();
  }

  render() {
    const { bannerSwiper, bannerHomeRecommend } = this.props;
    return (
      <View>
        <SwiperFlatList data={bannerSwiper} />
        <View style={{ height: 8, backgroundColor: '#eee' }} />
        <View>
          <Text style={{ lineHeight: 35, textAlign: 'center' }}>Rave reviews</Text>
          <View>
            <Image source={require('../images/1509693155359_sumsung_galaxy-J7-Pro.jpg')} style={{ height: 150, width, marginBottom: 5, resizeMode: Image.resizeMode.overflow }} />
          </View>
        </View>
        <View style={{ height: 8, backgroundColor: '#eee' }} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Image source={require('../images/1509607385148_oppo.jpg')} style={{ height: width / 4 - width * 0.03, width: width / 4 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
          <Image source={require('../images/1509607377302_mi.jpg')} style={{ height: width / 4 - width * 0.03, width: width / 4 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
          <Image source={require('../images/1509607391840_vivo.jpg')} style={{ height: width / 4 - width * 0.03, width: width / 4 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
          <Image source={require('../images/1509607402196_snmsung.jpg')} style={{ height: width / 4 - width * 0.03, width: width / 4 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
          <Image source={require('../images/1509607391840_vivo.jpg')} style={{ height: width / 4 - width * 0.03, width: width / 4 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
          <Image source={require('../images/1509607402196_snmsung.jpg')} style={{ height: width / 4 - width * 0.03, width: width / 4 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
        </View>
        <View style={{ height: 8, backgroundColor: '#eee' }} />
        <View>
          <Text style={{ lineHeight: 35, textAlign: 'center' }}>Students' tablet zone</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <View style={{ width: width / 2, borderRightColor: '#f2f2f2', borderRightWidth: StyleSheet.hairlineWidth }}>
              <Image source={require('../images/1513065299190_T9S18PA01.jpg')} style={{ height: width / 2 - width * 0.03, width: width / 2 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, marginBottom: 5 }}>HP Probook 450 G3 T9S18PA</Text>
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, color: '#999', marginBottom: 5 }}>From 12,390,000 VND</Text>
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, color: '#88befd', marginBottom: 5 }}>Monthly payment: from 516,250 VND</Text>
            </View>
            <View style={{ width: width / 2, borderRightColor: '#f2f2f2', borderRightWidth: StyleSheet.hairlineWidth }}>
              <Image source={require('../images/1513065299190_T9S18PA01.jpg')} style={{ height: width / 2 - width * 0.03, width: width / 2 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, marginBottom: 5 }}>HP Probook 450 G3 T9S18PA</Text>
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, color: '#999', marginBottom: 5 }}>From 12,390,000 VND</Text>
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, color: '#88befd', marginBottom: 5 }}>Monthly payment: from 516,250 VND</Text>
            </View>
            <View style={{ width: width / 2, borderRightColor: '#f2f2f2', borderRightWidth: StyleSheet.hairlineWidth }}>
              <Image source={require('../images/1513065299190_T9S18PA01.jpg')} style={{ height: width / 2 - width * 0.03, width: width / 2 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, marginBottom: 5 }}>HP Probook 450 G3 T9S18PA</Text>
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, color: '#999', marginBottom: 5 }}>From 12,390,000 VND</Text>
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, color: '#88befd', marginBottom: 5 }}>Monthly payment: from 516,250 VND</Text>
            </View>
            <View style={{ width: width / 2, borderRightColor: '#f2f2f2', borderRightWidth: StyleSheet.hairlineWidth }}>
              <Image source={require('../images/1513065299190_T9S18PA01.jpg')} style={{ height: width / 2 - width * 0.03, width: width / 2 - width * 0.03, marginLeft: width * 0.015, marginRight: width * 0.015 }} />
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, marginBottom: 5 }}>HP Probook 450 G3 T9S18PA</Text>
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, color: '#999', marginBottom: 5 }}>From 12,390,000 VND</Text>
              <Text style={{ fontSize: 12, paddingLeft: width * 0.03, paddingRight: width * 0.03, color: '#88befd', marginBottom: 5 }}>Monthly payment: from 516,250 VND</Text>
            </View>
          </View>
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
    bannerSwiper: bannerSwiper['three'] || {},
    // bannerHomeType: bannerHomeType || {},
    // promotionInfo: promotionInfo || {},
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...bannerHomeRecommendActionCreators })(Scrollable2);
