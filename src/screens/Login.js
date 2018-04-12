import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TextInput, Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BYHeader from '../components/BYHeader';
import HeaderShareButton from '../components/HeaderShareButton';
import ScrollableTabView from '../components/ScrollableTabView';
import { SCREENS } from "../common/constants";

const { width, height } = Dimensions.get('window');

class Feedback extends React.Component {

  handleOnPressHeaderBackButton = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  renderHeaderTitle = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingRight: 60 }}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Language</Text>
      </View>
    )
  }

  renderHeaderRight = () => {
    return (
      <View></View>
    );
  };

  render() {
    const { navigation: { goBack, navigate }, navigation } = this.props;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={this.renderHeaderRight()}
          darkTheme
          showBackButton
          onPressBackButton={this.handleOnPressHeaderBackButton}
        />
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', height: 45, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <MaterialIcons name="navigate-before" style={{ fontSize: 26, paddingLeft: 5, paddingRight: 5, color: '#333', paddingRight: 10 }} onPress={() => goBack()} />
        </View> */}
        <ScrollView style={{ height: height - 45 , backgroundColor: '#fff' }}>
          <View style={{ paddingLeft: width * 0.03, paddingRight: width * 0.03 }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#f5f5f5', borderBottomWidth: 5, marginBottom: 10 }} >
              <Image source={require('../images/viemnam.png')} style={{ width: 18, resizeMode: Image.resizeMode.contain, marginLeft: width * 0.03, }} />
              <Text style={{ marginLeft: 5, color: '#ccc', paddingRight: 5, borderRightWidth: 1, borderRightColor: '#eee' }} >+84</Text>
              <TextInput style={{ flex: 1, marginLeft: 10 }} underlineColorAndroid={'rgba(0,0,0,.0)'} placeholder={'please input your phone number'} placeholderTextColor={'#ccc'} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#f5f5f5', borderBottomWidth: 5, marginBottom: 75 }} >
              <TextInput style={{ flex: 1, marginLeft: width * 0.03, }} underlineColorAndroid={'rgba(0,0,0,.0)'} placeholder={'password'} placeholderTextColor={'#ccc'} secureTextEntry={true} />
              <Text style={{ marginLeft: 0, color: '#666', marginRight: width * 0.04, fontSize: 11, borderBottomColor: '#666', borderBottomWidth: 1 }} >forgot password?</Text>
            </View>
            <View style={{ height: 50, marginBottom: 30 }} >
              <Text style={{ textAlign: 'center', lineHeight: 50, backgroundColor: '#0076F7', color: '#fff', fontSize: 14 }}>Login</Text>
            </View>
            <View style={{ flexDirection: 'row' }} >
              <Text style={{ fontSize: 11, color: '#0076F7', borderBottomColor: '#0076F7', borderBottomWidth: 1 }} onPress={() => navigate(SCREENS.RegisterStepOne)}>Register now?</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Feedback;
