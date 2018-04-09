import React from 'react';
import { ScrollView, ListView, StyleSheet, View, Text, Image, RefreshControl, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SCREENS } from "../common/constants";
import ScrollableTabView from '../components/ScrollableTabView';
import Scrollable1 from '../components/Scrollable1';
import Scrollable2 from '../components/Scrollable2';
import Scrollable3 from '../components/Scrollable3';
import Scrollable4 from '../components/Scrollable4';

const { width, height } = Dimensions.get('window');

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
    title: 'home',
    tabBarIcon: ({ tintColor }) => <MaterialIcons name="home" size={25} color={tintColor} />
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

  componentDidMount() {}

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
    const { navigation: { navigate } } = this.props;

    setTimeout(() => {
      navigate(SCREENS.Settings);
    }, 300);

    const scrollableTabKeys = [
      {
        tabLabel: 'Recommend',
        view: <Scrollable1 {...this.props} />
      },
      {
        tabLabel: 'Mobile Communications',
        view: <Scrollable2 {...this.props} />
      },
      {
        tabLabel: 'Computer office',
        view: <Scrollable3 {...this.props} />
      },
      {
        tabLabel: 'Digtal devices',
        view: <Scrollable4 {...this.props} />
      }
    ];

    const content = scrollableTabKeys.map((val, key) => {
      return (
        <View tabLabel={val.tabLabel} style={styles.base} key={key}>
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>{scrollableTabKeys[key].view}</ScrollView>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 45, backgroundColor: '#147af3' }}>
          <View style={{ width: width * 0.03 }} />
          <View style={{ flex: 8, }}>
            <TouchableWithoutFeedback onPress={ () => navigate(SCREENS.SearchResult) }>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 30, backgroundColor: '#1c6ada', borderRadius: 14 }}>
                <Ionicons name="ios-search" size={20} color="#4889f3" style={{ marginRight: 3 }} />
                <Text style={{ color: '#6fa8fc' }}>Search</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{}}>
            <FontAwesome name="qrcode" size={30} color="#fff" style={{ paddingLeft: 10, paddingRight: 10 }} />
          </View>
        </View>
        <ScrollableTabView content={content} />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps, {})(Main);
