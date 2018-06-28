import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, FlatList, WebView } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ImageGetSize from "../components/ImageGetSize";
import BYCacheImage from "../components/BYCacheImage";

import {
  RED_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
} from "../styles/variables";

import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, STATUSBAR_HEIGHT, } from "../common/constants";

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
  
  renderItem = ({ item, index }) => {
    // const { onPressImage, onLongPressImage } = this.props;
    return (
      <BYCacheImage
        uri={`${item}?x-oss-process=image/quality,Q_10`}
        key={item}
        // style={imageStyle}
        // onFoundImageSize={this.handleOnFoundImageSize}
      />

      // <PXCacheImageTouchable
      //   key={item}
      //   uri={item}
      //   initWidth={WINDOW_HEIGHT}
      //   initHeight={200}
      //   // style={styles.multiImageContainer}
      //   // imageStyle={styles.image}
      //   // pageNumber={index + 1}
      //   index={index}
      //   // onPress={onPressImage}
      //   // onLongPress={onLongPressImage}
      // />
    );
  };

  render() {
    const {
      screenProps: {
        goodsProperties,
      },
    } = this.props;

    return (
      <WebView
        source={
          {
            // uri: 'https://3g.163.com/touch/tech/',
            html: `<!DOCTYPE html><html lang="en"><head><style>body,img{display:block;margin:0;padding:0;width:${WINDOW_WIDTH}px;}</style></head><body><img src="https://vnimg.buyoo.xyz/commodity/img/product/20180512161308_068a.jpg?x-oss-process=image/quality,Q_70" alt="image"></body></html>`,
          }
        }
        style={{marginTop: STATUSBAR_HEIGHT + 40}}
      />
      // <View style={styles.container} >
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

export default connect(
  () => {
    return (state, props) => {
      const {
        bannerSwiper,
      } = state;

      const {

      } = props;

      return {
        bannerSwiper: bannerSwiper['one'] || {}
      }
    }
  },
  {
    ...bannerSwiperActionCreators,
  }
)(ProductDetailParam);

// function mapStateToProps(state, props) {
//   const { bannerSwiper } = state;
//   return {
//     bannerSwiper: bannerSwiper['one'] || {}
//   };
// }

// export default connect(mapStateToProps, { ...bannerSwiperActionCreators, })(ProductDetailParam);
