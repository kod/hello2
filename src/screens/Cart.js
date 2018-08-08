import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BORDER_COLOR, RED_COLOR, PRIMARY_COLOR } from '../styles/variables';

import { WINDOW_WIDTH, SCREENS, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';
import { getCartTotalMoney } from '../common/selectors';
import * as cartActionCreators from '../common/actions/cart';
import priceFormat from '../common/helpers/priceFormat';

import Loader from '../components/Loader';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import BYTextInput from '../components/BYTextInput';
import { connectLocalization } from '../components/Localization';

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
    borderTopColor: BORDER_COLOR,
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
});

class Cart extends React.Component {
  componentDidMount() {
    const { cartRequest, isAuthUser } = this.props;
    isAuthUser && cartRequest();
  }

  componentWillMount() {
    const {
      cartClear
    } = this.props;

    cartClear();
  }
  
  renderHeaderRight = () => {
    const { isEdit, i18n, cartEditRequest, cartEditInitRequest } = this.props;

    const onPressHandle = () => {
      cartEditRequest();
      if (isEdit) cartEditInitRequest();
    }
    
    return (
      <BYTouchable style={styles.headerRight} onPress={() => onPressHandle()} >
        <Text style={styles.headerRightText} >{ isEdit ? i18n.save: i18n.edit }</Text>
      </BYTouchable>
    );
  };

  onPressSelectAllHandle = () => {
    const {
      isEdit,
      cartSelectAllRequest,
      cartSelectDelAllRequest,
      cart: { items },
    } = this.props;
    if (items.length < 2) return false;
    if (isEdit === false) {
      cartSelectAllRequest();
    } else {
      // delete
      cartSelectDelAllRequest();
    }
  }

  onPressSubmitHandle = () => {
    const {
      isEdit,
      cart,
      cartDeleteRequest,
      i18n,
      navigation: { navigate },
    } = this.props;

    const getSelectedDelId = (cart) => {
      const { items, products, details } = cart;
      let result = [];
      items.forEach((value, index, arr) => {
        if (products[value].selectedDel) result.push(value);
      });
      return result.join(',');
    }
    
    const getSelectedId = (cart) => {
      const { items, products, details } = cart;
      let result = [];
      items.forEach((value, index, arr) => {
        if (products[value].selected) result.push(value);
      });
      return result.join(',');
    }
    
    const submit = (cart) => {
      const { items, products, details } = cart;
      let adverstInfo = [], productsCart = []

      for (let index = 0; index < items.length; index++) {
        const val = items[index];

        if (products[val].selected) {
          productsCart.push({
            id: products[val].detail,
            amount: products[val].quantity * details[products[val].detail].price
          })

          adverstInfo.push({
            cartitemid: val,
            productid: products[val].itemId,
            brandId: details[products[val].detail].brandId,
            propertiesIds: '',
            imageUrl: details[products[val].detail].iconUrl,
            name: details[products[val].detail].name,
            price: details[products[val].detail].price,
            number: products[val].quantity,
          })
        }
      }
      
      // const productsCart = items.map(val => {
      //   return {
      //     id: products[val].id,
      //     amount: products[val].quantity * details[products[val].detail].price
      //   }
      // })

      // const adverstInfo = items.map(val => {
      //   return {
      //     brandId: details[products[val].detail].brandId,
      //     propertiesIds: '',
      //     imageUrl: details[products[val].detail].iconUrl,
      //     name: details[products[val].detail].name,
      //     price: details[products[val].detail].price,
      //     number: products[val].quantity,
      //   }
      // })

      return {
        products: productsCart,
        adverstInfo,
      }
    }
    
    
    if (isEdit === false) {
      // submit
      const selectedIdStr = getSelectedId(cart);
      if (!selectedIdStr) return false;

      navigate(SCREENS.OrderWrite, {
        ...submit(cart),
        isCart: true,
      });
  
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
               cartDeleteRequest(selectedDelIdStr);
            }
          }
        ]
      )
    }
  }

  render() {
    const {
      cart,
      loading,
      allSelected,
      allSelectedDel,
      i18n,
      isEdit,
      navigation,
      totalMoney,
    } = this.props;
    const isEmptyCart = cart.items.length === 0 ? true : false;
    return (
      <View style={styles.container}>
        {loading && <Loader absolutePosition />}
        {
          !isEmptyCart && 
          <BYHeader 
            showBackButton={false}
            headerRight={this.renderHeaderRight()}
          />
        }
        {
          !isEmptyCart && 
          <ScrollView>
            <CartItem
              data={cart}
              navigation={navigation}
              styleItem={{marginBottom: 25, borderTopColor: BORDER_COLOR, borderTopWidth: 1,}}
              styleItemLeft={{paddingLeft: 0, paddingTop: 15, paddingBottom: 15,}}
            />
          </ScrollView>
        }
        {
          !isEmptyCart && 
          <View style={styles.overview} >
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
            <Text style={styles.overviewPrice} >{!isEdit && (priceFormat(totalMoney) + ' VND')}</Text>
            <BYTouchable style={styles.overviewSubmit} onPress={() => this.onPressSubmitHandle()} >
              <Text style={[styles.overviewSubmitText, isEdit && styles.overviewSubmitTextDel]} >{isEdit ? i18n.delete : i18n.buy}</Text>
            </BYTouchable>
          </View>
        }
        {
          !loading && isEmptyCart && <EmptyState source={require('../images/ouhrigdfnjsoeijehr.jpg')} text={'爱生活，就不要空空荡荡'} styleText={{marginBottom: 0}} />
        }
      </View>
    );
  }
}
export default connectLocalization(
  connect(
  () => {
    return (state, props) => {
      const {
        auth,
        cart,
      } = state;

      return {
        cart,
        totalMoney: getCartTotalMoney(state, props),
        isAuthUser: !!auth.user,
        loading: cart.loading,
        allSelected: cart.allSelected,
        allSelectedDel: cart.allSelectedDel,
        isEdit: cart.isEdit,
      };
    }
  },
  {
    ...cartActionCreators
  })(Cart)
);