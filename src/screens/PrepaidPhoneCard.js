import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PrepaidBrand from '../components/PrepaidBrand';
import ButtonSelect from '../components/ButtonSelect';
import CustomIcon from '../components/CustomIcon';
import BYButton from '../components/BYButton';
import BYTouchable from '../components/BYTouchable';
import Loader from '../components/Loader';
import { connectLocalization } from '../components/Localization';

import priceFormat from '../common/helpers/priceFormat';

import { RED_COLOR } from '../styles/variables';
import {
  SIDEINTERVAL,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  PROVIDER_TYPE_MAP,
  MODAL_TYPES,
} from '../common/constants';

import * as getProvidersCardActionCreators from '../common/actions/getProvidersCard';
import * as getProvidersValueActionCreators from '../common/actions/getProvidersValue';
import * as orderCreateActionCreators from '../common/actions/orderCreate';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
  },
});

class PrepaidPhoneCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceIndex: 0,
      payWayIndex: 0,
      numberItemIndex: 0,
      buttonSelectNumber: [
        {
          text: 1,
        },
        {
          text: 2,
        },
        {
          text: 3,
        },
        {
          text: 4,
        },
        {
          text: 5,
        },
      ],
    };

    this.actionSheetCallback = this.actionSheetCallback.bind(this);
    this.prepaidBrandCallback = this.prepaidBrandCallback.bind(this);
    this.buttonSelectPriceCallback = this.buttonSelectPriceCallback.bind(this);
    this.buttonSelectNumberCallback = this.buttonSelectNumberCallback.bind(
      this,
    );
  }

  componentDidMount() {
    const { getProvidersCardFetch } = this.props;
    getProvidersCardFetch();
  }

  buttonSelectPriceCallback(val, key) {
    this.setState({
      priceIndex: key,
    });
  }

  buttonSelectNumberCallback(val, key) {
    this.setState({
      numberItemIndex: key,
    });
  }

  prepaidBrandCallback(val) {
    const { getProvidersValueFetch } = this.props;

    getProvidersValueFetch({
      providerName: val.providerName,
      providerCode: val.providerCode,
      providerType: PROVIDER_TYPE_MAP.phoneCard,
    });
  }

  isProcessSubmit() {
    const {
      priceIndex,
      payWayIndex,
      numberItemIndex,
      buttonSelectNumber,
    } = this.state;

    const {
      loading,
      payWayButtons,
      ProvidersValueItems,
      // ProvidersValueItems,
    } = this.props;

    let result;

    if (
      buttonSelectNumber[numberItemIndex] &&
      buttonSelectNumber[numberItemIndex].text > 0 &&
      loading === false &&
      payWayButtons[payWayIndex] &&
      ProvidersValueItems[priceIndex] &&
      ProvidersValueItems[priceIndex].price > 0
    ) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }

  handleOnPressToggleModal = (key, val) => {
    this.setState({
      [key]: typeof val !== 'boolean' ? !this.state[key] : val,
    });
  };

  handleOnPressSubmit() {
    const {
      priceIndex,
      payWayIndex,
      numberItemIndex,
      buttonSelectNumber,
    } = this.state;

    const {
      payWayButtons,
      ProvidersValueItems,
      orderCreateFetch,
      providerCode,
    } = this.props;

    if (this.isProcessSubmit()) {
      orderCreateFetch({
        BYtype: 'Prepaid',
        BYpayway: payWayButtons[payWayIndex].payway,
        ordertype: '7',
        goodsdetail: JSON.stringify([
          {
            number: buttonSelectNumber[numberItemIndex].text,
            cartitemid: 0,
            productid: ProvidersValueItems[priceIndex].id,
            rechargeaccount: '',
            rechargecode: providerCode,
            repaymentamount: '',
          },
        ]),
      });
    }
  }

  actionSheetCallback(ret) {
    if (ret.buttonIndex < 0) return false;
    this.setState({
      payWayIndex: ret.buttonIndex,
    });
    return true;
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
      },
      title: {
        fontSize: 11,
        color: '#666',
        paddingLeft: SIDEINTERVAL,
        marginBottom: 10,
      },
      payMethod: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        marginBottom: 20,
      },
      payMethodLeft: {
        flex: 1,
        fontSize: 11,
        color: '#666',
      },
      payMethodMiddle: {
        fontSize: 11,
        color: '#333',
        marginRight: 3,
      },
      payMethodRight: {
        fontSize: 8,
        color: '#333',
      },
      price: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: 25,
      },
      priceTitle: {
        fontSize: 10,
        lineHeight: 10 * 1.618,
        color: '#333',
      },
      priceMain: {
        flexDirection: 'row',
      },
      priceRed: {
        color: RED_COLOR,
        fontSize: 18,
        lineHeight: 18 * 1.618,
        marginRight: 5,
      },
      priceGrey: {
        color: '#ccc',
        fontSize: 10,
        paddingTop: 9,
      },
      byButton: {
        backgroundColor: 'rgba(0, 118, 247, 0.5)',
      },
    });

    const {
      payWayIndex,
      priceIndex,
      numberItemIndex,
      buttonSelectNumber,
    } = this.state;

    const {
      openModal,
      providersItems,
      ProvidersValueItems,
      payWayButtons,
      i18n,
    } = this.props;

    const number = buttonSelectNumber[numberItemIndex].text;

    return (
      <View style={stylesX.container}>
        <View style={{ height: 20 }} />
        <Text style={stylesX.title}>Chọn nhà mạng</Text>
        <PrepaidBrand
          data={providersItems}
          callback={this.prepaidBrandCallback}
        />
        <Text style={stylesX.title}>Chọn nhà mạng</Text>
        <ButtonSelect
          data={ProvidersValueItems}
          callback={this.buttonSelectPriceCallback}
        />
        <Text style={stylesX.title}>Chọn mệnh giá và số lượng thẻ</Text>
        <ButtonSelect
          data={buttonSelectNumber}
          style={{ marginBottom: 10 }}
          callback={this.buttonSelectNumberCallback}
        />
        <BYTouchable
          style={stylesX.payMethod}
          onPress={() =>
            openModal(MODAL_TYPES.ACTIONSHEET, {
              callback: ret => this.actionSheetCallback(ret),
              buttons: payWayButtons.map(val => val.text),
            })
          }
        >
          <Text style={stylesX.payMethodLeft}>Payment method</Text>
          <Text style={stylesX.payMethodMiddle}>
            {payWayButtons[payWayIndex].text}
          </Text>
          <CustomIcon style={stylesX.payMethodRight} name="arrowright" />
        </BYTouchable>
        <View style={stylesX.price}>
          <Text style={stylesX.priceTitle}>{i18n.sum}</Text>
          <View style={stylesX.priceMain}>
            <Text style={stylesX.priceRed}>
              {`${ProvidersValueItems[priceIndex] &&
                priceFormat(ProvidersValueItems[priceIndex].price * number)} ₫`}
            </Text>
            {ProvidersValueItems[priceIndex] &&
              ProvidersValueItems[priceIndex].price -
                ProvidersValueItems[priceIndex].orgPrice !==
                0 && (
                <Text style={stylesX.priceGrey}>
                  {`${i18n.reduction} ${priceFormat(
                    ProvidersValueItems[priceIndex].orgPrice * number -
                      ProvidersValueItems[priceIndex].price * number,
                  )} ₫`}
                </Text>
              )}
          </View>
        </View>
        <BYButton
          text={i18n.payment}
          styleWrap={{ marginBottom: 50 }}
          style={!this.isProcessSubmit() && stylesX.byButton}
          onPress={() => this.handleOnPressSubmit()}
        />
      </View>
    );
  }

  render() {
    const {
      // screenProps: { i18n },
      // payWayButtons,
      loading,
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>{this.renderContent()}</ScrollView>
        {loading && <Loader absolutePosition />}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const {
        getProvidersCard,
        getProvidersValue,
        // getProvidersValue,
      } = state;

      // const {

      // } = props;

      return {
        providersItems: getProvidersCard.items,
        loading: getProvidersValue.loading,
        providerCode: getProvidersValue.phoneCard.providerCode,
        ProvidersValueItems: getProvidersValue.phoneCard.items,
        payWayButtons: getProvidersValue.phoneCard.payWayButtons,
      };
    },
    {
      ...getProvidersCardActionCreators,
      ...getProvidersValueActionCreators,
      ...orderCreateActionCreators,
      ...modalActionCreators,
    },
  )(PrepaidPhoneCard),
);
