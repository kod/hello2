import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BYHeader from '../components/BYHeader';
import HeaderShareButton from '../components/HeaderShareButton';
import ScrollableTabView from '../components/ScrollableTabView';

class Feedback extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Cart',
    tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="shopping-cart" size={25} color={tintColor} />
    )
  };

  handleOnPressHeaderBackButton = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  renderHeaderTitle = () => {
    return (
      <View style={{ flex: 1 }} >
        <Text style={{ fontSize: 18, color: '#fff' }} >Sản phẩm</Text>
      </View>
    )
  }

  renderHeaderRight = () => {
    return (
      <View>
        <HeaderShareButton />
      </View>
    )
  }

  render() {
    return (
      <View>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={this.renderHeaderRight()}
          darkTheme
          showBackButton
          onPressBackButton={this.handleOnPressHeaderBackButton}
        />
        <ScrollView>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail</Text>
          <Text>productDetail1</Text>
          <Text>productDetail2</Text>
          <Text>productDetail3</Text>
          <Text>productDetail4</Text>
          <Text>productDetail5</Text>
          <Text>productDetail6</Text>
          <Text>productDetail7</Text>
          <Text>productDetail8</Text>
          <Text>productDetail9</Text>
        </ScrollView>
      </View>
    );
  }
}
export default Feedback;