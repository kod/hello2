import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyleVariables } from '../styles';
import { SCREENS } from "../common/constants";
import BYTouchable from '../components/BYTouchable';

export const { width, height } = Dimensions.get('window');

class Me extends React.Component {

  render() {
    const { navigation: { navigate } } = this.props;
    // setTimeout(() => {
    //   navigate(SCREENS.RegisterStepTwo)
    // }, 100);
    return (
      <View>
        <View style={{ flexDirection: 'row', height: 100, width, backgroundColor: globalStyleVariables.HEADER_BACKGROUND_COLOR }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../images/ic_avatar.png')} style={{ width: 60, height: 60, borderColor: '#fff', borderWidth: 2, borderRadius: 42 }} />
          </View>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 18 }} onPress={() => navigate(SCREENS.Login)}>Login/Register</Text>
          </View>
        </View>
        <ScrollView style={{ height: height - 55 - 25 - 100 }} >
          <View style={{ backgroundColor: '#fff' }}>
            <BYTouchable>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialIcons name="assignment" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ebd35a' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>Bills</Text>
                <Text style={{ flex: 5, fontSize: 12 }}>Repayments on the 26th of each month</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>
            </BYTouchable>
            <BYTouchable>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialIcons name="receipt" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#eda769' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>Orders</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>              
            </BYTouchable>
            <BYTouchable>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialIcons name="favorite" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ee759a' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>My collection</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>              
            </BYTouchable>
            <BYTouchable>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialIcons name="account-circle" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ef5568' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>Personal information</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>              
            </BYTouchable>
            <BYTouchable>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialIcons name="lock" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#60b2f5' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>Security center</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>              
            </BYTouchable>
            <BYTouchable>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialIcons name="room" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#8174f0' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>Shipping address</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>              
            </BYTouchable>
            <BYTouchable>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialIcons name="supervisor-account" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#f17982' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>Invite friends</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>              
            </BYTouchable>
            <BYTouchable>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialIcons name="info" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ea7b52' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>About us</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>              
            </BYTouchable>
            <BYTouchable>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialCommunityIcons name="facebook-box" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#395a96' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>Follow us</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>
            </BYTouchable>            
            <BYTouchable onPress={() => navigate(SCREENS.Settings)} delayPressIn={0} >
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                <MaterialIcons name="settings" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#999' }} />
                <Text style={{ flex: 1, fontSize: 16 }}>Setting</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
              </View>
            </BYTouchable>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Me;
