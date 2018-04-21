import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { globalStyleVariables, globalStyles } from '../styles';

import BYHeader from '../components/BYHeader';
import BYButton from "../components/BYButton";
import InputRight from "../components/InputRight";
import BYTouchable from "../components/BYTouchable";
import NavSidesText from "../components/NavSidesText";
import Error from "../components/Error";

import { SCREENS } from '../common/constants';

const styles = StyleSheet.create({
  second: {
    height: 20,
    minWidth: globalStyleVariables.WINDOW_WIDTH * 0.1,
    paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.02,
    paddingRight: globalStyleVariables.WINDOW_WIDTH * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0076F7',
  },
  secondText: {
    color: '#0076F7',
    fontSize: 11,
  },
  closeIcon: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#ccc',
  },
})

class Feedback extends React.Component {
  renderInputRightCode = () => {
    return (
      <View style={styles.second}>
        <Text style={styles.secondText}>gửi mã</Text>
      </View>
    );
  };
  renderInputRightClose = () => {
    return (
      <BYTouchable>
        <MaterialIcons name="cancel" style={styles.closeIcon} />
      </BYTouchable>
    );
  };

  render() {
    const { navigation: { goBack, navigate } } = this.props;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <BYHeader />
        <ScrollView style={globalStyles.scrollView}>
          <InputRight inputRight={this.renderInputRightCode()} textInputProps={{placeholder: 'place enter the code', keyboardType: 'numeric'}} />
          <InputRight inputRight={this.renderInputRightClose()} textInputProps={{placeholder: '8-20 password', secureTextEntry: true}} />
          <InputRight inputRight={this.renderInputRightClose()} styleWrap={{marginBottom: 5}} textInputProps={{placeholder: 'confirm password', secureTextEntry: true}} />
          <Error text={'input error'} styleWrap={{marginBottom: 45}} />
          <BYButton text={'Register'} style={{ marginBottom: 30 }} onPress={() => navigate(SCREENS.RegisterStepOne)} />
        </ScrollView>
      </View>
    );
  }
}
export default Feedback;
