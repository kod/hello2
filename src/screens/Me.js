import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyleVariables } from '../styles';
import { SCREENS } from "../common/constants";
import BYTouchable from '../components/BYTouchable';
// import MaterialCommunityIcons from "../components/MaterialCommunityIcons";

const { width, height } = Dimensions.get('window');

class Me extends React.Component {

  renderList = (i18n, navigate) => {

    const list = [
      {
        name: i18n.bills,
        iconName: 'assignment',
        iconColor: '#ebd35a',
        iconType: 'MaterialIcons',
        tips: 'Repayments on the 26th of each month',
      },
      {
        name: i18n.orders,
        iconName: 'receipt',
        iconColor: '#eda769',
        iconType: 'MaterialIcons',
        tips: '',
      },
      {
        name: i18n.myCollection,
        iconName: 'favorite',
        iconColor: '#ee759a',
        iconType: 'MaterialIcons',
        tips: '',
      },
      {
        name: i18n.certifiedInformation,
        iconName: 'account-circle',
        iconColor: '#ef5568',
        iconType: 'MaterialIcons',
        tips: '',
      },
      {
        name: i18n.myCoupon,
        iconName: 'confirmation-number',
        iconColor: '#f65045',
        iconType: 'MaterialIcons',
        tips: '',
      },
      {
        name: i18n.securityCenter,
        iconName: 'lock',
        iconColor: '#60b2f5',
        iconType: 'MaterialIcons',
        tips: '',
      },
      {
        name: i18n.shippingAddress,
        iconName: 'room',
        iconColor: '#8174f0',
        iconType: 'MaterialIcons',
        tips: '',
      },
      {
        name: i18n.inviteFriends,
        iconName: 'supervisor-account',
        iconColor: '#f17982',
        iconType: 'MaterialIcons',
        tips: '',
      },
      {
        name: i18n.about,
        iconName: 'info',
        iconColor: '#ea7b52',
        iconType: 'MaterialIcons',
        tips: '',
      },
      {
        name: i18n.followUs,
        iconName: 'facebook-box',
        iconColor: '#395a96',
        iconType: 'MaterialCommunityIcons',
        tips: '',
      },
      {
        name: i18n.settings,
        iconName: 'settings',
        iconColor: '#395a96',
        iconType: 'MaterialIcons',
        tips: '',
      },
    ];

    const getIconElement = (item) => {
      let result;
      switch (item.iconType) {
        case 'MaterialIcons':
          result = <MaterialIcons name={item.iconName} color={item.iconColor} style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, }} />
          break;

        case 'MaterialCommunityIcons':
          result = <MaterialCommunityIcons name={item.iconName} color={item.iconColor} style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, }} />
          break;
      
        default:
          result = <MaterialIcons name={item.iconName} color={item.iconColor} style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, }} />
          break;
      }
      return result;
    }

    return (
      <View style={{ backgroundColor: '#fff' }}>
        {list.map((val, key) => 
          <BYTouchable key={key} onPress={() => navigate(SCREENS.Settings)} delayPressIn={0} >
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
              {getIconElement(val)}
              <Text style={{ flex: 1, fontSize: 16 }}>{val.name}</Text>
              {!!val.tips.length && <Text style={{ flex: 5, fontSize: 12 }}>{val.tips}</Text>}
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
          </BYTouchable>
        )}
      </View>
    );
  }
  
  render() {
    const { navigation: { navigate }, screenProps: { i18n } } = this.props;

    // setTimeout(() => {
    //   navigate(SCREENS.Login);
    // }, 300);

    return (
      <View>
        <View style={{ flexDirection: 'row', height: 100, width, backgroundColor: globalStyleVariables.HEADER_BACKGROUND_COLOR }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../images/ic_avatar.png')} style={{ width: 60, height: 60, borderColor: '#fff', borderWidth: 2, borderRadius: 42 }} />
          </View>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 18, paddingTop: 15, paddingBottom: 15 , }} onPress={() => navigate(SCREENS.Login)}>Login/Register</Text>
          </View>
        </View>
        <ScrollView style={{ height: height - 55 - 25 - 100 }} >
          <View style={{ backgroundColor: '#fff' }}>
            {this.renderList(i18n, navigate)}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Me;
