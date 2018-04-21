import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TextInput, Button } from 'react-native';

import { globalStyleVariables, globalStyles } from '../styles';

import { SCREENS } from '../common/constants';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import InputRight from '../components/InputRight';
import BYButton from '../components/BYButton';
import BYTouchable from '../components/BYTouchable';
import NavSidesText from '../components/NavSidesText';
import BYStatusBar from '../components/BYStatusBar';
import OtherLogin from '../components/OtherLogin';

import { WINDOW_HEIGHT } from '../styles/variables';

const styles = StyleSheet.create({});

class Feedback extends React.Component {
  renderInputRight = () => {
    const {
      navigation: { goBack, navigate },
    } = this.props;

    return (
      <BYTouchable style={{ marginRight: globalStyleVariables.SIDEINTERVAL }} onPress={() => navigate(SCREENS.ForgotPasswordOne)}>
        <Text style={{ marginLeft: 0, color: '#666', fontSize: 11, borderBottomColor: '#666', borderBottomWidth: 1 }}>forgot password?</Text>
      </BYTouchable>
    );
  };

  render() {
    const {
      navigation: { goBack, navigate },
    } = this.props;
    return (
      <View style={{ backgroundColor: '#fff', position: 'relative', height: globalStyleVariables.WINDOW_HEIGHT }}>
        <BYStatusBar />
        <BYHeader />
        <OtherLogin />

        <ScrollView>
          <InputCountry />
          <InputRight inputRight={this.renderInputRight()} styleWrap={{ marginBottom: 75 }} />
          <BYButton text={'Login'} style={{ marginBottom: 30 }} />
          <NavSidesText textLeft={'Register now?'} textRight={'Log in via SMS?'} navigateLeft={() => navigate(SCREENS.RegisterStepOne)} navigateRight={() => navigate(SCREENS.RegisterFastStepOne)} />
        </ScrollView>
      </View>
    );
  }
}
export default Feedback;
