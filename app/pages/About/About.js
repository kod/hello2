import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class MainContainer extends React.Component {
  static navigationOptions = {
    header: null,
    title: '关于',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-information-circle" size={25} color={tintColor} />
    )
  };

  render() {
    return (
      <View>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
export default MainContainer;