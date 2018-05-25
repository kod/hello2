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
import BYTouchable from "../components/BYTouchable";
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

import { makegetIsCollection } from "../common/selectors";

import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';
import * as collectionActionCreators from '../common/actions/collection';
import * as commentActionCreators from '../common/actions/comment';

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
});

class ProductDetail extends React.Component {
  componentDidMount() {
    const {
      commentFetch,
      collectionFetch,
      productDetailInfoFetch,
      productDetailInfoClear,
      propertiesIds,
      brandId,
      authUser,
    } = this.props;
    authUser && collectionFetch();
    productDetailInfoClear(brandId);
    productDetailInfoFetch(brandId, propertiesIds);
    commentFetch(brandId);
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

  handleToggleCollection() {
    const {
      collectionAddFetch,
      collectionRemoveFetch,
      isCollection,
      authUser,
      navigation,
      brandId,
      screenProps: { mainNavigation },
    } = this.props;
    const { navigate } = mainNavigation;
    if (!authUser) return navigate(SCREENS.Login);
    isCollection ? collectionRemoveFetch(brandId + '') : collectionAddFetch(brandId + '');
  }
  
  render() {
    const {
      name,
      comment,
      isCollection,
      brandId,
      i18n,
      price,
      imageUrls,
      imageDesc,
      propertiesIdsObject,
      navigation: { navigate },
      screenProps: {
        handleOnPressToggleMenuBottomSheet,
      },
    } = this.props;
    console.log('ProductDetailMainProductDetailMainProductDetailMain');
    console.log(this.state);
    console.log(this.props);
    return (
      <View style={styles.container} >
        <ScrollView onScroll={this.handleOnScroll}>
          <BYTouchable style={styles.favorite} backgroundColor={'transparent'} onPress={() => this.handleToggleCollection()} >
            {
              isCollection ? 
              <MaterialIcons name="favorite" style={[styles.favoriteIcon, styles.favoriteIconActive]} /> : 
              <MaterialIcons name="favorite-border" style={styles.favoriteIcon} />
            }
          </BYTouchable>
          <View style={styles.statusbarPlaceholder} ></View>
          <SwiperFlatList 
            data={imageUrls} 
            style={{ height: WINDOW_WIDTH, }} 
            styleWrap={{ height: WINDOW_WIDTH, paddingBottom: WINDOW_WIDTH * 0.03, backgroundColor: '#fff' }}
            stylePaginationContainer={{ justifyContent: 'center', }}
            paginationActiveColor="rgba(88,88,88,1)"
            paginationDefaultColor="rgba(88,88,88,.5)"
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
              <Text style={styles.specDesc} onPress={() => handleOnPressToggleMenuBottomSheet('select')} >{propertiesIdsObject.colorName} {propertiesIdsObject.versionName}</Text>
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
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    const getIsCollection = makegetIsCollection();
    return (state, props) => {
      const { productDetailInfo, comment, collection, productDetail } = state;
      const { brandId, propertiesIds } = props.screenProps;

      return {
        ...productDetailInfo.item,
        brandId,
        propertiesIds,
        comment: comment.items.detail ? comment.items.detail.slice(0, 1) : [],
        isCollection: getIsCollection(state, props),
        authUser: state.auth.user,
      }
    }
  },
  {
    ...commentActionCreators,
    ...collectionActionCreators,
    ...productDetailInfoActionCreators,
  }
)(ProductDetail));
