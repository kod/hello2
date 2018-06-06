import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { SCREENS } from "../common/constants";

import ProductItem2 from "../components/ProductItem2";
import NavBar2 from "../components/NavBar2";
import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import BYTouchable from "../components/BYTouchable";
import BYModal from "../components/BYModal";
import Address from "../components/Address";

import { SIDEINTERVAL, RED_COLOR, PRIMARY_COLOR, WINDOW_WIDTH, WINDOW_HEIGHT } from "../styles/variables";

import { getAddressSelectedItem } from "../common/selectors";

import * as addressActionCreators from '../common/actions/address';
import * as authActionCreators from '../common/actions/auth';
import { addressJoin } from "../common/helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bar: {
    backgroundColor: '#f5f5f5',
    height: 5,
  },
  totalPrice: {
    height: 40,
    lineHeight: 40,
    textAlign: 'right',
    color: RED_COLOR,
    fontSize: 14,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  title: {
    height: 40,
    lineHeight: 40,
    paddingLeft: SIDEINTERVAL,
    color: '#333',
  },
  payment: {
    flexDirection: 'row',
    paddingLeft: SIDEINTERVAL,
    flexWrap: 'wrap',
  },
  paymentItem: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    borderColor: '#eee',
    borderWidth: 1,
  },
  paymentItemActive: {
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 0,
  },
  alertIcon: {
    color: RED_COLOR,
    // backgroundColor: RED_COLOR,
    fontSize: 16,
  },
  status: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL,
    backgroundColor: '#E0E3EF',
    color: '#666',
    lineHeight: 24,
  },
});

class OrderWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBottomSheet: false,
    };
  }

  componentDidMount() {
    const {
      authUser,
      addressFetch,
    } = this.props;
    console.log(authUser);
    if (authUser) {
      addressFetch();
    }
    console.log(this.props);
    console.log('11111111111111111');

    // setTimeout(() => {
    //   this.handleOnPressToggleBottomSheet();
    // }, 300);
  }

  handleOnPressToggleBottomSheet = (type) => {
    const {
      isOpenBottomSheet,
    } = this.state;

    // const {
    //   cityInfosFetch,
    //   division2ndItems,
    // } = this.props;

    // if (!isOpenBottomSheet && division2ndItems.length === 0) {
    //   cityInfosFetch(1, 'division2nd');
    // }
    
    this.setState({
      isOpenBottomSheet: typeof type !== 'boolean' ? !isOpenBottomSheet : type,
    });
  };

  renderBottom() {
    const styles = StyleSheet.create({
      nav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
      },
      navLeft: {
        flex: 1,
      },
      navLeftTop: {
        color: RED_COLOR,
        fontSize: 11,
        textAlign: 'center',
        paddingTop: 10,
      },
      navLeftBottom: {
        color: RED_COLOR,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
      },
      navCancel: {
        flex: 1,
        height: 55,
        lineHeight: 55,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#ccc',
      },
      navRight: {
        flex: 1,
        height: 55,
        lineHeight: 55,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: PRIMARY_COLOR,
      },
    });

    return (
      <View style={styles.nav} >
        <View style={styles.navLeft} >
          <Text style={styles.navLeftTop} >Trà lần đầu</Text>
          <Text style={styles.navLeftBottom} >31.095.000 VND</Text>
        </View>
        <Text style={styles.navCancel} >Cancel Order</Text>
        <Text style={styles.navRight} >Submit</Text>
      </View>
    )
  }

  renderBottomSheet() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
      },
      closeWrap: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      close: {
        paddingTop: SIDEINTERVAL,
        fontSize: 24,
        color: '#666',
      },
      scrollview: {
        height: WINDOW_HEIGHT * 0.5,
      },
      title: {
        flexDirection: 'row',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
      },
      titleItem: {
        color: '#333',
        width: WINDOW_WIDTH / 3,
        height: 45,
        lineHeight: 45,
        textAlign: 'center',
      },
      item: {
        flexDirection: 'row',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
      },
      itemText: {
        color: '#666',
        width: WINDOW_WIDTH / 3,
        height: 45,
        lineHeight: 45,
        textAlign: 'center',
      },
    });
    
    return (
      <View style={styles.container} >
        <BYTouchable style={styles.closeWrap} onPress={() => this.handleOnPressToggleBottomSheet()} >
          <EvilIcons style={styles.close} name="close" />
        </BYTouchable>
        <View style={styles.title} >
          <Text style={styles.titleItem} >periods</Text>
          <Text style={styles.titleItem} >supply</Text>
          <Text style={styles.titleItem} >principalprincipal</Text>
        </View>
        <ScrollView style={styles.scrollview} >
          <View style={styles.item} >
            <Text style={styles.itemText} >1st periods</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
          </View>
          <View style={styles.item} >
            <Text style={styles.itemText} >1st periods</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
          </View>
          <View style={styles.item} >
            <Text style={styles.itemText} >1st periods</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
          </View>
          <View style={styles.item} >
            <Text style={styles.itemText} >1st periods</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
          </View>
          <View style={styles.item} >
            <Text style={styles.itemText} >1st periods</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
          </View>
          <View style={styles.item} >
            <Text style={styles.itemText} >1st periods</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
          </View>
          <View style={styles.item} >
            <Text style={styles.itemText} >1st periods</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
          </View>
          <View style={styles.item} >
            <Text style={styles.itemText} >1st periods</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
          </View>
          <View style={styles.item} >
            <Text style={styles.itemText} >1st periods</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
            <Text style={styles.itemText} >4349.230.43</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
  
  render() {
    const {
      isOpenBottomSheet,
    } = this.state;
    
    const {
      navigation: { navigate },
      i18n,
      addressItems,
      addressSelectedItem,
    } = this.props;

    const adverstInfo = [{
      brandId: "114",
      classfyId: 14,
      createTime: "2017-12-12 16:13:18",
      createUser: "admin",
      desc: "",
      id: 38,
      imageUrl: "https://vnoss.buyoo.club/commodity/img/brand/1512992801550_X541UA-GO1345-01.jpg",
      maxprice: 9490000,
      minprice: 9490000,
      name: "Asus X541UA-GO1345",
      orgPrice: 9490000,
      position: 3,
      price: 9490000,
      status: "1",
      typeId: 2,
      updateTime: "2017-12-12 16:13:18",
    }];
    
    return (
      <View style={styles.container} >
        <BYHeader />
        <ScrollView>
          <Text style={styles.status} >Order submitted, 3 working days will be sent to you Cell phone</Text>
          <Address
            addressSelectedItem={addressSelectedItem} 
            // onPress={() => navigate(SCREENS.Address, { isSelect: true })} 
          />
          <View style={styles.bar} ></View>
          <ProductItem2 
            data={adverstInfo}
            stylePricePrice={{ color: '#666' }}
            isShowNumber={true}
          />
          <Text style={styles.totalPrice} >1.988.400 VND</Text>
          <View style={styles.bar} ></View>
          <NavBar2 
            // onPress={() => navigate(SCREENS.Settings)} 
            valueLeft={'Staging plans'} 
            valueMiddle={'622.375 VND x 12period'} 
          />
          <NavBar2 
            // onPress={() => this.handleOnPressToggleBottomSheet()}
            valueLeft={'Coupon value'} 
            valueMiddle={'none'} 
            isShowRight={false}
          />
          <NavBar2 
            valueLeft={'First payment'} 
            valueMiddle={'3.095.000 VND'} 
            isShowRight={false}
            backgroundColor={'transparent'}
          />

        </ScrollView>
        {this.renderBottom()}
        <BYModal
          visible={isOpenBottomSheet}
          onRequestClose={this.handleOnPressToggleBottomSheet}
        >
          {this.renderBottomSheet()}
        </BYModal>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          address,
        } = state;

        const {
          orderNo,
          tradeNo,
        } = props.navigation.state.params;

        return {
          addressSelectedItem: getAddressSelectedItem(state, props),
          addressItems: address.items,
          authUser: !!state.auth.user,
          orderNo,
          tradeNo,
        }
      }
    },
    {
      ...addressActionCreators,
      ...authActionCreators,
    }
  )(OrderWrite)
);
