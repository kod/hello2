import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  UIManager,
  Platform,
  Alert,
  InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  MODAL_TYPES,
  MONETARY,
  // STATUSBAR_HEIGHT,
} from '../common/constants';

import { getIsCollection } from '../common/selectors';

import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import Loader from '../components/Loader';
import ProductDetailTabNavigator from '../navigations/ProductDetailTabNavigator';
import ProductDetailGrouponTabNavigator from '../navigations/ProductDetailGrouponTabNavigator';
import priceFormat from '../common/helpers/priceFormat';

import * as productDetailActionCreators from '../common/actions/productDetail';
import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';
import * as cartActionCreators from '../common/actions/cart';
import * as collectionActionCreators from '../common/actions/collection';
import * as modalActionCreators from '../common/actions/modal';

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
  operateIcon: {
    width: (WINDOW_WIDTH * 9) / 24,
    // flex: 9,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  operateIconItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operateIconItemIcon: {
    fontSize: 16,
  },
  operateIconItemActive: {
    color: PRIMARY_COLOR,
  },
  favoriteItem: {
    fontSize: 18,
  },
  favoriteIconActive: {
    color: PRIMARY_COLOR,
  },
  operateIconItemText: {
    fontSize: 10,
  },
  operateLeft: {
    width: (WINDOW_WIDTH * 5) / 24,
    // flex: 5,
    height: 49,
    lineHeight: 10 * 1.618,
    textAlign: 'center',
    fontSize: 10,
    paddingTop: 5,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    color: '#fff',
    backgroundColor: '#81bbf9',
    flexWrap: 'wrap',
  },
  operateRight: {
    width: (WINDOW_WIDTH * 10) / 24,
    // flex: 10,
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
  disable: {
    opacity: 0.5,
  },
});

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isOpenMenuBottomSheet: false,
      // menuBottomSheetType: 'select',
      mounting: true,
    };

    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental)
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    const {
      isAuthUser,
      collectionFetch,
      // isAuthUser,
    } = this.props;

    InteractionManager.runAfterInteractions(() => {
      this.setState({ mounting: false });
    });

    if (isAuthUser) {
      collectionFetch();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loaded: prevLoaded } = this.props;
    const {
      loaded,
      i18n,
      propertiesArray,
      navigation: { pop },
    } = nextProps;
    if (loaded !== prevLoaded && loaded === true) {
      if (propertiesArray.length === 0) {
        Alert.alert(
          '',
          i18n.productNotExistOrExpired,
          [
            {
              text: i18n.confirm,
              onPress: () => pop(1),
            },
          ],
          { cancelable: false },
        );
      }
    }
  }

  // handleOnPressToggleMenuBottomSheet = type => {
  //   const {
  //     isOpenMenuBottomSheet,
  //     // isOpenMenuBottomSheet,
  //   } = this.state;
  //   const newState = {
  //     isOpenMenuBottomSheet: !isOpenMenuBottomSheet,
  //     menuBottomSheetType: type,
  //   };
  //   // if (selectedImageIndex !== null) {
  //   //   newState.selectedImageIndex = selectedImageIndex;
  //   // }
  //   this.setState(newState);
  // };

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

  handleOnPressBuy() {
    const {
      numbers,
      groupon,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);
    if (!(numbers > 0)) return false;
    return navigate(SCREENS.OrderWrite, {
      groupon,
    });
  }

  handleToggleCollection() {
    const {
      collectionAddFetch,
      collectionRemoveFetch,
      isCollection,
      isAuthUser,
      brandId,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);
    return isCollection
      ? collectionRemoveFetch(brandId.toString())
      : collectionAddFetch(brandId.toString());
  }

  handleToggleShare = () => {
    const { openModal, brandId, typeId, id } = this.props;

    let productTypeId = 0;
    if (typeId !== undefined) {
      productTypeId = typeId;
    }
    let productId = 0;
    if (id !== undefined) {
      productId = id;
    }
    openModal(MODAL_TYPES.SHARE, {
      brandId,
      typeId: productTypeId,
      id: productId,
    });
  };

  handleToggleService() {
    const {
      isAuthUser,
      funid,
      brandId,
      typeId,
      name,
      navigation: { navigate },
    } = this.props;
    // console.log("handleToggleService");
    let linkStr = 'http://m.me/Buyoo.vn?ref=';
    let funIdStr = '';
    let typeID = 0;
    if (undefined !== typeId) {
      typeID = typeId;
    }
    if (isAuthUser) {
      funIdStr = funid;
    }
    let shareName = '';
    if (undefined !== name) {
      shareName = name;
    }
    const param = {
      brand_id: brandId,
      fun_id: funIdStr,
      type_id: typeID,
      name: shareName,
    };
    linkStr += JSON.stringify(param);
    // console.log(linkStr);
    navigate(SCREENS.WebView, {
      source: linkStr,
    });
  }

  renderMainContent() {
    const { mounting } = this.state;
    const {
      i18n,
      screenProps,
      productDetailOpacity,
      price,
      mergePrice,
      brandId,
      navigation,
      groupon,
      isMaster,
      isCollection,
      numbers,
    } = this.props;
    if (mounting) {
      return <Loader />;
    }

    return (
      <View style={styles.container}>
        {groupon ? (
          <ProductDetailGrouponTabNavigator
            screenProps={{
              ...screenProps,
              BYopacity: productDetailOpacity,
              brandId,
              mainNavigation: navigation,
            }}
          />
        ) : (
          <ProductDetailTabNavigator
            screenProps={{
              ...screenProps,
              BYopacity: productDetailOpacity,
              brandId,
              mainNavigation: navigation,
            }}
          />
        )}
        {groupon ? (
          <View style={styles.operate}>
            <View style={styles.operateGroupLeft}>
              <Text style={styles.operateGroupLeftOldPrice}>
                Price before: {`${priceFormat(price || 0)} ${MONETARY}`}
              </Text>
              <Text style={styles.operateGroupLeftPrice}>
                {`${priceFormat(mergePrice || 0)} ${MONETARY}`}
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
            <View style={styles.operateIcon}>
              <BYTouchable
                style={styles.operateIconItem}
                onPress={() => this.handleToggleShare()}
              >
                <SimpleLineIcons
                  style={[
                    styles.operateIconItemIcon,
                    styles.operateIconItemActive,
                  ]}
                  name="share"
                />
                <Text
                  style={[
                    styles.operateIconItemText,
                    styles.operateIconItemActive,
                  ]}
                >
                  {i18n.share}
                </Text>
              </BYTouchable>
              <BYTouchable
                style={styles.operateIconItem}
                onPress={() => this.handleToggleCollection()}
              >
                {isCollection ? (
                  <MaterialIcons
                    name="favorite"
                    style={[styles.favoriteItem, styles.operateIconItemActive]}
                  />
                ) : (
                  <MaterialIcons
                    name="favorite-border"
                    style={styles.favoriteItem}
                  />
                )}
                {/* <MaterialIcons
                  style={[styles.operateIconItemIcon, { fontSize: 17 }]}
                  name="favorite-border"
                /> */}
                <Text
                  style={[
                    styles.operateIconItemText,
                    isCollection && styles.operateIconItemActive,
                  ]}
                >
                  {i18n.collect}
                </Text>
              </BYTouchable>
              <BYTouchable
                style={styles.operateIconItem}
                onPress={() => this.handleToggleService()}
              >
                <MaterialIcons
                  style={styles.operateIconItemIcon}
                  name="chat-bubble-outline"
                />
                <Text style={styles.operateIconItemText}>{i18n.service}</Text>
              </BYTouchable>
            </View>
            <Text
              style={styles.operateLeft}
              onPress={() => this.handleOnPressAddCart()}
            >
              {i18n.addToCart}
            </Text>
            <Text
              style={[styles.operateRight, !(numbers > 0) && styles.disable]}
              onPress={() => this.handleOnPressBuy()}
            >
              {numbers > 0 ? i18n.buy : i18n.soldOut}
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

    const { i18n } = this.props;

    return (
      <View style={styles1.contanier}>
        <View style={styles1.title}>
          <Ionicons style={styles1.titleIcon} name="ios-paper-plane" />
          <Text style={styles1.titleText}>{i18n.share}</Text>
        </View>
        <View style={styles1.main}>
          <Image style={styles1.item} source={zalofunPng} />
          <Image style={styles1.item} source={googleplusPng} />
        </View>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderMainContent()}</View>;
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
      } = props;

      const brandIdUsed = brandId || navigation.state.params.brandId;
      const item = groupon ? mergeGetDetail.item : productDetailInfo.item;
      const loaded = groupon ? mergeGetDetail.loaded : productDetailInfo.loaded;
      return {
        ...item,
        loaded,
        brandId: brandIdUsed,
        groupon,
        isMaster: !!mergeCheck.item.mergeMasterId,
        masterItems: mergeGetMaster.items,
        funid: state.login.user ? state.login.user.result : null,
        isAuthUser: !!state.login.user,
        isCollection: getIsCollection(state, props),
      };
    },
    {
      ...productDetailActionCreators,
      ...productDetailInfoActionCreators,
      ...cartActionCreators,
      ...collectionActionCreators,
      ...modalActionCreators,
    },
  )(ProductDetail),
);
