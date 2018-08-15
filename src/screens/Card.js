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
const hh9834ire843Png = require('../images/hh9834ire843.png');
const hh98344roi34Png = require('../images/hh98344roi34.png');
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
    });

    return (
      <View style={stylesX.applyStatus}>
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
                source={hh98344roi34Png}
                resizeMode="cover"
              />
            </View>
            <View style={stylesX.slide}>
              <Image
                style={stylesX.image}
                source={hh9834ire843Png}
                resizeMode="cover"
              />
            </View>
            <View style={stylesX.slide}>
              <Image
                style={stylesX.image}
                source={hh8d9sadiua8Jpg}
                resizeMode="cover"
              />
            </View>
          </Swiper>
        </View>
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
      item: { availableBalance, cardCode, username },
    } = this.props;

    return (
      <View style={stylesX.container}>
        <BYHeader
          showBackButton={false}
          headerTitle={this.renderHeaderTitle()}
        />
        <View style={stylesX.card}>
          <View style={stylesX.cardMain}>
            <Text style={stylesX.logoText}>Buyoo</Text>
            <Text style={stylesX.title}>available credit</Text>
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
            text: 'apply for a credit card',
            onPress: () =>
              navigate(
                isAuthUser ? SCREENS.CertifiedInformation : SCREENS.Login,
                { isCertify: true },
              ),
          })}
        {status === 2 &&
          this.renderApplyStatus({
            // backgroundColor: '#fa534d',
            text: '申请成功 等待审核中...',
            // onPress: () => navigate(SCREENS.CertifiedInformation, { isCertify: true })
          })}
        {status === 3 &&
          initPassword === 0 &&
          this.renderApplyStatus({
            // backgroundColor: '#18a873',
            text: '激活',
            onPress: () => {
              navigate(
                isAuthUser ? SCREENS.TransactionPasswordStepOne : SCREENS.Login,
                { from: 'card', msisdn },
              );
            },
          })}
        <SeparateBar />
        <SeparateBar />
        <NavBar2
          onPress={() =>
            judge(status === 3 && initPassword === 1, () =>
              navigate(SCREENS.Bill),
            )
          }
          valueLeft="Bill"
          // valueMiddle={'on the 5th of each month'}
        />
        <NavBar2
          onPress={() =>
            judge(status === 3 && initPassword === 1, () =>
              navigate(SCREENS.PeriodSelect),
            )
          }
          valueLeft="Stage setting"
          valueMiddle={periodHobbit ? `${periodHobbit} period` : ''}
        />
        <SeparateBar />
        <NavBar2
          onPress={() =>
            judge(status === 3 && initPassword === 1, () =>
              navigate(SCREENS.SecurityCenter),
            )
          }
          valueLeft="Security Settings"
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
