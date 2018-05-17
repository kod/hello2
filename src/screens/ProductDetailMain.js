import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connectLocalization } from "../components/Localization";

import CustomIcon from "../components/CustomIcon";
import HeaderShareButton from '../components/HeaderShareButton';
import ScrollableTabView from '../components/ScrollableTabView';
import SwiperFlatList from '../components/SwiperFlatList';
import ImageGetSize from "../components/ImageGetSize";
import Comment from "../components/Comment";
import priceFormat from "../common/helpers/priceFormat";
import { SCREENS } from "../common/constants";

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

import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';

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
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#999',
    borderRadius: 100,
    elevation: 4,
    backgroundColor: '#fff',
    margin: 0,
    height: 35,
    lineHeight: 35,
    width: 35,
    textAlign: 'center',
  },
  product: {
    paddingLeft: SIDEINTERVAL,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  productTitle: {
    color: '#333',
    fontSize: 14,
    marginBottom: 3,
  },
  productPrice: {
    fontSize: 18, 
    color: RED_COLOR,
    fontWeight: '700',
    paddingBottom: 10,
    marginBottom: 8,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  serverinfo: {
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  serverinfoToBePaid: {
    fontSize: 11,
    color: '#ccc',
    paddingTop: 2,
    marginRight: 5,
  },
  serverinfoToBePaidText: {
    color: '#ccc',
    fontSize: 11,
    marginRight: 15,
  },
  serverinfotoReceiveGoods: {
    fontSize: 11,
    color: '#ccc',
    paddingTop: 3,
    marginRight: 5,
  },
  serverinfotoReceiveGoodsText: {
    color: '#ccc',
    fontSize: 11,
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    height: 45,
  },
  specTitle: {
    fontSize: 14,
    color: '#999',
    paddingRight: 15,
  },
  specDesc: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  specArrow: {
    fontSize: 10,
    color: '#999',
    paddingRight: SIDEINTERVAL,
  },
  commentMore: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingBottom: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  commentMoreText: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    color: '#999',
  },
  productImageItem: {
    width: WINDOW_WIDTH,
    height: 800,
    resizeMode: 'contain',
  },
});

class ProductDetail extends React.Component {
  componentDidMount() {

  }

  handleOnScroll = event => {
    const { productDetailOpacityFetch } = this.props;
    let opacity = 0;
    const opacity_height = event.nativeEvent.layoutMeasurement.width * 0.8;
    if (event.nativeEvent.contentOffset.y < opacity_height) {
      opacity = (event.nativeEvent.contentOffset.y / opacity_height);
    } else {
      opacity = 1;
    }
    productDetailOpacityFetch(opacity);
  };
  
  render() {
    const {
      name,
      comment,
      screenProps: {
        i18n,
        price, 
        swiper, 
        imageDesc, 
        propertiesIdsObject,
        handleOnPressToggleMenuBottomSheet,
      },
      navigation: {navigate},
    } = this.props;
    console.log('ProductDetailMainProductDetailMainProductDetailMain');
    console.log(this.state);
    console.log(this.props);
    return (
      <View style={styles.container} >
        <ScrollView onScroll={this.handleOnScroll}>
          <View style={styles.favorite} >
            <MaterialIcons name="favorite-border" style={styles.favoriteIcon} />
          </View>
          <View style={styles.statusbarPlaceholder} ></View>
          <SwiperFlatList 
            data={swiper} 
            style={{ height: WINDOW_WIDTH, }} 
            styleWrap={{ paddingBottom: WINDOW_WIDTH * 0.03, backgroundColor: '#fff' }}
            stylePaginationContainer={{ justifyContent: 'center', }}
            autoplay={false}
          />
          <View style={styles.product} >
            <Text style={styles.productTitle} >{name}</Text>
            <Text style={styles.productPrice} >{priceFormat(price)} VND</Text>
            <View style={styles.serverinfo} >
              <CustomIcon style={styles.serverinfoToBePaid} name="returns" ></CustomIcon>
              <Text style={styles.serverinfoToBePaidText} >{i18n.qualityAssurance}</Text>
              <CustomIcon style={styles.serverinfotoReceiveGoods} name="toReceiveGoods" ></CustomIcon>
              <Text style={styles.serverinfotoReceiveGoodsText} >{i18n.fastDelivery}</Text>
            </View>
            <View style={styles.spec} >
              <Text style={styles.specTitle} >{i18n.selected}</Text>
              <Text style={styles.specDesc} onPress={() => handleOnPressToggleMenuBottomSheet()} >{propertiesIdsObject.colorName} {propertiesIdsObject.versionName}</Text>
              <CustomIcon style={styles.specArrow} name="arrowright" />
            </View>
          </View>
          <Comment data={comment} />
          {
            !!comment.length &&
            <View style={styles.commentMore} >
              <Text style={styles.commentMoreText} onPress={() => navigate(SCREENS.ProductDetailComment)} >{i18n.more}</Text>
            </View>
          }
          {
            imageDesc.map((val, key) => {
              return <ImageGetSize uri={val} key={key} />
            })
          }
          <ImageGetSize uri={'https://vnimg.buyoo.xyz/commodity/img/brand/1524537442995_vivo_v9_01.jpg'} />
          <ImageGetSize uri={'https://vnimg.buyoo.xyz/commodity/img/brand/1524537444074_vivo_v9_02.jpg'} />
          <ImageGetSize uri={'https://vnimg.buyoo.xyz/commodity/img/brand/1524537445189_vivo_v9_03.jpg'} />
          <ImageGetSize uri={'https://vnimg.buyoo.xyz/commodity/img/brand/1524537445910_vivo_v9_04.jpg'} />
          {/* <Image source={{uri: 'https://vnimg.buyoo.xyz/commodity/img/brand/1524537442995_vivo_v9_01.jpg'}} style={{width: 400, height: 400}} /> */}
          {/* <Image 
            style={styles.productImageItem} 
            source={{uri: 'https://vnimg.buyoo.xyz/commodity/img/product/1510227184465_(NB)XIAOMI-MI%20AIR-i5-6200U8GD4256GSSD13.3FHDIPSTPMBT439WHALUB%E1%BA%A0CW10SLLED_KB1GD5_940MX-%E5%8F%82%E6%95%B0.jpg'}} 
            // onLoad={(a,b,c) => {
            //   console.log(a);
            //   console.log(b);
            //   console.log(c);
            //   console.log('======');
            // }}
          /> */}
          {/* <Image style={styles.productImageItem} source={require('../images/1524537445189_vivo_v9_03.jpg')} />
          <Image style={styles.productImageItem} source={require('../images/1524537445910_vivo_v9_04.jpg')} /> */}
        </ScrollView>
      </View>
    );
  }
}

// function mapStateToProps(state, props) {
//   const { productDetailInfo } = state;
//   return {
//     detial: {
//       ...productDetailInfo.item
//     },
//   };
// }

export default connect(
  (state, props) => {
    const { productDetailInfo, comment } = state;
    return {
      ...productDetailInfo.item,
      comment: comment.items.detail ? comment.items.detail.slice(0, 1) : [],
    }
  },
  {
    ...productDetailInfoActionCreators
  }
)(ProductDetail);
