import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, ToastAndroid, Platform } from 'react-native';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { globalStyleVariables, globalStyles } from '../styles';

import BYHeader from '../components/BYHeader';
import BYButton from "../components/BYButton";
import InputRight from "../components/InputRight";
import BYTouchable from "../components/BYTouchable";
import NavSidesText from "../components/NavSidesText";

import * as modifyPayPasswordActionCreators from "../common/actions/modifyPayPassword";

import { SCREENS } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    marginRight: 1,
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

class TransactionPasswordStepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      ing: false,
    };
  }

  componentDidMount() {
    this.readSeconds();
  }

  async readSeconds() {
    if (this.state.ing === false) {
      await this.setState({
        seconds: 60,
        ing: true,
      });
    }
    if (this.state.seconds > 0) {
      setTimeout(async () => {
        await this.setState({
          seconds: this.state.seconds - 1,
        });
        this.readSeconds();
      }, 700);
    } else {
      await this.setState({
        ing: false,
      });
    }
  }
  
  handleOnPressSeconds() {
    if (this.state.ing) return false;
    this.readSeconds();
    
  }
  
  renderInputRightCode = () => {
    const {
      ing,
      seconds,
    } = this.state;

    return (
      <View style={styles.second}>
        <Text style={styles.secondText} onPress={() => this.handleOnPressSeconds()} >{ing ? seconds : 'gửi mã'}</Text>
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

  handleOnPressSubmit() {
    const {
      formValue,
      modifyPayPasswordFetch,
      navigation: { state },
    } = this.props;
    console.log(state.params.msisdn);
    console.log(this.props);
    if (!formValue) return false;
    if (!formValue.code) return Platform.OS === 'android' && ToastAndroid.show('Vui lòng nhập mã xác nhận', ToastAndroid.SHORT);
    if (!formValue.password) return Platform.OS === 'android' && ToastAndroid.show('Vui lòng nhập 6 chữ số', ToastAndroid.SHORT);
    if (!formValue.repassword) return Platform.OS === 'android' && ToastAndroid.show('Nhập lại Mật mã giao dịch', ToastAndroid.SHORT);
    if (formValue.password !== formValue.repassword) return Platform.OS === 'android' && ToastAndroid.show('Hai lần nhập mật mã giao dịch không giống nhau', ToastAndroid.SHORT);
    console.log(formValue);
    modifyPayPasswordFetch(state.params.msisdn, formValue.password, formValue.code, state.params.from);
  }

  render() {
    const { navigation: { goBack, navigate } } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView>
          {/* <TextInput
            placeholder = "FirstTextInput"
            returnKeyType = { "next" }
            onSubmitEditing={() => { this.secondTextInput1.focus(); }}
            blurOnSubmit={false}
          />

          <TextInput
            placeholder = "FirstTextInput"
            returnKeyType = { "next" }
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            ref={(input) => { this.secondTextInput1 = input; }}
            blurOnSubmit={false}
          />

          <TextInput
            ref={(input) => { this.secondTextInput = input; }}
            placeholder = "secondTextInput"
          /> */}

          <Field 
            name="code"
            component={InputRight}
            inputRight={this.renderInputRightCode()}
            placeholder={'Vui lòng nhập mã xác nhận'}
            keyboardType={'numeric'}
            // onSubmitEditing={() => { this.password.focus(); }}
            blurOnSubmit={false}
            autoFocus={true}
          />
          <Field 
            name="password"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            placeholder={'Vui lòng nhập 6 chữ số'}
            secureTextEntry={true}
            keyboardType={'numeric'}
            // onSubmitEditing={() => { this.repassword.focus(); }}
            // ref={(input) => { this.password = input }}
            blurOnSubmit={false}
          />
          <Field 
            name="repassword"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            styleWrap={{marginBottom: 45}}
            placeholder={'Nhập lại Mật mã giao dịch'}
            secureTextEntry={true}
            keyboardType={'numeric'}
            // ref={(input) => { this.repassword = input }}
          />
          <BYButton text={'Submit'} style={{ marginBottom: 30 }} onPress={() => this.handleOnPressSubmit()} />
        </ScrollView>
      </View>
    );
  }
}

TransactionPasswordStepTwo = reduxForm({
  form: 'TransactionPasswordStepTwo',
})(TransactionPasswordStepTwo);

export default connect(
  () => {
    return (state, props) => {
      const {
        form: { TransactionPasswordStepTwo },
      } = state;
      return {
        formValue: TransactionPasswordStepTwo ? TransactionPasswordStepTwo.values : '',
      }
    }
  },
  {
    ...modifyPayPasswordActionCreators,
  }
)(TransactionPasswordStepTwo);
