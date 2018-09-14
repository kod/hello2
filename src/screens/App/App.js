import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Linking,
  // DeviceEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { connectLocalization } from '../../components/Localization';
import BYStatusBar from '../../components/BYStatusBar';
import Loader from '../../components/Loader';

import ModalRoot from '../../containers/ModalRoot';

import AppNavigator from '../../navigations/AppNavigator';

import NavigatorService from '../../navigations/NavigatorService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class App extends Component {
  componentDidMount() {
    const { rehydrated } = this.props;
    if (rehydrated) {
      // call when reopen app after exit by back button on android
      SplashScreen.hide();
    }
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillReceiveProps(nextProps) {
    const { rehydrated: prevRehydrated } = this.props;
    const { rehydrated } = nextProps;
    if (!prevRehydrated && rehydrated) {
      SplashScreen.hide();
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    // TODO Handle url
    console.log(event.url);
  }

  render() {
    const { i18n, rehydrated } = this.props;
    let renderComponent;
    if (!rehydrated) {
      renderComponent = <Loader />;
    } else {
      renderComponent = (
        <AppNavigator
          screenProps={{ i18n }}
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
        />
      );
    }
    return (
      <View style={styles.container}>
        {renderComponent}
        <BYStatusBar />
        <ModalRoot />
      </View>
    );
  }
}

export default connectLocalization(
  connect(state => ({
    rehydrated: state.auth.rehydrated,
  }))(App),
);
