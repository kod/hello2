import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  // Dimensions,
  ScrollView,
} from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import { PRIMARY_COLOR, RED_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  // WINDOW_HEIGHT,
  // SIDEINTERVAL,
  // APPBAR_HEIGHT,
  SCREENS,
  STATUSBAR_HEIGHT,
} from '../common/constants';
import BYTouchable from '../components/BYTouchable';
import CustomIcon from '../components/CustomIcon';
import NavBar1 from '../components/NavBar1';
import { connectLocalization } from '../components/Localization';

import * as queryOrderListActionCreators from '../common/actions/queryOrderList';
import * as cardQueryActionCreators from '../common/actions/cardQuery';
import * as userCertificateInfoActionCreators from '../common/actions/userCertificateInfo';
import * as getUserInfoByIdActionCreators from '../common/actions/getUserInfoById';

const aioru09230fPng = require('../images/aioru09230f.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: PRIMARY_COLOR,
    paddingTop: STATUSBAR_HEIGHT,
  },
  headerIcon: {
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 30,
  },
  headerIconImg: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginBottom: 5,
  },
  headerIconText: {
    fontSize: 11,
    color: '#fff',
  },
  headerBottom: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
  },
  headerItemPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  headerItemText: {
    color: '#fff',
    fontSize: 11,
  },
  nav1: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  nav1Item: {
    position: 'relative',
    alignItems: 'center',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  nav1ItemIcon: {
    fontSize: 22,
    color: '#ccc',
    marginBottom: 5,
  },
  nav1ItemText: {
    fontSize: 11,
    color: '#ccc',
    textAlign: 'center',
    paddingLeft: WINDOW_WIDTH * 0.01,
    paddingRight: WINDOW_WIDTH * 0.01,
  },
  nav1ItemBadge: {
    position: 'absolute',
    top: 5,
    right: WINDOW_WIDTH * 0.1,
    backgroundColor: RED_COLOR,
    color: '#fff',
    fontSize: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 1,
    borderRadius: 100,
  },
});

class Me extends Component {
  constructor(props) {
    super(props);
    this.handleOnNavBar1Callback = this.handleOnNavBar1Callback.bind(this);
    // this.didFocusAddListener = this.didFocusAddListener.bind(this)
  }

  componentDidMount() {
    const {
      authUser,
      // queryOrderListFetch,
      cardQueryFetch,
      userCertificateInfoFetch,
      navigation,
      getUserInfoByIdFetch,
    } = this.props;

    this.didBlurSubscription = navigation.addListener('didFocus', () =>
      this.didFocusAddListener(),
    );

    if (authUser) {
      cardQueryFetch();
      userCertificateInfoFetch();
      getUserInfoByIdFetch();
    }
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  didFocusAddListener() {
    const {
      authUser,
      queryOrderListFetch,
      // cardQueryFetch,
    } = this.props;

    if (authUser) {
      queryOrderListFetch({
        index: 0,
        status: '99999',
      });
      queryOrderListFetch({
        index: 1,
        status: '10000',
      });
      queryOrderListFetch({
        index: 2,
        status: '30000',
      });
      queryOrderListFetch({
        index: 3,
        status: '30001',
      });
    }
  }

  async handleOnPressOrderNav(index) {
    const {
      // queryOrderListIndexFetch,
      navigation: { navigate },
      authUser,
    } = this.props;
    // await queryOrderListIndexFetch({
    //   scrollTabIndex: index,
    // });
    if (authUser) {
      navigate(SCREENS.Order, { index });
    } else {
      navigate(SCREENS.Login);
    }
  }

  renderNav1() {
    const {
      screenProps: { i18n },
      orderItem,
      // navigation: { navigate },
    } = this.props;

    const list = [
      {
        text: i18n.pendingPayment,
        iconName: 'toBePaid',
        styleIcon: { fontSize: 25 },
      },
      {
        text: i18n.pendingDelivery,
        iconName: 'toReceiveGoods',
        styleIcon: { fontSize: 23, paddingTop: 2 },
      },
      {
        text: i18n.pendingEvaluation,
        iconName: 'beEvaluated',
        styleIcon: { fontSize: 22, paddingTop: 3 },
      },
      // {
      //   text: i18n.afterSalesService,
      //   iconName: 'returns',
      //   styleIcon: { fontSize: 23, paddingTop: 2 },
      // },
    ];

    return (
      <View style={styles.nav1}>
        {list.map((val, key) => (
          <BYTouchable
            style={styles.nav1Item}
            key={val.text}
            onPress={() => this.handleOnPressOrderNav(key + 1)}
          >
            <CustomIcon
              style={[styles.nav1ItemIcon, val.styleIcon]}
              name={val.iconName}
            />
            <Text style={styles.nav1ItemText}>{val.text}</Text>
            {orderItem[key + 1].items.length > 0 && (
              <Text style={styles.nav1ItemBadge}>
                {orderItem[key + 1].items.length > 0 &&
                  orderItem[key + 1].items.length}
              </Text>
            )}
          </BYTouchable>
        ))}
      </View>
    );
  }

  handleOnPressUser() {
    const {
      navigation: { navigate },
      authUser,
    } = this.props;

    if (authUser) {
      navigate(SCREENS.Settings);
    } else {
      navigate(SCREENS.Login);
    }
  }

  handleOnNavBar1Callback(screens) {
    // const SCREENSName = screens.navigate;
    const {
      navigation: { navigate },
      authUser,
    } = this.props;

    switch (screens) {
      case SCREENS.AboutAs:
      case SCREENS.Settings:
      case SCREENS.Invite:
        navigate(screens);
        break;

      default:
        if (authUser) {
          navigate(screens);
        } else {
          navigate(SCREENS.Login);
        }
        break;
    }
  }

  render() {
    const {
      // navigation: { navigate },
      screenProps: { i18n },
      certUser,
      authUser,
      getUserInfoByIdUserType,
      // initPassword,
      // status,
    } = this.props;

    const headerIconImgSource =
      authUser && certUser.headimage
        ? { uri: certUser.headimage }
        : aioru09230fPng;

    const username = authUser ? certUser.username : i18n.loginRegister;
    const phone = authUser ? authUser.msisdn : '';

    const renderCellItem1List1 = [
      // {
      //   name: i18n.bills,
      //   navigate: SCREENS.Settings,
      //   tips: i18n.monthlyRepaymentOnThe6th,
      // },
      {
        name: i18n.orders,
        func: () => this.handleOnNavBar1Callback(SCREENS.Order),
        tips: '',
      },
    ];
    const renderCellItem1List2 = [
      {
        name: i18n.cart,
        navigate: SCREENS.Cart,
        func: () => this.handleOnNavBar1Callback(SCREENS.Cart),
        tips: '',
      },
      {
        name: i18n.inviteFriends,
        func: () => this.handleOnNavBar1Callback(SCREENS.Invite),
        tips: '',
      },
      {
        name: i18n.myCollection,
        func: () => this.handleOnNavBar1Callback(SCREENS.MyCollection),
        tips: '',
      },
      {
        name: i18n.myCoupon,
        func: () => this.handleOnNavBar1Callback(SCREENS.CouponMy),
        tips: '',
      },
      {
        name: i18n.securityCenter,
        func: () => this.handleOnNavBar1Callback(SCREENS.SecurityCenter),
        tips: '',
      },
      {
        name: i18n.shippingAddress,
        func: () => this.handleOnNavBar1Callback(SCREENS.Address),
        tips: '',
      },
      // {
      //   name: i18n.aboutAs,
      //   func: () => this.handleOnNavBar1Callback(SCREENS.AboutAs),
      //   tips: '',
      // },
      // {
      //   name: i18n.followUs,
      //   func: () => this.handleOnNavBar1Callback(SCREENS.Settings),
      //   tips: '',
      // },
      {
        name: i18n.settings,
        func: () => this.handleOnNavBar1Callback(SCREENS.Settings),
        tips: '',
      },
    ];

    if (getUserInfoByIdUserType === 2) {
      renderCellItem1List2.unshift({
        name: i18n.myBill,
        navigate: SCREENS.BillMy,
        func: () => this.handleOnNavBar1Callback(SCREENS.BillMy),
        tips: '',
      });
    }

    // if (status !== undefined && status !== 3) {
    //   renderCellItem1List2.unshift(
    //     {
    //       name: i18n.certifiedInformation,
    //       navigate: SCREENS.CertifiedInformation,
    //       tips: '',
    //     },
    //   );
    // }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.header}>
              <BYTouchable
                style={styles.headerIcon}
                onPress={() => this.handleOnPressUser()}
              >
                <Image
                  style={styles.headerIconImg}
                  source={headerIconImgSource}
                />
                <Text style={styles.headerIconText}>{username || phone}</Text>
              </BYTouchable>
              {/* {this.renderHeaderBottom()} */}
            </View>
            <NavBar1
              list={renderCellItem1List1}
              // callback={this.handleOnNavBar1Callback}
            />
            {this.renderNav1()}
            <NavBar1
              list={renderCellItem1List2}
              // callback={this.handleOnNavBar1Callback}
              styleItemLeft={{ flex: 3 }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    state => {
      const {
        userCertificateInfo,
        login,
        queryOrderList,
        cardQuery,
        getUserInfoById,
      } = state;
      return {
        getUserInfoByIdUserType: getUserInfoById.item.userType,
        orderItem: queryOrderList.item,
        certUser: userCertificateInfo.certUser,
        authUser: login.user,
        initPassword: cardQuery.item.initPassword,
        status: cardQuery.item.status,
      };
    },
    {
      ...getUserInfoByIdActionCreators,
      ...queryOrderListActionCreators,
      ...cardQueryActionCreators,
      ...userCertificateInfoActionCreators,
    },
  )(Me),
);
