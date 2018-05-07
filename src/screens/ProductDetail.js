import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import CustomIcon from "../components/CustomIcon";
import ProductDetailTabNavigator from "../navigations/ProductDetailTabNavigator";

import { WINDOW_WIDTH, WINDOW_HEIGHT, APPBAR_HEIGHT, STATUSBAR_HEIGHT, SIDEINTERVAL } from "../styles/variables";

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  // header: {
  //   position: 'absolute',
  //   zIndex: 100,
  //   top: STATUSBAR_HEIGHT,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // headerLeftIcon: {
  //   fontSize: 16,
  //   color: '#666',
  //   paddingLeft: WINDOW_WIDTH * 0.03,
  //   paddingRight: SIDEINTERVAL,
  // },
  // headerMiddle: {
  //   flex: 1,
  //   height: 35,
  //   backgroundColor: '#ff0',
  // },
  // headerRightIcon: {
  //   fontSize: 16,
  //   color: '#666',
  //   paddingLeft: SIDEINTERVAL,
  //   paddingRight: SIDEINTERVAL,
  // },
  headerLeft: {
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    left: 0,
    zIndex: 300,
    fontSize: 16,
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  headerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 300,
    // width: 40,
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#fff',
  },
  headerRight: {
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    right: 0,
    zIndex: 300,
    fontSize: 16,
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});

class ProductDetail extends React.Component {
  componentDidMount() {
    const { bannerSwiperFetch } = this.props;
    bannerSwiperFetch('one');
  }

  render() {
    const { bannerSwiper, screenProps, productdetailOpacity } = this.props;

    return (
      <View style={styles.container} >
        {/* <View style={styles.header} >
          <CustomIcon name="back" style={styles.headerLeftIcon} />
          <View style={styles.headerMiddle} ></View>
          <SimpleLineIcons name="share" style={styles.headerRightIcon} />
        </View> */}
        <CustomIcon name="back" style={[styles.headerLeft, {opacity: productdetailOpacity}]} onPress={()=>console.log('123123')} />
        <View style={[styles.headerTop, {opacity: productdetailOpacity}]} ></View>
        <SimpleLineIcons name="share" style={[styles.headerRight, {opacity: productdetailOpacity}]} onPress={()=>console.log('123123')} />
        <ProductDetailTabNavigator screenProps={{
          ...screenProps,
          BYopacity: productdetailOpacity
        }} />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { bannerSwiper, productdetailOpacity } = state;
  return {
    bannerSwiper: bannerSwiper['one'] || {},
    productdetailOpacity: productdetailOpacity.value,
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, })(ProductDetail);
