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
  // nav1ItemBadge: {
  // },
  nav1ItemBadge: {
    position: 'absolute',
    top: 5,
    right: 18,
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
    // const { navigation: { navigate }, authUser } = this.props;
    // setTimeout(() => {
    //   navigate(SCREENS.Login)
    // }, 700);
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
    const { screenProps: { i18n } } = this.props;
    
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
      {
        text: i18n.afterSalesService,
        iconName: 'returns',
        styleIcon: { fontSize: 23, paddingTop: 2 },
      },
    ];

    return (
      <View style={styles.nav1} >
        {list.map((val, key) => 
          <View style={styles.nav1Item} key={key} >
            <CustomIcon style={[styles.nav1ItemIcon, val.styleIcon]} name={val.iconName} ></CustomIcon>
            <Text style={styles.nav1ItemText}>{val.text}</Text>
            <Text style={styles.nav1ItemBadge} >5</Text>
          </View>
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
        navigate: SCREENS.Settings,
        tips: '',
      },
      {
        name: i18n.securityCenter,
        navigate: SCREENS.Settings,
        tips: '',
      },
      {
        name: i18n.shippingAddress,
        navigate: SCREENS.Address,
        tips: '',
      },
      {
        name: i18n.inviteFriends,
        navigate: SCREENS.Settings,
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
              {this.renderHeaderBottom()}
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
  state => ({
    certUser: state.userCertificateInfo.certUser,
    authUser: state.auth.user,
  })
)(Me);
