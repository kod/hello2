import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  WebView,
  UIManager,
  Platform,
  InteractionManager,
  DeviceEventEmitter,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { BORDER_COLOR, PRIMARY_COLOR, RED_COLOR, } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, APPBAR_HEIGHT, STATUSBAR_HEIGHT, } from '../common/constants';

import * as productDetailActionCreators from '../common/actions/productDetail';
import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';
import * as cartActionCreators from '../common/actions/cart';

import BYBottomSheet from '../components/BYBottomSheet';
import BYTextInput from '../components/BYTextInput';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import Loader from '../components/Loader';
import PrepaidTabNavigator from "../navigations/PrepaidTabNavigator";
import priceFormat from '../common/helpers/priceFormat';
import { SCREENS } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

class Prepaid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMenuBottomSheet: false,
      productDetail: {},
      menuBottomSheetType: 'select',
      mounting: true,
    };

    // if (Platform.OS === 'android') {
    //   UIManager.setLayoutAnimationEnabledExperimental &&
    //     UIManager.setLayoutAnimationEnabledExperimental(true);
    // }
  }

  componentDidMount() {
    // const {
    //   brandId,
    // } = this.props;

    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({ mounting: false });
    // });
  }

  handleOnPressToggleMenuBottomSheet = type => {
    const newState = {
      isOpenMenuBottomSheet: !this.state.isOpenMenuBottomSheet,
      menuBottomSheetType: type,
    };
    this.setState(newState);
  };

  renderMainContent() {
    const { mounting } = this.state;
    const {
      i18n,
      screenProps,
      navigation,
    } = this.props;
    // if (mounting) {
    //   return <Loader />;
    // }
    
    return (
      <View style={styles.container}>
          <PrepaidTabNavigator screenProps={{
            ...screenProps,
            mainNavigation: navigation,
            // handleOnPressToggleMenuBottomSheet: this.handleOnPressToggleMenuBottomSheet,
          }} 
        />
      </View>
    )
  }

  render() {
    const { isOpenMenuBottomSheet, menuBottomSheetType } = this.state;
    // const {
    //   i18n,
    // } = this.props;

    return (
      <View style={styles.container}>
        {this.renderMainContent()}
        {/* <BYBottomSheet
          visible={isOpenMenuBottomSheet}
          onCancel={this.handleOnPressToggleMenuBottomSheet}
        >
        </BYBottomSheet> */}
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    return (state, props) => {
      const { productDetail, productDetailInfo, mergeGetDetail, mergeGetMaster, mergeCheck } = state;
      // const brandId = props.brandId || props.navigation.state.params.brandId;
      return {
        // isAuthUser: !!state.auth.user,
      };
    };
  }, 
  {
    ...productDetailActionCreators,
  }
)(Prepaid));
