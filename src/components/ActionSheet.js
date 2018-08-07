import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { RED_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';
import BYTouchable from '../components/BYTouchable';

import { BORDER_COLOR } from '../styles/variables';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  buttonItem: {
    textAlign: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    height: 45,
    lineHeight: 45,
    color: '#666',
    fontSize: 14,
  },
  buttonItemCancel: {
    color: RED_COLOR,
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
});

class ActionSheet extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isOpenActionSheet: true,
  //   };
  // }

  componentDidMount() {}

  handleOnPress(key) {
    const {
      callback,
      onRequestClose,
    } = this.props;
    onRequestClose();
    callback({
      buttonIndex: key
    });
  }
  
  renderActionSheet() {
    const {
      cancelTitle = 'Cancel',
      buttons = [],
    } = this.props;

    return (
      <View style={styles.container}>
        {
          buttons.map((val, key) => 
            <BYTouchable style={styles.item} key={key} onPress={() => this.handleOnPress(key)} >
              <Text style={styles.buttonItem} >{val}</Text>
            </BYTouchable>)
        }
        <BYTouchable onPress={() => this.handleOnPress(-1)} >
          <Text style={[styles.buttonItem, styles.buttonItemCancel]} >{cancelTitle}</Text>
        </BYTouchable>
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
        {this.renderActionSheet()}
      </Modal>
    );
  }
}

export default ActionSheet;
