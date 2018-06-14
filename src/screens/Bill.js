import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import BYModal from "../components/BYModal";
import BYTouchable from "../components/BYTouchable";
import BYTextInput from "../components/BYTextInput";
import BYButton from "../components/BYButton";
import BillSelect from "../components/BillSelect";

import { SIDEINTERVAL, RED_COLOR, PRIMARY_COLOR, WINDOW_WIDTH } from "../styles/variables";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  logout: {
    paddingRight: SIDEINTERVAL,
    paddingLeft: SIDEINTERVAL,
  },
  logoutText: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    color: RED_COLOR,
    fontSize: 14,
  },
})

class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBillSelect: false,
      isOpenPay: false,
      price: '1082500',
    }
  }

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
    this.handleOnPressToggleModal('isOpenPay');
  }

  // handleOnPressHeaderBackButton = () => {
  //   const { goBack } = this.props.navigation;
  //   goBack();
  // };

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
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
      arrow: {
        fontSize: 16,
        color: '#333',
        paddingTop: 2,
      },
    });
    return (
      <BYTouchable 
        style={styles.container} 
        backgroundColor={'transparent'} 
        onPress={() => this.handleOnPressToggleModal('isOpenPay')}
      >
        <Text style={styles.title}>tháng 4</Text>
        <Ionicons style={styles.arrow} name={'ios-arrow-down'} />
      </BYTouchable>
    )
  }

  handleOnPressToggleModal = (key, val) => {
    console.log(key);
    this.setState({
      [key]: typeof val !== 'boolean' ? !this.state[key] : val,
    });
  };
  
  renderPay() {
    const {
      price,
    } = this.state;
    
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
      },
      close: {
        paddingTop: WINDOW_WIDTH * 0.03,
        paddingRight: WINDOW_WIDTH * 0.03,
        marginBottom: 30,
      },
      closeIcon: {
        color: '#ccc',
        fontSize: 24,
        textAlign: 'right',
      },
      title: {
        paddingLeft: SIDEINTERVAL,
        fontSize: 16,
        color: '#999',
        marginBottom: 15,
      },
      wrap: {
        paddingLeft: SIDEINTERVAL,
      },
      enterPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
        marginBottom: 15,
      },
      textInput: {
        flex: 1,
        fontSize: 30,
        color: '#333',
      },
      enterPriceText: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        color: PRIMARY_COLOR,
      },
      tips: {
        paddingLeft: SIDEINTERVAL,
        color: '#ccc',
        fontSize: 11,
        marginBottom: 150,
      },
    });
    return (
      <View style={styles.container} >
        <View style={styles.close}>
          <EvilIcons style={styles.closeIcon} name={'close'} onPress={() => this.handleOnPressToggleModal('isOpenPay')} />
        </View>
        <Text style={styles.title} >Repayment</Text>
        <View style={styles.wrap} >
          <View style={styles.enterPrice} >
            <BYTextInput 
              style={styles.textInput} 
              keyboardType={'numeric'} 
              value={price} 
              onChangeText={(text) => this.setState({ price: text })}
            />
            <Text style={styles.enterPriceText} >change amount</Text>
          </View>
        </View>
        <Text style={styles.tips} >remaining in this period 1.082.500 VND</Text>
        <BYButton text={'pay'} styleWrap={{ marginBottom: SIDEINTERVAL * 2 }} />
      </View>
    )
  }
  
  renderContent() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingLeft: SIDEINTERVAL * 2,
        paddingRight: SIDEINTERVAL * 2,
        paddingTop: SIDEINTERVAL * 2,
        paddingBottom: SIDEINTERVAL * 2,
      },
      main: {
        flex: 1,
        backgroundColor: '#fff',
      },
      topOne: {
        paddingTop: 60,
      },
      price: {
        fontSize: 30,
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
      },
      detailWrap: {
        alignItems: 'center',
        marginBottom: 60,
      },
      detail: {
        fontSize: 11,
        color: PRIMARY_COLOR,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_COLOR,
      },
      button: {
        paddingLeft: SIDEINTERVAL * 2,
        paddingRight: SIDEINTERVAL * 2,
        marginBottom: 10,
      },
      tips: {
        fontSize: 11,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 60,
      },
      bottom: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      bottomText: {
        fontSize: 14,
        color: '#999',
        height: 50,
        lineHeight: 50,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
        textAlign: 'center',
      },
      topTwo: {
        alignItems: 'center',
      },
      image: {
        width: 230,
        height: 230,
      },
      topTwoTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 25,
        paddingLeft: SIDEINTERVAL * 4,
        paddingRight: SIDEINTERVAL * 4,
        flexWrap: 'wrap',
        alignItems: 'center',
      },
      topTwoTextWrap: {
        flexDirection: 'row',
        marginBottom: 25,
      },
      topTwoTextOne: {
        fontSize: 11,
        color: '#ccc',
        marginRight: 5,
      },
      topTwoTextTwo: {
        color: PRIMARY_COLOR,
        fontSize: 11,
      },
    });
    return (
      <View style={styles.container} >
        <View style={styles.main} >
          {/* <View style={styles.topOne} >
            <Text style={styles.price} >1.082.500 VND</Text>
            <View style={styles.detailWrap} >
              <Text style={styles.detail} >query the detail</Text>
            </View>
            <BYButton text={'pay'} styleWrap={styles.button} />
            <Text style={styles.tips} >latest repayment date 5th</Text>
          </View> */}
          <View style={styles.topTwo} >
            <Image style={styles.image} source={require('../images/jafsdbufnl.png')} />
            <Text style={styles.topTwoTitle} >The bill has been paid off this month.</Text>
            <View style={styles.topTwoTextWrap} >
              <Text style={styles.topTwoTextOne} >Has also1.082.500 VND</Text>
              <Text style={styles.topTwoTextTwo} >query the detail</Text>
            </View>
          </View>
          <View style={styles.bottom} >
            <Text style={styles.bottomText} >debt repayment record ></Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const {
      isOpenBillSelect,
      isOpenPay,
    } = this.state;
    const { bannerHomeRecommend, navigation: { navigate }, i18n } = this.props;
    
    return (
      <View style={styles.container} >
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
        <BillSelect 
          visible={isOpenBillSelect}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenBillSelect')}
        />
        <BYModal
          visible={isOpenPay}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenPay')}
        >
          {this.renderPay()}
        </BYModal>

      </View>
    );
  }
}
function mapStateToProps(state, props) {
  const { bannerHomeRecommend } = state;
  return {
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connectLocalization(
  connect(mapStateToProps, { ...bannerHomeRecommendActionCreators, ...authActionCreators })(Bill)
);
