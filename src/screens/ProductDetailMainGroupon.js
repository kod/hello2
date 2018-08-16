/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  WebView,
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { connectLocalization } from '../components/Localization';

import BYBottomSheet from '../components/BYBottomSheet';
import BYTouchable from '../components/BYTouchable';
import CustomIcon from '../components/CustomIcon';
// import HeaderShareButton from '../components/HeaderShareButton';
// import ScrollableTabView from '../components/ScrollableTabView';
import SwiperFlatList from '../components/SwiperFlatList';
// import ImageGetSize from "../components/ImageGetSize";
import Comment from '../components/Comment';
import priceFormat from '../common/helpers/priceFormat';

import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  STATUSBAR_HEIGHT,
  SCREENS,
} from '../common/constants';

import { makegetIsCollection } from '../common/selectors';

import * as mergeGetDetailActionCreators from '../common/actions/mergeGetDetail';
import * as mergeGetMasterActionCreators from '../common/actions/mergeGetMaster';
import * as mergeGetSlaveActionCreators from '../common/actions/mergeGetSlave';
import * as mergeCheckActionCreators from '../common/actions/mergeCheck';
import * as orderCreateActionCreators from '../common/actions/orderCreate';
import * as collectionActionCreators from '../common/actions/collection';
import * as commentActionCreators from '../common/actions/comment';

const aioru09230fPng = require('../images/aioru09230f.png');
const groupon948943Png = require('../images/groupon948943.png');

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

class GrouponList extends Component {
  render() {
    const stylesX = StyleSheet.create({
      grouponInfoMain: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
      },
      grouponInfoItemWait: {
        fontSize: 35,
        color: '#d5d5d5',
      },
    });
    const { item } = this.props;
    return (
      <View style={stylesX.grouponInfoMain}>
        <MasterAvatar
          avatar={item.headimage ? { uri: item.headimage } : aioru09230fPng}
          imageStyle={{ height: 30, width: 30 }}
        />
        <Ionicons
          style={stylesX.grouponInfoItemWait}
          name="ios-help-circle-outline"
        />
      </View>
    );
  }
}

class MasterAvatar extends Component {
  render() {
    const stylesX = StyleSheet.create({
      masterAvatar: {
        position: 'relative',
        marginRight: 8,
        paddingTop: 3,
        marginBottom: 5,
      },
      masterAvatarImg: {
        height: 35,
        width: 35,
        borderRadius: 100,
      },
      masterAvatarIcon: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 10,
        width: 10,
      },
    });
    const {
      style,
      imageStyle,
      avatar,
      // avatar,
    } = this.props;
    return (
      <View style={[stylesX.masterAvatar, style]}>
        <Image style={[stylesX.masterAvatarImg, imageStyle]} source={avatar} />
        <Image style={stylesX.masterAvatarIcon} source={groupon948943Png} />
      </View>
    );
  }
}

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMenuBottomSheet: false,
      menuBottomSheetType: 'self', // self, join, list
      value: null,
    };
  }

  componentDidMount() {
    const {
      commentFetch,
      collectionFetch,
      mergeGetDetailFetch,
      mergeCheckFetch,
      // mergeGetSlaveFetch,
      mergeGetMasterFetch,
      mergeGetDetailClear,
      propertiesIds,
      brandId,
      isAuthUser,
    } = this.props;

    if (isAuthUser) {
      collectionFetch();
      mergeCheckFetch({
        brandId,
      });
    }

    mergeGetDetailClear(brandId);
    mergeGetDetailFetch(brandId, propertiesIds);
    commentFetch(brandId);
    // mergeGetSlaveFetch({
    //   brandId,
    // });
    mergeGetMasterFetch({
      brandId,
    });

    // setTimeout(() => {
    //   this.handleOnPressToggleGroup('list');
    // }, 300);
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

  handleToggleCollection() {
    const {
      collectionAddFetch,
      collectionRemoveFetch,
      isCollection,
      isAuthUser,
      brandId,
      screenProps: {
        mainNavigation: { navigate },
      },
    } = this.props;
    // const { navigate } = mainNavigation;
    if (!isAuthUser) return navigate(SCREENS.Login);
    if (isCollection) {
      collectionRemoveFetch(brandId.toString());
    } else {
      collectionAddFetch(brandId.toString());
    }
    return true;
  }

  handleOnPressToggleGroup = (type, val = '') => {
    const {
      screenProps: {
        mainNavigation: { navigate },
      },
      isAuthUser,
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);

    let isShow = false;
    switch (type) {
      case 'self':
      case 'join':
      case 'list':
        isShow = true;
        break;
      default:
        isShow = false;
        break;
    }
    this.setState({
      isOpenMenuBottomSheet: isShow,
      menuBottomSheetType: type,
      value: val,
    });
    return true;
  };

  handleOnPressJoinInGroupBuy() {
    const { value } = this.state;

    const {
      screenProps: {
        mainNavigation: { navigate },
      },
    } = this.props;

    this.handleOnPressToggleGroup();

    navigate(SCREENS.OrderWrite, {
      groupon: true,
      mergeMasterInfo: value,
    });
  }

  renderBottomSheetGroupSelf() {
    const stylesX = StyleSheet.create({
      container: {
        paddingLeft: WINDOW_WIDTH * 0.1,
        paddingRight: WINDOW_WIDTH * 0.1,
      },
      main: {
        position: 'relative',
        // backgroundColor: '#fff',
      },
      top: {
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: '#fff',
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
      },
      masterName: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 3,
      },
      createTime: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginBottom: 3,
      },
      proccess: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginBottom: 12,
      },
      bottom: {
        height: WINDOW_HEIGHT * 0.3,
        backgroundColor: '#f2f2f2',
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        paddingTop: SIDEINTERVAL,
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: SIDEINTERVAL,
      },
      itemAvatar: {
        height: 35,
        width: 35,
        borderRadius: 100,
        marginRight: WINDOW_WIDTH * 0.03,
      },
      close: {
        position: 'absolute',
        fontSize: 24,
        top: 5,
        right: 5,
        color: '#999',
      },
    });

    const {
      i18n,
      masterItems,
      // masterItems,
    } = this.props;

    const item = masterItems[0] || {};
    const createTime = item ? item.createTime : '';

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          <View style={stylesX.top}>
            <MasterAvatar
              avatar={item.headimage ? { uri: item.headimage } : aioru09230fPng}
            />
            <Text style={stylesX.masterName}>
              {item.username ? item.username : item.msisdn}
            </Text>
            <Text style={stylesX.createTime}>{`${createTime} ${
              i18n.startANewGroupBuying
            }`}</Text>
            <Text style={stylesX.proccess}>{`${item.slaveNum + 1}/${
              item.personNum
            }`}</Text>
            <EvilIcons
              name="close"
              style={stylesX.close}
              onPress={() => this.handleOnPressToggleGroup()}
            />
          </View>
          <ScrollView style={stylesX.bottom}>
            {masterItems.map((val, key) => (
              <View style={stylesX.item} key={key}>
                <Image
                  style={stylesX.itemAvatar}
                  source={
                    val.headimage ? { uri: val.headimage } : aioru09230fPng
                  }
                />
                <Text style={stylesX.itemText}>{val.username}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  renderBottomSheetGroupJoin() {
    const stylesX = StyleSheet.create({
      container: {
        paddingLeft: WINDOW_WIDTH * 0.1,
        paddingRight: WINDOW_WIDTH * 0.1,
      },
      main: {
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 7,
      },
      title: {
        height: 40,
        lineHeight: 40,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
        marginBottom: 15,
      },
      buttonWrap: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 5,
      },
      button: {
        marginBottom: SIDEINTERVAL,
        height: 40,
        lineHeight: 40,
        textAlign: 'center',
        backgroundColor: PRIMARY_COLOR,
        color: '#fff',
        borderRadius: 7,
      },
      close: {
        position: 'absolute',
        fontSize: 24,
        top: 5,
        right: 5,
        color: '#aaa',
      },
    });

    const { value } = this.state;

    const {
      i18n,
      // screenProps: {
      //   handleOnPressToggleMenuBottomSheet,
      // },
    } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          <Text style={stylesX.title}>
            {`${i18n.joinInGroupBuy} ${
              value.username ? value.username : value.msisdn
            }`}
          </Text>
          <GrouponList item={value} />
          <View style={stylesX.buttonWrap}>
            <Text
              style={stylesX.button}
              onPress={() => this.handleOnPressJoinInGroupBuy()}
            >
              {i18n.joinInGroupBuy}
            </Text>
          </View>
          <EvilIcons
            name="close"
            style={stylesX.close}
            onPress={() => this.handleOnPressToggleGroup()}
          />
        </View>
      </View>
    );
  }

  renderBottomSheetGroupList() {
    const stylesX = StyleSheet.create({
      container: {
        paddingLeft: WINDOW_WIDTH * 0.1,
        paddingRight: WINDOW_WIDTH * 0.1,
      },
      main: {
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 7,
      },
      title: {
        height: 45,
        lineHeight: 45,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
        marginBottom: 15,
        color: '#333',
        fontSize: 16,
      },
      wrap: {
        height: WINDOW_HEIGHT * 0.4,
      },
      close: {
        position: 'absolute',
        fontSize: 24,
        top: 5,
        right: 5,
        color: '#aaa',
      },
    });

    const {
      i18n,
      masterItems,
      // screenProps: {
      //   handleOnPressToggleMenuBottomSheet,
      // },
    } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          <Text style={stylesX.title}>{i18n.groupBuy}</Text>
          <ScrollView style={stylesX.wrap}>
            {masterItems.map((val, key) => (
              <View key={key}>{this.renderGrouponJoin(val)}</View>
            ))}
          </ScrollView>
          <EvilIcons
            name="close"
            style={stylesX.close}
            onPress={() => this.handleOnPressToggleGroup()}
          />
        </View>
      </View>
    );
  }

  renderGrouponJoin(val) {
    const stylesX = StyleSheet.create({
      grouponJoinMain: {
        flexDirection: 'row',
        paddingBottom: 15,
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
      },
      grouponJoinMainLeft: {
        height: 40,
        width: 40,
        borderRadius: 100,
        marginRight: SIDEINTERVAL,
      },
      grouponJoinMainMiddle: {
        flex: 1,
      },
      grouponJoinMainRight: {
        width: 80,
        height: 40,
        lineHeight: 40,
        textAlign: 'center',
        backgroundColor: PRIMARY_COLOR,
        color: '#fff',
        borderRadius: 7,
      },
      grouponJoinMainRow1: {
        textAlign: 'left',
        fontSize: 12,
        color: '#999',
        paddingRight: WINDOW_WIDTH * 0.02,
        // backgroundColor: '#f00',
        // lineHeight: 14,
      },
      grouponJoinMainRow2: {
        color: '#333',
        fontSize: 15,
        // lineHeight: 16,
      },
    });

    const {
      i18n,
      // i18n,
    } = this.props;

    return (
      <View style={stylesX.grouponJoinMain}>
        <Image
          style={stylesX.grouponJoinMainLeft}
          source={val.headimage ? { uri: val.headimage } : aioru09230fPng}
        />
        <View style={stylesX.grouponJoinMainMiddle}>
          <Text style={stylesX.grouponJoinMainRow2} numberOfLines={1}>
            {val.username ? val.username : val.msisdn}
          </Text>
          <Text style={stylesX.grouponJoinMainRow1}>
            {i18n.need} {val.personNum - val.slaveNum - 1} {i18n.person}
          </Text>
        </View>
        <Text
          style={stylesX.grouponJoinMainRight}
          onPress={() => this.handleOnPressToggleGroup('join', val)}
          backgroundColor="transparent"
        >
          {i18n.join}
        </Text>
      </View>
    );
  }

  renderGroupon() {
    const stylesX = StyleSheet.create({
      container: {
        marginBottom: 5,
      },
      groupon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        height: 50,
        backgroundColor: '#fff',
        paddingLeft: SIDEINTERVAL,
      },
      grouponTitle: {
        fontSize: 14,
        color: '#999',
        paddingRight: 15,
      },
      grouponDesc: {
        fontSize: 14,
        color: '#666',
        flex: 1,
      },
      grouponArrow: {
        fontSize: 10,
        color: '#999',
        paddingRight: SIDEINTERVAL,
      },
      grouponInfo: {
        backgroundColor: '#fff',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      grouponInfoTitle: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
      },
      grouponInfoTitleLeft: {
        fontSize: 14,
        color: '#999',
      },
      grouponInfoTitleMiddle: {
        flex: 1,
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
      },
      grouponInfoTitleRight: {
        paddingLeft: SIDEINTERVAL,
        fontSize: 10,
        color: '#999',
      },
      grouponInfoMain: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
      },
      grouponInfoItemWait: {
        fontSize: 29,
        color: '#d5d5d5',
      },
      grouponJoin: {
        backgroundColor: '#fff',
      },
      grouponJoinTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        marginBottom: 10,
      },
      grouponJoinTitleText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        paddingLeft: SIDEINTERVAL,
      },
      grouponJoinMore: {
        color: '#999',
        fontSize: 12,
        paddingRight: SIDEINTERVAL,
      },
    });

    const {
      i18n,
      isMaster,
      masterItems,
      screenProps: {
        handleOnPressToggleMenuBottomSheet,
        // handleOnPressToggleMenuBottomSheet,
      },
    } = this.props;

    return (
      <View style={stylesX.container}>
        {masterItems.length === 0 && (
          <View style={stylesX.groupon}>
            <Text style={stylesX.grouponTitle}>{i18n.groupBuy}</Text>
            <Text
              style={stylesX.grouponDesc}
              onPress={() => handleOnPressToggleMenuBottomSheet('select')}
            >
              {i18n.startGroupBuy}
            </Text>
            <CustomIcon style={stylesX.grouponArrow} name="arrowright" />
          </View>
        )}
        {masterItems.length > 0 &&
          isMaster === true && (
            <BYTouchable
              style={stylesX.grouponInfo}
              onPress={() => this.handleOnPressToggleGroup('self')}
              backgroundColor="transparent"
            >
              <View style={stylesX.grouponInfoTitle}>
                <Text style={stylesX.grouponInfoTitleLeft}>
                  {i18n.groupBuy}
                </Text>
                <Text style={stylesX.grouponInfoTitleMiddle}>
                  {i18n.details}
                </Text>
                <CustomIcon
                  style={stylesX.grouponInfoTitleRight}
                  name="arrowright"
                />
              </View>
              <GrouponList item={masterItems[0]} />
            </BYTouchable>
          )}
        {masterItems.length > 0 &&
          isMaster === false && (
            <View style={stylesX.grouponJoin}>
              <View style={stylesX.grouponJoinTitle}>
                <Text style={stylesX.grouponJoinTitleText}>{`${
                  masterItems.length
                } ${i18n.personGroupBuying}`}</Text>
                <Text
                  style={stylesX.grouponJoinMore}
                  backgroundColor="transparent"
                  onPress={() => this.handleOnPressToggleGroup('list')}
                >
                  {i18n.more}
                </Text>
                <CustomIcon
                  style={stylesX.grouponArrow}
                  name="arrowright"
                  onPress={() => this.handleOnPressToggleGroup('list')}
                  backgroundColor="transparent"
                />
              </View>
              {this.renderGrouponJoin(masterItems[0])}
            </View>
          )}
      </View>
    );
  }

  render() {
    const { isOpenMenuBottomSheet, menuBottomSheetType } = this.state;
    const {
      name,
      comment,
      isCollection,
      // brandId,
      i18n,
      price,
      imageUrls,
      imageDesc,
      propertiesIdsObject,
      navigation: { navigate },
      screenProps: { mainNavigation },
      screenProps: { handleOnPressToggleMenuBottomSheet },
    } = this.props;

    let WebViewImages;
    switch (imageDesc.length) {
      case 0:
        WebViewImages = '';
        break;

      case 1:
        WebViewImages = `<img src="${imageDesc}?x-oss-process=image/quality,Q_70" alt="image">`;
        break;

      default:
        WebViewImages = imageDesc.reduce((a, b, index) => {
          let resultStr;
          if (index === 1) {
            resultStr = `<img src="${a}?x-oss-process=image/quality,Q_70" alt="image">`;
            resultStr += `<img src="${b}?x-oss-process=image/quality,Q_70" alt="image">`;
          } else {
            resultStr = `<img src="${b}?x-oss-process=image/quality,Q_70" alt="image">`;
            resultStr = a + resultStr;
          }
          return resultStr;
        });
        break;
    }

    const WebViewHTML = `<!DOCTYPE html><html lang="en"><head><style>body,img{display:block;margin:0;padding:0;width:${WINDOW_WIDTH}px;}</style></head><body>${WebViewImages}</body></html>`;

    return (
      <View style={styles.container}>
        <ScrollView onScroll={this.handleOnScroll}>
          <BYTouchable
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
          </BYTouchable>
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
                onPress={() => handleOnPressToggleMenuBottomSheet('select')}
              >
                {`${propertiesIdsObject.colorName} ${
                  propertiesIdsObject.versionName
                }`}
              </Text>
              <CustomIcon style={styles.specArrow} name="arrowright" />
            </View>
          </View>
          {this.renderGroupon()}
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
          {/* {
            imageDesc.map((val, key) => {
              return <ImageGetSize uri={`${val}?x-oss-process=image/quality,Q_70`} key={key} />
            })
          } */}
        </ScrollView>
        <BYBottomSheet
          containerStyle={{
            justifyContent: 'center',
          }}
          visible={isOpenMenuBottomSheet}
          onCancel={this.handleOnPressToggleGroup}
        >
          {menuBottomSheetType === 'list' && this.renderBottomSheetGroupList()}
          {menuBottomSheetType === 'join' && this.renderBottomSheetGroupJoin()}
          {menuBottomSheetType === 'self' && this.renderBottomSheetGroupSelf()}
        </BYBottomSheet>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      const getIsCollection = makegetIsCollection();
      return (state, props) => {
        const { mergeGetDetail, comment, mergeGetMaster, mergeCheck } = state;
        // const { brandId, propertiesIds } = props.screenProps;
        const {
          screenProps: {
            brandId,
            propertiesIds,
            // propertiesIds,
          },
        } = props;

        return {
          ...mergeGetDetail.item,
          brandId,
          propertiesIds,
          masterItems: mergeGetMaster.items,
          comment: comment.items.detail ? comment.items.detail.slice(0, 1) : [],
          isCollection: getIsCollection(state, props),
          isAuthUser: !!state.login.user,
          isMaster: !!mergeCheck.item.mergeMasterId,
        };
      };
    },
    {
      ...commentActionCreators,
      ...collectionActionCreators,
      ...orderCreateActionCreators,
      ...mergeCheckActionCreators,
      ...mergeGetSlaveActionCreators,
      ...mergeGetDetailActionCreators,
      ...mergeGetMasterActionCreators,
    },
  )(ProductDetail),
);
