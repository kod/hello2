import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // ScrollView,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
// import NavBar1 from '../components/NavBar1';
// import BYTouchable from '../components/BYTouchable';
// import { RED_COLOR } from '../styles/variables';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  // SCREENS,
} from '../common/constants';

import EmptyState from '../components/EmptyState';
import ProductItem3 from '../components/ProductItem3';
import Loader from '../components/Loader';

import * as findProductsActionCreators from '../common/actions/findProducts';
import * as authActionCreators from '../common/actions/auth';

const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Settings extends Component {
  componentDidMount() {
    const {
      findProductsClear,
      findProductsFetch,
      findcontent,
      // findcontent,
    } = this.props;
    Keyboard.dismiss();
    findProductsClear();
    findProductsFetch({
      findcontent,
    });
  }

  // componentWillUnmount() {
  //   const {
  //     // findProductsClear,
  //   } = this.props;
  // }

  // handleOnPressHeaderBackButton = () => {
  //   const { goBack } = this.props.navigation;
  //   goBack();
  // };

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        paddingRight: WINDOW_WIDTH * 0.07,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#f5f5f5',
        paddingLeft: WINDOW_WIDTH * 0.03,
      },
      headerIcon: {
        fontSize: 18,
        color: '#ccc',
      },
      textInput: {
        flex: 1,
        color: '#333',
        backgroundColor: '#f5f5f5',
        height: 40,
        lineHeight: 40,
        paddingLeft: SIDEINTERVAL * 0.8,
        paddingRight: SIDEINTERVAL * 0.8,
      },
    });

    const {
      findcontent,
      navigation: { goBack },
    } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.header}>
          <MaterialIcons name="search" style={stylesX.headerIcon} />
          <Text style={stylesX.textInput} onPress={() => goBack()}>
            {findcontent}
          </Text>
          {/* <BYTextInput
            underlineColorAndroid="rgba(0,0,0,.0)"
            placeholder={'Search'} 
            placeholderTextColor="#ccc" 
            style={stylesX.textInput}
            value={findcontent}
            editable={false}
            onPress={() => {}}
          /> */}
        </View>
      </View>
    );
  };

  render() {
    const {
      items,
      // navigation: { navigate },
      loading,
      i18n,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          // headerTitle={this.renderHeaderTitle()}
        />
        {loading && <Loader absolutePosition />}
        {items.length > 0 ? (
          <ProductItem3 data={items} style={{ backgroundColor: '#fff' }} />
        ) : (
          !loading && (
            <EmptyState
              source={ouhrigdfnjsoeijehrJpg}
              text={i18n.noData}
              styleText={{ marginBottom: 0 }}
            />
          )
        )}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => (state, props) => {
      const {
        findProducts,
        // findProducts,
      } = state;

      const {
        navigation,
        // navigation,
      } = props;

      return {
        loading: findProducts.loading,
        items: findProducts.items,
        findcontent: navigation.state.params.findcontent,
      };
    },
    {
      ...findProductsActionCreators,
      ...authActionCreators,
    },
  )(Settings),
);
