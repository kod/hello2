import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { PRIMARY_COLOR, RED_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from "../common/constants";
import { SCREENS } from "../common/constants";
import BYTouchable from '../components/BYTouchable';
import CustomIcon from "../components/CustomIcon";
import NavBar1 from "../components/NavBar1";

import * as queryOrderListActionCreators from '../common/actions/queryOrderList';

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
    fontWeight: "700",
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
  }
});

class Me extends React.Component {

  componentDidMount() {
    const { 
      queryOrderListFetch,
    } = this.props;

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

  async handleOnPressOrderNav(index) {
    const { 
      queryOrderListIndexFetch,
      navigation: { navigate }
    } = this.props;
    // await queryOrderListIndexFetch({
    //   scrollTabIndex: index,
    // });
    navigate(SCREENS.Order, { index })
  }
  
  renderHeaderBottom() {
    const { authUser } = this.props;
    
    const list = [
      {
        price: '6,205,000',
        text: 'April stay also(₫)',
      },
      {
        price: '7,205,000',
        text: 'May stay also(₫)',
      },
    ]

    return (
      <View style={styles.headerBottom} >
        {list.map((val, key) => 
          <View style={styles.headerItem} key={key} >
            <Text style={styles.headerItemPrice} >{val.price}</Text>
            <Text style={styles.headerItemText} >{val.text}</Text>
          </View>
        )}
      </View>
    );
  }

  renderNav1() {    
    const {
      screenProps: { i18n },
      orderItem,
      navigation: { navigate }
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
      <View style={styles.nav1} >
        {list.map((val, key) => 
          <BYTouchable 
            style={styles.nav1Item} 
            key={key} 
            onPress={() => this.handleOnPressOrderNav(key + 1)}
          >
            <CustomIcon style={[styles.nav1ItemIcon, val.styleIcon]} name={val.iconName} ></CustomIcon>
            <Text style={styles.nav1ItemText}>{val.text}</Text>
            {
              orderItem[key + 1].items.length > 0 && 
              <Text style={styles.nav1ItemBadge} >{ orderItem[key + 1].items.length > 0 && orderItem[key + 1].items.length}</Text>
            }
          </BYTouchable>
      )}
      </View>
    );
  }

  handleOnPressUser() {
    const { navigation: { navigate }, authUser } = this.props;

    authUser ? navigate(SCREENS.Settings) : navigate(SCREENS.Login);
  }
  
  render() {
    const { navigation, navigation: { navigate }, screenProps: { i18n }, certUser, authUser } = this.props;

    const headerIconImgSource = (authUser && certUser.headimage) ?  {uri: certUser.headimage} : require('../images/aioru09230f.png');
    
    const username = authUser ? certUser.username : i18n.loginRegister;

    const renderCellItem1List1 = [
      // {
      //   name: i18n.bills,
      //   navigate: SCREENS.Settings,
      //   tips: i18n.monthlyRepaymentOnThe6th,
      // },
      {
        name: i18n.orders,
        navigate: SCREENS.Order,
        tips: '',
      },
    ];

    const renderCellItem1List2 = [
      {
        name: i18n.cart,
        navigate: SCREENS.Cart,
        tips: '',
      },
      {
        name: i18n.myCollection,
        navigate: SCREENS.MyCollection,
        tips: '',
      },
      {
        name: i18n.certifiedInformation,
        navigate: SCREENS.CertifiedInformation,
        tips: '',
      },
      {
        name: i18n.myCoupon,
        navigate: SCREENS.CouponMy,
        tips: '',
      },
      {
        name: i18n.securityCenter,
        navigate: SCREENS.SecurityCenter,
        tips: '',
      },
      {
        name: i18n.shippingAddress,
        navigate: SCREENS.Address,
        tips: '',
      },
      {
        name: i18n.inviteFriends,
        navigate: SCREENS.Invite,
        tips: '',
      },
      {
        name: i18n.about,
        navigate: SCREENS.Settings,
        tips: '',
      },
      {
        name: i18n.followUs,
        navigate: SCREENS.Settings,
        tips: '',
      },
      {
        name: i18n.settings,
        navigate: SCREENS.Settings,
        tips: '',
      },
    ];

    return (
      <View style={styles.container} >
        <ScrollView style={styles.container} >
          <View style={styles.container} >
            <View style={styles.header} >
              <BYTouchable style={styles.headerIcon} onPress={() => this.handleOnPressUser()}>
                <Image style={styles.headerIconImg} source={headerIconImgSource} />
                <Text style={styles.headerIconText} >{username}</Text>
              </BYTouchable>
              {/* {this.renderHeaderBottom()} */}
            </View>
            <NavBar1 list={renderCellItem1List1} navigate={navigate} />
            {this.renderNav1()}
            <NavBar1 list={renderCellItem1List2} navigate={navigate} styleItemLeft={{flex: 3}} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        userCertificateInfo,
        auth,
        queryOrderList,
      } = state;
      return {
        orderItem: queryOrderList.item,
        certUser: userCertificateInfo.certUser,
        authUser: auth.user,
      }
    }
  },
  {
    ...queryOrderListActionCreators,
  }
)(Me);
