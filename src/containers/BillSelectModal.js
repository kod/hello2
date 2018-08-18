import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import { withNavigation } from 'react-navigation';
import { RED_COLOR, PRIMARY_COLOR } from '../styles/variables';
import {
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
} from '../common/constants';

import priceFormat from '../common/helpers/priceFormat';
import { billStatusCodes } from '../common/helpers';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';

import * as billActionCreators from '../common/actions/bill';
import * as billByYearActionCreators from '../common/actions/billByYear';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  mask: {
    backgroundColor: 'transparent',
    height: APPBAR_HEIGHT,
  },
});

class AddressAddModal extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //   };
  // }

  // componentDidMount() {
  //   const {
  //     activeYear,
  //     billByYearFetch,
  //     // navigation: { navigate },
  //     // isAuthUser,
  //   } = this.props;

  //   // if (!isAuthUser) return navigate(SCREENS.Login);

  //   billByYearFetch({
  //     year: activeYear,
  //     init: true,
  //   });
  // }

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleOnPressYear(year) {
    const {
      billYearFetch,
      billByYearFetch,
      // billByYearFetch,
    } = this.props;

    billByYearFetch({
      year,
    });
    billYearFetch(year);
  }

  handleOnPressMonth(val) {
    if (!val.month) return false;
    const {
      billMonthFetch,
      // onRequestClose,
      // onRequestClose,
    } = this.props;

    billMonthFetch(val.month);
    this.handleOnModalClose();
    return false;
  }

  renderContent() {
    const stylesX = StyleSheet.create({
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
        height:
          WINDOW_HEIGHT -
          APPBAR_HEIGHT -
          STATUSBAR_HEIGHT -
          SIDEINTERVAL * 6 -
          50,
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
      // activeMonth,
    } = this.props;

    const {
      i18n,
      // onRequestClose,
      billByYearItems,
      // billByYearItems,
    } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          <View style={stylesX.nav}>
            <Text
              style={stylesX.navItem}
              onPress={() => this.handleOnPressYear(activeYear - 1)}
            >
              {activeYear - 1}
            </Text>
            <Text style={[stylesX.navItem, stylesX.navItemActive]}>
              {activeYear}
            </Text>
            <Text
              style={stylesX.navItem}
              onPress={() => this.handleOnPressYear(activeYear + 1)}
            >
              {activeYear + 1}
            </Text>
          </View>
          <ScrollView style={stylesX.wrap}>
            {billByYearItems[activeYear] &&
              billByYearItems[activeYear].map((val, key) => (
                <BYTouchable
                  style={stylesX.item}
                  key={key}
                  backgroundColor="transparent"
                  onPress={() => this.handleOnPressMonth(val)}
                >
                  <View style={stylesX.itemMain}>
                    <Text
                      style={[
                        stylesX.itemText,
                        key + 1 === activeMonth && stylesX.itemActive,
                      ]}
                    >
                      {key + 1}
                    </Text>
                    <Text
                      style={[
                        stylesX.itemText,
                        key + 1 === activeMonth && stylesX.itemActive,
                      ]}
                    >
                      {val.totalAmount
                        ? `${priceFormat(val.totalAmount)} ₫`
                        : 'no bill'}
                    </Text>
                  </View>
                  {
                    <Text
                      style={[
                        stylesX.itemTips,
                        val.status === 10007 && stylesX.itemTipsActive,
                      ]}
                    >
                      {val.status && billStatusCodes(val.status, i18n)}
                    </Text>
                  }
                </BYTouchable>
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  // render() {
  //   const {
  //     visible,
  //     onRequestClose,
  //     // onRequestClose,
  //   } = this.props;

  //   return (
  //     <Modal
  //       transparent
  //       animationType="fade"
  //       visible={visible}
  //       onRequestClose={onRequestClose}
  //     >
  //       <Text style={styles.mask} onPress={onRequestClose} />
  //       {this.renderContent()}
  //     </Modal>
  //   );
  // }
  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible
        onRequestClose={this.handleOnModalClose}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.mask} onPress={this.handleOnModalClose} />
          {this.renderContent()}
        </View>
      </Modal>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const {
        bill,
        billByYear,
        // billByYear,
      } = state;
      return {
        isAuthUser: !!state.login.user,
        activeYear: bill.activeYear,
        activeMonth: bill.activeMonth,
        billByYearItems: billByYear.items,
      };
    },
    {
      ...billActionCreators,
      ...billByYearActionCreators,
      ...modalActionCreators,
    },
  )(AddressAddModal),
);
