import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import BYTouchable from "../components/BYTouchable";
import ScrollableTabView from '../components/ScrollableTabView';
import { SIDEINTERVAL, RED_COLOR } from "../styles/variables";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Order extends React.Component {

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40,
        flexDirection: 'row',
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    });
    return (
      <BYTouchable 
        style={styles.container} 
        backgroundColor={'transparent'} 
        onPress={() => this.handleOnPressToggleModal('isOpenPay')}
      >
        <Text style={styles.title}>my order</Text>
      </BYTouchable>
    )
  }

  render() {
    const { bannerHomeRecommend, navigation: { navigate }, i18n } = this.props;

    return (
      <View style={styles.container} >
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        <ScrollableTabView content={content} onChangeTab={this.onChangeTab} />
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

export default connectLocalization(
  connect(mapStateToProps, { ...bannerHomeRecommendActionCreators, })(Order)
);
