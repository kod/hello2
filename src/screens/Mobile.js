import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

// import { SCREENS } from '../common/constants';
import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
// import NavBar1 from '../components/NavBar1';
// import BYTouchable from '../components/BYTouchable';
import Scrollable2 from '../components/Scrollable2';
// import { RED_COLOR } from '../styles/variables';

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Mobile extends Component {
  render() {
    const {
      // navigation: { navigate },
      i18n,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader title={i18n.mobileCommunications} />
        <ScrollView>
          <Scrollable2 i18n={i18n} />
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    state => {
      const {
        bannerHomeRecommend,
        // bannerHomeRecommend,
        login,
      } = state;

      // const {

      // } = props;

      return {
        isAuthUser: !!login.user,
        bannerHomeRecommend: bannerHomeRecommend || {},
      };
    },
    {
      ...bannerHomeRecommendActionCreators,
    },
  )(Mobile),
);
