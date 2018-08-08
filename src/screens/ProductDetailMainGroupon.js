import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, WebView } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { connectLocalization } from '../components/Localization';

import BYBottomSheet from "../components/BYBottomSheet";
import BYTouchable from '../components/BYTouchable';
import CustomIcon from '../components/CustomIcon';
import HeaderShareButton from '../components/HeaderShareButton';
import ScrollableTabView from '../components/ScrollableTabView';
import SwiperFlatList from '../components/SwiperFlatList';
import ImageGetSize from "../components/ImageGetSize";
import Comment from "../components/Comment";
import priceFormat from "../common/helpers/priceFormat";
import { SCREENS } from '../common/constants';


import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';

import { makegetIsCollection } from '../common/selectors';

import * as mergeGetDetailActionCreators from '../common/actions/mergeGetDetail';
import * as mergeGetMasterActionCreators from '../common/actions/mergeGetMaster';
import * as mergeGetSlaveActionCreators from '../common/actions/mergeGetSlave';
import * as mergeCheckActionCreators from '../common/actions/mergeCheck';
import * as orderCreateActionCreators from '../common/actions/orderCreate';
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
  WebView: {
    height: WINDOW_HEIGHT,
  },
});

class GrouponList extends Component {
  render() {
    const styles = StyleSheet.create({
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
    const {
      item,
    } = this.props;
    return (
      <View style={styles.grouponInfoMain}>
        <MasterAvatar avatar={item.headimage ? { uri: item.headimage } :require('../images/aioru09230f.png')} imageStyle={{height:30,width:30}} />
        <Ionicons style={styles.grouponInfoItemWait} name={'ios-help-circle-outline'} />
      </View>
    );
  }
}

class MasterAvatar extends Component {
  render() {
    const styles = StyleSheet.create({
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
    } = this.props;
    return (
      <View style={[styles.masterAvatar, style]}>
        <Image style={[styles.masterAvatarImg, imageStyle]} source={avatar} />
        <Image style={styles.masterAvatarIcon} source={require('../images/groupon948943.png')} />
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
      mergeGetSlaveFetch,
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
      isAuthUser,
      brandId,
      screenProps: { mainNavigation: { navigate } },
    } = this.props;
    // const { navigate } = mainNavigation;
    if (!isAuthUser) return navigate(SCREENS.Login);
    isCollection ? collectionRemoveFetch(brandId + '') : collectionAddFetch(brandId + '');
  }

  handleOnPressToggleGroup = (type, val = '') => {
    const {
      screenProps: { mainNavigation: { navigate } },
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
  };

  handleOnPressJoinInGroupBuy() {
    const {
      value,
    } = this.state;

    const {
      screenProps: { mainNavigation: { navigate } },
    } = this.props;

    this.handleOnPressToggleGroup()
    
    navigate(SCREENS.OrderWrite, {
      groupon: true,
      mergeMasterInfo: value,
    });
  }

  renderBottomSheetGroupSelf() {
    const styles = StyleSheet.create({
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
    } = this.props;

    const item = masterItems[0] || {};
    const createTime = item ? item.createTime : '';
    
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.top}>
            <MasterAvatar avatar={item.headimage ? { uri: item.headimage } :require('../images/aioru09230f.png')} />
            <Text style={styles.masterName}>{item.username ? item.username : item.msisdn}</Text>
            <Text style={styles.createTime}>{`${createTime} ${i18n.startANewGroupBuying}`}</Text>
            <Text style={styles.proccess}>{`${item.slaveNum + 1}/${item.personNum}`}</Text>
            <EvilIcons name={'close'} style={styles.close} onPress={() => this.handleOnPressToggleGroup()} />
          </View>
          <ScrollView style={styles.bottom}>
            {
              masterItems.map((val, key) => {
                return (
                  <View style={styles.item} key={key}>
                    <Image style={styles.itemAvatar} source={val.headimage ? { uri: val.headimage } :require('../images/aioru09230f.png')} />
                    <Text style={styles.itemText}>{val.username}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    )
  }

  renderBottomSheetGroupJoin() {
    const styles = StyleSheet.create({
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

    const {
      value
    } = this.state;
    
    const {
      i18n,
      // screenProps: {
      //   handleOnPressToggleMenuBottomSheet,
      // },
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>{i18n.joinInGroupBuy} {value.username ? value.username : value.msisdn}</Text>
          <GrouponList item={value} />
          <View style={styles.buttonWrap}>
            <Text style={styles.button} onPress={() => this.handleOnPressJoinInGroupBuy()}>{i18n.joinInGroupBuy}</Text>
          </View>
          <EvilIcons name={'close'} style={styles.close} onPress={() => this.handleOnPressToggleGroup()} />
        </View>
      </View>
    )
  }

  renderBottomSheetGroupList() {
    const styles = StyleSheet.create({
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
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>{i18n.groupBuy}</Text>
          <ScrollView style={styles.wrap}>
            {
              masterItems.map((val, key) => 
                <View key={key}>
                  {this.renderGrouponJoin(val)}
                </View>
              )
            }
          </ScrollView>
          <EvilIcons name={'close'} style={styles.close} onPress={() => this.handleOnPressToggleGroup()} />
        </View>
      </View>
    )
  }

  renderGrouponJoin(val) {
    const styles = StyleSheet.create({
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
    } = this.props;
    
    return (
      <View style={styles.grouponJoinMain}>
        <Image style={styles.grouponJoinMainLeft} source={val.headimage ? { uri: val.headimage } :require('../images/aioru09230f.png')} />
        <View style={styles.grouponJoinMainMiddle}>
          <Text style={styles.grouponJoinMainRow2} numberOfLines={1}>{val.username ? val.username : val.msisdn}</Text>
          <Text style={styles.grouponJoinMainRow1}>{i18n.need} {val.personNum - val.slaveNum - 1} {i18n.person}</Text>
        </View>
        <Text style={styles.grouponJoinMainRight} onPress={() => this.handleOnPressToggleGroup('join', val)} backgroundColor={'transparent'}>{i18n.join}</Text>
      </View>
    )
  }

  renderGroupon() {
    const styles = StyleSheet.create({
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
      },
    } = this.props;

    return (
      <View style={styles.container}>
        {
          masterItems.length === 0
          &&
          <View style={styles.groupon}>
            <Text style={styles.grouponTitle}>{i18n.groupBuy}</Text>
            <Text style={styles.grouponDesc} onPress={() => handleOnPressToggleMenuBottomSheet('select')}>{i18n.startGroupBuy}</Text>
            <CustomIcon style={styles.grouponArrow} name="arrowright" />
          </View>
        }
        {
          masterItems.length > 0 && isMaster === true
          &&
          <BYTouchable style={styles.grouponInfo} onPress={() => this.handleOnPressToggleGroup('self')} backgroundColor={'transparent'}>
            <View style={styles.grouponInfoTitle}>
              <Text style={styles.grouponInfoTitleLeft}>{i18n.groupBuy}</Text>
              <Text style={styles.grouponInfoTitleMiddle}>{i18n.details}</Text>
              <CustomIcon style={styles.grouponInfoTitleRight} name="arrowright" />
            </View>
            <GrouponList item={masterItems[0]} />
          </BYTouchable>
        }
        {
          masterItems.length > 0 && isMaster === false
          &&
          <View style={styles.grouponJoin}>
            <View style={styles.grouponJoinTitle}>
              <Text style={styles.grouponJoinTitleText}>{masterItems.length} {i18n.personGroupBuying}</Text>
              <Text style={styles.grouponJoinMore} onPress={() => this.handleOnPressToggleGroup('list')} backgroundColor={'transparent'}>{i18n.more}</Text>
              <CustomIcon style={styles.grouponArrow} name="arrowright" onPress={() => this.handleOnPressToggleGroup('list')} backgroundColor={'transparent'} />
            </View>
            {this.renderGrouponJoin(masterItems[0])}
          </View>
        }
      </View>
    )
  }
  
  render() {
    const { isOpenMenuBottomSheet, menuBottomSheetType } = this.state;
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
      screenProps: { mainNavigation },
      screenProps: {
        handleOnPressToggleMenuBottomSheet,
      },
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
          if (index === 1) {
            let resultStr = `<img src="${a}?x-oss-process=image/quality,Q_70" alt="image">`;
            resultStr += `<img src="${b}?x-oss-process=image/quality,Q_70" alt="image">`;
            return resultStr;
          } else {
            let resultStr = `<img src="${b}?x-oss-process=image/quality,Q_70" alt="image">`;
            return a + resultStr;
          }
        });
        break;
    }

    const WebViewHTML = `<!DOCTYPE html><html lang="en"><head><style>body,img{display:block;margin:0;padding:0;width:${WINDOW_WIDTH}px;}</style></head><body>${WebViewImages}</body></html>`
    
    return (
      <View style={styles.container}>
        <ScrollView onScroll={this.handleOnScroll}>
          <BYTouchable style={styles.favorite} backgroundColor={'transparent'} onPress={() => this.handleToggleCollection()}>
            {
              isCollection ? 
              <MaterialIcons name="favorite" style={[styles.favoriteIcon, styles.favoriteIconActive]} /> : 
              <MaterialIcons name="favorite-border" style={styles.favoriteIcon} />
            }
          </BYTouchable>
          <View style={styles.statusbarPlaceholder}></View>
          <SwiperFlatList 
            data={imageUrls} 
            style={{ height: WINDOW_WIDTH, }} 
            styleWrap={{ height: WINDOW_WIDTH, paddingBottom: WINDOW_WIDTH * 0.03, backgroundColor: '#fff' }}
            stylePaginationContainer={{ justifyContent: 'center', }}
            paginationActiveColor="rgba(88,88,88,1)"
            paginationDefaultColor="rgba(88,88,88,.5)"
            autoplay={false}
          />
          <View style={styles.product}>
            <Text style={styles.productTitle}>{name}</Text>
            <Text style={styles.productPrice}>{priceFormat(price || 0)} VND</Text>
            <View style={styles.serverinfo}>
              <CustomIcon style={styles.serverinfoToBePaid} name="returns" ></CustomIcon>
              <Text style={styles.serverinfoToBePaidText}>{i18n.qualityAssurance}</Text>
              <CustomIcon style={styles.serverinfotoReceiveGoods} name="toReceiveGoods" ></CustomIcon>
              <Text style={styles.serverinfotoReceiveGoodsText}>{i18n.fastDelivery}</Text>
            </View>
            <View style={styles.spec}>
              <Text style={styles.specTitle}>{i18n.selected}</Text>
              <Text style={styles.specDesc} onPress={() => handleOnPressToggleMenuBottomSheet('select')}>{propertiesIdsObject.colorName} {propertiesIdsObject.versionName}</Text>
              <CustomIcon style={styles.specArrow} name="arrowright" />
            </View>
          </View>
          {this.renderGroupon()}
          <Comment data={comment} />
          {
            !!comment.length &&
            <View style={styles.commentMore}>
              <Text style={styles.commentMoreText} onPress={() => navigate(SCREENS.ProductDetailComment)}>{i18n.more}</Text>
            </View>
          }
          <WebView
            source={
              {
                html: WebViewHTML,
              }
            }
            style={styles.WebView}
          />
          <View style={[styles.commentMore, {paddingTop: SIDEINTERVAL}]}>
            <Text style={styles.commentMoreText} onPress={() => mainNavigation.navigate(SCREENS.ProductDetailImages, { html: WebViewHTML })}>{i18n.more}</Text>
          </View>
          {/* {
            imageDesc.map((val, key) => {
              return <ImageGetSize uri={`${val}?x-oss-process=image/quality,Q_70`} key={key} />
            })
          } */}
        </ScrollView>
        <BYBottomSheet
          containerStyle={{justifyContent: 'center',}}
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

export default connectLocalization(connect(
  () => {
    const getIsCollection = makegetIsCollection();
    return (state, props) => {
      const { mergeGetDetail, comment, collection, productDetail, mergeGetMaster, mergeCheck } = state;
      const { brandId, propertiesIds } = props.screenProps;

      return {
        ...mergeGetDetail.item,
        brandId,
        propertiesIds,
        masterItems: mergeGetMaster.items,
        comment: comment.items.detail ? comment.items.detail.slice(0, 1) : [],
        isCollection: getIsCollection(state, props),
        isAuthUser: !!state.auth.user,
        isMaster: !!mergeCheck.item.mergeMasterId
      }
    }
  },
  {
    ...commentActionCreators,
    ...collectionActionCreators,
    ...orderCreateActionCreators,
    ...mergeCheckActionCreators,
    ...mergeGetSlaveActionCreators,
    ...mergeGetDetailActionCreators,
    ...mergeGetMasterActionCreators,
  }
)(ProductDetail));
