import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import BYButton from '../components/BYButton';
import Loader from '../components/Loader';

import { BORDER_COLOR, PRIMARY_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';

import * as updatePeriodActionCreators from '../common/actions/updatePeriod';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
})

class PeriodSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: 0,
      periodList: [3, 6, 9, 12],
    };
  }

  componentDidMount() {
    const {
      periodHobbit,
    } = this.props;

    this.setState({
      period: periodHobbit,
    });
  }

  handleOnPressItem(val) {
    this.setState({
      period: val,
    });
  }

  handleOnPressSubmit() {
    const {
      updatePeriodFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (!isAuthUser) return navigate(SCREENS.Login);
    
    updatePeriodFetch({
      period: this.state.period,
    });
  }

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
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
        style={styles.container}
        backgroundColor="transparent"
        onPress={() => this.handleOnPressToggleModal('isOpenBillSelect')}
      >
        <Text style={styles.title}>Set the stage</Text>
      </BYTouchable>
    )
  }

  renderContent() {
    const styles = StyleSheet.create({
      container: {
        // backgroundColor: 
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

    const {
      period,
      periodList,
    } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.wrap}>
            {
              periodList.map((val, key) => {
                return (
                  <BYTouchable 
                    style={[styles.item, period === val && styles.itemActive]} 
                    key={key}
                    backgroundColor="transparent"
                    onPress={() => this.handleOnPressItem(val)}
                  >
                    <Text style={[styles.itemNumber, period === val && styles.itemTextActive]}>{val}</Text>
                    <Text style={[styles.itemText, period === val && styles.itemTextActive]}>period</Text>
                  </BYTouchable>
                )
              })
            }
          </View>
          <BYButton text={'confirm'} styleWrap={styles.submit} onPress={() => this.handleOnPressSubmit()} />
        </View>
        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>说明:</Text>
          <Text style={styles.tipsText}>1. 每月26日为出账日，出账日之前的账单可以在此处修改分期数; 出账日之后的账单不可以再修改分期数。</Text>
          <Text style={styles.tipsText}>2. 请根据自己的消费情况设置合理的分期数，以免影响到个人还款信用。</Text>
        </View>
      </View>
    )
  }
  
  render() {
    const {
      updatePeriod,
      navigation: { navigate },
      i18n,
      loading,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        <ScrollView style={styles.container}>
          {this.renderContent()}
        </ScrollView>
        {/* <Loader absolutePosition /> */}
        { loading && <Loader absolutePosition />}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          cardQuery,
          updatePeriod,
        } = state;
        return {
          loading: updatePeriod.loading,
          initPassword: cardQuery.item.initPassword,
          status: cardQuery.item.status,
          periodHobbit: cardQuery.item.periodHobbit,
          isAuthUser: !!state.auth.user,
        }
      }
    },
    {
      ...updatePeriodActionCreators,
    }
  )(PeriodSelect),
);
