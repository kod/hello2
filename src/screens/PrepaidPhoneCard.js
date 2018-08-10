import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PrepaidBrand from "../components/PrepaidBrand";
import ButtonSelect from "../components/ButtonSelect";
import CustomIcon from '../components/CustomIcon';
import BYButton from '../components/BYButton';
import BYTouchable from '../components/BYTouchable';
import ActionSheet from "../components/ActionSheet";
import Loader from '../components/Loader';
import { connectLocalization } from '../components/Localization';

import priceFormat from '../common/helpers/priceFormat';
import { PROVIDER_TYPE_MAP } from '../common/constants';

import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR, } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';


import * as getProvidersCardActionCreators from '../common/actions/getProvidersCard';
import * as getProvidersValueActionCreators from '../common/actions/getProvidersValue';
import * as orderCreateActionCreators from '../common/actions/orderCreate';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
  },
});

class PrepaidPhoneCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenActionSheet: false,
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
    }

    this.actionSheetCallback = this.actionSheetCallback.bind(this);
    this.prepaidBrandCallback = this.prepaidBrandCallback.bind(this);
    this.buttonSelectPriceCallback = this.buttonSelectPriceCallback.bind(this);
    this.buttonSelectNumberCallback = this.buttonSelectNumberCallback.bind(this);
  }
  
  componentDidMount() {
    const { getProvidersCardFetch } = this.props;
    getProvidersCardFetch()
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
  
  prepaidBrandCallback(val, key) {
    const {
      getProvidersValueFetch,
    } = this.props;

    getProvidersValueFetch({
      providerName: val.providerName,
      providerCode: val.providerCode,
      providerType: PROVIDER_TYPE_MAP['phoneCard'],
    })
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
    } = this.props;

    if (
      buttonSelectNumber[numberItemIndex] && 
      buttonSelectNumber[numberItemIndex].text > 0 && 
      loading === false && 
      payWayButtons[payWayIndex] &&
      ProvidersValueItems[priceIndex] &&
      ProvidersValueItems[priceIndex].price > 0
    ) {
      return true;
    } else {      
      return false;
    }

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
        goodsdetail: JSON.stringify([{
          number: buttonSelectNumber[numberItemIndex].text,
          cartitemid: 0,
          productid: ProvidersValueItems[priceIndex].id,
          rechargeaccount: '',
          rechargecode: providerCode,
          repaymentamount: '',
        }])
      });
    }
  }

  actionSheetCallback(ret) {
    if (ret.buttonIndex < 0) return false;
    this.setState({
      payWayIndex: ret.buttonIndex
    });
  }
  
  renderContent() {
    const styles = StyleSheet.create({
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
        marginBottom: 20
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
      providersItems,
      ProvidersValueItems,
      payWayButtons,
    } = this.props;

    const number = buttonSelectNumber[numberItemIndex].text;
    
    return (
      <View style={styles.container}>
        <View style={{ height: 20 }}></View>
        <Text style={styles.title}>Chọn nhà mạng</Text>
        <PrepaidBrand data={providersItems} callback={this.prepaidBrandCallback} />
        <Text style={styles.title}>Chọn nhà mạng</Text>
        <ButtonSelect data={ProvidersValueItems} callback={this.buttonSelectPriceCallback} />
        <Text style={styles.title}>Chọn mệnh giá và số lượng thẻ</Text>
        <ButtonSelect data={buttonSelectNumber} style={{ marginBottom: 10 }} callback={this.buttonSelectNumberCallback} />
        <BYTouchable style={styles.payMethod} onPress={() => this.handleOnPressToggleModal('isOpenActionSheet')}>
          <Text style={styles.payMethodLeft}>Payment method</Text>
          <Text style={styles.payMethodMiddle}>{payWayButtons[payWayIndex].text}</Text>
          <CustomIcon style={styles.payMethodRight} name="arrowright" />
        </BYTouchable>
        <View style={styles.price}>
          <Text style={styles.priceTitle}>金额</Text>
          <View style={styles.priceMain}>
            <Text style={styles.priceRed}>{ProvidersValueItems[priceIndex] && priceFormat(ProvidersValueItems[priceIndex].price * number )} ₫</Text>
            {
              ProvidersValueItems[priceIndex] && 
              (ProvidersValueItems[priceIndex].price - ProvidersValueItems[priceIndex].orgPrice) !== 0 &&
              <Text style={styles.priceGrey}>(已优惠{priceFormat(ProvidersValueItems[priceIndex].orgPrice * number - ProvidersValueItems[priceIndex].price * number)} ₫)</Text>
            }
          </View>
        </View>
        <BYButton 
          text={'支付'} 
          styleWrap={{ marginBottom: 50 }} 
          style={!this.isProcessSubmit() && styles.byButton} 
          onPress={() => this.handleOnPressSubmit()} 
        />
      </View>
    )
  }
  
  render() {
    const {
      isOpenActionSheet,
    } = this.state;
    
    const {
      screenProps: {i18n},
      payWayButtons,
      loading,
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
        <ActionSheet 
          visible={isOpenActionSheet}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenActionSheet')}
          buttons={payWayButtons.map((val, key) => val.text)}
          callback={this.actionSheetCallback}
        />
        {loading && <Loader absolutePosition />}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          getProvidersCard,
          getProvidersValue,
        } = state;

        // const {

        // } = props;

        return {
          providersItems: getProvidersCard.items,
          loading: getProvidersValue.loading,
          providerCode: getProvidersValue['phoneCard'].providerCode,
          ProvidersValueItems: getProvidersValue['phoneCard'].items,
          payWayButtons: getProvidersValue['phoneCard'].payWayButtons,
        }
      }
    },
    {
      ...getProvidersCardActionCreators,
      ...getProvidersValueActionCreators,
      ...orderCreateActionCreators,
    }
  )(PrepaidPhoneCard),
);
