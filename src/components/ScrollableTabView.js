import React, { Component } from 'react';
import { ScrollView, ListView, StyleSheet, View, Text, Image, RefreshControl, Dimensions } from 'react-native';
import ReactNativeScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  tab: {
    height: 40,
    paddingBottom: 0
  },
  tabText: {
    fontSize: 12
  },
  tabBarUnderline: {
    backgroundColor: '#3e9ce9',
    height: 3
  }
});



const ScrollableTabView = ({ content, ...restProps }) => (
  <ReactNativeScrollableTabView 
    initialPage={0} 
    prerenderingSiblingsNumber={0} 
    renderTabBar={() => <ScrollableTabBar style={{ height: 40 }} 
    tabStyle={styles.tab} 
    textStyle={styles.tabText} />} 
    tabBarBackgroundColor="#fcfcfc" 
    tabBarUnderlineStyle={styles.tabBarUnderline} 
    tabBarActiveTextColor="#3e9ce9" 
    tabBarInactiveTextColor="#aaaaaa"
    {...restProps}
  >
    {content}
  </ReactNativeScrollableTabView>
);

export default ScrollableTabView;
