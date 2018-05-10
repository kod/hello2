import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Alert } from 'react-native';
import { connect } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { APPBAR_HEIGHT, STATUSBAR_HEIGHT, WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, HEADER_BACKGROUND_COLOR, RED_COLOR, PRIMARY_COLOR } from '../styles/variables';
import BYHeader from '../components/BYHeader';
import BYTouchable from "../components/BYTouchable";
import CartItem from "../components/CartItem";
import BYTextInput from "../components/BYTextInput";
import { connectLocalization } from "../components/Localization";
import priceFormat from '../common/helpers/priceFormat';
import * as cartActionCreators from "../common/actions/cart";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRight: {
    height: APPBAR_HEIGHT,
  },
  headerRightText: {
    fontSize: 16,
    color: '#666',
    height: APPBAR_HEIGHT,
    lineHeight: APPBAR_HEIGHT,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  overview: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopColor: '#f5f5f5',
    borderTopWidth: 1,
  },
  overviewIconWrap: {
    paddingLeft: WINDOW_WIDTH * 0.045,
  },
  overviewSelectAll: {
    flexDirection: 'row',
  },
  overviewIcon: {
    height: 50,
    lineHeight: 50,
    fontSize: 20,
    color: '#666',
    marginRight: WINDOW_WIDTH * 0.02,
  },
  overviewIconSelected: {
    color: PRIMARY_COLOR,
  },
  overviewIconSelectedDel: {
    color: RED_COLOR,
  },
  overviewSelect: {
    height: 49,
    lineHeight: 49,
    fontSize: 16,
    color: '#666',
    paddingRight: WINDOW_WIDTH * 0.02,
  },
  overviewPrice: {
    flex: 1,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    fontSize: 16,
    color: RED_COLOR,
    fontWeight: '700',
  },
  overviewSubmitText: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    width: WINDOW_WIDTH * 0.25,
    color: '#fff',
    fontSize: 14,
    backgroundColor: PRIMARY_COLOR,
  },
  overviewSubmitTextDel: {
    backgroundColor: RED_COLOR,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImg: {
    width: WINDOW_WIDTH * 0.7,
    height: WINDOW_WIDTH * 0.7,
    marginBottom: 28,
  },
  emptyText: {
    color: '#ccc',
    fontSize: 14,
  },
});

class Cart extends React.Component {
  componentDidMount() {
    const { cartRequest, user } = this.props;
    user && cartRequest(user.result);
  }
  
  renderHeaderRight = () => {
    const { isEdit, i18n, cartEditRequest, cartEditInitRequest } = this.props;

    const onPressHandle = () => {
      cartEditRequest();
      // console.log(isEdit);
      if (isEdit) cartEditInitRequest();
    }
    
    return (
      <BYTouchable style={styles.headerRight} onPress={() => onPressHandle()} >
        <Text style={styles.headerRightText} >{ isEdit ? i18n.save: i18n.edit }</Text>
      </BYTouchable>
    );
  };

  onPressSelectAllHandle = () => {
    const { isEdit, cartSelectAllRequest, cartSelectDelAllRequest } = this.props;
    if (isEdit === false) {
      cartSelectAllRequest();
    } else {
      // delete
      cartSelectDelAllRequest();
    }
  }

  onPressSubmitHandle = () => {
    const { isEdit, cart, cartDeleteRequest, authUserToken, i18n } = this.props;

    const getSelectedDelId = (cart) => {
      const { items, products, details } = cart;
      let result = [];
      items.forEach((value, index, arr) => {
        if (products[value].selectedDel) result.push(value);
      });
      return result.join(',');
    }
    
    if (isEdit === false) {
      // submit
    } else {
      // delete
      const selectedDelIdStr = getSelectedDelId(cart);
      if (!selectedDelIdStr) return false;
      Alert.alert(
        '',
        i18n.confirmDelete,
        [
          {
            text: i18n.cancel,
          },
          {
            text: i18n.delete,
            onPress: () => {
               cartDeleteRequest(authUserToken, selectedDelIdStr);
            }
          }
        ]
      )
    }
  }

  render() {
    const { cart, allSelected, allSelectedDel, i18n, isEdit } = this.props;
    const isEmptyCart = cart.items.length === 0 ? true : false;
    // console.log(isEdit ? allSelectedDel : allSelected);
    // 
    return (
      <View style={styles.container}>
        {!isEmptyCart && <BYHeader 
          showBackButton={false}
          headerRight={this.renderHeaderRight()}
        />}
        {!isEmptyCart && <ScrollView>
          <CartItem
            data={cart}
            styleItem={{marginBottom: 25, borderTopColor: '#f5f5f5', borderTopWidth: 1,}}
            styleItemLeft={{paddingLeft: 0, paddingTop: 15, paddingBottom: 15,}}
          />
        </ScrollView>}
        {!isEmptyCart && <View style={styles.overview} >
          <BYTouchable style={styles.overviewSelectAll} onPress={() => this.onPressSelectAllHandle()} >
            <View style={styles.overviewIconWrap} >
              {
                isEdit
                ? <Ionicons name={ allSelectedDel ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'} style={[styles.overviewIcon, allSelectedDel && styles.overviewIconSelectedDel]} />
                : <Ionicons name={ allSelected ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'} style={[styles.overviewIcon, allSelected && styles.overviewIconSelected]} />
              }
            </View>
            <Text style={styles.overviewSelect} >{i18n.selectAll}</Text>
          </BYTouchable>
          <Text style={styles.overviewPrice} >{!isEdit && (priceFormat(cart.totalMoney) + ' VND')}</Text>
          <BYTouchable style={styles.overviewSubmit} onPress={() => this.onPressSubmitHandle()} >
            <Text style={[styles.overviewSubmitText, isEdit && styles.overviewSubmitTextDel]} >{isEdit ? i18n.delete : i18n.buy}</Text>
          </BYTouchable>
        </View>}
        {isEmptyCart && <View style={styles.empty} >
          <Image style={styles.emptyImg} source={require('../images/ouhrigdfnjsoeijehr.jpg')} />
          <Text style={styles.emptyText} >爱生活，就不要空空荡荡</Text>
        </View>}
      </View>
    );
  }
}
export default connectLocalization(
  connect(state => {
    return {
      user: state.auth.user,
      cart: state.cart,
      allSelected: state.cart.allSelected,
      allSelectedDel: state.cart.allSelectedDel,
      isEdit: state.cart.isEdit,
      authUserToken: state.auth.user.result,
    };
  }, {
    ...cartActionCreators
  })(Cart)
);