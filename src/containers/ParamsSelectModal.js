import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  // Platform,
  // ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Loader from '../components/Loader';
import BYTouchable from '../components/BYTouchable';

import { PRIMARY_COLOR, BORDER_COLOR } from '../styles/variables';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  // STATUSBAR_HEIGHT,
} from '../common/constants';

import * as cityInfosActionCreators from '../common/actions/cityInfos';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  mask: {
    flex: 1,
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
            onPress={() => this.handleOnPressToggleMenuBottomSheet()}
          />
        </View>
        <View style={styles.paramInfo}>
          {
            imageUrls[0] && 
            <Image style={styles.paramImage} source={{uri: imageUrls[0].imageUrl}} />
          }
          <View style={styles.paramInfoLeft}>
            <Text style={styles.paramPrice}>{priceFormat(price)} VND</Text>
            <Text style={styles.paramHave}>{i18n.warehouse}: {numbers > 0 ? i18n.inStock : i18n.soldOut}</Text>
          </View>
        </View>
        <Text style={styles.paramTitle}>{i18n.color}</Text>
        <View style={styles.paramColor}>
          {
            colorArray.map((val, key) => {
              return (
                <Text 
                  style={[styles.paramColorItem, (val.id === colorId) && styles.paramColorItemAcitve]} 
                  onPress={() => this.handleOnPressselectColor(val.id, val.value)} 
                  key={key} 
                >
                  {val.value}
                </Text>
              )
            })
          }
        </View>
        {!!versionArray.length && <Text style={styles.paramTitle}>RAM & {i18n.memory}</Text>}
        <View style={styles.paramColor}>
          {
            versionArray.map((val, key) => {
              return (
                <Text 
                  style={[styles.paramColorItem, (val.id === versionId) && styles.paramColorItemAcitve]} 
                  onPress={() => this.handleOnPressselectVersion(val.id, val.value)} 
                  key={key} 
                >
                  {val.value}
                </Text>
              )
            })
          }
        </View>
        <View style={styles.paramNumber}>
          <Text style={styles.paramNumberText}>số lượng</Text>
          <View style={styles.paramNumberChange}>

            <BYTouchable onPress={() => this.handleOnPresschangeNumber(productDetailNumber - 1)}>
              <Ionicons 
                name={'ios-remove'} 
                style={[styles.paramNumberRemoveIcon, productDetailNumber === 1 && styles.paramNumberIconDisable]} 
              />
            </BYTouchable>
            <BYTextInput 
              style={styles.paramNumberTextInput} 
              keyboardType={'numeric'} 
              value={productDetailNumber + ''} 
              editable={false}
            />
            <BYTouchable onPress={() => this.handleOnPresschangeNumber(productDetailNumber + 1)}>
              <Ionicons 
                name={'ios-add'} 
                style={[
                  styles.paramNumberAddIcon, 
                  parseInt(productDetailNumber) === numbers && styles.paramNumberIconDisable
                ]} 
              />
            </BYTouchable>

          </View>
        </View>
        <View style={styles.buttonWrap}>
          <Text style={styles.button} onPress={() => this.handleOnPressToggleMenuBottomSheet()}>confirm</Text>
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
      // division2ndItems: cityInfos.division2nd,
      // division3rdItems: cityInfos.division3rd,
      // division4thItems: cityInfos.division4th,
    };
  },
  {
    // ...cityInfosActionCreators,
    ...modalActionCreators,
  },
)(ParamsSelectModal);
