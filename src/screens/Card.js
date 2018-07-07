import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR, } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT } from "../common/constants";

import BYHeader from '../components/BYHeader';
import NavBar2 from '../components/NavBar2';
import SeparateBar from "../components/SeparateBar";
import BYButton from "../components/BYButton";
import Loader from "../components/Loader";
import priceFormat from "../common/helpers/priceFormat";
import { judge } from "../common/helpers";


import { SCREENS } from '../common/constants';

import * as cardQueryActionCreators from "../common/actions/cardQuery";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      cardQueryFetch,
      isAuthUser,
    } = this.props;
    isAuthUser && cardQueryFetch();
  }

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
      title: {
        flex: 1,
        height: 50,
        lineHeight: 50,
        color: '#333',
        textAlign: 'center',
      },
    });
    
    return (
      <Text style={styles.title} >credit card</Text>
    )
  }

  renderApplyStatus({ backgroundColor, text, onPress }) {
    const styles = StyleSheet.create({
      applyStatus: {
        backgroundColor,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: 20 + APPBAR_HEIGHT,
        minHeight: 100,
      },
      cardImage: {
        height: 150,
        width: 'auto',
        resizeMode: 'cover',
        marginBottom: 5,
      },
    });
    
    return (
      <View style={styles.applyStatus} >
        <Image style={styles.cardImage} source={require('../images/kasdifghosjfil.png')} />
        <BYButton 
          text={text} 
          styleWrap={{ paddingLeft: 0, paddingRight: 0 }}
          style={{ backgroundColor: '#fff', marginBottom: 30, }} 
          styleText={{ color: PRIMARY_COLOR, height: 40, lineHeight: 40 }} 
          onPress={onPress} 
        />
      </View>
    )
  }

  renderCard() {
    const styles = StyleSheet.create({
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
      item: { availableBalance, cardCode, username,  },
    } = this.props;
    
    return (
      <View style={styles.container} >
        <BYHeader
          showBackButton={false}
          headerTitle={this.renderHeaderTitle()}
        />
        <View style={styles.card} >
          <View style={styles.cardMain} >
            <Text style={styles.logoText} >Buyoo</Text>
            <Text style={styles.title} >available credit</Text>
            <Text style={styles.price} >{priceFormat(availableBalance)} VND</Text>
            <View style={styles.info} >
              <Text style={styles.cardId} >{priceFormat(cardCode, ' ', 4)}</Text>
              <Text style={styles.cardName} >{username}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderMain() {
    const {
      loading,
      initPassword,
      msisdn,
      navigation: { navigate },
      status,
      periodHobbit,
      isAuthUser,
    } = this.props;
    if (loading) return <Loader />;

    // return (
    //   this.renderApplyStatus({
    //     backgroundColor: '#18a873',
    //     text: '激活 >',
    //     onPress: () => {
    //       navigate( isAuthUser ? SCREENS.TransactionPasswordStepOne : SCREENS.Login, { from: 'card', msisdn })
    //     }
    //   })
    // )

    // return (
    //   this.renderApplyStatus({
    //     backgroundColor: '#147af3',
    //     text: 'apply for a credit card >',
    //     onPress: () => navigate(SCREENS.CertifiedInformation, { isCertify: true })
    //   })
    // )
    
    return (
      <View style={styles.container} >
        {
          status === 3 && initPassword === 1
          &&
          this.renderCard()
        }
        {
          (!isAuthUser || status === 1)
          &&
          this.renderApplyStatus({
            backgroundColor: '#147af3',
            text: 'apply for a credit card >',
            onPress: () => navigate(SCREENS.CertifiedInformation, { isCertify: true })
          })
        }
        {
          status === 2
          &&
          this.renderApplyStatus({
            backgroundColor: '#fa534d',
            text: '申请成功  等待审核中...',
            // onPress: () => navigate(SCREENS.CertifiedInformation, { isCertify: true })
          })
        }
        {
          status === 3 && initPassword === 0
          &&
          this.renderApplyStatus({
            backgroundColor: '#18a873',
            text: '激活 >',
            onPress: () => {
              navigate( isAuthUser ? SCREENS.TransactionPasswordStepOne : SCREENS.Login, { from: 'card', msisdn })
            }
          })
        }
        <NavBar2 
          onPress={() => judge(status === 3 && initPassword === 1, () => navigate(SCREENS.Bill))}
          valueLeft={'Bill'} 
          // valueMiddle={'on the 5th of each month'} 
        />
        <NavBar2 
          onPress={() => judge(status === 3 && initPassword === 1, () => navigate(SCREENS.PeriodSelect))}
          valueLeft={'Stage setting'} 
          valueMiddle={`${periodHobbit} period`} 
        />
        <SeparateBar />
        <NavBar2 
          onPress={() => judge(status === 3 && initPassword === 1, () => navigate(SCREENS.SecurityCenter))}
          valueLeft={'Security Settings'} 
          // valueMiddle={'3 period'} 
        />
      </View>
    )
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    
    return (
      <View style={styles.container} >
        {this.renderMain()}
      </View>
    );
  }
}
export default connect(
  () => {
    return (state, props) => {
      const {
        cardQuery,
        auth,
      } = state;
      return {
        loading: cardQuery.loading,
        initPassword: cardQuery.item.initPassword,
        item: cardQuery.item,
        status: cardQuery.item.status,
        periodHobbit: cardQuery.item.periodHobbit,
        isAuthUser: !!state.auth.user,
        msisdn: auth.user ? auth.user.msisdn : '',
      }
    }
  },
  {
    ...cardQueryActionCreators,
  }
)(Card);