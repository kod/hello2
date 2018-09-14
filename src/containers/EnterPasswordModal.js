/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, Alert } from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { RED_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  SCREENS,
  // MODAL_TYPES,
} from '../common/constants';
import BYTouchable from '../components/BYTouchable';
import Loader from '../components/Loader';
import { connectLocalization } from '../components/Localization';

import * as checkPayPaswordActionCreators from '../common/actions/checkPayPasword';
import * as modalActionCreators from '../common/actions/modal';

const inputPasswordBackgroundItemWidth = (WINDOW_WIDTH - SIDEINTERVAL * 2) / 6;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    marginBottom: 5,
  },
  title: {
    color: '#333',
  },
  close: {
    fontSize: 18,
  },
  inputPassword: {
    position: 'relative',
    height: 55,
    marginBottom: 10,
  },
  inputPasswordBackground: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 66,
    top: 0,
    left: SIDEINTERVAL,
    borderWidth: 1,
    borderColor: '#bebebe',
  },
  inputPasswordBackgroundItem: {
    height: inputPasswordBackgroundItemWidth,
    width: inputPasswordBackgroundItemWidth,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  inputPasswordDot: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 88,
    top: 0,
    left: SIDEINTERVAL,
  },
  inputPasswordDotItem: {
    width: inputPasswordBackgroundItemWidth,
    height: inputPasswordBackgroundItemWidth + 1,
    lineHeight: inputPasswordBackgroundItemWidth,
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
  },
  forget: {
    paddingRight: SIDEINTERVAL,
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginBottom: 30,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  keyboardItem: {
    height: 55,
    lineHeight: 55,
    width: WINDOW_WIDTH / 3,
    borderRightColor: '#eee',
    borderRightWidth: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    textAlign: 'center',
    color: '#353535',
    fontSize: 26,
  },
  keyboardItemEmpty: {
    backgroundColor: '#e0e0e0',
  },
  keyboardItemBackspace: {
    height: 55,
    lineHeight: 55,
    width: WINDOW_WIDTH / 3,
    borderRightColor: '#eee',
    borderRightWidth: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    textAlign: 'center',
    color: '#666',
    fontSize: 30,
    backgroundColor: '#e0e0e0',
  },
});

class EnterPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordLength: new Array(6).fill('fill'),
      keyboardItems: new Array(9).fill('fill'),
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loaded: prevLoaded } = this.props;
    const {
      loaded,
      isCorrect,
      i18n,
      modalProps: { callback = () => {} },
    } = nextProps;

    // if (prevLoading !== loading) {
    //   if (loading === false) {
    //     closeModal();
    //   } else {
    //     openModal(MODAL_TYPES.LOADER);
    //   }
    // }

    if (prevLoaded !== loaded && loaded === true) {
      // 判断结果出来了
      if (isCorrect) {
        // 交易密码正确
        this.handleOnModalClose();
        callback({
          val: this.state.password,
        });
      } else {
        // 交易密码错误
        Alert.alert(
          '',
          i18n.transactionPasswordWrong,
          [
            {
              text: i18n.confirm,
              onPress: () => {
                this.setState({
                  password: '',
                });
              },
            },
          ],
          { cancelable: false },
        );
      }
    }
  }

  handleSubmit() {
    const { password } = this.state;
    const {
      navigate,
      checkPayPaswordFetchClear,
      checkPayPaswordFetch,
      isAuthUser,
      user: { msisdn },
    } = this.props;
    if (isAuthUser) {
      checkPayPaswordFetchClear();
      checkPayPaswordFetch(msisdn, password);
    } else {
      navigate(SCREENS.Login);
    }
  }

  handleOnPressNumber(val) {
    this.setState(
      {
        password: this.state.password + val,
      },
      () => {
        if (this.state.password.length === 6) {
          this.handleSubmit();
        }
      },
    );
  }

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleOnPressBackspace() {
    const { password } = this.state;
    this.setState({
      password: password.slice(0, password.length - 1),
    });
  }

  renderContent() {
    const { password, keyboardItems, passwordLength } = this.state;
    const { i18n } = this.props;
    const { title = i18n.transactionPassword, navigate, loading } = this.props;

    return (
      <View style={styles.container}>
        {loading && <Loader absolutePosition />}
        <View style={styles.header}>
          <Text style={styles.title} onPress={() => this.handleOnModalClose()}>
            {title}
          </Text>
          <EvilIcons
            style={styles.close}
            name="close"
            onPress={() => this.handleOnModalClose()}
          />
        </View>
        <View style={styles.inputPassword}>
          <View style={styles.inputPasswordBackground}>
            {passwordLength.map((val, key) => (
              <View style={styles.inputPasswordBackgroundItem} key={key} />
            ))}
          </View>
          <View style={styles.inputPasswordDot}>
            {password.split('').map((val, key) => (
              <FontAwesome
                style={styles.inputPasswordDotItem}
                name="circle"
                key={key}
              />
            ))}
          </View>
        </View>
        <Text
          style={styles.forget}
          onPress={() => {
            this.handleOnModalClose();
            navigate(SCREENS.ForgotPasswordOne);
          }}
        >
          {`${i18n.forgetPassword}?`}
        </Text>
        <View style={styles.keyboard}>
          {keyboardItems.map((val, key) => (
            <BYTouchable
              key={key}
              onPress={() => this.handleOnPressNumber(key + 1)}
            >
              <Text style={styles.keyboardItem}>{key + 1}</Text>
            </BYTouchable>
          ))}
          <Text style={[styles.keyboardItem, styles.keyboardItemEmpty]} />
          <BYTouchable onPress={() => this.handleOnPressNumber(0)}>
            <Text style={styles.keyboardItem}>0</Text>
          </BYTouchable>
          <BYTouchable onPress={() => this.handleOnPressBackspace()}>
            <Ionicons
              style={styles.keyboardItemBackspace}
              name="ios-backspace-outline"
            />
          </BYTouchable>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible
        onRequestClose={this.handleOnModalClose}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.mask} onPress={this.handleOnModalClose} />
          {this.renderContent()}
        </View>
      </Modal>
    );
  }
}

// export default EnterPassword;

export default connectLocalization(
  connect(
    () => state => {
      const {
        modal: { modalProps = {} },
        checkPayPasword,
        login,
      } = state;
      return {
        loading: checkPayPasword.loading,
        loaded: checkPayPasword.loaded,
        isCorrect: checkPayPasword.isCorrect,
        user: login.user,
        isAuthUser: !!login.user,
        modalProps,
      };
    },
    {
      ...modalActionCreators,
      ...checkPayPaswordActionCreators,
    },
  )(EnterPasswordModal),
);
