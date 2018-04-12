import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BYHeader from '../components/BYHeader';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';
import BYTouchable from "../components/BYTouchable";
import { connectLocalization } from "../components/Localization";
import { SCREENS } from "../common/constants";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const { width, height } = Dimensions.get('window');

class Settings extends React.Component {
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
        <Text style={{ fontSize: 18, color: '#fff' }}>Settings</Text>
      </View>
    )
  }

  renderHeaderRight = () => {
    return (
      <View></View>
    )
  }

  render() {
    const { bannerHomeRecommend, navigation: { navigate }, i18n } = this.props;
    return (
      <View>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={this.renderHeaderRight()}
          darkTheme
          showBackButton
          onPressBackButton={this.handleOnPressHeaderBackButton}
        />
        <ScrollView style={{ height: height - 25 - 55, }} >
          <View style={{ backgroundColor: '#fff' }} >
            <BYTouchable delayPressIn={0}>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingLeft: width * 0.04, paddingRight: width * 0.02, borderBottomColor: '#eee', borderBottomWidth: StyleSheet.hairlineWidth,  }} >
                <Text style={{ flex: 1, }} >{ i18n.personalInformation }</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, color: '#bbb' }} />
              </View>
            </BYTouchable>
            <BYTouchable delayPressIn={0}>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingLeft: width * 0.04, paddingRight: width * 0.02, borderBottomColor: '#eee', borderBottomWidth: StyleSheet.hairlineWidth,  }} >
                <Text style={{ flex: 1, }} >{ i18n.securityCenter }</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, color: '#bbb' }} />
              </View>
            </BYTouchable>
            <BYTouchable delayPressIn={0}>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingLeft: width * 0.04, paddingRight: width * 0.02, borderBottomColor: '#eee', borderBottomWidth: StyleSheet.hairlineWidth,  }} >
                <Text style={{ flex: 1, }} >{ i18n.clearCache }</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, color: '#bbb' }} />
              </View>
            </BYTouchable>
            <BYTouchable onPress={() => navigate(SCREENS.Language)} delayPressIn={0}>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingLeft: width * 0.04, paddingRight: width * 0.02, borderBottomColor: '#eee', borderBottomWidth: StyleSheet.hairlineWidth,  }} >
                <Text style={{ flex: 1, }} >{ i18n.language }</Text>
                <MaterialIcons name="chevron-right" style={{ fontSize: 26, color: '#bbb' }} />
              </View>
            </BYTouchable>
            <BYTouchable delayPressIn={0}>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, paddingLeft: width * 0.04, paddingRight: width * 0.02, }} >
                <Text style={{ flex: 1, textAlign: 'center' }} >{ i18n.signOut }</Text>
              </View>
            </BYTouchable>
          </View>
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

export default connectLocalization(
  connect(mapStateToProps, { ...bannerHomeRecommendActionCreators })(Settings)
);