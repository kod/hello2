/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  // Picker,
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
import BYTextInput from '../components/BYTextInput';
import { connectLocalization } from '../components/Localization';

import { makegetSchoolName } from '../common/selectors';
import * as certifiedInformationActionCreators from '../common/actions/certifiedInformation';

import { BORDER_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SCREENS,
} from '../common/constants';
import i18n from '../common/helpers/i18n';

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
  picker: {
    flex: 1,
    height: 50,
  },
  value: {
    flex: 1,
    color: '#333',
    textAlign: 'right',
    paddingRight: SIDEINTERVAL,
  },
});

class CertifiedInformationSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // language: '',
      // date: "15-05-2016",
      // schoolAddress: '',
      // department: '',
      // profession: '',
      // matriculationTime: '15-05-2016', // 入学时间
      // gradutionTime: '', // 毕业时间
    };
  }

  // componentDidMount() {

  // }

  render() {
    const {
      admissiontime,
      certifiedInformationEdit,
      collegeaddr,
      department,
      // graduationtime,
      schoolName,
      specialty,
      navigation: { goBack, navigate },
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          <BYTouchable
            style={styles.item}
            onPress={() => navigate(SCREENS.SchoolSelect)}
          >
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.school}</Text>
              <Text style={styles.value}>{schoolName}</Text>
              <CustomIcon style={styles.icon} name="arrowright" />
            </View>
          </BYTouchable>
          <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.schoolAddress}</Text>
              <BYTextInput
                style={styles.input}
                placeholder={i18n.schoolAddress}
                placeholderTextColor="#ccc"
                onChangeText={val =>
                  certifiedInformationEdit('collegeaddr', val)
                }
                value={collegeaddr}
              />
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.department}</Text>
              <BYTextInput
                style={styles.input}
                placeholder={i18n.department}
                placeholderTextColor="#ccc"
                onChangeText={val =>
                  certifiedInformationEdit('department', val)
                }
                value={department}
              />
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.major}</Text>
              <BYTextInput
                style={styles.input}
                placeholder={i18n.major}
                placeholderTextColor="#ccc"
                onChangeText={val => certifiedInformationEdit('specialty', val)}
                value={specialty}
              />
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.matriculationTime}</Text>
              <DatePicker
                showIcon={false}
                style={{ flex: 1 }}
                date={admissiontime}
                mode="date"
                placeholder={i18n.matriculationTime}
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
                onDateChange={val =>
                  certifiedInformationEdit('admissiontime', val)
                }
              />
              <MaterialIcons style={{ fontSize: 24 }} name="arrow-drop-down" />
            </View>
          </View>
          {/* <View style={styles.item}>
            <View style={styles.main}>
              <Text style={styles.label}>{i18n.graduationTime}</Text>
              <DatePicker
                showIcon={false}
                style={{ flex: 1 }}
                date={graduationtime}
                mode="date"
                placeholder={i18n.graduationTime}
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
                onDateChange={val =>
                  certifiedInformationEdit('graduationtime', val)
                }
              />
              <MaterialIcons style={{ fontSize: 24 }} name="arrow-drop-down" />
            </View>
          </View> */}
          <BYButton
            text={i18n.confirm}
            style={{ marginBottom: 30 }}
            styleWrap={{ paddingTop: SIDEINTERVAL }}
            onPress={() => goBack()}
          />
        </ScrollView>
      </View>
    );
  }
}

CertifiedInformationSchool = reduxForm({
  form: 'CertifiedInformationSchool',
})(CertifiedInformationSchool);

export default connectLocalization(
  connect(
    () => {
      const getSchoolName = makegetSchoolName();
      return (state, props) => {
        const {
          certifiedInformation,
          // certifiedInformation,
        } = state;
        return {
          schoolName: getSchoolName(state, props),
          ...certifiedInformation.certUser,
        };
      };
    },
    {
      ...certifiedInformationActionCreators,
    },
  )(CertifiedInformationSchool),
);
