import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Category extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Cate',
    tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="grade" size={25} color={tintColor} />
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
export default Category;