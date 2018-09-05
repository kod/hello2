import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  RED_COLOR,
  BORDER_COLOR_FIRST,
  FONT_COLOR_SECOND,
  FONT_SIZE_SECOND,
  FONT_SIZE_THIRD,
} from '../styles/variables';
import { WINDOW_HEIGHT, MONETARY } from '../common/constants';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import priceFormat from '../common/helpers/priceFormat';

import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  main: {
    maxHeight: WINDOW_HEIGHT * 0.6,
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
  title: {
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR_FIRST,
    borderBottomWidth: 1,
  },
  titleItem: {
    flex: 2,
    textAlign: 'center',
    height: 45,
    lineHeight: 45,
    fontSize: FONT_SIZE_THIRD,
  },
  item: {
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR_FIRST,
    borderBottomWidth: 1,
  },
  itemCell: {
    flex: 2,
    textAlign: 'center',
    height: 40,
    lineHeight: 40,
    fontSize: FONT_SIZE_SECOND,
  },
  firstOne: {
    flex: 1,
  },
});

class PerMonthPriceModal extends Component {
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
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={[styles.titleItem, styles.firstOne]}>{i18n.period}</Text>
          <Text style={styles.titleItem}>
            {`${i18n.principal}(${MONETARY})`}
          </Text>
          <Text style={styles.titleItem}>
            {`${i18n.interest}(${MONETARY})`}
          </Text>
        </View>
        <ScrollView style={styles.main}>
          {data &&
            data.map((val, index) => (
              <View style={styles.item} key={index}>
                <Text style={[styles.itemCell, styles.firstOne]}>
                  {index + 1}
                </Text>
                <Text style={styles.itemCell}>
                  {priceFormat(val.principal)}
                </Text>
                <Text style={styles.itemCell}>{priceFormat(val.interest)}</Text>
              </View>
            ))}
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
