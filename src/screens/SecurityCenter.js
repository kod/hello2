import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import NavBar2 from "../components/NavBar2";
import BYTouchable from "../components/BYTouchable";
import { SIDEINTERVAL, RED_COLOR } from "../styles/variables";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logout: {
    paddingRight: SIDEINTERVAL,
    paddingLeft: SIDEINTERVAL,
  },
  logoutText: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    color: RED_COLOR,
    fontSize: 14,
  },
})

class Settings extends React.Component {

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  // handleOnPressHeaderBackButton = () => {
  //   const { goBack } = this.props.navigation;
  //   goBack();
  // };

  // renderHeaderTitle = () => {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', paddingRight: 60 }}>
  //       <Text style={{ fontSize: 18, color: '#fff' }}>Settings</Text>
  //     </View>
  //   )
  // }

  // renderHeaderRight = () => {
  //   return (
  //     <View></View>
  //   )
  // }
  // 

  renderContent() {
    const styles = StyleSheet.create({
      container: {},
    });

    const {
      navigation: { navigate },
    } = this.props;
    
    return (
      <View style={styles.container} >
        <NavBar2 
          onPress={() => navigate(SCREENS.TransactionPasswordStepOne)}
          valueLeft={'Payment password'} 
          // valueMiddle={'884.000 VND'} 
          styleLeft={{ color: '#666' }}
          // styleMiddle={{ color: '#666' }}
          // isShowRight={false}
          // backgroundColor={'transparent'}
        />
        <NavBar2 
          onPress={() => {}}
          valueLeft={'Login password'} 
          // valueMiddle={'884.000 VND'} 
          styleLeft={{ color: '#666' }}
          // styleMiddle={{ color: '#666' }}
          // isShowRight={false}
          // backgroundColor={'transparent'}
        />
      </View>
    )
  }

  render() {
    const { bannerHomeRecommend, navigation: { navigate }, i18n } = this.props;
    
    return (
      <View style={styles.container} >
        <BYHeader />
        <ScrollView>
          {this.renderContent()}
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
  connect(mapStateToProps, { ...bannerHomeRecommendActionCreators, })(Settings)
);