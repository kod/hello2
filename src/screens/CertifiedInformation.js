import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, ToastAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import CustomIcon from '../components/CustomIcon';
import BYTouchable from '../components/BYTouchable';
import FieldInput from '../components/FieldInput';
import Error from '../components/Error';
import BYTextInput from "../components/BYTextInput";
import BYModal from "../components/BYModal";
import Loader from "../components/Loader";

import { makegetSchoolName } from "../common/selectors";
import { SCREENS } from '../common/constants';

import { SIDEINTERVAL, WINDOW_WIDTH, WINDOW_HEIGHT, APPBAR_HEIGHT, STATUSBAR_HEIGHT } from '../styles/variables';

import * as userAddDetailInfoActionCreators from '../common/actions/userAddDetailInfo';
import * as userCertificateInfoActionCreators from '../common/actions/userCertificateInfo';
import * as certifiedInformationActionCreators from '../common/actions/certifiedInformation';
import * as schoolInfoActionCreators from '../common/actions/schoolInfo';
import * as cardSubmitActionCreators from '../common/actions/cardSubmit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ScrollView: {
    height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT
  },
  item: {
    paddingLeft: SIDEINTERVAL,
    
  },
  main: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingRight: SIDEINTERVAL,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  label: {
    color: '#666',
  },
  input: {
    flex: 1,
    paddingRight: WINDOW_WIDTH * 0.03,
    paddingLeft: WINDOW_WIDTH * 0.03,
    textAlign: 'right',
    color: '#333',
  },
  icon: {
    color: '#ccc',
  },
  value: {
    flex: 1,
    color: '#333',
    textAlign: 'right',
    paddingRight: SIDEINTERVAL,
  },
  submit: {
    marginBottom: 30
  },
});

class CertifiedInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      sexList: [
        {
          key: '1',
          value: 'Nam',
        },
        {
          key: '2',
          value: 'Nữ',
        },
      ],
    };
  }

  componentDidMount() {
    const {
      authUser,
      schoolInfoFetch,
      schoolInfoItems,
      userCertificateInfoFetch,
    } = this.props;
    authUser && userCertificateInfoFetch(authUser);
    schoolInfoItems.length === 0 && schoolInfoFetch();
  }
  
  getSexName() {
    const {
      sexList
    } = this.state;

    const {
      sex
    } = this.props;
    
    for (let index = 0; index < sexList.length; index++) {
      const element = sexList[index];
      if (element.key === sex) return element.value;
    }
  }
  
  handleOnPressToggleModal = (type) => {
    const {
      isOpenModal,
    } = this.state;

    this.setState({
      isOpenModal: typeof type !== 'boolean' ? !isOpenModal : type,
    });
  };

  handleOnPressSubmit() {
    const {
      userAddDetailInfoFetch,
      cardSubmitFetch,
      username,
      sex,
      identification,
      address,
      email,
      collegename,
      collegeaddr,
      department,
      specialty,
      admissiontime,
      graduationtime,
      connectusername1,
      connectusermsisdn1,
      connectuserrelation1,
      connectuseridentification1,
      connectusername2,
      connectusermsisdn2,
      connectuserrelation2,
      connectuseridentification2,
      connectusername3,
      connectusermsisdn3,
      connectuserrelation3,
      connectuseridentification3,
      birthday,
      isCertify,
    } = this.props;

    const tips = (text) => Platform.OS === 'android' && ToastAndroid.show(text, ToastAndroid.SHORT);

    if (isCertify) {
      if (!username.length) return tips('username');
      if (!identification.length) return tips('identification');
      if (!sex.length) return tips('sex');
      if (!birthday.length) return tips('birthday');
      if (!address.length) return tips('address');
      if (
        collegename.length === '' ||
        !collegeaddr.length ||
        !department.length ||
        !specialty.length ||
        !admissiontime.length ||
        !graduationtime.length
      ) return tips('school');
      if (
        !connectusername1.length ||
        !connectusermsisdn1.length ||
        !connectuserrelation1.length ||
        !connectuseridentification1.length
      ) return tips('Người liên lạc 1');
      if (
        !connectusername2.length ||
        !connectusermsisdn2.length ||
        !connectuserrelation2.length
      ) return tips('Người liên lạc 2');
      if (
        !connectusername3.length ||
        !connectusermsisdn3.length ||
        !connectuserrelation3.length
      ) return tips('Người liên lạc 3');
      if (!email.length) return tips('email');
    }

    userAddDetailInfoFetch();
  }

  renderBottomSheet() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
      },
      item: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        height: 50,
        lineHeight: 50,
        color: '#666',
      },
    });
    
    const {
      sexList,
    } = this.state;
    
    const {
      certifiedInformationEdit,
    } = this.props
    
    return (
      <View style={styles.container} >
        {
          sexList.map((val, key) => <Text style={styles.item} key={key} onPress={() => { certifiedInformationEdit(`sex`, val.key); this.handleOnPressToggleModal(); }} >{val.value}</Text>)
        }
      </View>
    )
  }

  renderMainContent() {
    
    const {
      address,
      admissiontime,
      birthday,
      collegeaddr,
      certifiedInformationEdit,
      connectuseridentification1,
      connectuseridentification2,
      connectuseridentification3,
      connectusermsisdn1,
      connectusermsisdn2,
      connectusermsisdn3,
      connectusername1,
      connectusername2,
      connectusername3,
      connectuserrelation1,
      connectuserrelation2,
      connectuserrelation3,
      department,
      email,
      graduationtime,
      identification,
      navigation: { goBack, navigate },
      schoolName,
      specialty,
      sex,
      username,
      loading,
      addLoading,
      cardSubmitLoading,
    } = this.props;

    if (loading) {
      return <Loader />;
    }
    
    return (
      <ScrollView keyboardShouldPersistTaps={'always'} >
        <KeyboardAvoidingView behavior={'padding'} >
          {(addLoading || cardSubmitLoading) && <Loader absolutePosition />}
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >Name</Text>
              <BYTextInput 
                style={styles.input}
                placeholder={'please enter your name'}
                placeholderTextColor={'#ccc'}
                onChangeText={(val) => certifiedInformationEdit('username', val)}
                value={username}
              />
            </View>
          </View>
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >ID number</Text>
              <BYTextInput 
                style={styles.input}
                placeholder={'please enter your ID'}
                placeholderTextColor={'#ccc'}
                onChangeText={(val) => certifiedInformationEdit('identification', val)}
                value={identification}
                keyboardType={'numeric'}
              />
            </View>
          </View>
          <BYTouchable style={styles.item} onPress={() => this.handleOnPressToggleModal()} >
            <View style={styles.main} >
              <Text style={styles.label} >Gender</Text>
              <Text style={styles.value} >{this.getSexName()}</Text>
              <MaterialIcons style={{fontSize: 24}} name={'arrow-drop-down'} ></MaterialIcons>
            </View>
          </BYTouchable>
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >Birthday</Text>
              <DatePicker
                showIcon={false}
                style={{flex: 1}}
                date={birthday}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {},
                  dateInput: {
                    alignItems: 'flex-end',
                    paddingRight: WINDOW_WIDTH * 0.02,
                    borderWidth: 0,
                  },
                  dateText: {
                    textAlign: 'left',
                    fontSize: 16,
                  },
                }}
                onDateChange={val => certifiedInformationEdit('birthday', val)}
              />
              <MaterialIcons style={{fontSize: 24}} name={'arrow-drop-down'} ></MaterialIcons>
            </View>
          </View>
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >Home address</Text>
              <BYTextInput 
                style={styles.input}
                placeholder={'please enter your Home address'}
                placeholderTextColor={'#ccc'}
                onChangeText={(val) => certifiedInformationEdit('address', val)}
                value={address}
              />
            </View>
          </View>
          <BYTouchable style={styles.item} backgroundColor={'transparent'} onPress={() => navigate(SCREENS.CertifiedInformationSchool)} >
            <View style={styles.main} >
              <Text style={styles.label} >School</Text>
              <Text style={styles.value} >
                {
                  admissiontime &&
                  collegeaddr &&
                  department && 
                  graduationtime &&
                  schoolName &&
                  specialty ?
                  schoolName :
                  ''
                }
              </Text>
              <CustomIcon style={styles.icon} name={'arrowright'} ></CustomIcon>
            </View>
          </BYTouchable>
          <BYTouchable style={styles.item} onPress={() => navigate(SCREENS.CertifiedInformationContact, { index: 1 })} >
            <View style={styles.main} >
              <Text style={styles.label} >Emergency Contact Person 1</Text>
              <Text style={styles.value} >
              {
                connectuseridentification1.length &&
                connectusermsisdn1.length &&
                connectusername1.length &&
                connectuserrelation1.length ?
                connectusername1 :
                ''
              }
              </Text>
              <CustomIcon style={styles.icon} name={'arrowright'} ></CustomIcon>
            </View>
          </BYTouchable>
          <BYTouchable style={styles.item} onPress={() => navigate(SCREENS.CertifiedInformationContact, { index: 2 })} >
            <View style={styles.main} >
              <Text style={styles.label} >Emergency Contact Person 2</Text>
              <Text style={styles.value} >
              {
                connectusermsisdn2.length &&
                connectusername2.length &&
                connectuserrelation2.length ?
                connectusername2 :
                ''
              }
              </Text>
              <CustomIcon style={styles.icon} name={'arrowright'} ></CustomIcon>
            </View>
          </BYTouchable>
          <BYTouchable style={styles.item} onPress={() => navigate(SCREENS.CertifiedInformationContact, { index: 3 })} >
            <View style={styles.main} >
              <Text style={styles.label} >Emergency Contact Person 3</Text>
              <Text style={styles.value} >
              {
                connectusermsisdn3.length &&
                connectusername3.length &&
                connectuserrelation3.length ?
                connectusername3 :
                ''
              }
              </Text>
              <CustomIcon style={styles.icon} name={'arrowright'} ></CustomIcon>
            </View>
          </BYTouchable>
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >E-mail</Text>
              <BYTextInput 
                style={styles.input}
                placeholder={'please enter your Email'}
                placeholderTextColor={'#ccc'}
                onChangeText={(val) => certifiedInformationEdit('email', val)}
                value={email}
              />
            </View>
          </View>
          <BYButton text={'Apply'} style={styles.submit} styleWrap={{paddingTop: SIDEINTERVAL}} onPress={() => this.handleOnPressSubmit()} />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  render() {
    const {
      isOpenModal
    } = this.state;
    return (
      <View style={styles.container}>
        <BYHeader />
        {this.renderMainContent()}
        <BYModal
          visible={isOpenModal}
          onRequestClose={this.handleOnPressToggleModal}
        >
          {this.renderBottomSheet()}
        </BYModal>
      </View>
    );
  }
}

CertifiedInformation = reduxForm({
  form: 'CertifiedInformation',
})(CertifiedInformation);

export default connect(
  () => {
    const getSchoolName = makegetSchoolName();
    return (state, props) => {
      const {
        auth,
        certifiedInformation,
        userCertificateInfo,
        userAddDetailInfo,
        cardSubmit,
        schoolInfo,
      } = state;
      const isCertify = props.navigation.state.params 
      ? 
      typeof props.navigation.state.params.isCertify === 'boolean' ? props.navigation.state.params.isCertify : false
      :
      false;

      return {
        ...certifiedInformation.certUser,
        loading: userCertificateInfo.loading,
        addLoading: userAddDetailInfo.loading,
        cardSubmitLoading: cardSubmit.loading,
        isCertify,
        authUser: auth.user,
        schoolInfoItems: schoolInfo.items,
        schoolName: getSchoolName(state, props),
      }
    }
  },
  {
    ...certifiedInformationActionCreators,
    ...schoolInfoActionCreators,
    ...userCertificateInfoActionCreators,
    ...userAddDetailInfoActionCreators,
    ...cardSubmitActionCreators,
  }
)(CertifiedInformation);
