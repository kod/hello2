import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TextInput, Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BYHeader from '../components/BYHeader';
import HeaderShareButton from '../components/HeaderShareButton';
import ScrollableTabView from '../components/ScrollableTabView';
import { SCREENS } from "../common/constants";

const { width, height } = Dimensions.get('window');

class Feedback extends React.Component {
  // static navigationOptions = {
  //   header: null,
  //   title: 'Cart',
  //   tabBarIcon: ({ tintColor }) => <MaterialIcons name="shopping-cart" size={25} color={tintColor} />
  // };

  handleOnPressHeaderBackButton = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  renderHeaderTitle = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Sản phẩm</Text>
      </View>
    );
  };

  renderHeaderRight = () => {
    return (
      <View>
        <HeaderShareButton />
      </View>
    );
  };

  render() {
    const { navigation: { goBack, navigate } } = this.props;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 45, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <MaterialIcons name="navigate-before" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#333', paddingRight: 10 }} onPress={() => goBack()} />
        </View>
        <ScrollView style={{ height: height - 45 , backgroundColor: '#fff' }}>
          <View style={{ paddingLeft: width * 0.03, paddingRight: width * 0.03 }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#f5f5f5', borderBottomWidth: 5, marginBottom: 30 }} >
              <Image source={require('../images/viemnam.png')} style={{ width: 18, resizeMode: Image.resizeMode.contain, marginLeft: width * 0.03, }} />
              <Text style={{ marginLeft: 5, color: '#ccc', paddingRight: 5, borderRightWidth: 1, borderRightColor: '#eee' }} >+84</Text>
              <TextInput style={{ flex: 1, marginLeft: 10 }} underlineColorAndroid={'rgba(0,0,0,.0)'} placeholder={'please input your phone number'} placeholderTextColor={'#ccc'} />
            </View>
            <View>
              <TextInput style={{ flex: 1, paddingLeft: width * 0.04, backgroundColor: '#E0E3EF', marginBottom: 75 }} underlineColorAndroid={'rgba(0,0,0,.0)'} placeholder={'Please enter the invitation code.'} placeholderTextColor={'#6D7592'} />
            </View>
            <View style={{ height: 50, marginBottom: 20 }} >
              <Text style={{ textAlign: 'center', lineHeight: 50, backgroundColor: '#0076F7', color: '#fff', fontSize: 14 }} onPress={() => navigate(SCREENS.RegisterStepTwo)} >Next step</Text>
            </View>
            <View style={{ flexDirection: 'row' }} >
              <Text style={{ fontSize: 11, color: '#0076F7', borderBottomColor: '#0076F7', borderBottomWidth: 1 }} onPress={() => goBack()} >Already have an account?</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Feedback;
