import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  WebView,
  UIManager,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomIcon from "../components/CustomIcon";
import BYBottomSheet from "../components/BYBottomSheet";
import BYTextInput from "../components/BYTextInput";
import BYTouchable from "../components/BYTouchable";
import ProductDetailTabNavigator from "../navigations/ProductDetailTabNavigator";

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SIDEINTERVAL,
  PRIMARY_COLOR, 
  RED_COLOR
} from "../styles/variables";

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  operate: {
    flexDirection: 'row',
  },
  operateLeft: {
    flex: 1,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    backgroundColor: '#fff',
  },
  operateRight: {
    flex: 1,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    backgroundColor: PRIMARY_COLOR
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
    borderColor: '#f5f5f5',
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
    marginBottom: 8
  },
  paramColor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
    // marginBottom: 20,
  },
  paramColorItem: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    color: '#999',
    borderColor: '#f5f5f5',
    borderWidth: 1,
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
    backgroundColor: '#f5f5f5',
    fontWeight: '900',
  },
  paramNumberAddIcon: {
    height: 30,
    lineHeight: 30,
    width: 30,
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    backgroundColor: '#f5f5f5',
    fontWeight: '900',
  },
  paramNumberIconDisable: {
    opacity: 0.5,
  },
  paramNumberTextInput: {
    height: 30,
    width: 30,
    backgroundColor: '#ccc',
    textAlign: 'center',
    fontSize: 11,
    color: '#fff',
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

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenuBottomSheet: false,
    };
    this.listViewOffset = 0;
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    const { bannerSwiperFetch } = this.props;
    bannerSwiperFetch('one');
  }

  handleOnCancelMenuBottomSheet = () => {
    this.setState({
      isOpenMenuBottomSheet: false,
    });
  };

  handleOnPressOpenMenuBottomSheet = selectedImageIndex => {
    const newState = {
      isOpenMenuBottomSheet: true,
    };
    // if (selectedImageIndex !== null) {
    //   newState.selectedImageIndex = selectedImageIndex;
    // }
    this.setState(newState);
  };

  render() {
    const { isOpenMenuBottomSheet } = this.state;
    const { bannerSwiper, screenProps, productdetailOpacity, } = this.props;
    const quantity = '1';
    return (
      <View style={styles.container} >
        <ProductDetailTabNavigator screenProps={{
          ...screenProps,
          BYopacity: productdetailOpacity
        }} />
        <View style={styles.operate} >
          <Text style={styles.operateLeft} >Add to cart</Text>
          <Text style={styles.operateRight} onPress={() => this.handleOnPressOpenMenuBottomSheet(null)}>buy</Text>
        </View>
        <BYBottomSheet
          visible={isOpenMenuBottomSheet}
          onCancel={this.handleOnCancelMenuBottomSheet}
        >
          <View style={styles.paramClose} >
            <EvilIcons style={styles.paramCloseIcon} name={'close'} />
          </View>
          <View style={styles.paramInfo} >
            <Image style={styles.paramImage} source={require('../images/1521546805315_mi_mix2_01.jpg')} />
            <View style={styles.paramInfoLeft} >
              <Text style={styles.paramPrice} >2.800.500 VND</Text>
              <Text style={styles.paramHave} >Kho: co hang</Text>
            </View>
          </View>
          <Text style={styles.paramTitle} >color</Text>
          <View style={styles.paramColor} >
            <Text style={[styles.paramColorItem, styles.paramColorItemAcitve]} >black</Text>
            <Text style={styles.paramColorItem} >white</Text>
          </View>
          <Text style={styles.paramTitle} >guige</Text>
          <View style={styles.paramColor} >
            <Text style={[styles.paramColorItem, styles.paramColorItemAcitve]} >4+64G</Text>
            <Text style={styles.paramColorItem} >6+64G</Text>
            <Text style={styles.paramColorItem} >6+128G</Text>
            <Text style={styles.paramColorItem} >8+128G</Text>
          </View>
          <View style={styles.paramNumber} >
            <Text style={styles.paramNumberText} >số lượng</Text>
            <View style={styles.paramNumberChange} >

              <BYTouchable onPress={() => {}} >
                <Ionicons 
                  name={'ios-remove'} 
                  style={[styles.paramNumberRemoveIcon, quantity === '1' && styles.paramNumberIconDisable]} 
                />
              </BYTouchable>
              <BYTextInput 
                style={styles.paramNumberTextInput} 
                keyboardType={'numeric'} 
                value={quantity} 
                editable={false}
              />
              <BYTouchable onPress={() => {}} >
                <Ionicons 
                  name={'ios-add'} 
                  style={[
                    styles.paramNumberAddIcon, 
                    parseInt(quantity) === 5 && styles.paramNumberIconDisable
                  ]} 
                />
              </BYTouchable>

            </View>
          </View>
          <View style={styles.buttonWrap} >
            <Text style={styles.button} >buy</Text>
          </View>
        </BYBottomSheet>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { bannerSwiper, productdetailOpacity } = state;
  return {
    bannerSwiper: bannerSwiper['one'] || {},
    productdetailOpacity: productdetailOpacity.value,
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, })(ProductDetail);
