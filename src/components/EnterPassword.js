import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { RED_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';
import BYTouchable from '../components/BYTouchable';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

class EnterPassword extends Component {
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
      callback,
      onRequestClose,
    } = this.props;

    await this.setState({
      password: this.state.password + val,
    });

    if (this.state.password.length === 6) {
      callback({
        val: this.state.password,
      });
      onRequestClose();
    }
  }

  handleOnPressBackspace(val) {
    this.setState({
      password: this.state.password.slice(0, this.state.password.length - 1),
    });
  }
  
  renderEnterPassword() {
    const {
      password,
      keyboardItems,
      passwordLength,
    } = this.state;
    
    const {
      title = 'Transaction password',
      onRequestClose,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} onPress={() => onRequestClose()}>{title}</Text>
          <EvilIcons style={styles.close} name="close" onPress={() => onRequestClose()} />
        </View>
        <View style={styles.inputPassword}>
          <View style={styles.inputPasswordBackground}>
            {
              passwordLength.map((val, key) => <View style={styles.inputPasswordBackgroundItem} key={key}></View>)
            }
          </View>
          <View style={styles.inputPasswordDot}>
            {
              password.split('').map((val, key) => <FontAwesome style={styles.inputPasswordDotItem} name={'circle'} key={key} />)
            }
          </View>
        </View>
        <Text style={styles.forget}>forgot password?</Text>
        <View style={styles.keyboard}>
          {
            keyboardItems.map((val, key) => <BYTouchable key={key} onPress={() => this.handleOnPressNumber(key + 1)}><Text style={styles.keyboardItem}>{key + 1}</Text></BYTouchable>)
          }
          <Text style={[styles.keyboardItem, styles.keyboardItemEmpty]}></Text>
          <BYTouchable onPress={() => this.handleOnPressNumber(0)}><Text style={styles.keyboardItem}>0</Text></BYTouchable>
          <BYTouchable onPress={() => this.handleOnPressBackspace()}><Ionicons style={styles.keyboardItemBackspace} name={'ios-backspace-outline'} /></BYTouchable>
        </View>
      </View>
    );
  }

  render() {
    const {
      visible,
      onRequestClose,
    } = this.props;

    return (
      <Modal 
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <Text
          style={styles.mask} 
          onPress={onRequestClose}
        ></Text>
        {this.renderEnterPassword()}
      </Modal>
    );
  }
}

export default EnterPassword;
