/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  // Picker,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import DatePicker from 'react-native-datepicker';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import CustomIcon from '../components/CustomIcon';
import BYTouchable from '../components/BYTouchable';
// import FieldInput from '../components/FieldInput';
import BYTextInput from '../components/BYTextInput';
// import Error from '../components/Error';
import BYModal from '../components/BYModal';
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
  // SCREENS,
} from '../common/constants';

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
      isOpenModal: false,
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.handleOnPressToggleModal();
    // }, 300);
  }

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
      title: {
        flex: 1,
        textAlign: 'center',
        color: '#333',
        fontSize: 14,
      },
    });

    const {
      index,
      i18n,
      // index,
    } = this.props;
    return (
      <Text style={stylesX.title}>
        {i18n.emergencyContactPerson} {index}
      </Text>
    );
  };

  renderHeaderRight = () => <View style={{ width: 45 }} />;

  handleOnPressToggleModal = type => {
    const {
      isOpenModal,
      // isOpenModal,
    } = this.state;

    this.setState({
      isOpenModal: typeof type !== 'boolean' ? !isOpenModal : type,
    });
  };

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
      certifiedInformationEdit,
      index,
      i18n,
      // index,
    } = this.props;

    const list =
      index === 1
        ? [i18n.dad, i18n.mother]
        : [
            `${i18n.boyfriend} / ${i18n.girlfriend}`,
            i18n.roommate,
            i18n.classmate,
          ];

    return (
      <View style={stylesX.container}>
        {list.map((val, key) => (
          <Text
            style={stylesX.item}
            key={key}
            onPress={() => {
              certifiedInformationEdit(`connectuserrelation${index}`, val);
              this.handleOnPressToggleModal();
            }}
          >
            {val}
          </Text>
        ))}
      </View>
    );
  }

  render() {
    const {
      isOpenModal,
      // isOpenModal,
    } = this.state;

    const {
      connectuseridentification,
      connectusermsisdn,
      connectusername,
      connectuserrelation,
      certifiedInformationEdit,
      index,
      navigation: { goBack },
      i18n,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={this.renderHeaderRight()}
        />
        <ScrollView keyboardShouldPersistTaps="always">
          <KeyboardAvoidingView behavior="padding">
            <BYTouchable
              style={styles.item}
              onPress={() => this.handleOnPressToggleModal()}
            >
              <View style={styles.main}>
                <Text style={styles.label}>{i18n.relationship}</Text>
                <Text style={styles.value}>{connectuserrelation}</Text>
                <CustomIcon style={styles.icon} name="arrowright" />
                {/* <Picker
                  selectedValue={connectuserrelation}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => certifiedInformationEdit(`connectuserrelation${index}`, itemValue)}
                >
                  <Picker.Item label="Bố" value="Bố" />
                  <Picker.Item label="Mẹ" value="Mẹ" />
                  <Picker.Item label="Bạn trai / bạn gái" value="Bạn trai / bạn gái" />
                  <Picker.Item label="Bạn cùng phòng" value="Bạn cùng phòng" />
                  <Picker.Item label="Bạn học" value="Bạn học" />
                </Picker> */}
              </View>
            </BYTouchable>
            <View style={styles.item}>
              <View style={styles.main}>
                <Text style={styles.label}>{i18n.actualName}</Text>
                <BYTextInput
                  style={styles.input}
                  placeholder={i18n.actualName}
                  placeholderTextColor="#ccc"
                  onChangeText={val =>
                    certifiedInformationEdit(`connectusername${index}`, val)
                  }
                  value={connectusername}
                />
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.main}>
                <Text style={styles.label}>{i18n.phoneNumber}</Text>
                <BYTextInput
                  style={styles.input}
                  placeholder={i18n.phoneNumber}
                  placeholderTextColor="#ccc"
                  onChangeText={val =>
                    certifiedInformationEdit(`connectusermsisdn${index}`, val)
                  }
                  value={connectusermsisdn}
                  keyboardType="numeric"
                />
              </View>
            </View>
            {index === 1 && (
              <View style={styles.item}>
                <View style={styles.main}>
                  <Text style={styles.label}>{i18n.idCard}</Text>
                  <BYTextInput
                    style={styles.input}
                    placeholder={i18n.idCard}
                    placeholderTextColor="#ccc"
                    onChangeText={val =>
                      certifiedInformationEdit(
                        `connectuseridentification${index}`,
                        val,
                      )
                    }
                    value={connectuseridentification}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}
            <BYButton
              text={i18n.confirm}
              style={{ marginBottom: 30 }}
              styleWrap={{ paddingTop: SIDEINTERVAL }}
              onPress={() => goBack()}
            />
          </KeyboardAvoidingView>
        </ScrollView>
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
        const {
          navigation: {
            state: {
              params,
              // params,
            },
          },
        } = props;

        const index = params ? params.index : 1;
        return {
          index,
          connectuseridentification:
            certifiedInformation.certUser[`connectuseridentification${index}`],
          connectusermsisdn:
            certifiedInformation.certUser[`connectusermsisdn${index}`],
          connectusername:
            certifiedInformation.certUser[`connectusername${index}`],
          connectuserrelation:
            certifiedInformation.certUser[`connectuserrelation${index}`],
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
