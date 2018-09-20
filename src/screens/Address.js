/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';

import { BORDER_COLOR, PRIMARY_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  // WINDOW_HEIGHT,
  SIDEINTERVAL,
  SCREENS,
} from '../common/constants';

import * as addressActionCreators from '../common/actions/address';
import * as authActionCreators from '../common/actions/auth';

const afiasifsdhfsPng = require('../images/afiasifsdhfs.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  add: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: PRIMARY_COLOR,
    color: '#fff',
  },
  item: {
    paddingLeft: SIDEINTERVAL,
  },
  main: {
    marginTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  namePhone: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  name: {
    color: '#333',
    marginRight: 15,
    fontWeight: '700',
  },
  phone: {
    color: '#333',
    fontWeight: '700',
  },
  address: {
    color: '#999',
    paddingRight: SIDEINTERVAL,
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 14 + 14 * 0.618,
  },
  operate: {
    flexDirection: 'row',
  },
  operateLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  selectIcon: {
    fontSize: 18,
    color: '#666',
    marginRight: WINDOW_WIDTH * 0.02,
    paddingTop: 1,
  },
  selectText: {
    color: '#666',
  },
  operateRight: {
    flexDirection: 'row',
    paddingRight: SIDEINTERVAL,
  },
  editIcon: {
    fontSize: 24,
    color: '#666',
    paddingLeft: WINDOW_WIDTH * 0.02,
    paddingRight: WINDOW_WIDTH * 0.02,
  },
  trashIcon: {
    fontSize: 24,
    color: '#666',
    paddingLeft: WINDOW_WIDTH * 0.02,
    paddingRight: WINDOW_WIDTH * 0.02,
  },
  selected: {
    color: PRIMARY_COLOR,
  },
});

class Address extends Component {
  componentDidMount() {
    const {
      isAuthUser,
      addressFetch,
      // items,
      navigation,
      // items,
    } = this.props;
    this.didFocusSubscription = navigation.addListener('didFocus', () => {
      // this.setState({
      //   isFocus: true,
      // });
      if (isAuthUser) {
        addressFetch();
      }
    });
  }

  editAddress = item =>
    item.address +
    (item.division4thName ? ', ' : '') +
    item.division4thName +
    (item.division3rdName ? ', ' : '') +
    item.division3rdName +
    (item.division2ndName ? ', ' : '') +
    item.division2ndName;

  handleOnPressAddressDefault(item) {
    const {
      addressModifyFetch,
      // addressModifyFetch,
    } = this.props;
    if (item.isdefault === 'Y') return false;
    item.isdefault = 'Y';
    return addressModifyFetch(item);
  }

  handleOnPressAddressDel(id) {
    const {
      i18n,
      addressRemoveFetch,
      // addressRemoveFetch,
    } = this.props;
    Alert.alert('', `${i18n.confirmDelete}?`, [
      {
        text: i18n.cancel,
      },
      {
        text: i18n.delete,
        onPress: () => {
          addressRemoveFetch(id);
        },
      },
    ]);
  }

  handleOnPressItem(item) {
    const {
      addressSelectFetch,
      navigation: { goBack, state },
    } = this.props;
    const isSelect = state.params ? state.params.isSelect : false;
    if (isSelect) {
      addressSelectFetch(item.id);
      goBack();
    }
  }

  renderMainContent() {
    const {
      i18n,
      items,
      loading,
      loaded,
      refreshing,
      navigation: { navigate, state },
    } = this.props;

    const isSelect = state.params ? state.params.isSelect : false;

    // if (loading && !refreshing) {
    //   return <Loader />;
    // }

    return (
      <View style={styles.container}>
        {loaded === true && items.length === 0 ? (
          <EmptyState
            source={afiasifsdhfsPng}
            text={i18n.pleaseAddYourShippingAddress}
          />
        ) : (
          <ScrollView style={styles.container}>
            {loading && !refreshing && <Loader absolutePosition />}
            {items.map((val, key) => (
              <BYTouchable
                style={styles.item}
                key={key}
                onPress={() => this.handleOnPressItem(val)}
              >
                <View style={styles.main}>
                  <View style={styles.namePhone}>
                    <Text style={styles.name}>{val.username}</Text>
                    <Text style={styles.phone}>{val.msisdn}</Text>
                  </View>
                  <Text style={styles.address}>{this.editAddress(val)}</Text>
                  {!isSelect && (
                    <View style={styles.operate}>
                      <BYTouchable
                        style={styles.operateLeft}
                        backgroundColor="transparent"
                        onPress={() => this.handleOnPressAddressDefault(val)}
                      >
                        <Ionicons
                          name="ios-radio-button-on-outline"
                          style={[
                            styles.selectIcon,
                            val.isdefault === 'Y' && styles.selected,
                          ]}
                        />
                        <Text
                          style={[
                            styles.selectText,
                            val.isdefault === 'Y' && styles.selected,
                          ]}
                        >
                          {i18n.defaultAddress}
                        </Text>
                      </BYTouchable>
                      <View style={styles.operateRight}>
                        <Ionicons
                          style={styles.editIcon}
                          name="ios-create-outline"
                          onPress={() =>
                            navigate(SCREENS.AddressAdd, {
                              id: val.id,
                              msisdn: val.msisdn,
                              address: val.address,
                              username: val.username,
                              isdefault: val.isdefault,
                              division2nd: val.division2nd,
                              division3rd: val.division3rd,
                              division4th: val.division4th,
                              division2ndName: val.division2ndName,
                              division3rdName: val.division3rdName,
                              division4thName: val.division4thName,
                            })
                          }
                        />
                        <Ionicons
                          style={styles.trashIcon}
                          name="ios-trash-outline"
                          onPress={() => this.handleOnPressAddressDel(val.id)}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </BYTouchable>
            ))}
          </ScrollView>
        )}
        <Text style={styles.add} onPress={() => navigate(SCREENS.AddressAdd)}>
          {i18n.addAddress}
        </Text>
      </View>
    );
  }

  render() {
    // const {
    //   // navigation: { navigate },
    // } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        {this.renderMainContent()}
      </View>
    );
  }
}

export default withNavigation(
  connectLocalization(
    connect(
      () => state => {
        const {
          address,
          // address,
        } = state;

        // const {

        // } = props;

        return {
          isAuthUser: !!state.login.user,
          items: address.items,
          loading: address.loading,
          loaded: address.loaded,
          refreshing: address.refreshing,
        };
      },
      {
        ...addressActionCreators,
        ...authActionCreators,
      },
    )(Address),
  ),
);
