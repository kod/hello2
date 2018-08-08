import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // ScrollView,
  // Dimensions,
  Image,
  UIManager,
  Platform,
  InteractionManager,
  // DeviceEventEmitter,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  BORDER_COLOR,
  PRIMARY_COLOR,
  RED_COLOR,
  // RED_COLOR,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  SCREENS,
  SIDEINTERVAL,
  // STATUSBAR_HEIGHT,
} from '../common/constants';

import * as productDetailActionCreators from '../common/actions/productDetail';
import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';
import * as cartActionCreators from '../common/actions/cart';

// import BYBottomSheet from '../components/BYBottomSheet';
// import BYTextInput from '../components/BYTextInput';
// import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import Loader from '../components/Loader';
import ProductDetailTabNavigator from '../navigations/ProductDetailTabNavigator';
import ProductDetailGrouponTabNavigator from '../navigations/ProductDetailGrouponTabNavigator';
import priceFormat from '../common/helpers/priceFormat';

const zalofunPng = require('../images/zalofun.png');
const googleplusPng = require('../images/googleplus.png');

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
    backgroundColor: PRIMARY_COLOR,
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
    backgroundColor: PRIMARY_COLOR,
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
    marginBottom: 8,
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

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMenuBottomSheet: false,
      // menuBottomSheetType: 'select',
      mounting: true,
    };

    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental)
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    // const {
    //   brandId,
    // } = this.props;

    InteractionManager.runAfterInteractions(() => {
      this.setState({ mounting: false });
    });

    // setTimeout(() => {
    //   this.handleOnPressToggleMenuBottomSheet('share');
    // }, 300);
  }

  handleOnPressToggleMenuBottomSheet = type => {
    const {
      isOpenMenuBottomSheet,
      // isOpenMenuBottomSheet,
    } = this.state;
    const newState = {
      isOpenMenuBottomSheet: !isOpenMenuBottomSheet,
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
    return true;
  };

  handleOnPressAddCart = () => {
    const {
      id,
      name,
      isAuthUser,
      cartAddRequest,
      // navigation,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    if (!id) return false;

    const param = [
      {
        quantity: 1,
        subject: name,
        itemId: id,
      },
    ];

    return cartAddRequest(JSON.stringify(param));
  };

  // 是否有改组合商品
  productPartner(propertiesIdsObject) {
    const { productDetail } = this.props;
    return productDetail.filter(val =>
      Object.values(propertiesIdsObject).every(
        val1 => val.propertiesIds.indexOf(val1.toString()) !== -1,
      ),
    )[0];
  }

  handleOnPressselectVersion(id, name) {
    const { productDetailSelect, propertiesIdsObject, i18n } = this.props;
    const object = {
      colorId: propertiesIdsObject.colorId,
      colorName: propertiesIdsObject.colorName,
      versionId: id,
      versionName: name,
    };
    const productDetail = this.productPartner({
      colorId: object.colorId,
      versionId: object.versionId,
    });
    if (productDetail) {
      productDetailSelect(object, productDetail);
    } else {
      ToastAndroid.show(i18n.soldOut, ToastAndroid.SHORT);
    }
  }

  handleOnPressselectColor(id, name) {
    const { productDetailSelect, propertiesIdsObject, i18n } = this.props;
    const object = {
      colorId: id,
      colorName: name,
      versionId: propertiesIdsObject.versionId,
      versionName: propertiesIdsObject.versionName,
    };
    const productDetail = this.productPartner({
      colorId: object.colorId,
      versionId: object.versionId,
    });
    if (productDetail) {
      productDetailSelect(object, productDetail);
    } else {
      ToastAndroid.show(i18n.soldOut, ToastAndroid.SHORT);
    }
  }

  handleOnPresschangeNumber(number) {
    const { productDetailNumberFetch, numbers } = this.props;
    if (number < 1 || number > numbers) return false;
    return productDetailNumberFetch(number);
  }

  handleOnPressBuy() {
    const {
      groupon,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    return navigate(SCREENS.OrderWrite, {
      groupon,
    });
  }

  renderMainContent() {
    const { mounting } = this.state;
    const {
      // id,
      // orgPrice,
      // name,
      // productDetailNumber,
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
      // masterItems,
      isMaster,
      // isAuthUser,
      // navigation: { navigate },
    } = this.props;
    if (mounting) {
      return <Loader />;
    }

    // let operateGroupRightText = '';
    // if (isAuthUser) {
    //   operateGroupRightText = '';
    // } else {
    //   operateGroupRightText = 'Start Group buying';
    // }

    return (
      <View style={styles.container}>
        {groupon ? (
          <ProductDetailGrouponTabNavigator
            screenProps={{
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
              handleOnPressToggleMenuBottomSheet: this
                .handleOnPressToggleMenuBottomSheet,
            }}
          />
        ) : (
          <ProductDetailTabNavigator
            screenProps={{
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
              handleOnPressToggleMenuBottomSheet: this
                .handleOnPressToggleMenuBottomSheet,
            }}
          />
        )}
        {groupon ? (
          <View style={styles.operate}>
            <View style={styles.operateGroupLeft}>
              <Text style={styles.operateGroupLeftOldPrice}>
                Price before: {priceFormat(price || 0)} VND
              </Text>
              <Text style={styles.operateGroupLeftPrice}>
                {priceFormat(mergePrice || 0)} VND
              </Text>
            </View>
            <Text
              style={styles.operateGroupRight}
              onPress={() => this.handleOnPressGroupBuy()}
            >
              {isMaster ? i18n.inviteFriends : i18n.startGroupBuy}
            </Text>
          </View>
        ) : (
          <View style={styles.operate}>
            <Text
              style={styles.operateLeft}
              onPress={() => this.handleOnPressAddCart()}
            >
              {i18n.addToCart}
            </Text>
            <Text
              style={styles.operateRight}
              onPress={() => this.handleOnPressBuy()}
            >
              {i18n.buy}
            </Text>
          </View>
        )}
      </View>
    );
  }

  renderMenuBottomShare() {
    const styles1 = StyleSheet.create({
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
      <View style={styles1.contanier}>
        <View style={styles1.title}>
          <Ionicons style={styles1.titleIcon} name="ios-paper-plane" />
          <Text style={styles1.titleText}>tap to share</Text>
        </View>
        <View style={styles1.main}>
          <Image style={styles1.item} source={zalofunPng} />
          <Image style={styles1.item} source={googleplusPng} />
        </View>
      </View>
    );
  }

  render() {
    // const { isOpenMenuBottomSheet, menuBottomSheetType } = this.state;

    return (
      <View style={styles.container}>
        {this.renderMainContent()}
        {/* <BYBottomSheet
          visible={isOpenMenuBottomSheet}
          onCancel={this.handleOnPressToggleMenuBottomSheet}
          // listenCloseModal={() => this.handleOnPressToggleMenuBottomSheet()}
        >
          {menuBottomSheetType === 'select'
            ? openModal(MODAL_TYPES.PARAMSSELECT, {
                callback: ret => console.log(ret),
              })
            : this.renderMenuBottomShare()}
        </BYBottomSheet> */}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    (state, props) => {
      const {
        productDetailInfo,
        mergeGetDetail,
        mergeGetMaster,
        mergeCheck,
      } = state;

      const {
        brandId,
        navigation,
        navigation: {
          state: {
            params: {
              groupon,
              // groupon,
            },
          },
        },
        propertiesIds,
        // navigation,
      } = props;

      const brandIdUsed = brandId || navigation.state.params.brandId;
      // const groupon = navigation.state.params.groupon;
      const propertiesIdsUsed =
        propertiesIds || navigation.state.params.propertiesIds || '';
      const item = groupon ? mergeGetDetail.item : productDetailInfo.item;
      return {
        ...item,
        brandId: brandIdUsed,
        groupon,
        isMaster: !!mergeCheck.item.mergeMasterId,
        propertiesIds: propertiesIdsUsed,
        masterItems: mergeGetMaster.items,
        isAuthUser: !!state.auth.user,
      };
    },
    {
      ...productDetailActionCreators,
      ...productDetailInfoActionCreators,
      ...cartActionCreators,
    },
  )(ProductDetail),
);
