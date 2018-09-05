import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// import moment from 'moment';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
// import SeparateBar from '../components/SeparateBar';

import {
  PRIMARY_COLOR,
  FONT_SIZE_THIRD,
  FONT_COLOR_SECOND,
  FONT_COLOR_FIRST,
  FONT_SIZE_FIRST,
  BORDER_COLOR_FIRST,
  FONT_COLOR_THIRD,
  BACKGROUND_COLOR_SECOND,
  FONT_SIZE_SECOND,
  FONT_COLOR_FOURTH,
  FONT_COLOR_SIXTH,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  STATUSBAR_HEIGHT,
  APPBAR_HEIGHT,
  MODAL_TYPES,
} from '../common/constants';

import * as billDetailsActionCreators from '../common/actions/billDetails';
import * as modalActionCreators from '../common/actions/modal';
// import priceFormat from '../common/helpers/priceFormat';

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

class StagingDetails extends Component {
  componentDidMount() {
    const {
      // billDetailsFetch,
      // isAuthUser,
      // navigation: { navigate },
      openModal,
    } = this.props;
    // if (!isAuthUser) return navigate(SCREENS.Login);
    openModal(MODAL_TYPES.STAGINGDETAILS);
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: BORDER_COLOR_FIRST,
        borderBottomWidth: 1,
      },
      itemLeft: {
        width: WINDOW_WIDTH * 0.1,
        color: FONT_COLOR_FIRST,
        textAlign: 'center',
        fontSize: FONT_SIZE_THIRD,
      },
      itemMiddle: {
        flex: 1,
      },
      itemMiddleTop: {
        color: FONT_COLOR_FIRST,
        flexWrap: 'wrap',
        marginBottom: 5,
      },
      itemMiddleBottom: {
        flexDirection: 'row',
      },
      itemMiddleBottomLeft: {
        flex: 1,
        fontSize: FONT_SIZE_THIRD,
        color: FONT_COLOR_THIRD,
      },
      itemMiddleBottomRight: {
        flex: 1,
        fontSize: FONT_SIZE_FIRST,
        color: FONT_COLOR_THIRD,
        textAlign: 'right',
        paddingTop: 5,
      },
      itemRight: {
        width: WINDOW_WIDTH * 0.1,
        color: FONT_COLOR_SECOND,
        fontSize: FONT_SIZE_THIRD,
        textAlign: 'center',
      },
      main: {
        backgroundColor: BACKGROUND_COLOR_SECOND,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
      },
      mainLeft: {
        flex: 1,
        paddingLeft: SIDEINTERVAL,
      },
      mainLeftTop: {
        color: FONT_COLOR_FIRST,
        marginBottom: 5,
      },
      mainLeftBottom: {
        color: FONT_COLOR_THIRD,
        fontSize: FONT_SIZE_SECOND,
      },
      mainRight: {
        width: WINDOW_WIDTH * 0.1,
        color: FONT_COLOR_FIRST,
        textAlign: 'center',
      },
      itemPrice: {},
      itemAlready: {
        color: FONT_COLOR_FOURTH,
      },
      itemOverdue: {
        color: FONT_COLOR_SIXTH,
      },
    });

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          <View style={stylesX.mainLeft}>
            <Text style={stylesX.mainLeftTop}>apple iphone 6fasdfo asdfjoasdf</Text>
            <Text style={stylesX.mainLeftBottom}>2109-32-23</Text>
          </View>
          <Ionicons style={stylesX.mainRight} name="ios-arrow-forward" />
        </View>
        <View style={stylesX.item}>
          <Entypo
            style={[stylesX.itemLeft, stylesX.itemAlready]}
            name="dot-single"
          />
          <View style={stylesX.itemMiddle}>
            <Text style={[stylesX.itemMiddleTop, stylesX.itemAlready]}>1/6期</Text>
            <Text style={[stylesX.itemMiddleBottom, stylesX.itemAlready]}>已还</Text>
          </View>
          <Text style={stylesX.itemPrice}>3.323.400</Text>
          <Ionicons style={stylesX.itemRight} name="ios-arrow-forward" />
        </View>
        <View style={stylesX.item}>
          <Entypo
            style={[stylesX.itemLeft, stylesX.itemOverdue]}
            name="dot-single"
          />
          <View style={stylesX.itemMiddle}>
            <Text style={[stylesX.itemMiddleTop, stylesX.itemOverdue]}>2/6期</Text>
            <Text style={[stylesX.itemMiddleBottom, stylesX.itemOverdue]}>逾期</Text>
          </View>
          <Text style={stylesX.itemPrice}>3.323.400</Text>
          <Ionicons style={stylesX.itemRight} name="ios-arrow-forward" />
        </View>
        <View style={stylesX.item}>
          <Entypo style={stylesX.itemLeft} name="dot-single" />
          <View style={stylesX.itemMiddle}>
            <Text style={stylesX.itemMiddleTop}>3/6期</Text>
            <Text style={stylesX.itemMiddleBottom}>待还</Text>
          </View>
          <Text style={stylesX.itemPrice}>3.323.400</Text>
          <Ionicons style={stylesX.itemRight} name="ios-arrow-forward" />
        </View>
        <View style={stylesX.item}>
          <Entypo style={stylesX.itemLeft} name="dot-single" />
          <View style={stylesX.itemMiddle}>
            <Text style={stylesX.itemMiddleTop}>6/6期</Text>
            <Text style={stylesX.itemMiddleBottom}>待还</Text>
          </View>
          <Text style={stylesX.itemPrice}>3.323.400</Text>
          <Ionicons style={stylesX.itemRight} name="ios-arrow-forward" />
        </View>
      </View>
    );
  }

  render() {
    const {
      // navigation: { goBack },
      i18n,
      // billDetailsItem,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader title={i18n.stagingDetails} />
        <ScrollView>{this.renderContent()}</ScrollView>
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
        // id: navigation.state.params.id,
        billDetailsItem: billDetails.item,
        activeMonth: bill.activeMonth,
      };
    },
    {
      ...billDetailsActionCreators,
      ...modalActionCreators,
    },
  )(StagingDetails),
);
