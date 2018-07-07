import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import BYHeader from '../components/BYHeader';
import ProductItem2 from '../components/ProductItem2';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';

import * as collectionActionCreators from '../common/actions/collection';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
})

class MyCollection extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { collectionFetch } = this.props;
    collectionFetch();
  }

  renderContenr() {
    const {
      items, 
      navigation: { navigate },
    } = this.props;

    console.log(items);

    return (
      <View style={styles.container} >
        <ProductItem2 data={items} />
      </View>
    )
  }
  
  render() {
    const {
      items, 
      loading, 
      navigation: { navigate },
    } = this.props;

    console.log(items);

    return (
      <View style={styles.container} >
        <BYHeader />
        {loading && <Loader absolutePosition />}
        {
          items.length > 0 
          ?
          <ScrollView>
            {this.renderContenr()}
          </ScrollView>
          :
          <EmptyState source={require('../images/ouhrigdfnjsoeijehr.jpg')} text={'爱生活，就不要空空荡荡'} styleText={{marginBottom: 0}} />
        }
      </View>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        collection,
      } = state;

      // const {

      // } = props;

      return {
        loading: collection.loading,
        items: collection.items.details ? collection.items.details : [],
      }
    }
  },
  {
    ...collectionActionCreators,
  }
)(MyCollection);
