import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  // Dimensions,
  // Image,
  // FlatList,
  WebView,
} from 'react-native';
import { connect } from 'react-redux';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connectLocalization } from '../components/Localization';

import CustomIcon from '../components/CustomIcon';
// import HeaderShareButton from '../components/HeaderShareButton';
// import ScrollableTabView from '../components/ScrollableTabView';
import SwiperFlatList from '../components/SwiperFlatList';
// import BYTouchable from '../components/BYTouchable';
import BYCacheImage from '../components/BYCacheImage';
import Comment from '../components/Comment';
import priceFormat from '../common/helpers/priceFormat';
import { jointWebViewImages } from '../common/helpers';

import {
  RED_COLOR,
  BORDER_COLOR,
  // PRIMARY_COLOR,
} from '../styles/variables';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  STATUSBAR_HEIGHT,
  SCREENS,
  MODAL_TYPES,
  OSS_IMAGE_QUALITY,
} from '../common/constants';

// import { getIsCollection } from '../common/selectors';

import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';
// import * as collectionActionCreators from '../common/actions/collection';
import * as commentActionCreators from '../common/actions/comment';
import * as modalActionCreators from '../common/actions/modal';

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
  favoriteIconActive: {
    color: RED_COLOR,
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
    height: 50,
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
  WebView: {
    height: WINDOW_HEIGHT,
  },
});

class ProductDetail extends Component {
  componentDidMount() {
    const {
      commentFetch,
      // collectionFetch,
      productDetailInfoFetch,
      productDetailInfoClear,
      propertiesIds,
      brandId,
      // isAuthUser,
    } = this.props;

    // if (isAuthUser) {
    //   collectionFetch();
    // }

    productDetailInfoClear(brandId);
    productDetailInfoFetch(brandId, propertiesIds);
    commentFetch(brandId);
  }

  handleOnScroll = event => {
    const { productDetailOpacityFetch } = this.props;
    let opacity = 0;
    const opacityHeight = event.nativeEvent.layoutMeasurement.width * 0.8;
    if (event.nativeEvent.contentOffset.y < opacityHeight) {
      opacity = event.nativeEvent.contentOffset.y / opacityHeight;
    } else {
      opacity = 1;
    }
    productDetailOpacityFetch(opacity);
  };

  // handleToggleCollection() {
  //   const {
  //     collectionAddFetch,
  //     collectionRemoveFetch,
  //     isCollection,
  //     isAuthUser,
  //     // navigation,
  //     brandId,
  //     screenProps: { mainNavigation },
  //   } = this.props;
  //   const { navigate } = mainNavigation;
  //   if (!isAuthUser) return navigate(SCREENS.Login);
  //   return isCollection
  //     ? collectionRemoveFetch(brandId.toString())
  //     : collectionAddFetch(brandId.toString());
  // }

  renderItem = ({ item }) => (
    <BYCacheImage
      uri={`${item}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
      key={item}
      // style={imageStyle}
      // onFoundImageSize={this.handleOnFoundImageSize}
    />
  );

  render() {
    const {
      name,
      comment,
      // isCollection,
      brandId,
      i18n,
      price,
      imageUrls,
      imageDesc,
      propertiesIds,
      propertiesIdsObject,
      navigation: { navigate },
      screenProps: { mainNavigation },
      // screenProps: {
      //   handleOnPressToggleMenuBottomSheet,
      // },
      openModal,
      productDetailNumber,
      colorArray,
      versionArray,
      numbers,
    } = this.props;

    // let WebViewImages;
    // switch (imageDesc.length) {
    //   case 0:
    //     WebViewImages = '';
    //     break;

    //   case 1:
    //     WebViewImages = `<img src="${imageDesc}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}" alt="image">`;
    //     break;

    //   default:
    //     WebViewImages = imageDesc.reduce((a, b, index) => {
    //       let resultStr = '';
    //       if (index === 1) {
    //         if (a)
    //           resultStr = `<img src="${a}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}" alt="image">`;
    //         if (b)
    //           resultStr += `<img src="${b}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}" alt="image">`;
    //       } else {
    //         if (b)
    //           resultStr = `<img src="${b}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}" alt="image">`;
    //         resultStr = a + resultStr;
    //       }
    //       return resultStr;
    //     });
    //     break;
    // }

    const WebViewHTML = `<!DOCTYPE html><html lang="en"><head><style>body,img{display:block;margin:0;padding:0;width:${WINDOW_WIDTH}px;}</style></head><body>${jointWebViewImages(
      imageDesc,
    )}</body></html>`;

    return (
      <View style={styles.container}>
        <ScrollView onScroll={this.handleOnScroll}>
          {/* <BYTouchable
            style={styles.favorite}
            backgroundColor="transparent"
            onPress={() => this.handleToggleCollection()}
          >
            {isCollection ? (
              <MaterialIcons
                name="favorite"
                style={[styles.favoriteIcon, styles.favoriteIconActive]}
              />
            ) : (
              <MaterialIcons
                name="favorite-border"
                style={styles.favoriteIcon}
              />
            )}
          </BYTouchable> */}
          <View style={styles.statusbarPlaceholder} />
          {imageUrls &&
            imageUrls.length > 0 && (
              <SwiperFlatList
                data={imageUrls}
                style={{ height: WINDOW_WIDTH }}
                styleWrap={{
                  height: WINDOW_WIDTH,
                  paddingBottom: WINDOW_WIDTH * 0.03,
                  backgroundColor: '#fff',
                }}
                stylePaginationContainer={{ justifyContent: 'center' }}
                paginationActiveColor="rgba(88,88,88,1)"
                paginationDefaultColor="rgba(88,88,88,.5)"
                autoplay={false}
              />
            )}

          <View style={styles.product}>
            <Text style={styles.productTitle}>{name}</Text>
            <Text style={styles.productPrice}>{priceFormat(price || 0)} ₫</Text>
            <View style={styles.serverinfo}>
              <CustomIcon style={styles.serverinfoToBePaid} name="returns" />
              <Text style={styles.serverinfoToBePaidText}>
                {i18n.qualityAssurance}
              </Text>
              <CustomIcon
                style={styles.serverinfotoReceiveGoods}
                name="toReceiveGoods"
              />
              <Text style={styles.serverinfotoReceiveGoodsText}>
                {i18n.fastDelivery}
              </Text>
            </View>
            <View style={styles.spec}>
              <Text style={styles.specTitle}>{i18n.selected}</Text>
              <Text
                style={styles.specDesc}
                onPress={() =>
                  openModal(MODAL_TYPES.PARAMSSELECT, {
                    i18n,
                    productDetailNumber,
                    colorArray,
                    versionArray,
                    imageUrls,
                    price,
                    numbers,
                    propertiesIdsObject,
                    brandId,
                    propertiesIds,
                  })
                }
              >
                {`${propertiesIdsObject.colorName} `}
                {propertiesIdsObject.versionName}
              </Text>
              <CustomIcon style={styles.specArrow} name="arrowright" />
            </View>
          </View>
          <Comment data={comment} />
          {!!comment.length && (
            <View style={styles.commentMore}>
              <Text
                style={styles.commentMoreText}
                onPress={() => navigate(SCREENS.ProductDetailComment)}
              >
                {i18n.more}
              </Text>
            </View>
          )}
          <WebView
            source={{
              html: WebViewHTML,
            }}
            style={styles.WebView}
          />
          <View style={[styles.commentMore, { paddingTop: SIDEINTERVAL }]}>
            <Text
              style={styles.commentMoreText}
              onPress={() =>
                mainNavigation.navigate(SCREENS.ProductDetailImages, {
                  html: WebViewHTML,
                })
              }
            >
              {i18n.more}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      console.log();
      return (state, props) => {
        const {
          productDetailInfo,
          comment,
          // collection,
          // productDetail,
        } = state;
        const {
          screenProps: {
            brandId,
            propertiesIds,
            // propertiesIds,
          },
        } = props;

        return {
          ...productDetailInfo.item,
          brandId,
          propertiesIds,
          comment: comment.items.detail ? comment.items.detail.slice(0, 1) : [],
          // isCollection: getIsCollection(state, props),
          isAuthUser: !!state.login.user,
        };
      };
    },
    {
      ...commentActionCreators,
      // ...collectionActionCreators,
      ...productDetailInfoActionCreators,
      ...modalActionCreators,
    },
  )(ProductDetail),
);
