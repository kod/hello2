import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import * as productDetailActionCreators from '../common/actions/productDetail';

import { connectLocalization } from '../components/Localization';
import PrepaidTabNavigator from '../navigations/PrepaidTabNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

class Prepaid extends Component {
  renderMainContent() {
    const { screenProps, navigation } = this.props;
    return (
      <View style={styles.container}>
        <PrepaidTabNavigator
          screenProps={{
            ...screenProps,
            mainNavigation: navigation,
          }}
        />
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderMainContent()}</View>;
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const { login } = state;
      return {
        login,
      };
    },
    {
      ...productDetailActionCreators,
    },
  )(Prepaid),
);
