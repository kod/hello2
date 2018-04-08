import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyleVariables } from '../styles';
import { SCREENS } from "../common/constants";

export const { width, height } = Dimensions.get('window');

class About extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Me',
    tabBarIcon: ({ tintColor }) => <MaterialIcons name="account-circle" size={25} color={tintColor} />
  };

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
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="assignment" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ebd35a' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>Bills</Text>
              <Text style={{ flex: 5, fontSize: 12 }}>Repayments on the 26th of each month</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="receipt" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#eda769' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>Orders</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="favorite" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ee759a' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>My collection</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="receipt" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#eda769' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>Orders</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="favorite" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ee759a' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>My collection</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="receipt" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#eda769' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>Orders</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="favorite" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ee759a' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>My collection</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="receipt" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#eda769' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>Orders</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="favorite" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ee759a' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>My collection</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="receipt" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#eda769' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>Orders</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 55 }}>
              <MaterialIcons name="favorite" style={{ fontSize: 28, paddingLeft: 15, paddingRight: 15, color: '#ee759a' }} />
              <Text style={{ flex: 1, fontSize: 16 }}>My collection</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#bbb' }} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default About;
