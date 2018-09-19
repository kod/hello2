/* eslint-disable no-class-assign */
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  // Platform,
  Alert,
  // Platform,
} from 'react-native';
import { connect } from 'react-redux';
import {
  // Field,
  reduxForm,
} from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import CustomIcon from '../components/CustomIcon';
import BYTouchable from '../components/BYTouchable';
// import FieldInput from '../components/FieldInput';
// import Error from '../components/Error';
import BYTextInput from '../components/BYTextInput';
import BYModal from '../components/BYModal';
import Loader from '../components/Loader';
import { connectLocalization } from '../components/Localization';
import { makegetSchoolName } from '../common/selectors';
import { submitDuplicateFreeze } from '../common/helpers';

import { BORDER_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SCREENS,
  NAME_EXPR,
  IDENTIFICATION_EXPR,
  // PHONE_EXPR,
  EMAIL_EXPR,
  MODAL_TYPES,
} from '../common/constants';

import * as userAddDetailInfoActionCreators from '../common/actions/userAddDetailInfo';
import * as userCertificateInfoActionCreators from '../common/actions/userCertificateInfo';
import * as certifiedInformationActionCreators from '../common/actions/certifiedInformation';
import * as schoolInfoActionCreators from '../common/actions/schoolInfo';
import * as cardSubmitActionCreators from '../common/actions/cardSubmit';
import * as modalActionCreators from '../common/actions/modal';
import * as auditGetInfoActionCreators from '../common/actions/auditGetInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ScrollView: {
    height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT,
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
    borderBottomColor: BORDER_COLOR,
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
    marginBottom: 30,
  },
});

class CertifiedInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitfreeze: false,
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
      isAuthUser,
      navigation: { navigate },
      navigation,
      schoolInfoFetch,
      schoolInfoItems,
      userCertificateInfoFetch,
      cardSubmitClear,
      auditGetInfoClear,
      auditGetInfoFetch,
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);
    cardSubmitClear();
    if (isAuthUser) {
      userCertificateInfoFetch();
      auditGetInfoClear();
      auditGetInfoFetch();
      if (schoolInfoItems.length === 0) schoolInfoFetch();
      this.didFocusSubscription = navigation.addListener('didFocus', () => {
        auditGetInfoClear();
        auditGetInfoFetch();
      });
    } else {
      navigate(SCREENS.Login);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      cardSubmitLoading: prevCardSubmitLoading,
      addLoading: prevAddLoading,
      cardSubmitLoaded: prevCardSubmitLoaded,
    } = this.props;
    const {
      cardSubmitLoading,
      addLoading,
      openModal,
      closeModal,
      cardSubmitLoaded,
      cardSubmitIsTrue,
      i18n,
      navigation: { pop },
    } = nextProps;

    if (prevAddLoading !== addLoading) {
      if (addLoading) {
        openModal(MODAL_TYPES.LOADER);
      }
    }

    if (prevCardSubmitLoading !== cardSubmitLoading) {
      if (cardSubmitLoading === false) {
        closeModal();
      }
    }

    if (
      prevCardSubmitLoaded !== cardSubmitLoaded &&
      cardSubmitLoaded === true &&
      cardSubmitIsTrue === true
    ) {
      // 提交申请信用卡成功
      Alert.alert(
        '',
        i18n.ambassadorContactYou,
        [
          {
            text: i18n.confirm,
            onPress: () => {
              pop(1);
            },
          },
        ],
        { cancelable: false },
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutId);
    this.didFocusSubscription.remove();
  }

  getSexName() {
    const {
      sexList,
      // sexList
    } = this.state;

    const {
      sex,
      // sex,
    } = this.props;

    for (let index = 0; index < sexList.length; index += 1) {
      const element = sexList[index];
      if (element.key === sex) return element.value;
    }
    return false;
  }

  handleOnPressToggleModal = type => {
    const {
      isOpenModal,
      // isOpenModal,
    } = this.state;

    this.setState({
      isOpenModal: typeof type !== 'boolean' ? !isOpenModal : type,
    });
  };

  handleOnPressSubmit() {
    const {
      submitfreeze,
      // submitfreeze,
    } = this.state;

    const {
      userAddDetailInfoFetch,
      // cardSubmitFetch,
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
      // connectuseridentification2,
      connectusername3,
      connectusermsisdn3,
      connectuserrelation3,
      // connectuseridentification3,
      auditGetInfoIdentification,
      auditGetInfoStudentCard,
      auditGetInfoPersonalPhotos,
      birthday,
      isCertify,
      i18n,
    } = this.props;

    const tips = text => {
      Alert.alert('', text, [
        {
          text: i18n.confirm,
          onPress: () => {},
        },
      ]);
    };

    if (isCertify) {
      // if (!username.length) return tips(i18n.pleaseEnterYourActualName);
      if (!NAME_EXPR.test(username))
        return tips(i18n.pleaseEnterYourActualName);

      if (!IDENTIFICATION_EXPR.test(identification))
        return tips(i18n.pleseEnterYourIndentification);

      if (!sex.length) return tips(i18n.pleaseSelectGender);
      if (!birthday.length) return tips(i18n.pleaseChooseBirthday);
      if (!address.length) return tips(i18n.pleaseEnterYourAddress);
      if (
        collegename.length === '' ||
        !collegeaddr.length ||
        !department.length ||
        !specialty.length ||
        !admissiontime.length ||
        !graduationtime.length
      )
        return tips(i18n.pleaseFillSchoolInformation);

      // if (!PHONE_EXPR.test(connectusermsisdn1))
      //   return tips(i18n.pleaseEnterYourAddress);
      // 暂时不验证

      if (
        !connectusername1.length ||
        !connectusermsisdn1.length ||
        !connectuserrelation1.length ||
        !connectuseridentification1.length
      )
        return tips(`${i18n.pleaseEnterEmergencyContactPerson} 1`);

      if (
        !connectusername2.length ||
        !connectusermsisdn2.length ||
        !connectuserrelation2.length
      )
        return tips(`${i18n.pleaseEnterEmergencyContactPerson} 2`);

      if (
        !connectusername3.length ||
        !connectusermsisdn3.length ||
        !connectuserrelation3.length
      )
        return tips(`${i18n.pleaseEnterEmergencyContactPerson} 3`);

      if (
        connectusermsisdn1 === connectusermsisdn2 ||
        connectusermsisdn1 === connectusermsisdn3 ||
        connectusermsisdn2 === connectusermsisdn3
      )
        return tips(i18n.emergencyContactPhoneCannotSame);

      if (
        !auditGetInfoStudentCard.length ||
        !auditGetInfoIdentification.length ||
        !auditGetInfoPersonalPhotos.length
      )
        return tips(i18n.pleaseUploadDocument);

      if (!EMAIL_EXPR.test(email)) return tips(i18n.failedEMailPleaseReEnter);
    }

    submitDuplicateFreeze(submitfreeze, this, () => userAddDetailInfoFetch());

    // if (submitfreeze === false) {
    //   userAddDetailInfoFetch();
    // } else {
    //   this.setState({ submitfreeze: true });
    //   this.setTimeoutId = setTimeout(() => {
    //     this.setState({ submitfreeze: false });
    //   }, 2000);
    // }

    return false;
  }

  renderBottomSheet() {
    const stylesX = StyleSheet.create({
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
      // sexList,
    } = this.state;

    const {
      certifiedInformationEdit,
      // certifiedInformationEdit,
    } = this.props;

    return (
      <View style={stylesX.container}>
        {sexList.map(val => (
          <Text
            style={stylesX.item}
            key={val.value}
            onPress={() => {
              certifiedInformationEdit(`sex`, val.key);
              this.handleOnPressToggleModal();
            }}
          >
            {val.value}
          </Text>
        ))}
      </View>
    );
  }

  renderMainContent() {
    const {
      address,
      admissiontime,
      birthday,
      collegeaddr,
      certifiedInformationEdit,
      connectuseridentification1,
      // connectuseridentification2,
      // connectuseridentification3,
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
      navigation: { navigate },
      schoolName,
      specialty,
      // sex,
      i18n,
      username,
      loading,
      auditGetInfoIdentification,
      auditGetInfoStudentCard,
      auditGetInfoPersonalPhotos,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView behavior="padding">
          {/* {addLoading && <Loader absolutePosition />} */}
          <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.actualName}</Text>
              <BYTextInput
                style={styles.input}
                placeholder={i18n.pleaseEnterYourActualName}
                placeholderTextColor="#ccc"
                onChangeText={val => certifiedInformationEdit('username', val)}
                onBlur={() =>
                  certifiedInformationEdit('username', username.trim())
                }
                value={username}
              />
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.idCard}</Text>
              <BYTextInput
                style={styles.input}
                placeholder={i18n.idCard}
                placeholderTextColor="#ccc"
                onChangeText={val =>
                  certifiedInformationEdit('identification', val)
                }
                onBlur={() =>
                  certifiedInformationEdit(
                    'identification',
                    identification.trim(),
                  )
                }
                value={identification}
                keyboardType="numeric"
              />
            </View>
          </View>
          <BYTouchable
            style={styles.item}
            onPress={() => this.handleOnPressToggleModal()}
          >
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.gender}</Text>
              <Text style={styles.value}>{this.getSexName()}</Text>
              <MaterialIcons style={{ fontSize: 24 }} name="arrow-drop-down" />
            </View>
          </BYTouchable>
          <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.yearOfBirth}</Text>
              <DatePicker
                showIcon={false}
                style={{ flex: 1 }}
                date={birthday}
                mode="date"
                placeholder={i18n.yearOfBirth}
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
              <MaterialIcons style={{ fontSize: 24 }} name="arrow-drop-down" />
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.homeTown}</Text>
              <BYTextInput
                style={styles.input}
                placeholder={i18n.homeTown}
                placeholderTextColor="#ccc"
                onChangeText={val => certifiedInformationEdit('address', val)}
                onBlur={() =>
                  certifiedInformationEdit('address', address.trim())
                }
                value={address}
              />
            </View>
          </View>
          <BYTouchable
            style={styles.item}
            backgroundColor="transparent"
            onPress={() => navigate(SCREENS.CertifiedInformationSchool)}
          >
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.school}</Text>
              <Text style={styles.value}>
                {admissiontime &&
                collegeaddr &&
                department &&
                graduationtime &&
                schoolName &&
                specialty
                  ? schoolName
                  : ''}
              </Text>
              <CustomIcon style={styles.icon} name="arrowright" />
            </View>
          </BYTouchable>
          <BYTouchable
            style={styles.item}
            onPress={() =>
              navigate(SCREENS.CertifiedInformationContact, { index: 1 })
            }
          >
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.emergencyContactPerson} 1</Text>
              <Text style={styles.value}>
                {connectuseridentification1.length &&
                connectusermsisdn1.length &&
                connectusername1.length &&
                connectuserrelation1.length
                  ? connectusername1
                  : ''}
              </Text>
              <CustomIcon style={styles.icon} name="arrowright" />
            </View>
          </BYTouchable>
          <BYTouchable
            style={styles.item}
            onPress={() =>
              navigate(SCREENS.CertifiedInformationContact, { index: 2 })
            }
          >
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.emergencyContactPerson} 2</Text>
              <Text style={styles.value}>
                {connectusermsisdn2.length &&
                connectusername2.length &&
                connectuserrelation2.length
                  ? connectusername2
                  : ''}
              </Text>
              <CustomIcon style={styles.icon} name="arrowright" />
            </View>
          </BYTouchable>
          <BYTouchable
            style={styles.item}
            onPress={() =>
              navigate(SCREENS.CertifiedInformationContact, { index: 3 })
            }
          >
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.emergencyContactPerson} 3</Text>
              <Text style={styles.value}>
                {connectusermsisdn3.length &&
                connectusername3.length &&
                connectuserrelation3.length
                  ? connectusername3
                  : ''}
              </Text>
              <CustomIcon style={styles.icon} name="arrowright" />
            </View>
          </BYTouchable>
          <BYTouchable
            style={styles.item}
            onPress={() => navigate(SCREENS.StudentCardUpload)}
          >
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.document}</Text>
              <Text style={styles.value}>
                {auditGetInfoStudentCard.length &&
                auditGetInfoIdentification.length &&
                auditGetInfoPersonalPhotos.length
                  ? i18n.uploaded
                  : ''}
              </Text>
              <CustomIcon style={styles.icon} name="arrowright" />
            </View>
          </BYTouchable>
          <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.email}</Text>
              <BYTextInput
                style={styles.input}
                placeholder={i18n.email}
                placeholderTextColor="#ccc"
                onChangeText={val =>
                  certifiedInformationEdit('email', val.trim())
                }
                value={email}
              />
            </View>
          </View>
          <BYButton
            text={i18n.apply}
            style={styles.submit}
            styleWrap={{ paddingTop: SIDEINTERVAL }}
            onPress={() => this.handleOnPressSubmit()}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  render() {
    const {
      isOpenModal,
      // isOpenModal,
    } = this.state;
    const { i18n } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader title={i18n.applyCreditCard} />
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

export default connectLocalization(
  connect(
    () => {
      const getSchoolName = makegetSchoolName();
      return (state, props) => {
        const {
          certifiedInformation,
          userCertificateInfo,
          userAddDetailInfo,
          cardSubmit,
          schoolInfo,
          auditGetInfo,
        } = state;

        const {
          navigation: {
            state: {
              params,
              // params,
            },
          },
        } = props;

        const isCertify = params
          ? typeof params.isCertify === 'boolean'
            ? params.isCertify
            : false
          : true;

        return {
          ...certifiedInformation.certUser,
          loading: userCertificateInfo.loading,
          addLoading: userAddDetailInfo.loading,
          cardSubmitLoading: cardSubmit.loading,
          cardSubmitLoaded: cardSubmit.loaded,
          cardSubmitIsTrue: cardSubmit.isTrue,
          isCertify,
          isAuthUser: !!state.login.user,
          schoolInfoItems: schoolInfo.items,
          schoolName: getSchoolName(state, props),
          auditGetInfoIdentification: auditGetInfo.identification,
          auditGetInfoStudentCard: auditGetInfo.studentCard,
          auditGetInfoPersonalPhotos: auditGetInfo.personalPhotos,
        };
      };
    },
    {
      ...certifiedInformationActionCreators,
      ...schoolInfoActionCreators,
      ...userCertificateInfoActionCreators,
      ...userAddDetailInfoActionCreators,
      ...cardSubmitActionCreators,
      ...modalActionCreators,
      ...auditGetInfoActionCreators,
    },
  )(CertifiedInformation),
);
