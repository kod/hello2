import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BYHeader from '../components/BYHeader';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const { width, height } = Dimensions.get('window');

class Feedback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    bannerHomeRecommendFetch();
  }

  // static navigationOptions = {
  //   header: null,
  //   title: 'Cart',
  //   tabBarIcon: ({ tintColor }) => (
  //     <MaterialIcons name="shopping-cart" size={25} color={tintColor} />
  //   )
  // };

  handleOnPressHeaderBackButton = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  renderHeaderTitle = () => {
    return (
      <View style={{ flex: 1, paddingRight: width * 0.07, }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: '#1c62da', borderRadius: 14, paddingLeft: width * 0.03 }} >
          <MaterialIcons name="search" style={{ fontSize: 18, color: 'rgba(255,255,255,.5)', marginRight: width * 0.01 }} />
          <TextInput autoFocus={true} underlineColorAndroid={'rgba(0,0,0,.0)'} placeholder={'Search'} placeholderTextColor={'rgba(255,255,255,.5)'} style={{ color: '#fff', flex: 1, height: 30, paddingTop: 0, paddingBottom: 0, }} />
        </View>
      </View>
    )
  }

  renderHeaderRight = () => {
    return (
      <View></View>
    )
  }

  render() {
    const { bannerHomeRecommend, navigation: { navigate } } = this.props;
    return (
      <View>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={this.renderHeaderRight()}
          darkTheme
          showBackButton
          onPressBackButton={this.handleOnPressHeaderBackButton}
        />
        <ScrollView style={{ height: height - 25 - 55 }} >
          <FeaturedGoodsItem data={bannerHomeRecommend} />
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  const { bannerHomeRecommend } = state;
  return {
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connect(mapStateToProps, { ...bannerHomeRecommendActionCreators })(Feedback);
