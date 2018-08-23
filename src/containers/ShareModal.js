import React, {Component} from 'react';
import {StyleSheet, View, Text, Modal, Image, NativeModules} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BYTouchable from '../components/BYTouchable';
import {connectLocalization} from '../components/Localization';
import {ShareApi} from 'react-native-fbsdk';

import * as modalActionCreators from '../common/actions/modal';

// const zalofunPng = require('../images/zalofun.png');
// const googleplusPng = require('../images/googleplus.png');
const facebooklogoPng = require('../images/facebooklogo.png');
const FBSDK = require('react-native-fbsdk');
const {
  ShareDialog,
} = FBSDK;

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

  componentDidMount() {
  }

  handleOnModalClose = () => {
    const {closeModal} = this.props;
    closeModal();
  };

  handleFBShare() {
    const {
      brandId,
      typeId,
      id,
      i18n,
      name
    } = this.props;

    let link = "https://www.buyoo.vn/html/details.html?";
    link += "typeId=";
    link += typeId;
    link += "&brandId=";
    link += brandId;
    link += "&id=";
    link += id;
    shareStr = i18n.shareProduct1 + name + i18n.shareProduct2
    let shareLinkContent = {
      contentType: 'link',
      contentUrl: link,
      contentDescription: shareStr,
    };

    ShareDialog.canShow(shareLinkContent).then(
      (canShow) => {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      (result) => {
        console.log("success")
      },
      (error) => {
        NativeModules.Toast.show(i18n.failed + error);
      }
    );

  }

  renderContent() {
    const {i18n} = this.props;
    // const {
    //   cancelTitle = i18n.cancel,
    //   buttons = [],
    //   // buttons = [],
    // } = this.props;

    return (
      <View style={styles.contanier}>
        <View style={styles.title}>
          <Ionicons style={styles.titleIcon} name="ios-paper-plane"/>
          <Text style={styles.titleText}>{i18n.share}</Text>
        </View>
        <View style={styles.main}>
          <BYTouchable
            style={styles.itemWrap}
            onPress={() => this.handleFBShare()}
          >
            <Image style={styles.item} source={facebooklogoPng}/>
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
        <View style={{flex: 1}}>
          <Text style={styles.mask} onPress={this.handleOnModalClose}/>
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
        modal: {modalProps = {}},
      } = state;

      const {
        callback,
        buttons,
        brandId,
        typeId,
        id,
        name,
        // buttons,
      } = props;

      return {
        callback,
        buttons,
        modalProps,
        brandId,
        typeId,
        id,
        name
      };
    },
    {
      ...modalActionCreators,
    },
  )(ShareModal),
);
