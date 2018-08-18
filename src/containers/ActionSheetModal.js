import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RED_COLOR, BORDER_COLOR } from '../styles/variables';
import { SIDEINTERVAL } from '../common/constants';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';

import * as modalActionCreators from '../common/actions/modal';

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

class ActionSheetModal extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isOpenActionSheet: true,
  //   };
  // }
  static propTypes = {
    callback: PropTypes.func.isRequired,
    buttons: PropTypes.array.isRequired,
  };

  componentDidMount() {}

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleOnPress(key) {
    const {
      modalProps: { callback = () => {} },
    } = this.props;
    this.handleOnModalClose();
    callback({
      buttonIndex: key,
    });
  }

  renderContent() {
    const { i18n } = this.props;
    const {
      cancelTitle = i18n.cancel,
      buttons = [],
      // buttons = [],
    } = this.props;

    return (
      <View style={styles.container}>
        {buttons.map((val, key) => (
          <BYTouchable
            style={styles.item}
            key={val}
            onPress={() => this.handleOnPress(key)}
          >
            <Text style={styles.buttonItem}>{val}</Text>
          </BYTouchable>
        ))}
        <BYTouchable
          onPress={() => this.handleOnPress(-1)}
          // onPress={() => this.handleOnPress(-1)}
        >
          <Text style={[styles.buttonItem, styles.buttonItemCancel]}>
            {cancelTitle}
          </Text>
        </BYTouchable>
      </View>
    );
  }

  // render() {
  //   const {
  //     visible,
  //     onRequestClose,
  //     // onRequestClose,
  //   } = this.props;

  //   return (
  //     <Modal
  //       transparent
  //       animationType="fade"
  //       visible={visible}
  //       onRequestClose={onRequestClose}
  //     >
  //       <Text style={styles.mask} onPress={onRequestClose} />
  //       {this.renderContent()}
  //     </Modal>
  //   );
  // }
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

export default connectLocalization(
  connect(
    (state, props) => {
      const {
        modal: { modalProps = {} },
      } = state;

      const {
        callback,
        buttons,
        // buttons,
      } = props;
      console.log(props);

      return {
        callback,
        buttons,
        modalProps,
      };
    },
    {
      ...modalActionCreators,
    },
  )(ActionSheetModal),
);
