import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import NavBar1 from "../components/NavBar1";
import BYTouchable from "../components/BYTouchable";
import { RED_COLOR } from "../styles/variables";
import { SIDEINTERVAL } from "../common/constants";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

class Settings extends React.Component {

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  // handleOnPressHeaderBackButton = () => {
  //   const { goBack } = this.props.navigation;
  //   goBack();
  // };

  // renderHeaderTitle = () => {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', paddingRight: 60 }}>
  //       <Text style={{ fontSize: 18, color: '#fff' }}>Settings</Text>
  //     </View>
  //   )
  // }

  // renderHeaderRight = () => {
  //   return (
  //     <View></View>
  //   )
  // }
  // 

  handleOnPressLogout() {
    const { i18n, logout, navigation: { goBack } } = this.props;
    Alert.alert(
      '',
      i18n.doYouWantToSignOut,
      [
        {
          text: i18n.cancel,
        },
        {
          text: i18n.signOut,
          onPress: () => {
            logout();
            goBack();
          }
        }
      ]
    )
  }

  render() {
    const {
      bannerHomeRecommend,
      navigation: { navigate },
      i18n 
    } = this.props;

    const navBar1List = [
      {
        iconImg: require('../images/person.png'),
        name: i18n.personalInformation,
        navigate: SCREENS.Login,
        tips: '',
      },
      {
        iconImg: require('../images/osindfaofis.png'),
        name: i18n.securityCenter,
        navigate: SCREENS.Login,
        tips: '',
      },
      {
        iconImg: require('../images/ufifhiufaisfud.png'),
        name: i18n.clearCache,
        navigate: SCREENS.Login,
        tips: '',
      },
      {
        iconImg: require('../images/about.png'),
        name: i18n.about,
        navigate: SCREENS.Login,
        tips: '',
      },
      {
        // iconImg: require('../images/person.png'),
        name: i18n.language,
        navigate: SCREENS.Language,
        tips: '',
      },
    ];
    
    return (
      <View style={styles.container} >
        <BYHeader />
        <ScrollView style={styles.container} >
          <NavBar1 list={navBar1List} navigate={navigate} style={{marginBottom: 30}} styleItemLeft={{flex: 3}} />
          <BYTouchable style={styles.logout} onPress={() => this.handleOnPressLogout()} >
            <Text style={styles.logoutText} >{i18n.signOut}</Text>
          </BYTouchable>
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    return (state, props) => {
      const {
        bannerHomeRecommend,
      } = state;

      // const {

      // } = props;

      return {
        bannerHomeRecommend: bannerHomeRecommend || {}
      }
    }
  },
  {
    ...bannerHomeRecommendActionCreators,
    ...authActionCreators,
  }
)(Settings));
