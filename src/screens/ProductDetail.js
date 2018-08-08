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


import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR, } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';

import * as productDetailActionCreators from '../common/actions/productDetail';
import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';
import * as cartActionCreators from '../common/actions/cart';

import BYBottomSheet from "../components/BYBottomSheet";
import BYTextInput from '../components/BYTextInput';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import Loader from '../components/Loader';
import ProductDetailTabNavigator from "../navigations/ProductDetailTabNavigator";
import ProductDetailGrouponTabNavigator from "../navigations/ProductDetailGrouponTabNavigator";
import priceFormat from "../common/helpers/priceFormat";
import { SCREENS } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  operate: {
    flexDirection: 'row',
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
  },
  operateLeft: {
    flex: 1,
    height: 49,
    lineHeight: 49,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    backgroundColor: '#fff',
  },
  operateRight: {
    flex: 1,
    height: 49,
    lineHeight: 49,
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    backgroundColor: PRIMARY_COLOR
  },
  operateGroupLeft: {
    flex: 3,
    height: 49,
    paddingTop: 5,
    backgroundColor: '#fff',
    paddingLeft: SIDEINTERVAL,
  },
  operateGroupLeftOldPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#999',
    fontSize: 12,
  },
  operateGroupLeftPrice: {
    color: RED_COLOR,
    fontSize: 16,
  },
  operateGroupRight: {
    flex: 2,
    height: 49,
    lineHeight: 49,
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
    borderColor: BORDER_COLOR,
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
    borderColor: BORDER_COLOR,
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
    borderColor: BORDER_COLOR,
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
    borderColor: BORDER_COLOR,
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
    borderTopColor: BORDER_COLOR,
    borderBottomColor: BORDER_COLOR,
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
      menuBottomSheetType: 'select',
      mounting: true,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    const {
      brandId,
    } = this.props;

    InteractionManager.runAfterInteractions(() => {
      this.setState({ mounting: false });
    });
    
    // setTimeout(() => {
    //   this.handleOnPressToggleMenuBottomSheet('share');
    // }, 300);

  }

  handleOnPressToggleMenuBottomSheet = type => {
    const newState = {
      isOpenMenuBottomSheet: !this.state.isOpenMenuBottomSheet,
      menuBottomSheetType: type,
    };
    // if (selectedImageIndex !== null) {
    //   newState.selectedImageIndex = selectedImageIndex;
    // }
    this.setState(newState);
  };

  handleOnPressGroupBuy = () => {
    const {
      isAuthUser,
      navigation: { navigate },
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);

  }

  handleOnPressAddCart = () => {
    const {
      id,
      name,
      isAuthUser,
      cartAddRequest,
      navigation,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    if (!id) return false;

    const param = [{
      quantity: 1,
      subject: name,
      itemId: id,
    }];

    cartAddRequest(JSON.stringify(param));
  }

  // 是否有改组合商品
  productPartner(propertiesIdsObject) {
    const { product_detail } = this.props;
    return product_detail.filter((val, key) => {
      return Object.values(propertiesIdsObject).every((val1, key1) => val.propertiesIds.indexOf(val1 + '') !== -1)
    })[0];
  }

  handleOnPressselectVersion(id, name) {
    const { productDetailSelect, propertiesIdsObject, i18n } = this.props;
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
    productDetail ? productDetailSelect(object, productDetail) :  ToastAndroid.show(i18n.soldOut, ToastAndroid.SHORT);
  }

  handleOnPressselectColor(id, name) {
    const { productDetailSelect, propertiesIdsObject, i18n } = this.props;
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
    productDetail ? productDetailSelect(object, productDetail) :  ToastAndroid.show(i18n.soldOut, ToastAndroid.SHORT);
  }

  handleOnPresschangeNumber(number) {
    const { productDetailNumberFetch, numbers } = this.props;
    if (number < 1 || number > numbers) return false;
    productDetailNumberFetch(number);
  }

  handleOnPressBuy() {
    const {
      groupon,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    navigate(SCREENS.OrderWrite, {
      groupon,
    });
  }

  renderMainContent() {
    const { mounting } = this.state;
    const {
      id,
      orgPrice,
      name,
      productDetailNumber,
      i18n,
      screenProps,
      productDetailOpacity,
      propertiesIds,
      propertiesIdsObject,
      imageUrls,
      price,
      mergePrice,
      imageDesc,
      goodsProperties,
      brandId,
      navigation,
      groupon,
      masterItems,
      isMaster,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (mounting) {
      return <Loader />;
    }
    
    let operateGroupRightText = '';
    if (isAuthUser) {
      operateGroupRightText = '';
    } else {
      operateGroupRightText = 'Start Group buying';
    }

    return (
      <View style={styles.container} >
        {
          groupon
          ?
          <ProductDetailGrouponTabNavigator screenProps={{
            ...screenProps,
            BYopacity: productDetailOpacity,
            swiper: imageUrls,
            propertiesIdsObject,
            propertiesIds,
            price,
            imageDesc,
            goodsProperties,
            brandId,
            mainNavigation: navigation,
            handleOnPressToggleMenuBottomSheet: this.handleOnPressToggleMenuBottomSheet,
          }} />
          :
          <ProductDetailTabNavigator screenProps={{
            ...screenProps,
            BYopacity: productDetailOpacity,
            swiper: imageUrls,
            propertiesIdsObject,
            propertiesIds,
            price,
            imageDesc,
            goodsProperties,
            brandId,
            mainNavigation: navigation,
            handleOnPressToggleMenuBottomSheet: this.handleOnPressToggleMenuBottomSheet,
          }} />
        }
        {
          groupon
          ?
          <View style={styles.operate} >
            <View style={styles.operateGroupLeft}>
              <Text style={styles.operateGroupLeftOldPrice} >Price before: {priceFormat(price || 0)} VND</Text>
              <Text style={styles.operateGroupLeftPrice} >{priceFormat(mergePrice || 0)} VND</Text>
            </View>
            <Text style={styles.operateGroupRight} onPress={() => this.handleOnPressGroupBuy()} >{ isMaster ? i18n.inviteFriends : i18n.startGroupBuy }</Text>
          </View>
          :
          <View style={styles.operate} >
            <Text style={styles.operateLeft} onPress={() => this.handleOnPressAddCart()} >{i18n.addToCart}</Text>
            <Text style={styles.operateRight} 
              onPress={() => this.handleOnPressBuy()} 
            >
              {i18n.buy}
            </Text>
          </View>
        }
      </View>
    )
  }

  renderMenuBottomSelect() {
    const {
      i18n,
      productDetailNumber,
      colorArray,
      versionArray,
      imageUrls,
      price,
      numbers,
      propertiesIdsObject,
    } = this.props;
    
    const { colorId = 0, versionId = 0 } = propertiesIdsObject;

    return (
      <View style={{backgroundColor: '#fff'}}>
        <View style={styles.paramClose}>
          <EvilIcons style={styles.paramCloseIcon} name={'close'} onPress={() => this.handleOnPressToggleMenuBottomSheet()} />
        </View>
        <View style={styles.paramInfo} >
          {
            imageUrls[0] && 
            <Image style={styles.paramImage} source={{uri: imageUrls[0].imageUrl}} />
          }
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
                  onPress={() => this.handleOnPressselectColor(val.id, val.value)} 
                  key={key} 
                >
                  {val.value}
                </Text>
              )
            })
          }
        </View>
        {!!versionArray.length && <Text style={styles.paramTitle} >RAM & {i18n.memory}</Text>}
        <View style={styles.paramColor} >
          {
            versionArray.map((val, key) => {
              return (
                <Text 
                  style={[styles.paramColorItem, (val.id === versionId) && styles.paramColorItemAcitve]} 
                  onPress={() => this.handleOnPressselectVersion(val.id, val.value)} 
                  key={key} 
                >
                  {val.value}
                </Text>
              )
            })
          }
        </View>
        <View style={styles.paramNumber} >
          <Text style={styles.paramNumberText} >số lượng</Text>
          <View style={styles.paramNumberChange} >

            <BYTouchable onPress={() => this.handleOnPresschangeNumber(productDetailNumber - 1)} >
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
            <BYTouchable onPress={() => this.handleOnPresschangeNumber(productDetailNumber + 1)} >
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
      </View>
    )
  }

  renderMenuBottomShare() {
    const styles = StyleSheet.create({
      contanier: {
        paddingTop: 20,
        backgroundColor: '#fff',
      },
      title: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 30,
      },
      titleIcon: {
        fontSize: 16,
        color: '#333',
        paddingTop: 2,
        paddingRight: 4,
      },
      titleText: {
        fontSize: 14,
        color: '#333',
      },
      main: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40,
      },
      item: {
        height: 40,
        width: 40,
      },
    });
    return (
      <View style={styles.contanier} >
        <View style={styles.title} >
          <Ionicons style={styles.titleIcon} name={'ios-paper-plane'} />
          <Text style={styles.titleText} >tap to share</Text>
        </View>
        <View style={styles.main} >
          <Image style={styles.item} source={require('../images/zalofun.png')} />
          <Image style={styles.item} source={require('../images/googleplus.png')} />
        </View>
      </View>
    )
  }

  render() {
    const { isOpenMenuBottomSheet, menuBottomSheetType } = this.state;
    // const {
    //   i18n,
    // } = this.props;
    
    return (
      <View style={styles.container} >
        {this.renderMainContent()}
        <BYBottomSheet
          visible={isOpenMenuBottomSheet}
          onCancel={this.handleOnPressToggleMenuBottomSheet}
          // listenCloseModal={() => this.handleOnPressToggleMenuBottomSheet()}
        >
          { menuBottomSheetType === 'select' ? this.renderMenuBottomSelect() : this.renderMenuBottomShare()}
        </BYBottomSheet>
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    return (state, props) => {
      const { productDetail, productDetailInfo, mergeGetDetail, mergeGetMaster, mergeCheck } = state;
      const brandId = props.brandId || props.navigation.state.params.brandId;
      const groupon = props.navigation.state.params.groupon;
      let propertiesIds = props.propertiesIds || props.navigation.state.params.propertiesIds || '';
      const item = groupon ? mergeGetDetail.item : productDetailInfo.item;
      return {
        ...item,
        brandId,
        groupon,
        isMaster: !!mergeCheck.item.mergeMasterId,
        propertiesIds,
        masterItems: mergeGetMaster.items,
        isAuthUser: !!state.auth.user,
      };
    };
  }, 
  {
    ...productDetailActionCreators,
    ...productDetailInfoActionCreators,
    ...cartActionCreators,
  }
)(ProductDetail));
