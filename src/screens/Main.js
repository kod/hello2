import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as newestInfoActionCreators from '../common/actions/newestInfo';

class Main extends React.Component {
  static navigationOptions = {
    header: null,
    title: '分类',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-pricetags" size={25} color={tintColor} />
    )
  };

  render() {
    const { newestInfoFetch } = this.props;
    setTimeout(() => {
      newestInfoFetch();
    }, 5000);
    return (
      <View>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    value: 123
  }
}

export default connect( mapStateToProps , { ...newestInfoActionCreators })(Main);