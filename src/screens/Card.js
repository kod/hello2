import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  // ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  PRIMARY_COLOR,
  // PRIMARY_COLOR,
} from '../styles/variables';
import {
  // WINDOW_HEIGHT,
  SCREENS,
  SIDEINTERVAL,
  // APPBAR_HEIGHT,
  WINDOW_WIDTH,
} from '../common/constants';

import BYHeader from '../components/BYHeader';
import NavBar2 from '../components/NavBar2';
import SeparateBar from '../components/SeparateBar';
import BYButton from '../components/BYButton';
import Loader from '../components/Loader';
import { connectLocalization } from '../components/Localization';

import priceFormat from '../common/helpers/priceFormat';
import { judge } from '../common/helpers';

import * as cardQueryActionCreators from '../common/actions/cardQuery';

const hh8d9sadiua8Jpg = require('../images/hh8d9sadiua8.jpg');
const WechatIMG6104Png = require('../images/WechatIMG6104.png');
const WechatIMG6103Png = require('../images/WechatIMG6103.png');
const jafsdbufnlPng = require('../images/jafsdbufnl.png');
// const kasdifghosjfilPng = require('../images/kasdifghosjfil.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Card extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const {
      cardQueryFetch,
      navigation,
      // isAuthUser,
    } = this.props;

    this.didBlurSubscription = navigation.addListener('didFocus', () => {
      const { isAuthUser } = this.props;

      if (isAuthUser) cardQueryFetch();
    });
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
      title: {
        flex: 1,
        height: 50,
        lineHeight: 50,
        color: '#333',
        textAlign: 'center',
      },
    });

    const { i18n } = this.props;

    return <Text style={stylesX.title}>{i18n.funCard}</Text>;
  };

  renderApplyStatus({ text, onPress }) {
    const stylesX = StyleSheet.create({
      applyStatus: {
        // backgroundColor,
        // paddingLeft: SIDEINTERVAL,
        // paddingRight: SIDEINTERVAL,
        // paddingTop: 20 + APPBAR_HEIGHT,
        // minHeight: 100,
      },
      // cardImage: {
      //   height: 150,
      //   width: 'auto',
      //   resizeMode: 'cover',
      //   marginBottom: 5,
      // },
      swiperWrap: {
        height: 230,
      },
      wrapper: {
        backgroundColor: '#fff',
      },
      slide: {
        flex: 1,
        backgroundColor: 'transparent',
      },
      image: {
        width: WINDOW_WIDTH,
        height: 200,
      },
      dot: {
        backgroundColor: '#e6e6e6',
        width: 5,
        height: 5,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
      },
      activeDot: {
        backgroundColor: '#b3b3b3',
        width: 5,
        height: 5,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
      },
      cardActivationImage: {
        height: 170,
        width: 'auto',
        resizeMode: 'contain',
        marginBottom: 5,
      },
      cardActivationText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
      },
    });

    const { i18n, status } = this.props;

    return (
      <View style={stylesX.applyStatus}>
        {status !== 3 && (
          <View style={stylesX.swiperWrap}>
            <Swiper
              style={stylesX.wrapper}
              dot={<View style={stylesX.dot} />}
              activeDot={<View style={stylesX.activeDot} />}
              paginationStyle={{
                bottom: 15,
              }}
              loop
              autoplay
            >
              <View style={stylesX.slide}>
                <Image
                  style={stylesX.image}
                  source={WechatIMG6103Png}
                  resizeMode="contain"
                />
              </View>
              <View style={stylesX.slide}>
                <Image
                  style={stylesX.image}
                  source={WechatIMG6104Png}
                  resizeMode="contain"
                />
              </View>
              <View style={stylesX.slide}>
                <Image
                  style={stylesX.image}
                  source={hh8d9sadiua8Jpg}
                  resizeMode="contain"
                />
              </View>
            </Swiper>
          </View>
        )}
        {status === 3 && (
          <View>
            <Image style={stylesX.cardActivationImage} source={jafsdbufnlPng} />
            <Text style={stylesX.cardActivationText}>
              {i18n.funCardApplicationSuccessfulPleaseActivate}
            </Text>
          </View>
        )}
        {/* <Image style={stylesX.cardImage} source={kasdifghosjfilPng} /> */}
        <BYButton
          text={text}
          // styleWrap={{ paddingLeft: 0, paddingRight: 0 }}
          style={{ backgroundColor: PRIMARY_COLOR, marginBottom: 30 }}
          styleText={{ color: '#fff', height: 50, lineHeight: 50 }}
          onPress={onPress}
        />
      </View>
    );
  }

  renderCard() {
    const stylesX = StyleSheet.create({
      card: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: 15,
      },
      cardMain: {
        backgroundColor: PRIMARY_COLOR,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
      },
      logoText: {
        textAlign: 'right',
        color: '#0b56af',
        fontWeight: '700',
        fontSize: 14,
        paddingTop: 7,
      },
      title: {
        color: '#fff',
      },
      price: {
        color: '#fff',
        fontSize: 30,
        borderBottomColor: '#82bcf9',
        borderBottomWidth: 1,
        marginBottom: 25,
        paddingBottom: 5,
      },
      info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
      },
      cardId: {
        color: '#7fbbf9',
      },
      cardName: {
        color: '#7fbbf9',
      },
    });

    const {
      i18n,
      item: { availableBalance, cardCode, username },
    } = this.props;

    return (
      <View style={stylesX.container}>
        {/* <BYHeader
          showBackButton={false}
          headerTitle={this.renderHeaderTitle()}
        /> */}
        <View style={stylesX.card}>
          <View style={stylesX.cardMain}>
            <Text style={stylesX.logoText}>{i18n.funCard}</Text>
            <Text style={stylesX.title}>{i18n.availableQuota}</Text>
            <Text style={stylesX.price}>{priceFormat(availableBalance)} ₫</Text>
            <View style={stylesX.info}>
              <Text style={stylesX.cardId}>
                {priceFormat(cardCode, ' ', 4)}
              </Text>
              <Text style={stylesX.cardName}>{username}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderContent() {
    const {
      i18n,
      initPassword,
      msisdn,
      navigation: { navigate },
      status,
      periodHobbit,
      isAuthUser,
    } = this.props;

    return (
      <View style={styles.container}>
        {status === 3 && initPassword === 1 && this.renderCard()}
        {(!isAuthUser || status === 1) &&
          this.renderApplyStatus({
            // backgroundColor: '#147af3',
            text: i18n.applyCreditCard,
            onPress: () =>
              navigate(
                isAuthUser ? SCREENS.CertifiedInformation : SCREENS.Login,
                { isCertify: true },
              ),
          })}
        {status === 2 &&
          this.renderApplyStatus({
            // backgroundColor: '#fa534d',
            text: i18n.successfulApplicationPendingReview,
            // onPress: () => navigate(SCREENS.CertifiedInformation, { isCertify: true })
          })}
        {status === 3 &&
          initPassword === 0 &&
          this.renderApplyStatus({
            // backgroundColor: '#18a873',
            text: i18n.activation,
            onPress: () => {
              navigate(
                isAuthUser ? SCREENS.TransactionPasswordStepOne : SCREENS.Login,
                { from: 'card', msisdn },
              );
            },
          })}
        <SeparateBar />
        {/* <SeparateBar /> */}
        <NavBar2
          onPress={() =>
            judge(status === 3 && initPassword === 1, () =>
              navigate(SCREENS.Bill),
            )
          }
          valueLeft={i18n.myBill}
          // valueMiddle={'on the 5th of each month'}
        />
        {/* <NavBar2
          onPress={() =>
            judge(status === 3 && initPassword === 1, () =>
              navigate(SCREENS.PeriodSelect),
            )
          }
          valueLeft={i18n.stageSetting}
          valueMiddle={periodHobbit ? `${periodHobbit} ${i18n.period}` : ''}
        /> */}
        {/* <SeparateBar /> */}
        <NavBar2
          onPress={() =>
            judge(status === 3 && initPassword === 1, () =>
              navigate(SCREENS.SecurityCenter),
            )
          }
          valueLeft={i18n.securitySettings}
        />
      </View>
    );
  }

  render() {
    const {
      loaded,
      isAuthUser,
      // navigation: { navigate },
    } = this.props;

    if (isAuthUser && !loaded) return <Loader />;

    return (
      <View style={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          showBackButton={false}
          isShowHeaderLine={false}
        />
        {this.renderContent()}
      </View>
    );
  }
}
export default connectLocalization(
  connect(
    state => {
      const {
        cardQuery,
        login,
        // login,
      } = state;
      return {
        loading: cardQuery.loading,
        loaded: cardQuery.loaded,
        initPassword: cardQuery.item.initPassword,
        item: cardQuery.item,
        status: cardQuery.item.status,
        periodHobbit: cardQuery.item.periodHobbit,
        isAuthUser: !!login.user,
        msisdn: login.user ? login.user.msisdn : '',
      };
    },
    {
      ...cardQueryActionCreators,
    },
  )(Card),
);
