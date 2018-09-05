import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  RED_COLOR,
  BORDER_COLOR_FIRST,
  FONT_COLOR_SECOND,
  FONT_SIZE_SECOND,
  FONT_SIZE_FIRST,
  FONT_COLOR_THIRD,
  FONT_SIZE_FIFTH,
  FONT_COLOR_FIRST,
} from '../styles/variables';
import { WINDOW_HEIGHT, MONETARY } from '../common/constants';
import BYTouchable from '../components/BYTouchable';
import NavBar2 from '../components/NavBar2';
import { connectLocalization } from '../components/Localization';
import priceFormat from '../common/helpers/priceFormat';

import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  main: {
    height: WINDOW_HEIGHT * 0.7,
  },
  buttonItem: {
    textAlign: 'center',
    borderBottomColor: BORDER_COLOR_FIRST,
    borderBottomWidth: 1,
    height: 45,
    lineHeight: 45,
    color: FONT_COLOR_SECOND,
    fontSize: FONT_SIZE_SECOND,
  },
  buttonItemCancel: {
    color: RED_COLOR,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR_FIRST,
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  row1: {
    textAlign: 'center',
    fontSize: FONT_SIZE_FIRST,
    color: FONT_COLOR_THIRD,
    paddingTop: 50,
  },
  row2: {
    textAlign: 'center',
    fontSize: FONT_SIZE_FIFTH,
    color: FONT_COLOR_FIRST,
    paddingBottom: 40,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR_FIRST,
  },
});

class PerMonthPriceModal extends Component {
  static propTypes = {
    // callback: PropTypes.func.isRequired,
    // data: PropTypes.array.isRequired,
  };

  componentDidMount() {}

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleOnPress(key) {
    const { callback } = this.props;
    this.handleOnModalClose();
    callback({
      buttonIndex: key,
    });
  }

  renderContent() {
    const { i18n } = this.props;
    // const { data } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.main}>
          <Text style={styles.row1}>1/6期(已还)</Text>
          <Text style={styles.row2}>690.000 d</Text>
          <NavBar2
            valueLeft={i18n.totalMoney}
            valueMiddle={`111`}
            isShowRight={false}
          />
          <NavBar2
            valueLeft={i18n.totalMoney}
            valueMiddle={`111`}
            isShowRight={false}
          />
          <NavBar2
            valueLeft={i18n.totalMoney}
            valueMiddle={`111`}
            isShowRight={false}
          />
          <NavBar2
            valueLeft={i18n.totalMoney}
            valueMiddle={`111`}
            isShowRight={false}
          />
        </ScrollView>
        <Text
          style={[styles.buttonItem, styles.buttonItemCancel]}
          onPress={() => this.handleOnModalClose()}
        >
          {i18n.cancel}
        </Text>
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

export default connectLocalization(
  connect(
    (state, props) => {
      const { data = [] } = props;

      return { data };
    },
    {
      ...modalActionCreators,
    },
  )(PerMonthPriceModal),
);
