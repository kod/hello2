import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import ProductItem1 from '../components/ProductItem1';
import Loader from '../components/Loader';
import { RED_COLOR } from '../styles/variables';
import { SIDEINTERVAL } from '../common/constants';

import * as mergeGetInfoActionCreators from '../common/actions/mergeGetInfo';
import * as authActionCreators from '../common/actions/auth';
import { PULLUPLOAD, ScrollViewPullUp } from "../components/ScrollViewPullUp";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

class GroupBuyList extends Component {

  componentDidMount() {
    const {
      mergeGetInfoFetch,
    } = this.props;

    mergeGetInfoFetch({
      pagesize: 10,
      currentpage: 1
    });
    
    this.state = {
      refreshing: false,
      pullUpState: 'success'
    }

    this._onRefresh = this._onRefresh.bind(this);
    this.pullUpLoad = this.pullUpLoad.bind(this);
    this._onScroll = ScrollViewPullUp.onScroll('pulluploading', this.pullUpLoad).bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     refreshing: nextProps.loading
  //   })
  // }

  _onRefresh() {
    const {
      mergeGetInfoFetch,
    } = this.props;

    // 重新加载
    mergeGetInfoFetch({
      pagesize: 10,
      currentpage: 1
    });
  }

  pullUpLoad() {
    const {
      mergeGetInfoFetch,
      currentpage,
    } = this.props;

    // 重新加载
    mergeGetInfoFetch({
      pagesize: 10,
      currentpage: currentpage + 1
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
      pulluploading
    } = this.props;
    
    return (
      <View style={styles.container}>
        <ProductItem1 data={items} groupon={true} />
        {ScrollViewPullUp.scrollViewFooter(pulluploading)}
      </View>
    )
  }
  
  render() {
    const {
      navigation: { navigate },
      loaded, 
      loading,
    } = this.props;
    
    if (!loaded) return <Loader />;
    
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView  
          onScroll={this._onScroll}
          refreshControl={<RefreshControl 
            refreshing={loading} 
            onRefresh={this._onRefresh} 
          />}
        >
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
          mergeGetInfo,
        } = state;

        const {
          navigation
        } = props;

        return {
          loading: mergeGetInfo.loading,
          loaded: mergeGetInfo.loaded,
          pulluploading: mergeGetInfo.pulluploading,
          items: mergeGetInfo.items,
          currentpage: mergeGetInfo.currentpage,
        }
      }
    },
    {
      ...mergeGetInfoActionCreators,
      ...authActionCreators,
    }
  )(GroupBuyList)
);
