import React from "react";
import { ScrollView, DeviceEventEmitter, InteractionManager, ListView, StyleSheet, View, Text, Dimensions, Image, ImageBackground, RefreshControl } from "react-native";

import ScrollableTabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import SwiperFlatList from "../components/SwiperFlatList";
import BannerHomeType from "../components/bannerHomeType";

export const { width, height } = Dimensions.get("window");

const width3_interval = width * 0.03 * 4;
const width3_item = (width - width3_interval) / 3;

import { connect } from "react-redux";
import * as newestInfoActionCreators from "../common/actions/newestInfo";
import * as bannerSwiperActionCreators from "../common/actions/bannerSwiper";
import * as bannerHomeTypeActionCreators from "../common/actions/bannerHomeType";

const styles = StyleSheet.create({
  base: {
    flex: 1
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
    height: 40,
    paddingBottom: 0
  },
  tabText: {
    fontSize: 12
  },
  tabBarUnderline: {
    backgroundColor: "#3e9ce9",
    height: 3
  }
});

class Main extends React.Component {
  static navigationOptions = {
    header: null,
    title: "分类",
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
    const { bannerSwiperClear, bannerSwiperFetch, bannerHomeTypeFetch } = this.props;
    bannerSwiperClear();
    bannerSwiperFetch('home');
    bannerHomeTypeFetch();
  }

  _onDataArrived() {

  }

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
    const { bannerSwiper, bannerHomeType } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 45, backgroundColor: "#147af3" }}>
          <View style={{}}>
            <Icon name="menu" size={30} color="#fff" style={{ paddingLeft: 10, paddingRight: 10 }} />
          </View>
          <View style={{ flex: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 30, backgroundColor: "#1c6ada", borderRadius: 14 }}>
              <Icon name="search" size={24} color="#4889f3" style={{}} />
              <Text style={{ color: "#6fa8fc" }}>Search</Text>
            </View>
          </View>
          <View style={{}}>
            <Icon name="crop-free" size={30} color="#fff" style={{ paddingLeft: 10, paddingRight: 10 }} />
          </View>
        </View>
        <ScrollableTabView renderTabBar={() => <ScrollableTabBar style={{ height: 40 }} tabStyle={styles.tab} textStyle={styles.tabText} />} tabBarBackgroundColor="#fcfcfc" tabBarUnderlineStyle={styles.tabBarUnderline} tabBarActiveTextColor="#3e9ce9" tabBarInactiveTextColor="#aaaaaa">
          <View tabLabel="Recommend" style={styles.base}>
            <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>
              <SwiperFlatList data={ bannerSwiper } />

              <View style={{ height: 8, backgroundColor: "#eee" }} />

              <View style={{ height: 40, justifyContent: "center" }}>
                <Text style={{ textAlign: "center", color: "#333" }}>Brand on sale</Text>
              </View>
              
              <BannerHomeType source={ bannerHomeType } />
              
              <View style={{ height: 8, backgroundColor: "#eee" }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 40, marginBottom: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ paddingLeft: 10, color: "#000", fontSize: 16 }}>Big Sale</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginTop: 2 }}>more</Text>
                  <Icon name="keyboard-arrow-right" size={24} color="#ddd" style={{}} />
                </View>
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 5 }}>
                <View style={{ marginLeft: "3%", width: width3_item, marginBottom: 15 }}>
                  <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 100, marginBottom: 10 }} />
                  <Text style={{ fontSize: 11, color: "#333", marginBottom: 2 }}>OPPO F5 Youth Vang 3+32G</Text>
                  <Text style={{ fontSize: 11, color: "#999", marginBottom: 0, textDecorationLine: "line-through", textDecorationStyle: "solid" }}>3,690,000 VND</Text>
                  <View style={{ position: "relative", zIndex: 55, paddingTop: 5, paddingBottom: 15 }}>
                    <ImageBackground style={{ width: width3_item, height: 25, flexDirection: "row", alignItems: "center" }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_bar-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 11, marginRight: 3, marginLeft: 8 }}>3,290,000</Text>
                      <Text style={{ color: "#fff", fontSize: 8, marginTop: 2 }}>VND</Text>
                    </ImageBackground>
                    <ImageBackground style={{ position: "absolute", zIndex: 60, top: 1, right: 0, width: width3_item / 3, height: 40 }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_barge-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 8, textAlign: "center", marginTop: 2 }}>GIẢM</Text>
                      <Text style={{ color: "#fff", fontSize: 14, lineHeight: 15, textAlign: "center" }}>36</Text>
                      <Text style={{ color: "#fff", fontSize: 8, lineHeight: 8, textAlign: "right", paddingRight: 6 }}>%</Text>
                    </ImageBackground>
                  </View>
                </View>
                <View style={{ marginLeft: "3%", width: width3_item, marginBottom: 15 }}>
                  <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 100, marginBottom: 10 }} />
                  <Text style={{ fontSize: 11, color: "#333", marginBottom: 2 }}>OPPO F5 Youth Vang 3+32G</Text>
                  <Text style={{ fontSize: 11, color: "#999", marginBottom: 0, textDecorationLine: "line-through", textDecorationStyle: "solid" }}>3,690,000 VND</Text>
                  <View style={{ position: "relative", zIndex: 55, paddingTop: 5, paddingBottom: 15 }}>
                    <ImageBackground style={{ width: width3_item, height: 25, flexDirection: "row", alignItems: "center" }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_bar-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 11, marginRight: 3, marginLeft: 8 }}>3,290,000</Text>
                      <Text style={{ color: "#fff", fontSize: 8, marginTop: 2 }}>VND</Text>
                    </ImageBackground>
                    <ImageBackground style={{ position: "absolute", zIndex: 60, top: 1, right: 0, width: width3_item / 3, height: 40 }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_barge-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 8, textAlign: "center", marginTop: 2 }}>GIẢM</Text>
                      <Text style={{ color: "#fff", fontSize: 14, lineHeight: 15, textAlign: "center" }}>36</Text>
                      <Text style={{ color: "#fff", fontSize: 8, lineHeight: 8, textAlign: "right", paddingRight: 6 }}>%</Text>
                    </ImageBackground>
                  </View>
                </View>
                <View style={{ marginLeft: "3%", width: width3_item, marginBottom: 15 }}>
                  <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 100, marginBottom: 10 }} />
                  <Text style={{ fontSize: 11, color: "#333", marginBottom: 2 }}>OPPO F5 Youth Vang 3+32G</Text>
                  <Text style={{ fontSize: 11, color: "#999", marginBottom: 0, textDecorationLine: "line-through", textDecorationStyle: "solid" }}>3,690,000 VND</Text>
                  <View style={{ position: "relative", zIndex: 55, paddingTop: 5, paddingBottom: 15 }}>
                    <ImageBackground style={{ width: width3_item, height: 25, flexDirection: "row", alignItems: "center" }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_bar-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 11, marginRight: 3, marginLeft: 8 }}>3,290,000</Text>
                      <Text style={{ color: "#fff", fontSize: 8, marginTop: 2 }}>VND</Text>
                    </ImageBackground>
                    <ImageBackground style={{ position: "absolute", zIndex: 60, top: 1, right: 0, width: width3_item / 3, height: 40 }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_barge-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 8, textAlign: "center", marginTop: 2 }}>GIẢM</Text>
                      <Text style={{ color: "#fff", fontSize: 14, lineHeight: 15, textAlign: "center" }}>36</Text>
                      <Text style={{ color: "#fff", fontSize: 8, lineHeight: 8, textAlign: "right", paddingRight: 6 }}>%</Text>
                    </ImageBackground>
                  </View>
                </View>
                <View style={{ marginLeft: "3%", width: width3_item, marginBottom: 15 }}>
                  <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 100, marginBottom: 10 }} />
                  <Text style={{ fontSize: 11, color: "#333", marginBottom: 2 }}>OPPO F5 Youth Vang 3+32G</Text>
                  <Text style={{ fontSize: 11, color: "#999", marginBottom: 0, textDecorationLine: "line-through", textDecorationStyle: "solid" }}>3,690,000 VND</Text>
                  <View style={{ position: "relative", zIndex: 55, paddingTop: 5, paddingBottom: 15 }}>
                    <ImageBackground style={{ width: width3_item, height: 25, flexDirection: "row", alignItems: "center" }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_bar-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 11, marginRight: 3, marginLeft: 8 }}>3,290,000</Text>
                      <Text style={{ color: "#fff", fontSize: 8, marginTop: 2 }}>VND</Text>
                    </ImageBackground>
                    <ImageBackground style={{ position: "absolute", zIndex: 60, top: 1, right: 0, width: width3_item / 3, height: 40 }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_barge-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 8, textAlign: "center", marginTop: 2 }}>GIẢM</Text>
                      <Text style={{ color: "#fff", fontSize: 14, lineHeight: 15, textAlign: "center" }}>36</Text>
                      <Text style={{ color: "#fff", fontSize: 8, lineHeight: 8, textAlign: "right", paddingRight: 6 }}>%</Text>
                    </ImageBackground>
                  </View>
                </View>
                <View style={{ marginLeft: "3%", width: width3_item, marginBottom: 15 }}>
                  <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 100, marginBottom: 10 }} />
                  <Text style={{ fontSize: 11, color: "#333", marginBottom: 2 }}>OPPO F5 Youth Vang 3+32G</Text>
                  <Text style={{ fontSize: 11, color: "#999", marginBottom: 0, textDecorationLine: "line-through", textDecorationStyle: "solid" }}>3,690,000 VND</Text>
                  <View style={{ position: "relative", zIndex: 55, paddingTop: 5, paddingBottom: 15 }}>
                    <ImageBackground style={{ width: width3_item, height: 25, flexDirection: "row", alignItems: "center" }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_bar-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 11, marginRight: 3, marginLeft: 8 }}>3,290,000</Text>
                      <Text style={{ color: "#fff", fontSize: 8, marginTop: 2 }}>VND</Text>
                    </ImageBackground>
                    <ImageBackground style={{ position: "absolute", zIndex: 60, top: 1, right: 0, width: width3_item / 3, height: 40 }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_barge-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 8, textAlign: "center", marginTop: 2 }}>GIẢM</Text>
                      <Text style={{ color: "#fff", fontSize: 14, lineHeight: 15, textAlign: "center" }}>36</Text>
                      <Text style={{ color: "#fff", fontSize: 8, lineHeight: 8, textAlign: "right", paddingRight: 6 }}>%</Text>
                    </ImageBackground>
                  </View>
                </View>
                <View style={{ marginLeft: "3%", width: width3_item, marginBottom: 15 }}>
                  <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 100, marginBottom: 10 }} />
                  <Text style={{ fontSize: 11, color: "#333", marginBottom: 2 }}>OPPO F5 Youth Vang 3+32G</Text>
                  <Text style={{ fontSize: 11, color: "#999", marginBottom: 0, textDecorationLine: "line-through", textDecorationStyle: "solid" }}>3,690,000 VND</Text>
                  <View style={{ position: "relative", zIndex: 55, paddingTop: 5, paddingBottom: 15 }}>
                    <ImageBackground style={{ width: width3_item, height: 25, flexDirection: "row", alignItems: "center" }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_bar-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 11, marginRight: 3, marginLeft: 8 }}>3,290,000</Text>
                      <Text style={{ color: "#fff", fontSize: 8, marginTop: 2 }}>VND</Text>
                    </ImageBackground>
                    <ImageBackground style={{ position: "absolute", zIndex: 60, top: 1, right: 0, width: width3_item / 3, height: 40 }} source={{ uri: "http://192.168.1.98/taichiyi_git/WebStore/img/sale_barge-1.png" }}>
                      <Text style={{ color: "#fff", fontSize: 8, textAlign: "center", marginTop: 2 }}>GIẢM</Text>
                      <Text style={{ color: "#fff", fontSize: 14, lineHeight: 15, textAlign: "center" }}>36</Text>
                      <Text style={{ color: "#fff", fontSize: 8, lineHeight: 8, textAlign: "right", paddingRight: 6 }}>%</Text>
                    </ImageBackground>
                  </View>
                </View>
              </View>

              <View style={{ height: 8, backgroundColor: "#eee" }} />

              <View style={{}}>
                <View style={{}}>
                  <Text style={{ textAlign: "center", paddingTop: 10, paddingBottom: 10, color: "#333", fontSize: 16 }}>Featured Events</Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 15, borderBottomColor: "#f2f2f2", borderBottomWidth: StyleSheet.hairlineWidth }}>
                  <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10 }}>
                    <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 120 }} />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ color: "#333", marginBottom: 60 }}>OPPO F5</Text>
                    <Text style={{ color: "#aaa" }}>6,990,000 VND起</Text>
                    <Text style={{ color: "#4f9ff1", marginBottom: 15 }}>月供: 291,250 VND起</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 15, borderBottomColor: "#f2f2f2", borderBottomWidth: StyleSheet.hairlineWidth }}>
                  <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10 }}>
                    <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 120 }} />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ color: "#333", marginBottom: 60 }}>OPPO F5</Text>
                    <Text style={{ color: "#aaa" }}>6,990,000 VND起</Text>
                    <Text style={{ color: "#4f9ff1", marginBottom: 15 }}>月供: 291,250 VND起</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 15, borderBottomColor: "#f2f2f2", borderBottomWidth: StyleSheet.hairlineWidth }}>
                  <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10 }}>
                    <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 120 }} />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ color: "#333", marginBottom: 60 }}>OPPO F5</Text>
                    <Text style={{ color: "#aaa" }}>6,990,000 VND起</Text>
                    <Text style={{ color: "#4f9ff1", marginBottom: 15 }}>月供: 291,250 VND起</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 15, borderBottomColor: "#f2f2f2", borderBottomWidth: StyleSheet.hairlineWidth }}>
                  <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10 }}>
                    <Image source={{ uri: "http://47.89.9.226/commodity/img/index_ad/1512028812386_bannner_OPPOF3Plus.jpg" }} style={{ width: "auto", height: 120 }} />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ color: "#333", marginBottom: 60 }}>OPPO F5</Text>
                    <Text style={{ color: "#aaa" }}>6,990,000 VND起</Text>
                    <Text style={{ color: "#4f9ff1", marginBottom: 15 }}>月供: 291,250 VND起</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <View tabLabel="Mobile Communications" style={styles.base}>
            <Text>favorite</Text>
          </View>
          <View tabLabel="Computer office" style={styles.base}>
            <Text>体育迷123</Text>
          </View>
          <View tabLabel="Digtal devices" style={styles.base}>
            <Text>旅行家123</Text>
          </View>
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
  const { bannerSwiper, bannerHomeType } = state;
  return {
    bannerSwiper: bannerSwiper['home'] || {},
    bannerHomeType: bannerHomeType || [],
  };
}

export default connect(mapStateToProps, { ...newestInfoActionCreators, ...bannerSwiperActionCreators, ...bannerHomeTypeActionCreators })(Main);
