import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import InputRight from '../components/InputRight';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import Error from '../components/Error';

import { SCREENS } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  second: {
    height: 20,
    minWidth: WINDOW_WIDTH * 0.1,
    paddingLeft: WINDOW_WIDTH * 0.02,
    paddingRight: WINDOW_WIDTH * 0.02,
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

class ForgotPasswordTwo extends React.Component {
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
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          <Field 
            name="code"
            component={InputRight}
            inputRight={this.renderInputRightCode()}
            textInputProps={{placeholder: 'place enter the code', keyboardType: 'numeric'}}
          />
          <Field 
            name="password"
            component={InputRight}
            inputRight={this.renderInputRightClose()} 
            textInputProps={{placeholder: '8-20 password', secureTextEntry: true}}
            secureTextEntry
          />
          <Field 
            name="repassword"
            component={InputRight}
            inputRight={this.renderInputRightClose()} 
            styleWrap={{marginBottom: 5}}
            textInputProps={{placeholder: 'confirm password', secureTextEntry: true}}
            secureTextEntry
          />

          <Error text={'input error'} styleWrap={{marginBottom: 45}} />
          <BYButton text={'Register'} style={{ marginBottom: 30 }} onPress={() => navigate(SCREENS.RegisterStepOne)} />
        </ScrollView>
      </View>
    );
  }
}

ForgotPasswordTwo = reduxForm({
  form: 'ForgotPasswordTwo',
})(ForgotPasswordTwo);

export default connectLocalization(ForgotPasswordTwo);
