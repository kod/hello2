import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import NavBar2 from '../components/NavBar2';
import { RED_COLOR } from '../styles/variables';
import { SIDEINTERVAL, SCREENS } from '../common/constants';

// import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

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
});

class SecurityCenter extends Component {
  // componentDidMount() {
  //   const { bannerHomeRecommendFetch } = this.props;
  //   // bannerHomeRecommendFetch();
  // }

  // handleOnPressHeaderBackButton = () => {
  //   const { goBack } = this.props.navigation;
  //   goBack();
  // };

  // renderHeaderTitle = () => {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', paddingRight: 60 }}>
  //       <Text style={{ fontSize: 18, color: '#fff' }}>SecurityCenter</Text>
  //     </View>
  //   )
  // }

  // renderHeaderRight = () => {
  //   return (
  //     <View />
  //   )
  // }
  //

  renderContent() {
    const {
      i18n,
      navigation: { navigate },
    } = this.props;

    return (
      <View style={styles.container}>
        <NavBar2
          onPress={() => navigate(SCREENS.TransactionPasswordStepOne)}
          valueLeft={i18n.cardPassword}
          // valueMiddle={'884.000 ₫'}
          styleLeft={{ color: '#666' }}
          // styleMiddle={{ color: '#666' }}
          // isShowRight={false}
          // backgroundColor="transparent"
        />
        <NavBar2
          onPress={() => {}}
          valueLeft={i18n.loginPassword}
          // valueMiddle={'884.000 ₫'}
          styleLeft={{ color: '#666' }}
          // styleMiddle={{ color: '#666' }}
          // isShowRight={false}
          // backgroundColor="transparent"
        />
      </View>
    );
  }

  render() {
    // const { i18n } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView>{this.renderContent()}</ScrollView>
      </View>
    );
  }
}

export default connectLocalization(connect(SecurityCenter));
