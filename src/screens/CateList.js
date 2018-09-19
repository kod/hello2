/* eslint-disable camelcase */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import ProductItem1A from '../components/ProductItem1A';
import EmptyState from '../components/EmptyState';
// import Loader from '../components/Loader';
// import { RED_COLOR } from '../styles/variables';
import { SIDEINTERVAL } from '../common/constants';

import * as getAllProductInfoActionCreators from '../common/actions/getAllProductInfo';
import * as authActionCreators from '../common/actions/auth';
import { getGetAllProductInfoItems } from '../common/selectors';

const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class CateList extends Component {
  componentDidMount() {
    const {
      getAllProductInfoFetch,
      getAllProductInfoClear,
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
    } = this.props;
    getAllProductInfoClear();
    getAllProductInfoFetch({
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
    });
  }

  handleOnRefresh = () => {
    const {
      getAllProductInfoFetch,
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
      getAllProductInfoClear,
    } = this.props;
    getAllProductInfoClear();
    getAllProductInfoFetch({
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
    });
  };

  loadMoreItems = () => {
    const {
      getAllProductInfo,
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
      getAllProductInfoFetch,
    } = this.props;
    if (
      getAllProductInfo &&
      !getAllProductInfo.loading &&
      getAllProductInfo.currentPage < getAllProductInfo.totalPage
    ) {
      getAllProductInfoFetch({
        parent_id,
        classfy_id,
        sub_classfy_id,
        third_classfy_id,
        currentPage: getAllProductInfo.currentPage + 1,
      });
    }
  };

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
    });

    const { items, getAllProductInfo, i18n, loaded } = this.props;

    return (
      <View style={stylesX.container}>
        <ProductItem1A
          data={{ ...getAllProductInfo, items }}
          onRefresh={this.handleOnRefresh}
          loadMoreItems={this.loadMoreItems}
          groupon={false}
        />
        {loaded &&
          items.length === 0 && (
            <EmptyState
              source={ouhrigdfnjsoeijehrJpg}
              text={i18n.noData}
              styleText={{ marginBottom: 0 }}
            />
          )}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <BYHeader />
        {this.renderContent()}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    (state, props) => {
      const {
        getAllProductInfo,
        // getAllProductInfo,
      } = state;

      const {
        navigation,
        // navigation,
      } = props;

      return {
        getAllProductInfo,
        loading: getAllProductInfo.loading,
        loaded: getAllProductInfo.loaded,
        // items: [],
        items: getGetAllProductInfoItems(state, props),
        // items: getAllProductInfo.items,
        parent_id: navigation.state.params.parent_id,
        classfy_id: navigation.state.params.classfy_id,
        sub_classfy_id: navigation.state.params.sub_classfy_id,
        third_classfy_id: navigation.state.params.third_classfy_id,
      };
    },
    {
      ...getAllProductInfoActionCreators,
      ...authActionCreators,
    },
  )(CateList),
);
