import React, { Component } from 'react';
import {
  // StyleSheet,
  // Text,
  // View,
  // ScrollView,
  // Dimensions,
  // Image,
  // FlatList,
  WebView,
} from 'react-native';
import { connect } from 'react-redux';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import ImageGetSize from "../components/ImageGetSize";
import BYCacheImage from '../components/BYCacheImage';
import { connectLocalization } from '../components/Localization';
import { jointWebViewImages } from '../common/helpers';

// import {
//   RED_COLOR,
//   BORDER_COLOR,
//   PRIMARY_COLOR,
// } from '../styles/variables';

import { WINDOW_WIDTH, STATUSBAR_HEIGHT } from '../common/constants';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     paddingTop: STATUSBAR_HEIGHT + 40,
//   },
// });

class ProductDetailParam extends Component {
  // componentDidMount() {
  //   const { bannerSwiperFetch } = this.props;
  //   // bannerSwiperFetch('one');
  // }

  renderItem = item => (
    <BYCacheImage uri={`${item}?x-oss-process=image/quality,Q_70`} key={item} />
  );

  render() {
    const { goodsProperties } = this.props;

    return (
      <WebView
        source={{
          html: `<!DOCTYPE html><html lang="en"><head><style>body,img{display:block;margin:0;padding:0;width:${WINDOW_WIDTH}px;}</style></head><body>${jointWebViewImages(goodsProperties)}</body></html>`,
        }}
        style={{ marginTop: STATUSBAR_HEIGHT + 40 }}
      />
      // <View style={styles.container}>
      //   <ScrollView >
      //     <FlatList
      //       data={goodsProperties}
      //       keyExtractor={page => page}
      //       renderItem={this.renderItem}
      //       removeClippedSubviews={false}
      //       // ListFooterComponent={this.renderFooter}
      //       // onScroll={this.handleOnScroll}
      //       // onViewableItemsChanged={this.handleOnViewableItemsChanged}
      //       scrollEventThrottle={16}
      //       bounces={false}
      //     />

      //     {/* {
      //       goodsProperties.map((val, key) => {
      //         return <ImageGetSize uri={val} key={key} />
      //       })
      //     } */}
      //     {/* <ImageGetSize uri={'https://vnimg.buyoo.xyz/commodity/img/brand/1524537442995_vivo_v9_01.jpg'} /> */}
      //   </ScrollView>
      // </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const { productDetailInfo } = state;

      // const {

      // } = props;

      return {
        goodsProperties: productDetailInfo.item.goodsProperties,
      };
    },
    {
      ...bannerSwiperActionCreators,
    },
  )(ProductDetailParam),
);
