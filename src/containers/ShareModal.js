import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, Image } from 'react-native';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { RED_COLOR, BORDER_COLOR } from '../styles/variables';
// import { SIDEINTERVAL } from '../common/constants';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';

import * as modalActionCreators from '../common/actions/modal';

// const zalofunPng = require('../images/zalofun.png');
// const googleplusPng = require('../images/googleplus.png');
const facebooklogoPng = require('../images/facebooklogo.png');

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  contanier: {
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  titleIcon: {
    fontSize: 16,
    color: '#333',
    paddingTop: 2,
    paddingRight: 4,
  },
  titleText: {
    fontSize: 14,
    color: '#333',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  itemWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

class ShareModal extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isOpenActionSheet: true,
  //   };
  // }
  // static propTypes = {
  //   callback: PropTypes.func.isRequired,
  // };

  componentDidMount() {}

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleOnPress(key) {
    switch (key) {
      case 'fb':
        console.log('fb');
        break;

      default:
        break;
    }
  }

  renderContent() {
    const { i18n } = this.props;
    // const {
    //   cancelTitle = i18n.cancel,
    //   buttons = [],
    //   // buttons = [],
    // } = this.props;

    return (
      <View style={styles.contanier}>
        <View style={styles.title}>
          <Ionicons style={styles.titleIcon} name="ios-paper-plane" />
          <Text style={styles.titleText}>{i18n.share}</Text>
        </View>
        <View style={styles.main}>
          <BYTouchable
            style={styles.itemWrap}
            onPress={() => this.handleOnPress('fb')}
          >
            <Image style={styles.item} source={facebooklogoPng} />
          </BYTouchable>
          {/* <BYTouchable style={styles.itemWrap}>
            <Image style={styles.item} source={googleplusPng} />
          </BYTouchable> */}
        </View>
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

      return {
        callback,
        buttons,
        modalProps,
      };
    },
    {
      ...modalActionCreators,
    },
  )(ShareModal),
);
