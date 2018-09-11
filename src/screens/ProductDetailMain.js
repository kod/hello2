import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  WebView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { connectLocalization } from '../components/Localization';

import CustomIcon from '../components/CustomIcon';
import SwiperFlatList from '../components/SwiperFlatList';
import Comment from '../components/Comment';
import priceFormat from '../common/helpers/priceFormat';
import { jointWebViewImages } from '../common/helpers';

import { RED_COLOR, BORDER_COLOR } from '../styles/variables';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  STATUSBAR_HEIGHT,
  SCREENS,
  MODAL_TYPES,
  MONETARY,
} from '../common/constants';

import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';
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
      productDetailInfoFetch,
      productDetailInfoClear,
      propertiesIds,
      brandId,
    } = this.props;

    productDetailInfoClear(brandId);
    productDetailInfoFetch(brandId, propertiesIds);
    commentFetch(brandId);
  }

  componentWillReceiveProps(nextProps) {
    const { loaded: prevLoaded } = this.props;
    const {
      loaded,
      isTrue,
      i18n,
      msg,
      navigation: { pop },
    } = nextProps;

    if (prevLoaded !== loaded && loaded === true && isTrue === false) {
      // 修改交易密码成功
      Alert.alert(
        '',
        msg,
        [
          {
            text: i18n.confirm,
            onPress: () => {
              pop(1);
            },
          },
        ],
        { cancelable: false },
      );
    }
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

  render() {
    const {
      name,
      comment,
      brandId,
      i18n,
      price,
      imageUrls,
      imageDesc,
      propertiesIds,
      propertiesIdsObject,
      propertiesObjectForId,
      navigation: { navigate },
      screenProps: { mainNavigation },
      openModal,
      productDetailNumber,
      numbers,
    } = this.props;

    const WebViewHTML = `<!DOCTYPE html><html lang="en"><head><style>body,img{display:block;margin:0;padding:0;width:${WINDOW_WIDTH}px;}</style></head><body>${jointWebViewImages(
      imageDesc,
    )}</body></html>`;

    return (
      <View style={styles.container}>
        <ScrollView onScroll={this.handleOnScroll}>
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
            <Text style={styles.productPrice}>
              {`${priceFormat(price || 0)} ${MONETARY}`}
            </Text>
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
                    imageUrls,
                    price,
                    numbers,
                    propertiesIdsObject,
                    brandId,
                    propertiesIds,
                  })
                }
              >
                {propertiesIdsObject
                  .split('-')
                  .map(
                    val =>
                      propertiesObjectForId[val]
                        ? propertiesObjectForId[val].value
                        : '',
                  )
                  .join('  ')}
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
    () => (state, props) => {
      const {
        productDetailInfo,
        comment,
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
        loaded: productDetailInfo.loaded,
        isTrue: productDetailInfo.isTrue,
        msg: productDetailInfo.msg,
        brandId,
        propertiesIds,
        comment: comment.items.detail ? comment.items.detail.slice(0, 1) : [],
        isAuthUser: !!state.login.user,
      };
    },
    {
      ...commentActionCreators,
      ...productDetailInfoActionCreators,
      ...modalActionCreators,
    },
  )(ProductDetail),
);
