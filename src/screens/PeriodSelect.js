/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import BYButton from '../components/BYButton';
import Loader from '../components/Loader';

import { BORDER_COLOR, PRIMARY_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, SIDEINTERVAL, SCREENS } from '../common/constants';

import * as updatePeriodActionCreators from '../common/actions/updatePeriod';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  main: {
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
    marginBottom: 45,
  },
  item: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 3) / 2,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingTop: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL,
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
  },
  itemActive: {
    borderColor: PRIMARY_COLOR,
  },
  itemTextActive: {
    color: PRIMARY_COLOR,
  },
  itemNumber: {
    fontSize: 24,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    // backgroundColor: '#f00',
  },
  itemText: {
    fontSize: 14,
    lineHeight: 14,
    color: '#999',
    textAlign: 'center',
  },
  submit: {
    marginBottom: 45,
  },
  tips: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: SIDEINTERVAL * 2,
    paddingBottom: SIDEINTERVAL * 2,
  },
  tipsTitle: {
    color: '#999',
    marginBottom: 5,
  },
  tipsText: {
    fontSize: 11,
    color: '#999',
    marginBottom: 5,
    lineHeight: 11 * 1.618,
  },
});

class PeriodSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: 0,
      periodList: [3, 6, 9, 12],
    };
  }

  componentDidMount() {
    const { periodHobbit, updatePeriodFetchClear } = this.props;

    updatePeriodFetchClear();
    this.setState({
      period: periodHobbit,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { loaded: prevLoaded } = this.props;
    const {
      loaded,
      isTrue,
      i18n,
      navigation: { pop },
    } = nextProps;

    if (prevLoaded !== loaded && loaded === true && isTrue === true) {
      // 修改交易密码成功
      Alert.alert(
        '',
        i18n.success,
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

  handleOnPressItem(val) {
    this.setState({
      period: val,
    });
  }

  handleOnPressSubmit() {
    const { period } = this.state;
    const {
      updatePeriodFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);

    updatePeriodFetch({
      period,
    });
    return true;
  }

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40,
        flexDirection: 'row',
        // backgroundColor: '#f00',
        height: 40,
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    });
    return (
      <BYTouchable
        style={stylesX.container}
        backgroundColor="transparent"
        onPress={() => this.handleOnPressToggleModal('isOpenBillSelect')}
      >
        <Text style={stylesX.title}>Set the stage</Text>
      </BYTouchable>
    );
  };

  renderContent() {
    // const styles = StyleSheet.create({
    //   container: {
    //     // backgroundColor:
    //   },
    //   // main: {
    //   //   backgroundColor: '#fff',
    //   //   paddingTop: 30,
    //   // },
    //   // wrap: {
    //   //   flexDirection: 'row',
    //   //   flexWrap: 'wrap',
    //   //   paddingLeft: SIDEINTERVAL,
    //   //   marginBottom: 45,
    //   // },
    //   // item: {
    //   //   width: (WINDOW_WIDTH - SIDEINTERVAL * 3) / 2,
    //   //   borderWidth: 1,
    //   //   borderColor: BORDER_COLOR,
    //   //   paddingTop: SIDEINTERVAL,
    //   //   paddingBottom: SIDEINTERVAL,
    //   //   marginRight: SIDEINTERVAL,
    //   //   marginBottom: SIDEINTERVAL,
    //   // },
    //   // itemActive: {
    //   //   borderColor: PRIMARY_COLOR,
    //   // },
    //   // itemTextActive: {
    //   //   color: PRIMARY_COLOR,
    //   // },
    //   // itemNumber: {
    //   //   fontSize: 24,
    //   //   color: '#666',
    //   //   textAlign: 'center',
    //   //   lineHeight: 24,
    //   //   // backgroundColor: '#f00',
    //   // },
    //   // itemText: {
    //   //   fontSize: 14,
    //   //   lineHeight: 14,
    //   //   color: '#999',
    //   //   textAlign: 'center',
    //   // },
    //   // submit: {
    //   //   marginBottom: 45,
    //   // },
    //   // tips: {
    //   //   paddingLeft: SIDEINTERVAL,
    //   //   paddingRight: SIDEINTERVAL,
    //   //   paddingTop: SIDEINTERVAL * 2,
    //   //   paddingBottom: SIDEINTERVAL * 2,
    //   // },
    //   // tipsTitle: {
    //   //   color: '#999',
    //   //   marginBottom: 5,
    //   // },
    //   // tipsText: {
    //   //   fontSize: 11,
    //   //   color: '#999',
    //   //   marginBottom: 5,
    //   //   lineHeight: 11 * 1.618,
    //   // },
    // });

    const {
      period,
      periodList,
      // periodList,
    } = this.state;

    const { i18n } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.wrap}>
            {periodList.map((val, key) => (
              <BYTouchable
                style={[styles.item, period === val && styles.itemActive]}
                key={key}
                backgroundColor="transparent"
                onPress={() => this.handleOnPressItem(val)}
              >
                <Text
                  style={[
                    styles.itemNumber,
                    period === val && styles.itemTextActive,
                  ]}
                >
                  {val}
                </Text>
                <Text
                  style={[
                    styles.itemText,
                    period === val && styles.itemTextActive,
                  ]}
                >
                  {i18n.period}
                </Text>
              </BYTouchable>
            ))}
          </View>
          <BYButton
            text={i18n.confirm}
            styleWrap={styles.submit}
            onPress={() => this.handleOnPressSubmit()}
          />
        </View>
        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>{i18n.description}:</Text>
          <Text style={styles.tipsText}>{`1. ${i18n.descriptionOne}`}</Text>
          <Text style={styles.tipsText}>{`2. ${i18n.descriptionTwo}`}</Text>
        </View>
      </View>
    );
  }

  render() {
    const {
      // updatePeriod,
      // navigation: { navigate },
      // i18n,
      loading,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader headerTitle={this.renderHeaderTitle()} />
        <ScrollView style={styles.container}>{this.renderContent()}</ScrollView>
        {/* <Loader absolutePosition /> */}
        {loading && <Loader absolutePosition />}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const {
        cardQuery,
        updatePeriod,
        // updatePeriod,
      } = state;
      return {
        loading: updatePeriod.loading,
        loaded: updatePeriod.loaded,
        isTrue: updatePeriod.isTrue,
        initPassword: cardQuery.item.initPassword,
        status: cardQuery.item.status,
        periodHobbit: cardQuery.item.periodHobbit,
        isAuthUser: !!state.login.user,
      };
    },
    {
      ...updatePeriodActionCreators,
    },
  )(PeriodSelect),
);
