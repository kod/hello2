import React, { Component } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import { connect } from "react-redux";
import Toast, { DURATION } from 'react-native-easy-toast';
import { connectLocalization } from '../../components/Localization';
import BYStatusBar from '../../components/BYStatusBar';
import Loader from '../../components/Loader';

import AppNavigator from '../../navigations/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class App extends Component {
  componentDidMount() {
    this.showToastListener = DeviceEventEmitter.addListener(
      'showToast',
      text => {
        this.toast.show(text);
      },
    );
  }

  componentWillUnmount() {
    this.showToastListener.remove();
  }
  
  render() {
    const { i18n, rehydrated } = this.props;
    let renderComponent;
    if (!rehydrated) {
      renderComponent = <Loader />;
    } else {
      renderComponent = <AppNavigator screenProps={{ i18n }} />;
    }
    return (
      <View style={styles.container} >
        {renderComponent}
        <BYStatusBar />
        <Toast 
          ref={ref => (this.toast = ref)} 
          opacity={0.7} 
        />
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    state => ({
      rehydrated: state.auth.rehydrated,
    })
  )(App)
);
