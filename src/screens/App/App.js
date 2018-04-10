import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { connectLocalization } from '../../components/Localization';

import AppNavigator from '../../navigations/AppNavigator';

class App extends Component {
  render() {
    const { i18n } = this.props;
    return <AppNavigator screenProps={{ i18n }} />;
  }
}

export default connectLocalization(App);
