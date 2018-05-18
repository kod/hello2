import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ImageGetSize from "../components/ImageGetSize";

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SIDEINTERVAL,
  RED_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
} from "../styles/variables";

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: STATUSBAR_HEIGHT + 40,
  },
});

class ProductDetailParam extends React.Component {
  componentDidMount() {
    const { bannerSwiperFetch } = this.props;
    // bannerSwiperFetch('one');
  }
  
  render() {
    const {
      screenProps: {
        goodsProperties,
      },
    } = this.props;
    console.log('ProductDetailParamProductDetailParamProductDetailParam');
    console.log(this.props);

    return (
      <View style={styles.container} >
        <ScrollView >
          {
            goodsProperties.map((val, key) => {
              return <ImageGetSize uri={val} key={key} />
            })
          }
          <ImageGetSize uri={'https://vnimg.buyoo.xyz/commodity/img/brand/1524537442995_vivo_v9_01.jpg'} />
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

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, })(ProductDetailParam);
