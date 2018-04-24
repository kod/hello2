import React, { Component } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import { connectLocalization } from '../../components/Localization';

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
        console.log(DURATION.LENGTH_LONG);
        this.toast.show(text);
      },
    );
  }

  componentWillUnmount() {
    this.showToastListener.remove();
  }
  
  render() {
    const { i18n } = this.props;
    return (
      <View style={styles.container} >
        <AppNavigator screenProps={{ i18n }} />
        <Toast 
          ref={ref => (this.toast = ref)} 
          opacity={0.7} 
        />
      </View>
    );
  }
}

export default connectLocalization(App);
