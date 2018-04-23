import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import { globalStyleVariables } from '../styles';
import { SCREENS } from "../common/constants";
import BYTouchable from '../components/BYTouchable';
import CustomIcon from "../components/CustomIcon";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  header: {
    backgroundColor: globalStyleVariables.PRIMARY_COLOR,
    // height: 175,
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
  cellItem1Wrap: {
    backgroundColor: '#fff',
  },
  cellItem1: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    paddingLeft: globalStyleVariables.SIDEINTERVAL,
    paddingRight: globalStyleVariables.SIDEINTERVAL,
  },
  cellItem1Left: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  cellItem1Middle: {
    flex: 2,
    fontSize: 14,
    color: '#ccc',
    textAlign: 'right',
    paddingRight: 5,
  },
  cellItem1Right: {
    color: '#ccc',
    fontSize: 9,
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
    paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.01,
    paddingRight: globalStyleVariables.WINDOW_WIDTH * 0.01,
  },
  // nav1ItemBadge: {
  // },
  nav1ItemBadge: {
    position: 'absolute',
    top: 5,
    right: 18,
    backgroundColor: '#FD5147',
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
    // console.log(authUser);
    
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

  renderCellItem1({list, style, styleItem, styleItemLeft, navigate}) {
    return (
      <View style={[styles.cellItem1Wrap, style]} >
        {list.map((val, key) => 
          <BYTouchable delayPressIn={0} style={[styles.cellItem1, styleItem]} key={key} onPress={() => navigate(val.navigate)} >
            <Text style={[styles.cellItem1Left,styleItemLeft]} numberOfLines={1}>{val.name}</Text>
            <Text style={styles.cellItem1Middle} numberOfLines={1} >{val.tips}</Text>
            <CustomIcon style={styles.cellItem1Right} name="arrowright"></CustomIcon>
          </BYTouchable>
        )}
      </View>
    );
  }
  
  render() {
    const { navigation, navigation: { navigate }, screenProps: { i18n }, authUser } = this.props;
    // console.log(`getAPILevel: ${DeviceInfo.getAPILevel()}`);
    // console.log(`getApplicationName: ${DeviceInfo.getApplicationName()}`);
    // console.log(`getBatteryLevel: ${DeviceInfo.getBatteryLevel()}`);
    // console.log(`getBrand: ${DeviceInfo.getBrand()}`);
    // console.log(`getBuildNumber: ${DeviceInfo.getBuildNumber()}`);
    // console.log(`getBundleId: ${DeviceInfo.getBundleId()}`);
    // console.log(`getCarrier: ${DeviceInfo.getCarrier()}`);
    // console.log(`getDeviceCountry: ${DeviceInfo.getDeviceCountry()}`);
    // console.log(`getDeviceId: ${DeviceInfo.getDeviceId()}`);
    // console.log(`getDeviceLocale: ${DeviceInfo.getDeviceLocale()}`);
    // console.log(`getDeviceName: ${DeviceInfo.getDeviceName()}`);
    // console.log(`getFirstInstallTime: ${DeviceInfo.getFirstInstallTime()}`);
    // console.log(`getFontScale: ${DeviceInfo.getFontScale()}`);
    // console.log(`getFreeDiskStorage: ${DeviceInfo.getFreeDiskStorage()}`);
    // console.log(`getIPAddress: ${DeviceInfo.getIPAddress()}`);
    // console.log(`getInstallReferrer: ${DeviceInfo.getInstallReferrer()}`);
    // console.log(`getInstanceID: ${DeviceInfo.getInstanceID()}`);
    // console.log(`getLastUpdateTime: ${DeviceInfo.getLastUpdateTime()}`);
    // console.log(`getMACAddress: ${DeviceInfo.getMACAddress()}`);
    // console.log(`getManufacturer: ${DeviceInfo.getManufacturer()}`);
    // console.log(`getMaxMemory: ${DeviceInfo.getMaxMemory()}`);
    // console.log(`getModel: ${DeviceInfo.getModel()}`);
    // console.log(`getPhoneNumber: ${DeviceInfo.getPhoneNumber()}`);
    // console.log(`getReadableVersion: ${DeviceInfo.getReadableVersion()}`);
    // console.log(`getSerialNumber: ${DeviceInfo.getSerialNumber()}`);
    // console.log(`getSystemName: ${DeviceInfo.getSystemName()}`);
    // console.log(`getSystemVersion: ${DeviceInfo.getSystemVersion()}`);
    // console.log(`getTimezone: ${DeviceInfo.getTimezone()}`);
    // console.log(`getTotalDiskCapacity: ${DeviceInfo.getTotalDiskCapacity()}`);
    // console.log(`getTotalMemory: ${DeviceInfo.getTotalMemory()}`);
    // console.log(`getUniqueID: ${DeviceInfo.getUniqueID()}`);
    // console.log(`getUserAgent: ${DeviceInfo.getUserAgent()}`);
    // console.log(`getVersion: ${DeviceInfo.getVersion()}`);
    // console.log(`is24Hour: ${DeviceInfo.is24Hour()}`);
    // console.log(`isEmulator: ${DeviceInfo.isEmulator()}`);
    // console.log(`isTablet: ${DeviceInfo.isTablet()}`);

    const renderCellItem1List1 = [
      {
        name: i18n.bills,
        navigate: SCREENS.Settings,
        tips: i18n.monthlyRepaymentOnThe6th,
      },
      {
        name: i18n.orders,
        navigate: SCREENS.Settings,
        tips: '',
      },
    ];

    const renderCellItem1List2 = [
      {
        name: i18n.myCollection,
        navigate: SCREENS.Settings,
        tips: '',
      },
      {
        name: i18n.certifiedInformation,
        navigate: SCREENS.Settings,
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
        navigate: SCREENS.Settings,
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

    const username = authUser ? 'Jay Chou' : i18n.loginRegister;

    return (
      <ScrollView style={{ height: globalStyleVariables.WINDOW_HEIGHT - 55 - 25 }} >
        {/* <StatusBar backgroundColor={'#fff'} barStyle="dark-content" /> */}
        {/* <StatusBar backgroundColor={globalStyleVariables.PRIMARY_COLOR} barStyle="dark-content" /> */}
        <View style={styles.container} >
          <View style={styles.header} >
            <BYTouchable style={styles.headerIcon} onPress={() => this.handleOnPressUser()}>
              <Image style={styles.headerIconImg} source={require('../images/aioru09230f.png')} />
              <Text style={styles.headerIconText} >{username}</Text>
            </BYTouchable>
            {this.renderHeaderBottom()}
          </View>
          {this.renderCellItem1({list:renderCellItem1List1, navigate})}
          {this.renderNav1()}
          {this.renderCellItem1({list: renderCellItem1List2, navigate, styleItemLeft: {flex: 3}})}
        </View>
      </ScrollView>
    );
  }
}
export default connect(
  state => ({
    authUser: state.auth.user,
  })
)(Me);
