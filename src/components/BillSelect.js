import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { RED_COLOR, PRIMARY_COLOR, } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from "../common/constants";

import priceFormat from "../common/helpers/priceFormat";
import { billStatusCodes } from "../common/helpers";

import BYTouchable from "../components/BYTouchable";

import * as billActionCreators from '../common/actions/bill';
import * as billByYearActionCreators from '../common/actions/billByYear';

const styles = StyleSheet.create({
  mask: { 
    backgroundColor: 'transparent',
    height: APPBAR_HEIGHT,
  },
});

class BillSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const {
      activeYear,
      billByYearFetch,
      navigation: { navigate },
    } = this.props;

    if (!isAuthUser) return navigate(SCREENS.Login);
    
    billByYearFetch({
      year: activeYear,
      init: true,
    });
  }

  handleOnPressYear(year) {
    const {
      billYearFetch,
      billByYearFetch,
    } = this.props;

    billByYearFetch({
      year: year,
    });
    billYearFetch(year);
  }
  

  handleOnPressMonth(val) {
    if (!val.month) return false;
    const {
      billMonthFetch,
      onRequestClose,
    } = this.props;

    billMonthFetch(val.month);
    onRequestClose();
  }
  
  renderBillSelect() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.1)',
        // backgroundColor: 'transparent',
        paddingLeft: SIDEINTERVAL * 2,
        paddingRight: SIDEINTERVAL * 2,
        paddingTop: SIDEINTERVAL * 2,
        paddingBottom: SIDEINTERVAL * 2,
      },
      main: {
        backgroundColor: '#fff',
      },
      nav: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: SIDEINTERVAL,
      },
      navItem: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        height: 50,
        lineHeight: 50,
        color: '#999',
      },
      navItemActive: {
        color: '#555',
      },
      wrap: {
        height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - SIDEINTERVAL * 6 - 50,
        paddingBottom: SIDEINTERVAL,
      },
      item: {
        paddingLeft: SIDEINTERVAL * 2,
        paddingRight: SIDEINTERVAL * 2,
        marginBottom: 10,
      },
      itemActive: {
        color: PRIMARY_COLOR,
      },
      itemMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // height: 40,
      },
      itemText: {
        color: '#555',
      },
      itemTips: {
        color: '#ccc',
        fontSize: 10,
        minHeight: 10,
        textAlign: 'right',
      },
      itemTipsActive: {
        color: RED_COLOR,
      },
    });

    const {
      activeYear,
      activeMonth,
    } = this.props;
    
    const {
      onRequestClose,
      billByYearItems,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.nav} >
            <Text style={styles.navItem} onPress={() => this.handleOnPressYear(activeYear - 1)} >{activeYear - 1}</Text>
            <Text style={[styles.navItem, styles.navItemActive]} >{activeYear}</Text>
            <Text style={styles.navItem} onPress={() => this.handleOnPressYear(activeYear + 1)} >{activeYear + 1}</Text>
          </View>
          <ScrollView style={styles.wrap} >
            {
              billByYearItems[activeYear] && 
              billByYearItems[activeYear].map((val, key) => {
                return (
                  <BYTouchable 
                    style={styles.item} 
                    key={key} 
                    backgroundColor={'transparent'}
                    onPress={() => this.handleOnPressMonth(val)}
                  >
                    <View style={styles.itemMain} >
                      <Text style={[styles.itemText, key + 1 === activeMonth && styles.itemActive]} >{key + 1}</Text>
                      <Text style={[styles.itemText, key + 1 === activeMonth && styles.itemActive]} >{ val.totalAmount ? priceFormat(val.totalAmount) + ' VND' : 'no bill' } </Text>
                    </View>
                    {
                      <Text style={[styles.itemTips, val.status === 10007 && styles.itemTipsActive]} >{ val.status && billStatusCodes(val.status) }</Text>
                    }
                  </BYTouchable>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    const {
      visible,
      onRequestClose,
    } = this.props;

    return (
      <Modal 
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <Text
          style={styles.mask} 
          onPress={onRequestClose}
        ></Text>
        {this.renderBillSelect()}
      </Modal>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        bill,
        billByYear,
      } = state;
      return {
        isAuthUser: !!state.auth.user,
        activeYear: bill.activeYear,
        activeMonth: bill.activeMonth,
        billByYearItems: billByYear.items,
      }
    }
  },
  {
    ...billActionCreators,
    ...billByYearActionCreators,
  }
)(BillSelect);
