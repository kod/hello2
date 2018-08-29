import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Modal,
  // Alert,
} from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
} from '../common/constants';

import * as modalActionCreators from '../common/actions/modal';
import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
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
  buttonDisable: {
    opacity: 0.5,
  },
});

class ParamsSelectModal extends Component {
  handleOnModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleOnPresschangeNumber(number) {
    const { productDetailNumberFetch, numbers } = this.props;
    if (number < 1 || number > numbers) return false;
    return productDetailNumberFetch(number);
  }

  handleOnChangeProperties(key, val) {
    const {
      productDetailSelect,
      productDetailSort,
      propertiesIdsObject,
    } = this.props;
    const array = propertiesIdsObject.split('-');
    array[key] = val.toString();
    const result = array.sort().join('-');
    if (propertiesIdsObject !== result)
      productDetailSelect(result, productDetailSort[result]);
  }

  renderPropertiesIds() {
    const stylesX = StyleSheet.create({
      wrap: {},
      item: {},
      title: {
        color: '#666',
        paddingLeft: SIDEINTERVAL,
        paddingTop: 15,
        marginBottom: 8,
      },
      properties: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: SIDEINTERVAL,
        // marginBottom: 20,
      },
      propertiesItem: {
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
      propertiesItemAcitve: {
        borderColor: PRIMARY_COLOR,
        color: PRIMARY_COLOR,
      },
    });

    const {
      propertiesArray,
      propertiesObject,
      propertiesIdsObject,
    } = this.props;

    return (
      <View style={stylesX.wrap}>
        {propertiesArray.map((val, key) => (
          <View style={stylesX.item} key={val}>
            <Text style={stylesX.title}>{val}</Text>
            <View style={stylesX.properties}>
              {propertiesObject[val].map(val1 => (
                <Text
                  style={[
                    stylesX.propertiesItem,
                    val1.id ===
                      parseInt(propertiesIdsObject.split('-')[key], 10) &&
                      stylesX.propertiesItemAcitve,
                  ]}
                  onPress={() => this.handleOnChangeProperties(key, val1.id)}
                  key={val1.value}
                >
                  {val1.value}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  }

  renderContent() {
    const {
      i18n,
      productDetailNumber,
      imageUrls,
      price,
      numbers,
      // propertiesIdsObject,
    } = this.props;

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
        {this.renderPropertiesIds()}
        <View style={styles.paramNumber}>
          <Text style={styles.paramNumberText}>{i18n.amount}</Text>
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
          <Text
            style={[styles.button, !(numbers > 0) && styles.buttonDisable]}
            onPress={() => this.handleOnModalClose()}
          >
            {numbers > 0 ? i18n.confirm : i18n.soldOut}
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
          <Text style={styles.mask} onPress={this.handleOnModalClose} />
          {this.renderContent()}
        </View>
      </Modal>
    );
  }
}

export default connect(
  (state, props) => {
    const {
      modal: { modalProps = {} },
      mergeCheck,
      mergeGetDetail,
      productDetailInfo,
      mergeGetMaster,
    } = state;

    const {
      brandId,
      // navigation,
    } = props;

    const groupon = false;
    const brandIdUsed = brandId;
    // const groupon = navigation.state.params.groupon;
    const item = groupon ? mergeGetDetail.item : productDetailInfo.item;
    return {
      ...item,
      brandId: brandIdUsed,
      groupon,
      isMaster: !!mergeCheck.item.mergeMasterId,
      masterItems: mergeGetMaster.items,
      isAuthUser: !!state.login.user,
      modalProps,
    };
  },
  {
    ...productDetailInfoActionCreators,
    ...modalActionCreators,
  },
)(ParamsSelectModal);
