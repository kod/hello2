import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { withNavigation } from 'react-navigation';
import moment from "moment";

import BYTouchable from "../components/BYTouchable";
import CustomIcon from "../components/CustomIcon";

import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, SCREENS } from "../common/constants";
import priceFormat from "../common/helpers/priceFormat";

import { RED_COLOR , PRIMARY_COLOR} from "../styles/variables";

const styles = StyleSheet.create({
  container: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: 15,
  },
  item: {
    marginBottom: 30,
  },
  itemDisable: {
    opacity: 0.5,
  },
  image: {
    height: 5,
    width: WINDOW_WIDTH - SIDEINTERVAL * 2,
    resizeMode: 'cover',
  },
  bottom: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
  },
  bottomRed: {
    backgroundColor: RED_COLOR,
  },
  bottomGrey: {
    backgroundColor: '#7b7b7b',
  },
  date: {
    position: 'absolute',
    zIndex: 555,
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    lineHeight: 30,
    color: '#fff',
    fontSize: 11,
    paddingLeft: SIDEINTERVAL * 2,
    backgroundColor: 'rgba(66, 66, 66, 0.5)'
  },
  left: {
    flex: 1,
    height: 160,
    paddingLeft: SIDEINTERVAL * 2,
    paddingTop: SIDEINTERVAL * 1.5,
  },
  price: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 1,
  },
  text1: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  text2: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  arrow: {
    height: 160,
    lineHeight: 160,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL * 1.8,
    color: '#fff',
  },
});

class CouponItem extends Component {
  render() {
    const {
      isCouponCenter = true,
      data, 
      onPress,
      ...restProps
    } = this.props;
    
    return (
      <View style={[styles.container]} {...restProps}>
        {data.map((val, key) => (
          val.voucherType === 1 
          ?
          <BYTouchable 
            style={[styles.item, isCouponCenter && val.status !== 1 && styles.itemDisable]} 
            key={key} 
            onPress={() => onPress && onPress(val)} 
            backgroundColor={'transparent'}
          > 
            <Image style={styles.image} source={require('../images/couponBlue.png')} />
            <View style={styles.bottom} >
              <View style={styles.left} >
                <Text style={styles.price} >{priceFormat(val.voucherValue)} vnd</Text>
                <Text style={styles.text1} >{val.voucherName}</Text>
                <Text style={styles.text2} >{val.voucherDesc}</Text>
              </View>
              {
                onPress && 
                <CustomIcon style={styles.arrow} name={'arrowright'} />
              }
              <Text style={styles.date} >{moment(val.startTime).format('YYYY-MM-DD')}-{moment(val.expireTime).format('YYYY-MM-DD')}</Text>
            </View>
          </BYTouchable>
          :
          <BYTouchable 
            style={[styles.item, isCouponCenter && val.status !== 1 && styles.itemDisable]} 
            key={key} 
            onPress={() => onPress && onPress(val)} 
            backgroundColor={'transparent'}
          >
            <Image style={styles.image} source={require('../images/couponRed.png')} />
            <View style={[styles.bottom, styles.bottomRed]} >
              <View style={styles.left} >
                <Text style={styles.price} >{ 100 - val.voucherValue }% OFF</Text>
                <Text style={styles.text1} >{val.voucherName}</Text>
                <Text style={styles.text2} >{val.voucherDesc}</Text>
              </View>
              {
                onPress && 
                <CustomIcon style={styles.arrow} name={'arrowright'} />
              }
              <Text style={styles.date} >{moment(val.startTime).format('YYYY-MM-DD')}-{moment(val.expireTime).format('YYYY-MM-DD')}</Text>
            </View>
          </BYTouchable>
        ))}
    </View>
  );
  }
}

export default withNavigation(CouponItem);
