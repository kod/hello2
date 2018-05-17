import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  WebView,
  UIManager,
  Platform,
  InteractionManager,
  DeviceEventEmitter,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SIDEINTERVAL,
  PRIMARY_COLOR, 
  RED_COLOR
} from "../styles/variables";

import * as productDetailActionCreators from '../common/actions/productDetail';
import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';
import * as commentActionCreators from '../common/actions/comment';

import {
  makegetProductDetailInfo,
  makegetProductDetailProperties,
  makegetProductDetailItem,
  makegetProductDetailColorVersionList,
} from '../common/selectors';
import CustomIcon from "../components/CustomIcon";
import BYBottomSheet from "../components/BYBottomSheet";
import BYTextInput from "../components/BYTextInput";
import BYTouchable from "../components/BYTouchable";
import { connectLocalization } from "../components/Localization";
import Loader from '../components/Loader';
import ProductDetailTabNavigator from "../navigations/ProductDetailTabNavigator";
import priceFormat from "../common/helpers/priceFormat";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  operate: {
    flexDirection: 'row',
  },
  operateLeft: {
    flex: 1,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    backgroundColor: '#fff',
  },
  operateRight: {
    flex: 1,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    backgroundColor: PRIMARY_COLOR
  },
  paramClose: {
    paddingTop: WINDOW_WIDTH * 0.03,
    paddingRight: WINDOW_WIDTH * 0.03,
    // marginBottom: 5,
  },
  paramCloseIcon: {
    color: '#ccc',
    fontSize: 24,
    textAlign: 'right',
  },
  paramInfo: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    flexDirection: 'row',
  },
  paramImage: {
    height: 60,
    width: 60,
    borderColor: '#f5f5f5',
    borderWidth: 1,
    marginRight: SIDEINTERVAL,
  },
  paramPrice: {
    color: RED_COLOR,
    fontSize: 18,
    paddingTop: 10,
    fontWeight: '700',
  },
  paramHave: {
    color: '#999',
    fontSize: 11,
  },
  paramTitle: {
    color: '#666',
    paddingLeft: SIDEINTERVAL,
    paddingTop: 20,
    marginBottom: 8
  },
  paramColor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
    // marginBottom: 20,
  },
  paramColorItem: {
    // width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    
    height: 35,
    lineHeight: 35,
    textAlign: 'center',
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    color: '#999',
    borderColor: '#f5f5f5',
    borderWidth: 1,
    paddingLeft: WINDOW_WIDTH * 0.05,
    paddingRight: WINDOW_WIDTH * 0.05,
  },
  paramColorItemAcitve: {
    borderColor: PRIMARY_COLOR,
    color: PRIMARY_COLOR,
  },
  paramNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: 10,
    marginBottom: 50,
  },
  paramNumberText: {
    flex: 1,
    color: '#666',
  },
  paramNumberChange: {
    flexDirection: 'row',
  },
  paramNumberRemoveIcon: {
    height: 30,
    lineHeight: 30,
    width: 30,
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    backgroundColor: '#fff',
    fontWeight: '900',
    borderColor: '#f5f5f5',
    borderWidth: 1,
  },
  paramNumberAddIcon: {
    height: 30,
    lineHeight: 30,
    width: 30,
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    backgroundColor: '#fff',
    fontWeight: '900',
    borderColor: '#f5f5f5',
    borderWidth: 1,
  },
  paramNumberIconDisable: {
    opacity: 0.5,
  },
  paramNumberTextInput: {
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 11,
    color: '#666',
    borderTopColor: '#f5f5f5',
    borderBottomColor: '#f5f5f5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  buttonWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL * 2,
  },
  button: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
  },
});

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMenuBottomSheet: false,
      productDetail: {},
      mounting: true,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    const {
      commentFetch,
      productDetailInfoFetch,
      productDetailInfoClear,
      productDetailInfoResult,
      propertiesIds,
      brandId,
      productDetailColorIdFetch,
      productDetailVersionIdFetch,
      // productDetailInfo: { product_detail, properties_detail }
    } = this.props;

    InteractionManager.runAfterInteractions(() => {
      this.setState({ mounting: false });
      productDetailInfoClear(brandId);
      productDetailInfoFetch(brandId, propertiesIds);
      commentFetch(brandId);  
    });

    // if (!productDetailInfoResult || !productDetailInfoResult.result) {
    //   productDetailInfoClear(brandId);
    //   InteractionManager.runAfterInteractions(() => {
    //     productDetailInfoFetch(brandId);
    //   });
    // }

    // setTimeout(() => {
    //   this.handleOnPressToggleMenuBottomSheet();
    // }, 300);

    
  }

  // handleOnCancelMenuBottomSheet = () => {
  //   this.setState({
  //     isOpenMenuBottomSheet: false,
  //   });
  // };

  handleOnPressToggleMenuBottomSheet = selectedImageIndex => {
    console.log(this.state.isOpenMenuBottomSheet);
    const newState = {
      isOpenMenuBottomSheet: !this.state.isOpenMenuBottomSheet,
    };
    // if (selectedImageIndex !== null) {
    //   newState.selectedImageIndex = selectedImageIndex;
    // }
    this.setState(newState);
  };

  setProductDetail(propertiesIds) {
    const {
      productDetailColorIdFetch,
      productDetailVersionIdFetch,
      productDetailInfo,
    } = this.props;
    if (!productDetailInfo.id) return false;
    if (propertiesIds.colorId) {
      console.log('rrrrrrrrrrrrrr');
      productDetailColorIdFetch(propertiesIds.colorId);
      // InteractionManager.runAfterInteractions(() => productDetailColorIdFetch(propertiesIds.colorId));
    }
    if (propertiesIds.versionId) {
      productDetailVersionIdFetch(propertiesIds.versionId)
      // InteractionManager.runAfterInteractions(() => productDetailVersionIdFetch(propertiesIds.versionId));
    }
  }

  // 是否有改组合商品
  productPartner(propertiesIdsObject) {
    const { product_detail } = this.props;
    return product_detail.filter((val, key) => {
      return Object.values(propertiesIdsObject).every((val1, key1) => val.propertiesIds.indexOf(val1 + '') !== -1)
    })[0];
  }

  selectVersion(id, name) {
    const { productDetailSelect, propertiesIdsObject, } = this.props;
    let object = {
      colorId: propertiesIdsObject.colorId,
      colorName: propertiesIdsObject.colorName,
      versionId: id,
      versionName: name,
    };
    const productDetail = this.productPartner({
      colorId: object.colorId,
      versionId: object.versionId,
    });
    productDetail ? productDetailSelect(object, productDetail) : ToastAndroid.show('无此组合', ToastAndroid.SHORT);
  }

  selectColor(id, name) {
    const { productDetailSelect, propertiesIdsObject, } = this.props;
    let object = {
      colorId: id,
      colorName: name,
      versionId: propertiesIdsObject.versionId,
      versionName: propertiesIdsObject.versionName,
    };
    const productDetail = this.productPartner({
      colorId: object.colorId,
      versionId: object.versionId,
    });
    productDetail ? productDetailSelect(object, productDetail) : ToastAndroid.show('无此组合', ToastAndroid.SHORT);
  }

  changeNumber(number) {
    const { productDetailNumberFetch, numbers } = this.props;
    console.log(numbers);
    console.log(number);
    if (number < 1 || number > numbers) return false;
    productDetailNumberFetch(number);
  }

  renderMainContent() {
    const { mounting } = this.state;
    const {
      i18n,
      screenProps,
      productDetailOpacity,
      productDetailNumber,
      productDetailColorId,
      productDetailVersionId,
      productDetailItem,
      colorArray,
      versionArray,
      propertiesIdsObject,
      imageUrls,
      price,
      imageDesc,
      goodsProperties,
      numbers,
      loading,
      // colorIdActive,
      // versionIdActive,
      // productDetailInfo: { product_detail, properties_detail }
    } = this.props;
    if (mounting) {
      return <Loader />;
    }

    if (loading) {
      return <Loader />;
    }
    
    return (
      <View style={styles.container} >
        <ProductDetailTabNavigator screenProps={{
          ...screenProps,
          BYopacity: productDetailOpacity,
          swiper: imageUrls,
          propertiesIdsObject,
          price,
          imageDesc,
          goodsProperties,
          handleOnPressToggleMenuBottomSheet: this.handleOnPressToggleMenuBottomSheet,
        }} />
        <View style={styles.operate} >
          <Text style={styles.operateLeft} >Add to cart</Text>
          <Text style={styles.operateRight} onPress={() => this.handleOnPressToggleMenuBottomSheet()} >buy</Text>
        </View>
      </View>
    )
  }

  render() {
    const { isOpenMenuBottomSheet } = this.state;
    const {
      i18n,
      screenProps,
      productDetailOpacity,
      productDetailNumber,
      productDetailColorId,
      productDetailVersionId,
      productDetailItem,
      colorArray,
      versionArray,
      propertiesIdsObject,
      imageUrls,
      price,
      imageDesc,
      goodsProperties,
      numbers,
    } = this.props;
    console.log(this.state);
    console.log(this.props);
    console.log('GGGGGGGGGGGGG');
    
    const { colorId = 0, versionId = 0 } = propertiesIdsObject;
    
    // if (propertiesIds.colorId || propertiesIds.versionId) {
    //   this.setProductDetail(propertiesIds);
    // }

    // const swiperImg = productDetailItem.imageUrls ? productDetailItem.imageUrls.split('|') : [];
    console.log(imageUrls);
    return (
      <View style={styles.container} >
        {this.renderMainContent()}
        <BYBottomSheet
          visible={isOpenMenuBottomSheet}
          onCancel={this.handleOnPressToggleMenuBottomSheet}
          listenCloseModal={() => this.handleOnPressToggleMenuBottomSheet()}
        >
          <View style={styles.paramClose}>
            <EvilIcons style={styles.paramCloseIcon} name={'close'} onPress={() => this.handleOnPressToggleMenuBottomSheet()} />
          </View>
          <View style={styles.paramInfo} >
            <Image style={styles.paramImage} source={{uri: imageUrls[0]}} />
            <View style={styles.paramInfoLeft} >
              <Text style={styles.paramPrice} >{priceFormat(price)} VND</Text>
              <Text style={styles.paramHave} >{i18n.warehouse}: {numbers > 0 ? i18n.inStock : i18n.soldOut}</Text>
            </View>
          </View>
          <Text style={styles.paramTitle} >{i18n.color}</Text>
          <View style={styles.paramColor} >
            {
              colorArray.map((val, key) => {
                return (
                  <Text 
                    style={[styles.paramColorItem, (val.id === colorId) && styles.paramColorItemAcitve]} 
                    onPress={() => this.selectColor(val.id, val.value)} 
                    key={key} 
                  >
                    {val.value}
                  </Text>
                )
              })
            }
            {/* <Text style={[styles.paramColorItem, styles.paramColorItemAcitve]} >black</Text>
            <Text style={styles.paramColorItem} >white</Text> */}
          </View>
          {!!versionArray.length && <Text style={styles.paramTitle} >RAM & {i18n.memory}</Text>}
          <View style={styles.paramColor} >
            {
              versionArray.map((val, key) => {
                return (
                  <Text 
                    style={[styles.paramColorItem, (val.id === versionId) && styles.paramColorItemAcitve]} 
                    onPress={() => this.selectVersion(val.id, val.value)} 
                    key={key} 
                  >
                    {val.value}
                  </Text>
                )
              })
            }

            {/* <Text style={[styles.paramColorItem, styles.paramColorItemAcitve]} >4+64G</Text>
            <Text style={styles.paramColorItem} >6+64G</Text>
            <Text style={styles.paramColorItem} >6+128G</Text>
            <Text style={styles.paramColorItem} >8+128G</Text> */}
          </View>
          <View style={styles.paramNumber} >
            <Text style={styles.paramNumberText} >số lượng</Text>
            <View style={styles.paramNumberChange} >

              <BYTouchable onPress={() => this.changeNumber(productDetailNumber - 1)} >
                <Ionicons 
                  name={'ios-remove'} 
                  style={[styles.paramNumberRemoveIcon, productDetailNumber === 1 && styles.paramNumberIconDisable]} 
                />
              </BYTouchable>
              <BYTextInput 
                style={styles.paramNumberTextInput} 
                keyboardType={'numeric'} 
                value={productDetailNumber + ''} 
                editable={false}
              />
              <BYTouchable onPress={() => this.changeNumber(productDetailNumber + 1)} >
                <Ionicons 
                  name={'ios-add'} 
                  style={[
                    styles.paramNumberAddIcon, 
                    parseInt(productDetailNumber) === numbers && styles.paramNumberIconDisable
                  ]} 
                />
              </BYTouchable>

            </View>
          </View>
          <View style={styles.buttonWrap} >
            <Text style={styles.button} onPress={() => this.handleOnPressToggleMenuBottomSheet()} >confirm</Text>
          </View>
        </BYBottomSheet>
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    // const getProductDetailInfo = makegetProductDetailInfo();
    // const getProductDetailProperties = makegetProductDetailProperties();
    // const getProductDetailItem = makegetProductDetailItem();
    // const getProductDetailColorVersionList = makegetProductDetailColorVersionList();
    return (state, props) => {
      console.log('tttttttttttttttttttttttttttttt');
      const { productDetail, productDetailInfo } = state;
      console.log(productDetailInfo);
      const brandId = props.brandId || props.navigation.state.params.brandId;
      let propertiesIds = props.propertiesIds || props.navigation.state.params.propertiesIds || '';
      // propertiesIds = propertiesIds || (productDetailInfo[brandId] ? productDetailInfo[brandId].propertiesIds : '');
      return {
        ...productDetailInfo.item,
        loading: productDetailInfo.loading,
        brandId,
        propertiesIds,
        // productDetailOpacity: productDetail.opacity,
        // productDetailNumber: productDetail.number,
        // productDetailColorId: productDetail.colorId,
        // productDetailVersionId: productDetail.versionId,
        // productDetailInfoResult: productDetailInfo[brandId],
        // propertiesIds: getProductDetailProperties(state, props),
        // productDetailInfo: getProductDetailInfo(state, props),
        // productDetailItem: getProductDetailItem(state, props),
        // product_color: getProductDetailColorVersionList(state, props).product_color,
        // product_version: getProductDetailColorVersionList(state, props).product_version,
      };
    };
  }, 
  { ...productDetailInfoActionCreators, ...productDetailActionCreators, ...commentActionCreators }
)(ProductDetail));
