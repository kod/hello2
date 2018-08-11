import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, FlatList, WebView } from 'react-native';
import { connect } from 'react-redux';

import BYHeader from '../components/BYHeader';
import { connectLocalization } from '../components/Localization';

import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  WebView: {

  },
});

class ProductDetailImages extends Component {
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
      <View style={styles.container}>
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

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          bannerSwiper,
        } = state;

        // const {

        // } = props;

        return {
          bannerSwiper: bannerSwiper['one'] || {}
        }
      }
    },
    {
      ...bannerSwiperActionCreators,
    }
  )(ProductDetailImages),
);
