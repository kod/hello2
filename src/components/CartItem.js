import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RED_COLOR, PRIMARY_COLOR, BORDER_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, SCREENS, } from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';
import { CARMAXNUMBER } from '../common/constants';
import BYTouchable from './BYTouchable';

import BYTextInput from './BYTextInput';

import * as cartActionCreators from  "../common/actions/cart";


const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 3) / 2;

const styles = StyleSheet.create({
  itemWrap: {
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  itemLeft: {
    // width: WINDOW_WIDTH * 0.25,
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingTop: 18,
    paddingBottom: 18,
  },
  itemImage: {
    width: 60,
    height: 60,
    // backgroundColor: '#0f0',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  },
  itemRight: {
    flex: 1,
    paddingTop: 18,
    // paddingBottom: 18,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  itemTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  itemRightRow3: {
    flexDirection: 'row',
  },
  itemRightRow3Price: {
    fontSize: 14,
    color: RED_COLOR,
    marginRight: 9,
  },
  itemRightRow3Number: {
    fontSize: 11,
    color: '#666',
    paddingTop: 2,
  },
});

class CartItem extends Component {

  componentDidMount() {
    // const { cartNumberRequest, authUser } = this.props;
    // authUser && cartNumberRequest(authUser.result, 297, 4);
  }

  renderCartItemLeft = (id, selected) => {
    const { isEdit } = this.props;
    const styles = StyleSheet.create({
      container: {
        width: WINDOW_WIDTH * 0.134,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        fontSize: 20,
        color: '#666',
      },
      iconSelected: {
        fontSize: 20,
        color: isEdit ? RED_COLOR : PRIMARY_COLOR,
      },
    });

    const onPressHandle = (id, selected) => {
      const { cartSelectRequest } = this.props;
      cartSelectRequest(id, selected);
    }

    return (
      <BYTouchable
        style={styles.container}
        onPress={() => onPressHandle(id, !selected)}
      >
        {
          selected
          ? <Ionicons name="ios-radio-button-on-outline" style={styles.iconSelected} />
          : <Ionicons name={'ios-radio-button-off-outline'} style={styles.icon} />
        }
      </BYTouchable>
    );
  };

  renderCartItemRight = (id, quantity) => {
    id = id + '';
    quantity = quantity + '';
    const styles = StyleSheet.create({
      container: {
        position: 'relative',
        width: 30 + SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      number: {
        // display: 'none',
      },
      addIcon: {
        height: 30,
        lineHeight: 30,
        width: 30,
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
        backgroundColor: '#f5f5f5',
        fontWeight: '900',
      },
      removeIcon: {
        height: 30,
        lineHeight: 30,
        width: 30,
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
        backgroundColor: '#f5f5f5',
        fontWeight: '900',
      },
      removeIconDisable: {
        opacity: 0.5
      },
      textInput: {
        height: 30,
        width: 30,
        backgroundColor: '#ccc',
        textAlign: 'center',
        fontSize: 11,
        color: '#fff',
      },
      tips: {
        position: 'absolute',
        top: 30,
        left: -15 - SIDEINTERVAL,
        backgroundColor: RED_COLOR,
        transform: [{ rotate: '90deg'}],
        display: 'none',
      },
      tipsText: {
        height: 30,
        lineHeight: 30,
        width: 90,
        textAlign: 'center',
        fontSize: 11,
        color: '#fff',
      },
    });

    const onChangeTextHandle = (text, id) => {
      if (text < 1 || text > CARMAXNUMBER) return false;
      const { cartNumberRequest, authUser } = this.props;
      authUser && cartNumberRequest(authUser.result, id, text);
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.number}>
          <BYTouchable
            onPress={() => onChangeTextHandle(parseInt(quantity) - 1, id)}
          >
            <Ionicons 
              name="ios-remove" 
              style={[styles.removeIcon, quantity === '1' && styles.removeIconDisable]} 
            />
          </BYTouchable>
          <BYTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={quantity} 
            // onChangeText={(text) => onChangeTextHandle(text, id)}
            editable={false}
          />
          <BYTouchable
            onPress={() => onChangeTextHandle(parseInt(quantity) + 1, id)}
          >
            <Ionicons 
              name="ios-add" 
              style={[
                styles.addIcon, 
                parseInt(quantity) === CARMAXNUMBER && styles.removeIconDisable
              ]} 
            />
          </BYTouchable>
        </View>
        <BYTouchable
          style={styles.tips}
          // style={styles.tips}
        >
          <Text style={styles.tipsText}>Kệ sản phẩm</Text>
        </BYTouchable>
      </View>
    );
  };
  
  render() {
    const {
      data,
      style,
      styleItem,
      styleItemOpacity,
      styleItemLeft,
      itemLeft,
      itemRight,
      cartNumberRequest,
      navigation: { navigate },
      ...restProps
    } = this.props;
    const { items, products, details, isEdit } = data;

    return (
      <View style={[styles.itemWrap, style]} {...restProps}>
        {items &&
          items.map((val, key) => 
            (
              <BYTouchable 
                style={[styles.item, styleItem]} 
                key={key} 
                onPress={() => navigate(SCREENS.ProductDetail, { brandId: details[products[val].detail].brandId })}
              >
                {this.renderCartItemLeft(val, isEdit ? products[val].selectedDel : products[val].selected)}
                <View style={[styles.itemLeft, styleItemLeft]}>
                  <Image style={styles.itemImage} source={{ uri: `${details[products[val].detail].iconUrl}?x-oss-process=image/quality,Q_70` }} />
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.itemTitle} numberOfLines={1}>{products[val].subject}</Text>
                  <Text style={styles.itemPrice}>{priceFormat(details[products[val].detail].price) + ' ₫'}</Text>
                  <View style={styles.itemRightRow3}>
                    <Text style={styles.itemRightRow3Price}>{priceFormat(details[products[val].detail].price) + ' ₫'}</Text>
                    <Text style={styles.itemRightRow3Number}>x12 Tháng</Text>
                  </View>
                </View>
                {this.renderCartItemRight(val, products[val].quantity)}
              </BYTouchable>
            )
          )}
      </View>
    );
  }
};

export default connect(
  state => {
    return {
      authUser: state.login.user,
      isEdit: state.cart.isEdit,
    }
  },
  {
    ...cartActionCreators
  }
)(CartItem);