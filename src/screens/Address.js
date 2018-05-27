import React from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import BYTouchable from "../components/BYTouchable";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

import { SIDEINTERVAL, WINDOW_WIDTH, RED_COLOR, PRIMARY_COLOR } from "../styles/variables";

import * as addressActionCreators from '../common/actions/address';
import * as authActionCreators from '../common/actions/auth';

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
    borderBottomColor: '#f5f5f5',
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
    color: PRIMARY_COLOR
  },
})

class Address extends React.Component {
  componentDidMount() {
    const {
      authUser,
      addressFetch,
    } = this.props;
    console.log(authUser);
    if (authUser) {
      addressFetch();
    }
  }

  edit_address = function(item) {
    return item.address + (item.division4thName ? ', ' : '') + item.division4thName + (item.division3rdName ? ', ' : '') + item.division3rdName + (item.division2ndName ? ', ' : '') + item.division2ndName
  }

  handleOnPressAddressDefault(item) {
    const {
      addressModifyFetch,
    } = this.props;
    console.log(item);
    if (item.isdefault === 'Y') return false;
    addressModifyFetch(item);
  }
  
  renderMainContent() {
    const {
      i18n,
      items,
      loading,
      refreshing,
    } = this.props;

    if (loading && !refreshing) {
      return <Loader />;
    }
    return (
      <View style={styles.container} >
        {
          items.length === 0 
          ?
          <EmptyState source={require('../images/afiasifsdhfs.png')} text={i18n.pleaseAddYourShippingAddress} />
          :
          <ScrollView style={styles.container} >
            {items.map((val, key) => 
              <View style={styles.item} key={key} >
                <View style={styles.main} >
                  <View style={styles.namePhone} >
                    <Text style={styles.name} >{val.username}</Text>
                    <Text style={styles.phone} >{val.msisdn}</Text>
                  </View>
                  <Text style={styles.address} >{this.edit_address(val)}</Text>
                  <View style={styles.operate} >
                    <BYTouchable style={styles.operateLeft} backgroundColor={'transparent'} onPress={() => this.handleOnPressAddressDefault(val)} >
                      <Ionicons style={[styles.selectIcon, val.isdefault === 'Y' && styles.selected]} name={'ios-radio-button-on-outline'} />
                      <Text style={[styles.selectText, val.isdefault === 'Y' && styles.selected]} >{i18n.defaultAddress}</Text>
                    </BYTouchable>
                    <View style={styles.operateRight} >
                      <Ionicons style={styles.editIcon} name={'ios-create-outline'} />
                      <Ionicons style={styles.trashIcon} name={'ios-trash-outline'} />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        }
        <Text style={styles.add} >add address</Text>

      </View>
    )
  }

  render() {
    const {
      // navigation: { navigate },
    } = this.props;

    return (
      <View style={styles.container} >
        <BYHeader />
        {this.renderMainContent()}
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  const { address, } = state;
  return {
    authUser: !!state.auth.user,
    items: address.items,
    loading: address.loading,
    refreshing: address.refreshing,
  };
}

export default connectLocalization(
  connect(mapStateToProps, { ...addressActionCreators, ...authActionCreators })(Address)
);
