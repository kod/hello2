import React from 'react';
import { Text, View, ScrollView, StyleSheet, Platform, ToastAndroid, } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { PRIMARY_COLOR, BORDER_COLOR } from "../styles/variables";
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, MODAL_TYPES } from "../common/constants";

import BYHeader from '../components/BYHeader';
import BYTextInput from "../components/BYTextInput";
import FieldInput from "../components/FieldInput";
import CustomIcon from "../components/CustomIcon";
import BYModal from "../components/BYModal";
import BYButton from "../components/BYButton";

import PXTouchable from '../components/BYTouchable';
import AddressAddModal from "../containers/AddressAddModal";

import * as cityInfosActionCreators from '../common/actions/cityInfos';
import * as addressActionCreators from '../common/actions/address';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  title: {
    height: 45,
    lineHeight: 45,
    color: '#666',
    paddingRight: SIDEINTERVAL / 2,
  },
  textInput: {
    flex: 1,
    color: '#333',
    textAlign: 'right',
  },
  address: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 5,
    color: '#333',
  },
  arrow: {
    fontSize: 10,
    color: '#ccc',
    paddingTop: 1,
  },
  submitWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: WINDOW_HEIGHT * 0.1,
  },
  submit: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
  },
  submitActive: {
    // backgroundColor: PRIMARY_COLOR,
  },
});

class AddressAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenuBottomSheet: false,
      division2ndID: null,
      division3rdID: null,
      division4thID: null,
      division2ndName: null,
      division3rdName: null,
      division4thName: null,
    }
  }

  componentDidMount() {
    const {
      initialize,
      navigation: { state: { params } },
    } = this.props;
    
    if (params) {
      initialize({
        name: params.username,
        phone: params.msisdn,
        address: params.address,
      });
    }
  }

  callbackToggleMenuBottomSheet(ret) {
    console.log(ret);
    // this.setState(ret);
  }

  handleOnPressToggleMenuBottomSheet = (type) => {
    const {
      isOpenMenuBottomSheet,
    } = this.state;

    const {
      cityInfosFetch,
      division2ndItems,
    } = this.props;

    if (!isOpenMenuBottomSheet && division2ndItems.length === 0) {
      cityInfosFetch(1, 'division2nd');
    }
    
    this.setState({
      isOpenMenuBottomSheet: typeof type !== 'boolean' ? !isOpenMenuBottomSheet : type,
    });
  };

  handleOnPressSubmit() {
    const {
      division2ndID,
      division3rdID,
      division4thID,
    } = this.state;
    
    const {
      navigation: { state: { params } },
      addressAddFetch,
      addressModifyFetch,
      addressAddInfo: { values },
    } = this.props;
    // return false;

    if (!values) {
      Platform.OS === 'android' && ToastAndroid.show('place entry name', ToastAndroid.SHORT)
      return false;
    }

    const {
      name = '',
      phone = '',
      address = '',
    } = values;

    if (name.length === 0) {
      Platform.OS === 'android' && ToastAndroid.show('place entry name', ToastAndroid.SHORT)
      return false;
    }

    if (phone.length === 0) {
      Platform.OS === 'android' && ToastAndroid.show('place entry phone', ToastAndroid.SHORT)
      return false;
    }

    if (!division4thID) {
      Platform.OS === 'android' && ToastAndroid.show('place entry area', ToastAndroid.SHORT)
    }

    if (address.length === 0) {
      Platform.OS === 'android' && ToastAndroid.show('place entry address', ToastAndroid.SHORT)
      return false;
    }

    if(params) {
      addressModifyFetch({
        id: params.id,
        msisdn: phone,
        address: address,
        isdefault: params.isdefault,
        username: name,
        division2nd: division2ndID,
        division3rd: division3rdID,
        division4th: division4thID,
      });
      return false;
    } 

    addressAddFetch({
      msisdn: phone,
      address: address,
      isdefault: 'Y',
      username: name,
      division2nd: division2ndID,
      division3rd: division3rdID,
      division4th: division4thID,
    }); 
  }

  render() {
    const {
      division2ndName,
      division3rdName,
      division4thName,
      isOpenMenuBottomSheet,
    } = this.state;

    const {
      // navigation: { goBack, navigate },
      openModal,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <View style={styles.item} >
            <Text style={styles.title} >Name</Text>
            <Field
              name="name"
              component={FieldInput}
              style={styles.textInput}
              placeholder={'please enter your name'}
              placeholderTextColor={'#ccc'}
            />
          </View>
          <View style={styles.item} >
            <Text style={styles.title} >Phone number</Text>
            <Field
              name="phone"
              component={FieldInput}
              style={styles.textInput}
              placeholder={'please enter your phone number'}
              placeholderTextColor={'#ccc'}
              keyboardType={'phone-pad'}
            />
          </View>
          <PXTouchable style={styles.item} onPress={() => openModal(MODAL_TYPES.ADDRESSADD, { callback: this.callbackToggleMenuBottomSheet })}>
            <Text style={styles.title} >Xã/Huyện/Thành</Text>
            <BYTextInput 
              placeholder={'please select'}
              placeholderTextColor={'#ccc'}
              style={styles.address}
              value={division4thName ? `${division4thName}, ${division3rdName}, ${division2ndName}` : ''}
              editable={false}
            />
            <CustomIcon style={styles.arrow} name="arrowright"></CustomIcon>
          </PXTouchable>
          <View style={styles.item} >
            <Text style={styles.title} >Address</Text>
            <Field
              name="address"
              component={FieldInput}
              style={styles.textInput}
              placeholder={'please enter your address'}
              placeholderTextColor={'#ccc'}
            />
          </View>
          <BYButton styleWrap={styles.submitWrap} styleText={styles.submit} text={'Save'} onPress={() => this.handleOnPressSubmit()}></BYButton>
        </ScrollView>
        {/* <BYModal
          visible={isOpenMenuBottomSheet}
          onRequestClose={this.handleOnPressToggleMenuBottomSheet}
        >
          <AddressAddModal 
            onRequestClose={this.handleOnPressToggleMenuBottomSheet}
            callback={this.callbackToggleMenuBottomSheet}
          />
        </BYModal> */}
      </View>
    );
  }
}

AddressAdd = reduxForm({
  form: 'AddressAdd',
})(AddressAdd);

export default connect(
  state => {
    const {
      cityInfos,
      form,
    } = state;
    return {
      addressAddInfo: form.AddressAdd ? form.AddressAdd : {},
      division2ndItems: cityInfos.division2nd,
      division3rdItems: cityInfos.division3rd,
      division4thItems: cityInfos.division4th,
    }
  },
  {
    ...cityInfosActionCreators,
    ...addressActionCreators,
    ...modalActionCreators,
  }
)(AddressAdd);
