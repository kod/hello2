import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { connect } from 'react-redux';

import BYHeader from '../components/BYHeader';
import { connectLocalization } from '../components/Localization';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  WebView: {},
});

class ProductDetailImages extends Component {
  render() {
    const { navigation } = this.props;
    const WebViewHTML = navigation.state.params.html;

    return (
      <View style={styles.container}>
        <BYHeader />
        <WebView
          source={{
            html: WebViewHTML,
          }}
          style={styles.WebView}
        />
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const { bannerSwiper } = state;

      // const {

      // } = props;

      return {
        bannerSwiper: bannerSwiper.one || {},
      };
    },
    {
      ...bannerSwiperActionCreators,
    },
  )(ProductDetailImages),
);
