import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Modal,
  // Platform,
  // ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Loader from '../components/Loader';
import BYTouchable from '../components/BYTouchable';
import BYTextInput from '../components/BYTextInput';
import priceFormat from '../common/helpers/priceFormat';

import {
  BORDER_COLOR,
  PRIMARY_COLOR,
  RED_COLOR,
  // RED_COLOR,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  // SCREENS,
  SIDEINTERVAL,
  // STATUSBAR_HEIGHT,
} from '../common/constants';

import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mask: {
    flex: 1,
  },
  operate: {
    flexDirection: 'row',
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
  },
  operateLeft: {
    flex: 1,
    height: 49,
    lineHeight: 49,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    backgroundColor: '#fff',
  },
  operateRight: {
    flex: 1,
    height: 49,
    lineHeight: 49,
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
  },
  operateGroupLeft: {
    flex: 3,
    height: 49,
    paddingTop: 5,
    backgroundColor: '#fff',
    paddingLeft: SIDEINTERVAL,
  },
  operateGroupLeftOldPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#999',
    fontSize: 12,
  },
  operateGroupLeftPrice: {
    color: RED_COLOR,
    fontSize: 16,
  },
  operateGroupRight: {
    flex: 2,
    height: 49,
    lineHeight: 49,
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
  },
  paramClose: {
    paddingTop: WINDOW_WIDTH * 0.03,
    paddingRight: WINDOW_WIDTH * 0.03,
    // marginBottom: 5,
  },
  paramCloseIcon: {
    color: '#ccc',
    fontSize: 24,
    textAlign: 'right',
  },
  paramInfo: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    flexDirection: 'row',
  },
  paramImage: {
    height: 60,
    width: 60,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    marginRight: SIDEINTERVAL,
  },
  paramPrice: {
    color: RED_COLOR,
    fontSize: 18,
    paddingTop: 10,
    fontWeight: '700',
  },
  paramHave: {
    color: '#999',
    fontSize: 11,
  },
  paramTitle: {
    color: '#666',
    paddingLeft: SIDEINTERVAL,
    paddingTop: 20,
    marginBottom: 8,
  },
  paramColor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
    // marginBottom: 20,
  },
  paramColorItem: {
    // width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 35,
    lineHeight: 35,
    textAlign: 'center',
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    color: '#999',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    paddingLeft: WINDOW_WIDTH * 0.05,
    paddingRight: WINDOW_WIDTH * 0.05,
  },
  paramColorItemAcitve: {
    borderColor: PRIMARY_COLOR,
    color: PRIMARY_COLOR,
  },
  paramNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: 10,
    marginBottom: 50,
  },
  paramNumberText: {
    flex: 1,
    color: '#666',
  },
  paramNumberChange: {
    flexDirection: 'row',
  },
  paramNumberRemoveIcon: {
    height: 30,
    lineHeight: 30,
    width: 30,
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    backgroundColor: '#fff',
    fontWeight: '900',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  },
  paramNumberAddIcon: {
    height: 30,
    lineHeight: 30,
    width: 30,
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    backgroundColor: '#fff',
    fontWeight: '900',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  },
  paramNumberIconDisable: {
    opacity: 0.5,
  },
  paramNumberTextInput: {
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 11,
    color: '#666',
    borderTopColor: BORDER_COLOR,
    borderBottomColor: BORDER_COLOR,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  buttonWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL * 2,
  },
  button: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
  },
});

class ParamsSelectModal extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     addressIndex: 0, // 显示哪个ScrollView
  //     division2ndID: null,
  //     division3rdID: null,
  //     division4thID: null,
  //     division2ndName: null,
  //     division3rdName: null,
  //     division4thName: null,
  //   };
  // }

  // componentDidMount() {
  //   const {
  //     cityInfosFetch,
  //     modalProps: { params },
  //   } = this.props;
  // }

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  renderContent() {
    const {
      i18n,
      productDetailNumber,
      colorArray,
      versionArray,
      imageUrls,
      price,
      numbers,
      propertiesIdsObject,
    } = this.props;

    const { colorId = 0, versionId = 0 } = propertiesIdsObject;

    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View style={styles.paramClose}>
          <EvilIcons
            style={styles.paramCloseIcon}
            name="close"
            onPress={() => this.handleOnModalClose()}
          />
        </View>
        <View style={styles.paramInfo}>
          {imageUrls[0] && (
            <Image
              style={styles.paramImage}
              source={{ uri: imageUrls[0].imageUrl }}
            />
          )}
          <View style={styles.paramInfoLeft}>
            <Text style={styles.paramPrice}>{priceFormat(price)} ₫</Text>
            <Text style={styles.paramHave}>
              {i18n.warehouse}: {numbers > 0 ? i18n.inStock : i18n.soldOut}
            </Text>
          </View>
        </View>
        <Text style={styles.paramTitle}>{i18n.color}</Text>
        <View style={styles.paramColor}>
          {colorArray.map(val => (
            <Text
              style={[
                styles.paramColorItem,
                val.id === colorId && styles.paramColorItemAcitve,
              ]}
              onPress={() => this.handleOnPressselectColor(val.id, val.value)}
              key={val.value}
            >
              {val.value}
            </Text>
          ))}
        </View>
        {!!versionArray.length && (
          <Text style={styles.paramTitle}>RAM & {i18n.memory}</Text>
        )}
        <View style={styles.paramColor}>
          {versionArray.map(val => (
            <Text
              style={[
                styles.paramColorItem,
                val.id === versionId && styles.paramColorItemAcitve,
              ]}
              onPress={() => this.handleOnPressselectVersion(val.id, val.value)}
              key={val.value}
            >
              {val.value}
            </Text>
          ))}
        </View>
        <View style={styles.paramNumber}>
          <Text style={styles.paramNumberText}>số lượng</Text>
          <View style={styles.paramNumberChange}>
            <BYTouchable
              onPress={() =>
                this.handleOnPresschangeNumber(productDetailNumber - 1)
              }
            >
              <Ionicons
                name="ios-remove"
                style={[
                  styles.paramNumberRemoveIcon,
                  productDetailNumber === 1 && styles.paramNumberIconDisable,
                ]}
              />
            </BYTouchable>
            <BYTextInput
              style={styles.paramNumberTextInput}
              keyboardType="numeric"
              value={productDetailNumber.toString()}
              editable={false}
            />
            <BYTouchable
              onPress={() =>
                this.handleOnPresschangeNumber(productDetailNumber + 1)
              }
            >
              <Ionicons
                name="ios-add"
                style={[
                  styles.paramNumberAddIcon,
                  parseInt(productDetailNumber, 10) === numbers &&
                    styles.paramNumberIconDisable,
                ]}
              />
            </BYTouchable>
          </View>
        </View>
        <View style={styles.buttonWrap}>
          <Text style={styles.button} onPress={() => this.handleOnModalClose()}>
            confirm
          </Text>
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
          <Text style={styles.mask} />
          {this.renderContent()}
        </View>
      </Modal>
    );
  }
}

export default connect(
  state => {
    const {
      // cityInfos,
      modal: { modalProps = {} },
    } = state;

    // const {
    // } = this.props;

    return {
      modalProps,
      // loading: cityInfos.loading,
    };
  },
  {
    // ...cityInfosActionCreators,
    ...modalActionCreators,
  },
)(ParamsSelectModal);
