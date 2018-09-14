import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import ProductItem4 from '../components/ProductItem4';
import Loader from '../components/Loader';
import { SIDEINTERVAL } from '../common/constants';

import * as mergeGetInfoActionCreators from '../common/actions/mergeGetInfo';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class GroupBuyList extends Component {
  componentDidMount() {
    const { mergeGetInfoFetch } = this.props;

    mergeGetInfoFetch({
      pagesize: 10,
      currentpage: 1,
    });

    this.state = {
      refreshing: false,
      pullUpState: 'success',
    };

    this.pullUpLoad = this.pullUpLoad.bind(this);
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
    });

    const { items } = this.props;

    return (
      <View style={stylesX.container}>
        <ProductItem4 data={items} groupon />
      </View>
    );
  }

  render() {
    const { loaded } = this.props;

    if (!loaded) return <Loader />;

    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView>{this.renderContent()}</ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const { mergeGetInfo } = state;

      return {
        loading: mergeGetInfo.loading,
        loaded: mergeGetInfo.loaded,
        items: mergeGetInfo.items,
        currentpage: mergeGetInfo.currentpage,
      };
    },
    {
      ...mergeGetInfoActionCreators,
      ...authActionCreators,
    },
  )(GroupBuyList),
);
