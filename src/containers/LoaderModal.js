import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';

import Loader from '../components/Loader';

import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

class LoaderModal extends Component {
  handleOnModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  renderContent() {
    return <Loader />;
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible
        onRequestClose={this.handleOnModalClose}
      >
        <View style={styles.container}>{this.renderContent()}</View>
      </Modal>
    );
  }
}

export default connect(
  state => {
    const {
      modal: { modalProps = {} },
    } = state;

    return {
      modalProps,
    };
  },
  {
    ...modalActionCreators,
  },
)(LoaderModal);
