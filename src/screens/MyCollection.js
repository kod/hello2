import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import BYHeader from '../components/BYHeader';
import ProductItem2 from '../components/ProductItem2';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import { connectLocalization } from '../components/Localization';

import * as collectionActionCreators from '../common/actions/collection';
// import i18n from '../common/reducers/i18n';

const ouhrigdfnjsoeijehrJpg = require('../images/ouhrigdfnjsoeijehr.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

class MyCollection extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { collectionFetch } = this.props;
    collectionFetch();
  }

  renderContenr() {
    const {
      items,
      // navigation: { navigate },
    } = this.props;

    return (
      <View style={styles.container}>
        <ProductItem2 data={items} />
      </View>
    );
  }

  render() {
    const {
      items,
      loading,
      // navigation: { navigate },
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        {loading && <Loader absolutePosition />}
        {items.length > 0 ? (
          <ScrollView>{this.renderContenr()}</ScrollView>
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
    state => {
      const { collection } = state;

      // const {

      // } = props;

      return {
        loading: collection.loading,
        items: collection.items.details ? collection.items.details : [],
      };
    },
    {
      ...collectionActionCreators,
    },
  )(MyCollection),
);
