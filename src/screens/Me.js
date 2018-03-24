import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class About extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Me',
    tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="account-circle" size={25} color={tintColor} />
    )
  };

  render() {
    return (
      <View>
        <Text>Me</Text>
      </View>
    );
  }
}
export default About;