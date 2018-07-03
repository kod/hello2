import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PrepaidBrand from "../components/PrepaidBrand";
import ButtonSelect from "../components/ButtonSelect";
import CustomIcon from "../components/CustomIcon";
import BYButton from "../components/BYButton";
import BYTouchable from "../components/BYTouchable";
import ActionSheet from "../components/ActionSheet";

import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR, } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from "../common/constants";


import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
  },
});

class PrepaidScratchCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenActionSheet: false,
      payWayButtons: ['信用卡', '网银'],
    }

    this.actionSheetCallback = this.actionSheetCallback.bind(this);
  }
  
  componentDidMount() {
    const { bannerSwiperFetch } = this.props;
    
  }

  buttonSelectPriceCallback(val, key) {
    console.log(val);
    console.log(key);
  }
  
  handleOnPressToggleModal = (key, val) => {
    this.setState({
      [key]: typeof val !== 'boolean' ? !this.state[key] : val,
    });
  };

  actionSheetCallback(ret) {
    console.log(ret);
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
    });

    const buttonSelectPrice = [
      {
        text: '50,000 vnd',
      },
      {
        text: '60,000 vnd',
      },
      {
        text: '70,000 vnd',
      },
      {
        text: '80,000 vnd',
      },
    ]

    const buttonSelectNumber = [
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
    ]
    
    return (
      <View style={styles.container} >
        <View style={{ height: 20 }} ></View>
        <Text style={styles.title} >Chọn nhà mạng</Text>
        <PrepaidBrand />
        <Text style={styles.title} >Chọn nhà mạng</Text>
        <ButtonSelect data={buttonSelectPrice} callback={this.buttonSelectPriceCallback} />
        <Text style={styles.title} >Chọn mệnh giá và số lượng thẻ</Text>
        <ButtonSelect data={buttonSelectNumber} style={{ marginBottom: 10 }} />
        <BYTouchable style={styles.payMethod} onPress={() => this.handleOnPressToggleModal('isOpenActionSheet')} >
          <Text style={styles.payMethodLeft} >Payment method</Text>
          <Text style={styles.payMethodMiddle} >Balance</Text>
          <CustomIcon style={styles.payMethodRight} name={'arrowright'} />
        </BYTouchable>
        <View style={styles.price} >
          <Text style={styles.priceTitle} >金额</Text>
          <View style={styles.priceMain} >
            <Text style={styles.priceRed} >49.000 VND</Text>
            <Text style={styles.priceGrey} >(已优惠1000VND)</Text>
          </View>
        </View>
        <BYButton text={'支付'} styleWrap={{ marginBottom: 50 }} />
      </View>
    )
  }
  
  render() {
    const {
      isOpenActionSheet,
      payWayButtons,
    } = this.state;
    
    const {
      screenProps: {i18n},
    } = this.props;

    return (
      <View style={styles.container} >
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
        <ActionSheet 
          visible={isOpenActionSheet}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenActionSheet')}
          buttons={payWayButtons}
          callback={this.actionSheetCallback}
        />
      </View>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        comment,
      } = state;

      // const {

      // } = props;

      return {
        comment: comment.items.detail ? comment.items.detail : [],
      }
    }
  },
  {
    ...productDetailInfoActionCreators,
  }
)(PrepaidScratchCards);
