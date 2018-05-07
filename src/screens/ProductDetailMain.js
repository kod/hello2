import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import CustomIcon from "../components/CustomIcon";
import HeaderShareButton from '../components/HeaderShareButton';
import ScrollableTabView from '../components/ScrollableTabView';
import SwiperFlatList from '../components/SwiperFlatList';

import { WINDOW_WIDTH, WINDOW_HEIGHT, APPBAR_HEIGHT, STATUSBAR_HEIGHT, SIDEINTERVAL } from "../styles/variables";

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as productdetailOpacityActionCreators from '../common/actions/productdetailOpacity';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  statusbarPlaceholder: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#fff',
  },
  favorite: {
    position: 'absolute',
    zIndex: 333,
    top: WINDOW_WIDTH - WINDOW_WIDTH * 0.05,
    right: WINDOW_WIDTH * 0.03,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#999',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 100,
    margin: 0,
    paddingTop: 5,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 3,
  },
  productTitle: {

  },
});

class ProductDetail extends React.Component {
  componentDidMount() {
    const { bannerSwiperFetch } = this.props;
    bannerSwiperFetch('one');
  }

  handleOnScroll = event => {
    const { productdetailOpacityFetch } = this.props;
    let opacity = 0;
    const opacity_height = event.nativeEvent.layoutMeasurement.width * 0.8;
    if (event.nativeEvent.contentOffset.y < opacity_height) {
      opacity = (event.nativeEvent.contentOffset.y / opacity_height);
    } else {
      opacity = 1;
    }
    productdetailOpacityFetch(opacity);
  };
  
  render() {
    const { bannerSwiper } = this.props;
    return (
      <View style={styles.container} >
        <View style={styles.favorite} >
          <MaterialIcons name="favorite-border" style={styles.favoriteIcon} />
        </View>
        <ScrollView onScroll={this.handleOnScroll}>
          <View style={styles.statusbarPlaceholder} ></View>
          <SwiperFlatList 
            data={bannerSwiper} 
            style={{ height: WINDOW_WIDTH, }} 
            autoplay={false}
            stylePaginationContainer={{ justifyContent: 'center', }}
          />
          {/* <Text style={styles.} ></Text> */}
          <View style={{ flexDirection: 'row', paddingLeft: WINDOW_WIDTH * 0.03, paddingRight: WINDOW_WIDTH * 0.03, paddingTop: 5, paddingBottom: 5, backgroundColor: '#fff', borderBottomColor: '#eee', borderBottomWidth: 1 }} >
            <Text style={{ fontSize: 28, color: '#fc1159' }} >830,000</Text>
            <Text style={{ color: '#666', paddingTop: 15 }} > ₫</Text>
          </View>
          <View style={{ backgroundColor: '#fff', paddingLeft: WINDOW_WIDTH * 0.03, paddingRight: WINDOW_WIDTH * 0.03, paddingTop: 5 }} >
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

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...productdetailOpacityActionCreators })(ProductDetail);
