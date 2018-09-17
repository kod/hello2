import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  NativeModules,
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
  }

  componentWillReceiveProps(nextProps) {
    const { rehydrated: prevRehydrated, user: oldUser } = this.props;
    const { rehydrated, user } = nextProps;
    if (oldUser !== user) {
      if (user) {
        NativeModules.IntentHandler.setFunID(user.result);
      } else {
        NativeModules.IntentHandler.setFunID('');
      }
    }
    if (!prevRehydrated && rehydrated) {
      SplashScreen.hide();
    }
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
    user: state.login.user,
  }))(App),
);
