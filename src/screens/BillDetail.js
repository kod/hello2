import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { connectLocalization } from '../components/Localization';
// import BYHeader from '../components/BYHeader';
import CustomIcon from '../components/CustomIcon';
import BYTouchable from '../components/BYTouchable';
import NavBar2 from '../components/NavBar2';
// import SeparateBar from '../components/SeparateBar';

import { PRIMARY_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  STATUSBAR_HEIGHT,
  APPBAR_HEIGHT,
} from '../common/constants';

import * as billDetailsActionCreators from '../common/actions/billDetails';
// import * as authActionCreators from '../common/actions/auth';
import priceFormat from '../common/helpers/priceFormat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: PRIMARY_COLOR,
  },
  headerBack: {
    height: APPBAR_HEIGHT,
    lineHeight: APPBAR_HEIGHT,
    paddingLeft: WINDOW_WIDTH * 0.03,
    paddingRight: SIDEINTERVAL,
    fontSize: 15,
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    // backgroundColor: '#ff0',
    flex: 1,
    paddingRight: 40,
  },
});

class BillDetail extends Component {
  componentDidMount() {
    const {
      billDetailsFetch,
      id,
      // isAuthUser,
      // navigation: { navigate },
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);

    billDetailsFetch({
      summaryid: id,
    });
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
      },
      main: {
        paddingTop: 15,
        backgroundColor: PRIMARY_COLOR,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      title: {
        fontSize: 11,
        color: '#fff',
        marginBottom: 5,
        textAlign: 'center',
      },
      price: {
        fontSize: 30,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
      },
      items: {
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
      bill: {
        flexDirection: 'row',
        marginBottom: 25,
      },
      billItem: {
        flex: 1,
      },
      billText: {
        textAlign: 'center',
        color: '#82bcf9',
      },
    });

    const { i18n, billDetailsItem, activeMonth } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          <Text style={stylesX.title}>{`${i18n.month} ${activeMonth}`}</Text>
          <Text style={stylesX.price}>
            {`${priceFormat(billDetailsItem.amountBill)} ₫`}
          </Text>
          <View style={stylesX.bill}>
            <View style={stylesX.billItem}>
              <Text style={stylesX.billText}>
                {`${priceFormat(billDetailsItem.monthBill)}`}
              </Text>
              <Text style={stylesX.billText}>{i18n.currentBill}</Text>
            </View>
            <View style={stylesX.billItem}>
              <Text style={stylesX.billText}>
                {priceFormat(billDetailsItem.historicalBill)}
              </Text>
              <Text style={stylesX.billText}>{i18n.pastBill}</Text>
            </View>
          </View>
        </View>
        <View style={stylesX.items}>
          <NavBar2
            valueLeft={i18n.principal}
            valueMiddle={`${priceFormat(billDetailsItem.principal)} ₫`}
            styleLeft={{ color: '#999' }}
            styleMiddle={{ color: '#666' }}
            isShowRight={false}
            backgroundColor="transparent"
          />
          <NavBar2
            valueLeft={i18n.interest}
            valueMiddle={`${priceFormat(billDetailsItem.interest)} ₫`}
            styleLeft={{ color: '#999' }}
            styleMiddle={{ color: '#666' }}
            isShowRight={false}
            backgroundColor="transparent"
          />
          <NavBar2
            valueLeft={i18n.billingDate}
            valueMiddle={`${moment(billDetailsItem.billData).format(
              'DD-MM-YYYY',
            )}`}
            styleLeft={{ color: '#999' }}
            styleMiddle={{ color: '#666' }}
            isShowRight={false}
            backgroundColor="transparent"
          />
          <NavBar2
            valueLeft={i18n.finalRepaymentDate}
            valueMiddle={`${moment(billDetailsItem.expireDate).format(
              'DD-MM-YYYY',
            )}`}
            styleLeft={{ color: '#999' }}
            styleMiddle={{ color: '#666' }}
            isShowRight={false}
            backgroundColor="transparent"
          />
        </View>
      </View>
    );
  }

  render() {
    const {
      navigation: { goBack },
      // i18n,
      billDetailsItem,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BYTouchable onPress={() => goBack()}>
            <CustomIcon name="back" style={styles.headerBack} />
          </BYTouchable>
          <Text style={styles.title} />
        </View>
        <ScrollView>
          {!!billDetailsItem.amountBill && this.renderContent()}
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => (state, props) => {
      const { billDetails, bill } = state;
      const { navigation } = props;
      return {
        isAuthUser: !!state.login.user,
        id: navigation.state.params.id,
        billDetailsItem: billDetails.item,
        activeMonth: bill.activeMonth,
      };
    },
    {
      ...billDetailsActionCreators,
    },
  )(BillDetail),
);
