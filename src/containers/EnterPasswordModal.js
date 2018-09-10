/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { RED_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, SIDEINTERVAL, SCREENS } from '../common/constants';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';

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

  componentDidMount() {}

  async handleOnPressNumber(val) {
    const {
      modalProps: { callback = () => {} },
    } = this.props;

    await this.setState({
      password: this.state.password + val,
    });

    if (this.state.password.length === 6) {
      this.handleOnModalClose();
      callback({
        val: this.state.password,
      });
    }
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
    const { title = i18n.transactionPassword, navigate } = this.props;

    return (
      <View style={styles.container}>
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
        // billByYear,
      } = state;
      return {
        modalProps,
      };
    },
    {
      ...modalActionCreators,
    },
  )(EnterPasswordModal),
);
