import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import CustomIcon from '../components/CustomIcon';
import BYTouchable from '../components/BYTouchable';
import FieldInput from '../components/FieldInput';
import BYTextInput from "../components/BYTextInput";
import Error from '../components/Error';

import { makegetSchoolName } from "../common/selectors";
import { SCREENS } from '../common/constants';
import * as certifiedInformationActionCreators from '../common/actions/certifiedInformation';

import { SIDEINTERVAL, WINDOW_WIDTH, WINDOW_HEIGHT, APPBAR_HEIGHT, STATUSBAR_HEIGHT } from '../styles/variables';

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

  componentDidMount() {
    
  }

  render() {
    const {
      admissiontime,
      certifiedInformationEdit,
      collegeaddr,
      department,
      graduationtime,
      schoolName,
      specialty,
      navigation: { goBack, navigate },
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps={'always'} >
          <BYTouchable 
            style={styles.item} 
            onPress={() => navigate(SCREENS.SchoolSelect)} 
          >
            <View style={styles.main} >
              <Text style={styles.label} >School</Text>
              <Text style={styles.value} >{schoolName}</Text>
              <CustomIcon style={styles.icon} name={'arrowright'} ></CustomIcon>
            </View>
          </BYTouchable>
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >School address</Text>
              <BYTextInput 
                style={styles.input}
                placeholder={'please enter school address'}
                placeholderTextColor={'#ccc'}
                onChangeText={(val) => certifiedInformationEdit('collegeaddr', val)}
                value={collegeaddr}
              />
            </View>
          </View>
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >Department</Text>
              <BYTextInput 
                style={styles.input}
                placeholder={'please enter department'}
                placeholderTextColor={'#ccc'}
                onChangeText={(val) => certifiedInformationEdit('department', val)}
                value={department}
              />
            </View>
          </View>
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >Profession</Text>
              <BYTextInput 
                style={styles.input}
                placeholder={'please enter profession'}
                placeholderTextColor={'#ccc'}
                onChangeText={(val) => certifiedInformationEdit('specialty', val)}
                value={specialty}
              />
            </View>
          </View>
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >Matriculation time</Text>
              <DatePicker
                showIcon={false}
                style={{flex: 1}}
                date={admissiontime}
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
                onDateChange={val => {certifiedInformationEdit('admissiontime', val)}}
              />
              <MaterialIcons style={{fontSize: 24}} name={'arrow-drop-down'} ></MaterialIcons>
            </View>
          </View>
          <View style={styles.item} >
            <View style={styles.main} >
              <Text style={styles.label} >Gradution time</Text>
              <DatePicker
                showIcon={false}
                style={{flex: 1}}
                date={graduationtime}
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
                onDateChange={val => certifiedInformationEdit('graduationtime', val)}
              />
              <MaterialIcons style={{fontSize: 24}} name={'arrow-drop-down'} ></MaterialIcons>
            </View>
          </View>
          <BYButton text={'确定'} style={{ marginBottom: 30, }} styleWrap={{paddingTop: SIDEINTERVAL}} onPress={() => goBack()} />
        </ScrollView>
      </View>
    );
  }
}

CertifiedInformationSchool = reduxForm({
  form: 'CertifiedInformationSchool',
})(CertifiedInformationSchool);

export default connect(
  () => {
    const getSchoolName = makegetSchoolName();
    return (state, props) => {
      const {
        certifiedInformation,
      } = state;
      return {
        schoolName: getSchoolName(state, props),
        ...certifiedInformation.certUser,
      }
    }
  },
  {
    ...certifiedInformationActionCreators,
  }
)(CertifiedInformationSchool);
