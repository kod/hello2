import React from 'react';
import { StyleSheet } from 'react-native';
import ReactNativeScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  tab: {
    height: 32,
    paddingBottom: 0,
    paddingTop: 0,
  },
  tabText: {
    fontSize: 12,
  },
  tabBarUnderline: {
    backgroundColor: '#0076F7',
    height: 2,
  },
});

const ScrollableTabView = ({
  content,
  styleTab,
  styleText,
  initialPage = 0,
  ...restProps
}) => (
  <ReactNativeScrollableTabView
    initialPage={initialPage}
    prerenderingSiblingsNumber={0}
    renderTabBar={() => (
      <ScrollableTabBar
        style={[styles.tab, styleTab]}
        tabStyle={[styles.tab, styleTab]}
        textStyle={[styles.tabText, styleText]}
      />
    )}
    tabBarBackgroundColor="#fff"
    tabBarUnderlineStyle={styles.tabBarUnderline}
    tabBarActiveTextColor="#0076F7"
    tabBarInactiveTextColor="#999"
    {...restProps}
  >
    {content}
  </ReactNativeScrollableTabView>
);

export default ScrollableTabView;
