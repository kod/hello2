import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import ProductItem1 from "../components/ProductItem1";
import Loader from "../components/Loader";
import { RED_COLOR } from "../styles/variables";
import { SIDEINTERVAL } from "../common/constants";

import * as getAllProductInfoActionCreators from '../common/actions/getAllProductInfo';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

class CateList extends React.Component {

  componentDidMount() {
    const {
      getAllProductInfoFetch,
      parent_id,
      classfy_id,
    } = this.props;
    getAllProductInfoFetch({
      parent_id,
      classfy_id,
    });
  }

  renderContent() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
    });

    const {
      items,
    } = this.props;
    
    return (
      <View style={styles.container} >
        <ProductItem1 data={items} groupon={false} />
      </View>
    )
  }
  
  render() {
    const {
      navigation: { navigate },
      loading, 
    } = this.props;
    
    if (loading) return <Loader />;
    
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

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          getAllProductInfo,
        } = state;

        const {
          navigation
        } = props;

        return {
          loading: getAllProductInfo.loading,
          items: getAllProductInfo.items,
          parent_id: navigation.state.params.parent_id,
          classfy_id: navigation.state.params.classfy_id,
        }
      }
    },
    {
      ...getAllProductInfoActionCreators,
      ...authActionCreators,
    }
  )(CateList)
);
