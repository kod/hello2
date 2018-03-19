import React from 'react';
import { ScrollView, ListView, StyleSheet, View, Text, Image, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SwiperFlatList from '../components/SwiperFlatList';
import BannerHomeType from '../components/bannerHomeType';
import DiscountsItem from '../components/discountsItem';
import FeaturedGoodsItem from '../components/featuredGoodsItem';

import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeTypeActionCreators from '../common/actions/bannerHomeType';
import * as promotionInfoActionCreators from '../common/actions/promotionInfo';
import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

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

class Main extends React.Component {
  static navigationOptions = {
    header: null,
    title: '分类',
    tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />
  };

  constructor() {
    super();
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.auto_data = function(num = 20, begin = 0) {
      let empty_array = [];
      for (let index = begin; index < num + begin; index++) {
        empty_array.push(`row ${index}`);
      }
      return empty_array;
    };

    this._data = this.auto_data();

    this.state = {
      dataSource: this.ds.cloneWithRows(this._data),
      refreshing: false
    };
  }

  componentDidMount() {
    const { bannerSwiperClear, bannerSwiperFetch, bannerHomeTypeFetch, promotionInfoFetch, bannerHomeRecommendFetch } = this.props;
    // bannerSwiperClear();
    bannerSwiperFetch('home');
    bannerHomeTypeFetch();
    promotionInfoFetch();
    bannerHomeRecommendFetch();
  }

  _onDataArrived() {}

  _onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this._onDataArrived();
      this.setState({ refreshing: false });
    }, 1000);
    // fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
  }

  render() {
    const { bannerSwiper, bannerHomeType, promotionInfo, bannerHomeRecommend } = this.props;

    const RecommendView = (tabLabel) => {
      return (
        <View>
          <SwiperFlatList data={bannerSwiper} />

          <View style={{ height: 8, backgroundColor: '#eee' }} />

          <View style={{ height: 40, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#333' }}>Brand on sale</Text>
          </View>

          <BannerHomeType data={bannerHomeType} />

          <View style={{ height: 8, backgroundColor: '#eee' }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ paddingLeft: 10, color: '#000', fontSize: 16 }}>Big Sale</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: 2 }}>more</Text>
              <Icon name="keyboard-arrow-right" size={24} color="#ddd" style={{}} />
            </View>
          </View>

          <DiscountsItem data={promotionInfo} />

          <View style={{ height: 8, backgroundColor: '#eee' }} />

          <View style={{}}>
            <View style={{}}>
              <Text style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10, color: '#333', fontSize: 16 }}>Featured Events</Text>
            </View>

            <FeaturedGoodsItem data={bannerHomeRecommend} />
          </View>
        </View>
      );
    };

    const scrollableTabKeys = [
      {
        tabLabel: 'Recommend',
        view: RecommendView('Recommend')
      },
      {
        tabLabel: 'Mobile Communications',
        view: <Text>favorite</Text>
      },
      {
        tabLabel: 'Computer office',
        view: <Text>体育迷123</Text>
      },
      {
        tabLabel: 'Digtal devices',
        view: <Text>98765</Text>
      }
    ];

    const content = scrollableTabKeys.map((val, key) => {
      return (
        <View tabLabel={val.tabLabel} style={styles.base} key={ key }>
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>
            { scrollableTabKeys[key].view }
          </ScrollView>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 45, backgroundColor: '#147af3' }}>
          <View style={{}}>
            <Icon name="menu" size={30} color="#fff" style={{ paddingLeft: 10, paddingRight: 10 }} />
          </View>
          <View style={{ flex: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 30, backgroundColor: '#1c6ada', borderRadius: 14 }}>
              <Icon name="search" size={24} color="#4889f3" style={{}} />
              <Text style={{ color: '#6fa8fc' }}>Search</Text>
            </View>
          </View>
          <View style={{}}>
            <Icon name="crop-free" size={30} color="#fff" style={{ paddingLeft: 10, paddingRight: 10 }} />
          </View>
        </View>
        <ScrollableTabView renderTabBar={() => <ScrollableTabBar style={{ height: 40 }} tabStyle={styles.tab} textStyle={styles.tabText} />} tabBarBackgroundColor="#fcfcfc" tabBarUnderlineStyle={styles.tabBarUnderline} tabBarActiveTextColor="#3e9ce9" tabBarInactiveTextColor="#aaaaaa">
          {content}
        </ScrollableTabView>
      </View>
    );
  }

  // render() {
  //   return (
  //     <View>
  //       <Text>Open up App.js to start working on your app!</Text>
  //       <Text>Changes you make will automatically reload.</Text>
  //       <Text>Shake your phone to open the developer menu.</Text>
  //     </View>
  //   );
  // }
}

function mapStateToProps(state, props) {
  const { bannerSwiper, bannerHomeType, promotionInfo, bannerHomeRecommend } = state;
  return {
    bannerSwiper: bannerSwiper['home'] || {},
    bannerHomeType: bannerHomeType || {},
    promotionInfo: promotionInfo || {},
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connect(mapStateToProps, { ...bannerSwiperActionCreators, ...bannerHomeTypeActionCreators, ...promotionInfoActionCreators, ...bannerHomeRecommendActionCreators })(Main);
