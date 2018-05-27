import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
})

class BYModal extends Component {
  render() {
    const {
      children,
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
        {children}
      </Modal>
    );
  }
}

export default BYModal;