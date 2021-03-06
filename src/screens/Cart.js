import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BORDER_COLOR, RED_COLOR, PRIMARY_COLOR } from '../styles/variables';

import {
  WINDOW_WIDTH,
  SCREENS,
  SIDEINTERVAL,
  APPBAR_HEIGHT,
  MONETARY,
} from '../common/constants';
import { getCartTotalMoney } from '../common/selectors';
import * as cartActionCreators from '../common/actions/cart';
import priceFormat from '../common/helpers/priceFormat';

import Loader from '../components/Loader';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import { connectLocalization } from '../components/Localization';

const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

class Cart extends Component {
  componentDidMount() {
    const { cartRequest, isAuthUser } = this.props;
    if (isAuthUser) cartRequest();
  }

  componentWillMount() {
    const { cartClear } = this.props;
    cartClear();
  }

  renderHeaderRight = () => {
    const stylesX = StyleSheet.create({
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
    });

    const {
      isEdit,
      i18n,
      cartEditRequest,
      cartEditInitRequest,
      cart: { items },
    } = this.props;

    const onPressHandle = () => {
      cartEditRequest();
      if (items.length !== 1 && isEdit) cartEditInitRequest();
    };

    return (
      <BYTouchable style={stylesX.headerRight} onPress={() => onPressHandle()}>
        <Text style={stylesX.headerRightText}>
          {isEdit ? i18n.save : i18n.edit}
        </Text>
      </BYTouchable>
    );
  };

  renderHeaderTitle = () => {
    const { cart } = this.props;
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: cart.items.length === 0 ? 0 : 20,
        paddingRight: cart.items.length === 0 ? 25 : 0,
        flexDirection: 'row',
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    });

    const { i18n } = this.props;

    return (
      <View style={stylesX.container}>
        <Text style={stylesX.title}>{i18n.cart}</Text>
      </View>
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
    return true;
  };

  onPressSubmitHandle = () => {
    const {
      isEdit,
      cart,
      cartDeleteRequest,
      i18n,
      navigation: { navigate },
    } = this.props;

    const getSelectedDelId = () => {
      const { items, products /* , details */ } = cart;
      const result = [];
      items.forEach(value => {
        if (products[value].selectedDel) result.push(value);
      });
      return result.join(',');
    };

    const getSelectedId = () => {
      const { items, products } = cart;
      const result = [];
      items.forEach(value => {
        if (products[value].selected) result.push(value);
      });
      return result.join(',');
    };

    const submit = () => {
      const { items, products, details } = cart;
      const productsCart = [];
      const adverstInfo = [];

      for (let index = 0; index < items.length; index += 1) {
        const val = items[index];

        if (products[val].selected) {
          productsCart.push({
            id: products[val].detail,
            amount:
              products[val].quantity * details[products[val].detail].price,
          });

          adverstInfo.push({
            cartitemid: val,
            productid: products[val].itemId,
            brandId: details[products[val].detail].brandId,
            propertiesIds: '',
            imageUrl: details[products[val].detail].iconUrl,
            name: details[products[val].detail].name,
            price: details[products[val].detail].price,
            number: products[val].quantity,
          });
        }
      }

      return {
        products: productsCart,
        adverstInfo,
      };
    };

    if (isEdit === false) {
      // submit
      const selectedIdStr = getSelectedId();
      if (!selectedIdStr) return false;

      navigate(SCREENS.OrderWrite, {
        ...submit(cart),
        isCart: true,
      });
    } else {
      // delete
      const selectedDelIdStr = getSelectedDelId();
      if (!selectedDelIdStr) return false;
      Alert.alert('', i18n.confirmDelete, [
        {
          text: i18n.cancel,
        },
        {
          text: i18n.delete,
          onPress: () => {
            cartDeleteRequest(selectedDelIdStr);
          },
        },
      ]);
    }
    return true;
  };

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
    const isEmptyCart = cart.items.length === 0;
    return (
      <View style={styles.container}>
        {loading && <Loader absolutePosition />}
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={!isEmptyCart && this.renderHeaderRight()}
        />
        {!isEmptyCart && (
          <ScrollView>
            <CartItem
              data={cart}
              navigation={navigation}
              styleItem={{
                marginBottom: 25,
                borderTopColor: BORDER_COLOR,
                borderTopWidth: 1,
              }}
              styleItemLeft={{
                paddingLeft: 0,
                paddingTop: 15,
                paddingBottom: 15,
              }}
            />
          </ScrollView>
        )}
        {!isEmptyCart && (
          <View style={styles.overview}>
            <BYTouchable
              style={styles.overviewSelectAll}
              onPress={() => this.onPressSelectAllHandle()}
            >
              <View style={styles.overviewIconWrap}>
                {isEdit ? (
                  <Ionicons
                    name={
                      allSelectedDel
                        ? 'ios-radio-button-on-outline'
                        : 'ios-radio-button-off-outline'
                    }
                    style={[
                      styles.overviewIcon,
                      allSelectedDel && styles.overviewIconSelectedDel,
                    ]}
                  />
                ) : (
                  <Ionicons
                    name={
                      allSelected
                        ? 'ios-radio-button-on-outline'
                        : 'ios-radio-button-off-outline'
                    }
                    style={[
                      styles.overviewIcon,
                      allSelected && styles.overviewIconSelected,
                    ]}
                  />
                )}
              </View>
              <Text style={styles.overviewSelect}>{i18n.selectAll}</Text>
            </BYTouchable>
            <Text style={styles.overviewPrice}>
              {!isEdit && `${priceFormat(totalMoney)} ${MONETARY}`}
            </Text>
            <BYTouchable
              style={styles.overviewSubmit}
              onPress={() => this.onPressSubmitHandle()}
            >
              <Text
                style={[
                  styles.overviewSubmitText,
                  isEdit && styles.overviewSubmitTextDel,
                ]}
              >
                {isEdit ? i18n.delete : i18n.buy}
              </Text>
            </BYTouchable>
          </View>
        )}
        {!loading &&
          isEmptyCart && (
            <EmptyState
              source={ouhrigdfnjsoeijehrJpg}
              text={i18n.noData}
              styleText={{ marginBottom: 0 }}
            />
          )}
      </View>
    );
  }
}
export default connectLocalization(
  connect(
    (state, props) => {
      const { login, cart } = state;

      return {
        cart,
        totalMoney: getCartTotalMoney(state, props),
        isAuthUser: !!login.user,
        loading: cart.loading,
        allSelected: cart.allSelected,
        allSelectedDel: cart.allSelectedDel,
        isEdit: cart.isEdit,
      };
    },
    {
      ...cartActionCreators,
    },
  )(Cart),
);
