import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, FlatList, WebView } from 'react-native';
import { connect } from 'react-redux';

import BYHeader from '../components/BYHeader';

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
  },
  WebView: {

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
      navigation,
    } = this.props;
    const WebViewHTML = navigation.state.params.html;

    return (
      <View style={styles.container} >
        <BYHeader />
        <WebView
          source={
            {
              html: WebViewHTML,
            }
          }
          style={styles.WebView}
        />
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
