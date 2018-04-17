import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BYHeader from '../components/BYHeader';
import HeaderShareButton from '../components/HeaderShareButton';
import ScrollableTabView from '../components/ScrollableTabView';
import SwiperFlatList from '../components/SwiperFlatList';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';

const { width, height } = Dimensions.get('window');

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerSwiperFetch } = this.props;
    bannerSwiperFetch('one');
  }

  handleOnPressHeaderBackButton = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  renderHeaderTitle = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Sản phẩm</Text>
      </View>
    );
  };

  renderHeaderRight = () => {
    return (
      <View>
        <HeaderShareButton />
      </View>
    );
  };

  render() {
    const { bannerSwiper } = this.props;
    return (
      <View style={{ position: 'relative' }} >
        {/* <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={this.renderHeaderRight()}
          darkTheme
          showBackButton
          onPressBackButton={this.handleOnPressHeaderBackButton}
        /> */}
        <View style={{ position: 'absolute', zIndex: 100, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }} >
          <MaterialIcons name="navigate-before" style={{ fontSize: 30, color: '#fff', height: 31, width: 31, backgroundColor: 'rgba(150,150,150,.7)', borderRadius: 49 }} />
          <View style={{ flex: 1, height: 40 }} >
            <Text></Text>
          </View>
          <MaterialIcons name="star-border" style={{ fontSize: 30, color: '#fff', height: 31, width: 31, backgroundColor: 'rgba(200,200,200,.7)', borderRadius: 49 }} />
        </View>
        <ScrollView style={{ position: 'relative' }} >
          <SwiperFlatList data={bannerSwiper} style={{ height: width }} />
          <Image source={require('../images/collect2.png')} style={{ position: 'absolute', zIndex: 333, top: width - 32 - 10, right: 10,  width: 32, height: 32 }} />
          <View style={{ flexDirection: 'row', paddingLeft: width * 0.03, paddingRight: width * 0.03, paddingTop: 5, paddingBottom: 5, backgroundColor: '#fff', borderBottomColor: '#eee', borderBottomWidth: 1 }} >
            <Text style={{ fontSize: 28, color: '#fc1159' }} >830,000</Text>
            <Text style={{ color: '#666', paddingTop: 15 }} > ₫</Text>
          </View>
          <View style={{ backgroundColor: '#fff', paddingLeft: width * 0.03, paddingRight: width * 0.03, paddingTop: 5 }} >
            <Text style={{ color: '#333', fontSize: 14 }} >Tai nghe Mi comfort Trang</Text>
            <Text>Tai nghe Mi comfort Trang</Text>
          </View>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail1</Text>
          <Text>productDetail2</Text>
          <Text>productDetail3</Text>
          <Text>productDetail4</Text>
          <Text>productDetail5</Text>
          <Text>productDetail6</Text>
          <Text>productDetail7</Text>
          <Text>productDetail8</Text>
          <Text>productDetail9</Text>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { bannerSwiper } = state;
  return {
    bannerSwiper: bannerSwiper['one'] || {}
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators })(ProductDetail);
