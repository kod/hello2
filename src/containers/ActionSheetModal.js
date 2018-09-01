import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  RED_COLOR,
  BORDER_COLOR_FIRST,
  FONT_COLOR_SECOND,
  FONT_SIZE_SECOND,
  FONT_COLOR_FIRST,
  FONT_SIZE_THIRD,
} from '../styles/variables';
import { SIDEINTERVAL, WINDOW_HEIGHT } from '../common/constants';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';

import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  main: {
    maxHeight: WINDOW_HEIGHT * 0.7,
  },
  item: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
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
  buttonTitle: {
    textAlign: 'center',
    borderBottomColor: BORDER_COLOR_FIRST,
    borderBottomWidth: 1,
    height: 45,
    lineHeight: 45,
    color: FONT_COLOR_FIRST,
    fontSize: FONT_SIZE_THIRD,
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
});

class ActionSheetModal extends Component {
  static propTypes = {
    // callback: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
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

  renderItem = ({ item, index }) => (
    <BYTouchable style={styles.item} onPress={() => this.handleOnPress(index)}>
      <Text style={styles.buttonItem}>{item}</Text>
    </BYTouchable>
  );

  renderContent() {
    const { i18n } = this.props;
    const {
      cancelTitle = i18n.cancel,
      data = [],
      title,
      renderItem,
      keyExtractor,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {!!title && <Text style={styles.buttonTitle}>{title}</Text>}
          <FlatList
            data={data}
            renderItem={renderItem || this.renderItem}
            keyExtractor={item => `${item[keyExtractor] || item}`}
          />
          <BYTouchable onPress={() => this.handleOnPress(-1)}>
            <Text style={[styles.buttonItem, styles.buttonItemCancel]}>
              {cancelTitle}
            </Text>
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

export default connectLocalization(
  connect(
    (state, props) => {
      const { callback = () => {}, data = [], title = '' } = props;

      return {
        callback,
        data,
        title,
      };
    },
    {
      ...modalActionCreators,
    },
  )(ActionSheetModal),
);
