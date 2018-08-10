import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { SCREENS } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import NavBar1 from '../components/NavBar1';
import BYTouchable from '../components/BYTouchable';

import priceFormat from '../common/helpers/priceFormat';
import { payWayToText } from '../common/helpers';
import { SIDEINTERVAL } from '../common/constants';

import { BORDER_COLOR } from '../styles/variables';

import * as repaymentRecordActionCreators from '../common/actions/repaymentRecord';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BORDER_COLOR,
  },
});

class RepaymentRecord extends React.Component {

  componentDidMount() {
    const {
      repaymentRecordFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);
    
    repaymentRecordFetch();
  }

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40,
        flexDirection: 'row',
      },
      title: {
        color: '#333',
        fontSize: 16,
      },
    });
    return (
      <BYTouchable 
        style={styles.container}
        backgroundColor="transparent"
        onPress={() => this.handleOnPressToggleModal('isOpenBillSelect')}
      >
        <Text style={styles.title}>record</Text>
      </BYTouchable>
    )
  }

  renderContent() {
    const styles = StyleSheet.create({
      container: {
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
      item: {
        backgroundColor: '#fff',
        marginBottom: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
      number: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        // paddingTop: 10,
        // paddingBottom: 10,
      },
      textLeft: {
        color: '#999',
        width: 70,
        // backgroundColor: '#f00',
      },
      textRight: {
        color: '#666',
      },
      cell: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
      },
    });

    const {
      repaymentRecordItems,
    } = this.props;
    
    return (
      <View style={styles.container}>
        {
          repaymentRecordItems.map((val, key) => {
            return (
              <View style={styles.item} key={key}>
                <View style={styles.number}>
                  <Text style={styles.textLeft}>number</Text>
                  <Text style={styles.textRight}>{val.orderNo}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.textLeft}>sum</Text>
                  <Text style={styles.textRight}>{priceFormat(val.amount)} VND</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.textLeft}>date</Text>
                  <Text style={styles.textRight}>{moment(val.createTime).format('L')}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.textLeft}>way</Text>
                  <Text style={styles.textRight}>{payWayToText(val.payWay)}</Text>
                </View>
              </View>
            )
          })
        }
        {/* <View style={styles.item}>
          <View style={styles.number}>
            <Text style={styles.textLeft}>number</Text>
            <Text style={styles.textRight}>C0316011200001560047</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textLeft}>sum</Text>
            <Text style={styles.textRight}>8.000.500 VND</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textLeft}>date</Text>
            <Text style={styles.textRight}>2018.04.25</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textLeft}>bank</Text>
            <Text style={styles.textRight}>visa</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textLeft}>way</Text>
            <Text style={styles.textRight}>bank</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.number}>
            <Text style={styles.textLeft}>number</Text>
            <Text style={styles.textRight}>C0316011200001560047</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textLeft}>sum</Text>
            <Text style={styles.textRight}>8.000.500 VND</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textLeft}>date</Text>
            <Text style={styles.textRight}>2018.04.25</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textLeft}>bank</Text>
            <Text style={styles.textRight}>visa</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textLeft}>way</Text>
            <Text style={styles.textRight}>bank</Text>
          </View>
        </View> */}
      </View>
    )
  }

  render() {
    const { bannerHomeRecommend, navigation: { navigate }, i18n } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          repaymentRecord,
        } = state;
        return {
          repaymentRecordItems: repaymentRecord.item.records ? repaymentRecord.item.records : [],
          isAuthUser: !!state.auth.user,
        }
      }
    },
    {
      ...repaymentRecordActionCreators,
    }
  )(RepaymentRecord),
);
