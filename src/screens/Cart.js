import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Feedback extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Cart',
    tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="shopping-cart" size={25} color={tintColor} />
    )
  };

  render() {
    return (
      <View>
        <Text>Cart</Text>
      </View>
    );
  }
}
export default Feedback;