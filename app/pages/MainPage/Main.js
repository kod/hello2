import React from "react";
import { DeviceEventEmitter, InteractionManager, ListView, StyleSheet, View, Text } from "react-native";

import ScrollableTabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";

export default () => {
  return (
    <View style={styles.container}>
      <ScrollableTabView
        renderTabBar={() => (
          <ScrollableTabBar
            tabStyle={styles.tab}
            textStyle={styles.tabText}
          />
        )}
        tabBarBackgroundColor="#fcfcfc"
        tabBarUnderlineStyle={styles.tabBarUnderline}
        tabBarActiveTextColor="#3e9ce9"
        tabBarInactiveTextColor="#aaaaaa"
      >
        <View tabLabel="热点" style={styles.base}>
          <Text>my</Text>
        </View>
        <View tabLabel="军事" style={styles.base}>
          <Text>favorite</Text>
        </View>
        <View tabLabel="体育迷" style={styles.base}>
          <Text>体育迷123</Text>
        </View>
        
      </ScrollableTabView>
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#f00'
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  drawerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  drawerTitleContent: {
    height: 120,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "#3e9ce9"
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  drawerTitle: {
    fontSize: 20,
    textAlign: "left",
    color: "#fcfcfc"
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: "center",
    color: "black"
  },
  timeAgo: {
    fontSize: 14,
    color: "#aaaaaa",
    marginTop: 5
  },
  refreshControlBase: {
    backgroundColor: "transparent"
  },
  tab: {
    paddingBottom: 0
  },
  tabText: {
    fontSize: 16
  },
  tabBarUnderline: {
    backgroundColor: "#3e9ce9",
    height: 2
  }
});
