import React from 'react';
import { Text, View, ScrollView, StyleSheet, Modal, Platform, ToastAndroid, } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PRIMARY_COLOR, BORDER_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';

import BYHeader from '../components/BYHeader';
import BYTextInput from '../components/BYTextInput';
import InputRight from '../components/InputRight';
import CustomIcon from '../components/CustomIcon';
import BYBottomSheet from '../components/BYBottomSheet';
import BYModal from '../components/BYModal';
import BYTouchable from '../components/BYTouchable';
import BYButton from '../components/BYButton';

import { SCREENS } from '../common/constants';
import PXTouchable from '../components/BYTouchable';

import * as cityInfosActionCreators from '../common/actions/cityInfos';
import * as addressActionCreators from '../common/actions/address';
import Loader from '../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // backgroundColor: '#40A6FF',
    backgroundColor: PRIMARY_COLOR,
  },
  submitActive: {
    // backgroundColor: PRIMARY_COLOR,
  },
});

class AddressInput extends React.Component {
  render() {
    const {
      // input,
      input,
      ...restProps
    } = this.props;
    return (
      <BYTextInput
        onChangeText={input.onChange}
        value={input.value}
        {...restProps}
      />
    )
  }
}

class AddressAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaAddressStr: '',
      isOpenMenuBottomSheet: false,
      addressIndex: 0,
      division2nd: {},
      division3rd: {},
      division4th: {},
      division2ndID: null,
      division3rdID: null,
      division4thID: null,
      division2ndCityList: [],
      division3rdCityList: [],
      division4thCityList: [],
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.handleOnPressToggleMenuBottomSheet();
    // }, 300);
    // 
    this.props.initialize({ address: 'your name' });
  }
  
  handleOnPressToggleMenuBottomSheet = () => {
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
      isOpenMenuBottomSheet: !isOpenMenuBottomSheet,
    });
  };

  handleOnPressCitySelect(val, key) {
    let item;

    const {
      division2nd,
      division3rd,
      division4th,
    } = this.state;
    
    const {
      cityInfosFetch,
    } = this.props;

    switch (key) {
      case 0:
        item = {
          addressIndex: 1,
          division2nd: val,
          division3rd: {},
          division4th: {},
          division2ndID: null,
          division3rdID: null,
          division4thID: null,
          areaAddressStr: '',
        }
        cityInfosFetch(val.id, 'division3rd');
        break;
    
      case 1:
        item = {
          addressIndex: 2,
          division3rd: val, 
          division4th: {},
          division2ndID: null,
          division3rdID: null,
          division4thID: null,
          areaAddressStr: '',
        }
        cityInfosFetch(val.id, 'division4th');
      break;

      case 2:
        item = {
          addressIndex: 2,
          division4th: val,
          division2ndID: division2nd.id,
          division3rdID: division3rd.id,
          division4thID: val.id,    
          areaAddressStr: `${val.name}, ${division3rd.name}, ${division2nd.name}`,
        }
        this.handleOnPressToggleMenuBottomSheet();
        break;
    }
    this.setState(item);
  }

  handleOnPressSubmit() {
    const {
      division2ndID,
      division3rdID,
      division4thID,
    } = this.state;
    
    const {
      addressAddFetch,
      addressAddInfo: { values },
    } = this.props;

    if (!values) {
      if (Platform.OS === 'android') ToastAndroid.show('place entry name', ToastAndroid.SHORT);
      return false;
    }

    const {
      name = '',
      phone = '',
      address = '',
    } = values;

    if (name.length === 0) {
      if (Platform.OS === 'android') ToastAndroid.show('place entry name', ToastAndroid.SHORT);
      return false;
    }

    if (phone.length === 0) {
      if (Platform.OS === 'android') ToastAndroid.show('place entry phone', ToastAndroid.SHORT);
      return false;
    }

    if (!this.state.areaAddressStr) {
      if (Platform.OS === 'android') ToastAndroid.show('place entry area', ToastAndroid.SHORT);
    }

    if (address.length === 0) {
      if (Platform.OS === 'android') ToastAndroid.show('place entry address', ToastAndroid.SHORT);
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

  renderBottomSheet() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
      },
      closeWrap: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 45,
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      close: {
        fontSize: 24,
        color: '#666',
      },
      nav: {
        flexDirection: 'row',
        paddingLeft: SIDEINTERVAL,
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
      },
      navItem: {
        height: 45,
        lineHeight: 45,
        textAlign: 'center',
        color: '#666',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        marginRight: SIDEINTERVAL * 2,
      },
      navActive: {
        color: PRIMARY_COLOR,
        borderBottomColor: PRIMARY_COLOR,
      },
      scrollView: {
        height: WINDOW_HEIGHT * 0.6,
        display: 'none',
      },
      ScrollViewShow: {
        display: 'flex',
      },
      scrollViewItem: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      scrollViewActive: {
        color: PRIMARY_COLOR,
      },
      scrollViewWrap: {
        position: 'relative',
      },
    });

    const renderScrollView = (item, scrollViewKey) => {
      const {
        addressIndex,
        division2nd,
        division3rd,
        division4th,  
      } = this.state;

      const divisionObject = scrollViewKey => {
        switch (scrollViewKey) {
          case 0:
            return division2nd;
          case 1:
            return division3rd;
          case 2:
            return division4th;
        }
      }

      return (
        <ScrollView style={[styles.scrollView, addressIndex === scrollViewKey && styles.ScrollViewShow]} key={scrollViewKey}>
          {item.map((val, key) => 
            <BYTouchable style={styles.scrollViewItem} key={key} onPress={() => this.handleOnPressCitySelect(val, scrollViewKey)}>
              <Text style={[styles.scrollViewItemText, divisionObject(scrollViewKey).id === val.id && styles.scrollViewActive]}>{val.name}</Text>
              <Ionicons style={[styles.scrollViewItemIcon, divisionObject(scrollViewKey).id === val.id && styles.scrollViewActive]} name={'ios-radio-button-on-outline'} />
            </BYTouchable>
          )}
        </ScrollView>
      )
    }

    const {
      addressIndex,
      division2nd,
      division3rd,
      division4th,
    } = this.state;

    const {
      loading,
      division2ndItems,
      division3rdItems,
      division4thItems,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.closeWrap}>
          <EvilIcons style={styles.close} name="close" onPress={() => this.handleOnPressToggleMenuBottomSheet()} />
        </View>
        <ScrollView style={styles.nav} horizontal={true} showsHorizontalScrollIndicator={false}>
          <Text
            style={[styles.navItem, addressIndex === 0 && styles.navActive]} 
            onPress={() => this.setState({addressIndex: 0})}
          >
            {division2nd.name || 'Tỉnh/Thành'}
          </Text>
          {
            division2nd.id &&
            <Text 
              style={[styles.navItem, addressIndex === 1 && styles.navActive]} 
              onPress={() => this.setState({addressIndex: 1})}
            >
              {division3rd.name || 'Quận/huyện'}
            </Text>
          }
          {
            division3rd.id &&
            <Text 
              style={[styles.navItem, addressIndex === 2 && styles.navActive]} 
              onPress={() => this.setState({addressIndex: 2})}
            >
              {division4th.name || 'Phường, xã'}
            </Text>            
          }
        </ScrollView>
        <View style={styles.scrollViewWrap}>
          {[division2ndItems, division3rdItems, division4thItems].map((val, key) => 
            renderScrollView(val, key)
          )}
          {loading && <Loader absolutePosition />}
        </View>
      </View>
    )
  }

  render() {
    const {
      areaAddressStr,
      isOpenMenuBottomSheet,
    } = this.state;

    const {
      // navigation: { goBack, navigate }
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.item}>
            <Text style={styles.title}>Name</Text>
            <Field
              name="name"
              component={AddressInput}
              style={styles.textInput}
              placeholder="please enter your name"
              placeholderTextColor="#ccc"
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Phone number</Text>
            <Field
              name="phone"
              component={AddressInput}
              style={styles.textInput}
              placeholder={'please enter your phone number'}
              placeholderTextColor="#ccc"
              keyboardType={'phone-pad'}
            />
          </View>
          <PXTouchable style={styles.item} onPress={() => this.handleOnPressToggleMenuBottomSheet()}>
            <Text style={styles.title}>Xã/Huyện/Thành</Text>
            <BYTextInput
              placeholder={'please select'}
              placeholderTextColor="#ccc"
              style={styles.address}
              value={areaAddressStr}
              editable={false}
            />
            <CustomIcon style={styles.arrow} name="arrowright" />
          </PXTouchable>
          <View style={styles.item}>
            <Text style={styles.title}>Address</Text>
            <Field
              name="address"
              component={AddressInput}
              style={styles.textInput}
              placeholder={'please enter your address'}
              placeholderTextColor="#ccc"
              defaultValue={'123'}
            />
          </View>
          <BYButton styleWrap={styles.submitWrap} styleText={styles.submit} text={'Save'} onPress={() => this.handleOnPressSubmit()}></BYButton>
        </ScrollView>
        <BYModal
          visible={isOpenMenuBottomSheet}
          onRequestClose={this.handleOnPressToggleMenuBottomSheet}
        >
          {this.renderBottomSheet()}
        </BYModal>
      </View>
    );
  }
}

AddressAdd = reduxForm({
  form: 'AddressAdd',
  // validate,
})(AddressAdd);

export default connect(
  state => {
    const {
      cityInfos,
      form,
    } = state;
    return {
      addressAddInfo: form.AddressAdd ? form.AddressAdd : {},
      loading: cityInfos.loading,
      division2ndItems: cityInfos.division2nd,
      division3rdItems: cityInfos.division3rd,
      division4thItems: cityInfos.division4th,
    }
  },
  {
    ...cityInfosActionCreators,
    ...addressActionCreators,
  }
)(AddressAdd);
