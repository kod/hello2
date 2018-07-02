import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import BYHeader from '../components/BYHeader';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const { width, height } = Dimensions.get('window');

class MyCollection extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  handleOnPressHeaderBackButton = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  renderHeaderTitle = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingRight: 60 }}>
        <Text style={{ fontSize: 18, color: '#fff' }}>My collection</Text>
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

export default connect(
  () => {
    return (state, props) => {
      const {
        bannerHomeRecommend,
      } = state;

      // const {

      // } = props;

      return {
        bannerHomeRecommend: bannerHomeRecommend || {}
      }
    }
  },
  {
    ...bannerHomeRecommendActionCreators,
  }
)(MyCollection);

// function mapStateToProps(state, props) {
//   const { bannerHomeRecommend } = state;
//   return {
//     bannerHomeRecommend: bannerHomeRecommend || {}
//   };
// }

// export default connect(mapStateToProps, { ...bannerHomeRecommendActionCreators })(MyCollection);
